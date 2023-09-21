import array from '@mailobj-browser/front/js/utils/array.js'

export default async (filter) => {
	return all(filter)
}

const all = async (filter) => {
  const devices = await navigator.mediaDevices?.enumerateDevices?.()

  if (devices) {
    const list = []
    for (const device of devices) {
      const { kind } = device
      if (filter && kind !== filter) {
        continue
      }
      list.push(device)
    }
    return array(...list)
  } else {
    throw new Error('Media Devices API is not supported.');
  }
}

const filter = async (type) => {
  const list = await all(type)
  const filtered = list.filter((dev) => dev.deviceId !== 'default')
  return array(...filtered)
}

export const videoinput = async () => {
  return filter('videoinput')
}
export const audioinput = async () => {
  return filter('audioinput')
}
export const audiooutput = async () => {
  return filter('audiooutput')
}
