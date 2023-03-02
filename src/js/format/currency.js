export default (
  { value, scopeJson }
) => {
  const json = JSON.parse(scopeJson)
  const decimals = (json.decimals) ?? 2
  const decimalSeparator = (json.decimalSeparator) ?? '.'
  const currency = (json.currency) ?? '$'
  const currencyBefore = (json.currencyBefore !== '') ? json.currencyBefore.replace('$', currency) : ''
  const currencyAfter = (json.currencyAfter !== '') ? json.currencyAfter.replace('$', currency) : ''
  
  const price = value / 100
  const strPrice = price.toFixed(decimals).toString().replace('.', decimalSeparator)

  return currencyBefore + strPrice + currencyAfter
}
