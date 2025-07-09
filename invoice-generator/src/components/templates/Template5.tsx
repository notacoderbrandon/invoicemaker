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

// Register Courier font for the monospace look
Font.register({
  family: 'Courier',
  src: 'https://fonts.cdnfonts.com/s/59275/CourierPrime-Regular.woff'
});

const styles = StyleSheet.create({
  page: {
    padding: 45,
    fontFamily: 'Courier',
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 18,
  },
  headerLeft: {
    width: '38%',
  },
  headerRight: {
    width: '42%',
    alignItems: 'flex-end',
  },
  logo: {
    width: 170,
    height: 58,
    objectFit: 'contain',
  },
  companyInfo: {
    fontSize: 8,
    marginTop: 18,
  },
  addressBlocks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#000',
  },
  addressBlock: {
    width: '48%',
    padding: 18,
  },
  addressTitle: {
    marginBottom: 5,
  },
  infoTable: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 18,
  },
  infoCell: {
    padding: 5,
    borderRightWidth: 1,
    borderColor: '#000',
    flex: 1,
  },
  infoCellHeader: {
    fontSize: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 2,
  },
  itemsTable: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  productCol: { width: '15%' },
  descriptionCol: { width: '45%' },
  umCol: { width: '10%' },
  quantityCol: { width: '10%', textAlign: 'right' },
  priceCol: { width: '10%', textAlign: 'right' },
  extensionCol: { width: '10%', textAlign: 'right' },
  totalsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
    marginBottom: 70,
  },
  signatureSection: {
    width: '62%',
    paddingTop: 25,
  },
  totalsTable: {
    width: '38%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 45,
    left: 45,
    right: 45,
  },
  termsBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 18,
  },
});

interface Template5Props {
  invoiceData: InvoiceData;
}

const Template5: React.FC<Template5Props> = ({ invoiceData }) => {
  const companyDetails = typeof invoiceData.company === 'string' 
    ? COMPANY_DETAILS[invoiceData.company] 
    : COMPANY_DETAILS['johnstone'];
  
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const total = subtotal + (invoiceData.freight || 0);

  const logoPath = typeof invoiceData.company === 'string' 
    ? `/logos/${companyDetails.logo}` 
    : `/logos/${COMPANY_DETAILS['johnstone'].logo}`;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={logoPath} style={styles.logo} />
            <Text style={styles.companyInfo}>{companyDetails.address}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text>INVOICE</Text>
            <Text>#{invoiceData.invoiceNumber}</Text>
            <Text>Date: {invoiceData.invoiceDate.toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.addressBlocks}>
          <View style={styles.addressBlock}>
            <Text style={styles.addressTitle}>Bill To</Text>
            <Text>{CUSTOMER_INFO.name}</Text>
            <Text>{CUSTOMER_INFO.address}</Text>
            <Text>Buyer: {companyDetails.fixedAssociate}</Text>
            <Text>Tel: (210) 979-9100</Text>
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.addressTitle}>Ship To</Text>
            <Text>{CUSTOMER_INFO.name}</Text>
            <Text>{CUSTOMER_INFO.address}</Text>
          </View>
        </View>

        <View style={styles.infoTable}>
          <View style={styles.infoCell}>
            <Text style={styles.infoCellHeader}>Customer PO</Text>
            <Text>{invoiceData.customerPO}</Text>
          </View>
          <View style={styles.infoCell}>
            <Text style={styles.infoCellHeader}>Ship Via</Text>
            <Text>{invoiceData.shipVia}</Text>
          </View>
          <View style={styles.infoCell}>
            <Text style={styles.infoCellHeader}>Terms</Text>
            <Text>{invoiceData.paymentTerms}</Text>
          </View>
          <View style={styles.infoCell}>
            <Text style={styles.infoCellHeader}>Salesman</Text>
            <Text>{companyDetails.fixedAssociate}</Text>
          </View>
        </View>

        <View style={styles.itemsTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.productCol}>Product</Text>
            <Text style={styles.descriptionCol}>Description</Text>
            <Text style={styles.umCol}>UM</Text>
            <Text style={styles.quantityCol}>Quant</Text>
            <Text style={styles.priceCol}>Price</Text>
            <Text style={styles.extensionCol}>Extension</Text>
          </View>
          {invoiceData.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.productCol}>{item.description.split(' ')[0]}</Text>
              <Text style={styles.descriptionCol}>{item.description}</Text>
              <Text style={styles.umCol}>EA</Text>
              <Text style={styles.quantityCol}>{item.quantity}</Text>
              <Text style={styles.priceCol}>${item.unitPrice.toFixed(2)}</Text>
              <Text style={styles.extensionCol}>
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsSection}>
          <View style={styles.totalsTable}>
            <View style={styles.totalRow}>
              <Text>Sub Total</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Freight</Text>
              <Text>${invoiceData.freight.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Tax Amount</Text>
              <Text>$0.00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Total</Text>
              <Text>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.termsBox}>
            <Text>TERMS</Text>
            <Text>PLEASE NOTE: ALL RETURNED MERCHANDISE IS SUBJECT TO A RESTOCKING CHARGE. NO RETURNS ON SPECIAL ORDERED OR INSTALLED PRODUCTS. NO GOODS ACCEPTED FOR RETURN AFTER 30 DAYS. RETURN MUST HAVE INVOICE</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template5; 