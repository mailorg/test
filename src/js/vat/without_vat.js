export default (
  amount,
  {
    VATRate
  }
) => {
  return (amount/((VATRate/10)+100))*100
}