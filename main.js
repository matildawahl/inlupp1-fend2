document.getElementById("loadBtn").addEventListener("click", loadFromAPI); 
document.getElementById("loadCart").addEventListener("click", showCart); 


/*The function to load/get all products from API*/
function loadFromAPI() { 
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products/");
  xhr.send();


  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText)
      render(data);
    }
  };
}

/*The function for how the products will show on my site*/
function render(products) { 

  let output = `<h1 class="display-1 d-flex justify-content-center">PRODUCTS</h1>
  <table style="marigin-top:500px" class="table table-striped">
  
  `
  products.forEach((p) => output +=
    ` 
  <tr>     
  <td><img src=${p.image} style="max-height : 500px; max-weight : 500px"></td>
  <td><p color=black>${p.title}:<br>${p.description}</p></td>
  <td><p>Price: <span style="color: #262626;">${p.price}:-</span></p><td>  
  <div><button class="btn btn-outline-dark " onClick="addToCart(${p.id})">  Buy Now  </button></div>   
  </tr>   

  
    
   
  `);
  output +=
    `</table>
`;
  document.getElementById("allproducts").innerHTML = output;
}

/*The function that adds to my cart(localStorage)*/

function addToCart(id) { 
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://fakestoreapi.com/products/${id}`);
  xhr.send();


  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let cart = []
      if (localStorage.getItem("shoppingcart")) {
        cart = JSON.parse(localStorage.getItem("shoppingcart"))
      }
      cart.push(JSON.parse(xhr.responseText))
      localStorage.setItem("shoppingcart", JSON.stringify(cart));
    }

  };

}

/*The function to show all products that is put in the cart/localStorage*/
function showCart() { 
  const productsInCart = JSON.parse(localStorage.getItem("shoppingcart"))

  let output = `<h1 class="display-1 d-flex justify-content-center">CART</h1>
  <table class="table table-striped">`;

  if (productsInCart) {

    productsInCart.forEach(p => {

      output += `
        <tr>     
        <td><img src=${p.image} style="max-height : 300px; min-height : 300px"></td>
        <td><h3>${p.title}</h3></td>  
        <td><p class="price_text">Price<span style="color: #262626;">${p.price}</span></p><td>    
        </tr>
      `;
    });

  }

  output += `</table>

  <div class="container">
    <div class="row">
        <div class="col-md-12 bg-light text-right">
            <button type="button" class= "btn-lg btn-success"><a onclick="showForm()" href="#">Checkout<a></button>
            <button class="btn-lg btn-danger rounded shadow-lg" id="loadDelete"" class="btn btn-warning">Delete All</button>
        </div>
    </div>
</div>


  
 
    `
  document.getElementById("allproducts").innerHTML = output;
  document.getElementById("loadDelete").addEventListener("click", deleteAllProd);

}

/*The function to show the form you have to fill in to ordet products!*/
function showForm(){  
  let output = `<form action="#" name="myForm">
  <table cellspacing = "2" cellpadding = "2" border = "1">
     
     <tr>
        <td align = "right">Name</td>
        <td><input type="text" name = "name" />
        <label class="text-small text-uppercase text-danger" id="nameValidation"></label>
        </td>
     </tr>
     
     <tr>
        <td align = "right">Email</td>
        <td><input type="text" name="email" />
        <label class="text-small text-uppercase text-danger" id="emailValidation"></label>
        </td>
     </tr>
     
     <tr>
        <td align = "right">Address</td>
        <td><input type="text" name="address" />
        <label class="text-small text-uppercase text-danger" id="addressValidation"></label>
        </td>
     </tr>
     <tr>
        <td align = "right">Phone</td>
        <td><input type="text" name="phone" />
        <label class="text-small text-uppercase text-danger" id="phoneValidation"></label>
        </td>
     </tr>
     
     <tr>
        <td align = "right">Country</td>
        <td><input type="text" name="country" />
        <label class="text-small text-uppercase text-danger" id="countryValidation"></label>
        </td>
     </tr>
     <tr>
     </tr>

     
     <tr>
        <td align = "right"></td>
        <td><a onClick="validateForm()" href="#">Submit</a></td>
     </tr>
     
  </table>
</form>   `;
document.getElementById("allproducts").innerHTML = output;
}


/*Function to validate the form(you can't leave anything blank)*/
function validateForm() { 

    let customerName = document.forms["myForm"]["name"].value;
    let customerAdress = document.forms["myForm"]["address"].value;
    let customerEmail = document.forms["myForm"]["email"].value;                     
    let customerPhoneNumber = document.forms["myForm"]["phone"].value;
    let country = document.forms["myForm"]["country"].value;

    if (customerName == "") {
        let output = "Firstname must be filled out"
        document.getElementById("nameValidation").innerHTML = output;
    }
    if (customerAdress == "") {
        let output = "Address must be filled out"
        document.getElementById("addressValidation").innerHTML = output;
    }
    if (customerEmail == "") {
        let output = "Email must be filled out"
        document.getElementById("emailValidation").innerHTML = output;
    }
    if (customerPhoneNumber == "") {
        let output = "Phone must be filled out"
        document.getElementById("phoneValidation").innerHTML = output;
    }
    if (country == "") {
        let output = "Country must be filled out"
        document.getElementById("countryValidation").innerHTML = output;
    }
    else {
        showConfirmation()
     } 
        
    
}

/*This function shows you that your order is done and allows you go back to the first page if you want*/
function showConfirmation(){ 
  let output = `<h4>Tack för din order! :)</h4>
  <a href="index.html">Tillbaka till shop!</a>`
  document.getElementById("allproducts").innerHTML = output;
  deleteAllProd();
}



function deleteAllProd() {
  localStorage.clear(); 

}