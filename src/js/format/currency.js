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
  return `${currencyBefore}${(amount).toFixed(decimals)}${currencyAfter}`
    .replace('.', decimalSeparator)
    .replaceAll('$', currency)
}