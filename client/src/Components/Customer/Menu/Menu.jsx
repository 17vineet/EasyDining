import React from 'react'
import './Menu.css'


const Menu = ({ menu, updateMenuModel }) => {

    return (
        <div className="modal">
            <div className="modal-content" key={"modal"}>
                {/* <button className='btn btn-primary close-btn' onClick={() => { updateMenuModel(false) }}><b>Close</b></button> */}
                <img width="35" height="35" src="https://img.icons8.com/fluency/48/delete-sign.png" alt="delete-sign" onClick={() => { updateMenuModel(false) } } className='close-btn'/><br/>
                {menu.menu.map((ele, ind) => {
                    return (
                        <div className='Cuisine_container'>
                            <h2>{ele.name}</h2>
                            <div className='item_container_title'>
                                <div><b>Item Name</b></div>
                                <div><b>Price</b></div>
                                <div><b>Description</b></div>
                            </div>
                            {ele.items.map((elem, index) => {
                                return (
                                    <div className='item_container'>
                                        <div>{elem.Name} </div>
                                        <div>{elem.Price}</div>
                                        <div>{elem.Description}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Menu