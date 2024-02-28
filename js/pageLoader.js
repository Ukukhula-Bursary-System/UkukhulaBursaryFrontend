function activeNav(nav) {
    let navs = ["funding", "institutes", "students", "admins"];

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
        <section id="header">
        </section>
        <section id="add-institute-section">
            <button id="add-institute-button" class="add-button"><i class="fa fa-plus" aria-hidden="true"></i> ADD INSTITUTE</button>
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
                        <th scope="col">Institute Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Financial Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="results">
                   
                </tbody>
            </table>
        </section>
    `;

    // Add event listener to the add institute button
    document.getElementById("add-institute-button").addEventListener("click", function() {
        // Create institute form
        let instituteForm = `
            <div id="institute-form-overlay">
                <div id="institute-form-container">
                    <span class="close" onclick="closeForm()">&times;</span>
                    <form id="institute-form">
                        <label for="institute-name">Institute Name:</label><br>
                        <input type="text" id="institute-name" name="institute-name" required><br>
                        <label for="email">Email:</label><br>
                        <input type="email" id="email" name="email" required><br>
                        <label for="financial-date">Financial Date:</label><br>
                        <input type="date" id="financial-date" name="financial-date" required><br><br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        `;

        // Append the institute form to the main section
        main.innerHTML += instituteForm;

        // Handle form submission
        document.getElementById("institute-form").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            let instituteName = document.getElementById("institute-name").value;
            let email = document.getElementById("email").value;
            let financialDate = document.getElementById("financial-date").value;

            // Create a new row for the table
            let newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${instituteName}</td>
                <td>${email}</td>
                <td>${financialDate}</td>
                <td><button class="edit-button">Edit</button> <button class="delete-button">Delete</button></td>
            `;

            // Append the new row to the results tbody
            document.getElementById("results").appendChild(newRow);

            // Reset the form
            document.getElementById("institute-form").reset();

            // Add event listeners for edit and delete buttons
            newRow.querySelector('.edit-button').addEventListener('click', function() {
                // Code to handle editing
                // For example, you can populate the form with existing data for editing
                console.log('Edit clicked');
            });

            newRow.querySelector('.delete-button').addEventListener('click', function() {
                // Code to handle deletion
                // For example, you can remove the row from the table
                newRow.remove();
            });
        });
    });
}

// Function to close the institute form
function closeForm() {
    document.getElementById("institute-form-overlay").remove();
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
