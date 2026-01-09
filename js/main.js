var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCat=document.getElementById("productCat");
var productDesc=document.getElementById("productDesc");
var productImage=document.getElementById("productImage");
var row=document.getElementById("row");
var addBtn=document.getElementById("addBtn");
var UpdateBtn=document.getElementById("updateBtn");
var productSearch=document.getElementById("productSearch");
var CatSearch=document.getElementById("CatSearch");
var validationError=document.getElementById("validationError");
var emptyError=document.getElementById("emptyError");


 var globalTerm;
 var catTerm;
var globalIndex;
var productList;
if(localStorage.getItem("productList")){
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList)
}else{
    productList=[]
}
function addProduct(){
    if (checkEmptyFileds()){
    if( productNameValidation()){
    
     var Product ={
     name:productName.value,
     price:productPrice.value,
     cat:productCat.value,
     desc:productDesc.value,
     image:productImage.files[0].name,
     }
    
     productList.push(Product);
     displayProduct(productList);
    //  clearInputs()
    saveToLocalStorage()
}else{
    console.log("error");
    
}
  
    }

}

function displayProduct(Plist){
    
    if(Plist.length >0){
    var cartoona="";
    for(var i=0 ; i<Plist.length ;i++ ){
        cartoona+=` <div class="col-md-3 ">
         <img src="imgs/${Plist[i].image}"  class="w-100 my-2" alt="1">
         <p>product Name:${globalTerm? Plist[i].name.toLowerCase().replace(globalTerm ,`<span class="bg-warning fw-bolder">${globalTerm}</span>`) : Plist[i].name}</p>
         <p>product Price:${Plist[i].price}</p>
         <p>product Category:${catTerm? Plist[i].cat.toLowerCase().replace(catTerm ,`<span class="bg-warning fw-bolder">${catTerm}</span>`) : Plist[i].cat}</p>
         <p>product Description:${Plist[i].desc}</p>
         <button onclick="setFormToUpdate(${i})" class="btn btn-outline-success w-100 my-1">Update</button>
         <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 my-1">Delete</button>


                </div>`
    }
 row.innerHTML =cartoona;
}else{
    row.innerHTML=`<div class="alert alert-danger p-5 my-5 text-center fw-bolder"> Not Match Founded</div>`
}
    
}

function clearInputs(){
    productName.value= null;
    productPrice.value= null;
    productCat.value= null;
    productDesc.value= null;


}
function deleteProduct(index){
    console.log(index);
    productList.splice(index ,1);
    
    displayProduct(productList);
    saveToLocalStorage()
    
    
}
function saveToLocalStorage(){
    localStorage.setItem("productList" ,JSON.stringify(productList))

}
 function setFormToUpdate(index){
    console.log(index);
    globalIndex=index;
    productName.value=productList[index].name
    productPrice.value=productList[index].price
    productCat.value=productList[index].cat
    productDesc.value=productList[index].desc
    addBtn.classList.add("d-none")
    UpdateBtn.classList.remove("d-none")
    
    
 }
 function updateProduct(){
    console.log("hiii", globalIndex);
    productList[globalIndex].name=productName.value;
    productList[globalIndex].price=productPrice.value;  
    productList[globalIndex].cat=productCat.value;
    productList[globalIndex].desc=productDesc.value;
    displayProduct(productList);
    saveToLocalStorage() 
    addBtn.classList.remove("d-none")
    UpdateBtn.classList.add("d-none")
    
 }
//  function to searh product name
 function searchProductName(){
var term =productSearch.value;
globalTerm=term;

var searchList=[]
for(var i=0 ; i< productList.length; i++){
    if(productList[i].name.toLowerCase(). includes(term.toLowerCase())){
        console.log("founded" ,i, productList[i]);
        searchList.push(productList[i]);
        console.log(searchList);
        displayProduct(searchList);
    }else{

    }
    
    displayProduct(searchList)
}

    
 }




 function searchCat(){
var term =CatSearch.value;
catTerm=term;
var catList=[]
for(var i=0 ; i< productList.length; i++){
    if(productList[i].cat.toLowerCase(). includes(term.toLowerCase())){
        console.log("founded" ,i, productList[i]);
        catList.push(productList[i]);
        displayProduct(catList);  
        

        
    }else{
       
    }
    displayProduct(catList)
}

    
 }
 //(regular Expression) regex product name//

function productNameValidation(){
    var regex=/^[A-Z][a-z]{3,8}$/;
    if (regex.test(productName.value)){
        console.log("yes");
    validationError.classList.replace("d-block" , "d-none")
    productName.classList.add("is-valid")
    productName.classList.remove("is-invalid")
      emptyError.classList.add("d-none")
          return true;

        
    }else{
        console.log("no  ");
        validationError.classList.replace("d-none" , "d-block")
        productName.classList.add("is-invalid")
         productName.classList.remove("is-valid ")
           emptyError.classList.add("d-none")
           return false;

        
    }
}

function checkEmptyFileds(){
    if (productPrice.value === ""){
        emptyError.classList.remove("d-none")
            validationError.classList.replace("d-block" , "d-none")
            return false;


    }else{
  emptyError.classList.add("d-none")
emptyError.classList.replace("d-block", "d-none")
return true;


    }

}

