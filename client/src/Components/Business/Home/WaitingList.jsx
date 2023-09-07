import { useState, useEffect } from 'react';
import './WaitingList.css';
import 'bootstrap/dist/css/bootstrap.css'
import API from '../../../axios' ;
import Delete from '@mui/icons-material/Delete' ;
import AddIcon from '@mui/icons-material/Add';

import {useAuth} from '../../../contexts/AuthContext' ;

function WaitingList() {
  const [name, setName] = useState('')
  const [loe, setLoe] = useState([]) ;
  const {currentUser} = useAuth() ;

 async function handleClick() {
    await API.post('/restaurant/insertWaitingList', { rid: currentUser._id, name : name })
    setLoe((prev)=>[...prev, name]);
    setName("");
  }
  function handleChange(event) {
    setName(event.target.value)
  }
  async function handleDelete(index) {
    const resp=await API.post('/restaurant/removeWaitingCustomer', {rid : currentUser._id, index}) ;
    const updatedList = loe.filter((_,ind) => index != ind)
    setLoe(updatedList)
  }
  async function handleDine(index){
    handleDelete(index);
    const resp=await API.post('/restaurant/addToDineIn',{rid:currentUser._id, cname:loe[index]});
    console.log(resp.data);
  }

  useEffect(()=>{
    const fetchWaitingList = async ()=>{
      const resp = await API.post('/restaurant/getWaitingList',{rid : currentUser._id}) ; 
      const arr=resp.data.customers.map((elem)=>elem.cname);
      setLoe(arr);
    }
    fetchWaitingList() ;
  }, [loe]) ;

  return (
    < >
     <div   >
     <input type='text' placeholder='Enter your name to reserve table' onChange={handleChange} value={name}></input>
      <button onClick={handleClick} className='btn btn-primary add_btn'><AddIcon/></button>
     </div><br></br>
      {
        loe.map((ele, index) => {
          return (
            <>
              <div className='element' key={index}>
                <div className="Customer_name">{ele}</div>
                <button className='btn btn-primary delete_btn'  onClick={() => {
                  handleDelete(index)
                }} > <Delete/> </button>
                <button className='btn btn-primary dine_btn'  onClick={() => {
                  handleDine(index)
                }} > Send to Dine</button>
              </div>
            </>)
        })}</>)
}
export default WaitingList;