import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, LinkOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid2, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import moment from 'moment/moment';
import 'moment/locale/es';

import { ImageGallery } from "../components"
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startDeletingNotes, startSavingNote, startUploadingFiles } from "../../store/journal";

moment.locale('es');

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, messageDeleted, isSaving} = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState, } = useForm( note );

    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return moment( newDate ).format('DD [de] MMMM, YYYY');
    }, [date]);

    const fileInputRef = useRef();
   
    // Efectos //////////////////

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState]);

    useEffect(() => {
        if( messageSaved.length > 0 ){
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);

    /////////////////////////////////

    const onSaveNote = () => {
        dispatch( startSavingNote() );
    }

    const onFileInputChange = ({ target }) => {
        if ( target.files === 0) return;
        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNotes() );
    }

  return (
    <>
        <Grid2 
            container 
            className='animate__animated animate__fadeIn animate__faster'
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            sx={{ mb: 1 }}
        >

            <Grid2 item="true" >
                <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
            </Grid2>


            <Grid2 item="true" >

                <input
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                {/* //¡ Aquí se podría hacer un botón para subir imágenes por un enlace */}
                {/* <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ handleOpen }
                >
                    <LinkOutlined />
                </IconButton> */}


                <Button 
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color="primary" 
                    sx={{p: 2}}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1}}/>
                    Guardar
                </Button>
            </Grid2>

            
        </Grid2>
        
        <Grid2 container>

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1}}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió el día de hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />

        </Grid2>

        <Grid2 container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx={{ mt: 2}}
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid2>

        <ImageGallery 
            images = { note.imageUrls }
        />
    </>

  )
}
