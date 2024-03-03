import * as Utility from "../../js/admin_dashboard_utility.js";

let allStudents ={};

function appendStudents(data) {
    let results = document.getElementById("results");
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
                <td data-label="BursaryAmount">  ${ZarFormatter.format( student["bursaryAmount"])}  </td>
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

    document.getElementById("details").style.display = "block";
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("header").style.display = "none";

    document.getElementById("Approve").addEventListener("click", function () {
        student.status = "Approved";
    }
    )
    document.getElementById("reject").addEventListener("click", function () {
        student.status = "Rejected";
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


function searchStudents(searchWord, students){
    
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
                filterStudents(status,data);
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


function newStudent() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/student/all-applications";

}
  
  


export {fetchStudents , filterStudentsByAmount}