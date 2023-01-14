const invoiceData = JSON.parse(localStorage.getItem("eCalebInvoiceSolution2"))

// getting elements
// company info
let companyName = document.getElementById("company-name")
let merchantName = document.getElementById("merchant-name")
let companyAddress = document.getElementById("company-address")
let companyState = document.getElementById("company-state")
let companyCountry = document.getElementById("company-country")

let invoiceText = document.getElementById("invoice-text")

// client info
let billingHeaderLabel = document.getElementById("billing-header-label")
let clientCompany = document.getElementById("client-company")
let clientAddress = document.getElementById("client-address")
let clientState = document.getElementById("client-state")
let clientCountry = document.getElementById("client-country")

// invoicing detail
let invoiceIdLabel = document.getElementById("invoice-ID-label")
let invoiceIdValue = document.getElementById("invoice-ID-value")

let invoiceDateLabel = document.getElementById("invoice-date-label")
let invoiceDatevalue = document.getElementById("invoice-date-value")

let invoiceDueDateLabel = document.getElementById("invoice-due-date-label")
let invoiceDueDateValue = document.getElementById("invoice-due-date-value")

// totals
let subTotalHeader = document.getElementById("subtotal-header")
let subTotalValue = document.getElementById("subtotal-value")

let salesTaxHeader = document.getElementById("salestax-header")
let salesTaxValue = document.getElementById("salestax-value")

let totalHeader = document.getElementById("total-header")
let totalValue = document.getElementById("total-value")

// notes and T&C
let noteHeader = document.getElementById("note-header")
let noteBody = document.getElementById("note-body")

let tcHeader = document.getElementById("tc-header")
let tcBody = document.getElementById("tc-body")

const [companyData, invoiceTextData, clientData, invoicingData, tableData, totals, noteAndTC] = invoiceData


// assigning value to variables
companyName.textContent = companyData[0]
merchantName.textContent = companyData[1]
companyAddress.textContent = companyData[2]
companyState.textContent = companyData[3]
companyCountry.textContent = companyData[4]

invoiceText.textContent = invoiceTextData

billingHeaderLabel.textContent = clientData[0]
clientCompany.textContent = clientData[1]
clientAddress.textContent = clientData[2]
clientState.textContent = clientData[3]
clientCountry.textContent = clientData[4]

// invoicing
invoiceIdLabel.textContent = invoicingData[0][0]
invoiceIdValue.textContent = invoicingData[0][1]

invoiceDateLabel.textContent = invoicingData[1][0]
invoiceDatevalue.textContent = invoicingData[1][1]

invoiceDueDateLabel.textContent = invoicingData[2][0]
invoiceDueDateValue.textContent = invoicingData[2][1]

//--- table
// invoice table
const invoiceTable = document.getElementById("invoice-table")
const invoiceTableThead = document.getElementById("invoice-table-head")

const invoiceTableBody = document.getElementById("invoice-table-body")

// destructuring tableData
const [thData, trData] = tableData

// creating table header
const tr = document.createElement("tr")
tr.innerHTML = `
  <th>${thData[0]}</th>
  <th>${thData[1]}</th>
  <th>${thData[2]}</th>
  <th>${thData[3]}</th>`
invoiceTableThead.appendChild(tr)


// creating table body
for (let rowCount = 0; rowCount < trData.length; rowCount++) {
  const tr = document.createElement("tr")
  tr.innerHTML = `
    <td>${trData[rowCount][0]}</td>
    <td>${trData[rowCount][1]}</td>
    <td>${trData[rowCount][2]}</td>
    <td>${trData[rowCount][3]}</td>`

  invoiceTableBody.appendChild(tr)
}
console.log(tableData)



// totals
subTotalHeader.textContent = totals[0][0]
subTotalValue.textContent = totals[0][1]

salesTaxHeader.textContent = totals[1][0]
salesTaxValue.textContent = totals[1][1]

totalHeader.textContent = totals[2][0]
totalValue.textContent = totals[2][1]


// notes T&C
noteHeader.textContent = noteAndTC[0][0]
noteBody.textContent = noteAndTC[0][1]

tcHeader.textContent = noteAndTC[1][0]
tcBody.textContent = noteAndTC[1][1]