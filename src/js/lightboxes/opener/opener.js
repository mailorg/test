const openers = new WeakMap()

export const listen = (
  opener
) => {
  onClick.listen(opener)
}

export const opener = (
  menu
) => {
  return openers.get(menu)
}
