export default (
  amount,
  {
    VATRate
  }
) => {
  return (amount/(VATRate+100))*100
}