//jshint esversion: 6

window.onload = main;

function main() {
    hideAllTabs();
    deactivateTabItems();
    openMainPage();

    var aboutButton = document.getElementById("aboutButton");
    aboutButton.onclick = showAboutSection;
    
    var homeButton = document.getElementById("homeButton");
    homeButton.onclick = showMainPage;

    var resumeButton = document.getElementById("resumeButton");
    resumeButton.onclick = closeNavbar;
    
    var openNavbarButton = document.getElementById('openNavbarButton');
    openNavbarButton.onclick = openNavbar;

    var hireMeButton = document.querySelector('#hireMeButton');
    hireMeButton.onclick = showContactForm;
}

function assignHomeButton() {
    homeButton = document.getElementById("homeButton");
    homeButton.onclick = () => {
        openPage("homeButton");
    };
}

function closeNavbar() {
    console.log('you are trying to close the navbar');
    var navbar = document.getElementById('navbar');
    navbar.style.width = '0';
}

function deactivateTabItems() {
    let tabItems = document.getElementsByClassName("tabItem");
    for (let item of tabItems) {
        item.className = item.className.replace(" active", "");
    }
}

function hideAllTabs() {
    let tabContents = document.getElementsByClassName("tabContent");
    for (let content of tabContents) {
        content.style.display = "none";
    }
}

function openMainPage() {
    document.getElementById("mainPage").style.display = "block";
}

function openTab(clickEvent, tabName) {
    document.getElementById(tabName).style.display = "block";
    clickEvent.currentTarget.className += " active";
}

function openNavbar() {
    console.log('you are trying to open the navbar');
    var navbar = document.getElementById('navbar');
    navbar.style.width = '70%';
}

function showAboutSection() {
    console.log('you clicked about');
    var aboutSection = document.getElementById("aboutSection");
    var tabContents = document.getElementsByClassName("tabContent");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    aboutSection.style.display = "block";
}

function showContactForm() {
    var contactForm = document.querySelector('#contactFormDiv');
    contactForm.style.display = block;
}

function showMainPage() {
    var mainPage = document.getElementById("mainPage");
    var tabContents = document.getElementsByClassName("tabContent");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    mainPage.style.display = "block";
}