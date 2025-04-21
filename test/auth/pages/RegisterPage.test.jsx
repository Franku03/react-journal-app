import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { RegisterPage } from "../../../src/auth/pages/RegisterPage";
import { startCreatingUserWithEmailPassword } from "../../../src/store/auth/thunks";
import { authSlice } from "../../../src/store/auth/authSlice";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartCreatingUserWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startCreatingUserWithEmailPassword: ({ email, password, displayName }) => {
        return () => mockStartCreatingUserWithEmailPassword({ email, password, displayName });
    },
}));


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}))

const store = configureStore({
    reducer:{
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})


describe('Pruebas en Register Page', () => {

    beforeEach( () => jest.clearAllMocks() );


    test('debe de mostrar el componente correctamente', () => {

        render( 
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>
        )

        expect( screen.getAllByText('Crear Cuenta').length ).toBeGreaterThanOrEqual(1);
        
    });

    test('botón de crear cuenta debe de llamar startCreatingUserWithEmailPassword', () => {

        const name = 'Gintoki';
        const email = 'gintoki@google.com';
        const password = '123456';


        render( 
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>
        )

        const nameField = screen.getByRole('textbox', { name: 'Nombre Completo' });
        fireEvent.change( nameField, { target: { name: 'displayName', value: name }});

        const emailField = screen.getByRole('textbox', { name: 'Correo'} );
        fireEvent.change( emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } );

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartCreatingUserWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password,
            displayName: name,
        })

    })

})