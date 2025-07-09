import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { InvoiceData, COMPANY_DETAILS } from '../../types/invoice';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf'
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf',
      fontWeight: 'bold'
    }
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    width: '60%',
  },
  logo: {
    width: 250,
    height: 50,
    marginBottom: 10,
  },
  headerRight: {
    width: '35%',
  },
  companyInfo: {
    fontSize: 10,
    marginTop: 5,
  },
  invoiceTitle: {
    fontSize: 16,
    marginBottom: 2,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
  },
  invoiceBox: {
    border: '1px solid black',
    marginTop: 2,
  },
  invoiceBoxRow: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
  },
  invoiceBoxCell: {
    flex: 1,
    borderRight: '1px solid black',
  },
  invoiceBoxHeader: {
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 9,
    whiteSpace: 'nowrap',
    padding: 4,
  },
  invoiceBoxValue: {
    padding: 4,
    textAlign: 'center',
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addressBlock: {
    width: '48%',
  },
  addressTitle: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  addressInfo: {
    paddingLeft: 15,
  },
  infoTable: {
    marginBottom: 0,
    border: '1px solid black',
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoCell: {
    padding: 4,
    flex: 1,
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 20,
    whiteSpace: 'nowrap',
  },
  infoCellHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoCellDate: {
    padding: 4,
    flex: 0.7,
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 20,
    whiteSpace: 'nowrap',
  },
  infoCellPayment: {
    padding: 4,
    flex: 1.3,
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 20,
    whiteSpace: 'nowrap',
  },
  infoCellLast: {
    borderRight: 'none',
  },
  infoRowLast: {
    borderBottom: 'none',
  },
  itemsTable: {
    marginTop: 0,
    border: '1px solid black',
    borderTop: 'none',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 4,
    borderRight: '1px solid black',
  },
  qtyCol: {
    width: '15%',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  descriptionCol: {
    width: '55%',
    textAlign: 'left',
  },
  priceCol: {
    width: '15%',
    textAlign: 'right',
  },
  extPriceCol: {
    width: '15%',
    textAlign: 'right',
    borderRight: 'none',
  },
  totalsSection: {
    marginTop: 0,
    alignSelf: 'flex-end',
    width: '30%',
    border: '1px solid black',
    borderTop: 'none',
  },
  totalRow: {
    flexDirection: 'row',
  },
  totalRowLast: {
    flexDirection: 'row',
    borderTop: '1px solid black',
  },
  totalLabelCell: {
    width: '50%',
    padding: 4,
    textAlign: 'left',
    borderRight: '1px solid black',
  },
  totalValueCell: {
    width: '50%',
    padding: 4,
    textAlign: 'right',
    paddingRight: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 35,
    left: 35,
    right: 35,
  },
  footerText: {
    fontSize: 8,
    marginBottom: 2,
  },
  totalLabel: {
    textAlign: 'left',
  },
  totalValue: {
    textAlign: 'right',
  },
  tableHeaderCell: {
    textAlign: 'center',
  },
});

const Template3: React.FC<{ invoiceData: InvoiceData }> = ({ invoiceData }) => {
  const companyDetails = typeof invoiceData.company === 'string'
    ? COMPANY_DETAILS[invoiceData.company]
    : COMPANY_DETAILS['fissco'];

  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + (item.quantity * (item.unitPrice / 1.25)),
    0
  );
  const total = subtotal + (invoiceData.freight || 0);
  const tax = 0; // Tax exempt

  // Generate invoice number in format S101######.001
  const generateInvoiceNumber = () => {
    if (invoiceData.invoiceNumber) {
      // If invoice number is provided, ensure it starts with S101 and pad the rest
      const numStr = invoiceData.invoiceNumber.replace(/\D/g, '').padStart(6, '0');
      return `S101${numStr}.001`;
    }
    // Generate a random 6-digit number
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `S101${randomNum}.001`;
  };

  const invoiceNumber = generateInvoiceNumber();

  return (
    <Document
      title="Invoice"
      author="Fissco Supply"
      subject="Invoice"
      creator="Fissco Supply"
      producer="Fissco Supply"
      keywords="invoice, fissco supply, billing"
    >
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              src={`/logos/${companyDetails.logo}`}
              style={styles.logo}
            />
            <Text style={styles.companyInfo}>{companyDetails.address}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>Ship Ticket</Text>
            <View style={styles.invoiceBox}>
              <View style={styles.invoiceBoxRow}>
                <View style={styles.invoiceBoxCell}>
                  <Text style={styles.invoiceBoxHeader}>SHIP DATE</Text>
                  <Text style={styles.invoiceBoxValue}>
                    {invoiceData.invoiceDate instanceof Date 
                      ? invoiceData.invoiceDate.toLocaleDateString()
                      : new Date(invoiceData.invoiceDate).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.invoiceBoxCell}>
                  <Text style={styles.invoiceBoxHeader}>ORDER NUMBER</Text>
                  <Text style={styles.invoiceBoxValue}>
                    {invoiceNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.addressSection}>
          <View style={styles.addressBlock}>
            <Text style={styles.addressTitle}>SOLD TO:</Text>
            <View style={styles.addressInfo}>
              <Text>PREMIER COMFORT A/C</Text>
              <Text>212 W RHAPSODY DR</Text>
              <Text>SAN ANTONIO, TX 78216</Text>
            </View>
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.addressTitle}>SHIP TO:</Text>
            <View style={styles.addressInfo}>
              <Text>PREMIER COMFORT A/C</Text>

              
              <Text>212 W RHAPSODY DR</Text>
              <Text>SAN ANTONIO, TX 78216</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoTable}>
          <View style={styles.infoRow}>
            <View style={[styles.infoCell, styles.infoCellHeader]}>
              <Text>CUSTOMER NUMBER</Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellHeader]}>
              <Text>CUSTOMER PO NUMBER</Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellHeader]}>
              <Text>CUSTOMER ORDER BY</Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellHeader, styles.infoCellLast]}>
              <Text>BRANCH</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoCell}>
              <Text>44823</Text>
            </View>
            <View style={styles.infoCell}>
              <Text>{invoiceData.customerPO}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text>Alicia Honnoll</Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellLast]}>
              <Text>SAN ANTONIO #1 (210) 933-8874</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoTable}>
          <View style={styles.infoRow}>
            <View style={[styles.infoCell, styles.infoCellHeader]}>
              <Text>ASSOCIATE</Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellHeader]}>
              <Text>SHIP VIA</Text>
            </View>
            <View style={[styles.infoCellPayment, styles.infoCellHeader]}>
              <Text>PAYMENT TERMS</Text>
            </View>
            <View style={[styles.infoCellDate, styles.infoCellHeader]}>
              <Text>QUOTE DATE</Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellHeader, styles.infoCellLast]}>
              <Text>FREIGHT CHARGE</Text>
            </View>
          </View>
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <View style={styles.infoCell}>
              <Text>{companyDetails.fixedAssociate}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text>{invoiceData.shipVia}</Text>
            </View>
            <View style={styles.infoCellPayment}>
              <Text>Credit Card/Cash/Check</Text>
            </View>
            <View style={styles.infoCellDate}>
              <Text>{invoiceData.invoiceDate.toLocaleDateString()}</Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellLast]}>
              <Text>{invoiceData.freight > 0 ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.itemsTable}>
          <View style={styles.tableHeader}>
            <View style={[styles.tableCell, styles.qtyCol]}>
              <Text style={styles.tableHeaderCell}>ORDER QTY</Text>
            </View>
            <View style={[styles.tableCell, styles.descriptionCol]}>
              <Text style={styles.tableHeaderCell}>ITEM # AND DESCRIPTION</Text>
            </View>
            <View style={[styles.tableCell, styles.priceCol]}>
              <Text style={styles.tableHeaderCell}>UNIT PRICE</Text>
            </View>
            <View style={[styles.tableCell, styles.extPriceCol]}>
              <Text style={styles.tableHeaderCell}>EXT PRICE</Text>
            </View>
          </View>
          {invoiceData.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCell, styles.qtyCol]}>
                <Text>{item.quantity}</Text>
              </View>
              <View style={[styles.tableCell, styles.descriptionCol]}>
                <Text>{item.description}</Text>
              </View>
              <View style={[styles.tableCell, styles.priceCol]}>
                <Text>{(item.unitPrice / 1.25).toFixed(3)}/ea</Text>
              </View>
              <View style={[styles.tableCell, styles.extPriceCol]}>
                <Text>{(item.quantity * (item.unitPrice / 1.25)).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <View style={styles.totalLabelCell}>
              <Text>Subtotal</Text>
            </View>
            <View style={styles.totalValueCell}>
              <Text>${subtotal.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.totalRow}>
            <View style={styles.totalLabelCell}>
              <Text>Shipping</Text>
            </View>
            <View style={styles.totalValueCell}>
              <Text>${(invoiceData.freight || 0).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.totalRow}>
            <View style={styles.totalLabelCell}>
              <Text>Estimated Tax</Text>
            </View>
            <View style={styles.totalValueCell}>
              <Text>${tax.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.totalRowLast}>
            <View style={styles.totalLabelCell}>
              <Text>Amount Due</Text>
            </View>
            <View style={styles.totalValueCell}>
              <Text>${(total + tax).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>VISIT US ONLINE AT WWW.FISSCOSUPPLY.COM</Text>
          <Text style={styles.footerText}>RETURNS MAY BE SUBJECT TO RESTOCKING FEES</Text>
          <Text style={styles.footerText}>** NO RETURNS AFTER 30 DAYS **</Text>
          <Text style={styles.footerText}>FOR MORE INFO SEE FISSCOs RETURN POLICY</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Template3; 