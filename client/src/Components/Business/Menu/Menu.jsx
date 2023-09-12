import React, { useEffect, useState } from 'react'
import API from '../../../axios'
import CuisineModel from './CuisineModel'
import { useAuth } from '../../../contexts/AuthContext'
import "./Menu.css"
const Menu = () => {

  const [cuisines, setCuisines] = useState(['Italian', 'Mexican'])
  const [items, setItems] = useState(["abc", "def"]);
  const [newCuisine, setNewCuisine] = useState("")
  const [cuisineModel, setCuisineModel] = useState(null)
  const { currentUser } = useAuth();
  const [menu,setMenu] = useState([])

  useEffect(() => {
    fetchData();
  }, [items])
  const fetchData = async () => {
    const resp = await API.post("restaurant/getRestaurantMenu", { rid: currentUser._id });
    setMenu(resp.data.menu) ;
    setCuisines(resp.data.menu.map((ele)=>ele.name)) ;
  }
  const openCuisineModel = (elem, index) => {
    setCuisineModel(elem)
    setItems([])
    menu.map((ele)=>{
      if(ele.name==elem){
        setItems(ele.items)
      }
    })
  }
  const updateCuisineModel = (newstate) => {
    setCuisineModel(newstate);
  }
  const handleChange = (e) => {
    setNewCuisine(e.target.value)
  }
  const handleAddCuisine = async () => {
    const resp = await API.post("/restaurant/addNewCuisine", { rid: currentUser._id, cuisine: newCuisine });
    console.log(resp.data);
    setCuisines((prev) => [...prev, newCuisine])
    setNewCuisine("")
  }
  return (
    <>
      <div className="container">
        <h1> Menu </h1>
        <div className="container">
          <input type="text" name="" className='addCuisine' value={newCuisine} onChange={handleChange} placeholder='Enter Cuisine' />
          <button className='btn btn-primary' onClick={handleAddCuisine}>Add Cuisine</button>
        </div>
        <div className="container">
          {
            cuisineModel != null && <CuisineModel name={cuisineModel} items={items} updateCuisineModel={updateCuisineModel} />
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