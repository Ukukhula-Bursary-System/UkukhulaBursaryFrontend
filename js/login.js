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