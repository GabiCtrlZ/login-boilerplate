import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Toggle from '../Toggle'
import { bindActionCreators } from 'redux'

import { login, resetLoginError } from '../../actions'
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
  const [showPassword, setShowPassword] = useState(false)
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
          <FormControl style={{ marginTop: 10 }} fullWidth variant="outlined" >
            <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
            <OutlinedInput
              inputProps={{ style: inputStyle }}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              fullWidth
              required
              label="Password"
              onChange={(e) => { setPassword(e.target.value) }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => {
                      event.preventDefault()
                    }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Keep me logged in"
          />
          <Button
            fullWidth
            disabled={!(email && password)}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
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