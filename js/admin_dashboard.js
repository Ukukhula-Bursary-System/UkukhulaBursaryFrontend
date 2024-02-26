import * as Utility from "./admin_dashboard_utility.js";
import * as Institute from "./institutes.js";
import * as Student from "./students.js";
import * as Funding from "./funding.js";
import * as Admin from "./admins.js";


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
        Student.appendStudents(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
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
        Funding.appendFunds(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}


function fetchAllAdmins() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/user";

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
        Admin.appendAdmin(data);
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
    });

    let studentsNav = document.getElementById("students-nav");
    studentsNav.addEventListener("click", (e) => {
        loadStudentsPage();
        fetchStudents();
    });

    let fundingNav = document.getElementById("funding-nav");
    fundingNav.addEventListener("click", (e) => {
        loadFundingPage();
        fetchAllInstitutesAllocatedFunds();
    });

    let adminsNav = document.getElementById("admins-nav");
    adminsNav.addEventListener("click", (e) => {
        loadAdminsPage();
        fetchAllAdmins();
    });
});