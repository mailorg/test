export default (
  { url }
) => {
  return (element) => {
    console.log(`Logged from ${url}`, element)
  }
}
