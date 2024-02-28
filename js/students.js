
export function appendStudents(data) {
    let results = document.getElementById("results");
    results.innerHTML = "";
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
                    <a  class="viewdetails" href="#"><i class="fa fa-user" aria-hidden="true"></i></a>
                </td>
            </tr>`

    }
}

export function StudentDetailsView(student) {

    let results = document.getElementById("main-section");
    results.innerHTML =
        `
        <section id="header" class="students">
        <section id="filter-section">
            <h2>${student.firstName}  ${student.lastName} Details</h2>
            <a href="#">
                <span class="span">${student.bursaryAmount}</span>
            </a>
        </section>
        <section class="studentDetails">

                  
        <ul class="ulist">
          <li class="listitem" data-label="amount:"><span class="span">${student.bursaryAmount}</span> </li> 
          <li class="listitem" data-label="firstName:">${student.firstName}</li>
          <li class="listitem" data-label="lastName:">${student.lastName}</li>
          <li class="listitem" data-label="university:">${student.university}</li>
          <li class="listitem" data-label="averageMarks:">${student.averageMarks}</li>
          <li class="listitem" data-label="status:">${student.status}</li>
        </ul>
          <article>
              <h2>Motivation</h2>
              <p>
              ${student.motivation}
              </p>
          </article>
        <section class="documentSection">
           <section class="documents">
           <i class="fa fa-file  fa-8x custom-color"></i>
              <h3>Document 1</h3>
              <button class="view"><i class="fa fa-eye fa-2x"></i></button>
              <button class="download" ><i class="fa fa-download fa-2x"></i></button>
          </section>
    
          <section class="documents">
              <i class="fa fa-file custom-color"></i>
              <h3>Document 2</h3>
              <button class="view"><i class="fa fa-eye fa-2x"></i></button>
              <button class="download"><i class="fa fa-download fa-2x"></i></button>
          </section>
    
          <section class="documents">
              <i class="fa fa-file custom-color"></i>
              <h3>Document 3</h3>
              <button class="view"><i class="fa fa-eye fa-2x"></i></button>
              <button class="download"><i class="fa fa-download fa-2x"></i></button>
          </section>
          
        </section>
         <section style="display:flex; justify-content: space-between;">
              <button id="Approve">Approve <i class="fa fa-check fa-2x"></i></button>
              <button id="reject">Reject <i class="fa fa-times fa-2x"></i></button>
          </section>
    </section>`;

    document.getElementById("Approve").addEventListener("click", function () {
        student.status = "Approved";
        alert("under construction student, please try again later!");

    }
    )
    document.getElementById("reject").addEventListener("click", function () {

        student.status = "Rejected";

    }
    )



}  
