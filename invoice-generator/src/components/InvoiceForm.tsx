import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Preview as PreviewIcon, Download as DownloadIcon } from '@mui/icons-material';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { InvoiceData, COMPANIES, COMPANY_DETAILS } from '../types/invoice';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import Template4 from './templates/Template4';
import Template5 from './templates/Template5';
import Template6 from './templates/Template6';
import { SAVED_ITEMS, SavedItem } from '../data/savedItems';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#333',
            },
            '&:hover fieldset': {
              borderColor: '#90caf9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#90caf9',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#90caf9',
          },
        },
      },
    },
  },
});

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  onInvoiceDataChange: (data: InvoiceData) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoiceData, onInvoiceDataChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  const handleChange = (field: keyof InvoiceData, value: any) => {
    onInvoiceDataChange({
      ...invoiceData,
      [field]: value
    });
  };

  const handleItemChange = (index: number, field: keyof InvoiceData['items'][0], value: any) => {
    const newItems = [...invoiceData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    handleChange('items', newItems);
  };

  const addItem = () => {
    handleChange('items', [
      ...invoiceData.items,
      { description: '', quantity: 0, unitPrice: 0 }
    ]);
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    handleChange('items', newItems);
  };

  const renderTemplate = () => {
    const templateMap = {
      1: Template1,
      2: Template2,
      3: Template3,
      4: Template4,
      5: Template5,
      6: Template6,
    };
    const companyName = typeof invoiceData.company === 'string' ? invoiceData.company : invoiceData.company.name;
    const Template = templateMap[COMPANY_DETAILS[companyName].template as keyof typeof templateMap];
    return <Template invoiceData={invoiceData} />;
  };

  const addSavedItem = (savedItem: SavedItem) => {
    const newItem = {
      description: savedItem.description,
      quantity: 1,
      unitPrice: savedItem.premierUnitPrice,
      productNumber: savedItem.productNumber
    };
    handleChange('items', [...invoiceData.items, newItem]);
    setQuickAddOpen(false);
  };

  const getAvailableSavedItems = (): SavedItem[] => {
    const companyName = typeof invoiceData.company === 'string' ? invoiceData.company : invoiceData.company.name;
    const templateNumber = COMPANY_DETAILS[companyName].template;
    
    // For Template1 (Johnstone), return the saved items
    if (templateNumber === 1) {
      return SAVED_ITEMS.template1;
    }
    
    // Return empty array for other templates for now
    return [];
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#fff' }}>
          Invoice Generator
        </Typography>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            border: '1px solid #333',
            boxShadow: '0 0 20px rgba(76, 175, 80, 0.1)',
            '&:hover': {
              boxShadow: '0 0 30px rgba(76, 175, 80, 0.15)',
            }
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Company</InputLabel>
                <Select
                  value={invoiceData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  label="Company"
                >
                  {COMPANIES.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer PO"
                value={invoiceData.customerPO}
                onChange={(e) => handleChange('customerPO', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ship Via"
                value={invoiceData.shipVia}
                onChange={(e) => handleChange('shipVia', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Payment Terms"
                value={invoiceData.paymentTerms}
                onChange={(e) => handleChange('paymentTerms', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Invoice Date"
                value={invoiceData.invoiceDate instanceof Date && !isNaN(invoiceData.invoiceDate.getTime()) 
                  ? invoiceData.invoiceDate.toISOString().split('T')[0] 
                  : ''}
                onChange={(e) => {
                  const dateValue = e.target.value;
                  if (dateValue && dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    const newDate = new Date(dateValue + 'T00:00:00');
                    if (!isNaN(newDate.getTime())) {
                      handleChange('invoiceDate', newDate);
                    }
                  }
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Freight"
                value={invoiceData.freight}
                onChange={(e) => handleChange('freight', parseFloat(e.target.value))}
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            border: '1px solid #333',
            boxShadow: '0 0 20px rgba(76, 175, 80, 0.1)',
            '&:hover': {
              boxShadow: '0 0 30px rgba(76, 175, 80, 0.15)',
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>Items</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {getAvailableSavedItems().length > 0 && (
                <Button
                  variant="outlined"
                  onClick={() => setQuickAddOpen(true)}
                  sx={{ borderColor: '#4caf50', color: '#4caf50' }}
                >
                  Quick Add
                </Button>
              )}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleChange('items', [
                  ...invoiceData.items,
                  { description: '', quantity: 0, unitPrice: 0, productNumber: '' }
                ])}
                sx={{ borderColor: '#90caf9', color: '#90caf9' }}
              >
                Add Item
              </Button>
            </Box>
          </Box>

          {invoiceData.items.map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                border: '1px solid #333',
                backgroundColor: '#252525',
                boxShadow: '0 0 15px rgba(76, 175, 80, 0.05)',
                '&:hover': {
                  boxShadow: '0 0 25px rgba(76, 175, 80, 0.1)',
                }
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                    InputProps={{ inputProps: { min: 1, step: 1 } }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Product Number"
                    value={item.productNumber}
                    onChange={(e) => handleItemChange(index, 'productNumber', e.target.value)}
                    placeholder="e.g., 747-008"
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Unit Premier Price"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                    InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                  />
                </Grid>
                <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton
                    onClick={() => handleChange('items', invoiceData.items.filter((_, i) => i !== index))}
                    sx={{ color: '#f44336' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Paper>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPreviewOpen(true)}
              startIcon={<PreviewIcon />}
            >
              Preview
            </Button>
          </Box>
        </Grid>

        <Dialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: { 
              maxHeight: '90vh',
              height: '90vh',
              backgroundColor: '#fff'
            }
          }}
        >
          <DialogTitle>Preview Invoice</DialogTitle>
          <DialogContent>
            <Box sx={{ height: 'calc(100% - 64px)', width: '100%', backgroundColor: '#fff' }}>
              <PDFViewer 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  border: 'none'
                }}
                showToolbar={true}
              >
                {renderTemplate()}
              </PDFViewer>
            </Box>
          </DialogContent>
          <DialogActions>
            <BlobProvider document={renderTemplate()}>
              {({ blob, url }) => (
                <Button
                  variant="contained"
                  color="primary"
                  href={url || '#'}
                  download={`invoice-${invoiceData.customerPO || 'draft'}.pdf`}
                  disabled={!blob}
                  startIcon={<DownloadIcon />}
                >
                  Download PDF
                </Button>
              )}
            </BlobProvider>
            <Button onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Quick Add Dialog */}
        <Dialog
          open={quickAddOpen}
          onClose={() => setQuickAddOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Quick Add Items</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {getAvailableSavedItems().map((savedItem) => (
                <Grid item xs={12} key={savedItem.id}>
                                     <Paper
                     elevation={1}
                     sx={{
                       p: 2,
                       cursor: 'pointer',
                       backgroundColor: '#2e2e2e',
                       '&:hover': {
                         backgroundColor: '#3a3a3a',
                         borderColor: '#4caf50'
                       },
                       border: '1px solid #444',
                       borderRadius: 1
                     }}
                    onClick={() => addSavedItem(savedItem)}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={2}>
                        <Typography variant="subtitle2" color="primary">
                          {savedItem.productNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <Typography variant="body1">
                          {savedItem.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="h6" color="secondary" sx={{ textAlign: 'right' }}>
                          ${savedItem.premierUnitPrice.toFixed(2)}
                        </Typography>
                        <Typography variant="caption" sx={{ textAlign: 'right', display: 'block' }}>
                          Premier Price
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setQuickAddOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default InvoiceForm; 