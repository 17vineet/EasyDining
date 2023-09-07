import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

function Menu() {
    const [addNewCuisine,setaddNewCuisine]=useState(false)
    const [addNewItem,setAddNewItem]=useState(false)
    const handleChange=()=>{
    }
    const handleClick=()=>{
        setAddNewItem(true)
        
    }
    const handleAddNewCuisine=()=>{
        setaddNewCuisine(true)
    }
    const handleAddItem=()=>{
        setaddNewCuisine(true)
    }
  return (
   <>
   <h1>Add Menu</h1>
  
   <button onClick={handleAddNewCuisine}  className='btn btn-primary add_btn'>Add a new cuisine</button>
    {addNewCuisine &&  <div   >
     <input type='text' className="border "placeholder='Add Cuisine' onChange={handleChange}></input>
      <button onClick={handleClick} className='btn btn-primary add_btn'>Add Cuisine</button><br/> {
        addNewItem && <div>
       <div className="container"> <input type='text' className="border "placeholder='Add Item' onChange={handleChange} ></input>
         <button  className='btn btn-primary add_btn'>Add Item</button><br/> </div>
         <h3>Xyz</h3>
        </div>
      }
     </div>}

   </>
  );
}

export default Menu;
