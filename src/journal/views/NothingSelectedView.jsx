import { useEffect } from "react";
import { useSelector } from "react-redux";

import { StarOutline } from "@mui/icons-material"
import { Grid2, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NothingSelectedView = () => {


  const { messageDeleted } = useSelector( state => state.journal );

  useEffect(() => {
      if( messageDeleted.length > 0 ){
          Swal.fire('Nota eliminada', messageDeleted, 'success');
      }
  }, [messageDeleted]);


  return (
    <Grid2
        className='animate__animated animate__fadeIn animate__faster'
        container
        spacing={ 0 }
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 'calc(100vh - 100px)', backgroundColor: 'primary.main', borderRadius: 2}}
    >
        <Grid2 item="true" xs={ 12 } >
            <StarOutline sx={{ fontSize: 100, color:'white'}} />
        </Grid2>

        <Grid2 item="true" xs={ 12 } >
            <Typography color="white" variant="h5">Selecciona o crea una nota</Typography>
        </Grid2>

    </ Grid2>
  )
}
