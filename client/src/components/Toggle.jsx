import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeLight } from '../actions'
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
} from 'darkreader'

const size = 0.7

const ToggleContainer = styled.button`
  position: relative;
  justify-content: space-between;
  background: ${({ theme }) => theme.gradient};
  width: ${8 * size}rem;
  height: ${3.5 * size}rem;
  margin: 5px;
  border-radius: ${30 * size}px;
  border: ${2 * size}px solid ${({ theme }) => theme.toggleBorder};
  font-size: ${0.5 * size}rem;
  padding: ${0.5 * size}rem;
  overflow: hidden;
  cursor: pointer;

  img {
    max-width: ${2.5 * size}rem;
    height: auto;
    transition: all 0.3s linear;

    &:first-child {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(0)' : 'translateY(100px)'};
    }

    &:nth-child(2) {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
`

function Toggle(props) {
  const { isLight, setIsLight } = props

  const toggleTheme = () => {
    if (isLight) {
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      })
      setIsLight(false)
    } else {
      disableDarkMode()
      setIsLight(true)

    }
  }
  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <img src="https://image.flaticon.com/icons/svg/1164/1164954.svg" width="224" height="224" alt="Sun free icon" title="Sun free icon" />
      <img src="https://image.flaticon.com/icons/svg/2033/2033921.svg" width="224" height="224" alt="Moon free icon" title="Moon free icon" />
    </ToggleContainer>
  )
}

const mapStateToProps = ({ general }) => ({
  isLight: general.isLight,
})

const mapActionsToProps = dispatch => ({
  setIsLight: bindActionCreators(changeLight, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(Toggle))