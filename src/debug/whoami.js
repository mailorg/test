export const whoami = (
  { url }
) => {
  const [prefix] = url.split(/\/(?=modules-[^/]+\/src\/)/)
  const path = url.replace(prefix, '*')

  return (element) => {
    console.log(`Logged from ${path}`, element)
  }
}
