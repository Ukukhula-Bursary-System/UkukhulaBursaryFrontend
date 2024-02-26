let apiBaseUrl = "http://localhost:8080";


function isLoggedIn() {
    const loginDetails = getLoginDetails();
    return  loginDetails.userEmail !== null 
            && loginDetails.loginToken !== null
            && loginDetails.role !== null
            && loginDetails.role.toLowerCase() === "admin";
}


function setLoggedInUser() {
    let user = document.getElementById("logged-user");
    let loginDetails = getLoginDetails();
    user.innerText = loginDetails.userEmail;
}


function redirectToLoginPage() {
    window.location.replace("/");
}


function ifNotloggedInRedirectToLoginPage() {
    if (!isLoggedIn()) {
        redirectToLoginPage()
    } else {
        setLoggedInUser()
    }
}


function getLoginDetails() {
    return {
        userEmail: localStorage.getItem("userEmail"),
        loginToken: localStorage.getItem("loginToken"),
        role: localStorage.getItem("role")
    }
}


function showMessage(message, status) {
    let popup = document.getElementById("popup");

    if (popup.classList !== null) {
        popup.classList.remove("success");
        popup.classList.remove("error");
    }

    if (status === "error") {
        popup.classList.add("error");
    } else {
        popup.classList.add("success");
    }

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);

    popup.innerText = message;
    popup.style.display = "block";
}

export { apiBaseUrl, getLoginDetails, ifNotloggedInRedirectToLoginPage, showMessage }
