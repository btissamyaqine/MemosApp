import React, {useState, useEffect} from 'react';
import { Paper, Grid, Avatar, Button, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import { gapi } from 'gapi-script';
import Input from './Input'

const Auth = () => {

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false)

  const [isSignup, setIsSignup] = useState(false);
  
  const dispatch = useDispatch();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
  
  const handleSubmit = () => {

  };
  const handleChange = () => {

  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.projelrObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: {result, token} });
    }catch (error) {
      console.log(error)
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccesseful. Try Again Later")

  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);
  

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form classNmae={classes.form} onSubmit = {handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Adress" handelChange={handleChange} type="email"/>
              <Input name="password" label="Password" handelChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> 
                {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin 
            clientId= "821674936802-t3ngcbqv8mm0npuj5qkl3m62amd63adh.apps.googleusercontent.com"
            render= {(renderProps) => (
              <Button 
                color='primary' 
                className={classes.googleButton} 
                fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon />} 
                variant="contained">Google Sign In
              </Button>
            )}
            onSuccess= {googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sing In' : "Don't have an account? Sing Up"  }
              </Button>
            </Grid>

          </Grid>

        </form>
      </Paper>
    </Container>
  );
}

export default Auth