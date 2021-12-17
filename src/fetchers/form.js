import { onSubmitPrevented } from '@mailo/front/events/listeners/onSubmitPrevented.js'
import { page } from '@mailo/front/fetchers/page.js'
import { object } from '@mailo/front/utils/object.js'

const empties = ['get', 'head']

const fetcher = object(onSubmitPrevented, {
  async task (
    target
  ) {
    const { action, method, ownerDocument } = target
    const { defaultView } = ownerDocument
    const { FormData, Request, URL, URLSearchParams } = defaultView
    const body = new FormData(target)
    const url = new URL(action)
    const init = { method }

    if (empties.includes(method.toLowerCase())) {
      url.search = `${new URLSearchParams(body)}`
    } else {
      init.body = body
    }

    await page(object(null, {
      request: new Request(url, init),
      target
    }))
  }
})

export const form = (
  element
) => {
  fetcher.listen(element)
}
