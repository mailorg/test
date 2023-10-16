export default (
  amount,
  {
    decimals = 2,
    VATDiv = 100
  }
) => {
  return `${(amount/VATDiv).toFixed(decimals)}`
}