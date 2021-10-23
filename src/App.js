import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/layout/Header";
import User from "./components/User";
import Routes from "./Routes";

import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import { loadUser } from "./utils/dbUtils";


import { createTheme, ThemeProvider } from "@material-ui/core/styles";


const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#c75f1f",
    },
    secondary: {
      main: "#0e0d0e",
    },
    warning: {
      main: "#ffeb3b",
    },
  },
});


const firebaseConfig = {

};

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  const onLogout = () => {
    setUser(null);
  };

    useEffect(() => {
    firebase.auth().onAuthStateChanged(response => {
      if (response) {
        // leer datos del usuario
        loadUser(response.uid)
        .then(data => { setUser(data); });
      }
    });
  }, []);
 
  return (
  <ThemeProvider theme={theme}>
    <Router>
      <CssBaseline />
      <Header>{user && <User user={user} onLogout={onLogout} />}</Header>
      <Routes />
    </Router>
  </ThemeProvider>
  );
}

export default App;
