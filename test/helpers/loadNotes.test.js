import { loadNotes } from "../../src/helpers"

describe('Pruebas en loadNotes', () => {

    test('debe de retornar las notas con el id de coleccion especificado', async () => { 

        const uid = 'TEST-UID'

        const notes = await loadNotes( uid );

        expect( notes.length ).toBeGreaterThanOrEqual( 0 );

    })


    test('debe de lanzar un error si no hay id', async () => { 

        const notes = await loadNotes();

        expect( notes ).toBeNull( );

    })

})