import { generalTypes } from './types'

export const setLoadingTrue = () => ({
  type: generalTypes.LOADING_TRUE,
})

export const setLoadingFalse = () => ({
  type: generalTypes.LOADING_FALSE,
})

export const changeLight = () => ({
  type: generalTypes.CHANGE_LIGHT,
})
