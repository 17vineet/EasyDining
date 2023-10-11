import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import API from '../../../axios';

const filter = createFilterOptions();

export default function ItemsDropDown({cuisine_name, setItemName}) {
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({name: ''});
  const [cuisineItems, setCuisineItems] = useState([]) ; 
  useEffect(()=>{
   const fetchData=async()=>{
        const resp=await API.post("/menu/getCuisineItems",{cuisineName: cuisine_name}) ; 
        const items = resp.data.items.map((ele)=>{
            return {name: ele.itemName}
        })
        setCuisineItems(items) ;
   }
   fetchData() ; 
  },[])
  
  const handleClose = () => {
    setDialogValue({name: ''});
    toggleOpen(false);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValue({
        name: dialogValue.name
    });
    setItemName({name: dialogValue.name}) ;
    const response = await API.post('/menu/addNewItem', {item: dialogValue.name, cuisineName: cuisine_name}) ;
    console.log(response);
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
            setItemName(newValue) ;
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={cuisineItems}
        getOptionLabel={(option) => {
          // e.g. value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Cuisine Items" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new Item name</DialogTitle>
          <DialogContent>
          
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="title"
              type="text"
              variant="standard"
            />
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
const data=[{name:"Dosa"},{name:"Idli"},{name:"Uttapam"}]