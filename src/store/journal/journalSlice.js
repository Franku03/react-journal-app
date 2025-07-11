import { Satellite } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        messageDeleted: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: 1234567,
        //     date: '',
        //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // }
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if( note.id === action.payload.id ) return action.payload
                return note;  
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
        },
        deleteNoteById: (state, action) => {
            state.messageDeleted = `${ state.active.title }, eliminada correctamente`;
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.messageDeleted = '';
            state.notes = [];
            state.active = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;