
export function appendStudents(data) {
    let results = document.getElementById("results");

    for (let i = 0; i < data.length; i++) {
        let student = data[i];
        results.innerHTML += 
     
        ` <tr>
                <td data-label="FirstName">${student["firstName"]}</td>
                <input type="hidden" value=${student["studentID"]}>
                <td data-label="LastName">${student["lastName"]}</td>
                <td data-label="University">${student["university"]}</td>
                <td data-label="BursaryAmount">R${student["bursaryAmount"]}</td>
                <td data-label="status" class="approved">${student["status"]}</td>
                <td class="viewButton">
                    <a class="viewdetails" href="#"><i class="fas fa-ellipsis-h"></i></a>
                </td>
            </tr>`

    }
}  
