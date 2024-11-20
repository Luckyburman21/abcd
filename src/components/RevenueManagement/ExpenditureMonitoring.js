import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Grid,
    Box
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExpenditureMonitoring = () => {
    const [formData, setFormData] = useState({
        businessUnit: '',
        budgetHead: '',
        stakeholder: '',
        fleet: '',
        pso: '',
        remarks: ''
    });
    const [reportData, setReportData] = useState(null);
    const [showForm, setShowForm] = useState(false); // Controls whether the form is visible
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Tracks if the form is submitted or not

    const businessUnits = ['Unit 1', 'Unit 2', 'Unit 3'];
    const budgetHeads = ['Major Head', 'Sub-Major Head', 'Minor Head', 'Sub Head', 'Code Head'];
    const stakeholders = ['Stakeholder 1', 'Stakeholder 2'];
    const fleets = ['Fleet 1', 'Fleet 2'];
    const psos = ['PSO 1', 'PSO 2'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.businessUnit || !formData.budgetHead) {
            alert('Please select both Business Unit and Budget Head');
            return;
        }

        const report = {
            codeHead: 'Code Head 1',
            detail: 'Some Details',
            totalAllotment: 10000,
            expAsOnDate: 5000,
            balance: 5000,
            percentExp: 50,
        };

        setReportData(report);
        setIsFormSubmitted(true); // Form is now submitted
        setShowForm(false); // Hide the form after submission
        setFormData({}); // Clear form data
    };

    const handleCancel = () => {
        setShowForm(false); // Hide the form on cancel
        setFormData({}); // Clear form data
    };

    const handleDownloadReport = () => {
        if (!reportData) {
            alert('No report data available to download.');
            return;
        }

        const doc = new jsPDF();
        doc.text('Expenditure Monitoring Report', 14, 20);

        const tableColumns = ['Code Head', 'Detail of Code Head', 'Total Allotment', 'Exp. as on date', 'Balance', '% of Expenditure'];
        const tableRows = [
            [
                reportData.codeHead,
                reportData.detail,
                reportData.totalAllotment,
                reportData.expAsOnDate,
                reportData.balance,
                reportData.percentExp,
            ],
        ];

        doc.autoTable(tableColumns, tableRows, { startY: 30 });
        doc.save('Expenditure_Monitoring_Report.pdf');
    };

    const handleCreateNewExpenditure = () => {
        setShowForm(true); // Show the form again
        setIsFormSubmitted(false); // Reset the form submission state
        setReportData(null); // Clear the report data
        setFormData({}); // Reset form data
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Expenditure Monitoring
                </Typography>

                {/* Show Create Expenditure Button only when form is not submitted or shown */}
                {!isFormSubmitted && !showForm && (
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                            Create Expenditure
                        </Button>
                    </Box>
                )}

                {/* Form for Creating Expenditure */}
                {showForm && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Business Unit*</InputLabel>
                                <Select
                                    name="businessUnit"
                                    value={formData.businessUnit}
                                    onChange={handleChange}
                                    label="Business Unit"
                                >
                                    {businessUnits.map((unit, index) => (
                                        <MenuItem key={index} value={unit}>
                                            {unit}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Budget Head*</InputLabel>
                                <Select
                                    name="budgetHead"
                                    value={formData.budgetHead}
                                    onChange={handleChange}
                                    label="Budget Head"
                                >
                                    {budgetHeads.map((head, index) => (
                                        <MenuItem key={index} value={head}>
                                            {head}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Stakeholder</InputLabel>
                                <Select
                                    name="stakeholder"
                                    value={formData.stakeholder}
                                    onChange={handleChange}
                                    label="Stakeholder"
                                >
                                    {stakeholders.map((stakeholder, index) => (
                                        <MenuItem key={index} value={stakeholder}>
                                            {stakeholder}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Fleet</InputLabel>
                                <Select
                                    name="fleet"
                                    value={formData.fleet}
                                    onChange={handleChange}
                                    label="Fleet"
                                >
                                    {fleets.map((fleet, index) => (
                                        <MenuItem key={index} value={fleet}>
                                            {fleet}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>PSO</InputLabel>
                                <Select
                                    name="pso"
                                    value={formData.pso}
                                    onChange={handleChange}
                                    label="PSO"
                                >
                                    {psos.map((pso, index) => (
                                        <MenuItem key={index} value={pso}>
                                            {pso}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Remarks(Optional)"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>

                        {/* Submit and Cancel Buttons */}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                                <Button variant="contained" color="secondary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                )}

                {/* Report Section */}
                {isFormSubmitted && reportData && (
                    <>
                        {/* Create Expenditure Button reappears after form is submitted */}
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button variant="contained" color="primary" onClick={handleCreateNewExpenditure}>
                                Create Expenditure
                            </Button>
                        </Box>

                        {/* Download Report Button */}
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button variant="contained" color="primary" onClick={handleDownloadReport}>
                                Download Report
                            </Button>
                        </Box>

                        {/* Table for Report */}
                        <div style={{ marginTop: '20px' }}>
                            <table
                                border="1"
                                style={{
                                    width: '100%',
                                    marginTop: '10px',
                                    textAlign: 'center',
                                    borderCollapse: 'collapse'
                                }}
                            >
                                <thead style={{ backgroundColor: '#f0f0f0' }}>
                                    <tr>
                                        <th>Code Head</th>
                                        <th>Detail of Code Head</th>
                                        <th>Total Allotment</th>
                                        <th>Exp. as on date</th>
                                        <th>Balance</th>
                                        <th>% of Expenditure</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{reportData.codeHead}</td>
                                        <td>{reportData.detail}</td>
                                        <td>{reportData.totalAllotment}</td>
                                        <td>{reportData.expAsOnDate}</td>
                                        <td>{reportData.balance}</td>
                                        <td>{reportData.percentExp}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default ExpenditureMonitoring;
