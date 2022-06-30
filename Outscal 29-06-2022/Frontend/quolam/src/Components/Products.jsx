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
    axios
      .get("https://outscalassignment.herokuapp.com//products")
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  const handleSort = (e) => {
    let newData = [];
    axios
      .get("https://outscalassignment.herokuapp.com//products")
      .then((res) => {
        newData = res.data;
        if (e === "sortPriceAsc") {
          newData.sort((a, b) => a.price - b.price);
        } else if (e === "sortPriceDes") {
          newData.sort((a, b) => b.price - a.price);
        }
        setProducts(newData);
      });
  };

  const handlePriceFilter = (e) => {
    let newFilterData = [];
    axios
      .get("https://outscalassignment.herokuapp.com//products")
      .then((res) => {
        newFilterData = res.data;

        if (e === "1000 - 1499") {
          newFilterData = newFilterData.filter(
            (item) => item.price > 1000 && item.price < 1499
          );
        } else if (e === "1500 - 3000") {
          newFilterData = newFilterData.filter(
            (item) => item.price > 1500 && item.price < 3000
          );
        }
        setProducts(newFilterData);
      });
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
