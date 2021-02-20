window.onload = init;

// Close the dropdowns if the user clicks outside the dropdowns
window.onclick = function(event) {
    if (!event.target.matches('#categoryButton') && !event.target.matches('#slotsButton')) {
        var dropdowns = document.getElementsByClassName('dropdown');
        for (let dropdown of dropdowns) {
            if (!dropdownIsHidden(dropdown)) {
                hideDropdown(dropdown);
            }
        }
    } 
}

var mobileImageSources = [
    "img/home_exterior.png",
    "img/home_interior.png"
];

function init() {
    var dropdownButtons = document.getElementsByClassName("dropdownButton")
    var dropdownItems = document.getElementsByClassName("dropdownItem");
    var skipButton = document.getElementById("prevButton");


    hideAllDropdowns();

    // Attach callbacks to each of the dropdown buttons
    for (let button of dropdownButtons) {
        button.onclick = toggleDropdownVisibility
    }

    // Attach callbacks to each of the dropdown items
    for (let item of dropdownItems) {
        item.onclick = changeDropdownButtonLabel;
    }

    skipButton.onclick = toggleImageSource;
    
}

function hideAllDropdowns() {
    var dropdowns = document.getElementsByClassName("dropdown");
    for (let dropdown of dropdowns) {
        dropdown.classList.add("hidden");
    }
}

// Toggle the dropdown's visibility
function toggleDropdownVisibility(event) {
    var categoriesDropdown = document.getElementById('categoriesDropdown');
    var slotsDropdown = document.getElementById('slotsDropdown');
    var clickedDropdown;

    if (event.target.matches('#categoryButton')) {
        if (!dropdownIsHidden(slotsDropdown)) {
            hideDropdown(slotsDropdown)
        }
        clickedDropdown = document.getElementById('categoriesDropdown');
    } else if (event.target.matches('#slotsButton')) {
        if (!dropdownIsHidden(categoriesDropdown)) {
            hideDropdown(categoriesDropdown)
        }
        clickedDropdown = document.getElementById('slotsDropdown');
    }

    if (dropdownIsHidden(clickedDropdown)) {
        showDropdown(clickedDropdown);
    } else {
        hideDropdown(clickedDropdown);
    }
}

// Returns true if a dropdown is hidden
function dropdownIsHidden(dropdown) {
    return dropdown.classList.contains("hidden");
}

function showDropdown(dropdown) {
    dropdown.classList.remove("hidden");
    dropdown.classList.add("shown");
}

function hideDropdown(dropdown) {
    dropdown.classList.remove("shown");
    dropdown.classList.add("hidden");
}

function changeDropdownButtonLabel(event) {
    var clickedItem = event.target;
    var clickedItemText = clickedItem.innerHTML;
    var categoriesButton = document.getElementById("categoryButton");
    var slotsButton = document.getElementById("slotsButton");

    if (clickedItem.matches('.categoriesDropdownItem')) {
        categoriesButton.innerHTML = clickedItemText;
    } else if (clickedItem.matches('.slotsDropdownItem')) {
        slotsButton.innerHTML = clickedItemText
    }
}

function toggleImageSource() {
    var exteriorImage = document.getElementById('exteriorImage');
    if (exteriorImage.getAttribute('src') == mobileImageSources[0]) {
        exteriorImage.setAttribute('src', mobileImageSources[1]);
    } else {
        exteriorImage.setAttribute('src', mobileImageSources[0]);
    }
}