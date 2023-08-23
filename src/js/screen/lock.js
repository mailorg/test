let lock

export default async () => {
  const { navigator } = window
  const { wakeLock } = navigator

  if (lock) {
    throw('screen is already locked')
  }

  try {
    lock = await wakeLock.request('screen')
  } catch (e) {
    const { name, message } = e
    console.error(`${name}`, `${message}`)
  }
}

export const release = async () => {
  if (!lock) {
    throw('screen is not locked')
  }
  await lock.release()
  lock = null
}
