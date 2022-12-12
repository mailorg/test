export const get = (constraints) => {
  return navigator.mediaDevices.getUserMedia(constraints)
}

export const stop = (stream) => {
  stream.getTracks().forEach((track) => {
    track.stop()
  })
}
