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

// Register fonts
Font.register({
  family: 'Courier',
  src: 'https://fonts.cdnfonts.com/s/59275/CourierPrime-Regular.woff'
});

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Courier',
    fontSize: 8,
    backgroundColor: 'white',
    lineHeight: 1.1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  logoSection: {
    width: '25%',
  },
  logo: {
    width: 140,
    height: 28,
    objectFit: 'contain',
  },
  barcodeSection: {
    width: '40%',
    alignItems: 'center',
  },
  barcode: {
    width: 150,
    height: 25,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Courier',
    letterSpacing: 1,
    marginBottom: 2,
  },
  barcodeNumber: {
    fontSize: 7,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rightHeaderSection: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  creditMemoBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    backgroundColor: '#f5f5f5',
    marginRight: 4,
    width: 80,
    height: 50,
  },
  paymentTypeBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    backgroundColor: '#f5f5f5',
    marginRight: 4,
    width: 70,
    height: 50,
  },
  chargeBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    backgroundColor: '#f5f5f5',
    width: 50,
    height: 50,
  },
  pageBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 3,
    backgroundColor: '#f5f5f5',
    width: 50,
    height: 25,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  boxText: {
    fontSize: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boxLabel: {
    fontSize: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 1,
  },
  companySection: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingHorizontal: 20,
  },
  companyBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 1,
    height: 75,
  },
  companyBoxLast: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    height: 75,
  },
  companyTitle: {
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#e8e8e8',
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  companyContent: {
    padding: 4,
    fontSize: 5,
    lineHeight: 1.2,
  },
  specialInstructions: {
    position: 'absolute',
    top: 140,
    right: 20,
    width: 150,
    height: 60,
    borderWidth: 1,
    borderColor: '#000',
  },
  specialTitle: {
    fontSize: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#e8e8e8',
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  handwrittenArea: {
    flex: 1,
    fontSize: 10,
    color: '#ff0000',
    textAlign: 'center',
    paddingTop: 8,
    fontWeight: 'bold',
  },
  customerTable: {
    marginHorizontal: 20,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#000',
  },
  customerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  customerRowLast: {
    flexDirection: 'row',
  },
  customerCell: {
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: '#000',
    fontSize: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#e8e8e8',
    minHeight: 14,
  },
  customerCellLast: {
    padding: 3,
    fontSize: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#e8e8e8',
    minHeight: 14,
  },
  customerDataCell: {
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: '#000',
    fontSize: 6,
    textAlign: 'center',
    backgroundColor: '#ffffff',
    minHeight: 14,
  },
  customerDataCellLast: {
    padding: 3,
    fontSize: 6,
    textAlign: 'center',
    backgroundColor: '#ffffff',
    minHeight: 14,
  },
  itemsTable: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  itemsHeader: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  itemsHeaderCell: {
    padding: 3,
    fontSize: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    minHeight: 20,
  },
  itemsHeaderCellLast: {
    padding: 3,
    fontSize: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    minHeight: 20,
  },
  itemRow: {
    flexDirection: 'row',
    minHeight: 30,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  itemRowLast: {
    flexDirection: 'row',
    minHeight: 30,
    backgroundColor: '#ffffff',
  },
  itemCell: {
    padding: 2,
    fontSize: 6,
    borderRightWidth: 1,
    borderRightColor: '#000',
    justifyContent: 'flex-start',
  },
  itemCellLast: {
    padding: 2,
    fontSize: 6,
    justifyContent: 'flex-start',
  },
  itemCellCenter: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCellRight: {
    textAlign: 'right',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  productDescription: {
    fontSize: 6,
    lineHeight: 1.1,
  },
  reasonText: {
    fontSize: 5,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
  },
  thankYouSection: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  thankYouText: {
    fontSize: 6,
    textAlign: 'center',
    lineHeight: 1.3,
  },
  bottomFooter: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  footerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  footerRowLast: {
    flexDirection: 'row',
  },
  footerCell: {
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: '#000',
    fontSize: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#e8e8e8',
    minHeight: 18,
    flex: 1,
  },
  footerCellLast: {
    padding: 3,
    fontSize: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#e8e8e8',
    minHeight: 18,
    width: 60,
  },
  footerDataCell: {
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: '#000',
    fontSize: 6,
    backgroundColor: '#ffffff',
    minHeight: 18,
    flex: 1,
  },
  footerDataCellLast: {
    padding: 3,
    fontSize: 6,
    backgroundColor: '#ffffff',
    minHeight: 18,
    width: 60,
  },
  receivedBySection: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 250,
  },
  dateReceivedSection: {
    position: 'absolute',
    bottom: 20,
    right: 180,
    width: 100,
  },
  totalDueSection: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 120,
    height: 40,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receivedLabel: {
    fontSize: 5,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  receivedBox: {
    borderWidth: 1,
    borderColor: '#000',
    height: 20,
    backgroundColor: '#ffffff',
  },
  totalDueText: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalDueAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 5,
    left: 20,
    fontSize: 4,
  },
  amountSection: {
    position: 'absolute',
    bottom: 62,
    right: 180,
    width: 80,
    borderLeftWidth: 1,
    borderLeftColor: '#000',
    padding: 2,
  },
  amountText: {
    fontSize: 5,
    textAlign: 'right',
    marginBottom: 1,
  },
});

interface Template2Props {
  invoiceData: InvoiceData;
}

const Template2: React.FC<Template2Props> = ({ invoiceData }) => {
  const companyDetails = typeof invoiceData.company === 'string' 
    ? COMPANY_DETAILS[invoiceData.company] 
    : COMPANY_DETAILS['daikin'];
  
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const tax = 0.00;
  const freight = 0.00;
  const total = subtotal + tax + freight;

  const logoPath = typeof invoiceData.company === 'string' 
    ? `/logos/${companyDetails.logo}` 
    : `/logos/${COMPANY_DETAILS['daikin'].logo}`;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Top Header Section */}
        <View style={styles.topHeader}>
          <View style={styles.logoSection}>
            <Image src={logoPath} style={styles.logo} />
          </View>
          
          <View style={styles.barcodeSection}>
            <Text style={styles.barcode}>||||||||||||||||||||||||||||||||||||</Text>
            <Text style={styles.barcodeNumber}>GT04161</Text>
          </View>
          
          <View style={styles.rightHeaderSection}>
            <View style={styles.creditMemoBox}>
              <Text style={styles.boxLabel}>CREDIT MEMO</Text>
              <Text style={styles.boxLabel}>PICK TICKET</Text>
            </View>
            
            <View style={styles.paymentTypeBox}>
              <Text style={styles.boxLabel}>PAYMENT TYPE</Text>
              <Text style={styles.boxLabel}>DOCUMENT NO.</Text>
              <Text style={styles.boxLabel}>PAYMENT DATE</Text>
              <Text style={styles.boxLabel}>CUSTOMER NO.</Text>
              <Text style={styles.boxLabel}>WAREHOUSE</Text>
            </View>
            
            <View style={styles.chargeBox}>
              <Text style={styles.boxText}>CHARGE</Text>
              <Text style={styles.boxText}>GT04161</Text>
              <Text style={styles.boxText}>4/01/25</Text>
              <Text style={styles.boxText}>174034</Text>
              <Text style={styles.boxText}>364</Text>
            </View>
          </View>
        </View>

        {/* Page Number Box */}
        <View style={styles.pageBox}>
          <Text style={styles.boxLabel}>PAGE NO.</Text>
          <Text style={styles.boxText}>1</Text>
        </View>

        {/* Company Information Boxes */}
        <View style={styles.companySection}>
          <View style={styles.companyBox}>
            <Text style={styles.companyTitle}>REMIT TO</Text>
            <Text style={styles.companyContent}>
              Daikin Comfort Technologies Distribution, Inc.{'\n'}
              P. O. Box 660503{'\n'}
              Dallas, TX  75266-0503
            </Text>
          </View>
          
          <View style={styles.companyBox}>
            <Text style={styles.companyTitle}>WAREHOUSE</Text>
            <Text style={styles.companyContent}>
              NE SAN ANTONIO #364{'\n'}
              DAIKIN COMFORT TECHNOLOGY #364{'\n'}
              4980 EISENHAUER RD, SUITE 206{'\n'}
              SAN ANTONIO, TX  78218{'\n'}
              {'\n'}
              P:210-946-3300 F:210-946-3315
            </Text>
          </View>
          
          <View style={styles.companyBox}>
            <Text style={styles.companyTitle}>SOLD TO</Text>
            <Text style={styles.companyContent}>
              PREMIER COMFORT SERVICE COMP{'\n'}
              212 W RHAPSODY DR{'\n'}
              Phone #210-870-4643{'\n'}
              SAN ANTONIO, TX  78216
            </Text>
          </View>
          
          <View style={styles.companyBoxLast}>
            <Text style={styles.companyTitle}>SHIP TO</Text>
            <Text style={styles.companyContent}>
              PREMIER COMFORT SERVICE COMP{'\n'}
              DAIKIN COMFORT TECHNOLOGY #364{'\n'}
              4980 EISENHAUER RD, SUITE 206{'\n'}
              P:210-946-3300 F:210-946-3315{'\n'}
              SAN ANTONIO, TX
            </Text>
          </View>
        </View>

        {/* Special Instructions */}
        <View style={styles.specialInstructions}>
          <Text style={styles.specialTitle}>SPECIAL INSTRUCTIONS</Text>
          <Text style={styles.handwrittenArea}># 160005{'\n'}$ 34.41</Text>
        </View>

        {/* Customer Information Table */}
        <View style={styles.customerTable}>
          <View style={styles.customerRow}>
            <Text style={[styles.customerCell, { width: '15%' }]}>CUSTOMER P.O. NUMBER</Text>
            <Text style={[styles.customerCell, { width: '15%' }]}>JOB NAME</Text>
            <Text style={[styles.customerCell, { width: '8%' }]}>JOB NO.</Text>
            <Text style={[styles.customerCell, { width: '6%' }]}>SLS</Text>
            <Text style={[styles.customerCell, { width: '12%' }]}>SALES ORDER DATE</Text>
            <Text style={[styles.customerCell, { width: '15%' }]}>SHIPPING METHOD</Text>
            <Text style={[styles.customerCellLast, { width: '29%' }]}>FT. Payment</Text>
          </View>
          
          <View style={styles.customerRowLast}>
            <Text style={[styles.customerDataCell, { width: '15%' }]}>16525</Text>
            <Text style={[styles.customerDataCell, { width: '15%' }]}></Text>
            <Text style={[styles.customerDataCell, { width: '8%' }]}>201</Text>
            <Text style={[styles.customerDataCell, { width: '6%' }]}>ZMJ</Text>
            <Text style={[styles.customerDataCell, { width: '12%' }]}>4/01/25</Text>
            <Text style={[styles.customerDataCell, { width: '15%' }]}>PICKUP</Text>
            <Text style={[styles.customerDataCellLast, { width: '29%' }]}></Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.itemsTable}>
          <View style={styles.itemsHeader}>
            <Text style={[styles.itemsHeaderCell, { width: '6%' }]}>LINE/{'\n'}LOCATION</Text>
            <Text style={[styles.itemsHeaderCell, { width: '35%' }]}>PRODUCT NO./DESCRIPTION</Text>
            <Text style={[styles.itemsHeaderCell, { width: '6%' }]}>U/M</Text>
            <Text style={[styles.itemsHeaderCell, { width: '8%' }]}>ORDERED</Text>
            <Text style={[styles.itemsHeaderCell, { width: '8%' }]}>SHIPPED</Text>
            <Text style={[styles.itemsHeaderCell, { width: '6%' }]}>B/O</Text>
            <Text style={[styles.itemsHeaderCell, { width: '10%' }]}>UNIT PRICE</Text>
            <Text style={[styles.itemsHeaderCell, { width: '8%' }]}>DISCOUNT</Text>
            <Text style={[styles.itemsHeaderCellLast, { width: '13%' }]}>EXTENDED AMOUNT</Text>
          </View>
          
          {/* Item 1 */}
          <View style={styles.itemRow}>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '6%' }]}>
              <Text>001</Text>
            </View>
            <View style={[styles.itemCell, { width: '35%' }]}>
              <Text style={styles.productDescription}>AMST48DU1400    AIR HANDLER</Text>
              <Text style={styles.reasonText}>REASON: RETURN TO STOCK - GOOD</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '6%' }]}>
              <Text>EA</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '8%' }]}>
              <Text>1-</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '8%' }]}>
              <Text>1-</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '6%' }]}>
              <Text>0</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellRight, { width: '10%' }]}>
              <Text>1108.8000</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '8%' }]}>
              <Text></Text>
            </View>
            <View style={[styles.itemCellLast, styles.itemCellRight, { width: '13%' }]}>
              <Text>1108.80-</Text>
            </View>
          </View>
          
          {/* Item 2 */}
          <View style={styles.itemRow}>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '6%' }]}>
              <Text>002</Text>
            </View>
            <View style={[styles.itemCell, { width: '35%' }]}>
              <Text style={styles.productDescription}>AMST48CU1300    AIR HANDLER R32</Text>
              <Text style={styles.reasonText}>REASON: RETURN TO STOCK - GOOD</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '6%' }]}>
              <Text>EA</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '8%' }]}>
              <Text>1</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '8%' }]}>
              <Text>1</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '6%' }]}>
              <Text>0</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellRight, { width: '10%' }]}>
              <Text>1071.0000</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '8%' }]}>
              <Text></Text>
            </View>
            <View style={[styles.itemCellLast, styles.itemCellRight, { width: '13%' }]}>
              <Text>1071.00</Text>
            </View>
          </View>
          
          {/* Item 3 */}
          <View style={styles.itemRowLast}>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '6%' }]}>
              <Text>003</Text>
            </View>
            <View style={[styles.itemCell, { width: '35%' }]}>
              <Text style={styles.productDescription}>CCP-8-2020-1    CC M8 PLEAT FILTER 20X20X1</Text>
              <Text style={styles.productDescription}>W01 R15 B01 / W02 R03 B01</Text>
              <Text style={styles.reasonText}>REASON: RETURN TO STOCK - GOOD</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '6%' }]}>
              <Text>EA</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '8%' }]}>
              <Text>1</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '8%' }]}>
              <Text>1</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '6%' }]}>
              <Text>0</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellRight, { width: '10%' }]}>
              <Text>3.3900</Text>
            </View>
            <View style={[styles.itemCell, styles.itemCellCenter, { width: '8%' }]}>
              <Text></Text>
            </View>
            <View style={[styles.itemCellLast, styles.itemCellRight, { width: '13%' }]}>
              <Text>3.39</Text>
            </View>
          </View>
        </View>

        {/* Thank You Message */}
        <View style={styles.thankYouSection}>
          <Text style={styles.thankYouText}>
            THANK YOU FOR BEING A VALUED DAIKIN COMFORT PRO D{'\n'}
            NEW NATIONAL AND REGIONAL EFFICIENCY STANDARDS BEGAN ON 1/1/15. VISIT WWW.GOODMANMFG.COM/STANDARDS FOR INFO.
          </Text>
        </View>

        {/* Bottom Footer Table */}
        <View style={styles.bottomFooter}>
          <View style={styles.footerRow}>
            <Text style={styles.footerCell}>NO. CTNS</Text>
            <Text style={styles.footerCell}>WEIGHT</Text>
            <Text style={styles.footerCell}>SHIPPED VIA</Text>
            <Text style={styles.footerCell}>SHIP DATE</Text>
            <Text style={styles.footerCell}>PICKED BY</Text>
            <Text style={styles.footerCell}>FILLED BY</Text>
            <Text style={styles.footerCell}>PACKED BY</Text>
            <Text style={styles.footerCell}>CHECKED BY</Text>
            <Text style={styles.footerCellLast}>AMOUNT</Text>
          </View>
          <View style={styles.footerRowLast}>
            <Text style={styles.footerDataCell}></Text>
            <Text style={styles.footerDataCell}></Text>
            <Text style={styles.footerDataCell}></Text>
            <Text style={styles.footerDataCell}></Text>
            <Text style={styles.footerDataCell}></Text>
            <Text style={styles.footerDataCell}></Text>
            <Text style={styles.footerDataCell}></Text>
            <Text style={styles.footerDataCell}></Text>
            <Text style={styles.footerDataCellLast}>34.41-{'\n'}TAX AMT    %{'\n'}.00{'\n'}FREIGHT    .00</Text>
          </View>
        </View>

        {/* Amount Section in Footer */}
        <View style={styles.amountSection}>
          <Text style={styles.amountText}>34.41-</Text>
          <Text style={styles.amountText}>TAX AMT    %</Text>
          <Text style={styles.amountText}>.00</Text>
          <Text style={styles.amountText}>FREIGHT    .00</Text>
        </View>

        {/* Received By Section */}
        <View style={styles.receivedBySection}>
          <Text style={styles.receivedLabel}>RECEIVED BY</Text>
          <View style={styles.receivedBox}></View>
        </View>

        {/* Date Received Section */}
        <View style={styles.dateReceivedSection}>
          <Text style={styles.receivedLabel}>DATE RECEIVED</Text>
          <View style={styles.receivedBox}></View>
        </View>

        {/* Total Due Section */}
        <View style={styles.totalDueSection}>
          <Text style={styles.totalDueText}>TOTAL DUE</Text>
          <Text style={styles.totalDueAmount}>34.41-</Text>
        </View>

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <Text>CTMCMD        Rev. 04/01/25  12:10        END OF ORDER</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Template2; 