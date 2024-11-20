import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddNewBudgetProjection from "./AddNewBudgetProjection";
import jsPDF from "jspdf"; // Import jsPDF for PDF export

const BudgetProjection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewBudget, setShowNewBudget] = useState(false);
  const [editBudgetData, setEditBudgetData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      financialYear: "2024-2025",
      selectionType: "RE",
      stakeholder: "Stakeholder1",
      budgetHead: "MajorHead",
      businessUnit: "BusinessUnit1",
      expenditureAsOnDate: "02-02-2021",
      reasonForVariation: "Reason for variation",
      cfyeBE: "100000",
      nfyeBE: "110000",
      cfyeRE: "105000",
      cfyeMA: "107000",
      status: "Pending", // Track the status
    },
  ]);

  const financialYears = ["2024-2025", "2025-2026", "2026-2027"];
  const selectionTypes = ["BE", "RE", "MA"];
  const stakeholders = ["Stakeholder1", "Stakeholder2"];
  const budgetHeads = ["MajorHead", "MinorHead", "SubHead"];
  const businessUnits = ["BusinessUnit1", "BusinessUnit2"];
  
  const [currentFinancialYear, setCurrentFinancialYear] = useState("2024-2025"); // Store current financial year
  const [cfySelectionType, setCfySelectionType] = useState("BE"); // Store current selected type (BE, RE, MA)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNewBudgetClick = () => {
    setShowNewBudget(!showNewBudget);
    setEditBudgetData(null); // Clear any existing edit data
  };

  const handleAddOrUpdateBudget = (newBudget) => {
    if (editBudgetData) {
      // Update the existing entry with the new data
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editBudgetData.id ? { ...item, ...newBudget } : item
        )
      );
    } else {
      // Add a new entry
      setData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, ...newBudget },
      ]);
    }
    setShowNewBudget(false);
    setEditBudgetData(null); // Reset the edit data after saving
  };

  const handleEdit = (rowData) => {
    setEditBudgetData(rowData); // Set row data to edit
    setShowNewBudget(true); // Show the edit form with pre-filled values
  };

  const handleView = (rowData) => {
    setViewData(rowData);
  };

  const handleCloseView = () => {
    setViewData(null);
  };

  const handleApprove = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === viewData.id ? { ...item, status: "Approved" } : item
      )
    );
    handleCloseView();
  };

  const handleReject = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === viewData.id ? { ...item, status: "Rejected" } : item
      )
    );
    handleCloseView();
  };

  const handleExportPDF = (rowData) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Financial Year: ${rowData.financialYear}`, 14, 20);
    doc.text(`Selection Type: ${rowData.selectionType}`, 14, 30);
    doc.text(`Stakeholder: ${rowData.stakeholder}`, 14, 40);
    doc.text(`Budget Head: ${rowData.budgetHead}`, 14, 50);
    doc.text(`Business Unit: ${rowData.businessUnit}`, 14, 60);
    doc.text(`Expenditure As On Date: ${rowData.expenditureAsOnDate}`, 14, 70);
    doc.text(`Reason for Variation: ${rowData.reasonForVariation}`, 14, 80);
    doc.text(`CFY BE: ${rowData.cfyeBE}`, 14, 90);
    doc.text(`NFY BE: ${rowData.nfyeBE}`, 14, 100);
    doc.text(`CFY RE: ${rowData.cfyeRE}`, 14, 110);
    doc.text(`CFY MA: ${rowData.cfyeMA}`, 14, 120);
    doc.save("budget_projection.pdf");
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Card variant="outlined" style={{ margin: "20px", width: "100%" }}>
      <CardContent>
        <Typography
          variant="h5"
          style={{
            marginBottom: "20px",
            textAlign: "center",
            color: "#4682B4",
          }}
        >
          Budget Projection
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ flexGrow: 1, marginRight: "10px", maxWidth: "250px" }}
          />
          <IconButton onClick={() => {}}>
            <SearchIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleNewBudgetClick}
            style={{ marginLeft: "10px", backgroundColor: "#4682B4" }}
          >
            {showNewBudget ? "Cancel" : "Add New Budget Projection"}
          </Button>
        </div>

        {showNewBudget && (
          <AddNewBudgetProjection
            onAdd={handleAddOrUpdateBudget}
            editData={editBudgetData} // Pass the data to pre-fill the form if editing
            onCancel={() => setShowNewBudget(false)} // Handle cancel action to close the form
            financialYears={financialYears}
            selectionTypes={selectionTypes}
            stakeholders={stakeholders}
            budgetHeads={budgetHeads}
            businessUnits={businessUnits}
            currentFinancialYear={currentFinancialYear}
            setCurrentFinancialYear={setCurrentFinancialYear}
            cfySelectionType={cfySelectionType}
            setCfySelectionType={setCfySelectionType}
          />
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#4682B4", color: "white" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Financial Year</TableCell>
                <TableCell style={{ color: "white" }}>Selection Type</TableCell>
                <TableCell style={{ color: "white" }}>Stakeholder</TableCell>
                <TableCell style={{ color: "white" }}>Budget Head</TableCell>
                <TableCell style={{ color: "white" }}>Business Unit</TableCell>
                <TableCell style={{ color: "white" }}>Expenditure As On Date</TableCell>
                <TableCell style={{ color: "white" }}>Reason for Variation</TableCell>
                <TableCell style={{ color: "white" }}>CFY BE</TableCell>
                <TableCell style={{ color: "white" }}>NFY BE</TableCell>
                <TableCell style={{ color: "white" }}>CFY RE</TableCell>
                <TableCell style={{ color: "white" }}>CFY MA</TableCell>
                <TableCell style={{ color: "white" }}>Status</TableCell>
                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.financialYear}</TableCell>
                  <TableCell>{row.selectionType}</TableCell>
                  <TableCell>{row.stakeholder}</TableCell>
                  <TableCell>{row.budgetHead}</TableCell>
                  <TableCell>{row.businessUnit}</TableCell>
                  <TableCell>{row.expenditureAsOnDate}</TableCell>
                  <TableCell>{row.reasonForVariation}</TableCell>
                  <TableCell>{row.cfyeBE}</TableCell>
                  <TableCell>{row.nfyeBE}</TableCell>
                  <TableCell>{row.cfyeRE}</TableCell>
                  <TableCell>{row.cfyeMA}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell style={{display:"flex"}}>
                    <IconButton onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleView(row)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleExportPDF(row)}>
                      <PictureAsPdfIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* View Dialog */}
        {viewData && (
          <Dialog open={Boolean(viewData)} onClose={handleCloseView}>
            <DialogTitle>View Budget Projection</DialogTitle>
            <DialogContent>
              <Box>
                <Typography variant="body1">
                  <strong>Financial Year:</strong> {viewData.financialYear}
                </Typography>
                <Typography variant="body1">
                  <strong>Selection Type:</strong> {viewData.selectionType}
                </Typography>
                <Typography variant="body1">
                  <strong>Stakeholder:</strong> {viewData.stakeholder}
                </Typography>
                <Typography variant="body1">
                  <strong>Budget Head:</strong> {viewData.budgetHead}
                </Typography>
                <Typography variant="body1">
                  <strong>Business Unit:</strong> {viewData.businessUnit}
                </Typography>
                <Typography variant="body1">
                  <strong>Expenditure As On Date:</strong>{" "}
                  {viewData.expenditureAsOnDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Reason for Variation:</strong>{" "}
                  {viewData.reasonForVariation}
                </Typography>
                <Typography variant="body1">
                  <strong>CFY BE:</strong> {viewData.cfyeBE}
                </Typography>
                <Typography variant="body1">
                  <strong>NFY BE:</strong> {viewData.nfyeBE}
                </Typography>
                <Typography variant="body1">
                  <strong>CFY RE:</strong> {viewData.cfyeRE}
                </Typography>
                <Typography variant="body1">
                  <strong>CFY MA:</strong> {viewData.cfyeMA}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {viewData.status}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseView} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleApprove} color="primary">
                Approve
              </Button>
              <Button onClick={handleReject} color="error">
                Reject
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetProjection;
