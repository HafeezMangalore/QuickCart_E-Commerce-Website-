import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      fetchInfo();
    } catch (error) {
      console.error('Remove product error:', error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Product List</h1>

      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>Rs.{product.old_price}</p>
              <p>Rs.{product.new_price}</p>
              <p>{product.category}</p>
              <img 
                onClick={() => { remove_product(product.id) }} 
                className='listproduct-remove-icon' 
                src={cross_icon} 
                alt="" 
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
