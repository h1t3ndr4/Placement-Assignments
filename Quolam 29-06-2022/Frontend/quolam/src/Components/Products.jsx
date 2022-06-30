import React, { useEffect, useState } from "react";
import {
  ProdCard,
  ProdBorder,
  SelectTag,
  OptionTag,
  CartButton,
} from "./StyledComponents";

import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(15);

  const showMoreProducts = () => {
    setVisible((prev) => prev + 15);
  };

  useEffect(() => {
    axios.get("https://quolamassignment.herokuapp.com/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleSort = (value) => {
    let newData = [];
    newData = products;
    if (value === "sortPriceAsc") {
      newData.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        return -1;
      });
    } else if (value === "sortPriceDes") {
      newData.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        return -1;
      });
    }
    setProducts(newData);
  };

  const handlePriceFilter = (value) => {
    let newData = [];
    newData = products;
    if (value === "1000 - 1499") {
      newData = newData.filter(
        (item) => item.price > 1000 && item.price < 1499
      );
    } else if (value === "1500 - 3000") {
      newData = newData.filter(
        (item) => item.price > 1500 && item.price < 3000
      );
    } else if (value === "all") {
      newData = products;
    }
    setProducts(newData);
  };

  //if my scroll bar is at the bottom, load more products
  window.onscroll = () => {
    setTimeout(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        showMoreProducts();
      }
    }, 1000);
  };

  return (
    <>
      <div>
        <SelectTag
          name="sort"
          id="sort"
          onChange={(e) => handleSort(e.target.value)}
        >
          <OptionTag value="sortPriceAsc">Sort By Price Ascending</OptionTag>
          <OptionTag value="sortPriceDes">Sort By Price Descending</OptionTag>
        </SelectTag>
        <SelectTag
          name="filter"
          id="filter"
          onChange={(e) => handlePriceFilter(e.target.value)}
        >
          <OptionTag value="all">All</OptionTag>
          <OptionTag value="1000 - 1499">1000 - 1499</OptionTag>
          <OptionTag value="1500 - 3000">1500 - 3000</OptionTag>
        </SelectTag>
      </div>
      <ProdCard className="ProductsContainer">
        {products.slice(0, visible).map((item) => (
          <ProdBorder key={item._id}>
            <h5>{item.prod_name}</h5>
            <img src={item.imgUrl} alt={item.imgUrl} width="200px" />
            <h5>Price : {item.price}</h5>
            <h5>Discount : {item.prod_discount}</h5>
            <h5>Striked Off Price : {item.strikedOffPrice}</h5>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CartButton>Add To Cart</CartButton>
            </div>
          </ProdBorder>
        ))}
      </ProdCard>
      <>
        {visible < products.length && (
          <CartButton onClick={showMoreProducts}>Show More</CartButton>
        )}
      </>
    </>
  );
}
