import  React, {useState} from 'react';
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

const Login = (props) => {




  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(response => {
      props.history.push('/');
    })
    .catch(error => {
      console.log(error);
     // alert(error.message);
      setErrorMessage(error.message);
    });
  };

  const handleChange = (e) =>{
  setUser({
    ...user,
    [e.target.name]: e.target.value
  });
}
     const [user, setUser] = useState({
    email: '',
    password: ''
     });

      const [errorMessage, setErrorMessage] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
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
            Ingresar a UNLaR Chat 
          </Typography>
          <Box component="form" onSubmit={handleLogin}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Dirección de Email"
              name="email"
              autoComplete="email"
              autoFocus
              defaultValue={user.email}
              onChange={handleChange}              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue={user.password}
              onChange={handleChange}            
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>

              <Grid item>
                <Link to="/Signup" component={MyLink} variant="body2">
                  {"No tengo una cuenta"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
           {errorMessage &&
        <Alert type="error" message={errorMessage} autoclose={5000} />
      }
      </Container>
    </ThemeProvider>
  );
}
export default withRouter(Login); 