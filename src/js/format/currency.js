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
  withVat = false
) => {
  if (withVat) {
    VATDiv = 100
  }
  console.log(amount, VATDiv);
  return `${currencyBefore}${(amount / VATDiv).toFixed(decimals)}${currencyAfter}`
    .replace('.', decimalSeparator)
    .replaceAll('$', currency)
}