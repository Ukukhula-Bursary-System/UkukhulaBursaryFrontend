import * as Utility from "../admin_dashboard_utility.js";
import * as Institute from "../institutes.js";
import * as Student from "../students.js";
import * as Funding from "./funding.js";
import * as Admin from "../admins.js";


function getAllInstituteFunding(year) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute/funds/single-institute/" + loginDetails.institute;
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
        if (response.status == 403 || response.status == 401) {
            showMessage("Please login!", "error");
            redirectToLoginPage();
            return;
        } else if (response.status == 500) {
            showMessage("Server is offline!", "error");
            return;
        } else if (!response.ok) {
            showMessage("Something went wrong!", "error");
            return;
        }
        return response.json();
    }).then(data => {
        if (year !== "" && year !== undefined) {
            Funding.appendInstituteApplication(data[0]);
        } else {
            Funding.appendFunds(data);
        }
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}


document.addEventListener('DOMContentLoaded', () => {
    loadHeadOfDepartmentFundingPage();
    Utility.ifNotloggedInRedirectToLoginPage("HOD");
    console.log(Utility.getLoginDetails());
    getAllInstituteFunding();

    let date = new Date();
    getAllInstituteFunding(date.getFullYear());
});