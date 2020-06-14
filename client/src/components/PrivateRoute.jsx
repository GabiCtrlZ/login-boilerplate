import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
            isLoggedIn ? (
              <Component {...props}/>
            ) : (<Redirect to={'/login'} />)
          )
        }
      }
    />
  )
}
