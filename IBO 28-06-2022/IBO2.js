const listOfProducts = [
  {
    productName: "TV",
    quantity: 10,
    description: "television",
  },
  {
    productName: "AC",
    quantity: 5,
    description: "air conditioner",
  },
  {
    productName: "TV",
    quantity: 10,
    description: "television",
  },
  {
    productName: "AC",
    quantity: 5,
    description: "air conditioner",
  },
  {
    productName: "FAN",
    quantity: 10,
    description: "Ceiling Fan",
  },
];

//PROBLEM STATEMENT:
//   1. you need to write a function say, getUniquePrducts which should return an array of objects by grouping the products based on the productName and summing up the quantity for the same products present in the given list of Products considering Product Name as Key.

//   Sample Output for the given listOfProducts will be :
// [
//   {
//     productName: "TV",
//     quantity: 20,
//     description: "television",
//   },
//   {
//     productName: "AC",
//     quantity: 10,
//     description: "air conditioner",
//   },
//   {
//     productName: "FAN",
//     quantity: 10,
//     description: "Ceiling Fan",
//   },
// ];

function getUniqueProducts(arrOfObjs) {
  let uniqueProducts = {};
  for (let key in arrOfObjs)
    uniqueProducts[arrOfObjs[key].productName]
      ? (uniqueProducts[arrOfObjs[key].productName].quantity +=
          arrOfObjs[key].quantity)
      : (uniqueProducts[arrOfObjs[key].productName] = arrOfObjs[key]);
  return Object.values(uniqueProducts);
}

console.log(getUniqueProducts(listOfProducts));
