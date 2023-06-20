export default (
  element,
  dir
) => {
  element.closest('[dir]').dir === dir
}
