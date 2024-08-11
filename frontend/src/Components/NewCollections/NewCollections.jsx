import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {
  const [newCollection, setNew_Collection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newCollections')
      .then((response) => response.json())
      .then((data) => setNew_Collection(data))
      .catch((error) => console.error('Error fetching new collections:', error));
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item, i) => {
          return (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NewCollections;
