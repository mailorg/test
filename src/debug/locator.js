export default (
  { url }
) => {
  const { pathname } = new URL(url)

  return (element) => {
    console.log(`Logged from ${pathname}`, element)
  }
}
