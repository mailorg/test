export default (
  amount,
  {
    currency = '$',
    currencyBefore = '',
    currencyAfter = '',
    decimals = 2,
    decimalSeparator = '.',
  }
) => {
  return `${currencyBefore}${(amount/100).toFixed(decimals)}${currencyAfter}`
    .replace('.', decimalSeparator)
    .replaceAll('$', currency)
}