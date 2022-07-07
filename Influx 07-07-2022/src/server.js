const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 2345;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let itemMaster = [];
let userCart = [];

//create a REST API to add items to an "itemMaster" array
//POST /api/items
//payload : {
//code : 100,
//name : "Popcorn",
//price : 20.00
//}

app.post("/api/items", (req, res) => {
  let item = req.body;
  if (itemMaster.find((i) => i.code === item.code)) {
    res.status(400).send("Item already exists");
  } else {
    itemMaster.push(item);
    res.send(itemMaster);
  }
});

//GET /api/items

app.get("/api/items", (req, res) => {
  res.send(itemMaster);
});

// ----------------------------------------------------------------------------------------------------------------------

// 2. Create a REST API to add items to a “userCart” array
// a. POST api/order/<orderId>
// Payload: { code: 100, qty: 3 }

app.post("/api/order/:orderId", (req, res) => {
  let item = req.body;
  let orderId = req.params.orderId;
  if (!itemMaster.find((i) => i.code === item.code)) {
    res.status(400).send("Item does not exist");
  } else {
    let itemToAdd = {
      code: item.code,
      qty: item.qty,
      unitPrice: itemMaster.find((i) => i.code === item.code).price,
      totalAmt: item.qty * itemMaster.find((i) => i.code === item.code).price,
    };
    if (userCart.find((i) => i.orderId === orderId)) {
      userCart.find((i) => i.orderId === orderId).items.push(itemToAdd);
    } else {
      userCart.push({
        orderId: orderId,
        items: [itemToAdd],
      });
    }
    res.send(userCart);
  }
});

// ----------------------------------------------------------------------------------------------------------------------

//3. create a REST API to summarize items in the “userCart” array
//a. GET api/order/<orderId>/summarize

app.get("/api/order/:orderId/summarize", (req, res) => {
  let orderId = req.params.orderId;
  let items = userCart.find((i) => i.orderId === orderId).items;
  let summarizedItems = [];
  let itemCode = items[0].code;
  let qty = 0;
  let totalAmt = 0;
  for (let i = 0; i < items.length; i++) {
    if (itemCode === items[i].code) {
      qty += items[i].qty;
      totalAmt += items[i].totalAmt;
    } else {
      summarizedItems.push({
        code: itemCode,
        qty: qty,
        unitPrice: itemMaster.find((i) => i.code === itemCode).price,
        totalAmt: totalAmt,
      });
      itemCode = items[i].code;
      qty = items[i].qty;
      totalAmt = items[i].totalAmt;
    }
  }
  summarizedItems.push({
    code: itemCode,
    qty: qty,
    unitPrice: itemMaster.find((i) => i.code === itemCode).price,
    totalAmt: totalAmt,
  });
  res.send(summarizedItems);
});

// ----------------------------------------------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
