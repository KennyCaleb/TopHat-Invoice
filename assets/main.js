

// onwers details
const ownerCompanyName = document.getElementById("owner-company-name")
const ownerName = document.getElementById("owner-name")
const ownerCompanyAddress = document.getElementById("owner-company-address")
const ownerCompanyState = document.getElementById("owner-company-state")
const ownerCompanyCountry = document.getElementById("owner-company-country")

// clients details
const clientCompanyName = document.getElementById("client-company-name")
const clientCompanyAddress = document.getElementById("client-address")
const clientCompanyState = document.getElementById("client-state")
const clientCompanyCountry = document.getElementById("client-country")

// invoice header text
const invoiceHeaderText = document.getElementById("invoice-header-text")

// invoice details
const billToHeading = document.getElementById("bill-to-heading")
const invoiceNumberLabel = document.getElementById("invoice-number-label")
const invoiceNumber = document.getElementById("invoice-number")
const invoiceDateLabel = document.getElementById("invoice-date-label")
const invoiceDate = document.getElementById("invoice-date")
const invoiceDueDateLabel = document.getElementById("invoice-due-date-label")
const invoiceDueDate = document.getElementById("invoice-due-date")

// invoice form
const invoiceForm = document.getElementById("invoice-form")


// add new line btn
const lineItemBtn = document.getElementById("add-new-line-item-btn")

// invoice form handle Submit Event
invoiceForm.addEventListener("submit", handleInvoiceSubmit)

// ----------invoice table
const invoiceTable = document.getElementById("invoice-table")

// head labels
const tableHeadItemDescLabel = document.getElementById("table-head-item-desc-label")
const tableHeadQtyLabel = document.getElementById("table-head-qty-label")
const tableHeadRateLabel = document.getElementById("table-head-rate-label")
const tableHeadAmountLabel = document.getElementById("table-head-amount-label")

// table body
const tableBody = document.getElementById("invoice-table-body")


// body values
const tableData = []
// console.log(tableBody.children)


// total
const subTotalLabel = document.getElementById("subTotalLabel")
const subTotal = document.getElementById("subTotal")
const salesTaxLabel = document.getElementById("salesTaxLabel")
const salesTax = document.getElementById("salesTax")
const totalLabel = document.getElementById("totalLabel")
const total = document.getElementById("total")

// note, terms and conditions
const notelabel = document.getElementById("note-label")
const note = document.getElementById("note")
const termsAndConditionLabel = document.getElementById("terms-and-condition-label")
const termsAndCondition = document.getElementById("terms-and-condition")



function handleInvoiceSubmit(e) {
    e.preventDefault()


    const companyData = [ownerCompanyName.value,
    ownerName.value,
    ownerCompanyAddress.value,
    ownerCompanyState.value,
    ownerCompanyCountry.value]

    const invoiceTxt = invoiceHeaderText.value

    const clientData = [billToHeading.value,
    clientCompanyName.value,
    clientCompanyAddress.value,
    clientCompanyState.value,
    clientCompanyCountry.value
    ]

    const invoiceDetailsData = [[invoiceNumberLabel.value, invoiceNumber.value],
    [invoiceDateLabel.value, invoiceDate.value],
    [invoiceDueDateLabel.value, invoiceDueDate.value]]

    const tableData = [[tableHeadItemDescLabel.value, tableHeadQtyLabel.value, tableHeadRateLabel.value, tableHeadAmountLabel.value], []]

    const totalsData = [[subTotalLabel.value, subTotal.value], [salesTaxLabel.value, salesTax.value], [totalLabel.value, total.value]]

    const noteAndTcData = [[notelabel.value, note.value], [termsAndConditionLabel.value, termsAndCondition.value]]



    const allData = [
        invoiceHeaderText,
        ownerCompanyName,
        ownerName,
        ownerCompanyAddress,
        ownerCompanyState,
        ownerCompanyCountry,

        billToHeading,
        clientCompanyName,
        clientCompanyAddress,
        clientCompanyState,
        clientCompanyCountry,

        invoiceNumberLabel,
        invoiceNumber,
        invoiceDateLabel,
        invoiceDate,
        invoiceDueDateLabel,
        invoiceDueDate,

        notelabel,
        note,
        termsAndConditionLabel,
        termsAndCondition]





    const tr = tableBody.getElementsByTagName("tr")
    for (i = 0; i < tr.length; i++) {
        let rowData = []
        const inputs = tr[i].getElementsByTagName("INPUT")
        for (let j = 0; j < inputs.length; j++) {
            console.log(inputs[j].value)
            rowData = [...rowData, inputs[j].value]
        }
        tableData[1] = [...tableData[1], rowData]
        console.log(tableData)
        console.log("-----------")
    }




    for (let x = 0; x < allData.length; x++) {
        let y = false
        if (allData[x].value === '') {
            allData[x].style.border = "2px solid red"
            console.log("some fields are left blank")
        }
    }

    const finalInvoiceData = [companyData, invoiceTxt, clientData, invoiceDetailsData, tableData, totalsData, noteAndTcData]
    localStorage.setItem("eCalebInvoiceSolution2", JSON.stringify(finalInvoiceData))
    window.open("./invoicePreview.html");
}

// new item line
lineItemBtn.addEventListener("click", addNewLine)
function addNewLine() {
    let tr = document.createElement("tr")
    tr.innerHTML = `
                <td><input type="text" /></td>
                <td><input type="number" class = "qty"/></td>
                <td><input type="number" class = "rate"/></td>
                <td>
                  <input
                    type="text"
                    class="tableBodyAmountValue"
                    style="cursor: not-allowed"
                    disabled
                  />
                </td>
                <td width="20" class="del-row-btn-parent">
                <button id="del-row-btn">x</button>
              </td>
    `
    tableBody.appendChild(tr)
}

// function to delete row item - Event Delegation
tableBody.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.textContent === "x") {
        tableBody.removeChild(e.target.parentElement.parentElement)
    }

})

// amount, totals and subTotal estimations - Event Delegation
function handleEstimationUpdate() {
    tableBody.addEventListener('click', (e) => {
        if (e.target.className === "qty" || e.target.className === "rate") {
            const rowParent = e.target.parentElement.parentElement
            const rowAmount = rowParent.getElementsByTagName("INPUT")[3]

            const rowQty = rowParent.getElementsByTagName("INPUT")[1]
            const rowRate = rowParent.getElementsByTagName("INPUT")[2]

            e.target.addEventListener("keyup", () => {
                rowAmount.value = `${(Number(rowQty.value)) * (Number(rowRate.value))}`

                let totalVal = 0
                const tableBodyAmountValue = document.getElementsByClassName("tableBodyAmountValue")
                for (let i = 0; i < tableBodyAmountValue.length; i++) {

                    totalVal += Number(tableBodyAmountValue[i].value)
                }
                subTotal.value = totalVal
                salesTax.value !== "" ? total.value = totalVal + (Number(subTotal.value) * (salesTax.value / 100)) : total.value = subTotal.value
            })
        }
    })
}

handleEstimationUpdate()

