window.onload = main;

function main() {
    var openNavButton = document.getElementById('openNavButton');
    var closeNavButton = document.getElementById('closeNavButton');

    openNavButton.addEventListener('click', openNavBar);
    closeNavButton.addEventListener('click', closeNavbar);
}

function openNavBar() {
    var navbar = document.getElementById('navbarActions');
    console.log(`you tried to open ${navbar}`);
    navbar.style.width = '800px';
}

function closeNavbar() {
    var navbar = document.getElementById('navbarActions');
    console.log(`you trie to close ${navbar}`);
    navbar.style.width = '0';
}