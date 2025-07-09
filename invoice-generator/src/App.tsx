import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import InvoiceForm from './components/InvoiceForm';
import Template1 from './components/templates/Template1';
import { InvoiceData } from './types/invoice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    company: 'fissco',
    invoiceNumber: '',
    invoiceDate: new Date(),
    customerPO: '',
    customerId: '',
    terms: 'Net 30',
    dueDate: new Date(),
    discountDate: new Date(),
    discountAmount: 0,
    shipVia: 'Customer Pickup',
    paymentTerms: 'Net 30',
    items: [{ description: '', quantity: 0, unitPrice: 0, productNumber: '' }],
    notes: '',
    subtotal: 0,
    tax: 0,
    total: 0,
    shipping: 0,
    freight: 0
  });

  const handleInvoiceDataChange = (data: InvoiceData) => {
    setInvoiceData(data);
  };

  // Check if running in Electron
  const isElectron = typeof window !== 'undefined' && (window as any).process?.type === 'renderer';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <InvoiceForm
          invoiceData={invoiceData}
          onInvoiceDataChange={handleInvoiceDataChange}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
