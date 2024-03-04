function toggleIframe(event, iframeId) {
    document.getElementById('institutes').style.display = 'none';
    document.getElementById('funding').style.display = 'none';
    document.getElementById('students').style.display = 'none';
    document.getElementById('admins').style.display = 'none';
    const activeIframe = document.getElementById(iframeId)
    const activeElement = event.target

    activeIframe.contentDocument.location.reload(true);
    activeIframe.style.display = 'block';
    let outermostParent = activeElement;
    while (outermostParent.tagName.toLowerCase() !== 'section') {
        outermostParent = outermostParent.parentElement;
    }

    document.querySelector('.active').classList.remove("active");
    outermostParent.classList.add("active");
}

function setupPage() {
    document.getElementById('funding').style.display = 'none';
    document.getElementById('admins').style.display = 'none';
    document.getElementById('students').style.display = 'none';
}

function logout() {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");
    localStorage.removeItem("institute");
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