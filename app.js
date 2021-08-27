search.addEventListener('input',()=>{
    console.log(search.value)
    getData();
})
async function getData(){
    result= await fetch('https://www.superheroapi.com/api/3123593447863947/search/'+search.value)
    console.log(result)
}