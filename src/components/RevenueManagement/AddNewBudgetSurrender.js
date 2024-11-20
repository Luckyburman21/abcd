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

function AddNewBudgetSurrender() {
  const location = useLocation();
  const { row } = location.state || {}; // Get the row data from location state
  const currentYear = new Date().getFullYear();

  // State variables
  const [year, setYear] = useState(row ? row.year : '');
  const [estimate, setEstimate] = useState(row ? row.estimate : '');
  const [stakeholder, setStakeholder] = useState(row ? row.stakeholder : '');
  const [budgethead, setBudgethead] = useState(row ? row.budgethead : '');
  const [businessunit, setBusinessunit] = useState(row ? row.businessunit : '');
  const [currentDate, setCurrentDate] = useState(row ? row.currentDate : '');
  const [variation, setVariation] = useState(row ? row.variation : '');
  const [remarks, setRemarks] = useState(row ? row.remarks : '');
  const [cfyBE, setCfyBE] = useState(row ? row.cfyBE : '');
  const [requirementRE, setRequirementRE] = useState(row ? row.requirementRE : '');
  const [requirementBE, setRequirementBE] = useState(row ? row.requirementBE : '');
  const [cfyRE, setCfyRE] = useState(row ? row.cfyRE : '');
  const [requirementMA, setRequirementMA] = useState(row ? row.requirementMA : '');
  console.log("row.........", row);
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'year':
        setYear(value);
        break;
      case 'estimate':
        setEstimate(value);
        break;
      case 'stakeholder':
        setStakeholder(value);
        break;
      case 'budgethead':
        setBudgethead(value);
        break;
      case 'businessunit':
        setBusinessunit(value);
        break;
      case 'variation':
        setVariation(value);
        break;
      case 'remarks':
        setRemarks(value);
        break;
      case 'cfyRE':
        setCfyRE(value);
        break;
      case 'requirementRE':
        setRequirementRE(value);
        break;
      case 'cfyBE':
        setCfyBE(value);
        break;
      case 'requirementBE':
        setRequirementBE(value);
        break;
      case 'requirementMA':
        setRequirementMA(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: row ? row.id : Date.now(), // Keep the same ID if updating
      year,
      estimate,
      stakeholder,
      budgethead,
      businessunit,
      currentDate,
      variation,
      remarks,
      cfyBE,
      requirementBE,
      cfyRE,
      requirementRE,
      requirementMA,
    };

    const currentData = JSON.parse(localStorage.getItem('budgetSurrender')) || [];

    if (row) {
      // Update the existing entry
      const updatedData = currentData.map(item => item.id === row.id ? newEntry : item);
      localStorage.setItem('budgetSurrender', JSON.stringify(updatedData));
    } else {
      // Add a new entry
      localStorage.setItem('budgetSurrender', JSON.stringify([...currentData, newEntry]));
    }

    // Reset form fields
    // ... (reset logic here)

    navigate('/budget-surrender');
  };

  return (
    <>
      <Box sx={{ p: 2, maxWidth: 600, mx: 'auto', maxHeight: 500 }}>

        <form onSubmit={handleSubmit}>
        <h1>Budget Surrender</h1>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>

              <FormControl fullWidth>
                <InputLabel id="year-label">Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  value={year}
                  label="Year"
                  name="year"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value={currentYear + 2}>{currentYear + 2}</MenuItem>
                  <MenuItem value={currentYear + 1}>{currentYear + 1}</MenuItem>
                  <MenuItem value={currentYear}>{currentYear}</MenuItem>
                  <MenuItem value={currentYear - 1}>{currentYear - 1}</MenuItem>
                  <MenuItem value={currentYear - 2}>{currentYear - 2}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="estimate-label">Select BE/RE/MA</InputLabel>
                <Select
                  labelId="estimate-label"
                  id="estimate"
                  value={estimate}
                  label="Budget Estimate"
                  name="estimate"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Budget Estimate">Budget Estimate</MenuItem>
                  <MenuItem value="Revised Estimate">Revised Estimate</MenuItem>
                  <MenuItem value="Modified Appropriation">Modified Appropriation</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Stakeholder and Budget Head Side by Side */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="stakeholder-label">Stakeholder</InputLabel>
                <Select
                  labelId="stakeholder-label"
                  id="stakeholder"
                  value={stakeholder}
                  label="Stakeholder"
                  name="stakeholder"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="stakeholder1">Stakeholder 1</MenuItem>
                  <MenuItem value="stakeholder2">Stakeholder 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
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
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="variation"
                label="Reason for Variation"
                name="variation"
                value={variation}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="Current Date"
                label="Current Date"
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
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

            {estimate === "Revised Estimate" && Number(year) === currentYear && (
              <>
                <header style={{ background: "#4682B4", padding: "10px", textAlign: "center" }}>
                  {/* <h1 style={{ color: "#fff", fontWeight: "bold" }}>BUDGET SURRENDER</h1> */}
                  <h3 style={{ color: "#fff", fontWeight: "bold" }}>REVISED ESTIMATE FOR CURRENT FINANCIAL YEAR</h3>
                </header>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="cfyRE"
                    label=" Current Financial Year BE"
                    name="cfyBE"
                    value={cfyBE}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="requirementRE"
                    label="Requirement RE"
                    name="requirementRE"
                    value={requirementRE}
                    required
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}

            {estimate === "Budget Estimate" && Number(year) === (currentYear + 1) && (

              <>
                <h3>BUDGET ESTIMATE FOR NEXT FINANCIAL YEAR</h3>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="cfyBE"
                    label=" Current Financial Year BE"
                    name="cfyBE"
                    value={cfyBE}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="requirementBE"
                    label="Requirement BE"
                    name="requirementBE"
                    value={requirementBE}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </>
            )}

            {estimate === "Modified Appropriation" && Number(year) === currentYear && (
              <>
                <h3>MODIFIED APPROPRIATION FOR CURRENT FINANCIAL YEAR</h3>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="cfyRE"
                    label="Current Financial Year RE"
                    name="cfyRE"
                    value={cfyRE}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="requirementMA"
                    label="Requirement MA"
                    name="requirementMA"
                    value={requirementMA}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Submit</Button>
            </Grid>
          </Grid>
        </form>

      </Box>
    </>
  );
}

export default AddNewBudgetSurrender;
