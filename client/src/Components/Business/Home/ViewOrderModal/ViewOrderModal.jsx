import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import API from '../../../../axios';
import './ViewOrderModal.css'
import { useAuth } from '../../../../contexts/AuthContext';
import Loading from '../../../Loading/Loading';

const ViewOrderModal = ({ phone, closeViewOrderModal, id }) => {
  const [items, setItems] = useState([])
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [discount,setDiscount]=useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await API.post("/restaurant/viewOrder", {
        rid: id || currentUser._id, phone: phone
      })
      if (resp.data.message === "Order Not Found") {
        setItems([]);
      }
      else {
        setItems(resp.data.order)
        let total = 0;
        for (var i of resp.data.order) {
          total += parseInt(i.price) * parseInt(i.quantity)
        }
        setOrderTotal(total)
      }
    }
    fetchData();
  }, [])

  const handleCheckOut = async () => {
    // handle response properly
    setLoading(true);
    const resp = await API.post(`/restaurant/generateBill`, { rid: id || currentUser._id, phone: phone })
    setLoading(false);
    navigate(`/${currentUser.userType}/bill/${resp.data.orderId}`);
    setItems([]);
  }

  const deleteOrderItem = async(ind)=>{
    let ans=confirm("Are you sure you want to remove this item ? ")
    if(ans){
      setOrderTotal((prev)=>prev-items[ind].price*items[ind].quantity)
      setItems((prev)=>prev.filter((_,index)=>index!=ind))
      let data=[...items];
      let updatedData=data.filter((_,index)=>index!=ind)
      console.log(updatedData)
      const resp=await API.post("/restaurant/updateOrder",{rid:currentUser._id,phone:phone,order:updatedData})
      console.log(resp.data.message);
    }
    
  }

  return (
    <div className="viewOrderModal">
      {loading && <Loading />}
      <div className="viewOrderModalContent" key={phone}>
        <CloseIcon className='closeModalBtn' onClick={() => closeViewOrderModal(null)} />
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Net Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((ele, ind) => {
              // setOrderTotal(orderTotal+(ele.price*ele.quantity))
              return (
                <>
                  <tr key={ind}>
                    <td>{ele.name}</td>
                    <td>{ele.price}</td>
                    <td>{ele.quantity}</td>
                    <td>{ele.price * ele.quantity}</td>
                    <td><button className="btn btn-danger" onClick={()=>{deleteOrderItem(ind)}}>Delete</button></td>
                  </tr>
                </>
              )
            })}
            <tr>
              <td colSpan={3}> Total  </td>
              <td >{orderTotal}</td>
            </tr>

            <tr>
              <td colSpan={3}> CGST (2.5%) </td>
              <td >{orderTotal * 0.025}</td>
            </tr>
            <tr>
              <td colSpan={3}> SGST (2.5%) </td>
              <td >{orderTotal * 0.025}</td>
            </tr>
            
            <tr>
              <td colSpan={3} style={{'padding':'5px'}}>
              <table className='discount_table'>
                <tr style={{'border':'none'}}>
                  <td colSpan={2}>Discount</td>
                  <td colSpan={2}>
                    <input type="number" 
                      min="0"
                      max="20"
                      placeholder='Enter discount' 
                      className='discount_input' 
                      onChange={(e)=>{
                        // const value = Math.min(30, Math.max(0, e.target.value));
                        if(e.target.value<0)
                        {
                          setDiscount(e.target.value*-1)
                        }
                        else if(e.target.value>30)
                        {
                          alert('Discount cannot exceed 30')
                          setDiscount(30)
                        }
                        else{
                          
                          setDiscount(e.target.value)
                        }
                      }} 
                      value={discount}/>
                      </td>
                </tr>
              </table>
              </td>
              <td>{0-(orderTotal * Number(discount)/100)}</td>
            </tr>
            <tr>
              <td colSpan={3}> Grand Total </td>
              <td >{orderTotal + orderTotal * 0.025 + orderTotal * 0.025 - orderTotal*(discount)/100}</td>
            </tr>
          </tbody>
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