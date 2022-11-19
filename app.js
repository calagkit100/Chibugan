//variables

//Hamburger id
let menu = document.querySelector("#menu-bars");

// Classlist link container
let navbar = document.querySelector(".navbar");

//search variables
let searchIcon = document.querySelector('#search-form');

//CART DOWN VARIABLES
let cartDown = document.querySelector("#cart-down");
let productDown = document.querySelector("#products");

//SELECT ELEMENTS
const productEl = document.querySelector(".products");
const dishesEl = document.querySelector(".box-container");
const itemListEl = document.querySelector(".item-list");
const subTotalEl = document.querySelector('#title-purchases');
const totalItemsInCartEl = document.querySelector(".cart-items-down-container");




menu.onclick = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
}

menu.onscroll = () => {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
}

searchIcon.onclick = () => {
    searchIcon.classList.toggle("active");
    // console.log(searchIcon);
}

cartDown.onclick = () => {
    productDown.classList.toggle("active")
    cartDown.classList.toggle("fa-times")
}

//SLIDER

var swiper = new Swiper(".home-slider", {
    spaceBetween: 150,
    centeredSlides: true,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 140,
    centeredSlides: true,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    breakpoints: {
        0: {
            slidePerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

//BUTTON RIPPLE

function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    };

    button.appendChild(circle);
};

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
    button.addEventListener("click", createRipple);
};









// ADD ITEMS IN CART FUNCTIONS --------------------------


//RENDER PRODUCTS

function renderProducts() {

    products.forEach((product) => {
        dishesEl.innerHTML += `
        <div class="box">
                <div class="see-container">
                    <a href="#" class="fas fa-heart"></a>
                    <a href="#" class="fas fa-eye"></a>
                </div>
                <img src="${product.imgSrc}">
                <h3>${product.name}</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <span>PHP ${product.price}</span>
                <a href="#dishes" class="btn1" onclick="addToCart(${product.id})">add to cart</i></a>
            </div>
        `;
    });
};

renderProducts();

//Cart Array
let cart = JSON.parse(localStorage.getItem("CART"));

updateCart();

//ADD TO CART
function addToCart(id) {

    //check if product already exist in array
    if (cart.some((item) => item.id === id)) {
        changeNumberofUnits("plus", id)
    } else {
        const item = products.find((product) => product.id === id)

        cart.push({
            ...item,
            numberOfUnits: 1
        });
    }

    updateCart();

}

//update cart

function updateCart() {
    renderCartItems();
    renderSubtotal();

    //Save cart item to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}


//calculate and render subtotal

function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subTotalEl.innerHTML = `<div class="title-purchases" id="title-purchases">
    <h1>Subtotal(${totalItems} items): PHP ${totalPrice.toFixed(2)}</h1>
</div>`;
    totalItemsInCartEl.innerHTML = `<p>${totalItems}</p>`;
};


//render cart items

function renderCartItems() {
    //clear cart duplicate element
    itemListEl.innerHTML = "";

    cart.forEach((item) => {
        itemListEl.innerHTML += `
        <div class="item-list-container">
                    <div class="product-image">
                        <img src="${item.imgSrc}">
                    </div>
                    <div class="title-discription">
                        <h1>${item.name}</h1>
                    </div>
                    <div class="price-cart">
                        <h3>${item.price}</h3>
                    </div>
                    <div id="field1" class="field1">
                        <span id="sub" class="sub" onclick="changeNumberofUnits('minus', ${item.id})"><h1>-</h1></span>
                        <input type="text" id="1" value="${item.numberOfUnits}" class="field" />
                        <span id="add" class="add" onclick="changeNumberofUnits('plus', ${item.id})"><h1>+</h1></span>
                    </div>
                    <div class="uncart-container" onclick="removeItemFromCart(${item.id})">
                        <i class="fa fa-cart-arrow-down"></i>
                    </div>
                </div>
        `;
    });
};

//Remove items from cart

function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}


//change number of units for an item

function changeNumberofUnits(action, id) {
    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && numberOfUnits < item.instock) {
                numberOfUnits++;
            };
        };

        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
};