function appendApplications(data) {
    let results = document.getElementById("results");

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


export { appendApplications }
