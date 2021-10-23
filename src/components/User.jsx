import React from "react";
import IconButton from '@material-ui/core/IconButton';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

import CustomAvatar from './CustomAvatar'

 const MyLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);


const User = ({ history, user, onLogout }) =>{

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);

    firebase.auth().signOut().then(() => {
      if (onLogout) onLogout();
      history.push('/login');
    });
  };
    return(
        <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <CustomAvatar name={user.name} avatar={user.avatar} size="sm" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem disable>{user.name}</MenuItem>
                <MenuItem>
                <Link to="/profile" component={MyLink} variant="body2" onClick={handleClose}>
                  {"Mi Perfil"}
                </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Salir</MenuItem>
              </Menu>
            </div>
    )
};

export default withRouter(User); 
