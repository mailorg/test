export default (
  amount,
  {
    currency = '$',
    currencyBefore = '',
    currencyAfter = '',
    decimals = 2,
    decimalSeparator = '.',
    VATDiv = 100
  }
) => `${currencyBefore}${(amount / VATDiv).toFixed(decimals)}${currencyAfter}`
  .replace('.', decimalSeparator)
  .replaceAll('$', currency)