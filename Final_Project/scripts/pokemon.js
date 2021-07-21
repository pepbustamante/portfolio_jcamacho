function getJSON(url) {
    return fetch(url).then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response.json();
        }
    }).catch(function (error) {
        console.log(error);
    })
}

function catchThemAll() {
    getJSON("https://pokeapi.co/api/v2/pokemon?limit=807&offset=0%22").then(function (data) {
        console.log(data);

        let allList = document.getElementById("allList");
        console.log(data);
        data["results"].forEach(function (value) {
            getJSON(value.url).then(function (pokemon) {
                let item = document.createElement("li");
                let uppercaseName = value.name.charAt(0).toUpperCase() + value.name.slice(1);
                let div = document.createElement("div");
                div.classList.add("pokemonName");
                div.dataset.url = value.url;
                div.innerHTML = `${uppercaseName} <div class="details hide ${value.name}Div">
                                <img class="pkmImg ${value.name}" src="" />
                                </div>`;
                let btn = document.createElement("button");
                btn.innerHTML = `Add ${uppercaseName} to Catched`;
                btn.dataset.pokemon = pokemon.id;
                btn.dataset.pkmName = pokemon.name;
                btn.dataset.url = value.url;
                btn.classList.add("addToCatchedBtn");
/********************************************************************************************************************** */
                item.appendChild(div);
                item.appendChild(btn);
                allList.appendChild(item);

                div.addEventListener("click", showData);
                btn.addEventListener("click", addItToCatched);
                div.querySelector(".pkmImg").addEventListener("click", showExtraDetails)

            });
        });
        console.log("finished JSON");

        if (allList.className.includes("hide")) {
            allList.classList.remove("hide");
        }
    });

}

function showData(event) {
    console.log(event.target.firstElementChild.lastElementChild);
    getPokemonData(event.target.getAttribute("data-url"), event.target.firstElementChild.lastElementChild);
    console.log(event);
    if (event.target.querySelector("div.details").className.includes("hide")) {
        event.target.querySelector("div.details").classList.add("show");
        event.target.querySelector("div.details").classList.remove("hide");
    } else {
        event.target.querySelector("div.details").classList.add("hide");
        event.target.querySelector("div.details").classList.remove("show");
    }
}

function hideData() {
    document.querySelector(".content").classList.add("show");
    document.querySelector(".details").classList.add("hide");
}

function getPokemonData(url, event) {
    getJSON(url).then(function (data) {
        console.log(data);

        event.src = data.sprites.front_default;

        console.log(event);
    });
}

function searchPokemon() {
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();
    let allList = document.getElementById("allList");
    let li = allList.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        let name = li[i];
        let textValue = name.textContent || name.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function addItToCatched(event) {
    console.log(event);
    let catched = [];
    if (localStorage.getItem("catched") !== null) {
        catched = JSON.parse(localStorage.getItem("catched"));
    }

    catched.push({
        name: event.target.dataset.pkmName,
        id: event.target.dataset.pokemon,
        url: event.target.dataset.url
    });

    console.log(catched);
    localStorage.setItem("catched", JSON.stringify(catched));
}

function displayCatchedPkm() {

    document.getElementById("catchedPkmn").classList.add("active");
    document.getElementById("allPokemon").classList.remove("active");

    let catched = JSON.parse(localStorage.getItem("catched"));
    console.log(catched);
    document.getElementById("allList").classList.add("hide");

    let catchedList = document.getElementById("catchedList");
    catchedList.innerHTML = "";
    catchedList.classList.remove("hide");
    document.getElementById("myInput").style.opacity = 0;

    if (catched.length == 0) {
        let item = document.createElement("li");
        let div = document.createElement("div");
        div.innerHTML = "You have no Pokemon catched";
        item.appendChild(div);
        catchedList.appendChild(item);
        return;
    }

    catched.forEach(value => {
        let item = document.createElement("li");
        let uppercaseName = value.name.charAt(0).toUpperCase() + value.name.slice(1);
        let div = document.createElement("div");
        div.classList.add("pokemonName");
        div.dataset.url = value.url;
        div.innerHTML = `${uppercaseName}<div class="details hide ${value.name}Div">
                                <img class="pkmImg ${value.name}" src="" />
                                </div>`;

        let btn = document.createElement("button");
        btn.innerHTML = "X";
        btn.dataset.pokemon = value.name;
        btn.classList.add("removeFromCatched");

        item.appendChild(div);
        item.appendChild(btn);
        catchedList.appendChild(item);


        div.addEventListener("click", showData);
        btn.addEventListener("click", removeFromFavorites);
    });

}


function displayAllPokemon() {
    if (allList.className.includes("hide")) {
        allList.classList.remove("hide");
        catchedList.classList.add("hide");
    }

    document.getElementById("allPokemon").classList.add("active");
    document.getElementById("catchedPkmn").classList.remove("active");

    document.getElementById("myInput").style.opacity = 100;

}

function removeFromFavorites(event) {
    let catched = JSON.parse(localStorage.getItem("catched"));
    console.log("item removed");
    console.log(event.target.attributes[0].value);

    let removeFav = catched.filter(value => !(value && value.name == event.target.attributes[0].value));

    localStorage.setItem("catched", JSON.stringify(removeFav));

    displayCatchedPkm();
}

document.getElementById("allPokemon").addEventListener("click", displayAllPokemon);
document.getElementById("catchedPkmn").addEventListener("click", displayCatchedPkm);
catchThemAll();
