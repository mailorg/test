export default (
  amount,
  {
    VATRate
  }
) => {
  console.log(amount);
  console.log(amount / (VATRate + 100));
  return (amount/(VATRate+100))*100
}