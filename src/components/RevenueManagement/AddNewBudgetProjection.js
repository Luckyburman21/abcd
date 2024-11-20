import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const AddNewBudgetProjection = ({
  onAdd,
  editData,
  onCancel,
  financialYears,
  selectionTypes,
  stakeholders,
  budgetHeads,
  businessUnits,
  currentFinancialYear,
  setCurrentFinancialYear,
  cfySelectionType,
  setCfySelectionType,
}) => {
  const [formData, setFormData] = useState({
    financialYear: "",
    selectionType: "",
    stakeholder: "",
    budgetHead: "",
    businessUnit: "",
    expenditureAsOnDate: "",
    reasonForVariation: "",
    cfyeBE: "",
    nfyeBE: "",
    cfyeRE: "",
    cfyeMA: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData); // Pre-fill data if editing
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onAdd(formData);
  };

  return (
    <Box>
      <FormControl fullWidth style={{ marginBottom: "10px" }}>
        <InputLabel>Financial Year</InputLabel>
        <Select
          label="Financial Year"
          name="financialYear"
          value={formData.financialYear || currentFinancialYear} // Use currentFinancialYear as default
          onChange={handleChange}
        >
          {financialYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: "10px" }}>
        <InputLabel>Selection Type</InputLabel>
        <Select
          label="Selection Type"
          name="selectionType"
          value={formData.selectionType}
          onChange={handleChange}
        >
          {selectionTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Stakeholder"
        variant="outlined"
        fullWidth
        name="stakeholder"
        value={formData.stakeholder}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Budget Head"
        variant="outlined"
        fullWidth
        name="budgetHead"
        value={formData.budgetHead}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Business Unit"
        variant="outlined"
        fullWidth
        name="businessUnit"
        value={formData.businessUnit}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Expenditure As On Date"
        variant="outlined"
        fullWidth
        name="expenditureAsOnDate"
        value={formData.expenditureAsOnDate}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Reason for Variation"
        variant="outlined"
        fullWidth
        name="reasonForVariation"
        value={formData.reasonForVariation}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      />

      {cfySelectionType === "BE" && (
        <TextField
          label="CFY BE"
          variant="outlined"
          fullWidth
          name="cfyeBE"
          value={formData.cfyeBE}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
      )}

      {cfySelectionType === "RE" && (
        <TextField
          label="CFY RE"
          variant="outlined"
          fullWidth
          name="cfyeRE"
          value={formData.cfyeRE}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
      )}

      {cfySelectionType === "MA" && (
        <TextField
          label="CFY MA"
          variant="outlined"
          fullWidth
          name="cfyeMA"
          value={formData.cfyeMA}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginRight: "10px" }}
      >
        {editData ? "Update" : "Add"}
      </Button>

      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default AddNewBudgetProjection;
