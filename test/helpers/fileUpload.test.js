import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dx6rsbm1f',
    api_key: '817217486334437',
    api_secret: 'Ytyoa1gyk_A6gnEEc-buPe55jt4',
    secure: true
});

describe('Pruebas en fileUpload.js', () => {

    test('debe subir el archivo correctamente a Cloudinary', async () => {

        const imageUrl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';

        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        // ¡ Para borrar imagen de cloudinary a través del cloudinarySDK
        // console.log(url);
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        const cloudResp = await cloudinary.api.delete_resources([ imageId ], {
            resource_type: 'image',
        });
        
        // console.log({ cloudResp });
    });

    test('debe retornar null', async () => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        // ¡ Se puede evaluar con toBe porque null es considerado un tipo de dato primitivo
        expect( url ).toBe( null );
    });

});