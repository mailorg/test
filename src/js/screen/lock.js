let lock

export default async () => {
  const { navigator } = globalThis
  const { wakeLock } = navigator

  if (lock) {
    throw new Error('screen is already locked')
  }

  try {
    lock = await wakeLock?.request('screen')
  } catch ( { name, message } ) {
    console.error(`${name}`, `${message}`)
  }
}

export const release = async () => {
  lock = await lock?.release()
}
