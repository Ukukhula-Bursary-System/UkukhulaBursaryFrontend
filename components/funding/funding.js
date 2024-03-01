import * as Utility from "../../js/admin_dashboard_utility.js";
function appendFunds(data) {
    let results = document.getElementById("results");

    for (let i = 0; i < data.length; i++) {
        results.innerHTML += `
            <tr class="table-rows">
                <td data-label="Institute">${data[i]["instituteName"]}</td>
                <td data-label="Allocated Amount">${data[i]["allocatedAmount"]}</td>
                <td data-label="Remaining Amount">${data[i]["allocatedRemainingAmount"]}</td>
                <td data-label="Financial Date">${data[i]["financialDate"]}</td>
            </tr>
        `;
    }
}

function fetchAllInstitutesAllocatedFunds(year) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute/funds";
    if (year !== "" && year !== undefined) {
        apiBaseUrl += "/" + year;
    }

    fetch(apiBaseUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authorization: `Bearer ${loginDetails.loginToken}`
        }
    }).then(response => {
       // console.log(response, "f")
        return Utility.handleErrorResponse(response);
    }).then(data => {
        appendFunds(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}

function displayValue(value) {
    document.getElementById('display-value').value = value;
}

window.displayValue = displayValue

export {fetchAllInstitutesAllocatedFunds}