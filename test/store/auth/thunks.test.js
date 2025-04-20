
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";

import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { demoUser } from "../../fixtures/authFixtures";
import { clearNotesLogout } from "../../../src/store/journal";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    // ? checkingAuthentication

    test('checkingAuthentication debe de invocar al checkingCredentials', async () => {

        // ¡ Mandamos a llamar el thunk, y luego mandamos a ejecutar el callback asíncrono que devuelve mandandole el dispatch como argumento
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

        // const valor = checkingCredentials();
        // console.log( valor );

    });

    // ? startGoogleSignIn

    test('startGoogleSignIn debe de llamar el checkingCredentials y login - Éxito', async () => {

        const loginData = { ok: true, ...demoUser }
        //¡ Básicamente llamamos a esperar que jest haga un mock de este provider para que al llamarlo en el thunk devuelva el resultado esperado
        await signInWithGoogle.mockResolvedValue( loginData );

        //¿ thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startGoogleSignIn debe de llamar el checkingCredentials y logout - Error', async () => {

        const loginData = { ok: false, errorMessage: 'Hubo un error en Google' }

        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ));

    });

    // ? startLoginWithEmailPassword

    test('startLoginWithEmailPassword debe de llamar el checkingCredentials y login - Éxito', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ));

    });

    test('startLoginWithEmailPassword debe de llamar el checkingCredentials y logout - Error', async () => {

        const loginData = { ok: false, errorMessage: 'Hubo un error en Google' }
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ));

    });

    // ? startCreatingUserWithEmailPassword

    test('startCreatingUserWithEmailPassword debe de llamar el checkingCredentials y login - Éxito', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ));

    });

    test('startCreatingUserWithEmailPassword debe de llamar el checkingCredentials y logout - Error', async () => {

        const loginData = { ok: false, errorMessage: 'Hubo un error en Google' }
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: loginData.errorMessage } ));

    });

    // ? startLogout

    test('startLogout debe de llamar: logoutFirebase, clearNotesLogout y logout', async () => {

        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout({}) );

    });
    

});