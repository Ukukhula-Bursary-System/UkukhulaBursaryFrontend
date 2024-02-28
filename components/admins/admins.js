import * as Utility from "../../js/admin_dashboard_utility.js";

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
        return Utility.handleErrorResponse(response);
    }).then(data => {
        appendAdmin(data);
    }).catch(error => {
        Utility.showMessage(error.message, "error");
    })
}

function appendAdmin(data) {
    let results = document.getElementById("results");

    for (let i = 0; i < data.length; i++) {
        results.innerHTML += `
            <tr>
                <td data-label="Fullname"><a href="#">${data[i]["firstName"]} ${data[i]["lastName"]}</a></td>
                <td data-label="Email">${data[i]["email"]}</td>
                <td data-label="Active">${data[i]["isActive"]}</td>
                <td data-label="Role">${data[i]["role"]}</td>
            </tr>
        `;
    }
}

export {fetchAllAdmins}