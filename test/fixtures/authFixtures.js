export const initialState = {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};


export const authenticatedState = {
    status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: '1234AsdfA',
    email: 'demo@google.com',
    displayName: 'Demo User AKA Gintoki',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
};

export const notAuthenticatedState = {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const demoUser = {
    uid: '1234AsdfA',
    email: 'demo@google.com',
    displayName: 'Demo User AKA Gintoki',  
    photoURL: 'https://demo.jpg',
}