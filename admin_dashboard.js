function toggleIframe(iframeId) {
    document.getElementById('institutes').style.display = 'none';
    document.getElementById('funding').style.display = 'none';
    document.getElementById('students').style.display = 'none';
    document.getElementById('admins').style.display = 'none';

    document.getElementById(iframeId).contentDocument.location.reload(true); //reload iframe
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

function toggleNav() {
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.hamburger-menu')
    if(!nav.classList.contains("open")) {
        menu.style.display = "none"
    }else {
        menu.style.display = "block"
    }

    nav.classList.toggle('open');
}
