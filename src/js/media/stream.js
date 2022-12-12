export default (constraints) => {
  return navigator.mediaDevices.getUserMedia(constraints)
}
