import * as Funding from "./js/funding.js"
import * as Applications from "./js/applications.js"
import * as Utils from "./js/admin_dashboard_utility.js";


function loadPage(nav) {
    const navs = ["funding", "applications", "add-application"];

    for (let i = 0; i < navs.length; i++) {
        if (nav == navs[i]) {
            document.getElementById(nav).style.display = 'block';
        } else {
            document.getElementById(navs[i]).style.display = 'none';
        }
    }
}


function logout() {
    window.location.replace("/");
}


// Page set up
document.addEventListener('DOMContentLoaded', function () {
    loadPage("funding");
    Utils.setLoggedInUser();

    let loginDetails = Utils.getLoginDetails();
    Funding.fetchAllInstitutesAllocatedFunds(loginDetails.institute);

    let date = new Date();
    Funding.fetchAllInstitutesAllocatedFunds(loginDetails.institute, date.getFullYear());

    let fundingNav = document.getElementById("funding-nav");
    let applicationsNav = document.getElementById("applications-nav");
    let logoutNav = document.getElementById("logout-nav");

    fundingNav.onclick = (e)=> {
        loadPage("funding");
        Funding.fetchAllInstitutesAllocatedFunds(loginDetails.institute);
        let date = new Date();
        Funding.fetchAllInstitutesAllocatedFunds(loginDetails.institute, date.getFullYear());
    };


    applicationsNav.onclick = (e) => {
        loadPage("applications");
        Applications.fetchAllAppicationsForHOD();

        let addStudentApplication = document.getElementById("add-application-button");
        addStudentApplication.onclick = (e) => {
            loadPage("add-application");
        }
    };

    logoutNav.onclick = (e) => {
        logout();
    };
});



