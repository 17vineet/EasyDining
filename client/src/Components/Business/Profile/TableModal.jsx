import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import API from '../../../axios';
import { useAuth } from '../../../contexts/AuthContext';

import './TableModal.css';

const TableModal = ({ closeTableModel }) => {

    const [tablelist, setTableList] = useState({ tableSize: [], noOfTables: [] })
    const [editable, setEdittable] = useState(null)
    const [tableInfo, setTableInfo] = useState({ tableSize: "", noOfTables: "" });
    const [wasTouched, setWasTouched] = useState({ tableSize: false, noOfTables: false });
    const { currentUser, setCurrentUser } = useAuth();

    useEffect(() => {
        setTableList(currentUser.total_tables);
    }, [])

    const handleAddTable = () => {
        if (tableInfo.tableSize.trim() != "" && tableInfo.noOfTables.trim() != "") {
            const prevIndex = tablelist.tableSize.indexOf(parseInt(tableInfo.tableSize))
            if (prevIndex != -1) {
                const reply = confirm('The table of this size has already been added.\nDo you want to add again?')
                if (reply) {
                    const newNoOfTables = [...tablelist.noOfTables];
                    newNoOfTables[prevIndex] = parseInt(newNoOfTables[prevIndex]) + parseInt(tableInfo.noOfTables);
                    setTableList({
                        ...tablelist,
                        noOfTables: newNoOfTables,
                    });
                }
            }
            else {
                let newTableSize = [...tablelist.tableSize];
                newTableSize.push(parseInt(tableInfo.tableSize))
                let newNoOfTables = [...tablelist.noOfTables]
                newNoOfTables.push(parseInt(tableInfo.noOfTables));
                setTableList({ tableSize: newTableSize, noOfTables: newNoOfTables })
            }
            setTableInfo({ tableSize: "", noOfTables: "" })
            setWasTouched({ tableSize: false, noOfTables: false })
        }
        else {
            alert("Please fill all the fields to add the table information")
        }
    }

    const handleSaveTable = async () => {
        const resp = await API.post('/restaurant/changeTables', { '_id': currentUser._id, 'tables': tablelist })
        if (resp.data.message === 'Success') {
            alert("Tables Updated Successfully")
            setCurrentUser({ ...currentUser, total_tables: tablelist });
        }
        else {
            alert("No new changes found")
        }
    }

    const handleDeleteTable = (e, ind) => {
        let newTableSize = tablelist.tableSize;
        let newNoOfTables = tablelist.noOfTables;
        newTableSize = newTableSize.slice(0, ind).concat(newTableSize.slice(ind + 1))
        newNoOfTables = newNoOfTables.slice(0, ind).concat(newNoOfTables.slice(ind + 1))
        setTableList({ tableSize: newTableSize, noOfTables: newNoOfTables })
    }

    const handleChange = (event, ind) => {
        const { value } = event.target;
        const newNoOfTables = [...tablelist.noOfTables];
        newNoOfTables[ind] = value; // Assuming you want to parse the value as an integer
        setTableList({
            ...tablelist,
            noOfTables: newNoOfTables,
        });
    };

    return (
        <div className="table-modal">
            <div className="table-modal-content" key={"modal"}>
                <CloseIcon className='closeBtn' onClick={() => {
                    closeTableModel(false)
                }} />
                <div>
                    <div className='editTable'>
                        <TextField
                            label='Table Capacity'
                            type='number'
                            size='small'
                            className='editTableCapacity'
                            value={tableInfo.tableSize}
                            onChange={(e) => {
                                setTableInfo(prev => ({ ...prev, tableSize: e.target.value }))
                                setWasTouched({ ...wasTouched, tableSize: true })
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                            error={wasTouched.tableSize ? tableInfo.tableSize < 1 ? true : false : false}
                            helperText={wasTouched.tableSize ? tableInfo.tableSize < 1 ? "Enter proper value" : "" : ""}
                        />
                        <TextField
                            label='Number of tables'
                            type='number'
                            size='small'
                            className='editNumberOfTables'
                            value={tableInfo.noOfTables}
                            onChange={(e) => {
                                setTableInfo(prev => ({ ...prev, noOfTables: e.target.value }))
                                setWasTouched({ ...wasTouched, noOfTables: true })
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                            error={wasTouched.noOfTables ? tableInfo.noOfTables < 1 ? true : false : false}
                            helperText={wasTouched.noOfTables ? tableInfo.noOfTables < 1 ? "Enter proper value" : "" : ""}
                        />
                        <button className='btn btn-primary m-1' disabled={tableInfo.tableSize < 1 || tableInfo.noOfTables < 1} onClick={handleAddTable}><AddIcon /></button>
                    </div>
                </div><br />
                {
                    tablelist.tableSize.map((ele, ind) => {
                        return (
                            <div className='editTable' key={ind}>
                                <TextField
                                    variant='outlined'
                                    label='Table Capacity'
                                    value={ele}
                                    disabled={true}
                                    type='number'
                                    className='editTableCapacity'
                                    size='small'
                                />
                                <TextField
                                    variant='outlined'
                                    label='Number of tables'
                                    value={tablelist.noOfTables[ind]}
                                    disabled={editable != ind}
                                    className='editNumberOfTables'
                                    size='small'
                                    type='number'
                                    onChange={(event) => {
                                        handleChange(event, ind)
                                    }}
                                    InputProps={{ inputProps: { min: 1 } }}
                                    error={tablelist.noOfTables[ind] < 1 ? true : false}
                                    helperText={tablelist.noOfTables[ind] < 1 ? "Enter proper value" : ""}

                                />
                                {editable == ind ? <CheckIcon onClick={() => setEdittable(null)} /> : <EditIcon onClick={() => {
                                    setEdittable(ind)
                                }} />}
                                <button className='btn btn-danger' onClick={(event) => {
                                    handleDeleteTable(event, ind)
                                }}>Delete Table</button>
                            </div>
                        )
                    })
                }
                <button className='btn btn-primary' onClick={handleSaveTable}>Save All Changes</button>
            </div>
        </div>
    )
}

export default TableModal