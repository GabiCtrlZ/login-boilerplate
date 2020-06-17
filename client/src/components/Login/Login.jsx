import React, { useState } from 'react'
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, resetLoginError } from '../../actions'
import Toggle from '../Toggle'
//TODO: Create registration page
//TODO: Make return submit when possbile
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    onLogin,
    isLoggedIn,
    loginError,
    onResetLoginError,
    isLight,
  } = props
  const classes = useStyles()
  const { from } = props.location.state || { from: { pathname: '/' } }
  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px white inset",
    WebkitTextFillColor: isLight ? 'black' : 'white' 
  }
  

  const handleSubmit = () => {
    onLogin({ email, password })
  }

  if (isLoggedIn) return <Redirect to={from} />
  return (
    <div>
      <Toggle />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <TextField
            inputProps={{ style: inputStyle }}
            error={loginError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onFocus={() => onResetLoginError()}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <TextField
            inputProps={{ style: inputStyle }}
            error={loginError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onFocus={() => onResetLoginError()}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Keep me logged in"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = ({ ui, general }) => ({
  isLoggedIn: ui.isLoggedIn,
  loginError: ui.loginError,
  isLight: general.isLight,
})

const mapActionsToProps = dispatch => ({
  onLogin: bindActionCreators(login, dispatch),
  onResetLoginError: bindActionCreators(resetLoginError, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(Login))