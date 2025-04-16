import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notas/` ) );
        const setDocResp = await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ));


    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usario no existe');
        
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ));

    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };

        // Con esto borramos una propiedad de un objeto en JS
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }`);
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch( updateNote( note ));
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
        
        // await fileUpload( files[0] );
        
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ));
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

export const startDeletingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ));

    }
}