export default (
  amount,
  {
    VATDiv = 100
  }
) => {
  console.log(amount / VATDiv);
  return amount/VATDiv
}