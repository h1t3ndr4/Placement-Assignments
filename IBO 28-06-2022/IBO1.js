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

// 1. you need to write a function say, getUniqueProductCount which should return count of each Product(as an object) present in the given list of Products considering Product Name as Key.

// Sample Output for the given listOfProducts will be :

// {
//   "TV": 2,
//   "AC": 2,
//   "FAN": 1
// }

function getUniqueProductCount(arrOfObjs) {
  let productCount = {};
  for (let i = 0; i < arrOfObjs.length; i++)
    productCount[arrOfObjs[i].productName]
      ? productCount[arrOfObjs[i].productName]++
      : (productCount[arrOfObjs[i].productName] = 1);

  return productCount;
}

console.log(getUniqueProductCount(listOfProducts));
