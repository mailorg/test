export default (
  amount,
  {
    VATRate
  }
) => {
  return (amount/(parseFloat(VATRate)+100))*100
}