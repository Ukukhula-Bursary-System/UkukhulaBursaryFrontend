function login(response) {
    try {
        fetch(apiBaseUrl + "/authentication/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${response.credential}`
            }
        }).then(res => {
            return handleErrorResponse(res, "login")
        }).then(data => {
            if (data !== undefined) {
                let role = data["authorities"][0]["authority"];
                saveLoginDetails(response.credential, data["user"], data["authorities"][0]["authority"], data["institute"]);
                redirectAfterLogin(role);
            }
        }).catch(error => {
            showMessage(error.message, "error");
        })
    } catch(error) {
        showMessage(error, "error");
    }
}


function redirectAfterLogin(role) {
    if (role.toLowerCase()  == "hod") {
        //redirect to HOD dashboard
        window.location.replace("/head-of-department-dashboard");
    } else if (role.toLowerCase() == "reviewer") {
        //redirect to Reviewer dashboard
        window.location.replace("/reviewer-dashboard");
    } else if (role.toLowerCase()  == "admin") {
        //redirect to admin dashboard
        window.location.replace("/admin-dashboard");
    } else {
        showMessage("Unknown role!", "error");
    }
}
