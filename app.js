let searchbtn = document.querySelector(".dish-btn");
let searchInpt = document.querySelector(".dish-input");
let mainContent = document.querySelector(".main_content");
let popUp = document.querySelector(".pop-up");
let itemImg;
let contentPreview = document.querySelector(".content-preview");



let fetche = (meal)=>{
    let ingredients = "";
    for(let i =1 ; i<=20 ; i++){
       let returne = meal[`strIngredient${i}`];
        if(returne) {
            let measure = meal[`strMeasure${i}`];

            ingredients += `<li>${measure} of ${returne}</li>`;
    }
        else return ingredients;
        }

}

let popUpList = (meal)=>{
    popUp.innerHTML = `
    <i class="fa-regular fa-circle-xmark"></i>
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul>${fetche(meal)}</ul>
    <h3>Recipe</h3>
    <p>${meal.strInstructions}</p>
    <h3><a href=${meal.strYoutube}>Click Here to watch on youtube</a></h3>`;
    let crossBtn = document.querySelector(".fa-regular");
    crossBtn.addEventListener("click",()=>{
        popUp.classList.remove("block");
    })
    
}

let fetchReq = async (query)=>{
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        let response = await data.json();
        console.log(response);
        return response.meals;    
}

let meals = (meal)=>{
    
        // console.log(meal.strMealThumb);
        itemImg = document.createElement("div");
        itemImg.classList.add("content-div");
        itemImg.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h1>${meal.strMeal}</h1>
        <h2>Origin ${meal.strArea}
        <h3>category : <b> ${meal.strCategory}</b></h3>`;
        let recepieBtn = document.createElement("button");
        recepieBtn.textContent = "View receipe";
        recepieBtn.classList.add("dish-btn");
        itemImg.appendChild(recepieBtn);
        mainContent.appendChild(itemImg);
        recepieBtn.addEventListener("click",()=>{
            popUp.classList.add("block");
            popUpList(meal);
        })
}

searchbtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    let searchQuery = searchInpt.value;
    mainContent.innerHTML = "<h1>Fetching data...</h1>";
    let response = await fetchReq(searchQuery);
    if(response == null) {
        mainContent.innerHTML = `<h1>Sorry No Result Found ...</h1>`;
        return;
    }
    mainContent.innerHTML = "";
    for(let meal of response){
        meals(meal);
    }
})

let starting = async ()=>{
    mainContent.innerHTML = "<h1>Fetching data...</h1>";
    let response = await fetchReq("");
    if(response == []) mainContent.innerHTML='<h1>No data found</h1> <i class="fa-solid fa-face-sad-tear"></i>'
    mainContent.innerHTML = "";
    for(let meal of response){
        meals(meal);
    }
}
starting();