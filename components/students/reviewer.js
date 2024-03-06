import * as Utility from "../../js/admin_dashboard_utility.js";



function toggleElement(elment) {
    document.getElementById('institute-page').style.display = 'none';
    document.getElementById('add-institute').style.display = 'none';
    document.getElementById('update-institute').style.display = 'none';

    // document.getElementById(elment).style.display = 'block';
}


function setupPage() {
    document.querySelector('.students').style.display = 'block';
    // document.getElementById('update-institute').style.display = 'none';
}


function appendStudents(data) {
    console.log("here append 1");
    let results = document.getElementById("results");
    const popup = document.querySelector(".popup")
    popup.classList.add("slide-out")
    console.log("Here append 2");

    let ZarFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ZAR',
    });
    results.innerHTML = "";

    if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
            let student = data[i];
            results.innerHTML +=
                ` <tr class="table-rows">
                    <td data-label="FirstName">${student["firstName"]}</td>
                    <input type="hidden" value=${student["studentID"]}>
                    <td data-label="LastName">${student["lastName"]}</td>
                    <td data-label="University">${student["university"]}</td>
                    <td data-label="BursaryAmount">  ${ZarFormatter.format(student["bursaryAmount"])}  </td>
                    <td data-label="status" class="${student["status"].toLowerCase()}">${student["status"]}</td>
                </tr>`

        }
    } else {
        results.innerHTML +=
            ` <tr class="table-rows">
                <td data-label="FirstName">No record was found.</td>
                <td data-label="LastName"></td>
                <td data-label="University"></td>
                <td data-label="BursaryAmount"></td>
                <td data-label="status"></td>
            </tr>`
    }
}


function fetchStudents(){
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/student/reviewer" + "/" + loginDetails.userEmail;

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
        console.log("here data 1");
        appendStudents(data);
        console.log("here data 2");
    }).catch(error => {
        const popup = document.querySelector(".popup")
        popup.classList.add("slide-out")
        Utility.showMessage(error, "error");
    })
}


// window.addInstitute = addInstitute
window.toggleElement = toggleElement

export { toggleElement, setupPage, fetchStudents }
