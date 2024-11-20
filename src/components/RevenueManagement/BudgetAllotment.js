import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'; // Ensure this import is present
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { colors } from '@mui/material';
import { Card, CardContent, Typography, TextField, Button} from '@mui/material';
function BudgetAllotment() {
  const [formData, setFormData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('budgetAllotments')) || [];
    setFormData(storedData);
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setOpenViewDialog(true);
  };
  const handleUpadeteClick = (row) => {

    localStorage.setItem('editBudgetAllotment', JSON.stringify(row));

    navigate('/add-new-budget-allotment', { state: { row } });
  };
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const filteredData = formData.filter((data) =>
    data.businessunit.toLowerCase().includes(searchTerm) ||
    data.budgethead.toLowerCase().includes(searchTerm)
  );

  // Define columns for DataGrid
  const columns = [
    { field: 'businessunit', headerName: 'Business Unit', width: 150 },
    { field: 'budgethead', headerName: 'Budget Head', width: 150 },
    { field: 'CCH', headerName: 'CCH', width: 200 },
    { field: 'LCH', headerName: 'LCH', width: 150 },
    { field: 'amount', headerName: 'Amount', type: 'Number', width: 250 },
    { field: 'remarks', headerName: 'Remarks', width: 200 },
    { field: 'fileName', headerName: 'Document', width: 200 },
    {
      field: 'actions',
      headerName: '',
      width: 170,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <div>
            <Button variant="contained" color="primary" width="120" onClick={() => handleViewClick(params.row)}>
              View
            </Button>
          </div>
          <div>
            <Button variant="contained" color="primary" width="100" onClick={() => handleUpadeteClick(params.row)}>
              Update
            </Button>
          </div>

        </Box>
      ),
    },

  ];

  const handleNavigateToForm = () => {
    navigate('/add-new-budget-allotment');
  };

  return (
    <>
     <Card variant="outlined" style={{ margin: '20px' }}>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: '20px',textAlign:'center' }}>Budget Allotment</Typography>

    
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button variant="contained" onClick={handleNavigateToForm} style={{backgroundColor:'#4682B4'}}>
          Add New Budget Allotment
        </Button>
      </Box>
      {formData.length > 0 && (
        <>
          <Grid item xs={12} sx={{ mb: 2, width: "20%" }}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Box sx={{ padding: 2,overflow: 'hidden' }}>
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={filteredData}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.id} 
              />
            </div>
          </Box>
          <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md">
            {selectedRow && (
              <>
                <DialogTitle>Budget Allotment</DialogTitle>
                <DialogContent >
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>Business Unit:</strong>
                      {selectedRow.businessunit}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>Budget Head:</strong>
                      {selectedRow.budgethead}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>CCH:</strong>
                      {selectedRow.CCH}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>LCH:</strong>
                      {selectedRow.LCH}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>Amount:</strong>
                      {selectedRow.amount}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>Remarks:</strong>
                      {selectedRow.remarks}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>Document:</strong>
                      {selectedRow.fileName}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
                      <Grid>
                        <Button type="submit" variant="outlined">Approve</Button>
                      </Grid>
                      <Grid>
                        <Button type="submit" variant="outlined">Reject</Button>
                      </Grid>
                    </Box>
                  </Grid>
                </DialogContent>
              </>
            )}
          </Dialog>
        </>
      )}
         </CardContent>
         </Card>
    </>
    
  );
}

export default BudgetAllotment;
