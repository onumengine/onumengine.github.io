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

// This array will store the x-coordinates of a swipe gesture when there is a swipe on the home image
var arrayOfXCoordinates = [];

function init() {
    var dropdownButtons = document.getElementsByClassName("dropdownButton")
    var dropdownItems = document.getElementsByClassName("dropdownItem");
    var selectorImages = document.getElementsByClassName("selectableItem");
    var homeImage = document.getElementById('exteriorImage');


    hideAllDropdowns();

    // Attach callbacks to each of the dropdown buttons
    for (let button of dropdownButtons) {
        button.onclick = toggleDropdownVisibility
    }

    // Attach callbacks to each of the dropdown items
    for (let item of dropdownItems) {
        item.onclick = changeDropdownButtonLabel;
    }

    for (let image of selectorImages) {
        image.onclick = onSelectorClick;
    }

    homeImage.addEventListener('touchstart', addTouchEventListeners, false);

    //setTimeout(checkWindowResolution, 2000);
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

/*
function toggleImageSource() {
    var exteriorImage = document.getElementById('exteriorImage');
    if (exteriorImage.getAttribute('src') == mobileImageSources[0]) {
        exteriorImage.setAttribute('src', mobileImageSources[1]);
        return;
    } else {
        exteriorImage.setAttribute('src', mobileImageSources[0]);
        return;
    }
}
*/

function moveToNextImage() {
    var exteriorImage = document.getElementById('exteriorImage');
    var imgSrc = exteriorImage.getAttribute('src');
    var indexOfSource = mobileImageSources.indexOf(imgSrc);
    
    if ((indexOfSource + 1) < mobileImageSources.length) { // Move to the next image only if the current src isn't the last in the mobileImageSources array
        exteriorImage.setAttribute('src', mobileImageSources[indexOfSource+1]);
    }
}

function moveToPreviousImage() {
    var exteriorImage = document.getElementById('exteriorImage');
    var imgSrc = exteriorImage.getAttribute('src');
    var indexOfSource = mobileImageSources.indexOf(imgSrc);

    if ((indexOfSource - 1) >= 0) { // Move to the previous image only if the current src isn't the first in the mobileImageSources array
        exteriorImage.setAttribute('src', mobileImageSources[indexOfSource-1]);
    }
}

/*
function checkWindowResolution() {
    if (window.outerWidth <= 592) {
        var interval = setInterval(toggleImageSource, 3000);
    } else {
        clearInterval(interval);
    }
}
*/

// This method displays a border by applying the class 'bordered' to its event target
function addBorder(event) {
    var selectedImage = event.target;
    selectedImage.classList.add('bordered');
}

// This method removes a border from an element by removing the class 'bordered' from its event target
function removeBorder(event) {
    var unselectedImage = event.target;
    unselectedImage.classList.remove('bordered');
}

// This method removes borders from all selectorImages
function removeSelectorBorders() {
    var selectorImages = document.getElementsByClassName("selectableItem");
    for (let image of selectorImages) {
        image.classList.remove('bordered');
    }
}

// This method changes the image on display by replacing the src of the large image with the src of
// the selected selector
function matchImageSrcWithSelectorSrc(event) {
    var homeImage = document.getElementById('exteriorImage');
    var selectedItem = event.target;
    var newImageSource = selectedItem.getAttribute('src');

    homeImage.setAttribute('src', newImageSource);
}

function onSelectorClick(event) {
    removeSelectorBorders();
    addBorder(event);
    matchImageSrcWithSelectorSrc(event);
}

function addTouchEventListeners(event) {
    var startCoordsX = event.targetTouches[0].clientX;
    arrayOfXCoordinates.push(startCoordsX);
    
    document.body.addEventListener('touchmove', handleTouchMove, false);
    document.body.addEventListener('touchend', handleTouchEnd, false);
}

function removeTouchEventListeners() {
    document.body.removeEventListener('touchmove', handleTouchMove, false);
    document.body.removeEventListener('touchend', handleTouchEnd, false);
}

function handleTouchMove(event) {
    var xCor = event.targetTouches[0].clientX;
    arrayOfXCoordinates.push(xCor);
}

function handleTouchEnd() {
    var swipeLength = getSwipeDistance()
    if (userSwipedRight(swipeLength)) {
        console.log('you swiped right');
        requestAnimationFrame(moveToNextImage);
    } else if (userSwipedLeft(swipeLength)) {
        console.log('you swiped left');
        requestAnimationFrame(moveToPreviousImage);
    }
    // clear the array for performance benefits
    arrayOfXCoordinates.length = 0;
    removeTouchEventListeners();
}

function getSwipeDistance() {
    return (arrayOfXCoordinates[arrayOfXCoordinates.length - 1] - arrayOfXCoordinates[0]);
}

function userSwipedRight(distance) {
    return distance < 0;
}

function userSwipedLeft(distance) {
    return distance > 0;
}