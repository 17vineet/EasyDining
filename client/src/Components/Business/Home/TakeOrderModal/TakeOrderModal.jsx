import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import './TakeOrderModal.css'
import API from '../../../../axios';
import { useAuth } from '../../../../contexts/AuthContext';
import OpenItemsModal from './OpenItemsModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const TakeOrderModal = ({ phone, closeTakeOrderModal }) => {
    const [cuisines, setCuisines] = useState([])
    const [items, setItems] = useState([]);
    const [updated, setUpdated] = useState(false);
    const { currentUser } = useAuth();
    const [menu, setMenu] = useState([]);
    const [itemsModal, setItemsModal] = useState(null);
    const [order,setOrder]=useState([]);

    useEffect(() => {
        fetchData();
    }, [updated])
    const fetchData = async () => {
        const resp = await API.post("restaurant/getRestaurantMenu", { rid: currentUser._id });
        setMenu(resp.data.menu);
        let arr = [];
        resp.data.menu.map((ele) => {
            ele.items.map((item) => {
                arr.push(item.Name);
            })
        })
        setItems(arr);
        setCuisines(resp.data.menu.map((ele) => ele.name));
    }
    const openItemsModel = (elem, index) => {
        setItemsModal(elem)
        setItems([])
        menu.map((ele) => {
            if (ele.name == elem) {
                setItems(ele.items)
            }
        })
    }

    const updateItemModal = (newState)=> {
        setItemsModal(newState) ;
    }

    const handleOrder=(orderedItems)=>{
        setOrder([...order,orderedItems])
    }
    const removeItem=(ind, index)=>{
        let data=[...order];
        data[ind][index].quantity-=1;
        if(data[ind][index].quantity<=0){
            data[ind].splice(index,1);
        }
       setOrder(data);
    }
    const addItem=(index)=>{
        let data=[...order];
        data[ind][index].quantity+=1;
        setOrder(data);
    }
    return (
        <div className="orderModal">
            <div className="orderModalContent" key={phone}>
                <CloseIcon className='closeModalBtn' onClick={() => closeTakeOrderModal(null)} />
                {
                    itemsModal != null &&
                    <OpenItemsModal
                        name={itemsModal}
                        items={items}
                        updateItemModal={updateItemModal}
                        handleOrder={handleOrder}
                    />
                }
                <div>
                    <TextField variant='outlined' label='Search Item' />
                </div>
                <div className='CuisineHolder'>
                    {
                        cuisines.map((elem, ind) => {
                            return (
                                <div className='cuisines' onClick={() => { openItemsModel(elem, ind) }}>
                                    <h6>{elem}</h6>
                                </div>
                            )
                        })
                    }
                </div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                    </tr>
                {
                    order.map((ele,ind)=>{
                       return (
                        ele.map((element,index)=>{
                            return(
                                
                                    <tr>
                                        <td>{element.name}</td>
                                        <td>
                                        <RemoveIcon onClick={()=>removeItem(ind, index)}/>
                                            {element.quantity}
                                        <AddIcon onClick={()=>addItem(index)}/> 
                                        </td>
                                    </tr>
                            )
                           })
                       )
                    })
                }
                </table>
            </div>
        </div>
    );
}

export default TakeOrderModal;