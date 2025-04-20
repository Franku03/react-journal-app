import { 
    addNewEmptyNote, 
    clearNotesLogout, 
    deleteNoteById, 
    journalSlice, 
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving, 
    updateNote 
} from "../../../src/store/journal/journalSlice";
import { activeNoteState, demoNote, initialState, stateWithNotesAndActiveNotes, voidNewNote } from "../../fixtures/journalFixtures";

describe('pruebas en journalSlice', () => {

    test('debe de regresar el estado inicial y llamarse "journal"', () => {

        const state = journalSlice.reducer( initialState, {} );

        expect( journalSlice.name ).toBe('journal');
        expect( state ).toEqual( initialState );
        
    });

    test('debe de regresar la nota seleccionada', () => {

        const state = journalSlice.reducer( initialState, setActiveNote( demoNote ) );
        expect( state.active ).toEqual({
            id: demoNote.id,
            title: demoNote.title,
            body: demoNote.body,
            date: demoNote.date,
            imageUrls: demoNote.imageUrls,
        });
        
    });
    
    test('debe de regresar todas las notas', () => {

        const state = journalSlice.reducer( initialState, setNotes([{...demoNote, id: 1}, {...demoNote, id: 2}, {...demoNote, id: 3}]) );
        expect( state.notes ).toEqual([{
            ...demoNote, id: 1
        },{
            ...demoNote, id: 2
        },{
            ...demoNote, id: 3
        }]);
        
    });

    test('debe de regresar que se está guardando la nota y el mensaje de guardado vacío ', () => {
        const state = journalSlice.reducer( initialState, setSaving() );
        expect( state.isSaving ).toBeTruthy();
        expect( state.messageSaved ).toBe('');
    });

    test('debe de regresar las imágenes nuevas agregadas a la nota activa y colocar que ya no se está guardando ', () => {
        const state = journalSlice.reducer( activeNoteState , setPhotosToActiveNote(['https://foto2.jpg', 'https://foto3.jpg']) );
        expect( state.active.imageUrls ).toEqual(['https://foto1.jpg', 'https://foto2.jpg', 'https://foto3.jpg']);
        expect( state.isSaving ).toBeFalsy();
    });

    test('debe de limpiar todo la información de las notas asociadas', () => {
        const state = journalSlice.reducer( stateWithNotesAndActiveNotes , clearNotesLogout() );
        expect( state.isSaving ).toBeFalsy();
        expect( state.messageSaved ).toBe('');
        expect( state.messageDeleted).toBe('');
        expect( state.notes ).toEqual([]);
        expect( state.active ).toBeNull();
    });

    test('debe de añadir una nueva nota con los datos vacíos y colocar que ya no se está guardando - Habian notas', () => {
        const state = journalSlice.reducer( stateWithNotesAndActiveNotes , addNewEmptyNote(voidNewNote));
        expect( state.isSaving ).toBeFalsy();
        expect( state.notes ).toEqual([...stateWithNotesAndActiveNotes.notes, voidNewNote]);

    });

    test('debe de añadir una nueva nota con los datos vacíos y colocar que ya no se está guardando - No habian notas', () => {
        const state = journalSlice.reducer( initialState , addNewEmptyNote(voidNewNote));
        expect( state.isSaving ).toBeFalsy();
        expect( state.notes ).toEqual([voidNewNote]);

    });

    test('debe de actualizar los datos de la nota, colocar que ya no se está guardando y dejar el mensaje de guardado', () => {

        const updatedNote = {
            id: '2',
            title: 'La nota demo 2 actualizada',
            body: 'Locuuuuuuura',
            date: 2341234,
            imageUrls: ['https://foto1.jpg', 'https://foto2.jpg', 'https://foto3.jpg'],
        }

        const state = journalSlice.reducer( stateWithNotesAndActiveNotes, updateNote(updatedNote));
        expect( state.isSaving ).toBeFalsy();
        expect( state.notes ).toEqual([{
            id: '1',
            title: 'Nota demo 1',
            body: 'A',
            date: 2341234,
            imageUrls: ['https://foto1.jpg'],
        },{
            ...updatedNote
        },{
            id: '3',
            title: 'Nota demo 3',
            body: 'C',
            date: 12342134,
            imageUrls: [],
        }]);
        expect( state.messageSaved ).toEqual(`${ updatedNote.title }, actualizada correctamente`);
    });

    test('debe de borrar la nota dado el id, colocar la nota activa en null y dejar el mensaje de borrado exitosamente', () => {

        const toBeDeletedNote = {
            id: '1',
            title: 'Nota demo 1',
            body: 'A',
            date: 2341234,
            imageUrls: ['https://foto1.jpg'],
        };

        const state = journalSlice.reducer( stateWithNotesAndActiveNotes, deleteNoteById(toBeDeletedNote.id));

        expect( state.messageDeleted).toBe(`${ toBeDeletedNote.title }, eliminada correctamente`);
        expect( state.active ).toBeNull();
        expect( state.notes ).toEqual([{
            id: '2',
            title: 'Nota demo 2',
            body: 'B',
            date: 2341234,
            imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'],
        },{
            id: '3',
            title: 'Nota demo 3',
            body: 'C',
            date: 12342134,
            imageUrls: [],
        }]);

    });


});