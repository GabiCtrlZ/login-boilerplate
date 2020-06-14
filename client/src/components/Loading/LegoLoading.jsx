import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Lottie from 'react-lottie'
import FadeIn from 'react-fade-in'
import * as legoData from './410-lego-loader.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

export default function LegoLoading(props) {
  const { open } = props

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogContent>
          <div>
            <FadeIn>
              <div className="d-flex justify-content-center align-items-center">
                <h1>Loading</h1>
                <Lottie options={defaultOptions} height={120} width={120} />
              </div>
            </FadeIn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}