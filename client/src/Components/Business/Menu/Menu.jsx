import React, { useState } from 'react'
import "./Menu.css"
import CuisineModel from './CuisineModel'
const Menu = () => {
  // const [cuisines,setCuisines]=useState([{"name":'Italian'},{'name':'Chineese'}])
  const [cuisines, setCuisines] = useState(['Italian', 'Mexican'])
  const [items,setItems]=useState(["abc","def"]);
  const [newCuisine, setNewCuisine] = useState("")
  const [cuisineModel, setCuisineModel] = useState(null)
  
  const openCuisineModel = (elem,index) => {
    // setItem(cuisines[index])
    setItems([{"Name":"Tandori paneer","Price":100,"Description":"ahsn"},{"Name":"mexican paneer","Price":1000,"Description":"absjdkchsn"}])
    setCuisineModel(elem)
  }
  const updateCuisineModel = (newstate) => {
    setCuisineModel(newstate);
  }
  const handleChange = (e) => {
    setNewCuisine(e.target.value)
  }
  const handleAddCuisine = () => {
    setCuisines((prev) => [...prev, newCuisine])
    setNewCuisine("")
  }
  return (
    <>
      <div className="container">
        <h1> Menu </h1>
        <div className="container">
          <input type="text" name="" className='addCuisine' value={newCuisine} onChange={handleChange} placeholder='Enter Cuisine' />
          <button className='btn btn-primary'  onClick={handleAddCuisine}>Add Cuisine</button>
        </div>
        <div className="container">
          {
            cuisineModel!=null && <CuisineModel name={cuisineModel} items={items} updateCuisineModel={updateCuisineModel} />
          }
          {
            cuisines.map((elem, ind) => {
              return (
                <div className='cuisineHolder' onClick={()=>{openCuisineModel(elem,ind)}}>
                  {elem}
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Menu