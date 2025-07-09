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
import { InvoiceData, COMPANY_DETAILS, CUSTOMER_INFO } from '../../types/invoice';

// Register Helvetica font
Font.register({
  family: 'Helvetica',
  src: 'https://fonts.cdnfonts.com/s/85078/Helvetica-Regular.woff'
});

const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontFamily: 'Helvetica',
    fontSize: 9,
    backgroundColor: '#ffffff',
  },
  // Header section
  invoiceTitleBox: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 4,
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    width: '30%',
    alignSelf: 'center',
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerSection: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  headerLeft: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logoSection: {
    width: '25%',
    marginRight: 100,
  },
  logo: {
    width: 150,
    height: 150,
    objectFit: 'contain',
    marginTop: -45,
  },
  companyInfoSection: {
    width: '75%',
  },
  companyName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 9,
    marginBottom: 3,
  },
  companyContact: {
    fontSize: 9,
  },
  headerRight: {
    width: '40%',
    marginLeft: 20,
  },
  infoTable: {
    borderWidth: 1,
    borderColor: '#000000',
  },
  infoRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  infoRowLast: {
    flexDirection: 'row',
  },
  infoLabelCell: {
    width: '50%',
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    backgroundColor: '#D9D9D9',
    fontSize: 8,
    fontWeight: 'bold',
  },
  infoValueCell: {
    width: '50%',
    padding: 4,
    backgroundColor: '#ffffff',
    fontSize: 8,
  },
  // Customer info section
  customerSection: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  customerColumn: {
    width: '48%',
  },
  customerBox: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  customerTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customerInfo: {
    fontSize: 9,
    lineHeight: 1.3,
  },
  // Combined order info and items table
  mainTable: {
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 15,
  },
  orderInfoHeader: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  orderInfoData: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  orderInfoCell: {
    flex: 1,
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontSize: 7,
    textAlign: 'center',
  },
  orderInfoCellLast: {
    flex: 1,
    padding: 6,
    fontSize: 7,
    textAlign: 'center',
  },
  orderInfoHeaderText: {
    fontWeight: 'bold',
  },
  // Items table header
  itemsHeader: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    padding: 8,
  },
  itemsHeaderText: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Items rows - no horizontal borders between them
  itemsRow: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#ffffff',
    minHeight: 20,
  },
  itemsRowLast: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#ffffff',
    minHeight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  // Column styles with vertical borders
  quantityCol: { 
    width: '10%',
    fontSize: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000000',
    paddingRight: 5,
  },
  itemNumberCol: { 
    width: '15%',
    fontSize: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000000',
    paddingRight: 5,
  },
  descriptionCol: { 
    width: '50%',
    fontSize: 8,
    paddingLeft: 5,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    paddingRight: 5,
  },
  unitPriceCol: { 
    width: '12.5%',
    fontSize: 8,
    textAlign: 'right',
    borderRightWidth: 1,
    borderRightColor: '#000000',
    paddingRight: 5,
  },
  extPriceCol: { 
    width: '12.5%',
    fontSize: 8,
    textAlign: 'right',
    paddingRight: 5,
  },
  // Footer section
  footerSection: {
    flexDirection: 'row',
    marginTop: 0,
  },
  termsSection: {
    width: '65%',
    paddingRight: 15,
  },
  termsText: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  totalsSection: {
    width: '35%',
  },
  totalsTable: {
    borderWidth: 1,
    borderColor: '#000000',
  },
  totalRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  totalRowLast: {
    flexDirection: 'row',
  },
  totalLabelCell: {
    width: '60%',
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    backgroundColor: '#D9D9D9',
    fontSize: 9,
    fontWeight: 'bold',
  },
  totalValueCell: {
    width: '40%',
    padding: 6,
    backgroundColor: '#ffffff',
    fontSize: 9,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

interface Template6Props {
  invoiceData: InvoiceData;
}

const Template6: React.FC<Template6Props> = ({ invoiceData }) => {
  const companyDetails = typeof invoiceData.company === 'string' 
    ? COMPANY_DETAILS[invoiceData.company] 
    : COMPANY_DETAILS['texasairsystems'];
  
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const tax = invoiceData.tax || 0;
  const freight = invoiceData.freight || 0;
  const total = subtotal + tax + freight;

  // Generate invoice number if not provided
  const invoiceNumber = invoiceData.invoiceNumber || `INV${Math.floor(10000 + Math.random() * 90000)}`;
  
  // Hardcoded values for Texas AirSystems
  const customerId = "PRE039";
  const salespersonId = "matthew smith";
  const shippingMethod = "Best Service";
  
  // Create empty rows to match the quotation template
  const emptyRows = Array(10).fill(null); // Reduced from 12 to 8 to fit on one page

  // Logo path for Texas AirSystems
  const logoPath = `/logos/Texas-AirSystems-Logo.png`;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Invoice Title Box */}
        <View style={styles.invoiceTitleBox}>
          <Text style={styles.invoiceTitle}>Invoice</Text>
        </View>

        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerLeft}>
            <View style={styles.logoSection}>
              {/* Texas AirSystems Logo */}
              <Image src={logoPath} style={styles.logo} />
            </View>
            <View style={styles.companyInfoSection}>
              <Text style={styles.companyName}>Texas AirSystems</Text>
              <Text style={styles.companyAddress}>8081 Royal Ridge Pkwy</Text>
              <Text style={styles.companyAddress}>Irving TX 75063</Text>
              <Text style={styles.companyContact}>Phone: (972) 570-4700</Text>
              <Text style={styles.companyContact}>Fax: (972) 570-4207</Text>
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <View style={styles.infoTable}>
              <View style={styles.infoRow}>
                <View style={styles.infoLabelCell}>
                  <Text>Invoice #</Text>
                </View>
                <View style={styles.infoValueCell}>
                  <Text>{invoiceNumber}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoLabelCell}>
                  <Text>Customer ID</Text>
                </View>
                <View style={styles.infoValueCell}>
                  <Text>{customerId}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoLabelCell}>
                  <Text>Date</Text>
                </View>
                <View style={styles.infoValueCell}>
                  <Text>{invoiceData.invoiceDate.toLocaleDateString()}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoLabelCell}>
                  <Text>Due Date</Text>
                </View>
                <View style={styles.infoValueCell}>
                  <Text>{invoiceData.dueDate.toLocaleDateString()}</Text>
                </View>
              </View>
              <View style={styles.infoRowLast}>
                <View style={styles.infoLabelCell}>
                  <Text>Page</Text>
                </View>
                <View style={styles.infoValueCell}>
                  <Text>1 of 1</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Customer Information */}
        <View style={styles.customerSection}>
          <View style={styles.customerColumn}>
            <Text style={styles.customerTitle}>Bill to:</Text>
            <View style={styles.customerBox}>
              <Text style={styles.customerInfo}>
                {CUSTOMER_INFO.name}{'\n'}
                {CUSTOMER_INFO.address}{'\n'}
                {CUSTOMER_INFO.city} {CUSTOMER_INFO.state} {CUSTOMER_INFO.zip}
              </Text>
            </View>
          </View>
          <View style={styles.customerColumn}>
            <Text style={styles.customerTitle}>Ship to:</Text>
            <View style={styles.customerBox}>
              <Text style={styles.customerInfo}>
                {CUSTOMER_INFO.name}{'\n'}
                {CUSTOMER_INFO.address}{'\n'}
                {CUSTOMER_INFO.city} {CUSTOMER_INFO.state} {CUSTOMER_INFO.zip}
              </Text>
            </View>
          </View>
        </View>

        {/* Combined Order Information and Items Table */}
        <View style={styles.mainTable}>
          {/* Order Information Header */}
          <View style={styles.orderInfoHeader}>
            <Text style={[styles.orderInfoHeaderText, styles.orderInfoCell]}>Purchase Order No.</Text>
            <Text style={[styles.orderInfoHeaderText, styles.orderInfoCell]}>Customer ID</Text>
            <Text style={[styles.orderInfoHeaderText, styles.orderInfoCell]}>Salesperson ID</Text>
            <Text style={[styles.orderInfoHeaderText, styles.orderInfoCell]}>Shipping Method</Text>
            <Text style={[styles.orderInfoHeaderText, styles.orderInfoCell]}>Payment Terms</Text>
            <Text style={[styles.orderInfoHeaderText, styles.orderInfoCell]}>Req. Ship Date</Text>
            <Text style={[styles.orderInfoHeaderText, styles.orderInfoCellLast]}>Invoice No.</Text>
          </View>
          
          {/* Order Information Data */}
          <View style={styles.orderInfoData}>
            <Text style={styles.orderInfoCell}>{invoiceData.customerPO || ''}</Text>
            <Text style={styles.orderInfoCell}>{customerId}</Text>
            <Text style={styles.orderInfoCell}>{salespersonId}</Text>
            <Text style={styles.orderInfoCell}>{shippingMethod}</Text>
            <Text style={styles.orderInfoCell}>{invoiceData.paymentTerms || 'Net 30 days'}</Text>
            <Text style={styles.orderInfoCell}>{invoiceData.invoiceDate.toLocaleDateString()}</Text>
            <Text style={styles.orderInfoCellLast}>{invoiceNumber}</Text>
          </View>

          {/* Items Table Header */}
          <View style={styles.itemsHeader}>
            <Text style={[styles.itemsHeaderText, styles.quantityCol]}>Quantity</Text>
            <Text style={[styles.itemsHeaderText, styles.itemNumberCol]}>Item Number</Text>
            <Text style={[styles.itemsHeaderText, styles.descriptionCol]}>Description</Text>
            <Text style={[styles.itemsHeaderText, styles.unitPriceCol]}>Net unit price</Text>
            <Text style={[styles.itemsHeaderText, styles.extPriceCol]}>Ext. net price</Text>
          </View>
          
          {/* Actual Items - No horizontal borders between rows */}
          {invoiceData.items.map((item, index) => (
            <View key={index} style={styles.itemsRow}>
              <Text style={styles.quantityCol}>{item.quantity}</Text>
              <Text style={styles.itemNumberCol}>{item.productNumber || item.itemId || ''}</Text>
              <Text style={styles.descriptionCol}>{item.description}</Text>
              <Text style={styles.unitPriceCol}>${item.unitPrice.toFixed(2)}</Text>
              <Text style={styles.extPriceCol}>${(item.quantity * item.unitPrice).toFixed(2)}</Text>
            </View>
          ))}
          
          {/* Empty Rows - No horizontal borders between them */}
          {emptyRows.map((_, index) => (
            <View key={`empty-${index}`} style={index === emptyRows.length - 1 ? styles.itemsRowLast : styles.itemsRow}>
              <Text style={styles.quantityCol}> </Text>
              <Text style={styles.itemNumberCol}> </Text>
              <Text style={styles.descriptionCol}> </Text>
              <Text style={styles.unitPriceCol}> </Text>
              <Text style={styles.extPriceCol}> </Text>
            </View>
          ))}
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <View style={styles.termsSection}>
            <Text style={styles.termsText}>
              New & unused parts returns only within 30 days of receipt, subject to restock fee. Return of non-stock or special order items is subject to prior approval. Electric / Electronic components are non-refundable.
            </Text>
          </View>
          
          <View style={styles.totalsSection}>
            <View style={styles.totalsTable}>
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
                  <Text>Tax</Text>
                </View>
                <View style={styles.totalValueCell}>
                  <Text>${tax.toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.totalRow}>
                <View style={styles.totalLabelCell}>
                  <Text>Freight</Text>
                </View>
                <View style={styles.totalValueCell}>
                  <Text>${freight.toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.totalRowLast}>
                <View style={styles.totalLabelCell}>
                  <Text>TOTAL</Text>
                </View>
                <View style={styles.totalValueCell}>
                  <Text>${total.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template6; 