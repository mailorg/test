export default (
  amount,
  {
    VATRate = 0
  }
) => {
  console.log(amount);
  console.log(VATRate+100);
  return (amount/(VATRate+100))*100
}