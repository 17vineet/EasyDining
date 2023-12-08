import { useState, useEffect } from 'react';
import './WaitingList.css';
import 'bootstrap/dist/css/bootstrap.css'
import API from '../../../axios';
import Delete from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Loading from '../../Loading/Loading';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import TakeOrderModal from './TakeOrderModal/TakeOrderModal';
import ViewOrderModal from './ViewOrderModal/ViewOrderModal';

function DiningList({ updated, handleUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    pax: '',
    phone: '',
    email: '',
    size: ''
  })
  const [dine, setDine] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [takeOrderModal, setTakeOrderModal] = useState(null);
  const [orderViewModal, setOrderViewModal] = useState(null);
  const [pax, setPax] = useState('');
  const { currentUser } = useAuth();

  const isPhoneNumberValid = (phoneNumber) => {
    // Validate that the phone number has 10 digits and starts with 6, 7, 8, or 9
    return /^[6-9]\d{9}$/.test(phoneNumber);
  };

  async function handleClick() {
    if(!isPhoneNumberValid(formData.phone)){
      alert("Enter a valid Phone Number")
      return
    }
    if (formData.name.trim().length != 0 && formData.pax != '' && formData.phone.trim().length != 0) {
      setIsLoading(true);
      const resp = await API.post('/restaurant/addOccupied', { rid: currentUser._id, pax: formData.pax })
      if (resp.data.message === "Available") {
        console.log(resp.data.Size)
        await API.post('/restaurant/insertDiningList', { rid: currentUser._id, name: formData.name, pax: formData.pax, phone: formData.phone, email: "", size: resp.data.Size })
        setDine((prev) => [...prev, { name: formData.name, pax: formData.pax, phone: formData.phone, size: resp.data.Size }]);
        setIsLoading(false);
        handleUpdate();
      }
      else {
        setIsLoading(false);
        alert("Table of required size is not available right now")
        const reply = confirm("Would you like to add the customer in waiting list ");
        if (reply) {
          await API.post('/restaurant/insertWaitingList', { rid: currentUser._id, name: formData.name, pax: formData.pax, phone: formData.phone, email: '' });
          handleUpdate();
        }
      }
      setFormData({...formData,
        name: '',
        phone: '',
        email: '',
      })
    }
    else {
      alert("Enter proper information")
    }

  }
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  }
  async function handleDelete(index) {
    setIsLoading(true);
    const resp = await API.post('/restaurant/removeDiningCustomer', { rid: currentUser._id, phone: dine[index].phone, tableSize: dine[index].size });
    setIsLoading(false);
    const updatedList = dine.filter((_, ind) => index != ind)
    setDine(updatedList)
    handleUpdate();
    setIsLoading(false);
  }

  const handlePaxChange = (event) => {
    setPax(event.target.value);
    setFormData((prevValue) => ({
      ...prevValue,
      pax: parseInt(event.target.value)
    }))
  };

  const openTakeOrderModal = (phone) => {
    setTakeOrderModal(phone)
  }
  const closeTakeOrderModal = (newState) => {
    setTakeOrderModal(null);
  }
  const openViewOrderModal = (phone) => {
    setOrderViewModal(phone)
  }
  const closeViewOrderModal = (newState) => {
    setOrderViewModal(null);
  }


  useEffect(() => {
    const fetchDiningList = async () => {
      const resp = await API.post('/restaurant/getDiningList', { rid: currentUser._id });
      const arr = resp.data.customers.map((elem) => {
        return (
          {
            name: elem.cname,
            pax: elem.pax,
            phone: elem.phone,
            size: elem.size
          }
        )
      });
      setDine(arr);
    }
    fetchDiningList();
  }, [updated]);

  const passengers = ['1 guest', '2 guests', '3 guests', '4 guests', '5 guests', '6 guests', '7 guests', '8 guests', '9 guests', '10 guests']

  return (
    < >
      {isLoading && <Loading />}

      {takeOrderModal != null && <TakeOrderModal phone={takeOrderModal} closeTakeOrderModal={closeTakeOrderModal} />}
      {orderViewModal != null && <ViewOrderModal phone={orderViewModal} closeViewOrderModal={closeViewOrderModal} />}

      <h2>Dining List</h2>

      <div   >
        <input type='text' placeholder='Enter name to reserve table' onChange={handleChange} value={formData.name} name='name'></input>
        {/* <input type='number' placeholder='Enter number of persons' onChange={handleChange} value={formData.pax} name='pax'></input> */}
        <div>
          <FormControl >
            <InputLabel id="demo-simple-select-label">Pax</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pax}
              label="Pax"
              onChange={handlePaxChange}
              style={{ width: '150px' }}
              autoWidth={true}
              required
            >
              {passengers.map((ele, ind) => {
                return (<MenuItem value={ind + 1} key={ind} >{ele}</MenuItem>)
              })}

            </Select>
          </FormControl>
        </div>
        <input type='tel' placeholder='Enter Mobile number' onChange={handleChange} value={formData.phone} name='phone'></input>
        <button onClick={handleClick} className='btn btn-primary add_btn'><AddIcon /></button>
      </div>
      <table className='table table-striped mt-4'>
        {dine.length > 0 && (
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Pax</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Table Size</th>
              <th></th>
            </tr>
          </thead>)}
        <tbody>
          {
            dine.map((ele, index) => {

              return (
                <>
                  <tr key={index}>

                    <td> {ele.name}</td>
                    <td> {ele.pax}</td>
                    <td> {ele.phone}</td>
                    <td>{ele.size}</td>

                    <td>
                      <button className='btn btn-primary me-2' onClick={() => {
                        openViewOrderModal(ele.phone)
                      }} tableSize={ele.size}>
                        View Order</button>

                      <button className='btn btn-primary me-2' onClick={() => {
                        openTakeOrderModal(ele.phone)
                      }}>Take Order</button>

                      <button title='Remove this customer from Dining List and free the table' className='btn btn-danger delete_btn' onClick={() => {
                        handleDelete(index)
                      }} > <Delete /> </button>
                    </td>

                  </tr>
                </>)

            })
          }
        </tbody>
      </table>
    </>)
}
export default DiningList;