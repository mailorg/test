import defaults from '@mailobj-js/front/selectors/defaults.js'
import one from '@mailobj-js/front/selectors/one.js'

const { document } = defaults
const { location } = document

export default (
  path,
  params = {}
) => {
  const service = one('meta[name="ea_service"]').content
  const s = one('meta[name="ea_s"]').content
  const url = new URL(`/${service}/${path}.php`, location)

  url.search = `${new URLSearchParams(Object.entries({ ...params, s }))}`

  return `${url}`
}
