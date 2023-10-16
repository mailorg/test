export default (
  amount,
  {
    currency = '$',
    currencyBefore = '',
    currencyAfter = '',
    decimalSeparator = '.',
  }
) => {
  return `${currencyBefore}${amount}${currencyAfter}`
    .replace('.', decimalSeparator)
    .replaceAll('$', currency)
}