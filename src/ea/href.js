const { document, location } = globalThis
const service = document.querySelector('meta[name="ea_service"]').content
const s = document.querySelector('meta[name="ea_s"]').content

export default (
  path,
  params = {}
) => {
  const url = new URL(`/${service}/${path}.php`, location)

  url.search = `${new URLSearchParams(Object.entries({ ...params, s }))}`

  return `${url}`
}
