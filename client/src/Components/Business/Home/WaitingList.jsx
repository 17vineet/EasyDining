import { useState } from 'react';
import './WaitingList.css';
import 'bootstrap/dist/css/bootstrap.css'
import uuid from 'node-uuid'
function WaitingList() {
  const [name, setName] = useState('')
  const [loe, setLoe] = useState(['Hetvik', 'Shah', 'Nainesh'])
  function handleClick() {
    console.log('Changed')
    setLoe([...loe, name]);
    console.log(loe)
  }
  function handleChange(event) {
    setName(event.target.value)
  }
  function handleDelete(index) {
    console.log(index)
    const updatedList = loe.filter((_,ind) => index != ind)
    setLoe(updatedList)
    console.log(updatedList)
  }

  return (
    < >
     <div   >
     <input type='text' placeholder='Enter your name to reserve table' onChange={handleChange}></input>
      <button onClick={handleClick} className='btn btn-primary add_btn'>Add Element</button>
     </div><br></br>
      {
        loe.map((ele, index) => {
          return (
            <>
              <div className='element' key={index}>
                <div className="Customer_name">{ele}</div>
                <button className='btn btn-primary delete_btn'  onClick={() => {
                  handleDelete(index)
                }} > Delete This Element</button>
              </div>
            </>)
        })}</>)
}
export default WaitingList;