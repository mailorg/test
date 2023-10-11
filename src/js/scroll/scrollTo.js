export const scrollTo = (container, containerScrollable, scrollPosition) => {
  const {scrollHeight} = containerScrollable

  container.scrollTo(scrollPosition, scrollHeight)
}