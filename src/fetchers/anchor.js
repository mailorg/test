import { onClickPrevented } from '@mailo/front/events/listeners/onClickPrevented.js'
import { page } from '@mailo/front/fetchers/page.js'
import { object } from '@mailo/front/utils/object.js'

const fetcher = object(onClickPrevented, {
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

export const anchor = (
  element
) => {
  fetcher.listen(element)
}
