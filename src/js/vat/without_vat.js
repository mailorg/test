export default (
  amount,
  {
    VATDiv = 100
  }
) => {
  return (amount/VATDiv)*100
}