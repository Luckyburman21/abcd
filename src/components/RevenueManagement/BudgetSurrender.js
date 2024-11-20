import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  IconButton,
  InputAdornment
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const BudgetSurrender = () => {
  // Mock data
  const [businessUnits, setBusinessUnits] = useState([
    { id: '1', name: 'Business Unit 1' },
    { id: '2', name: 'Business Unit 2' },
    { id: '3', name: 'Business Unit 3' },
  ]);

  const [budgetHeads, setBudgetHeads] = useState([
    { id: '1', name: 'Major Head 1' },
    { id: '2', name: 'Major Head 2' },
    { id: '3', name: 'Major Head 3' },
  ]);

  const [financialYears, setFinancialYears] = useState([
    '2022-2023',
    '2023-2024',
    '2024-2025',
  ]);

  const [existingAllotment, setExistingAllotment] = useState(100000); // Example existing allotment

  const validationSchema = Yup.object({
    businessUnit: Yup.string().required('Business Unit is required'),
    budgetHead: Yup.string().required('Budget Head is required'),
    financialYear: Yup.string().required('Financial Year is required'),
    existingAllotment: Yup.number()
      .required('Existing allotment is required')
      .positive()
      .min(0),
    additionalAllotment: Yup.number()
      .required('Additional Allotment is required')
      .positive()
      .min(0),
    totalAmount: Yup.number()
      .required('Total Amount is required')
      .positive()
      .min(0),
    details: Yup.string().optional(),
    remarks: Yup.string().optional(),
    uploadedDocument: Yup.mixed().optional(),
  });

  const handleSubmit = (values) => {
    // Simulate an API call
    console.log('Submitted data:', values);
    alert('Budget Surrender submitted successfully');
  };

  return (
    <Box sx={{ width: '70%', margin: '30px auto', padding: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" component="h1" align="center" sx={{ mb: 3 }}>
        Budget Surrender - Additional Allotment Form
      </Typography>

      <Formik
        initialValues={{
          businessUnit: '',
          budgetHead: '',
          financialYear: '',
          existingAllotment: '',
          additionalAllotment: '',
          totalAmount: '',
          details: '',
          remarks: '',
          uploadedDocument: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, touched, errors }) => (
          <Form>
            <Grid container spacing={3}>
              {/* Business Unit Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={touched.businessUnit && Boolean(errors.businessUnit)}>
                  <InputLabel>Business Unit</InputLabel>
                  <Select
                    name="businessUnit"
                    value={values.businessUnit}
                    label="Business Unit"
                    onChange={(e) => setFieldValue('businessUnit', e.target.value)}
                  >
                    <MenuItem value="">Select Business Unit</MenuItem>
                    {businessUnits.map((unit) => (
                      <MenuItem key={unit.id} value={unit.id}>
                        {unit.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{touched.businessUnit && errors.businessUnit}</FormHelperText>
                </FormControl>
              </Grid>

              {/* Budget Head Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={touched.budgetHead && Boolean(errors.budgetHead)}>
                  <InputLabel>Budget Head</InputLabel>
                  <Select
                    name="budgetHead"
                    value={values.budgetHead}
                    label="Budget Head"
                    onChange={(e) => setFieldValue('budgetHead', e.target.value)}
                  >
                    <MenuItem value="">Select Budget Head</MenuItem>
                    {budgetHeads.map((head) => (
                      <MenuItem key={head.id} value={head.id}>
                        {head.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{touched.budgetHead && errors.budgetHead}</FormHelperText>
                </FormControl>
              </Grid>

              {/* Financial Year Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={touched.financialYear && Boolean(errors.financialYear)}>
                  <InputLabel>Financial Year</InputLabel>
                  <Select
                    name="financialYear"
                    value={values.financialYear}
                    label="Financial Year"
                    onChange={(e) => setFieldValue('financialYear', e.target.value)}
                  >
                    <MenuItem value="">Select Financial Year</MenuItem>
                    {financialYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{touched.financialYear && errors.financialYear}</FormHelperText>
                </FormControl>
              </Grid>

              {/* Existing Allotment Field (Read-Only) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Existing Allotment"
                  variant="outlined"
                  fullWidth
                  value={existingAllotment}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* Additional Allotment Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Additional Allotment/Surrender"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="additionalAllotment"
                  value={values.additionalAllotment}
                  onChange={(e) => setFieldValue('additionalAllotment', e.target.value)}
                  error={touched.additionalAllotment && Boolean(errors.additionalAllotment)}
                  helperText={touched.additionalAllotment && errors.additionalAllotment}
                />
              </Grid>

              {/* Total Amount Field (Calculated as Difference) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Total Amount (Difference)"
                  variant="outlined"
                  fullWidth
                  value={values.existingAllotment - values.additionalAllotment}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* Details Field */}
              <Grid item xs={12}>
                <TextField
                  label="Details"
                  variant="outlined"
                  fullWidth
                  name="details"
                  value={values.details}
                  onChange={(e) => setFieldValue('details', e.target.value)}
                  error={touched.details && Boolean(errors.details)}
                  helperText={touched.details && errors.details}
                />
              </Grid>

              {/* Remarks Field */}
              <Grid item xs={12}>
                <TextField
                  label="Remarks"
                  variant="outlined"
                  fullWidth
                  name="remarks"
                  value={values.remarks}
                  onChange={(e) => setFieldValue('remarks', e.target.value)}
                  error={touched.remarks && Boolean(errors.remarks)}
                  helperText={touched.remarks && errors.remarks}
                />
              </Grid>

              {/* Upload Document Field */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mt: 2 }}
                  startIcon={<AttachFileIcon />}
                >
                  Upload Document
                  <input
                    type="file"
                    name="uploadedDocument"
                    hidden
                    onChange={(event) =>
                      setFieldValue('uploadedDocument', event.currentTarget.files[0])
                    }
                  />
                </Button>
                <FormHelperText>{touched.uploadedDocument && errors.uploadedDocument}</FormHelperText>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BudgetSurrender;
