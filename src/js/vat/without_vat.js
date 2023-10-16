export default (
  amount,
  {
    VATRate
  }
) => {
  console.log(VATRate);
  return (amount/(VATRate+100))*100
}