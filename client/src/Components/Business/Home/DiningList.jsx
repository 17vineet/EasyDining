import { useState, useEffect } from 'react';
import './WaitingList.css';
import 'bootstrap/dist/css/bootstrap.css'
import API from '../../../axios' ;
import Delete from '@mui/icons-material/Delete' ;

import {useAuth} from '../../../contexts/AuthContext' ;

function DiningList() {
  const [name, setName] = useState('')
  const [dine, setDine] = useState([]) ;
  const {currentUser} = useAuth() ;

 async function handleClick() {
    await API.post('/restaurant/insertDiningList', { rid: currentUser._id, name : name })
    setDine((prev)=>[...prev, name]);
    setName("");
  }
  function handleChange(event) {
    setName(event.target.value)
  }
  async function handleDelete(index) {
    const resp=await API.post('/restaurant/removeDiningCustomer', {rid : currentUser._id, index}) ;
    const updatedList = dine.filter((_,ind) => index != ind)
    setDine(updatedList)
  }


  useEffect(()=>{
    const fetchDiningList = async ()=>{
      const resp = await API.post('/restaurant/getDiningList',{rid : currentUser._id}) ; 
      const arr=resp.data.customers.map((elem)=>elem.cname);
      setDine(arr);
    }
    fetchDiningList() ;
  }, [dine]) ;

  return (
    < >
     <div   >
     <input type='text' placeholder='Enter your name to reserve table' onChange={handleChange} value={name}></input>
      <button onClick={handleClick} className='btn btn-primary add_btn'>Add Element</button>
     </div><br></br>
      {
        dine.map((ele, index) => {
          return (
            <>
              <div className='element' key={index}>
                <div className="Customer_name">{ele}</div>
                <button className='btn btn-primary delete_btn'  onClick={() => {
                  handleDelete(index)
                }} > <Delete/> </button>
                {/* <button className='btn btn-primary dine_btn'  onClick={() => {
                  handleDine(index)
                }} > Send to Dine</button> */}
              </div>
            </>)
        })}</>)
}
export default DiningList;