import * as Utility from "../../js/admin_dashboard_utility.js";


function appendApplications(data) {
    console.log("okay " + data);
    let results = document.getElementById("funding-results");

    if (data === undefined) {
        results.innerHTML = `
        <tr>
            <td>
                <p>No application was found.</p>
            </td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        `
    } else {
        for (let i = 0; i < data.length; i++) {
            results.innerHTML += `
                <tr>
                    <td data-label="First Name"><a href="#">${data[i]["instituteName"]}</a></td>
                    <td data-label="Last Name">${data[i]["allocatedAmount"]}</td>
                    <td data-label="Bursary Amount">${data[i]["allocatedRemainingAmount"]}</td>
                    <td data-label="Status">${data[i]["financialDate"]}</td>
                </tr>
            `;
        }
    }
}


function fetchAllAppicationsForHOD(statusId) {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/student/all-applications/hod/" + loginDetails.userEmail;
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
        } else if (response.status == 204) {
            return;
        } else if (!response.ok) {
            showMessage("Something went wrong!", "error");
            return;
        }
        return response.json();
    }).then(data => {
        appendApplications(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}


export { fetchAllAppicationsForHOD }
