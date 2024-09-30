
const generatepdf = async (orderData) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage(); // Create a new page
    const pdfContent = `
        <html>
            <head>
                <title>Order Summary</title>
            </head>
            <body>
                <h1>Order Summary</h1>
                <p>Date: ${orderData.od_date}</p>
                <p>Total: ${orderData.od_sumdetail}</p>
                <p>Payment Type: ${orderData.od_paytype}</p>
                <p>Change: ${orderData.od_change}</p>
            </body>
        </html>
    `;
    await page.setContent(pdfContent); // Use pdfContent here instead of htmlContent
    await page.pdf({
        path: 'document.pdf',
        format: 'A4',
        printBackground: true
    });

    await browser.close(); // Close the browser
};



module.exports = generatepdf; // Export the function
