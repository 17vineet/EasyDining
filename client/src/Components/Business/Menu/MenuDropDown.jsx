import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import API from '../../../axios';
import { useAuth } from '../../../contexts/AuthContext';

const filter = createFilterOptions();

export default function MenuDropDown({handleAddCuisine}) {
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [cuisines, setCuisines] = useState([]) ; 
  
  const {currentUser} = useAuth() ; 
  
  useEffect(()=>{
    const fetchCuisines = async () => {
        const response = await API.post('/menu/getCuisines', {rid: currentUser._id} ) ;
        setCuisines(response.data)
    }

    fetchCuisines() ; 
  }, [])

  const handleClose = () => {
    setDialogValue({
      name: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    name: '',
   
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <React.Fragment>
    {console.log(cuisines)}
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({ name: newValue });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({ name: newValue.inputValue });
          } else {
            setValue(newValue);
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
        options={cuisines}
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
        sx={{ width: 500 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Cuisine" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new Cuisine</DialogTitle>
          <DialogContent>
           
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="Name"
              type="text"
              variant="standard"
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={async()=>{
              { handleAddCuisine({name:dialogValue.name,_id:""}); setValue(null) }
            }
            }>Add</Button>
          </DialogActions>
         </form>
       </Dialog>
      <button className='btn btn-primary m-2' onClick={()=>{handleAddCuisine(value); setValue(null) }}>Add Cuisine</button>
    </React.Fragment>
  );
}
