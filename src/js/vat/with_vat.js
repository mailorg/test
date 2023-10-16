export default (
  amount,
  {
    VATRate
  }
) => {
  return (amount/(1+VATRate/100))*100
}