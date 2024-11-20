import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RequestRecommendation = () => {
    const [requestType, setRequestType] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = () => {
        console.log('Request Submitted', { requestType, itemDescription, dueDate, note });
        // Process the request submission logic here
    };

    return (
        <div>
            <h3>Create Recommendation and Approval Request</h3>
            <FormControl fullWidth margin="normal">
                <InputLabel>Request Type</InputLabel>
                <Select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
                    <MenuItem value="Budget Projection">Budget Projection</MenuItem>
                    <MenuItem value="Budget Allotment">Budget Allotment</MenuItem>
                    <MenuItem value="Budget Surrender">Budget Surrender</MenuItem>
                    <MenuItem value="Budget Withdrawal">Budget Withdrawal</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Item Description"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                label="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />

            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                Submit Request
            </Button>
        </div>
    );
};

export default RequestRecommendation;
