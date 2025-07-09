import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { InvoiceData, COMPANY_DETAILS } from '../../types/invoice';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Times-Roman',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    position: 'relative',
  },
  headerLeft: {
    width: '40%',
  },
  headerCenter: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: '28%',
  },
  invoiceMainTitle: {
    fontSize: 16,
    fontFamily: 'Times-Bold',
    textAlign: 'right',
    marginBottom: 5,
  },
  companyInfo: {
    marginBottom: 10,
    fontSize: 11,
  },
  companyTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 12,
  },
  branchInfo: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  branchLabel: {
    fontFamily: 'Times-Bold',
  },
  logo: {
    width: 160,
    height: 70,
    marginLeft: -25,
  },
  logoText: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
  logoSubText: {
    fontSize: 9,
    textAlign: 'center',
  },
  invoiceBox: {
    border: '1px solid black',
    width: '100%',
  },
  invoiceBoxRow: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
  },
  invoiceBoxCell: {
    paddingVertical: 1,
    paddingHorizontal: 3,
    flex: 1,
    borderRight: '1px solid black',
    fontSize: 8,
    textAlign: 'center',
    fontFamily: 'Times-Bold',
  },
  invoiceBoxCellLast: {
    paddingVertical: 1,
    paddingHorizontal: 3,
    flex: 1,
    fontSize: 8,
    textAlign: 'center',
    fontFamily: 'Times-Bold',
  },
  invoiceValueCell: {
    paddingVertical: 1,
    paddingHorizontal: 3,
    flex: 1,
    borderRight: '1px solid black',
    fontSize: 8,
    textAlign: 'center',
  },
  invoiceValueCellLast: {
    paddingVertical: 1,
    paddingHorizontal: 3,
    flex: 1,
    fontSize: 8,
    textAlign: 'center',
  },
  orderNumberTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    paddingVertical: 1,
    paddingHorizontal: 3,
    width: '100%',
  },
  orderNumberValue: {
    fontSize: 9,
    textAlign: 'center',
    paddingVertical: 1,
    paddingHorizontal: 3,
    width: '100%',
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 15,
  },
  addressBlock: {
    width: '45%',
  },
  addressLabel: {
    marginBottom: 6,
    fontFamily: 'Times-Bold',
    fontSize: 11,
  },
  addressContent: {
    fontSize: 11,
    lineHeight: 1.2,
  },
  orderedBySection: {
    textAlign: 'right',
    marginTop: 10,
    fontSize: 11,
  },
  customerId: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 11,
  },
  customerIdLabel: {
    fontFamily: 'Times-Bold',
    marginRight: 6,
  },
  customerInfo: {
    border: '1px solid black',
    marginBottom: 5,
  },
  customerInfoRow: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
  },
  customerInfoCell: {
    flex: 1,
    borderRight: '1px solid black',
  },
  customerInfoCellLast: {
    flex: 1,
  },
  customerInfoLabel: {
    fontFamily: 'Times-Bold',
    fontSize: 9,
    padding: 4,
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
  },
  customerInfoValue: {
    fontSize: 10,
    padding: 6,
    textAlign: 'center',
    minHeight: 20,
  },
  customerInfo2: {
    border: '1px solid black',
    marginBottom: 15,
  },
  carrierSection: {
    border: '1px solid black',
    borderBottom: 'none',
    marginBottom: 0,
  },
  carrierRow: {
    flexDirection: 'row',
    padding: 6,
    fontSize: 9,
    borderBottom: '1px solid black',
  },
  carrierLabel: {
    fontFamily: 'Times-Bold',
    marginRight: 20,
  },
  trackingLabel: {
    fontFamily: 'Times-Bold',
    marginLeft: 300,
  },
  itemsTable: {
    border: '1px solid black',
    borderTopWidth: 0,
    marginBottom: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid black',
  },
  quantitiesMainHeader: {
    width: '20%',
    borderRight: '1px solid black',
  },
  quantitiesTitle: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    padding: 2,
    borderBottom: '1px solid black',
  },
  quantitiesSubHeaders: {
    flexDirection: 'row',
  },
  quantitySubHeader: {
    flex: 1,
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Times-Bold',
    borderRight: '1px solid black',
  },
  quantitySubHeaderLast: {
    flex: 1,
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Times-Bold',
  },
  uomHeader: {
    width: '5%',
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Times-Bold',
    borderRight: '1px solid black',
    justifyContent: 'center',
  },
  dispHeader: {
    width: '5%',
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Times-Bold',
    borderRight: '1px solid black',
    justifyContent: 'center',
  },
  itemIdHeader: {
    width: '10%',
    padding: 2,
    textAlign: 'center',
    fontSize: 9,
    fontFamily: 'Times-Bold',
    borderRight: '1px solid black',
    justifyContent: 'center',
  },
  descriptionHeader: {
    width: '35%',
    padding: 2,
    textAlign: 'center',
    fontSize: 9,
    fontFamily: 'Times-Bold',
    borderRight: '1px solid black',
    justifyContent: 'center',
  },
  pricingHeader: {
    width: '25%',
  },
  pricingTitle: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    padding: 2,
    borderBottom: '1px solid black',
  },
  pricingSubHeaders: {
    flexDirection: 'row',
  },
  unitSizeHeader: {
    flex: 1,
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Times-Bold',
    borderRight: '1px solid black',
  },
  unitPriceHeader: {
    flex: 1,
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Times-Bold',
    borderRight: '1px solid black',
  },
  extPriceHeader: {
    flex: 1,
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Times-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
    minHeight: 18,
  },
  quantityCell: {
    width: '6.666%',
    padding: 2,
    textAlign: 'center',
    fontSize: 9,
    borderRight: '1px solid black',
  },
  uomCell: {
    width: '5%',
    padding: 2,
    textAlign: 'center',
    fontSize: 9,
    borderRight: '1px solid black',
  },
  dispCell: {
    width: '5%',
    padding: 2,
    textAlign: 'center',
    fontSize: 9,
    borderRight: '1px solid black',
  },
  itemIdCell: {
    width: '10%',
    padding: 2,
    fontSize: 9,
    borderRight: '1px solid black',
  },
  descriptionCell: {
    width: '35%',
    padding: 2,
    fontSize: 9,
    borderRight: '1px solid black',
  },
  unitSizeCell: {
    width: '8.333%',
    padding: 2,
    textAlign: 'center',
    fontSize: 9,
    borderRight: '1px solid black',
  },
  unitPriceCell: {
    width: '8.333%',
    padding: 2,
    textAlign: 'right',
    fontSize: 9,
    borderRight: '1px solid black',
  },
  extPriceCell: {
    width: '8.334%',
    padding: 2,
    textAlign: 'right',
    fontSize: 9,
  },
  shipmentAccepted: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
    marginTop: 8,
    marginBottom: 20,
  },
  totalsSection: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2,
    fontSize: 10,
  },
  totalLabel: {
    width: 100,
    textAlign: 'right',
    marginRight: 10,
    fontFamily: 'Times-Bold',
  },
  totalValue: {
    width: 70,
    textAlign: 'right',
  },
  totalLines: {
    fontSize: 9,
    textAlign: 'left',
    marginTop: 10,
  },
  specialLine: {
    fontSize: 9,
    padding: 4,
    borderBottom: '1px solid black',
    backgroundColor: '#f0f0f0',
  },
});

const Template4: React.FC<{ invoiceData: InvoiceData }> = ({ invoiceData }) => {
  const companyDetails = typeof invoiceData.company === 'string'
    ? COMPANY_DETAILS[invoiceData.company]
    : COMPANY_DETAILS['insco'];

  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const salesTax = 0.00;
  const merchandiseCredit = subtotal;
  const amountDue = 0.00;

  // Calculate pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(invoiceData.items.length / itemsPerPage);
  
  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, invoiceData.items.length);
    const pageItems = invoiceData.items.slice(startIndex, endIndex);
    const isLastPage = pageNumber === totalPages;

    return (
      <Page size="LETTER" style={styles.page} key={pageNumber}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyTitle}>INSCO DISTRIBUTING {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}</Text>
              <View style={styles.branchInfo}>
                <Text style={styles.branchLabel}>Branch:</Text>
                <Text> {companyDetails.branch}     {companyDetails.branchName}</Text>
              </View>
              <Text>P.O. Box 690610</Text>
              <Text>San Antonio, TX 78269</Text>
              <Text>US</Text>
              <Text></Text>
              <Text>210-690-8400</Text>
            </View>
          </View>
          
          <View style={styles.headerCenter}>
            <Image src={`${process.env.PUBLIC_URL}/logos/insco.png`} style={styles.logo} />
            <Text style={styles.logoText}>Visit shop.insco.com</Text>
            <Text style={styles.logoSubText}>to manage your account & orders</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.invoiceMainTitle}>INVOICE</Text>
            <View style={styles.invoiceBox}>
              <View style={styles.invoiceBoxRow}>
                <Text style={styles.invoiceBoxCell}>Invoice Date</Text>
                <Text style={styles.invoiceBoxCellLast}>Page</Text>
              </View>
              <View style={styles.invoiceBoxRow}>
                <Text style={styles.invoiceValueCell}>{invoiceData.invoiceDate.toLocaleDateString()}</Text>
                <Text style={styles.invoiceValueCellLast}>{pageNumber} of {totalPages}</Text>
              </View>
              <View style={styles.invoiceBoxRow}>
                <Text style={styles.orderNumberTitle}>INVOICE NUMBER</Text>
              </View>
              <View style={styles.invoiceBoxRow}>
                <Text style={styles.orderNumberValue}>{invoiceData.invoiceNumber || '100318448'}</Text>
              </View>
              <View style={styles.invoiceBoxRow}>
                <Text style={styles.orderNumberTitle}>ORDER NUMBER</Text>
              </View>
              <View style={[styles.invoiceBoxRow, { borderBottom: 'none' }]}>
                <Text style={styles.orderNumberValue}>{'10462533'}</Text>
              </View>
            </View>
          </View>
        </View>

        {pageNumber === 1 && (
          <>
            <View style={styles.addressSection}>
              <View style={styles.addressBlock}>
                <Text style={styles.addressLabel}>Bill To:</Text>
                <View style={styles.addressContent}>
                  <Text>PREMIER COMFORT</Text>
                  <Text>212 W RHAPSODY DR</Text>
                  <Text>SAN ANTONIO, TX 78216</Text>
                  <Text>US</Text>
                </View>
              </View>
              <View style={styles.addressBlock}>
                <Text style={styles.addressLabel}>Ship To:</Text>
                <View style={styles.addressContent}>
                  <Text>PREMIER COMFORT</Text>
                  <Text>212 W RHAPSODY DR</Text>
                  <Text>SAN ANTONIO, TX 78216</Text>
                  <Text>US</Text>
                </View>
                <View style={styles.orderedBySection}>
                  <Text>Ordered By: Mr. DURAN RAMOS</Text>
                </View>
              </View>
            </View>

            <View style={styles.customerId}>
              <Text style={styles.customerIdLabel}>Customer ID:</Text>
              <Text>10032656</Text>
            </View>

            {/* First Customer Info Table */}
            <View style={styles.customerInfo}>
              <View style={styles.customerInfoRow}>
                <View style={styles.customerInfoCell}>
                  <Text style={styles.customerInfoLabel}>PO Number</Text>
                  <Text style={styles.customerInfoValue}>warranty-2025-04-15 14:06:15</Text>
                </View>
                <View style={styles.customerInfoCell}>
                  <Text style={styles.customerInfoLabel}>Term Description</Text>
                  <Text style={styles.customerInfoValue}>CASH</Text>
                </View>
                <View style={styles.customerInfoCell}>
                  <Text style={styles.customerInfoLabel}>Net Due Date</Text>
                  <Text style={styles.customerInfoValue}>04/15/2025</Text>
                </View>
                <View style={styles.customerInfoCell}>
                  <Text style={styles.customerInfoLabel}>Disc Due Date</Text>
                  <Text style={styles.customerInfoValue}>04/15/2025</Text>
                </View>
                <View style={styles.customerInfoCellLast}>
                  <Text style={styles.customerInfoLabel}>Discount Amount</Text>
                  <Text style={styles.customerInfoValue}>0.00</Text>
                </View>
              </View>
            </View>

            {/* Second Customer Info Table */}
            <View style={styles.customerInfo2}>
              <View style={styles.customerInfoRow}>
                <View style={styles.customerInfoCell}>
                  <Text style={styles.customerInfoLabel}>Order Date</Text>
                  <Text style={styles.customerInfoValue}>04/15/2025 14:04:47</Text>
                </View>
                <View style={styles.customerInfoCell}>
                  <Text style={styles.customerInfoLabel}>Pick Ticket No</Text>
                  <Text style={styles.customerInfoValue}>9729622</Text>
                </View>
                <View style={styles.customerInfoCell}>
                  <Text style={styles.customerInfoLabel}>Primary Salesrep Name</Text>
                  <Text style={styles.customerInfoValue}>Brandon Creswell</Text>
                </View>
                <View style={styles.customerInfoCellLast}>
                  <Text style={styles.customerInfoLabel}>Taker</Text>
                  <Text style={styles.customerInfoValue}>RON.BAZAN</Text>
                </View>
              </View>
            </View>

            {/* Carrier Section */}
            <View style={styles.carrierSection}>
              <View style={styles.carrierRow}>
                <Text style={styles.carrierLabel}>Carrier:</Text>
                <Text style={styles.trackingLabel}>Tracking #:</Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.itemsTable}>
          <View style={styles.tableHeader}>
            <View style={styles.quantitiesMainHeader}>
              <Text style={styles.quantitiesTitle}>Quantities</Text>
              <View style={styles.quantitiesSubHeaders}>
                <Text style={styles.quantitySubHeader}>Ordered</Text>
                <Text style={styles.quantitySubHeader}>Shipped</Text>
                <Text style={styles.quantitySubHeaderLast}>Rem</Text>
              </View>
            </View>
            <View style={styles.uomHeader}>
              <Text>UOM</Text>
            </View>
            <View style={styles.dispHeader}>
              <Text>Disp</Text>
            </View>
            <View style={styles.itemIdHeader}>
              <Text>Item ID</Text>
            </View>
            <View style={styles.descriptionHeader}>
              <Text>Description</Text>
            </View>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingTitle}>Pricing</Text>
              <View style={styles.pricingSubHeaders}>
                <Text style={styles.unitSizeHeader}>Unit Size</Text>
                <Text style={styles.unitPriceHeader}>Unit Price</Text>
                <Text style={styles.extPriceHeader}>Ext. Price</Text>
              </View>
            </View>
          </View>

          {pageItems.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.quantityCell}>{item.quantity}</Text>
              <Text style={styles.quantityCell}>{item.quantity}</Text>
              <Text style={styles.quantityCell}>0</Text>
              <Text style={styles.uomCell}>EA</Text>
              <Text style={styles.dispCell}>C</Text>
              <Text style={styles.itemIdCell}>{item.itemId || '5446090'}</Text>
              <Text style={styles.descriptionCell}>
                {item.description}
                {item.description === 'GOBI II 120/240V CONDENSATE PUMP' && (
                  <Text>{'\n'}GOBI II CONDENSATE PUMP FOR{'\n'}MITSUBISHI MINI SPLITS - DUAL{'\n'}VOLTAGE (120/240V) AUTO SENSING, USE{'\n'}1/4" ID TUBING</Text>
                )}
              </Text>
              <Text style={styles.unitSizeCell}>1.0000</Text>
              <Text style={styles.unitPriceCell}>{item.unitPrice.toFixed(2)}</Text>
              <Text style={styles.extPriceCell}>{(item.quantity * item.unitPrice).toFixed(2)}</Text>
            </View>
          ))}

          {/* Add special PDF lines on last page */}
          {isLastPage && (
            <>
              <View style={styles.tableRow}>
                <Text style={styles.quantityCell}>0</Text>
                <Text style={styles.quantityCell}>0</Text>
                <Text style={styles.quantityCell}>0</Text>
                <Text style={styles.uomCell}>EA</Text>
                <Text style={styles.dispCell}>N</Text>
                <Text style={styles.itemIdCell}>OCI-FREIGHT</Text>
                <Text style={styles.descriptionCell}>FREIGHT</Text>
                <Text style={styles.unitSizeCell}>1.0000</Text>
                <Text style={styles.unitPriceCell}>0.00</Text>
                <Text style={styles.extPriceCell}>0.00</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.quantityCell}>0</Text>
                <Text style={styles.quantityCell}>0</Text>
                <Text style={styles.quantityCell}>0</Text>
                <Text style={styles.uomCell}>EA</Text>
                <Text style={styles.dispCell}>N</Text>
                <Text style={styles.itemIdCell}>Visa</Text>
                <Text style={styles.descriptionCell}>PAYMENT METHOD: Visa ****1234</Text>
                <Text style={styles.unitSizeCell}>1.0000</Text>
                <Text style={styles.unitPriceCell}>0.00</Text>
                <Text style={styles.extPriceCell}>0.00</Text>
              </View>
            </>
          )}
        </View>

        {isLastPage && (
          <>
            <Text style={styles.shipmentAccepted}>Shipment Accepted By: DURAN RAMOS</Text>

            <View style={styles.totalsSection}>
              <View style={styles.totalLine}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>{subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalLine}>
                <Text style={styles.totalLabel}>Sales Tax</Text>
                <Text style={styles.totalValue}>{salesTax.toFixed(2)}</Text>
              </View>
              <View style={styles.totalLine}>
                <Text style={styles.totalLabel}>Merchandise Credit</Text>
                <Text style={styles.totalValue}>{merchandiseCredit.toFixed(2)}</Text>
              </View>
              <View style={styles.totalLine}>
                <Text style={[styles.totalLabel, { fontFamily: 'Times-Bold' }]}>Invoice Total</Text>
                <Text style={[styles.totalValue, { fontFamily: 'Times-Bold' }]}>{amountDue.toFixed(2)}</Text>
              </View>
            </View>

            <Text style={styles.totalLines}>Total Lines: {invoiceData.items.length}</Text>
          </>
        )}
      </Page>
    );
  };

  return (
    <Document>
      {Array.from({ length: totalPages }, (_, i) => renderPage(i + 1))}
    </Document>
  );
};

export default Template4; 