import React, { useEffect, useState } from 'react'
import API from '../../../axios'
import CuisineModel from './CuisineModel'
import { useAuth } from '../../../contexts/AuthContext'
import MenuDropDown from './MenuDropDown';
import "./Menu.css"
import Delete from '@mui/icons-material/Delete';

const Menu = () => {

  const [cuisines, setCuisines] = useState([])
  const [items, setItems] = useState([]);
  const [cuisineModel, setCuisineModel] = useState(null)
  const [updated, setUpdated] = useState(false);
  const { currentUser } = useAuth();
  const [menu, setMenu] = useState([])

  useEffect(() => {
    fetchData();
  }, [updated])
  const fetchData = async () => {
    const resp = await API.post("restaurant/getRestaurantMenu", { rid: currentUser._id });
    console.log(resp.data.menu)
    setMenu(resp.data.menu);
    setCuisines(resp.data.menu.map((ele) => ele.name));
  }
  const handleUpdate = () => {
    setUpdated(!updated);
  }
  const openCuisineModel = (elem, index) => {
    setCuisineModel(elem)
    setItems([])
    menu.map((ele) => {
      if (ele.name == elem) {
        setItems(ele.items)
      }
    })
  }
  const updateCuisineModel = (newstate) => {
    setCuisineModel(newstate);
  }

  const handleAddCuisine = async ({ _id, name }) => {
    console.log(name, _id)
    if (cuisines.indexOf(name) == -1) {
      const resp = await API.post("/restaurant/addNewCuisine", { rid: currentUser._id, cuisineName: name, cuisineId: _id });
      console.log(resp.data);
      setCuisines((prev) => [...prev, name])
    }
    else {
      alert("Cuisine already Exists")
    }
  }

  const handleDeleteCuisine = async (event, cuname) => {
    event.stopPropagation();
    const reply = confirm('Are you sure you want to delete the cuisine?\nThis will also delete the items present in it permanently')
    if (reply) {
      const resp = await API.post("/restaurant/deleteCuisine", { rid: currentUser._id, cuisine: cuname });
      setMenu(resp.data.menu);
      setCuisines(resp.data.menu.map((ele) => ele.name));
    }
  }

  return (
    <>
      <div className="backdrop">
        <h1 className='mx-5 my-2'> Menu </h1>
        <div className="container">
          {/* <input type="text" name="" className='addCuisine' value={newCuisine} onChange={handleChange} placeholder='Enter Cuisine' /> */}
          <MenuDropDown handleAddCuisine={handleAddCuisine} />
        </div><br />
        <div className="container">
          {
            cuisineModel != null &&
            <CuisineModel
              name={cuisineModel}
              items={items}
              updateCuisineModel={updateCuisineModel}
              handleUpdate={handleUpdate}
            />
          }
          <div className='cuisine_container'>
            {
              cuisines.map((elem, ind) => {
                return (
                  <div className='cuisineHolder' onClick={() => { openCuisineModel(elem, ind) }}>
                    <h2>{elem}</h2>
                    <button className='btn btn-danger'>
                      <Delete 
                        onClick={(event) => {
                          handleDeleteCuisine(event, elem)
                        }}
                        fontSize='medium'
                      />
                    </button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu