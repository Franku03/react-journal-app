import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result =  await signInWithPopup( FirebaseAuth, googleProvider );
        // ¿ Para poder ver las credenciales del usuario en consola:
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log({ credentials }) 
        
        const { displayName, email, photoURL, uid }= result.user

        return{
            ok: true,
            // User Info
            displayName,
            email,
            photoURL, 
            uid,
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
            errorCode,
        }
    }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {

    try {
        // Se crea el usuario, y de salir exitoso ingresa al usuario en la app
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        // console.log(resp);
        // Se Actualizar el displayName del usuario en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message };
    }

}

export const loginWithEmailPassword = async({ email , password }) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = resp.user;

        return{
            ok: true,
            // User Info
            displayName, email, photoURL, uid,
        }
        
    } catch (error) {
        return { ok: false, errorMessage: error.message };
    }


}


export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}