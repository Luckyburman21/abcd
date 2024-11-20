import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate, useLocation } from 'react-router-dom';
import AttachmentIcon from '@mui/icons-material/Attachment';
import IconButton from '@mui/material/IconButton';
function AddNewBudgetAllotment() {
  const location = useLocation();
  const { row } = location.state || {}; // Get the row data from location state
  const currentYear = new Date().getFullYear();
  const [businessunit, setBusinessunit] = useState(row ? row.businessunit : '');
  const [budgethead, setBudgethead] = useState(row ? row.budgethead : '');

  const [CCH, setCCH] = useState(row ? row.currentDate : '');
  const [LCH, setLCH] = useState(row ? row.cfyBE : '');
  const [amount, setAmount] = useState(row ? row.amount : '');
  const [remarks, setRemarks] = useState(row ? row.remarks : '');

  // const [selectedFile, setSelectedFile] = useState(row ? row.selectedFile : '');

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState('');
  console.log("row.........", row);
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'businessunit':
        setBusinessunit(value);
        break;
      case 'budgethead':
        setBudgethead(value);
        break;

      case 'CCH':
        setCCH(value);
        break;
      case 'LCH':
        setLCH(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'remarks':
        setRemarks(value);
        break;
      case 'selectedFile':
        setSelectedFile(value);
        break;
      default:
        break;
    }
  };
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      // Get the file type and name
      const fileType = file.type;
      const fileName = file.name;
      console.log("fileType......", fileType, "fileName..........", fileName);
      setFileType(fileType);
      setFileName(fileName);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: row ? row.id : Date.now(),
      businessunit,
      budgethead,
      CCH,
      LCH,
      amount,
      remarks,


      file: selectedFile,


    };

    const currentData = JSON.parse(localStorage.getItem('budgetAllotments')) || [];

    if (row) {
      // Update the existing entry
      const updatedData = currentData.map(item => item.id === row.id ? newEntry : item);
      localStorage.setItem('budgetAllotments', JSON.stringify(updatedData));
    } else {
      // Add a new entry
      localStorage.setItem('budgetAllotments', JSON.stringify([...currentData, newEntry]));
    }



    navigate('/budget-allotment');
  };

  return (
    <>
      <Box sx={{ p: 2, maxWidth: 600, mx: 'auto', maxHeight: 500 }}>

        <form onSubmit={handleSubmit}>
          <h1>  Budget Allotment</h1>
          <Grid container spacing={2}>


            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="businessunit-label">Business Unit</InputLabel>
                <Select
                  labelId="businessunit-label"
                  id="businessunit"
                  value={businessunit}
                  label="Business Unit"
                  name="businessunit"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Directorate">Directorate</MenuItem>
                  <MenuItem value="Command">Command</MenuItem>
                  <MenuItem value="Unit">Unit</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="budgethead-label">Budget Head</InputLabel>
                <Select
                  labelId="budgethead-label"
                  id="budgethead"
                  value={budgethead}
                  label="Budget Head"
                  name="budgethead"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Major Head">Major Head</MenuItem>
                  <MenuItem value="Sub-Major Head">Sub-Major Head</MenuItem>
                  <MenuItem value="Minor Head">Minor Head</MenuItem>
                  <MenuItem value="Sub Head/Code Head">Sub Head/Code Head</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="CCH-label">CCH</InputLabel>
                <Select
                  labelId="CCH-label"
                  id="CCH"
                  value={CCH}
                  label="CCH"
                  name="CCH"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="CCH1 ">CCH1</MenuItem>
                  <MenuItem value="CCH2">CCH2</MenuItem>
                  <MenuItem value="CCH3">CCH3</MenuItem>
                  <MenuItem value="CCH4">CCH4</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="LCH-label">LCH</InputLabel>
                <Select
                  labelId="LCH-label"
                  id="LCH"
                  value={LCH}
                  label="LCH"
                  name="LCH"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="LCH1 ">LCH1</MenuItem>
                  <MenuItem value="LCH2">LCH2</MenuItem>
                  <MenuItem value="LCH3">LCH3</MenuItem>
                  <MenuItem value="LCH4">LCH4</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
                value={amount}
                onChange={handleChange}
                required
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="remarks"
                label="Remarks"
                name="remarks"
                value={remarks}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept=".jpg, .jpeg, .png, .pdf, .docx, .doc" type="file" onChange={handleFileChange} />
                <AttachmentIcon />
              </IconButton>
              {selectedFile ? (
                <span style={{ marginLeft: '10px', color: 'green' }}>
                  File selected: {fileName} ({fileType})
                </span>
              ) : (
                <span style={{ marginLeft: '10px', color: 'red' }}>
                  No file selected
                </span>
              )}
            </Grid>


            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Submit</Button>
            </Grid>
          </Grid>
        </form>

      </Box>
    </>
  );
}

export default AddNewBudgetAllotment;
