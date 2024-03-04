import * as Utility from "../../js/admin_dashboard_utility.js";

let allStudents = {};

function appendStudents(data) {
    let results = document.getElementById("results");
    const popup = document.querySelector(".popup")
    popup.classList.add("slide-out")
    let ZarFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ZAR',
    });
    results.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let student = data[i];
        results.innerHTML +=

            ` <tr class="table-rows">
                <td data-label="FirstName">${student["firstName"]}</td>
                <input type="hidden" value=${student["studentID"]}>
                <td data-label="LastName">${student["lastName"]}</td>
                <td data-label="University">${student["university"]}</td>
                <td data-label="BursaryAmount">  ${ZarFormatter.format(student["bursaryAmount"])}  </td>
                <td data-label="status" class="approved">${student["status"]}</td>
            </tr>`

    }
    document.querySelectorAll('.table-rows').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            let studentID = item.querySelector('input').value;
            let student = data.find(student => student.studentID == studentID);
            StudentDetailsView(student);
        })
    });
}

function StudentDetailsView(student) {
    console.log(student);
    
        document.getElementById("student-details").style.display = "block";
        document.getElementById("registrationForm").style.display = "none";
        document.getElementById("header").style.display = "none";
        document.getElementById("name").innerHTML = "Firstname: " + student.lastName;
        document.getElementById("lname").innerHTML = "Lastname: " + student.firstName;
        document.getElementById("mail").innerHTML = student.email;
        document.getElementById("phone").innerHTML ="Phone Number"+ student.phoneNumber;
        document.getElementById("id").innerHTML = "Identity Number: " + student.identityDocument;
        document.getElementById("universityname").innerHTML = "University: " + student.university;
        document.getElementById("bursaryAmountdetails").innerHTML = "Bursary Amount: " + student.bursaryAmount;
        document.getElementById("status-details").innerHTML = "Status: " + student.status;
        document.getElementById("link").href =  requestDocumentUploadLinkForStudents(student.studentID);
        let loginDetails = Utility.getLoginDetails();
        if (loginDetails.role.toLowerCase() === "hod") {
            document.getElementById("approve").style.display = "none";
            document.getElementById("reject").style.display = "none";
        }
        else {
            document.getElementById("sendApplication").style.display = "none";
        }


        document.getElementById("approve").addEventListener("click", function () {
            student.status = "approved";
        }
        )
        document.getElementById("reject").addEventListener("click", function () {
            student.status = "rejected";
        });
    }



function filterStudents(status, students) {
    if (status === "All") {
        appendStudents(students);
        return;
    }

    let studentsbystatus = students.filter(student => student.status === status);
    if (studentsbystatus.length === 0) {
        appendStudents(students);
        return;
    }
    appendStudents(studentsbystatus);
}


function filterStudentsByAmount(amount) {
    let students = allStudents;
    let studentsbyamount = students.filter(student => student.bursaryAmount <= amount);
    if (studentsbyamount.length === 0) {
        showAlert(`No students found with the amount R${amount} or less.`);
        appendStudents(students);
        return;
    }
    appendStudents(studentsbyamount);
}


function searchStudents(searchWord, students) {

    let studentsbysearch = students.filter(student => student.firstName
        .toLowerCase().includes(searchWord.toLowerCase())
        || student.lastName
            .toLowerCase().includes(searchWord.toLowerCase()));
    if (studentsbysearch.length === 0) {
        appendStudents(students);
        return;
    }
    appendStudents(studentsbysearch);
}


function requestDocumentUploadLinkForStudents(studentId){
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/student/generate-student-document-link/" + studentId;

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
            return data.json();
            // Utility.showMessage(data["message"]);
        }).catch(error => {
            showAlert(error.message);
        })
    } catch(error) {
        Utility.showMessage(error, "error");
    }
}


function fetchStudents(status, searchWord){
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
            allStudents = data;
            if (status !== undefined) {
                filterStudents(status, data);
                return;
            }
            else if (searchWord !== undefined) {
                searchStudents(searchWord, data);
                return;
            }

            else {
                appendStudents(data);
                return;
            }

        }
    }).catch(error => {
        const popup = document.querySelector(".popup")
        popup.classList.add("slide-out")
        showAlert(error.message);
    })
}

function displayValue(value) {
    document.getElementById('display-value').value = value;
}

window.displayValue = displayValue


function showAlert(message) {
    var alertElement = document.getElementById('alert');
    alertElement.innerText = message;
    alertElement.classList.add('show');
    setTimeout(function()
        {
         alertElement.classList.remove('show');
        }, 3000);
}


function hideHodButton() {
    if (Utility.getLoginDetails().role.toLowerCase() === "hod") {
        document.getElementById("accept").style.display = "none";
        document.getElementById("reject").style.display = "none";
        return;
    }
    else{
        document.getElementById("add-admin-button").style.display = "none";
    }
}

function newStudent() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/student/all-applications";

}


function addHODNewStudent() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/student/getHodIdByEmail/" + loginDetails.userEmail;

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
        return addStudent(data);
    }).then(response => {
        return Utility.handleErrorResponse(response);
    }).then(data => {
        Utility.showMessage(`Student successfully added!`);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}


function getNewStudentApplicationValues(loginDetails) {
    let studentFirstName = document.getElementById("firstName").value;
    let studentLastName = document.getElementById("lastName").value;
    let studentEmail = document.getElementById("email").value;
    let studentIdentityNumber = document.getElementById("IdentityNumber").value;
    let studentPhoneNumber = document.getElementById("phoneNumber").value;
    let studentRace = document.getElementById("race").value;
    let studentAverageMarks = document.getElementById("averageMarks").value;
    let studentBursaryAmount = document.getElementById("bursaryAmount").value;
    let studentMotivation = document.getElementById("motivation").value;

    return {
        firstName: studentFirstName,
        lastName: studentLastName,
        phoneNumber: studentPhoneNumber,
        email: studentEmail,
        instituteId: loginDetails.institute,
        identityDocument: studentIdentityNumber,
        race: studentRace,
        bursaryAmount: studentBursaryAmount,
        averageMarks: studentAverageMarks,
        motivation: studentMotivation,
        headOfDepartment: loginDetails.userEmail
    }
}


function addStudent(hodId) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/student/newStudentApplication";

    try {
        let newStudentApplication = getNewStudentApplicationValues(loginDetails);
        newStudentApplication["headOfDepartmentId"] = hodId;
        console.log(hodId);

        return fetch(apiBaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${loginDetails.loginToken}`
            },
            body: JSON.stringify(newStudentApplication)
        });
    } catch(error) {
        Utility.showMessage(error, "error");
    }
}

  


export {fetchStudents , filterStudentsByAmount, hideHodButton, addStudent, addHODNewStudent}