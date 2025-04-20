import { FirebaseDB } from "../../../src/firebase/config";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";

export const deleteTestNotes = async ( uid ) => {

    const collectionRef = await collection( FirebaseDB, `${ uid }/journal/notas/` )
    const docs = await getDocs( collectionRef );

    const deletePromises = [];
    docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
    await Promise.all( deletePromises );

}