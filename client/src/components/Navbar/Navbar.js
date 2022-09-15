import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import memories from "../../images/memories.png";


const Navbar = () => {

  const classes = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const Logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/');
    setUser(null);

  };
  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);
  
  return (
     
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                MemosApp
            </Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
          {user?.result ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user.result.imageUrl} >
                {user?.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.result.name}
              </Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={Logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button component={ Link } to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
  )
}

export default Navbar