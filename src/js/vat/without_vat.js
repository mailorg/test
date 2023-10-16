export default (
  amount,
  {
    VATRate = 0
  }
) => {
  console.log(amount);
  console.log(VATRate);
  return (amount/(VATRate+100))*100
}