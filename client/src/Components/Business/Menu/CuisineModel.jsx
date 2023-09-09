import React, { useState, useEffect } from 'react'

const CuisineModel = (prop) => {
    const cuisine_name=prop.name;
    const [items, setItems] = useState(prop.items)
    const [showAddForm, setShowAddForm] = useState(false);
    const [disable, setDisable] = useState(false);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({ Name: '', Price: '', Description: '' });

    useEffect(() => {
        setItems((prev) => prev.map((ele, ind)=>({...ele, id: ind, editable: false} ))) ;
    }, [])

    const handleEdit = (id) => {
        setFormData(items[id]) ;
        setItems((prev) => prev.map((ele, ind)=>(id == ind ? {...ele, editable: true} : ele ))) ;
    } ;

    const handleSave = (id) => {
        setItems((prev) => prev.map((ele, ind)=> id == ind ? {...formData, editable: false, id: id} : ele ))
    };

    const handleDiscard = () => {
        setItems((prev)=> prev.map((ele)=>({...ele, editable: false}))) ;
    }

    const handleChange = (id, newName) => {

    };

    const handleAddNewCuisine = (event) => {
        setShowAddForm(true);
    }

   const handleNewCuisineSave=()=>{
         let _items=items;
         _items.push(formData)
        setItems(_items) ;
        setShowAddForm(false);
   }

    const handleAddSave = async () => {

        setDisable(false);

        setShowAddForm(false);

    };
    const handleAddDiscard = () => {

        setDisable(false);
        setShowAddForm(false);
    };

    const handleKeyPress = (event, id) => {


    }


    return (
        <div className="modal">
            <div className="modal-content" key={"modal"}>
                <div className="row1">
                    <div>{cuisine_name}</div>
                    <div onClick={handleAddNewCuisine} className='add'>+Add
                        <span className="close" onClick={()=>{prop.updateCuisineModel(null)}}>
                            <img src="/images/close.svg" className="close" />
                        </span></div>
                </div>

                {showAddForm && (
                    <>
                    <div>
                       <div>
                       <label htmlFor="Item_name">Name
                        <input type="text" placeholder='Enter Item Name' id="Item_name" value={formData.Name} onChange={(event)=>{
                            setFormData((ele)=>{return {...ele,Name:event.target.value}})
                        }}/>
                        </label>
                       </div>
                        <div>
                        <label htmlFor="Item_price">Price</label>
                        <input type="text" placeholder='Enter Item Price' id="Item_price" value={formData.Price} onChange={(event)=>{
                            setFormData((ele)=>{return {...ele,Price:event.target.value}})
                        }} />
                        </div>
                        <div>
                        <label htmlFor="Item_description">Description</label>
                        <input type="text" placeholder='Enter Item Description' id="Item_description" value={formData.Description} onChange={(event)=>{
                            setFormData((ele)=>{return {...ele,Description:event.target.value}})
                        }}/>
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-primary' onClick={handleNewCuisineSave}>Save</button>
                        <button className='btn btn-primary' onClick={()=>{
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
                                    elem.editable ? <div>
                                        <div>
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
                                            <button className='btn btn-primary' onClick={handleDiscard}>Discard</button>
                                            <button className='btn btn-primary' onClick={() => handleSave(index)}>Save</button>
                                        </div>
                                    </div> :
                                        <div>
                                            <div>
                                                {elem.Name}
                                                {elem.Price}<br />
                                                {elem.Description}
                                            </div>
                                            <div>
                                                <button className='btn btn-primary' onClick={() => {
                                                    handleEdit(index)
                                                }}>Edit</button><br />
                                            </div>
                                        </div>
                                }
                            </div>
                        )
                    })
                }

                <div>
                   <button className='btn btn-primary'>Save All Changes</button>&nbsp;
                   <button className='btn btn-primary'>Discard All Changes</button>
                </div>
            </div>
        </div>


    )
}

export default CuisineModel