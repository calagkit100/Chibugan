//variables
































let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
}


menu.onscroll = () => {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
}

document.querySelector('#search-icon').onclick = () => {
    document.querySelector('#search-form').classList.toggle("active");
}

document.querySelector('#close').onclick = () => {
    document.querySelector('#search-form').classList.remove("active");
}

var swiper = new Swiper(".home-slider", {
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

//SCROLL BEHAVIOUR
$(document).ready(function() {
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

//PLUS MINUS BUTTONS CART 
$('.add').click(function() {
    $(this).prev().val(+$(this).prev().val() + 1);
});
$('.sub').click(function() {
    if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val() - 1);
});