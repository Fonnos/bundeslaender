let bundeslaender;
let firstLetters = [];


async function managePage() {
    await getInformationsFromJSON();
    await addInformationsToHTML();
    await getFirstLetters();
    await addFirstLettersToHTML();
}


async function getInformationsFromJSON() {
    let response = await fetch("bundesland.json");
    let bundeslaenderList = await response.json();
    bundeslaender = await bundeslaenderList;
}


async function addInformationsToHTML() {
    let mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = ``;
    for (let i = 0; i < bundeslaender.length; i++) {
        let bundesland = bundeslaender[i];
        let url = bundesland["url"];
        mainContent.innerHTML += `
        <div class="div-bundeslaender">
            <div title="${url}" onclick="window.open('${url}')" id="bundesland${i}" class="bundeslaender">
                    <span>${bundesland["name"]}</span>
                    <span>${bundesland["population"]} Millionen</span>
            </div>
        </div>
        `;
    }
}


async function getFirstLetters() {
    for (let i = 0; i < bundeslaender.length; i++) {
        let bundesland = bundeslaender[i]["name"];
        let firstLetter = bundesland.charAt(0);
        checkLetterEcist(firstLetter);
    }
}


async function checkLetterEcist(firstLetter) {
    await checkFirstLettersIsEmpty(firstLetter);
    let counter = 0;
    for (let i = 0; i < firstLetters.length; i++) {
        let letterInArrey = firstLetters[i];
        if (firstLetter == letterInArrey) {
            console.log(firstLetter + "existiert bereits")
        } else {counter++;}
    }
    if (counter == firstLetters.length) {
        firstLetters.push(firstLetter);
    }
}


async function checkFirstLettersIsEmpty(firstLetter) {
    if (firstLetters.length == 0) {
        firstLetters.push(firstLetter);
    }
}


async function addFirstLettersToHTML() {
    let content = document.getElementById("searchBars");
    content.innerHTML = `
        <div class="letters" onclick="addInformationsToHTML()">
            <span>#</span>
        </div>
    `;
    for (let i = 0; i < firstLetters.length; i++) {
        let firstLetter = firstLetters[i];
        content.innerHTML += `
            <div class="letters" onclick="searchForLetter('${firstLetter}')">
                <span>${firstLetter}</span>
            </div>
        `;   
    }
}


function searchForLetter(currentLetter) {
    let mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = ``;
    for (let i = 0; i < bundeslaender.length; i++) {
        let bundesland = bundeslaender[i];
        let name = bundesland["name"];
        let bundeslandFirstLetter = name.charAt(0);
        let url = bundesland["url"];
        if (bundeslandFirstLetter == currentLetter) {
            mainContent.innerHTML += `
                <div class="div-bundeslaender">
                    <div title="${url}" onclick="window.open('${url}')" id="bundesland${i}" class="bundeslaender">
                        <span>${name}</span>
                        <span>${bundesland["population"]} Millionen</span>
                    </div>
                </div>
        `;
        } 
    }
}



