import * as Utility from "../../js/admin_dashboard_utility.js";

function appendStudents(data) {
    let results = document.getElementById("results");

    results.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let student = data[i];
        results.innerHTML +=

            ` <tr class="table-rows">
                <td data-label="FirstName">${student["firstName"]}</td>
                <input type="hidden" value=${student["studentID"]}>
                <td data-label="LastName">${student["lastName"]}</td>
                <td data-label="University">${student["university"]}</td>
                <td data-label="BursaryAmount">R${student["bursaryAmount"]}</td>
                <td data-label="status" class="approved">${student["status"]}</td>
                <td class="viewButton">
                    <a  class="viewdetails" href="#"><i class="fa fa-user" aria-hidden="true"></i></a>
                </td>
            </tr>`

    }
}

function fetchStudents(){
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/student/all-applications";

    if (loginDetails.role.toLocaleLowerCase() === "hod") {
        apiBaseUrl += "/hod/" + loginDetails.userEmail;
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
        if (data !== undefined) {
            appendStudents(data);
        }
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}
function displayValue(value) {
    document.getElementById('display-value').value = value;
}

window.displayValue = displayValue

export {fetchStudents}