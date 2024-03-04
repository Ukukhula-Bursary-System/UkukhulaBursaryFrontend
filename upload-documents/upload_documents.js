document.addEventListener('DOMContentLoaded', function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let token = urlParams.get('token');

    if (token == undefined) {
        alert("Invalid token!");
    } else {
        let form = document.getElementById("document-form");

        form.onsubmit = (e) => {
            e.preventDefault();
            let api = apiBaseUrl + "/student/document-upload/" + token;
            const submitter = document.getElementById("upload-btn");
            
            const formData = new FormData(form, submitter);
            for (var [key, value] of formData.entries()) { 
                console.log(key, value);
            }

            fetch(api, {
                method: "POST",
                body: formData
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                alert(data["message"]);
            }).catch(error => {
                console.log(error);
                alert(error.message)
            });
        }
    }
    console.log(token);
});