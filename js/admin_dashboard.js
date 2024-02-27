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
       return handleErrorResponse(response);
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
        return handleErrorResponse(response);
    }).then(data => {
        Student.appendStudents(data);

        document.querySelectorAll('.viewdetails').forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault();
                let studentID = item.parentElement.parentElement.querySelector('input').value;
                let student = data.find(student => student.studentID == studentID);
                Student.StudentDetailsView(student);
                // after viewing student details, add event listener to approve or reject student
                document.getElementById("Approve").addEventListener("click", function(){
                    student.status = "Approved";
                    approveOrDeclineStudents("Approved", studentID);
                });
                document.getElementById("reject").addEventListener("click", function(){
                    student.status = "Rejected";
                    approveOrDeclineStudents("Rejected", studentID);    
                });  
            })
        });
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
        return handleErrorResponse(response);
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
        return handleErrorResponse(response);
    }).then(data => {
        Admin.appendAdmin(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}


function addAdmin() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/user";
    let user = Admin.getValuesForNewAdmin();

    fetch(apiBaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authorization: `Bearer ${loginDetails.loginToken}`
        },
        body: JSON.stringify(user)
    }).then(response => {
        return handleErrorResponse(response);
    }).then(data => {
        Utility.showMessage(`User with email '${user.email}' successfully added!`)
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}

function approveOrDeclineStudents(status, studentID) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += `/student/update/${studentID}/${status}`;
 

    fetch(apiBaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authorization: `Bearer ${loginDetails.loginToken}`
        }
    }).then(response => {
        return handleErrorResponse(response);
    }).then(data => {
        Utility.showMessage(`S`)
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}



document.addEventListener('DOMContentLoaded', () => {
    loadInstitutesPage();
    Utility.ifNotloggedInRedirectToLoginPage();
    fetchAllInstitutes();
    
    //Institutes Page
    let instituteNav = document.getElementById("institutes-nav");
    instituteNav.addEventListener("click", (e) => {
        loadInstitutesPage();
        fetchAllInstitutes();
    });

    //Students Page
    let studentsNav = document.getElementById("students-nav");
    studentsNav.addEventListener("click", (e) => {
        loadStudentsPage();
        fetchStudents();
    });




    //Funding Page
    let fundingNav = document.getElementById("funding-nav");
    fundingNav.addEventListener("click", (e) => {
        loadFundingPage();
        fetchAllInstitutesAllocatedFunds();
    });

    //Admin Page
    let adminsNav = document.getElementById("admins-nav");
    adminsNav.addEventListener("click", (e) => {
        loadAdminsPage();
        fetchAllAdmins();

        let addNewAdminBtn = document.getElementById("add-admin-button");
        addNewAdminBtn.addEventListener("click", (e) => {
            loadAddNewAdmin();

            //Add new admin page
            let addAdminForm = document.getElementById("add-admin-form");
            addAdminForm.addEventListener("submit", (e) => {
                e.preventDefault();
                addAdmin();
            });
        })
    });
});


function handleErrorResponse(response) {
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
}