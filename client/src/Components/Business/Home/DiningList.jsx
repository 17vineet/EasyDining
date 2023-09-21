import { useState, useEffect } from 'react';
import './WaitingList.css';
import 'bootstrap/dist/css/bootstrap.css'
import API from '../../../axios';
import Delete from '@mui/icons-material/Delete';
import Loading from '../../Loading/Loading';
import { useAuth } from '../../../contexts/AuthContext';

function DiningList({updated}) {
  // const [name, setName] = useState('')
  const [formData,setFormData]=useState({
    name:'',
    pax:'',
    phone:'',
    email:''
  })
  const [dine, setDine] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser } = useAuth();

  async function handleClick() {
    if (formData.name.trim().length != 0 &&formData.pax.trim().length!=0 && formData.phone.trim().length!=0) {
      setIsLoading(true);
      await API.post('/restaurant/insertDiningList', { rid: currentUser._id, name: formData.name,pax:formData.pax,phone:formData.phone,email:"" })
      setDine((prev) => [...prev, {name:formData.name,pax:formData.pax,phone:formData.phone}]);
      setFormData({
        name:'',
        pax:'',
        phone:'',
        email:''
      })
      setIsLoading(false);
    }
    else {
      alert("Enter proper information")
    }

  }
  function handleChange(event) {
    const {name, value} = event.target ;
    setFormData((prevValue)=> ({
      ...prevValue,
      [name] : value
    })) ;
  }
  async function handleDelete(index) {
    setIsLoading(true);
    const resp = await API.post('/restaurant/removeDiningCustomer', { rid: currentUser._id, phone:dine[index].phone });
    setIsLoading(false);
    const updatedList = dine.filter((_, ind) => index != ind)
    setDine(updatedList)
    setIsLoading(false);
  }
  
  useEffect(() => {
    const fetchDiningList = async () => {
      const resp = await API.post('/restaurant/getDiningList', { rid: currentUser._id });
      const arr = resp.data.customers.map((elem) => {
        return (
          {
            name:elem.cname,
            pax:elem.pax,
            phone:elem.phone
          }
        )
      });
      console.log(arr)
      setDine(arr);
    }
    fetchDiningList();
  }, [updated]);

  return (
    < >
      {isLoading && <Loading />}
      <div   >
        <input type='text' placeholder='Enter name to reserve table' onChange={handleChange} value={formData.name} name='name'></input>
        <input type='number' placeholder='Enter number of persons' onChange={handleChange} value={formData.pax} name='pax'></input>
        <input type='tel' placeholder='Enter Mobile number' onChange={handleChange} value={formData.phone} name='phone'></input>
        <button onClick={handleClick} className='btn btn-primary add_btn'>Add Element</button>
      </div><br/><br/><br/>
      {
        dine.map((ele, index) => {
          return (
            <>
              <div className='element' key={index}>
                <div className="Customer_name">{ele.name}</div>
                <div className="Customer_name">{ele.pax}</div>
                <div className="Customer_name">{ele.phone}</div>
                <button className='btn btn-primary delete_btn' onClick={() => {
                  handleDelete(index)
                }} > <Delete /> </button>
              </div>
            </>)
        })}</>)
}
export default DiningList;