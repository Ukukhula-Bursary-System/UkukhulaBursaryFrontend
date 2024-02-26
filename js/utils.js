const apiBaseUrl = "http://localhost:8080"


function isLoggedIn() {
    const loginDetails = getLoginDetails();
    return  loginDetails.userEmail !== null 
            && loginDetails.loginToken !== null
            && loginDetails.role !== null;
}


function saveLoginDetails(token, email, role) {
    localStorage.setItem("loginToken", token);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("role", role)
}


function getLoginDetails() {
    return {
        userEmail: localStorage.getItem("userEmail"),
        loginToken: localStorage.getItem("loginToken"),
        role: localStorage.getItem("role")
    }
}

function redirectAfterLogin(role) {
    if (role == "HOD") {
        //redirect to HOD dashboard
        alert("HOD redirect!");
    } else if (role == "Reviewer") {
        //redirect to Reviewer dashboard
        alert("Reviewer redirect!");
    } else if (role == "Admin") {
        //redirect to admin dashboard
        window.location.replace("/admin_dashboard.html");
    } else {
        alert("Uknown role!");
    }
}
