function activeNav(nav) {
    let navs = ["funding", "institutes", "students", "admins", "applications"];

    for (let i=0; i < navs.length; i++) {
        if (nav === navs[i]) {
            document.getElementById(`${nav}-nav`)
                    .classList
                    .add("active");
        } else {
            let nav =  document.getElementById(`${navs[i]}-nav`);
            
            if (nav !== null) {
                nav.classList.remove("active");
            }
        }
    }
}


function dropdown() {
    let dropdown = document.getElementById("filter-dropdown");
    let filterSection = document.getElementById("dropdown-icon");

    dropdown.style.display = "block";
    dropdown.style.height="22%";

    dropdown.addEventListener("click", () => {
        dropdown.style.display = "none";
        dropdown.style.height = "0%";
    });
}


function loadInstitutesPage() {
    activeNav("institutes");
    let main = document.getElementById("main-section");
    main.innerHTML = `
        <section id="popup">
        </section> 
        <section id="header">
        </section>
        <section id="add-institute-section">
            <button id="add-institute-button" class="add-button"><i class="fa fa-plus" aria-hidden="true"></i> INSTITUTE</button>
        </section>
        <section id="filter-section">
            <h2>INSTITUTES</h2>
            <a id="dropdown-icon" href="#" onclick="dropdown()">
                <i class="fa fa-sliders fa-2x"></i>
                <ul id="filter-dropdown">
                    <li><a href="#">All</a></li>
                    <li><a href="#">Approved</a></li>
                    <li><a href="#">Rejected</a></li>
                    <li><a href="#">Pending</a></li>
                </ul>
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
    let main = document.getElementById("main-section");
    main.innerHTML = `
        <section id="popup">
        </section> 
        <section id="header">
        </section>
        <section id="add-institute-section">
            <button id="add-funding-button" class="add-button"><i class="fa fa-plus" aria-hidden="true"></i> NEW FUNDING</button>
            <article id="amount">
                <h3>Fund Amount: <span id="fund-amount">R 1 000 000.00</span></h3>
                <h3>Remainning: <span id="remaining-fund">R 2 000.00</span></h3>
            </article>
        </section>
        <section id="filter-section">
            <h2>FUNDED INSTITUTES</h2>
            <a id="dropdown-icon" href="#" onclick="dropdown()">
                <i class="fa fa-sliders fa-2x"></i>
                <ul id="filter-dropdown">
                    <li><a href="#">All</a></li>
                    <li><a href="#">Approved</a></li>
                    <li><a href="#">Rejected</a></li>
                    <li><a href="#">Pending</a></li>
                </ul>
            </a>
        </section>
        <section id="institutes">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Institute</th>
                        <th scope="col">Allocated Amount</th>
                        <th scope="col">Remaining Amount</th>
                        <th scope="col">Financial Date</th>
                    </tr>
                </thead>
                <tbody id="results">
                </tbody>
            </table>
        </section>
    `;
}


function loadStudentsPage() {
    activeNav("students");

    let main = document.getElementById("main-section");
    main.innerHTML = `
        <section id="popup">
        </section>  
        <section id="header" class="students">
        <section id="filter-section">
            <h2>Students Application</h2>
            <a id="dropdown-icon" href="#" onclick="dropdown()">
                <i class="fa fa-sliders fa-2x"></i>
                <ul id="filter-dropdown">
                    <li><a href="#">All</a></li>
                    <li><a href="#">Approved</a></li>
                    <li><a href="#">Rejected</a></li>
                    <li><a href="#">Pending</a></li>
                </ul>
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
    let main = document.getElementById("main-section");
    main.innerHTML = `
        <section id="popup">
        </section> 
        <section id="header">
        </section>
        <section id="add-institute-section">
            <button id="add-admin-button" class="add-button"><i class="fa fa-plus" aria-hidden="true"></i> ADMIN</button>
        </section>
        <section id="filter-section">
            <h2>ADMINS AND REVIEWERS</h2>
        </section>
        <section id="institutes">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Fullname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Active</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody id="results">
                </tbody>
            </table>
        </section>
    `;
}


function loadAddNewAdmin() {
    activeNav("admins");
    let main = document.getElementById("main-section");
    main.innerHTML = `
        <section id="popup">
        </section> 
        <section id="header">
        </section>
        <section id="add-institute-section">

        </section>
        <section id="filter-section">
            <h2>ADD ADMIN</h2>
        </section>
        <form id="add-admin-form">
            <h3>Create new admin user.</h3>
            <article id="name-input-fields">
                <input id="first-name" placeholder="Firstname..." type="text"/>
                <input id="last-name" placeholder="Lastname..." type="text"/>
            </article>
            <input id="phone-number" placeholder="+27731561234" type="text"/>
            <input id="email" placeholder="email" type="email"/>
            <select id="role">
                <option value=2>Admin</option>
                <option value=4>Reviewer</option>
            </select>
            <input type="submit" value="SAVE"/>
        </form>
    `;
}


function loadHeadOfDepartmentFundingPage() {
    activeNav("funding");
    let main = document.getElementById("main-section");
    main.innerHTML = `
        <section id="popup">
        </section> 
        <section id="header">
        </section>
        <section id="add-institute-section">
            <span></span>
            <article id="amount">
                <h3>Fund Amount: <span id="fund-amount">R 1 000 000.00</span></h3>
                <h3>Remainning: <span id="remaining-fund">R 2 000.00</span></h3>
            </article>
        </section>
        <section id="filter-section">
            <h2 id="institute-name"></h2>
        </section>
        <section id="institutes">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Institute</th>
                        <th scope="col">Allocated Amount</th>
                        <th scope="col">Remaining Amount</th>
                        <th scope="col">Financial Date</th>
                    </tr>
                </thead>
                <tbody id="results">
                </tbody>
            </table>
        </section>
    `;
}


function loadHeadOfDepartmentApplicationPage() {
    activeNav("applications");
    let main = document.getElementById("main-section");
    main.innerHTML = `
        <section id="popup">
        </section> 
        <section id="header">
        </section>
        <section id="add-institute-section">
            <button id="add-institute-button" class="add-button"><i class="fa fa-plus" aria-hidden="true"></i> Student Application</button>
        </section>
        <section id="filter-section">
            <h2>Student Applications</h2>
            <a id="dropdown-icon" href="#" onclick="dropdown()">
                <i class="fa fa-sliders fa-2x"></i>
                <ul id="filter-dropdown">
                    <li><a href="#">All</a></li>
                    <li><a href="#">Approved</a></li>
                    <li><a href="#">Rejected</a></li>
                    <li><a href="#">Pending</a></li>
                </ul>
            </a>
        </section>
        <section id="institutes">
            <table>
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Bursary Amount</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody id="results">
                </tbody>
            </table>
        </section>
    `;
}

