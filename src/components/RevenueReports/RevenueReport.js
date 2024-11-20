import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const RevenueReport = () => {
    const [reportFile, setReportFile] = useState(null);

    const handleFileUpload = (event) => {
        setReportFile(event.target.files[0]);
    };

    const handleSubmit = () => {
        console.log('Uploaded Report:', reportFile);
        // Handle file upload logic here
    };

    return (
        <div>
            <h3>Upload and View Revenue Report</h3>
            
            <TextField
                type="file"
                fullWidth
                onChange={handleFileUpload}
                margin="normal"
            />
            
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Upload Report
            </Button>
        </div>
    );
};

export default RevenueReport;
