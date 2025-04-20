
import { fileUpload } from "../../../src/helpers/fileUpload";
import { loadNotes } from "../../../src/helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "../../../src/store/journal/journalSlice";
import { startDeletingNotes, startLoadingNotes, startNewNote, startSavingNote, startUploadingFiles } from "../../../src/store/journal/thunks";
import { activeNoteState, stateWithNotesAndActiveNotes } from "../../fixtures/journalFixtures";
import { deleteTestNotes } from "./deleteTestNotes";

jest.mock('../../../src/helpers/loadNotes')
jest.mock('../../../src/helpers/fileUpload')


describe('pruebas en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    const uid = 'TEST-UID';

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe de crear una nueva nota en blanco', async () => {

        // ¿ ResolveValue es para promesas - funciones asíncronas, ReturnValue para funciones síncronas
        getState.mockReturnValue({ auth: { uid: uid }});

        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
        }));
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
        }));

        // ¿ Borrar de firebase
        await deleteTestNotes( uid );
    });

    test('startLoadingNotes debe de cargar todas las notas asociadas', async () => {

        const notes = [...stateWithNotesAndActiveNotes.notes]

        await loadNotes.mockResolvedValue( notes );

        getState.mockReturnValue({ auth: { uid: uid }});


        await startLoadingNotes()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( setNotes( notes ) );

    });

    test('startSavingNote debe de guardar la nueva información de la nota', async () => {

        const note = activeNoteState.active

        getState.mockReturnValue({ auth: { uid: uid }, journal: activeNoteState });

        await startSavingNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( setSaving() );
        expect( dispatch ).toHaveBeenCalledWith( updateNote( note ) );

    });

    test('startUploadingFiles debe de cargar las nuevas imagenes a la nota', async () => {

        await fileUpload.mockResolvedValue('https://foto.jpg')

        await startUploadingFiles([{imageName: 'fotodemo'}])( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( setSaving() );
        expect( dispatch ).toHaveBeenCalledWith( setPhotosToActiveNote(['https://foto.jpg']) );

    });

    test('startDeletingNotes debe de eliminar la nota seleccionada', async () => {

        const note = activeNoteState.active

        getState.mockReturnValue({ auth: { uid: uid }, journal: activeNoteState });

        await startDeletingNotes()( dispatch, getState);

        expect( dispatch ).toHaveBeenCalledWith( deleteNoteById( note.id ) );

    });
    
})