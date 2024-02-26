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

function appendInstituteApplication(data) {
    let fundAmount = document.getElementById("fund-amount");
    let remainingAmount = document.getElementById("remaining-fund");
    let instituteName = document.getElementById("institute-name");

    fundAmount.innerText = `R ${data["allocatedAmount"]}`;
    remainingAmount.innerText = `R ${data["allocatedRemainingAmount"]}`;
    instituteName.innerText = data["instituteName"];
}

export { appendFunds, appendInstituteApplication }
