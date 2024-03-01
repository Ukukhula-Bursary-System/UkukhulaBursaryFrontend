import * as Utility from "../../js/admin_dashboard_utility.js";


function appendFunds(data) {
    let results = document.getElementById("results");

    results.innerHTML = '';
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


function appendInstituteApplication(data) {
    let fundAmount = document.getElementById("funded-amount");
    let remainingAmount = document.getElementById("remaining-amount");
    let instituteName = document.getElementById("institute-name");

    fundAmount.innerText = `R ${data["allocatedAmount"]}`;
    remainingAmount.innerText = `R ${data["allocatedRemainingAmount"]}`;
    instituteName.innerText = data["instituteName"];
}


function fetchAllInstitutesAllocatedFunds(instituteId, year) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute/funds";

    if (instituteId !== undefined) {
        apiBaseUrl += "/single-institute/" + instituteId;
    }

    console.log(apiBaseUrl);

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
        return Utility.handleErrorResponse(response);
    }).then(data => {
        if (year !== "" && year !== undefined) {
            appendInstituteApplication(data[0]);
        } else {
            appendFunds(data);
        }
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}

function displayValue(value) {
    document.getElementById('display-value').value = value;
}

window.displayValue = displayValue

export {fetchAllInstitutesAllocatedFunds}