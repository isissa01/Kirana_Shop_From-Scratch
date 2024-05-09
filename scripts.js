class Product{
    constructor(id,name, price, image){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = 0;

    }
    getProductTotal(){
        return this.price * this.quantity
    }
    
}
class Cart{
    constructor(){
        this.items ={}
        this.total = 0.0;
        this.cashReceived =0.0;

    }
    addProductToCart(product ) {
        if( this.items[product.id] == undefined){
            
            
            product.quantity +=1;
            
            
            this.items[product.id] = product;



        }
    
        this.getCartTotal();
        updateShoppingCart()
        
    }
    increaseQuantity(productId){
        let cartProduct = this.items[productId] ;
        cartProduct.quantity +=1;
        this.items[productId] = cartProduct
        this.getCartTotal();
        updateShoppingCart()
    }

    decreaseProductQuantity(productId){
        if( this.items[productId].quantity == 1){
            
            this.removeProductFromCart(productId);

        }
        else{
            let cartProduct = this.items[productId] 
            cartProduct.quantity -=1;
            this.items[productId] = cartProduct;
            
        }
        this.getCartTotal()

        updateShoppingCart()
        
    }

    removeProductFromCart(productId){
        this.items[productId].quantity=0;
        delete this.items[productId] ;
        
        this.getCartTotal();
        updateShoppingCart()
    }

    
    getCartTotal(){
        let total = 0;
        for (let key in this.items){
            // console.log(this.items[key])

            total += this.items[key].getProductTotal();
        }

        this.total = total;
        

       
    }
    clearShop(){
        for (key in this.items){
            this.items[key].quantity=0;
        }
        this.items = {};
        this.total = 0;
        this.cashReceived = 0;
        updateShoppingCart();



    }
}

const cart = new Cart();
const apple = new Product("001","Apple", 5.0, "assets/apple.png");
const banana = new Product("002","Banana", 4.50, "assets/banana.png");
const strawberry = new Product("003","Strawberry", 8.75, "assets/strawberry.png");

let productList = [apple, banana , strawberry]



const productsElement = document.querySelector("#products");


const shoppingCartElement = document.querySelector("#shopping-cart");
shoppingCartElement.innerHTML = "";
const cartTotalElement = document.querySelector(".cart-total");
cartTotalElement.innerHTML = cart.total;
const cashReceivedElement = document.querySelector('.cash-received');
cashReceivedElement.innerText = 0;
const totalCashReceivedElement = document.querySelector('.total-cash-received');
totalCashReceivedElement.innerText = cart.cashReceived.toFixed(2);

const remaingBalanceElement = document.querySelector(".remaining-balance")
remaingBalanceElement.innerText = (cart.total - cart.cashReceived).toFixed(2);

const cashReturnedElement = document.querySelector('.cash-returned');
cashReturnedElement.innerText = 0;
cartInputElement = document.querySelector('.input-cash-received');


const payMoreElement = document.querySelector(".pay-more");
const clearCartButton = document.querySelector(".clear-cart");
clearCartButton.addEventListener("click", ev =>{
    cart.clearShop();
    checkBalance();
    cashReceivedElement.innerHTML = 0;
    cartInputElement.value = "";
    

})


const generateProducts = () => {
    productsElement.innerHTML ="";
    productList.map(product =>{
        // console.log(product)
        
        let productElement = document.createElement("div");
        productElement.className = "product card";
        let imageElement = document.createElement("img");
        imageElement.src = product.image;
        imageElement.className = "product-image";
        let h3Element = document.createElement('h3');
        h3Element.innerText = product.name;
        h3Element.className = "product-name";
        let priceElement = document.createElement('p');
        priceElement.className = "product-price";
        priceElement.innerText = `Price: $${product.price.toFixed(2)}`;
        let addButton = document.createElement('button');
        addButton.className="add-to-cart";
        addButton.innerText = "Add To Cart";
        addButton.addEventListener("click",ev =>{
            cart.addProductToCart( product)
        });
    
        productElement.appendChild(imageElement);
        productElement.appendChild(h3Element);
        productElement.appendChild(priceElement);
        productElement.appendChild(addButton);
    
    
        // console.log(productsElement)
    
        productsElement.appendChild(productElement)
    })
}


generateProducts()

function updateShoppingCart(){
    shoppingCartElement.innerHTML ="";
    if(cart.items){
        for (key in cart.items){
            let item = cart.items[key];
        
            let itemElement = document.createElement("div");
            itemElement.className = "cart-product";
            let h3Element = document.createElement('h3');
            h3Element.innerText = item.name;
            h3Element.className = "product-name";
        
            let priceElement = document.createElement('p');
            priceElement.className = "product-price";
            priceElement.innerText = `Price: $${item.price.toFixed(2)}`;
        
            let quantityElement = document.createElement('p');
            quantityElement.className = "product-quantity";
            quantityElement.innerText = `Quantity: ${item.quantity}`;
            
            let totalElement = document.createElement('p');
            totalElement.className = "cart-item-total";
            totalElement.innerText = `Total: $${item.getProductTotal().toFixed(2)}`;
        
            itemElement.appendChild(h3Element);
            itemElement.appendChild(priceElement);
            itemElement.appendChild(quantityElement);
            itemElement.appendChild(totalElement);
        
        
            let buttonsElement = document.createElement('div');
            buttonsElement.className = "cart-item-buttons";
        
        
            let addButton = document.createElement('button');
            addButton.className="add-to-quantity";
            addButton.innerText = "+";
            addButton.addEventListener("click",ev =>{
                cart.increaseQuantity( item.id)
            });
        
            let decreaseButton = document.createElement('button');
            decreaseButton.className="decrease-from-quantity";
            decreaseButton.innerText = "-";
            decreaseButton.addEventListener("click",ev =>{
                cart.decreaseProductQuantity( item.id)
            });
        
            let removeButton = document.createElement('button');
            removeButton.className="remove-item";
            removeButton.innerText = "Remove";
            removeButton.addEventListener("click",ev =>{
                cart.removeProductFromCart( item.id)
            });
        
            buttonsElement.appendChild(addButton)
            buttonsElement.appendChild(decreaseButton)
            buttonsElement.appendChild(removeButton)
            itemElement.appendChild(buttonsElement)
        
            shoppingCartElement.appendChild(itemElement)
        
        
        
        
        }

        cartTotalElement.innerHTML = cart.total.toFixed(2);
        totalCashReceivedElement.innerText = cart.cashReceived.toFixed(2);
        remaingBalanceElement.innerText = (cart.total - cart.cashReceived).toFixed(2);
        
    }
    checkBalance();


}




function addToCashReceived(event){
    event.preventDefault();
    

    let received = event.target.elements.cashReceived.value;
    event.target.elements.cashReceived.value = 0;
    var regex=/^\d*\.?\d*$/;
    if (!received.match(regex) || received == "")
    {
        let errorInputElement = document.querySelector(".error");
        if(!errorInputElement){
            errorInputElement = document.createElement("p");
            errorInputElement.className ="error";
            errorInputElement.innerHTML="Input a valid amount"
            cartInputElement.parentElement.parentElement.appendChild(errorInputElement)
        }
        

    }
    else{
        received = parseFloat(received);
        cashReceivedElement.innerText = received.toFixed(2);
        cart.cashReceived += received;
        updateShoppingCart();
        
        checkBalance();
        let errorInputElement = document.querySelector(".error");
        if(errorInputElement){
            errorInputElement.parentElement.removeChild(errorInputElement)
        }
        
        


    }
    
}

function checkBalance(){
    if(cart.total - cart.cashReceived <= 0){
        cashReturnedElement.innerHTML = Math.abs(cart.total - cart.cashReceived).toFixed(2)
        remaingBalanceElement.innerHTML = 0;
        payMoreElement.style.display = "none";
    }
    else {
        payMoreElement.style.display = "inherit";
        cashReturnedElement.innerHTML = 0;
    }
}
function createProduct(event){
    // document.querySelector(".create-product-container").style.display = "none";
    const data = event.target.elements;
    console.log(event.target.elements)
    const imgUrl = URL.createObjectURL(data.image.files[0])
    const product = {
        name: data.productName.value,
        productId: data.productId.value,
        price: Number( data.productPrice.value),
        image: imgUrl
    }

    const newProduct = new Product(product.productId, product.name, product.price, product.image)
    productList.push(newProduct)
    generateProducts()
    console.log(product)


    document.querySelector(".create-product-container").style.display = "none";
    event.target.reset()
}

cancelButton = document.querySelector(".cancel");
cancelButton.addEventListener("click", cancel)
function cancel(){
    document.querySelector(".create-product-container").style.display = "none";
}


addProductButton = document.querySelector(".add-product");
addProductButton.addEventListener("click", () =>{
    document.querySelector(".create-product-container").style.display = "flex";
})