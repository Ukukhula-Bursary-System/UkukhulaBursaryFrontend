import * as Utility from "../../js/admin_dashboard_utility.js";


let instituteName = document.getElementById("institute-name");
let status = document.getElementById("status");
let reviewerId = document.getElementById("reviewer");
let repFirstName = document.getElementById("institute-reprentative-first-name");
let repLastName = document.getElementById("institute-reprentative-last-name");
let repPhoneNumber = document.getElementById("institute-reprentative-phonenumber");
let repEmail = document.getElementById("institute-reprentative-email");


function appendInstitutes(data) {
    let results = document.getElementById("results");

    results.innerHTML = '';
    if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
            results.innerHTML += `
                <tr class="table-rows">
                    <td data-label="Institute">${data[i]["instituteName"]}</td>
                    <td data-label="Reviewer">${data[i]["email"]}</td>
                    <td data-label="Status" class="approved">${data[i]["status"]}</td>
                    <td>
                        <a class="fund" href="#">Fund</a>
                    </td>
                </tr>
            `;
        }
    } else {
        results.innerHTML += `
        <tr class="table-rows">
            <td data-label="Institute">No record was found.</td>
            <td data-label="Reviewer"></td>
            <td data-label="Status" class="approved"></td>
            <td>
                <a class="fund" href="#"></a>
            </td>
        </tr>
        `
    }
}


function appendReviewers(data) {
    let reviewersOption = document.getElementById("reviewer");

    for (let i = 0; i < data.length; i++) {
        reviewersOption.innerHTML += `
            <option value=${data[i]["bbdadminId"]}>${data[i]["email"]}</option>
        `
    }
}


function fetchAllInstitutes(statusId) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute";
    if (statusId !== "" && statusId !== undefined) {
        apiBaseUrl += "/" + statusId;
    }

    try {
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
        appendInstitutes(data);
    }).catch(error => {
        //   console.log(error)
        Utility.showMessage(error.message, "error");
    });
    } catch(error) {
        Utility.showMessage(error);
    }
}


function displayValue(value) {
    document.getElementById('display-value').value = value;
}

window.displayValue = displayValue


function getValuesForNewInstitute() {
    if (status.value < 1) {
        throw "Status id can't be less than 1.";
    }

    if (reviewerId.value < 1) {
        throw "Reviewer id can't be less than 1."
    }

    return {
        instituteName: instituteName.value,
        applicationStatusID: status.value,
        instituteReviewerID: reviewerId.value,
        instituteRepresentativeFirstName: repFirstName.value,
        instituteRepresentativeLastName: repLastName.value,
        instituteRepresentativePhoneNumber: repPhoneNumber.value,
        instituteRepresentativeEmail: repEmail.value
    }
}


function clearInputs() {
    instituteName.value = "";
    repFirstName.value = "";
    repLastName,value = "";
    repPhoneNumber = "";
    repEmail = ""; 
}


function fetchAllReviewers() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/user";

    try {
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
            appendReviewers(data);
        }).catch(error => {
            Utility.showMessage(error.message, "error");
        });
    } catch(error) {
        Utility.showMessage(error, "error");
    }
}


function addInstitute() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute";
    
    try {
        let newInstitute = getValuesForNewInstitute();
       // console.log(newInstitute);

        fetch(apiBaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${loginDetails.loginToken}`
            },
            body: JSON.stringify(newInstitute)
        }).then(response => {
            return Utility.handleErrorResponse(response);
        }).then(data => {
            Utility.showMessage(data["message"]);
            clearInputs();
        }).catch(error => {
            Utility.showMessage(error.message, "error");
        });
    } catch(error) {
        Utility.showMessage(error, "error");
    }
}


function toggleElement(elment) {
    document.getElementById('institute-page').style.display = 'none';
    document.getElementById('add-institute').style.display = 'none';

    document.getElementById(elment).style.display = 'block';
}


function setupPage() {
    document.getElementById('add-institute').style.display = 'none';
}


window.addInstitute = addInstitute
window.toggleElement = toggleElement

export { fetchAllInstitutes, addInstitute, fetchAllReviewers, toggleElement, setupPage }
