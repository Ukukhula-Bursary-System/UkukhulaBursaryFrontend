import * as Utility from "../../js/admin_dashboard_utility.js";

const MzansiRand = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ZAR',
});


function appendFunds(data) {
    let results = document.getElementById("results");
    const popup = document.querySelector(".popup")
    popup.classList.add("slide-out")

    results.innerHTML = '';
    if (data != undefined) {
        for (let i = 0; i < data.length; i++) {
            results.innerHTML += `
                <tr class="table-rows">
                    <td data-label="Institute">${data[i]["instituteName"]}</td>
                    <td data-label="Allocated Amount">${MzansiRand.format(data[i]["allocatedAmount"])}</td>
                    <td data-label="Remaining Amount">${MzansiRand.format(data[i]["allocatedRemainingAmount"])}</td>
                    <td data-label="Financial Date">${data[i]["financialDate"]}</td>
                </tr>
            `;
        }
    } else {
        results.innerHTML = `
            <tr class="table-rows">
                <td data-label="Institute">No record was found.</td>
                <td data-label="Allocated Amount"></td>
                <td data-label="Remaining Amount"></td>
                <td data-label="Financial Date"></td>
            </tr>
        `;
    }
}


function appendUniversitiesOptions(data) {
    let universityOptions = document.getElementById("universities");

    for (let i = 0; i < data.length; i++) {
        universityOptions.innerHTML += `
            <option value=${data[i]["instituteId"]}>${data[i]["instituteName"]}</option>
        `;
    }
}


function appendInstituteApplication(data) {
    let fundAmount = document.getElementById("funded-amount");
    let remainingAmount = document.getElementById("remaining-amount");
    let instituteName = document.getElementById("institute-name");

    fundAmount.innerText = `${MzansiRand.format(data["allocatedAmount"])}`;
    remainingAmount.innerText = `${MzansiRand.format(data["allocatedRemainingAmount"])}`;
    instituteName.innerText = data["instituteName"];
}


function appendBursaryFund(data) {
    let fundAmount = document.getElementById("fund-amount");
    let fundRemainingAmount = document.getElementById("fund-remaining-amount");
    let fundDate = document.getElementById("fund-date");

    fundAmount.innerText = `${MzansiRand.format(data["fundAmount"])}`;
    fundRemainingAmount.innerText = `${MzansiRand.format(data["fundRemainingAmount"])}`;
    fundDate.innerText = data["financialDate"];
}


function fetchBursaryFund() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    let date = new Date();
    apiBaseUrl += "/bursary-fund/" + date.getFullYear();

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
        appendBursaryFund(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}


function fetchAllInstitutesAllocatedFunds(instituteId, year) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute/funds";

    if (instituteId !== undefined) {
        apiBaseUrl += "/single-institute/" + instituteId;
    }

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
        if (year !== "" && year !== undefined && instituteId !== undefined) {
            appendInstituteApplication(data[0]);
        } else {
            appendFunds(data);
        }
    }).catch(error => {
        const popup = document.querySelector(".popup")
        popup.classList.add("slide-out")
        Utility.showMessage(error.message, "error");
    })
}


function fetchAllApprovedUniversities() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute/" + 2;

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
        appendUniversitiesOptions(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}


function displayValue(value) {
    document.getElementById('display-value').value = value;
}

window.displayValue = displayValue


function getValuesForNewFunding() {
    let amount = document.getElementById("funding-amount");
    let instituteId = document.getElementById("universities");

    if (amount.value == "") {
        throw "Amount should be greater than zero.";
    }

    if (instituteId.value == "-1") {
        throw "Choose an institute.";
    }

    return {
        allocatedAmount: amount.value,
        instituteId: instituteId.value
    }
}


function addFunding() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute/funds";

    try {
        let newFunding = getValuesForNewFunding();

        fetch(apiBaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${loginDetails.loginToken}`
            },
            body: JSON.stringify(newFunding)
        }).then(response => {
            return Utility.handleErrorResponse(response);
        }).then(data => {
            Utility.showMessage(data["message"])
        }).catch(error => {
            Utility.showMessage(error.message, "error");
        });
    } catch (error) {
        Utility.showMessage(error, "error");
    }
}


function toggleElement(elment) {
    document.getElementById('funding-page').style.display = 'none';
    document.getElementById('add-funding').style.display = 'none';

    document.getElementById(elment).style.display = 'block';
}


function setupPage() {
    document.getElementById('add-funding').style.display = 'none';
}


window.addFunding = addFunding
window.toggleElement = toggleElement

export { fetchAllInstitutesAllocatedFunds, addFunding, toggleElement, setupPage, fetchAllApprovedUniversities, fetchBursaryFund }