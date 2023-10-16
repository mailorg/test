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
  console.log(amount);
  console.log(amount.toFixed(decimals));
  return `${currencyBefore}${amount.toFixed(decimals)}${currencyAfter}`
    .replace('.', decimalSeparator)
    .replaceAll('$', currency)
}