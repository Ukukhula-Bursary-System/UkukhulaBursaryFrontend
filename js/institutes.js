function appendInstitutes(data) {
    let results = document.getElementById("results");

    for (let i = 0; i < data.length; i++) {
        results.innerHTML += `
            <tr>
                <td data-label="Institute">${data[i]["instituteName"]}</td>
                <td data-label="Reviewer">${data[i]["email"]}</td>
                <td data-label="Status" class="approved">${data[i]["status"]}</td>
                <td>
                    <a class="application" href="#">Aplication</a>
                </td>
                <td>
                    <a class="fund" href="#">Fund</a>
                </td>
            </tr>
        `
    }
}

export { appendInstitutes }
