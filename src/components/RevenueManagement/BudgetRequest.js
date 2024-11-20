import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ViewIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import jsPDF from 'jspdf';
import AddNewBudgetRequest from './AddNewBudgetRequest';

const BudgetRequest = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewBudget, setShowNewBudget] = useState(false);
    const [data, setData] = useState([
        { id: 1, fyRE: '2021', fyBE: '2022', fyMA: '2023', date: '2024-01-01', evenNoDate: '2024-01-15', revisedDate: '2024-02-01', email: 'example1@test.com', letterHead: 'Air HQ/95213/74/Fin P/RB/BM-1', status: 'Pending' },
        { id: 2, fyRE: '2022', fyBE: '2023', fyMA: '2024', date: '2025-01-01', evenNoDate: '2025-01-15', revisedDate: '2025-02-01', email: 'example2@test.com', letterHead: 'Air HQ/95213/74/Fin P/RB/BM-2', status: 'Approved' },
    ]);
    const [currentBudget, setCurrentBudget] = useState();
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleNewBudgetClick = () => {
        setCurrentBudget(); // Reset currentBudget for a new budget form
        setIsEditing(false);
        setShowNewBudget(true);
    };

    const handleAddBudget = (newBudget) => {
        setData((prevData) => [
            ...prevData,
            { id: prevData.length + 1, ...newBudget, status: 'Pending' }
        ]);
    };

    const handleUpdate = (updatedBudget) => {
        setData((prevData) => prevData.map(item =>
            item.id === updatedBudget.id ? { ...item, ...updatedBudget } : item
        ));
        setShowNewBudget(false);
        setIsEditing(false);
    };

    const handleView = (id) => {
        const budget = data.find(item => item.id === id);
        setCurrentBudget(budget);
        setOpenViewDialog(true);
    };

    const handleEdit = (row) => {
        // const budget = data.find(item => item.id === id);
        setCurrentBudget(row);
        setIsEditing(true);
        setShowNewBudget(true);
    };

    const handleExportPDF = (row) => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.setLineHeightFactor(12);
        // Document content
        doc.text('VoIP: 2111-7465', 14, 20);
        doc.text('Fax: 011-23060211', 160, 20);
        doc.text('Air HQ/95213/74/Fin P/RB/BM-I', 14, 30);
        doc.text('06 Sep 24', 160, 30);
        doc.text('(As per distribution list)', 14, 40, { fontWeight: "bold", textDecoration: "underline" });
        doc.text('REVISED ESTIMATE: 2024-25 AND', 105, 50, { align: 'center', fontWeight: "bold", textDecoration: "underline" });
        doc.text('BUDGET ESTIMATES: 2025-26', 105, 55, { align: 'center', fontWeight: "bold", textDecoration: "underline" });
        doc.text('1. Reference is made to this Dte letter of even No. dated 19 Aug 24.', 14, 70);
        doc.text('2. It is intimated that projections for RE 24-25 and BE 25-26 pertaining to IAF Revenue Budget were to be submitted.', 14, 80, { maxWidth: 180 });
        doc.text('3. It is also pertinent to mention that if the said return is not received at this Dte by 10 Sep 24 (R) 10 Sep 2024.', 14, 90, { maxWidth: 180 });
        doc.text('4. The subject input may also be forwarded on e-office (Gp Capt Revenue Budget) or share soft copy on mail ID-920733@personal.iaf.in.', 14, 100, { maxWidth: 180 });
        doc.text('5.Request accord top priority.', 14, 110);
        doc.text('<Signature>', 160, 120);
        doc.save('budget_projection.pdf');
    };

    const handleApprove = () => {
        setData((prevData) => prevData.map(item =>
            item.id === currentBudget.id ? { ...item, status: 'Approved' } : item
        ));
        setOpenViewDialog(false);
    };

    const handleReject = () => {
        setData((prevData) => prevData.map(item =>
            item.id === currentBudget.id ? { ...item, status: 'Rejected' } : item
        ));
        setOpenViewDialog(false);
    };

    const handleCloseViewDialog = () => {
        setOpenViewDialog(false);
    };

    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Card variant="outlined" style={{ margin: '20px', width: "100%" }}>
            <CardContent>
                <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center', color: '#4682B4' }}>
                    Request for Budget Projection
                </Typography>

                {!showNewBudget && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ flexGrow: 1, marginRight: '10px', maxWidth: '250px' }}
                        />
                        <IconButton onClick={() => { }} style={{ marginLeft: "-50px" }}>
                            <SearchIcon />
                        </IconButton>

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleNewBudgetClick}
                            style={{ marginLeft: '10px', backgroundColor: '#4682B4' }}
                        >
                            Add New Budget Request
                        </Button>
                    </div>
                )}

                {showNewBudget && (
                    <AddNewBudgetRequest
                        onClose={() => setShowNewBudget(false)}  // Close handler passed correctly
                        onAdd={handleAddBudget}
                        onEdit={handleUpdate}
                        currentBudget={currentBudget}
                        isEditing={isEditing}
                    />
                )}

                {!showNewBudget && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead style={{ backgroundColor: '#4682B4', color: 'white' }}>
                                <TableRow>
                                    <TableCell style={{ color: 'white' }}>FY for RE</TableCell>
                                    <TableCell style={{ color: 'white' }}>FY for BE</TableCell>
                                    <TableCell style={{ color: 'white' }}>FY for MA</TableCell>
                                    <TableCell style={{ color: 'white' }}>Letter Head</TableCell>
                                    <TableCell style={{ color: 'white' }}>Date</TableCell>
                                    <TableCell style={{ color: 'white' }}>Even No. Date</TableCell>
                                    <TableCell style={{ color: 'white' }}>Revised Date</TableCell>
                                    <TableCell style={{ color: 'white' }}>Email ID</TableCell>
                                    <TableCell style={{ color: 'white' }}>Status</TableCell>
                                    <TableCell style={{ color: 'white' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.fyRE}</TableCell>
                                        <TableCell>{row.fyBE}</TableCell>
                                        <TableCell>{row.fyMA}</TableCell>
                                        <TableCell>{row.letterHead}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.evenNoDate}</TableCell>
                                        <TableCell>{row.revisedDate}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>
                                            <Box display="flex" justifyContent="flex-start" gap="10px">
                                               
                                                <IconButton  onClick={() => handleEdit(row)} style={{ marginLeft: '10px' }}>
                                                    <EditIcon />
                                                </IconButton>
                                                 <IconButton  onClick={() => handleView(row.id)} style={{ marginLeft: '10px' }}>
                                                    <ViewIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleExportPDF(row)} style={{ marginLeft: '10px' }}>
                                                    <PictureAsPdfIcon />
                                                </IconButton>
                                                <IconButton onClick={() => alert("data sent to higher command")} style={{ marginLeft: '10px' }}>
                                                    <SendIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* View Dialog */}
                <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
                    <DialogTitle>
                        Budget Request Details
                        <IconButton edge="end" color="inherit" onClick={handleCloseViewDialog} aria-label="close" style={{ position: 'absolute', right: '8px', top: '8px' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1"><strong>FY RE:</strong> {currentBudget?.fyRE}</Typography>
                        <Typography variant="body1"><strong>FY BE:</strong> {currentBudget?.fyBE}</Typography>
                        <Typography variant="body1"><strong>FY MA:</strong> {currentBudget?.fyMA}</Typography>
                        <Typography variant="body1"><strong>Letter Head:</strong> {currentBudget?.letterHead}</Typography>
                        <Typography variant="body1"><strong>Date:</strong> {currentBudget?.date}</Typography>
                        <Typography variant="body1"><strong>Even No. Date:</strong> {currentBudget?.evenNoDate}</Typography>
                        <Typography variant="body1"><strong>Revised Date:</strong> {currentBudget?.revisedDate}</Typography>
                        <Typography variant="body1"><strong>Email ID:</strong> {currentBudget?.email}</Typography>
                        <Typography variant="body1"><strong>Status:</strong> {currentBudget?.status}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleApprove} color="primary">Approve</Button>
                        <Button onClick={handleReject} color="secondary">Reject</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default BudgetRequest;
