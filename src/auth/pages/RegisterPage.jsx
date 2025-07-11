import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks';

import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 letras'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false);
  
  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid, 
  } = useForm( formData, formValidations );

  const onSubmit = ( event ) => {
    event.preventDefault();
    setformSubmitted(true);

    if( !isFormValid ) return;

    // Se podría evauluar que isCheckingAuthentication está en false antes de ejecutar el dispatch
    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  return (
    <AuthLayout title='Crear Cuenta'>
      {/* <h3>FormValid: {isFormValid ? 'Válido' : 'NO válido'}</h3> */}

      <form aria-label="submit-form" onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>

          <Grid2 container>

            <Grid2 size={{ xs: 12, md: 12 }} sx={{ mt: 2 }}>
              <TextField 
                label="Nombre Completo" 
                type="text" 
                placeholder="Sakata Gintoki"
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
              />
            </Grid2>  

            <Grid2 size={{ xs: 12, md: 12 }} sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 12 }} sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth
                name="password"
                slotProps={{
                  input: {
                    inputProps: { 'data-testid' : 'password' }
                  }
                }}
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid2>
          </Grid2>

          <Grid2 container spacing={ 2 } sx={{ mb: 2, mt : 1 }}>

            <Grid2 
              size={{ xs: 12, sm: 6, md: 12 }}
              display={ !!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 12 }}>
              <Button 
                disabled={ isCheckingAuthentication }
                type='submit'
                variant='contained' 
                fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid2>

          </Grid2>

          <Grid2 container direction='row' justifyContent='end'>

            <Typography sx={{ mr: 1}}>¿Ya tienes cuenta?</Typography>

            <Link component={ RouterLink } color='inherit' to="/auth/login">
              Ingresar
            </Link>
            
          </Grid2>

      </form>

    </AuthLayout>    

  )
}
