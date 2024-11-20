import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ProcessRecommendation = () => {
    const [selectedRequest, setSelectedRequest] = useState('');
    const [notes, setNotes] = useState('');
    const [action, setAction] = useState('');

    const handleProcess = () => {
        console.log('Processing Request', { selectedRequest, action, notes });
        // Process the request (approve, send back, etc.)
    };

    return (
        <div>
            <h3>Process Recommendation Request</h3>

            <FormControl fullWidth margin="normal">
                <InputLabel>Select Request</InputLabel>
                <Select value={selectedRequest} onChange={(e) => setSelectedRequest(e.target.value)}>
                    <MenuItem value="Request 1">Request 1</MenuItem>
                    <MenuItem value="Request 2">Request 2</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Action</InputLabel>
                <Select value={action} onChange={(e) => setAction(e.target.value)}>
                    <MenuItem value="Approve">Approve</MenuItem>
                    <MenuItem value="Send Back">Send Back</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleProcess} fullWidth>
                Process Request
            </Button>
        </div>
    );
};

export default ProcessRecommendation;
