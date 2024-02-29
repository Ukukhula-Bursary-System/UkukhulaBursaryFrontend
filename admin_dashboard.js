function toggleIframe(iframeId) {
    document.getElementById('institutes').style.display = 'none';
    document.getElementById('funding').style.display = 'none';
    document.getElementById('students').style.display = 'none';
    document.getElementById('admins').style.display = 'none';


    document.getElementById(iframeId).style.display = 'block';
}

function setupPage() {
    document.getElementById('funding').style.display = 'none';
    document.getElementById('admins').style.display = 'none';
    document.getElementById('students').style.display = 'none';
}

function logout() {
    window.location.replace("/");
}