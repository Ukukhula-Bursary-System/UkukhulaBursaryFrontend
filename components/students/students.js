import * as Utility from "../../js/admin_dashboard_utility.js";

let allStudents ={};

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



function filterStudents(status, students) {
    if (status === "All") {
        appendStudents(students);
        return;
    }

   let studentsbystatus = students.filter(student => student.status === status);
    if (students.length === 0) {
        appendStudents(students);
        return;
    }
    appendStudents(studentsbystatus);
}


function filterStudentsByAmount(amount) {
    let students = allStudents;
    let studentsbyamount = students.filter(student => student.bursaryAmount <= amount);
    if (students.length === 0) {
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
    if (students.length === 0) {
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
            if (amount !== undefined) {
                filterStudentsByAmount(amount,data);
                return;
            }
            else if (status !== undefined) {
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
        Utility.showMessage(error.message, "error");
    })
}
function displayValue(value) {
    document.getElementById('display-value').value = value;
}

window.displayValue = displayValue

export {fetchStudents , filterStudentsByAmount}