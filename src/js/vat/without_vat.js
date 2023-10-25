export default (
  amount,
  {
    VATRate
  }
) => {
  console.log(VATRate + 100);
  return (amount/(VATRate+100))*100
}