export interface Company {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  logo: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  itemId?: string;
  productNumber: string;
}

export interface CompanyDetails {
  name: string;
  address: string;
  phone: string;
  logo: string;
  fixedAssociate: string;
  template: number;
  branch?: string;
  branchName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  style: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

export interface InvoiceData {
  company: string | Company;
  invoiceNumber: string;
  invoiceDate: Date;
  customerPO: string;
  customerId: string;
  terms: string;
  dueDate: Date;
  discountDate: Date;
  discountAmount: number;
  items: InvoiceItem[];
  paymentTerms: string;
  notes: string;
  subtotal: number;
  tax: number;
  total: number;
  shipping: number;
  freight: number;
  shipVia: string;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export const COMPANY_DETAILS: Record<string, CompanyDetails> = {
  fissco: {
    name: 'Fissco Supply',
    address: '6814 Alamo Downs Pkwy\nSan Antonio, TX 78238\nPhone: (210) 933-8874',
    phone: '(210) 933-8874',
    logo: 'fissco.png',
    fixedAssociate: '892',
    template: 3,
    style: {
      primaryColor: '#006633',
      secondaryColor: '#e6ffe6',
      fontFamily: 'Arial'
    }
  },
  johnstone: {
    name: 'Johnstone Supply',
    address: 'PO Box 23716\nHarahan, LA 70183-0716\nPhone: (210) 829-1934\nFax: (866) 685-6690\njhcarib@johnstonesupply.com',
    phone: '(210) 829-1934',
    logo: 'johnstone.png',
    fixedAssociate: '571',
    template: 1,
    style: {
      primaryColor: '#000000',
      secondaryColor: '#f0f0f0',
      fontFamily: 'Courier'
    }
  },
  daikin: {
    name: 'Daikin Technologies',
    address: '19001 Kermier Road\nWaller, TX 77484\nPhone: (713) 861-2500',
    phone: '(713) 861-2500',
    logo: 'daikin.png',
    fixedAssociate: '2640',
    template: 2,
    style: {
      primaryColor: '#0066cc',
      secondaryColor: '#e6f3ff',
      fontFamily: 'Helvetica'
    }
  },
  winsupply: {
    name: 'Win Supply',
    address: '4200 Pan American Expressway\nSan Antonio, TX 78218\nPhone: (210) 200-8851',
    phone: '(210) 200-8851',
    logo: 'winsupply.png',
    fixedAssociate: '11657',
    template: 5,
    style: {
      primaryColor: '#990000',
      secondaryColor: '#ffe6e6',
      fontFamily: 'Times New Roman'
    }
  },
  insco: {
    name: 'Insco',
    address: 'P.O. Box 690610',
    city: 'San Antonio',
    state: 'TX',
    zip: '78269',
    country: 'US',
    phone: '210-690-8400',
    logo: 'insco.png',
    fixedAssociate: '11657',
    branch: '01005',
    branchName: 'San Antonio Freedom',
    template: 4,
    style: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      fontFamily: 'Helvetica'
    }
  },
  texasairsystems: {
    name: 'Texas AirSystems',
    address: '8081 Royal Ridge Pkwy\nIrving, TX 75063\nPhone: (972) 570-4700\nFax: (972) 570-4207',
    phone: '(972) 570-4700',
    logo: 'texasairsystems.png',
    fixedAssociate: '001',
    template: 6,
    style: {
      primaryColor: '#0047AB',
      secondaryColor: '#e6f0ff',
      fontFamily: 'Helvetica'
    }
  }
};

export const COMPANIES = Object.keys(COMPANY_DETAILS);

export const CUSTOMER_INFO: CustomerInfo = {
  name: 'PREMIER COMFORT',
  address: '5415 PAWTUCKET DR',
  city: 'SAN ANTONIO',
  state: 'TX',
  zip: '78230',
  country: 'US',
  phone: '(210) 979-9100'
}; 