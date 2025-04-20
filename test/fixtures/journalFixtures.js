export const initialState = {
    isSaving: false,
    messageSaved: '',
    messageDeleted: '',
    notes: [],
    active: null,
    // active: {
    //     id: 'ABC123',
    //     title: '',
    //     date: '',
    //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    // }
}

export const activeNoteState = {
    isSaving: false,
    messageSaved: '',
    messageDeleted: '',
    notes: [],
    active: null,
    active: {
        id: 'ABC123',
        title: 'Nota demo',
        body: '1234567',
        date: 12341553,
        imageUrls: ['https://foto1.jpg'],
    }
}

export const voidNewNote = {
    id: 'ABC123',
    title: '',
    body: '',
    date: 12341553,
    imageUrls: [],
}

export const demoNote =  {
    id: 'ABC123',
    title: 'Nota demo',
    body: '1234567',
    date: 12341553,
    imageUrls: ['https://foto1.jpg', 'https://foto2.jpg', 'https://foto3.jpg'],
}

export const stateWithNotesAndActiveNotes = {
    isSaving: false,
    messageSaved: 'No, it is not saving',
    messageDeleted: 'Yes, it was deleted',
    notes: [{
        id: '1',
        title: 'Nota demo 1',
        body: 'A',
        date: 2341234,
        imageUrls: ['https://foto1.jpg'],
    },{
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
    }],
    active: {
        id: '1',
        title: 'Nota demo 1',
        body: 'A',
        date: 2341234,
        imageUrls: ['https://foto1.jpg'],
    }
}