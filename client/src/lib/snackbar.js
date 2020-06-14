let snackBarRef = null //eslint-disable-line
let closeRef = null //eslint-disable-line

function playSnackbar(...args) {
  if (snackBarRef) {
    const key = snackBarRef(...args)
    return key
  }
}

function closeSnackbar(key) {
  if (closeRef) {
    closeRef(key)
  }
}

function setRef(func, closeFunc) {
  snackBarRef = func
  closeRef = closeFunc
}

export {
  setRef,
  playSnackbar,
  closeSnackbar
}
