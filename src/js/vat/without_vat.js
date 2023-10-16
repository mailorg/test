export default (
  amount,
  {
    VATRate
  }
) => {
  return (amount/(parseInt(VATRate)+100))*100
}