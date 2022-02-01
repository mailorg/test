import page from '@mailobj-js/front/fetchers/page.js'
import prevented from '@mailobj-js/front/events/listeners/prevented.js'
import click from '@mailobj-js/front/events/types/click.js'
import object from '@mailobj-js/front/utils/object.js'

const fetcher = object(prevented, {
  type: click,
  async task (
    target
  ) {
    const { href, ownerDocument } = target
    const { defaultView } = ownerDocument
    const { Request } = defaultView

    await page(object(null, {
      request: new Request(href),
      target
    }))
  }
})

export default (
  element
) => {
  fetcher.listen(element)
}
