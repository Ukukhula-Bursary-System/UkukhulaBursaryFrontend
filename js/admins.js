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


function getValuesForNewAdmin() {
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let phoneNumber = document.getElementById("phone-number");
    let email = document.getElementById("email");
    let role = document.getElementById("role");

    return {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        roleId: role.value
    }
}

export { appendAdmin, getValuesForNewAdmin }
