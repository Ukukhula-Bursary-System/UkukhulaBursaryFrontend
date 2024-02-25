let apiBaseUrl = "http://localhost:8080";


function isLoggedIn() {
    const loginDetails = getLoginDetails();
    return  loginDetails.userEmail !== null 
            && loginDetails.loginToken !== null
            && loginDetails.role !== null;
}


function getLoginDetails() {
    return {
        userEmail: localStorage.getItem("userEmail"),
        loginToken: localStorage.getItem("loginToken"),
        role: localStorage.getItem("role")
    }
}


function fetchAllInstitutes(statusId) {
    let loginDetails = getLoginDetails();

    apiBaseUrl += "/institute";
    if (statusId !== "" && statusId !== undefined) {
        apiBaseUrl += "/" + statusId;
    }

    fetch(apiBaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authorization: `Bearer ${loginDetails.loginToken}`
        }
    })
}

