
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
                    <a  class="viewdetails" href="#"><i class="fa-solid fa-user"></i></a>
                </td>
            </tr>`

    }


  
    }  
   
export function StudentDetailsView(data){

        let results = document.getElementById("results");
        results.innerHTML =
        `<section class="studentDetails">
      
        <ul>
          <li data-label="amount:"><span>R125,000.00</span> </li> 
          <li data-label="firstName:">Janela</li>
          <li data-label="lastName:">Dreini</li>
          <li data-label="university:">University of Cape Town</li>
          <li data-label="averageMarks:">70</li>
          <li data-label="bursaryAmount:">125000.0000</li>
          <li data-label="status:">Pending</li>
        </ul>


        <!-- article of the motivation -->
          <article>
              <h2>Motivation</h2>
              <p>
              I am a hardworking student who is passionate about my studies. I am currently in my second year of a Bachelor of Science degree in Computer Science at the University of Cape Town. I have maintained an average of 70% in my first year and I am confident that I will continue to perform well in my second year. I am in need of financial assistance to cover my tuition fees and living expenses. I am applying for this bursary to help me achieve my academic goals and to alleviate the financial burden on my family. I am committed to my studies and I am determined to succeed in my academic pursuits. I believe that this bursary will provide me with the support I need to excel in my studies and to pursue a successful career in the field of computer science. I am grateful for your consideration and I hope to be given the opportunity to receive this bursary.
              </p>
          </article>


        <!-- three sections not divs with displayed vertical in a flex box with large document icons -->
        <section class="documentSection">
           <section class="documents">
              <i class="fas fa-file-alt fa-8x"></i>
              <h3>Document 1</h3>
              <button class="view"><i class="fas fa-eye fa-2x"></i></button>
              <button class="download" ><i class="fas fa-download fa-2x"></i></button>
          </section>

          <section class="documents">
              <i class="fas fa-file-alt fa-8x"></i>
              <h3>Document 2</h3>
              <button class="view"><i class="fas fa-eye fa-2x"></i></button>
              <button class="download"><i class="fas fa-download fa-2x"></i></button>
          </section>

          <section class="documents">
              <i class="fas fa-file-alt fa-8x"></i>
              <h3>Document 3</h3>
              <button class="view"><i class="fas fa-eye fa-2x"></i></button>
              <button class="download"><i class="fas fa-download fa-2x"></i></button>
          </section>
          <section>
              <button id="Approve">Approve <i class="fas fa-check fa-2x"></i></button>
              <button id="reject">Reject <i class="fas fa-times fa-2x"></i></button>
          </section>
        </section> 
  </section>`
}  
