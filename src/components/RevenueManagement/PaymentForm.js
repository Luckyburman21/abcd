import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const PaymentForm = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [paymentRecords, setPaymentRecords] = useState([]);

  // This function handles the form submission and adds the payment record to the table
  const onSubmit = (data) => {
    // Add the payment data to the records list
    setPaymentRecords(prevState => [...prevState, data]);
    reset(); // Reset the form fields after submission
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {/* Left Side: Payment Records Table */}
        <Grid item xs={12} md={6}>
          <h2>Payment Records</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Contract No</TableCell>
                  <TableCell>SL No of Milestone</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No records available</TableCell>
                  </TableRow>
                ) : (
                  paymentRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.contractNo}</TableCell>
                      <TableCell>{record.milestoneSLNo}</TableCell>
                      <TableCell>{record.milestoneDescription}</TableCell>
                      <TableCell>{record.milestoneAmount}</TableCell>
                      <TableCell>{record.paymentDone}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right Side: Payment Form */}
        <Grid item xs={12} md={6}>
          <h2>Submit Payment</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Contract No (Optional) */}
              <Grid item xs={12}>
                <Controller
                  name="contractNo"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField {...field} label="Contract No" fullWidth />}
                />
              </Grid>

              {/* SL No of Milestone (Mandatory) */}
              <Grid item xs={12}>
                <Controller
                  name="milestoneSLNo"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'SL No of Milestone is required' }}
                  render={({ field }) => (
                    <TextField {...field} label="SL No of Milestone" fullWidth error={!!errors.milestoneSLNo} helperText={errors.milestoneSLNo?.message} />
                  )}
                />
              </Grid>

              {/* Description of Milestone (Mandatory) */}
              <Grid item xs={12}>
                <Controller
                  name="milestoneDescription"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Description of Milestone is required' }}
                  render={({ field }) => (
                    <TextField {...field} label="Description of Milestone" fullWidth error={!!errors.milestoneDescription} helperText={errors.milestoneDescription?.message} />
                  )}
                />
              </Grid>

              {/* Amount of Milestone (Mandatory) */}
              <Grid item xs={12}>
                <Controller
                  name="milestoneAmount"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Amount of Milestone is required' }}
                  render={({ field }) => (
                    <TextField {...field} label="Amount of Milestone" type="number" fullWidth error={!!errors.milestoneAmount} helperText={errors.milestoneAmount?.message} />
                  )}
                />
              </Grid>

              {/* Invoice Amount (Mandatory) */}
              <Grid item xs={12}>
                <Controller
                  name="invoiceAmount"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Invoice Amount is required' }}
                  render={({ field }) => (
                    <TextField {...field} label="Invoice Amount" type="number" fullWidth error={!!errors.invoiceAmount} helperText={errors.invoiceAmount?.message} />
                  )}
                />
              </Grid>

              {/* Payment Done (Mandatory) */}
              <Grid item xs={12}>
                <Controller
                  name="paymentDone"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Payment Status is required' }}
                  render={({ field }) => (
                    <TextField {...field} label="Payment Status" fullWidth error={!!errors.paymentDone} helperText={errors.paymentDone?.message} />
                  )}
                />
              </Grid>

              {/* Other Remarks (Optional) */}
              <Grid item xs={12}>
                <Controller
                  name="otherRemarks"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField {...field} label="Other Remarks" fullWidth />}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit Payment</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentForm;
