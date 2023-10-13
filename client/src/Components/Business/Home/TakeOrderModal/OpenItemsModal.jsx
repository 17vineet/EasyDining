import React,{useState,useEffect} from 'react'
import API from '../../../../axios';
import "./OpenItemsModal.css";
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const OpenItemsModal = (prop) => {
    const cuisine_name = prop.name;
    const [items, setItems] = useState(prop.items) ;
    const [quantity, setQuantity] = useState([]) ; 
    
    useEffect(() => {
        setItems((prev) => prev.map((ele, ind) => ({ ...ele, id: ind })));
        setQuantity(()=>{ return prop.items.map(()=>0)})
    }, [])

    const addItem = (index)=> {
        setQuantity(prev => prev.map((ele, ind) => {return ind == index ? ele+1 : ele}))   
    }
    
    const removeItem = (index)=> {
        setQuantity(prev => prev.map((ele, ind) => {return ind == index ? Math.max(0,ele-1) : ele}))   
    }
    const closeModal=()=>{
        prop.updateItemModal(null);
        let orderedItems = [] ; 
        items.map((ele, ind)=>{
            if(quantity[ind]>0)  orderedItems.push({name: ele.Name, quantity: quantity[ind], price: ele.Price})
        })
        prop.handleOrder(orderedItems)
    }
    return (
        <div className="itemModal">
            <div className="itemModalContent" >
            <CloseIcon className='closeModalBtn' onClick={() => { closeModal() }}/>
            <div className="row1">
                    <div><h2>Cuisine : <i>{cuisine_name}</i></h2></div>
            </div>
                {
                    items.map((ele, index) => {
                        return (
                            <div className='item' key={index}>
                                {
                                   
                                        <div className='showItem'>
                                            <TextField 
                                                variant='outlined'
                                                value={ele.Name}
                                                size='small'
                                                label='Name'
                                                disabled
                                                style={{margin:'10px'}}
                                                className='custom-disabled'
                                                sx={{
                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                      WebkitTextFillColor: "#000000",
                                                  },
                                                }}
                                            />

                                            <TextField 
                                                variant='outlined'
                                                value={ele.Price}
                                                size='small'
                                                label='Price'
                                                style={{margin:'10px'}}
                                                disabled
                                                sx={{
                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                      WebkitTextFillColor: "#000000",
                                                  },
                                                }}
                                            />
                                          <div className='quantity'>
                                            <RemoveIcon onClick={()=>removeItem(index)}/>
                                            <h5>{quantity[index]}</h5>
                                            <AddIcon onClick={()=>addItem(index)}/>
                                          </div>
                                        </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OpenItemsModal