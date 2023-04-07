import defaults from '@mailobj-browser/front/js/selectors/defaults.js'
import one from '@mailobj-browser/front/js/selectors/one.js'

const { document } = defaults
const { location } = document

export default (
  path,
  params = {}
) => {
  const service = one('meta[name="ea_service"]').content
  const s = one('meta[name="ea_s"]').content
  const { href } = one('base', document) ?? location
  const url = new URL(`/${service}/${path}.php`, href)

  url.search = `${new URLSearchParams(Object.entries({ ...params, s }))}`

  return `${url}`
}
