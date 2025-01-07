import { Padding, SaveOutlined } from "@mui/icons-material"
import { Button, Grid2, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"

export const NoteView = () => {
  return (
    <>
        <Grid2 container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid2 item>
                <Typography fontSize={ 39 } fontWeight='light' >06 de Enero, 2025</Typography>
            </Grid2>

            <Grid2 item>
                <Button color="primary" sx={{p: 2}}>
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
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió el día de hoy?"
                minRows={ 5 }
            />

        </Grid2>

        <ImageGallery />
    </>

  )
}