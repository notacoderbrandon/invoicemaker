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

// Register fonts - using Courier for monospace look
Font.register({
  family: 'Courier',
  src: 'https://fonts.cdnfonts.com/s/59275/CourierPrime-Regular.woff'
});

const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontFamily: 'Courier',
    fontSize: 8,
    backgroundColor: 'white',
    lineHeight: 1.1,
  },
  header: {
    marginBottom: 10,
  },
  logoSection: {
    marginBottom: 8,
  },
  logo: {
    width: 160,
    height: 30,
  },
  companyTable: {
    flexDirection: 'row',
    width: '33%',
  },
  leftColumn: {
    width: '50%',
    padding: 0,
  },
  rightColumn: {
    width: '50%',
    padding: 0,
  },
  companySubtitle: {
    fontSize: 5,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  companyInfo: {
    fontSize: 5,
    lineHeight: 1.1,
  },
  storeLocationsTitle: {
    fontSize: 5,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  storeLocationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  storeLocationName: {
    fontSize: 5,
    width: '55%',
  },
  storeLocationPhone: {
    fontSize: 5,
    textAlign: 'right',
    width: '45%',
  },
  invoiceSection: {
    position: 'absolute',
    top: 15,
    right: 15,
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-BoldOblique',
    fontWeight: 'bold',
    letterSpacing: -1.5,
    marginBottom: 5,
  },
  pageInfo: {
    fontSize: 8,
    textAlign: 'right',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
    padding: 3,
    backgroundColor: '#f5f5f5',
    marginTop: 5,
  },
  addressSection: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  addressBlock: {
    width: '48%',
    marginTop: 4,
  },
  addressTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: -5,
    zIndex: 10,
  },
  addressTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: -7,
  },
  addressBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
    padding: 5,
    paddingTop: 8,
    minHeight: 60,
  },
  addressContent: {
    fontSize: 9,
    lineHeight: 1.2,
    textAlign: 'center',
  },
  telephoneText: {
    fontSize: 7,
    marginTop: 3,
  },
  tableSection: {
    marginBottom: 8,
  },
  infoTable: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
  },
  infoTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  infoTableRowLast: {
    flexDirection: 'row',
  },
  infoCell: {
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: '#000',
    fontSize: 6,
    textAlign: 'center',
  },
  infoCellLast: {
    padding: 2,
    fontSize: 6,
    textAlign: 'center',
  },
  infoHeader: {
    fontWeight: 'bold',
    backgroundColor: '#e8e8e8',
  },
  infoData: {
    backgroundColor: '#ffffff',
  },
  itemsTable: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
  },
  itemsHeader: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  itemsHeaderCell: {
    padding: 3,
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  itemsHeaderCellLast: {
    padding: 3,
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    minHeight: 20,
    backgroundColor: '#ffffff',
  },
  itemRowGrey: {
    flexDirection: 'row',
    minHeight: 20,
    backgroundColor: '#f8f8f8',
  },
  itemCell: {
    padding: 2,
    fontSize: 7,
    borderRightWidth: 1,
    borderRightColor: '#000',
    textAlign: 'center',
  },
  itemCellLast: {
    padding: 2,
    fontSize: 7,
    textAlign: 'center',
  },
  itemCellLeft: {
    textAlign: 'left',
    paddingLeft: 3,
  },
  itemCellRight: {
    textAlign: 'right',
    paddingRight: 3,
  },
  paidInFull: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  termsSection: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
    padding: 5,
    marginRight: 8,
  },
  termsTitle: {
    fontSize: 7,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  termsText: {
    fontSize: 6,
    lineHeight: 1.2,
  },
  totalsSection: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
    padding: 8,
    alignSelf: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
    fontSize: 7,
  },
  totalLabel: {
    textAlign: 'left',
  },
  totalValue: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
  grandTotal: {
    fontSize: 9,
    fontWeight: 'bold',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 2,
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 6,
  },
  itemsHeaderCellNoRightBorder: {
    padding: 3,
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemCellNoRightBorder: {
    padding: 2,
    fontSize: 7,
    textAlign: 'left',
  },
  itemsHeaderCellLeft: {
    padding: 3,
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'left',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  itemsHeaderCellLeftNoRightBorder: {
    padding: 3,
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

interface Template1Props {
  invoiceData: InvoiceData;
}

const Template1: React.FC<Template1Props> = ({ invoiceData }) => {
  const companyDetails = typeof invoiceData.company === 'string' 
    ? COMPANY_DETAILS[invoiceData.company] 
    : COMPANY_DETAILS['johnstone'];
  
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * (item.unitPrice / 1.25),
    0
  );
  const freight = invoiceData.freight || 0;
  const tax = 0; // As shown in the image
  const total = subtotal + freight + tax;

  const logoPath = typeof invoiceData.company === 'string' 
    ? `/logos/${companyDetails.logo}` 
    : `/logos/${COMPANY_DETAILS['johnstone'].logo}`;

  // Helper function to format date consistently without timezone issues
  const formatDate = (date: Date) => {
    // Create a new date in local timezone to avoid UTC conversion issues
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toLocaleDateString();
  };

  // Generate sales order number: Week + Day + Year (7 digits)
  const generateSalesOrderNumber = () => {
    const date = invoiceData.invoiceDate;
    const week = getWeekNumber(date).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const randomDigit = Math.floor(Math.random() * 10);
    return `${week}${day}${year}${randomDigit}`;
  };

  // Generate invoice number: P + Week + Day + Month + Year
  const generateInvoiceNumber = () => {
    const date = invoiceData.invoiceDate;
    const week = getWeekNumber(date).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `P${week}${day}${month}${year}`;
  };

  // Helper function to get week number
  const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const salesOrderNumber = generateSalesOrderNumber();
  const invoiceNumber = invoiceData.invoiceNumber || generateInvoiceNumber();

  // Calculate empty rows needed to fill the page
  const minRowsToFillPage = 21; // Reduced to prevent overlap with bottom section
  const actualItems = invoiceData.items.length;
  const emptyRowsNeeded = Math.max(0, minRowsToFillPage - actualItems);

  return (
    <Document 
      producer=""
      creator=""
      author=""
      title=""
      subject=""
      keywords=""
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image src={logoPath} style={styles.logo} />
          </View>
          <View style={styles.companyTable}>
            <View style={styles.leftColumn}>
              <Text style={styles.companySubtitle}>Johnstone - S.A. - Alamo Downs</Text>
              <Text style={styles.companyInfo}>
                6900 Alamo Downs, Ste. 140{'\n'}
                San Antonio, TX 78238{'\n'}
                Phone: (210) 680-6500{'\n'}
                Fax: (210) 680-6570
              </Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.storeLocationsTitle}>Store Locations:</Text>
              <View style={styles.storeLocationRow}>
                <Text style={styles.storeLocationName}>S.A. - Broadway</Text>
                <Text style={styles.storeLocationPhone}>(210) 829-1934</Text>
              </View>
              <View style={styles.storeLocationRow}>
                <Text style={styles.storeLocationName}>S.A. - Alamo Downs</Text>
                <Text style={styles.storeLocationPhone}>(210) 680-6500</Text>
              </View>
              <View style={styles.storeLocationRow}>
                <Text style={styles.storeLocationName}>Lubbock</Text>
                <Text style={styles.storeLocationPhone}>(806) 792-2493</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Invoice Section */}
        <View style={styles.invoiceSection}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <View style={styles.pageInfo}>
            <Text>Page    1/1</Text>
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressBlock}>
            <View style={styles.addressTitleContainer}>
              <Text style={styles.addressTitle}>Sold To</Text>
            </View>
            <View style={styles.addressBox}>
              <Text style={styles.addressContent}>
                PREMIER COMFORT SERVICE COMPANY{'\n'}
                ATT: TACLA00057718C{'\n'}
                212 W RHAPSODY DR{'\n'}
                SAN ANTONIO TX 78216
              </Text>
            </View>
            <Text style={styles.telephoneText}>Telephone# 210-979-9100</Text>
          </View>
          
          <View style={styles.addressBlock}>
            <View style={styles.addressTitleContainer}>
              <Text style={styles.addressTitle}>Ship To</Text>
            </View>
            <View style={styles.addressBox}>
              <Text style={styles.addressContent}>
                PREMIER COMFORT SERVICE COMPANY{'\n'}
                212 W RHAPSODY DR{'\n'}
                SAN ANTONIO TX 78216
              </Text>
            </View>
            <Text style={styles.telephoneText}>Telephone#</Text>
          </View>
        </View>

        {/* Customer and Invoice Information Table - Single Continuous Table */}
        <View style={styles.tableSection}>
          <View style={styles.infoTable}>
            {/* First Header Row */}
            <View style={styles.infoTableRow}>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Customer #</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Order Date</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Sales Order #</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Buyer</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Customer P/O #</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Ship Via</Text>
              <Text style={[styles.infoCellLast, styles.infoHeader, { width: '14.32%' }]}>Salesman</Text>
            </View>
            
            {/* First Data Row */}
            <View style={styles.infoTableRow}>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>0005837</Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>{formatDate(invoiceData.invoiceDate)}</Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>{salesOrderNumber}</Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>RAMON RAMOS</Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>{invoiceData.customerPO || ''}</Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>{invoiceData.shipVia}</Text>
              <Text style={[styles.infoCellLast, styles.infoData, { width: '14.32%' }]}>{companyDetails.fixedAssociate}</Text>
            </View>

            {/* Second Header Row */}
            <View style={styles.infoTableRow}>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Invoice #</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Invoice Date</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Ship Date</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Freight Terms</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Job Number</Text>
              <Text style={[styles.infoCell, styles.infoHeader, { width: '14.28%' }]}>Terms</Text>
              <Text style={[styles.infoCellLast, styles.infoHeader, { width: '14.32%' }]}></Text>
            </View>
            
            {/* Second Data Row */}
            <View style={styles.infoTableRowLast}>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>{invoiceNumber}</Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>{formatDate(invoiceData.invoiceDate)}</Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>{formatDate(invoiceData.invoiceDate)}</Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>PREPAID& ADD</Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}></Text>
              <Text style={[styles.infoCell, styles.infoData, { width: '14.28%' }]}>{invoiceData.paymentTerms}</Text>
              <Text style={[styles.infoCellLast, styles.infoData, { width: '14.32%' }]}></Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.itemsTable}>
          <View style={styles.itemsHeader}>
            <Text style={[styles.itemsHeaderCell, { width: '3%' }]}>LN</Text>
            <Text style={[styles.itemsHeaderCell, { width: '6%' }]}>
              QNTY{'\n'}ORD
            </Text>
            <Text style={[styles.itemsHeaderCell, { width: '6%' }]}>
              QNTY{'\n'}SHIP
            </Text>
            <Text style={[styles.itemsHeaderCell, { width: '6%' }]}>
              QNTY{'\n'}B/O
            </Text>
            <Text style={[styles.itemsHeaderCellLeftNoRightBorder, { width: '10%' }]}>
              PRODUCT{'\n'}NUMBER
            </Text>
            <Text style={[styles.itemsHeaderCellLeft, { width: '44%' }]}>DESCRIPTION</Text>
            <Text style={[styles.itemsHeaderCell, { width: '4%' }]}>UOM</Text>
            <Text style={[styles.itemsHeaderCellLeft, { width: '10.5%' }]}>NET PRICE</Text>
            <Text style={[styles.itemsHeaderCellLeft, { width: '10.5%' }]}>EXTENSION</Text>
          </View>
          
          {/* Actual Items */}
          {invoiceData.items.map((item, index) => (
            <View key={index} style={index % 2 === 0 ? styles.itemRow : styles.itemRowGrey}>
              <Text style={[styles.itemCell, styles.itemCellRight, { width: '3%' }]}>{index + 1}</Text>
              <Text style={[styles.itemCell, styles.itemCellRight, { width: '6%' }]}>{item.quantity}</Text>
              <Text style={[styles.itemCell, styles.itemCellRight, { width: '6%' }]}>{item.quantity}</Text>
              <Text style={[styles.itemCell, styles.itemCellRight, { width: '6%' }]}></Text>
              <Text style={[styles.itemCellNoRightBorder, { width: '10%' }]}>{item.productNumber || '747-008'}</Text>
              <Text style={[styles.itemCell, styles.itemCellLeft, { width: '44%' }]}>{item.description}</Text>
              <Text style={[styles.itemCell, { width: '4%' }]}>EA</Text>
              <Text style={[styles.itemCell, styles.itemCellRight, { width: '10.5%' }]}>{(item.unitPrice / 1.25).toFixed(2)}</Text>
              <Text style={[styles.itemCellLast, { width: '10.5%' }]}>${(item.quantity * (item.unitPrice / 1.25)).toFixed(2)}</Text>
            </View>
          ))}
          
          {/* Empty Rows to Fill Page */}
          {Array.from({ length: emptyRowsNeeded }, (_, index) => {
            const rowIndex = actualItems + index;
            return (
              <View key={`empty-${index}`} style={rowIndex % 2 === 0 ? styles.itemRow : styles.itemRowGrey}>
                <Text style={[styles.itemCell, styles.itemCellRight, { width: '3%' }]}></Text>
                <Text style={[styles.itemCell, styles.itemCellRight, { width: '6%' }]}></Text>
                <Text style={[styles.itemCell, styles.itemCellRight, { width: '6%' }]}></Text>
                <Text style={[styles.itemCell, styles.itemCellRight, { width: '6%' }]}></Text>
                <Text style={[styles.itemCellNoRightBorder, { width: '10%' }]}></Text>
                <Text style={[styles.itemCell, styles.itemCellLeft, { width: '44%' }]}></Text>
                <Text style={[styles.itemCell, { width: '4%' }]}></Text>
                <Text style={[styles.itemCell, styles.itemCellRight, { width: '10.5%' }]}></Text>
                <Text style={[styles.itemCellLast, { width: '10.5%' }]}></Text>
              </View>
            );
          })}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>          
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms & Conditions</Text>
            <Text style={styles.termsText}>
              PLEASE NOTE: ALL RETURNED MERCHANDISE IS SUBJECT TO A RESTOCKING CHARGE. NO RETURNS ON SPECIAL ORDERED OR INSTALLED PRODUCTS. NO GOODS ACCEPTED FOR RETURN AFTER 30 DAYS. RETURN MUST HAVE INVOICE
            </Text>
          </View>
          
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Merchandise</Text>
              <Text style={styles.totalValue}>{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Freight</Text>
              <Text style={styles.totalValue}>{freight.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Misc Charges</Text>
              <Text style={styles.totalValue}>0.00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Sub Total</Text>
              <Text style={styles.totalValue}>{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Taxable</Text>
              <Text style={styles.totalValue}>0.00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax (001)</Text>
              <Text style={styles.totalValue}>0.00</Text>
            </View>
            <View style={[styles.totalRow, styles.grandTotal]}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template1; 