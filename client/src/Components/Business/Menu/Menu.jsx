import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './Menu.css'

function Menu() {
  const [loe, setLoe] = useState([]);
  const [addNewCuisine, setaddNewCuisine] = useState(false)
  const [addNewItem, setAddNewItem] = useState(false)
  const [cuisine, setCuisine] = useState("")
  // const handleChange = () => {
  // }
  // const handleClick = () => {
  //   setAddNewItem(true)

  // }
  // const handleAddNewCuisine = () => {
  //   setaddNewCuisine(true)
  // }
  // const handleAddItem = () => {
  //   setaddNewCuisine(true)
  // }
  function handleChange(event) {
    setCuisine(event.target.value)
  }
  function handleClick() {
    console.log("Clicked");
    // setLoe((prev) => [...prev, cuisine]);
    setLoe((prev) => [...prev, { 'name': cuisine, 'items': [] }]);
    console.log(loe);
  }
  function handleAddItem(index) {
    console.log("Add item request");
    console.log(loe);
    setLoe((prev) => {
      prev[index].items = [...prev[index].items, 'abcde']
      // prev[index].items = newlist
      return [...prev]
    })
    console.log(loe);
  }
  // [{name:value,items:[val1,val2]},{}]
  return (
    <>
      <h1>Add Menu</h1>

      <div>
        <input type='text' placeholder='Enter your name to reserve table' onChange={handleChange} value={cuisine}></input>
        <button onClick={handleClick} className='btn btn-primary add_btn'>Add Element</button>
      </div>
      <br></br>
      {
        loe.map((ele, index) => {
          return (
            <>
              <div className='cuisine' key={index}>
                <h1>{ele.name}</h1>
                <input type="text" placeholder={'Enter the item of ' + ele.name + ' to add'} />
                <button onClick={() => {
                  handleAddItem(index)
                }}> Add Item</button>
                <br /><br />
                {
                  ele.items.map((e, index) => {
                    return (
                      <>
                        <div>
                          {
                            console.log(e,index)
                          }
                          <h3>{e}</h3>
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </>)
        })}
    </>
  );
}

export default Menu;
