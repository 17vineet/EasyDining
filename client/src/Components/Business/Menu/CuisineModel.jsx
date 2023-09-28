import React, { useState, useEffect } from 'react';
import './CuisineModel.css'
import { useAuth } from '../../../contexts/AuthContext';
import API from '../../../axios';

const CuisineModel = (prop) => {
    const cuisine_name = prop.name;
    const [items, setItems] = useState(prop.items)
    const [showAddForm, setShowAddForm] = useState(false);
    const [disable, setDisable] = useState(false);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({ Name: '', Price: '', Description: '' });
    const { currentUser } = useAuth();

    console.log(prop.items);

    useEffect(() => {
        setItems((prev) => prev.map((ele, ind) => ({ ...ele, id: ind, editable: false })));
    }, [])

    const handleEdit = (id) => {
        setFormData(items[id]);
        setItems((prev) => prev.map((ele, ind) => (id == ind ? { ...ele, editable: true } : ele)));
        
    };

    const handleSave = (id) => {
        setItems((prev) => prev.map((ele, ind) => id == ind ? { ...formData, editable: false, id: id } : ele))
        setFormData({ Name: '', Price: '', Description: '' })

    };

    const handleDiscard = () => {
        setItems((prev) => prev.map((ele) => ({ ...ele, editable: false })));
        setFormData({ Name: '', Price: '', Description: '' })

    }

    const handleAddNewCuisine = (event) => {
        setShowAddForm(true);
    }

    const handleNewCuisineSave = () => {
        let _items = items;
        _items.push(formData)
        setItems(_items);
        setShowAddForm(false);
        setFormData({ Name: '', Price: '', Description: '' })

    }

    const handleAddSave = async () => {
        const resp = await API.post('restaurant/updateRestaurantMenu', { rid: currentUser._id, items, cuisine_name });
        setDisable(false);
        setShowAddForm(false);
    };
  
    const discardAllChanges=()=>{
        setItems(prop.items)
    }

    return (
        <div className="modal">
            <div className="modal-content" key={"modal"}>
                <div className="row1">
                    <div><h2>Cuisine : <i>{cuisine_name}</i></h2></div>
                    <div onClick={handleAddNewCuisine} className='add'><button className='btn btn-primary m-2'>Add</button>
                        <span className="close" onClick={() => { prop.updateCuisineModel(null) }}>
                        <img width="35" height="35" src="https://img.icons8.com/fluency/48/delete-sign.png" alt="delete-sign"/>
                        </span></div>
                </div>

                {showAddForm && (
                    <>
                        <div className='addItem'>
                            <div>
                                <label htmlFor="Item_name">Name</label>
                                <input type="text" placeholder='Enter Item Name' id="Item_name" value={formData.Name} onChange={(event) => {
                                    setFormData((ele) => { return { ...ele, Name: event.target.value } })
                                }} />

                            </div>
                            <div>
                                <label htmlFor="Item_price">Price</label>
                                <input type="number" placeholder='Enter Item Price' id="Item_price" value={formData.Price} onChange={(event) => {
                                    setFormData((ele) => { return { ...ele, Price: event.target.value } })
                                }} />
                            </div>
                            <div>
                                <label htmlFor="Item_description">Description</label>
                                <input type="text" placeholder='Enter Item Description' id="Item_description" value={formData.Description} onChange={(event) => {
                                    setFormData((ele) => { return { ...ele, Description: event.target.value } })
                                }} />
                            </div>
                        </div>
                        <div>
                            <button className='btn btn-primary m-2' onClick={handleNewCuisineSave}>Save</button>
                            <button className='btn btn-primary m-2' onClick={() => {
                                setShowAddForm(false)
                            }}>Discard</button>
                        </div>
                    </>
                )}

                {
                    items.map((elem, index) => {
                        return (
                            <div className='menu_item'>
                                {
                                    elem.editable ?
                                        <div className='editMenu'>
                                            <div className='editItems'>
                                                <div>
                                                    Name:<input placeholder='Name' value={formData.Name} onChange={(event) => {
                                                        setFormData((ele) => {
                                                            return { ...ele, Name: event.target.value }
                                                        })
                                                    }
                                                    } />
                                                </div>
                                                <div>
                                                    Price: <input placeholder='Price' value={formData.Price} onChange={(event) => {
                                                        setFormData((ele) => {
                                                            return { ...ele, Price: event.target.value }
                                                        })
                                                    }
                                                    } />
                                                </div>
                                                <div>
                                                    Description: <input placeholder='Description' value={formData.Description} onChange={(event) => {
                                                        setFormData((ele) => {
                                                            return { ...ele, Description: event.target.value }
                                                        })
                                                    }
                                                    } />
                                                </div>
                                            </div>
                                            <div>
                                                <button className='btn btn-primary m-2' onClick={handleDiscard}>Discard</button>
                                                <button className='btn btn-primary' onClick={() => handleSave(index)}>Save</button>
                                            </div>
                                        </div> :
                                        <div className='showItems'>
                                            <div>{elem.Name}</div>
                                            <div>{elem.Price}</div>
                                            <div>{elem.Description}</div>
                                            <div>
                                                <button className='btn btn-primary my-2' onClick={() => {
                                                    handleEdit(index)
                                                }}>Edit</button>
                                            </div>
                                        </div>
                                }
                            </div>
                        )
                    })
                }

                <div>
                    <button className='btn btn-primary m-2' onClick={handleAddSave}>Save All Changes</button>&nbsp;
                    <button className='btn btn-primary m-2' onClick={discardAllChanges}>Discard All Changes</button>
                </div>
            </div>
        </div>


    )
}

export default CuisineModel