function toggleIframe(iframeId) {
    // Hide all iframes
    document.getElementById('institutes').style.display = 'none';
    document.getElementById('funding').style.display = 'none';
    document.getElementById('students').style.display = 'none';
    document.getElementById('admins').style.display = 'none';

    // Show the selected iframe
    document.getElementById(iframeId).style.display = 'block';
}

function setupPage() {
    document.getElementById('funding').style.display = 'none';
    document.getElementById('admins').style.display = 'none';
    document.getElementById('students').style.display = 'none';
}