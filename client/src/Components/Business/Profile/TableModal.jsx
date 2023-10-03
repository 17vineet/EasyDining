import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';

import './TableModal.css';

const TableModal = ({ closeTableModel }) => {

    const [tablelist, setTableList] = useState({ tableSize: [2, 3], noOfTables: [1, 6] })
    const [editable, setEdittable] = useState(null)
    return (
        <div className="table-modal">
            <div className="table-modal-content" key={"modal"}>
                <CloseIcon className='closeBtn' onClick={() => {
                    closeTableModel(false)
                }} />
                <table className='editTablesTable'>
                    <tr>
                        <th>Table Capacity</th>
                        <th>No. of Tables</th>
                        <th></th>
                        
                    </tr>
                    {tablelist.tableSize.map((ele, ind) => {
                         return (
                            <tr>
                                {editable!=ind && <td>{ele}</td>}
                                {editable!=ind && <td>{tablelist.noOfTables[ind]}</td>}
                                {
                                    editable==ind && <td><input name="" placeholder="xys" value={ele}></input></td>
                                }
                                 {
                                    editable==ind && <td><input name="" placeholder="xys" value={tablelist.noOfTables[ind]}></input></td>
                                }
                                
                                {
                                    editable!=ind && <td onClick={()=>{
                                        setEdittable(ind)
                                    }}>Edit</td>
                                }
                            </tr>
                         )
                    })
                }
            </table>
            <div>
                <div className='editTable'>
                    <TextField label='Table Capacity' type='number' size='small' className='editTableCapacity' />
                    <TextField label='Number of tables' type='number' size='small' className='editNumberOfTables' />
                    <button className='btn btn-primary m-1'><AddIcon /></button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TableModal