function activeNav(nav) {
    let navs = ["funding", "institutes", "students", "admins"];

    for (let i=0; i < navs.length; i++) {
        if (nav === navs[i]) {
            document.getElementById(`${nav}-nav`)
                    .classList
                    .add("active");
        } else {
            document.getElementById(`${navs[i]}-nav`)
                    .classList
                    .remove("active");
        }
    }
}


function loadInstitutesPage() {
    activeNav("institutes");
    let main = document.getElementById("main-section");
    main.innerHTML = `
        <section id="header">
        </section>
        <section id="add-institute-section">
            <button id="add-institute-button"><i class="fa fa-plus" aria-hidden="true"></i> INSTITUTE</button>
        </section>
        <section id="filter-section">
            <h2>INSTITUTES</h2>
            <a href="#">
                <i class="fa fa-sliders fa-2x"></i>
            </a>
        </section>
        <section id="institutes">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Institute</th>
                        <th scope="col">Reviewer</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="results">
                   
                </tbody>
            </table>
        </section>
    `;
}


function loadFundingPage() {
    activeNav("funding");
}


function loadStudentsPage() {
    activeNav("students");

    let main = document.getElementById("main-section");
    main.innerHTML =`
        <section id="header" class="students">
        <section id="filter-section">
            <h2>Students Application</h2>
            <a href="#">
                <i class="fa fa-sliders fa-2x"></i>
            </a>
        </section>
        <section id="students">
            <table>
                <thead>
                    <tr>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">University</th>
                        <th scope="col">BursaryAmount</th>
                        <th scope="col">status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="results">

                </tbody>
            </table>
        </section>
    `;
}


function loadAdminsPage() {
    activeNav("admins");

  
}
