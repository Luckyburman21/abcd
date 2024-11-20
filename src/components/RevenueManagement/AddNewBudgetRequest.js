import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { NewBudgetRequest } from '../../actions/RevenueManagementActions/BudgetRequestAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddNewBudgetRequest = ({props,NewBudgetRequest,currentBudget,onClose}) => {
    const [fyRE, setFyRE] = useState('');
    const [fyBE, setFyBE] = useState('');
    const [fyMA, setFyMA] = useState('');
    const [letterHead, setLetterHead] = useState('');
    const [date, setDate] = useState('');
    const [evenNoDate, setEvenNoDate] = useState('');
    const [revisedDate, setRevisedDate] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(''); // State for email validation error
    const [letterHeadError, setLetterHeadError] = useState(''); // State for letter head validation error

    const fiscalYearOptions = ['2022-2023', '2023-2024', '2024-2025', '2025-2026'];

    useEffect(() => {
        if (currentBudget) {
            console.log(currentBudget)
            setFyRE(currentBudget.fyRE);
            setFyBE(currentBudget.fyBE);
            setFyMA(currentBudget.fyMA);
            setLetterHead(currentBudget.letterHead);
            setDate(currentBudget.date);
            setEvenNoDate(currentBudget.evenNoDate);
            setRevisedDate(currentBudget.revisedDate);
            setEmail(currentBudget.email);
        }
        console.log(currentBudget)
    }, [currentBudget]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateLetterHead = (letterHead) => {
        const letterHeadRegex = /^Air HQ\/\d{5}\/\d{2}\/Fin P\/RB\/BM-\d$/;
        return letterHeadRegex.test(letterHead);
    };

    // Handle form submission and API call
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError(''); // Clear email error if valid
        }

        // Validate letter head
        if (!validateLetterHead(letterHead)) {
            setLetterHeadError("Please enter Letter Head in 'Air HQ/95213/74/Fin P/RB/BM-1' format.");
            return;
        } else {
            setLetterHeadError(''); // Clear letter head error if valid
        }

        // const budgetData = {fyRE, fyBE, fyMA, date,evenNoDate, revisedDate, email,letterHead };
        // console.log(budgetData);

        await NewBudgetRequest(fyRE, fyBE, fyMA, date,evenNoDate, revisedDate, email,letterHead);
        // try {
        //     // Send POST request using fetch
        //     const response = await fetch('/budgetRequest/addBudgetReq', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(budgetData),
        //     });

        //     // Handle response
        //     if (response.ok) {
        //         const result = await response.json();
        //         console.log('Success:', result);
        //         onClose(); // Close the form after successful submission
        //     } else {
        //         console.error('Error:', response.statusText);
        //     }
        // } catch (error) {
        //     console.error('Error during API request:', error);
        // }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError(''); // Clear error message when typing
    };

    const handleLetterHeadChange = (e) => {
        setLetterHead(e.target.value);
        if (letterHeadError) setLetterHeadError(''); // Clear error message when typing
    };

    return (
        <Card variant="outlined" style={{ margin: '20px' }}>
            <CardContent>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControl variant="outlined" style={{ marginBottom: '10px' }} required>
                        <InputLabel>FY for RE</InputLabel>
                        <Select
                            value={fyRE}
                            onChange={(e) => setFyRE(e.target.value)}
                            label="FY for RE"
                        >
                            {fiscalYearOptions.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <FormControl variant="outlined" style={{ marginBottom: '10px' }} required>
                        <InputLabel>FY for BE</InputLabel>
                        <Select
                            value={fyBE}
                            onChange={(e) => setFyBE(e.target.value)}
                            label="FY for BE"
                        >
                            {fiscalYearOptions.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" style={{ marginBottom: '10px' }} required>
                        <InputLabel>FY for MA</InputLabel>
                        <Select
                            value={fyMA}
                            onChange={(e) => setFyMA(e.target.value)}
                            label="FY for MA"
                        >
                            {fiscalYearOptions.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Letter Head"
                        variant="outlined"
                        value={letterHead}
                        onChange={handleLetterHeadChange}
                        required
                        style={{ marginBottom: '10px' }}
                        error={!!letterHeadError} // Set error state
                        helperText={letterHeadError} // Display error message
                    />
                    <TextField
                        label="Date"
                        type="date"
                        variant="outlined"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={{ marginBottom: '10px' }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Even No. Date"
                        type="date"
                        variant="outlined"
                        value={evenNoDate}
                        onChange={(e) => setEvenNoDate(e.target.value)}
                        required
                        style={{ marginBottom: '10px' }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Revised Date"
                        type="date"
                        variant="outlined"
                        value={revisedDate}
                        onChange={(e) => setRevisedDate(e.target.value)}
                        required
                        style={{ marginBottom: '10px' }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Email ID"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        style={{ marginBottom: '10px' }}
                        error={!!emailError} // Set error state
                        helperText={emailError} // Display error message
                    />

                    <Box display="flex" justifyContent="center" marginTop="10px">
                        <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
                            Submit
                        </Button>
                        <Button variant="outlined" color="primary" onClick={onClose}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
};

AddNewBudgetRequest.propTypes = {
    NewBudgetRequest: PropTypes.func.isRequired,
    
};

const mapStateToProps = (state) => ({
    // currentBudget: state.budgetRequest.budgetRequests,
});

export default connect(mapStateToProps, { NewBudgetRequest })(AddNewBudgetRequest);
