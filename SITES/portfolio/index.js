window.onload = main;

function main() {
    hideAllTabs();
    deactivateTabItems();
    openMainPage();

    var aboutButton = document.getElementById("aboutButton");
    aboutButton.onclick = showAboutSection;
    
    var homeButton = document.getElementById("homeButton");
    homeButton.onclick = showMainPage;
}

function showAboutSection() {
    var aboutSection = document.getElementById("aboutSection");
    var tabContents = document.getElementsByClassName("tabContent");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    aboutSection.style.display = "block"
}

function showMainPage() {
    var mainPage = document.getElementById("mainPage");
    var tabContents = document.getElementsByClassName("tabContent");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    mainPage.style.display = "block"
}

function assignHomeButton() {
    homeButton = document.getElementById("homeButton");
    homeButton.onclick = () => {
        openPage("homeButton");
    }
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