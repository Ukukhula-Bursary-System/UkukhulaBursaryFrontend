import * as Utility from "./admin_dashboard_utility.js";
import * as Institute from "./institutes.js";
import * as Student from "./students.js";


function fetchAllInstitutes(statusId) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/institute";
    if (statusId !== "" && statusId !== undefined) {
        apiBaseUrl += "/" + statusId;
    }

    fetch(apiBaseUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authorization0: `Bearer ${loginDetails.loginToken}`
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
        Institute.appendInstitutes(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}

function fetchStudents(){
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/student/all-applications";

    fetch(apiBaseUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authorization0: `Bearer ${loginDetails.loginToken}`
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
        Student.appendStudents(data);
        console.log(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}


document.addEventListener('DOMContentLoaded', () => {
    loadInstitutesPage();
    Utility.ifNotloggedInRedirectToLoginPage();
    fetchAllInstitutes();

    let instituteNav = document.getElementById("institutes-nav");

    instituteNav.addEventListener("click", (e) => {
        loadInstitutesPage();
        fetchAllInstitutes();
    })

    let studentsNav = document.getElementById("students-nav");
    

    studentsNav.addEventListener("click", (e) => {
        loadStudentsPage();
        fetchStudents();
    })
});