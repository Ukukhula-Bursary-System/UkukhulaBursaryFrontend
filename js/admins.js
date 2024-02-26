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

export { appendAdmin }
