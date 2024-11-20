import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Import Date adapter
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PaymentForm = () => {
  // Form validation schema using Yup
  const validationSchema = Yup.object({
    contractNo: Yup.string().optional(),
    contractDate: Yup.date().optional(),
    milestoneSLNo: Yup.string().required('SL No of Milestone is required'),
    milestoneDesc: Yup.string().required('Description of Milestone is required'),
    startDate: Yup.date().required('Starting Date is required'),
    endDate: Yup.date().required('Completion Date is required'),
    milestoneAmount: Yup.number().required('Amount of Milestone is required'),
    paymentDueDate: Yup.date().required('Due Date of Payment is required'),
    revisedDate: Yup.date().required('Revised Date is required'),
    remarks: Yup.string().required('Remarks are required'),
    invoiceAmount: Yup.number().required('Invoice Amount is required'),
    invoiceNumber: Yup.string().required('Invoice Number is required'),
  });

  // Formik hook for handling form submission
  const formik = useFormik({
    initialValues: {
      contractNo: '',
      contractDate: null,
      milestoneSLNo: '',
      milestoneDesc: '',
      startDate: null,
      endDate: null,
      milestoneAmount: '',
      paymentDueDate: null,
      revisedDate: null,
      remarks: '',
      invoiceAmount: '',
      invoiceNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Add your form submission logic here
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          padding: '20px',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h3>Initial Milestone/Advance Payment</h3>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract No"
              name="contractNo"
              value={formik.values.contractNo}
              onChange={formik.handleChange}
              error={formik.touched.contractNo && Boolean(formik.errors.contractNo)}
              helperText={formik.touched.contractNo && formik.errors.contractNo}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Contract Date"
              value={formik.values.contractDate}
              onChange={(date) => formik.setFieldValue('contractDate', date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SL No of Milestone"
              name="milestoneSLNo"
              value={formik.values.milestoneSLNo}
              onChange={formik.handleChange}
              error={formik.touched.milestoneSLNo && Boolean(formik.errors.milestoneSLNo)}
              helperText={formik.touched.milestoneSLNo && formik.errors.milestoneSLNo}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description of Milestone"
              name="milestoneDesc"
              value={formik.values.milestoneDesc}
              onChange={formik.handleChange}
              error={formik.touched.milestoneDesc && Boolean(formik.errors.milestoneDesc)}
              helperText={formik.touched.milestoneDesc && formik.errors.milestoneDesc}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Starting Date of Milestone"
              value={formik.values.startDate}
              onChange={(date) => formik.setFieldValue('startDate', date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Completion Date of Milestone"
              value={formik.values.endDate}
              onChange={(date) => formik.setFieldValue('endDate', date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount of Milestone"
              name="milestoneAmount"
              type="number"
              value={formik.values.milestoneAmount}
              onChange={formik.handleChange}
              error={formik.touched.milestoneAmount && Boolean(formik.errors.milestoneAmount)}
              helperText={formik.touched.milestoneAmount && formik.errors.milestoneAmount}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Due Date of Payment"
              value={formik.values.paymentDueDate}
              onChange={(date) => formik.setFieldValue('paymentDueDate', date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Revised Date"
              value={formik.values.revisedDate}
              onChange={(date) => formik.setFieldValue('revisedDate', date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Other / Remarks"
              name="remarks"
              value={formik.values.remarks}
              onChange={formik.handleChange}
              error={formik.touched.remarks && Boolean(formik.errors.remarks)}
              helperText={formik.touched.remarks && formik.errors.remarks}
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default PaymentForm;
