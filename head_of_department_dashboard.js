function toggleIframe(iframeId) {
    document.getElementById('funding').style.display = 'none';
    document.getElementById('students').style.display = 'none';

    document.getElementById(iframeId).contentDocument.location.reload(true); //reload iframe
    document.getElementById(iframeId).style.display = 'block';
}

function setupPage() {
    document.getElementById('funding').style.display = 'block';
    document.getElementById('students').style.display = 'none';
}

function logout() {
    window.location.replace("/");
}