const apiBaseUrl = "https://ukukhulabbdbursaryapi.onrender.com";


function isLoggedIn(role) {
    const loginDetails = getLoginDetails();
    return  loginDetails.userEmail !== null 
            && loginDetails.loginToken !== null
            && loginDetails.role !== null
            && loginDetails.role.toLowerCase() === role.toLowerCase();
}


function setLoggedInUser() {
    let user = document.getElementById("logged-user");
    let loginDetails = getLoginDetails();
    user.innerText = loginDetails.userEmail;
}


function redirectToLoginPage() {
    window.location.replace("/");
}


function ifNotloggedInRedirectToLoginPage(role) {
    role = role === undefined ? "admin" : role;

    if (!isLoggedIn(role)) {
        redirectToLoginPage()
    } else {
        setLoggedInUser()
    }
}


function getLoginDetails() {
    return {
        userEmail: localStorage.getItem("userEmail"),
        loginToken: localStorage.getItem("loginToken"),
        role: localStorage.getItem("role"),
        institute: localStorage.getItem("institute")
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


function handleErrorResponse(response) {
    if (response.status == 403 || response.status == 401) {
        showMessage("Please login!", "error");
        redirectToLoginPage();
        return;
    } else if (response.status == 500) {
        showMessage("Server is offline!", "error");
        return;
    } else if (response.status == 204) {
        return;
    } else if (!response.ok) {
        showMessage("Something went wrong!", "error");
        return;
    }
    return response.json();
}

export { apiBaseUrl, getLoginDetails, ifNotloggedInRedirectToLoginPage, showMessage, handleErrorResponse, setLoggedInUser }
