import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google, Password } from "@mui/icons-material"
import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

const formData = {
  email: '',
  password: '',
};


export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData );

  const isAuthenticating = useMemo( () => status === 'checking', [ status ]);

  const onSubmit = ( event ) => {
      event.preventDefault(); 
      dispatch( startLoginWithEmailPassword({ email, password }) );
  }

  const onGoogleSignIn = () => {
      // console.log('On Google sign in');
      dispatch( startGoogleSignIn( email, password) );
  }

  return (
    <AuthLayout title='Login'>      
      <form aria-label="submit-form" onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
        
          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 12 }} sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com"
                fullWidth
                name='email'
                value={ email }
                onChange={ onInputChange }
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 12 }} sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth
                name='password'
                slotProps={{
                  input: {
                    inputProps: {'data-testid': 'password'}
                  } 
                }}
                value={ password }
                onChange={ onInputChange }
              />
            </Grid2>
          </Grid2>

          <Grid2 
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{ mt: 2 }}
                display={ !!errorMessage ? '' : 'none'}
          >
                <Alert severity='error'>
                  { errorMessage }
                </Alert>
          </Grid2>

          <Grid2 container spacing={ 2 } sx={{ mb: 2, mt : 1 }}>

            <Grid2 size={{ xs: 12, sm: 6, md: 12 }}>
              <Button 
                disabled={ isAuthenticating }
                type="submit" 
                variant='contained' 
                fullWidth
              >
                Login
              </Button>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 12 }}>
              <Button 
                disabled={ isAuthenticating }
                onClick={ onGoogleSignIn } 
                variant='contained' 
                aria-label='google-btn'
                fullWidth 
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid2>

          </Grid2>

          <Grid2 container direction='row' justifyContent='end'>

            <Link component={ RouterLink } color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
            
          </Grid2>

      </form>

    </AuthLayout>    

  )
}
