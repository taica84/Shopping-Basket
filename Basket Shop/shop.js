
 //  ********************************** JQuerry **********************************************




   $('.add-to-cart').click(function(event) {
        event.preventDefault();
        var name = $(this).attr('data-name');
        var price = Number($(this).attr('data-price'));
        

        addItemToCart(name,price,1);
        
        displayCart();
        $("#count-cart").html( countCart() );
        saveCart();
        
    });  

    $('#clear-cart').click(function(event){
        clearCart();
        displayCart()
        
    })




 function displayCart(){
    var cartArray = listCart();
    var output = " ";
    for (var i in cartArray) {
        output += "<div id = 'list-products'>"
        + "<div  class='list-style'><span >"
        +cartArray[i].name
        +"</span>&nbsp; "
        
        + " : items " 
        + "<span>"
        + cartArray[i].count
        +"</span>&nbsp; "
        + " x "
        + "<span>&nbsp; $"
         + cartArray[i].price +"</span>"
        + " = "
        + "<span>&nbsp; $"
        + cartArray[i].total  +"</span><br>"
        + "<button class='plus-item' data-name='"+cartArray[i].name+"'>add</button>"
        + "<button class='minus-item' data-name='"+cartArray[i].name+"'>remove</button>"
        + "<button class ='delete-item' data-name='"+ cartArray[i].name+"' > DELETE </button></div><br><br>"
        + "</div>" ;
    }
        $("#show-cart").html(output);
         $("#count-cart").html( countCart() );
        $("#total-cart").html( totalCart() );
       
};



      $("#show-cart").on("click",".delete-item",function(event){
          var name = $(this).attr("data-name");
          removeItemFromCartAll(name);
          displayCart()
        
    });

      $('#show-cart').on("click",".plus-item",function(event){
          var name = $(this).attr('data-name');
          addItemToCart(name,0,1);
          displayCart();
      });

      $('#show-cart').on("click",".minus-item",function(event){
          var name = $(this).attr('data-name');
          removeItemFromCart(name);
          displayCart();
      });

      $('.add-to-cart').on('click',function(){
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "1500",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          toastr["success"]("item added succefully!")
      })



 //****************************************  Shopping Cart Functions ************************************ 



var cart = [];




var Item = function(name,price,count){
    this.name = name 
    this.price = price
    this.count = count
};  

 function addItemToCart(name,price,count){
       for(var i in cart){
           if(cart[i].name === name) {
               cart[i].count += count;
               saveCart();
               return;
           }
       }

   var item = new Item(name,price,count);
   cart.push(item);
   saveCart();

 };




function removeItemFromCart(name) {  //  Removes 1 item of name from cart
        for(var i in cart){
            if(cart[i].name === name ){
                cart[i].count--;
                if(cart[i].count === 0){
                    cart.splice(i,1);
                }
                break;
            }
        }
        saveCart();
};




 function removeItemFromCartAll(name){ //Removes all items of name from cart.
        for(var i in cart){
            if(cart[i].name === name){
                cart.splice(i,1);
                break;
            }
        }
        saveCart();
 };

 

  function clearCart(){  // remove all the items from cart - empty cart
      cart = [];
      saveCart();
  };

  



  function countCart() {// -> return total count (all items in cart)
        var totalCount = 0;
        for(var i in cart){
            totalCount += cart[i].count;
        }
        return totalCount;
  };
  



 function totalCart() {//-> return total cost (total items price)
       var totalCost = 0;
       
       for(var i in cart){
           totalCost += cart[i].price * cart[i].count;
       }
    return totalCost.toFixed(2);
   
 };


 function listCart() {   //-> array of items
        var cartCopy = [];
        for (var i in cart) {
            var item = cart[i];
            var itemCopy = {};
            for (var p in item){
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2) ;
            cartCopy.push(itemCopy) ;
        }
        return cartCopy;
        
 };

 



    function saveCart() {
        localStorage.setItem('shoppingCart',JSON.stringify(cart))
};
  
  

     function loadCart() {
         cart = JSON.parse(localStorage.getItem('shoppingCart'));
     };

    loadCart();
    //displayCart();


    function submitItems(){
        var countCart = document.getElementById('count-cart');
        if(cart.length > 0){
            alert('YOUR ORDER HAS BEEN SENT') ;
            clearCart();
            displayCart();
        }else{
             alert('No items selected');
     };
  };
    
   document.getElementById('my-basket').addEventListener('click',function(){
       if(cart.length > 0){
           displayCart()
       }else{
           alert("You don't have any items in your basket")
       }
   })

     




     


     
      