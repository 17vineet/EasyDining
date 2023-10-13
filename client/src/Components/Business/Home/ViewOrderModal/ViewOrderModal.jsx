import React, {useState, useEffect} from 'react'
import CloseIcon from '@mui/icons-material/Close';

import API from '../../../../axios';
import './ViewOrderModal.css'
import { useAuth } from '../../../../contexts/AuthContext';

const ViewOrderModal = ({phone, closeViewOrderModal}) => {
  const [items,setItems]=useState([])
  const {currentUser} = useAuth() ;

  useEffect(()=>{
    const fetchData=async()=>{
      const resp = await API.post("/restaurant/viewOrder",{
        rid:currentUser._id,phone:phone
      })
      setItems(resp.data.order)
    }
    fetchData();
  },[])
  
  return (
    <div className="viewOrderModal">
      <div className="viewOrderModalContent" key={phone}>
      <CloseIcon className='closeModalBtn' onClick={() => closeViewOrderModal(null)} />
          <table>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
           
            {items.map((ele,ind)=>{
              return (
              <>
                <tr>
                  <td>{ele.name}</td>
                  <td>{ele.quantity}</td>
                  <td>{ele.price*ele.quantity}</td>
                </tr>
              </>
              )
            })}
          </table>
            
      </div>
    </div>
  )
}

export default ViewOrderModal