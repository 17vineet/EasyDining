import React, {useState, useEffect} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import API from '../../../../axios';
import './ViewOrderModal.css'
import { useAuth } from '../../../../contexts/AuthContext';
import Loading from '../../../Loading/Loading';

const ViewOrderModal = ({phone, closeViewOrderModal ,id}) => {
  const [items,setItems]=useState([])
  const {currentUser} = useAuth() ;
  const [loading,setLoading]=useState(false);
  const [orderTotal,setOrderTotal]=useState(0);
  const navigate = useNavigate() ;

  useEffect(()=>{
    const fetchData=async()=>{
      const resp = await API.post("/restaurant/viewOrder",{
        rid:id || currentUser._id,phone:phone
      })
      if(resp.data.message === "Order Not Found"){
        setItems([]) ;
      }
      else{
        setItems(resp.data.order)
        let total = 0 ;
        for(var i of resp.data.order){
          total+=parseInt(i.price)*parseInt(i.quantity)
        }
        setOrderTotal(total)
      }
    }
    fetchData();
  },[])

  const handleCheckOut = async ()=> {
    // handle response properly
    setLoading(true);
    const resp = await API.post(`/restaurant/generateBill`,{rid:id || currentUser._id,phone:phone})
    setLoading(false);
    navigate(`/${currentUser.userType}/bill/${resp.data.orderId}`) ;
    setItems([]) ;
  }
  
  return (
    <div className="viewOrderModal">
      {loading && <Loading/>}
      <div className="viewOrderModalContent" key={phone}>
      <CloseIcon className='closeModalBtn' onClick={() => closeViewOrderModal(null)} />
          <table>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Net Price</th>
            </tr>
           
            {items.map((ele,ind)=>{
              // setOrderTotal(orderTotal+(ele.price*ele.quantity))
              return (
              <>
                <tr key={ind}>
                  <td>{ele.name}</td>
                  <td>{ele.price}</td>
                  <td>{ele.quantity}</td>
                  <td>{ele.price*ele.quantity}</td>
                </tr>
              </>
              )
            })}
            <tr>
              <td colSpan={3}>Grand Total : </td>
              <td >{orderTotal}</td>
            </tr>
          </table>
            <button 
              className='btn btn-primary m-5' 
              onClick={handleCheckOut}
              disabled={!items.length}
            >
              CheckOut
            </button>
      </div>
    </div>
  )
}

export default ViewOrderModal