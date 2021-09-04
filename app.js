const output = document.getElementById('output'),
    outputContainer = document.getElementById('outputContainer'),
    favTitle = document.getElementById('favTitle')
var FavId,tempFav;

if (localStorage.getItem('FavId'))
FavId = localStorage.getItem('FavId');
else
localStorage.setItem('FavId', JSON.stringify([]));
FavId = JSON.parse(localStorage.getItem('FavId'))

function copy(element){
    temp=[];
    for(i=0;i<element.length;i++)
    temp.push(element[i])
    return temp;
}


fav.onclick = () => {
    reset();
    search.value=''
    tempFav=copy(FavId)
    displayCards(FavId, output, "fav")
    if (FavId == '')
        favTitle.innerHTML = "You don't have any Favs :("
    else
        favTitle.innerHTML = "Your Favs :)"

}

search.onchange = async () => {
    reset();
    try {
        result = await getData();
    } catch (error) {
        output.insertAdjacentHTML('beforeend', error);
    }
    if (result)
        displayCards(result, output);
    else
        output.insertAdjacentHTML('beforeend', `<div class="oops"><h1>Not found :(</h1><img src='assets/img/oops.png'></div>`);
    console.log(result)
}

// FUNCTIONS
getData = async () => (await ((await fetch('https://www.superheroapi.com/api.php/3123593447863947/search/' + search.value)).json())).results;

isFav = result => {
    if(FavId!=''){
    for (j = 0; j < FavId.length; j++) {
        if (FavId[j].id == result.id)
            return `<i class="fas fa-heart"></i>`
    }
}
else
    return `<i class="far fa-heart"></i>`
}

reset = () => output.innerHTML = details.innerHTML = favTitle.innerHTML = ''

displayCards = (element, target, mode) => {
    reset();
    for (let i = 0; i < element.length; i++) {
        checkFav = isFav(element[i]);
        text = `<div heroid=${element[i].id} count=${i} class="card"><div class="heroimg"><img src="${element[i].image.url}" alt="${element[i].name}"></div><div class="text"><h1 class="name"><h1>${element[i].name}</h1><p>A.K.A ${element[i].biography["full-name"]}</p><p>${element[i].appearance.gender} | ${element[i].appearance.race}</p></div><div class="btns"><button>More..</button>${checkFav}</div></div>`
        target.insertAdjacentHTML('beforeend', text);
    }

    hearticon = Object.values(document.querySelectorAll('.btns i'))
    for (i = 0; i < hearticon.length; i++) {
        hearticon[i].onclick = () => {
            if (event.target.className == 'far fa-heart') {
                FavId.push(result[event.path[2].getAttribute('count')])
                event.target.className = 'fas fa-heart'
                localStorage.setItem('FavId', JSON.stringify(FavId))
            } else {
                id = event.path[2].getAttribute('heroid')
                for (i = 0; i < FavId.length; i++) {
                    if (FavId[i].id == id)
                        FavId.splice(i, 1)
                }
                localStorage.setItem('FavId', JSON.stringify(FavId))
                event.target.className = 'far fa-heart'
            }
        }
    }

    // readMore();
    readMore = Object.values(document.querySelectorAll('.btns button'))

    for (i = 0; i < readMore.length; i++) {
        readMore[i].onclick = () => {
            reset();
            index = event.path[2].getAttribute('count')
            if (mode == 'fav'){
                displayDetail(tempFav[index])
            }
            else
                displayDetail(result[index])
        }
    }
}


displayDetail = (element) => {
    text = `<div class="left-image"><img src="${element.image.url}">
        </div><div class="text"><h1 name>${element.name}</h1>
            <p>A.K.A ${element.biography["full-name"]}</p><h1>Powerstats</h1><div><p class='strength'>Intelligence </p><meter min='0' max='100' value='${element.powerstats.intelligence}' low='50'></meter></div><div><p class='strength'>Strength </p><meter min='0' max='100' value='${element.powerstats.strength}' low='50'></meter></div><div><p class='strength'>Speed </p><meter min='0' max='100' value='${element.powerstats.speed}' low='50'></meter></div><div><p class='strength'>Duarbility </p><meter min='0' max='100' value='${element.powerstats.durability}' low='50'></meter></div><div><p class='strength'>Power </p><meter min='0' max='100' value='${element.powerstats.power}' low='50'></meter></div><div><p class='strength'>Combat </p><meter min='0' max='100' value='${element.powerstats.combat}' low='50'></meter></div><h1>Add-ons</h1><b>Aliases</b></p>${element.biography.aliases}</p><p><b>First Appearance</b> World's Finest #111 (Augu${element.biography["first-appearance"]}</p><p><b>Publisher</b> ${element.biography["publisher"]}</p><p>${element.appearance.gender} - ${element.appearance.race}</p><p><b>Height</b> ${element.appearance.height[0]} - ${element.appearance.height[1]}</p><p><b>Weight</b> ${element.appearance.weight[0]} - ${element.appearance.weight[1]}</p><p><b>Eye Color</b> ${element.appearance["eye-color"]=='-'?"Unavailable":element.appearance["eye-color"]}</p><p><b>Hair Color</b> ${element.appearance["hair-color"]=='-'?"Unavailable":element.appearance["hair-color"]}</p><p><b>League</b>${element.connections["group-affiliation"]}</p></div>`
    details.insertAdjacentHTML('beforeend', text)
}