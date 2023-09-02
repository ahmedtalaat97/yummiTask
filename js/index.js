let mealData=document.getElementById('mealData')
let searchPage=document.getElementById('searchPage')

sideNav()


//!============= 
//!============= 

/**
 * !Loading screen animation
 */

$(document).ready(function(){
//  function ready(){
    searchByName('').then(function(){
    $('.loading-screen').fadeOut(600),
    $("body").css("overflow", "visible")
})

})


//!============= 
//!============= 

/**
 * !Side Nav Open
 */
function openNav(){
    $('.sideNav').animate({'left':'0px'},500) ;
    animateLinks();
    $("#openClose").addClass("fa-x");
$("#openClose").removeClass("fa-align-justify");
}
//!============= 
//!============= 

/**
 * !Side Nav Close
 */

function closeNav(){
    $('.sideNav').animate({'left':'-300px'},500) 
    $('.navLinks li').animate({'top':'300px'},500)
    $("#openClose").addClass("fa-align-justify");
$("#openClose").removeClass("fa-x");
}
//!============= 
//!============= 
/**
 * !Animation of links 
 */

function animateLinks(){
    for (let i = 0; i < 5; i++) {
        $(".navLinks li").eq(i).animate({ top: 0}, (i + 5) * 100)
    }
    console.log('working');
}
//!============= 
//!============= 

/**
 * !Side Nav Animation
 */
function sideNav(){
$('#openClose').click(function(){
    if($('.sideNav').css('left')=='0px'){
        closeNav()
    }else{
       openNav()
    }

})
}
//!============= 
//!============= 

/**
 * !C  a   t   e  g  o  r   y
 */

async function getCat(){
    mealData.innerHTML=''
    searchPage.innerHTML=''
    closeNav()
    $('.inner-loading-screen').fadeIn(300);
    
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    res=await res.json()
    console.log(res);
    displayCat(res.categories)
    $('.inner-loading-screen').fadeOut(300);

}

function displayCat(e){
    let cartona=``
    for(let i=0;i<e.length;i++){

        cartona+=` <div class="col-md-3">
        <div onclick="getCatMeals('${e[i].strCategory}')" class="meal overflow-hidden position-relative rounded-2 cursor-pointer">
            <img src="${e[i].strCategoryThumb}" class="w-100" alt="">
            <div class="layer position-absolute text-center text-black p-2">
                <h3>${e[i].strCategory}</h3>
                <p>${e[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
            </div>
        </div>
       
    </div>
        
        `
    }
mealData.innerHTML=cartona
}
$('#Categories').click(function(){
    getCat()
})
 async function getCatMeals(e){
mealData.innerHTML=''
$('.inner-loading-screen').fadeIn(300);

closeNav()
    
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`)
    res= await res.json()
    displayMeals(res.meals.slice(0,20))
    $('.inner-loading-screen').fadeOut(300);
    
}

/**
 * ! END OF   C  a   t   e  g  o  r   y
 */


/**
 * ! Display M E A L S
 */

function displayMeals(e){
    mealData.innerHTML=''
  
    let cartona =''
    for(let i=0;i<e.length;i++){

        cartona+=` <div class="col-md-3">
        <div onclick="getMealDet(${e[i].idMeal})" class="meal overflow-hidden position-relative rounded-2 cursor-pointer">
            <img src="${e[i].strMealThumb}" class="w-100" alt="">
            <div class="layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${e[i].strMeal}</h3>
                
            </div>
        </div>
       
    </div>
        
        `

    }
    
    mealData.innerHTML=cartona
    


}

/**
 * !END OF    Display M E A L S
 */

/**
 * ! Meal Deatails 
 */

async function getMealDet(e){
    mealData.innerHTML=''
    $('.inner-loading-screen').fadeIn(300);
    closeNav()
    searchPage.innerHTML=''

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`);
    res = await res.json();

    displayMealDet(res.meals[0])

$('.inner-loading-screen').fadeOut(300);

}

function displayMealDet(meal){

    let ingredients=''

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    
    let tags = meal.strTags
    if(tags){
        tags=meal.strTags.split(',')
    }else{
        tags=[]
    }
   
    

    let tagsContainer = ''
    for (let i = 0; i < tags.length; i++) {
        tagsContainer += `
        <li class="alert alert-danger m-2 p-2 fw-bolder cursor-pointer ">${tags[i]}</li>`
    }
 
    let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${tagsContainer}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
            mealData.innerHTML=cartona
}
/**
 * !END OF    Meal Deatails 
 */


/**
 * ! A     R     E     A
 * ! A     R     E     A
 */

async function getArea(){
    mealData.innerHTML=''
    searchPage.innerHTML=''
    closeNav()
    $('.inner-loading-screen').fadeIn(300);
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)

    res= await res.json()
    displayArea(res.meals)
    $('.inner-loading-screen').fadeOut(300);
}

function displayArea(area) {
    let cartona = "";

    for (let i = 0; i < area.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>
        `
    
}
mealData.innerHTML=cartona
}
$('#Area').click(function(){
    getArea()
})

async function getAreaMeals(area){
    mealData.innerHTML=''
    $('.inner-loading-screen').fadeIn(300);
    closeNav()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    res = await res.json()
    displayMeals(res.meals.slice(0,20))
    $('.inner-loading-screen').fadeOut(300);
}
/**
 * !END OF    A     R     E     A
 * !END OF   A     R     E     A
 */




/**
 * ! Ingredients
 */
async function getIng(){
mealData.innerHTML=''
searchPage.innerHTML=''
closeNav()
$('.inner-loading-screen').fadeIn(300);
let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
res= await res.json()
console.log(res.meals.slice(0,20));
displayIng(res.meals.slice(0,20))
$('.inner-loading-screen').fadeOut(300);

}

function displayIng(ing){
    let cartona=''
    for(let i=0;i<ing.length;i++){
    cartona +=`
    <div class="col-md-3">
    <div onclick="getIngMeals('${ing[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${ing[i].strIngredient}</h3>
            <p>${ing[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
</div>
`
}
mealData.innerHTML=cartona
}

$('#Ingredients').click(function(){
    getIng()
})

async function getIngMeals(ing){
    mealData.innerHTML=''
    
    closeNav()
    $('.inner-loading-screen').fadeIn(300);
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    res=await res.json()
    displayMeals(res.meals.slice(0,20))
    $('.inner-loading-screen').fadeOut(300);
}


/**
 //!  END OF   Ingredients
 */




/**
 * ! S E A R C H
 */

function showSearchPage(){
    
    closeNav()
    
    mealData.innerHTML=''
  searchPage.innerHTML=`<div class="row py-4 animate__animated animate__backInLeft">
  <div class="col-md-6 ">
      <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
  </div>
  <div class="col-md-6">
      <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
  </div>
</div>`
    


}

$('#Search').click(()=>{showSearchPage()})

async function searchByName(name){
    console.log(name);
    
    mealData.innerHTML=''
    $('.inner-loading-screen').fadeIn(300);
    closeNav()
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    res=await res.json()
    if(res.meals){
        displayMeals(res.meals)
    }else{
        displayMeals([])
    }
    $('.inner-loading-screen').fadeOut(300);
}

async function searchByFLetter(letter){

   
    mealData.innerHTML=''
    $('.inner-loading-screen').fadeIn(300);
    closeNav()
if(letter==''){
    letter='a'
}
    let res =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    res=await res.json()

 if(res.meals){
        displayMeals(res.meals)
    }else{
        displayMeals([])
    }
    $('.inner-loading-screen').fadeOut(300);
}


/**
 * ! END OF    S E A R C H
 */


/**
 * !   C O N T A C T 
 */



$('#ContactUs').click(()=>contactPage())

//! CONTACT PAGE
function contactPage(){
    searchPage.innerHTML=''
    closeNav()
    mealData.innerHTML=`
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center animate__animated animate__backInLeft">
    <form>
    <div class="container w-75 text-center">
    
        <div class="row g-4">
            
            <div class="col-md-6">
                
                <input id="nameInput" onkeyup="inputValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none animate__animated animate__headShake">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none animate__animated animate__headShake">
                    Email not valid *example@ggg.ccc
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none animate__animated animate__headShake">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none animate__animated animate__headShake">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none animate__animated animate__headShake">
                    Enter valid password *It must not contain any whitespace.
                    It must contain at least one uppercase, one lowercase and one numeric character one special character[~!@#$%^&*()--+={}[]|\:;"'<>,.?/_₹] Length must be between 10 to 16 characters.*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none animate__animated animate__headShake">
                    Enter a valid repassword 
                </div>
            </div>
        </div>
        <button id="subBtn" disabled class="btn btn-outline-danger px-3 mt-5 fs-5">Submit</button>
    </div>
    </form>
</div>
    `


}
//! VALIDATION REGEX FUNC

function nameValidation(){
    let reg=/^[a-zA-Z ]+$/
    return (reg.test(document.getElementById('nameInput').value))
}

function emailValidation(){

    let reg=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return (reg.test(document.getElementById("emailInput").value))

}
function phoneValidation(){
    let reg=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return(reg.test(document.getElementById("phoneInput").value))
}
function ageValidation(){
    let reg=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    return(reg.test(document.getElementById("ageInput").value))
}
function passwordValidation(){
    let reg=/^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{10,16}$/
    return(reg.test(document.getElementById('passwordInput').value))

}
function repassValidation(){
    return (document.getElementById('repasswordInput').value == document.getElementById('passwordInput').value)
}

//! MAIN VALIDATION FUNC
function inputValidation(){

if(nameValidation()==true ||(document.getElementById("nameInput").value)=='' ){

    document.getElementById("nameAlert").classList.replace("d-block", "d-none")
    

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }

if(emailValidation()==true ||(document.getElementById("emailInput").value)==''){

    document.getElementById("emailAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
        }
if(phoneValidation()==true ||(document.getElementById("phoneInput").value)==''){

    document.getElementById("phoneAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }
if(ageValidation()==true ||(document.getElementById("ageInput").value)==''){

    document.getElementById("ageAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
if(passwordValidation()==true ||(document.getElementById("passwordInput").value)==''){

    document.getElementById("passwordAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
        }
if(repassValidation()==true ||(document.getElementById("repasswordInput").value)==''){

    document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
        }



        if((nameValidation()&&ageValidation()&&emailValidation()&&phoneValidation()&&passwordValidation()&&repassValidation())==true){
            document.getElementById('subBtn').removeAttribute('disabled')
        }else{
            document.getElementById('subBtn').setAttribute('disabled',true)
        }



}


/**
 * ! END OF  C O N T A C T 
 */
