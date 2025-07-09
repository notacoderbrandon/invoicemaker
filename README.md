# Invoice Generator

A React-based invoice generation application that allows users to create professional invoices with multiple template options.

## Features

- Create invoices with multiple line items
- 5 different professional invoice templates
- Preview invoices before generating PDF
- Download invoices as PDF files
- Support for multiple companies
- Automatic calculation of totals
- Clean and intuitive user interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd invoice-generator
```

2. Install dependencies:
```bash
npm install
```

3. Add company logos:
Place your company logo files in the `public/logos` directory with the following names:
- johnstone.png
- daikin.png
- fissco.png
- winsupply.png
- insco.png

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. Fill in the invoice details:
   - Select the company issuing the invoice
   - Enter invoice number and date
   - Add customer information
   - Add line items with quantities and prices
   - Add optional freight charge

2. Preview the invoice:
   - Click the "Preview" button to see how the invoice looks
   - Select different templates from the dropdown menu
   - Close the preview when satisfied

3. Generate PDF:
   - Click the "Generate PDF" button to download the invoice as a PDF
   - The PDF will be named using the invoice number

## Templates

The application includes 5 different invoice templates:

1. Modern Clean - A clean, modern design with subtle borders and spacing
2. Vertical Accent - Features a vertical accent color and modern typography
3. Minimalist - A minimalist design with focus on typography and whitespace
4. Gradient Accent - Uses gradient colors and modern styling
5. Professional - A traditional professional design with watermark

## Development

The application is built using:
- React with TypeScript
- Material-UI for the user interface
- @react-pdf/renderer for PDF generation

## License

MIT License 