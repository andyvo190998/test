import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [item, setItem] = useState({
    title: '',
    description: ''
    
  })

  const [items, setItems] = useState([{
    title: '',
    description: '',
    _id: ''
  }])
  
  useEffect(() => {
    fetch("/items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setItems(jsonRes))
      .catch((err) => console.log(err));
  }, [items]);



  const handleOnchange = (event) => {
     const {name, value} = event.target;
     setItem((previous) => {
       return {
         ...previous,
         [name]: value
       }
     })
     console.log(item)
  }

  const addItem = (event) => {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description
    }
    axios.post('/newitem', newItem);
    alert('item added');
    setItem({
      title: '',
      description: ''
    })
  }
  
  return (
    <div>
      <input type="text" name="title" value={item.title} placeholder="title" onChange={handleOnchange} />
      <input type="text" name="description" value={item.description} placeholder="description" onChange={handleOnchange} />
      <button onClick={addItem} >add item</button>
      {items.map((item) => {
        return (
          <div
            key={item._id} style={{ width: "40%", margin: "auto auto" }}
          >
            <p><span style={{color: 'red'}}>title: </span>{item.title}</p>
            <p><span style={{color: 'red'}}>description: </span>{item.description}</p>
          </div>
        );
      })}
        
    </div>
  )
}

export default App
