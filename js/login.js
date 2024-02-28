function login(response) {
    fetch(apiBaseUrl + "/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authorization: `Bearer ${response.credential}`
        }
    }).then(res => {
        if (res.status == 403) {
            alert("Invalid login!");
            return;
        } else if (res.status == 500) {
            alert("Server is offline!");
            return;
        } else if (!res.ok) {
            alert("Something went wrong!");
            return;
        }
        return res.json();
    }).then(data => {
        let role = data["authorities"][0]["authority"];
        saveLoginDetails(response.credential, data["user"], data["authorities"][0]["authority"], data["institute"]);
        redirectAfterLogin(role);
    }).catch(error => {
        alert("something went wrong!");
    })
}