import * as Utility from "../../js/admin_dashboard_utility.js";


let instituteName = document.getElementById("institute-name");
let status = document.getElementById("status");
let reviewerId = document.getElementById("reviewer");
let repFirstName = document.getElementById("institute-reprentative-first-name");
let repLastName = document.getElementById("institute-reprentative-last-name");
let repPhoneNumber = document.getElementById("institute-reprentative-phonenumber");
let repEmail = document.getElementById("institute-reprentative-email");


//Future refactor
function appendInstitutes(data) {
    let results = document.getElementById("results");
    const popup = document.querySelector(".popup")
    popup.classList.add("slide-out")
    let ids = [];

    results.innerHTML = '';
    if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
            let id = data[i]["instituteId"];
            let name = data[i]["instituteName"];
            let status = data[i]["status"];
            let statusId = 2;
            if (status.toLowerCase() == "pending") {
                statusId = 1;
            } else if (status.toLowerCase() == "rejected") {
                statusId = 3;
            }
            ids.push(id);

            results.innerHTML += `
                <tr id="institute-${id}" data-name="${name}" data-status=${statusId} class="table-rows">
                    <td data-label="Institute">${name}</td>
                    <td data-label="Reviewer">${data[i]["email"]}</td>
                    <td data-label="Status" class="${status.toLowerCase()}">${status}</td> 
                </tr>
            `;
        }
    } else {
        results.innerHTML += `
        <tr class="table-rows">
            <td data-label="Institute">No record was found.</td>
            <td data-label="Reviewer"></td>
            <td data-label="Status" class="approved"></td>
        </tr>
        `
    }
    instituteUpdate(ids);
}


function instituteUpdate(ids) {
    let updateInstituteName = document.getElementById("update-institute-name");
    let updateInstituteStatus = document.getElementById("update-status");

    for (let i = 0; i < ids.length; i++) {
        let institute = document.getElementById("institute-" + ids[i]);
        institute.onclick = () => {
            toggleElement('update-institute')
            updateInstituteName.value = institute.dataset.name;
            updateInstituteStatus.value = institute.dataset.status;

            document.getElementById("update-institute-form").onsubmit = (e) => {
                e.preventDefault();
                let updateStatus = document.getElementById("update-status").value;

                if (updateStatus < 1) {
                    throw "Please select status."
                }
                updateInstitute(ids[i], updateStatus);
            };
        }
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
            Utility.showMessage(error.message, "error");
        });
    } catch (error) {
        const popup = document.querySelector(".popup")
        popup.classList.add("slide-out")
        Utility.showMessage(error);
    }
}


function displayValue(value) {
    document.getElementById('display-value').value = value;
}

window.displayValue = displayValue


function getValuesForNewInstitute() {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validPhoneNumber = /^\d{10}$/;

    if (status.value < 1) {
        throw "Please select a status.";
    }

    if (reviewerId.value < 1) {
        throw "Please select a reviewer.";
    }

    if (!repEmail.value.match(validRegex)) {
        throw "Please enter a valid email address.";
    }

    if (!repPhoneNumber.value.match(validPhoneNumber) || repPhoneNumber.value.trim() == "") {
        throw "Please enter a valid phone number.";
    }

    if (instituteName.value.trim() == "" ||
        repFirstName.value.trim() == "" ||
        repLastName.value.trim() == ""
    ) {
        throw "Please make sure that there are no empty fields."
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
    repLastName.value = "";
    repPhoneNumber.value = "";
    repEmail.value = ""; 
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
    } catch (error) {
        Utility.showMessage(error, "error");
    }
}


function addInstitute() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute";

    try {
        let newInstitute = getValuesForNewInstitute();

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
    } catch (error) {
        Utility.showMessage(error, "error");
    }
}


function updateInstitute(instituteId, statusId) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute/" + instituteId;

    try {
        fetch(apiBaseUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${loginDetails.loginToken}`
            },
            body: JSON.stringify({
                applicationStatusID: statusId
            })
        }).then(response => {
            return Utility.handleErrorResponse(response);
        }).then(data => {
            Utility.showMessage(`Institute "${data["instituteName"]}" status updated to "${data["status"]}"`);
        }).catch(error => {
            Utility.showMessage(error.message, "error");
        });
    } catch (error) {
        Utility.showMessage(error, "error");
    }
}


function toggleElement(elment) {
    document.getElementById('institute-page').style.display = 'none';
    document.getElementById('add-institute').style.display = 'none';
    document.getElementById('update-institute').style.display = 'none';

    document.getElementById(elment).style.display = 'block';
}


function setupPage() {
    document.getElementById('add-institute').style.display = 'none';
    document.getElementById('update-institute').style.display = 'none';
}


window.addInstitute = addInstitute
window.toggleElement = toggleElement

export { fetchAllInstitutes, addInstitute, fetchAllReviewers, toggleElement, setupPage }
