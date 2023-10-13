export default (
  amount,
  {
    currency = '$',
    currencyBefore = '',
    currencyAfter = '',
    decimals = 2,
    decimalSeparator = '.',
    VATDiv = 100
  },
  noVat = false
) => {
  if (noVat) {
    VATDiv = 100
  }
  return `${currencyBefore}${(amount / VATDiv).toFixed(decimals)}${currencyAfter}`
    .replace('.', decimalSeparator)
    .replaceAll('$', currency)
}