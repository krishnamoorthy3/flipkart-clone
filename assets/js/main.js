$("#header").load("/common/header.html")
$("#footer").load("/common/footer.html");
$("#popAddtoCart").load("/common/addtocart.html")

//  Nav Toggle btn
// $(".nav-togglemob-btn").on("click", function () {
//     $(".nav-toggle-wrapper").addClass("nav-mob-display-n");
// });
// $(".nav-mob-close").on("click", function () {
//     $(".nav-toggle-wrapper").removeClass("nav-mob-display-n");
// });
function mobileshownav() {
    $(".nav-toggle-wrapper").addClass("nav-mob-display-n");
}
function mobileremovenav() {
    $(".nav-toggle-wrapper").removeClass("nav-mob-display-n");
}


/*==========================
    Index page banner  Carosule
=============================*/

let swiperindexpage = new Swiper("#SwiperC", {
    slidesPerView:1,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar"
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

/*==========================
    Fashion Sec Carosule
=============================*/
//Cart quantity Start
let obj = {};
function addToCart(pid) {
    fetch("/product/product.json")
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == pid) {
                    obj =data[i]
                    // Retrieve existing cart data from local storage
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    // Check if the item already exists in the cart
                    const existingItemIndex = cart.findIndex(item => item.id === obj.id);
                    if (existingItemIndex > -1) {
                            cart[existingItemIndex].quantity += 1;
                    } else {
                        // Item does not exist, add new item
                        obj.quantity=1 
                        cart.push(obj);
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                    productsInCart()
                    display()
                    break;
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching product data:', error);
        });

}
function productsInCart() {
    let cartdata = JSON.parse(localStorage.getItem("cart"))
    if(cartdata==null){
        document.getElementById("heatercart-count").innerHTML =0
    }else{
        document.getElementById("heatercart-count").innerHTML = cartdata.length 
    }
}
//Cart quantity End
// WishList Start
let wish = {}
function addTowishlist(data) {
    fetch("/product/product.json")
        .then((res) => res.json())
        .then((result) => {
            for(let i=0;i<result.length;i++){
                if(result[i].id==data){
                    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                    let indexof = wishlist.findIndex((val) => val.id == data);
                    if(indexof<0){
                        $(`#${data}`).addClass("wishcolor")
                        wishlist.push(result[i])
                        localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    }else{
                        $(`#${data}`).removeClass("wishcolor")
                        wishlist= wishlist.filter((val) => val.id !== data);
                        localStorage.setItem("wishlist", JSON.stringify(wishlist));
                        console.log(location.pathname);
                    }
                    productsInwishlist()
                    break
                }
                
            }
        })
        .catch((error) => {
            console.error('Error fetching product data:', error);
        });
}

function productsInwishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"))

    
    if(wishlist==null){
        document.getElementById("wishlistcount").innerHTML =0
    }else{
        document.getElementById("wishlistcount").innerHTML = wishlist.length
    }
}





function display(){
    $("#popaddcart").removeClass("paddcdnone")
    setTimeout(() => {
        $("#popaddcart").addClass("paddcdnone")
    }, 2000);
}

function removepopup(){
    $("#popaddcart").addClass("paddcdnone")
}


