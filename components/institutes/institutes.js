import * as Utility from "../../js/admin_dashboard_utility.js";

function appendInstitutes(data) {
    let results = document.getElementById("results");

    results.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        results.innerHTML += `
            <tr class="table-rows">
                <td data-label="Institute">${data[i]["instituteName"]}</td>
                <td data-label="Reviewer">${data[i]["email"]}</td>
                <td data-label="Status" class="approved">${data[i]["status"]}</td>
                <td>
                    <a class="fund" href="#">Fund</a>
                </td>
            </tr>
         
        `;
    }
}


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
        appendInstitutes(data);
    }).catch(error => {
        //   console.log(error)
        Utility.showMessage(error.message, "error");
    })
}
function displayValue(value) {
    document.getElementById('display-value').value = value;
}

window.displayValue = displayValue


export { fetchAllInstitutes }