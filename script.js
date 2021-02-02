window.onload = main;

function main() {
    hideAllTabs();
    deactivateTabItems();
    openMainPage();
}

function assignHomeButton() {
    homeButton = document.getElementById("homeButton");
    homeButton.onclick = () => {
        openPage("homeButton");
    }
}

function hideAllTabs() {
    let tabContents = document.getElementsByClassName("tabContent");
    for (let content of tabContents) {
        content.style.display = "none";
    }
}

function deactivateTabItems() {
    let tabItems = document.getElementsByClassName("tabItem");
    for (let item of tabItems) {
        item.className = item.className.replace(" active", "");
    }
}

function openTab(clickEvent, tabName) {
    document.getElementById(tabName).style.display = "block";
    clickEvent.currentTarget.className += " active";
}

function openMainPage() {
    document.getElementById("mainPage").style.display = "block";
}