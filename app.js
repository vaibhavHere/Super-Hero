FavId = []
search.addEventListener('change', async () => {
    console.log(search.value)
    output.innerHTML = ''
    result = await getData();
    for (let i = 0; i < result.length; i++) {
        checkFav = `<i class="far fa-heart"></i>`
        if (FavId.includes(result[i].id)) {
            checkFav = checkFav.replace('far', 'fas')
        }
        console.log(checkFav)
        text = `<div heroid=${result[i].id} count=${i} class="card">
<div class="heroimg">
    <img src="${result[i].image.url}" alt="${result[i].name}">
</div>
<div class="text">
    <h1 class="name">
        <h1>${result[i].name}</h1>
        <p>A.K.A ${result[i].biography["full-name"]}</p>
        <p>${result[i].appearance.gender} | ${result[i].appearance.race}</p>
</div>
<div class="btns">
    <button>More..</button>
    ${checkFav}
</div>
</div>`
        output.insertAdjacentHTML('beforeend', text);
    }
    hearticon = Object.values(document.querySelectorAll('.btns i'))
    readMore = Object.values(document.querySelectorAll('.btns button'))
    console.log(readMore)
    for (i = 0; i < readMore.length; i++) {
        readMore[i].addEventListener('click', () => {
        output.innerHTML=''
            console.log(event.path[2].getAttribute('heroid'))
            console.log(result);
            index=event.path[2].getAttribute('count');
            // if (event.target.className == 'far fa-heart') {
            //     FavId.push(event.path[2].getAttribute('heroid'))
            //     event.target.className = 'fas fa-heart'
            // } else {
            //     FavId.pop(event.path[2].getAttribute('heroid'))
            //     event.target.className = 'far fa-heart'
            // }
            console.log(result[index])
            detail=`<div class="left-image">
            <img src="${result[index].image.url}">
        </div>
        <div class="text">
            <h1 name>${result[index].name}<span class='btns'><i class="far fa-heart"></i></span></h1>
            <p>A.K.A ${result[index].biography["full-name"]}</p>
            <h1>Powerstats</h1>
            <div>
                <p class='strength'>Intelligence </p><meter min='0' max='100' value='${result[index].powerstats.intelligence}' low='50'></meter>
            </div>
            <div>
                <p class='strength'>Strength </p><meter min='0' max='100' value='${result[index].powerstats.strength}' low='50'></meter>
            </div>
            <div>
                <p class='strength'>Speed </p><meter min='0' max='100' value='${result[index].powerstats.speed}' low='50'></meter>
            </div>
            <div>
                <p class='strength'>Duarbility </p><meter min='0' max='100' value='${result[index].powerstats.durability}' low='50'></meter>
            </div>
            <div>
                <p class='strength'>Power </p><meter min='0' max='100' value='${result[index].powerstats.power}' low='50'></meter>
            </div>
            <div>
                <p class='strength'>Combat </p><meter min='0' max='100' value='${result[index].powerstats.combat}' low='50'></meter>
            </div>
            <h1>Add-ons</h1>
            <b>Aliases</b>
            </p>${result[index].biography.aliases}</p>
            <p><b>First Appearance</b> World's Finest #111 (Augu${result[index].biography["first-appearance"]}</p>
            <p><b>Publisher</b> ${result[index].biography["publisher"]}</p>
            <p>${result[index].appearance.gender} - ${result[index].appearance.race}</p>
            <p><b>Height</b> ${result[index].appearance.height[0]} - ${result[index].appearance.height[1]}</p>
            <p><b>Weight</b> ${result[index].appearance.weight[0]} - ${result[index].appearance.weight[1]}</p>
            <p><b>Eye Color</b> ${result[index].appearance["eye-color"]=='-'?"Unavailable":result[index].appearance["eye-color"]}</p>
            <p><b>Hair Color</b> ${result[index].appearance["hair-color"]=='-'?"Unavailable":result[index].appearance["hair-color"]}</p>
            <p><b>League</b>
               ${result[index].connections["group-affiliation"]}
            </p>
        </div>`
        console.log(result[index].connections)
            details.insertAdjacentHTML('beforeend',detail)
        })
    }
    console.log(readMore)
    for (i = 0; i < hearticon.length; i++) {
        hearticon[i].addEventListener('click', () => {
            console.log(event.path[2].getAttribute('heroid'))
            if (event.target.className == 'far fa-heart') {
                FavId.push(event.path[2].getAttribute('heroid'))
                event.target.className = 'fas fa-heart'
            } else {
                FavId.pop(event.path[2].getAttribute('heroid'))
                event.target.className = 'far fa-heart'
            }
            console.log(FavId)
        })
    }
})
async function getData() {
    return (await ((await fetch('https://www.superheroapi.com/api.php/3123593447863947/search/' + search.value)).json())).results;
}