export default (
  amount,
  {
    VATRate
  }
) => {
  console.log(amount);
  console.log(VATRate+100);
  return (amount/(parseInt(VATRate)+100))*100
}