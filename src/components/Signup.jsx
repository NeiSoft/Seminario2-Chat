import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

import Alert from './Alert';




const MyLink = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

const theme = createTheme();

const Signup = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertMessage(null);
   firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
   .then(response =>{
    //gurdarlosdatos
    delete user.password;
    firebase.database().ref(`/users/${response.user.uid}`).set(user);
    setAlertMessage({
        type: 'success',
        message: 'Bienvenido a Chat App'
      });
     setTimeout(() => {
    props.history.push('/');
      }, 3000);
   })
   .catch(error =>{
    console.log(error);
     setAlertMessage({
     type: 'error',
     message: error.message
      });
   });
  };
  
 const[user, setUser] = useState({
  name:'',
  email:'',
  password:'',
  avatar:'', 
 });

 const [alertMessage, setAlertMessage] = useState(null);

const handleChange = (e) =>{
  setUser({
    ...user,
    [e.target.name]: e.target.value
  });
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
           Registrarme en UNLaR Chat
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="fname"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  value={user.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarme
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/Login" component={MyLink} variant="body2">
                  ¿Ya tiene una cuenta ?, ingresar. 
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      {alertMessage && 
        <Alert
          type={alertMessage.type}
          message={alertMessage.message}
          autoclose={5000}
        />
      }
      </Container>
    </ThemeProvider>
  );
}

export default withRouter(Signup);