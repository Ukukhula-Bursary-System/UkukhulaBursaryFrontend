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
        const popup = document.querySelector(".popup")
        popup.classList.add("slide-out")
        Utility.showMessage(error.message, "error");
    })
}


function appendAdmin(data) {
    let results = document.getElementById("results");
    const popup = document.querySelector(".popup")
    popup.classList.add("slide-out")

    results.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        results.innerHTML += `
            <tr class="table-rows">
                <td data-label="Fullname">${data[i]["firstName"]} ${data[i]["lastName"]}</td>
                <td data-label="Email">${data[i]["email"]}</td>
                <td data-label="Active">${data[i]["isActive"]}</td>
                <td data-label="Role">${data[i]["role"]}</td>
            </tr>
        `;
    }
}


function getValuesForNewAdmin() {
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let phoneNumber = document.getElementById("phone-number");
    let email = document.getElementById("email");
    let role = document.getElementById("role");

    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validPhoneNumber =  /^0(6|7|8)[0-9][0-9]{7}$/;

    if (firstName.value.trim() == "" ||
        lastName.value.trim() == "") {
        throw "Please enter firstname and lastname.";
    }

    if (!phoneNumber.value.match(validPhoneNumber)) {
        throw "Please enter a valid phonenumber.";
    }

    if (!email.value.match(validEmailRegex)) {
        throw "Please enter a valid email address.";
    }

    if (role.value < 1) {
        throw "Please select role";
    }

    return {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        roleId: role.value
    }
}


export function addAdmin() {
    let loginDetails = Utility.getLoginDetails();
    let apiBaseUrl = Utility.apiBaseUrl;

    apiBaseUrl += "/user";

    try {
        let user = getValuesForNewAdmin();

        fetch(apiBaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${loginDetails.loginToken}`
            },
            body: JSON.stringify(user)
        }).then(response => {
            return Utility.handleErrorResponse(response);
        }).then(data => {
            Utility.showMessage(`User with email '${user.email}' successfully added!`)
        }).catch(error => {
            Utility.showMessage(error.message, "error");
        });
    } catch (error) {
        Utility.showMessage(error, "error");
    }
}


export function toggleElement(elment) {
    document.getElementById('admin-page').style.display = 'none';
    document.getElementById('add-admin').style.display = 'none';

    document.getElementById(elment).style.display = 'block';
}


function setupPage() {
    document.getElementById('add-admin').style.display = 'none';
}


window.addAdmin = addAdmin
window.toggleElement = toggleElement

export { fetchAllAdmins, setupPage }