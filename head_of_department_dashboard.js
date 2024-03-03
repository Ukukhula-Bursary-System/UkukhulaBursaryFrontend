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

function toggleNav() {
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.hamburger-menu')
    const display = document.querySelector('.data-display')
    if (!nav.classList.contains("open")) {
        menu.style.display = "none"
        if (window.matchMedia("(max-width: 500px)").matches) {
            display.style.display = "none";
        } else {
            display.style.width = "70vw"
        }
    } else {
        menu.style.display = "block"
        display.style.display = 'block'
        display.style.width = "90vw"
    }

    nav.classList.toggle('open');
}

function toggleMobileNav() {
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.hamburger-menu')
    const display = document.querySelector('.data-display')
    if (window.matchMedia("(max-width: 500px)").matches) {
        if (!nav.classList.contains("open")) {
            menu.style.display = "none"
            display.style.display = "none";
        }
        else {
            menu.style.display = "block"
            display.style.display = 'block'
        }
        nav.classList.toggle('open');
    }
}