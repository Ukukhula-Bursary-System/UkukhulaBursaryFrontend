function appendFunds(data) {
    let results = document.getElementById("results");

    for (let i = 0; i < data.length; i++) {
        results.innerHTML += `
            <tr>
                <td data-label="Institute"><a href="#">${data[i]["instituteName"]}</a></td>
                <td data-label="Allocated Amount">${data[i]["allocatedAmount"]}</td>
                <td data-label="Remaining Amount">${data[i]["allocatedRemainingAmount"]}</td>
                <td data-label="Financial Date">${data[i]["financialDate"]}</td>
            </tr>
        `;
    }
}

export { appendFunds }
