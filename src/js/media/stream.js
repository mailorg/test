import object from '@mailobj-browser/front/js/utils/object.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'

const tracks = object(null, {
  audio: new Set(),
  video: new Set()
})

const onEnded = object(listener, {
  type: 'ended',
  passive,
  task (track) {
    const { kind } = track
    
    tracks[kind].delete(track)
  }
})

export const get = async (window, constraints) => {
  const { navigator } = constraints
  const { mediaDevices } = navigator
  const media = await mediaDevices.getUserMedia(constraints)
  
  for (const track of media.getTracks()) {
    const { kind } = track
    
    onEnded.listen(track)
    tracks[kind].add(track)
  }
  
  return media
}

export const has = kind => {
  return tracks[kind].size > 0
}

export const stop = stream => {
  for (const track of stream.getTracks()) {
    track.stop()
  }
}
