let docBody = document.querySelector("body");

let spendingInput = document.getElementById("spendingForm");

let spendingTableData = new Array();

let addButton = document.getElementById("add");
let clearButton = document.getElementById("clear");

/**
 * Remove this tables data from local storage
 */
clearButton.addEventListener("click", (e) => { 
    e.preventDefault();
    localStorage.removeItem("spendingTableData");
});

/**
 * Add an entry to the table
 */
addButton.addEventListener("click", (e) => { 
    e.preventDefault();
    addEntryToLocalStage();
    showSavingsTableData();
});
showSavingsTableData();

/**
 * Function to rebuild the HTML table on refresh
 */
function showSavingsTableData() {
    getDataFromLocalStorage();
    let spendingTable = document.getElementById("spendingTable");
         
    let numRows = spendingTable.rows.length;
    console.log(numRows);
    while (--numRows && numRows > 0) {
        
        spendingTable.deleteRow(numRows);
    }
    
    count = 1;
    let numElements = 0;
    for (let i = 0; i < spendingTable.rows.length; i++) {
         let newEntry = document.createElement("tr");
         newEntry.id = count;
         let id = document.createElement("td");
         let spendingBalanceInput = document.createElement("td");
         spendingBalanceInput.contentEditable = true;

         let transactionInput = document.createElement("td");
         transactionInput.contentEditable = true;

         let amountInput = document.createElement("td");
         amountInput.contentEditable = true;

         let dateInput = document.createElement("td");
         dateInput.contentEditable = true;

         let option = document.createElement("td");

         let deleteBtn = document.createElement("button");
         let updateBtn = document.createElement("button");

         updateBtn.innerText = "update";
         updateBtn.style.backgroundColor = "blue";
         updateBtn.style.color = "white";

         deleteBtn.innerText = "delete";
         deleteBtn.style.backgroundColor = "red";
         deleteBtn.style.color = "white"

        updateBtn.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("here");
             spendingTableData[i].spendingBalance = spendingBalanceInput.innerText
             spendingTableData[i].transaction = transactionInput.innerText;
             spendingTableData[i].amount = amountInput.innerText;
             spendingTableData[i].date = dateInput.innerText;

             localStorage.setItem('spendingTableData', JSON.stringify(spendingTableData));
             createBlob();
        });

        deleteBtn.addEventListener("click", (event) => {
             event.preventDefault();
             numElements--;
             index = newEntry.id;
              
             spendingTableData.splice(numElements, 1); 
             localStorage.setItem('spendingTableData', JSON.stringify(spendingTableData));
             createBlob();
             deleteRow(index);                
        });

        option.append(updateBtn);
        option.append(deleteBtn);
              
         // Create table cells
        id.innerText = count; 
        spendingBalanceInput.innerText = spendingTableData[i].spendingBalance;
        transactionInput.innerText = spendingTableData[i].transaction;
        amountInput.innerText = spendingTableData[i].amount;
        dateInput.innerText = spendingTableData[i].date;

         newEntry.appendChild(id);
         newEntry.appendChild(spendingBalanceInput)
         newEntry.appendChild(transactionInput);
         newEntry.appendChild(amountInput);
         newEntry.appendChild(dateInput);
         newEntry.appendChild(option);
         spendingTable.appendChild(newEntry);
         count++;
         numElements++;
    }          
}

/**
 * Add an entry and update local storage
 */
function addEntryToLocalStage() {
    getDataFromLocalStorage();
    spendingTableData.push({
        spendingBalance: document.getElementById("spendingBalance").value,
        transaction:     document.getElementById("transaction").value,
        amount:          document.getElementById("amount").value,
        date:            document.getElementById("date").value
    });

    localStorage.setItem("spendingTableData", JSON.stringify(spendingTableData));
    createBlob();
}

function createBlob() {
    const spendingBlob = new Blob([JSON.stringify(spendingTableData)], {
        type: "application/json",
    });

    console.log("spendingBlob: ", spendingBlob);
}

/**
 * Remove the selected row from the DOM
 * @param {"Selected row"} rowid  
 */
function deleteRow(rowid) {   
    let row = document.getElementById(rowid);
    row.parentNode.removeChild(row);
} 

/**
 * Grab a fresh copy of the table data from local storage
 */
function getDataFromLocalStorage() {
    let tableData = localStorage.getItem("spendingTableData");
    if (tableData != null) {
        spendingTableData = JSON.parse(tableData)
    }
}