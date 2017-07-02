$(document).ready(function() {
    $('#history').click(function(event){
      event.preventDefault();
      console.log("history clicked");
    });
    $('#cart').on('click',"#buyItem",function(event){
      event.preventDefault();
      var name = $.trim($(this).closest(".item").find(".caption h4").html());
      var desc = $.trim($(this).closest(".item").find(".caption p").html());
      var price = $.trim($(this).closest(".item").find(".row p").html());
      var id = $.trim($(this).closest(".item").find(".row p").attr("val"));
      console.log(name+id);
      $.ajax({
        method: 'POST',
        url: '/cart/buy',
        data: 
          JSON.stringify({ "itemBought": name, "description":desc, "price":price, "id":id }),
        contentType: "application/json",
        dataType: "json",
        success:function(data){
        console.log("GET success response "+data.message);
        location.reload();
        },
        error:function(xhr, status, error, data){
          var json = data;
          console.log("GET error response "+xhr.responseText);
        }
      });      
    });
    $('#cart').on('click',"#removeItem",function(event){
      event.preventDefault();
      var name = $.trim($(this).closest(".item").find(".caption h4").html());
      var desc = $.trim($(this).closest(".item").find(".caption p").html());
      var price = $.trim($(this).closest(".item").find(".row p").html());
      var id = $.trim($(this).closest(".item").find(".row p").attr("val"));
      console.log(name+id);
      $.ajax({
        method: 'POST',
        url: '/cart/remove',
        data: 
          JSON.stringify({ "itemBought": name, "description":desc, "price":price, "id":id }),
        contentType: "application/json",
        dataType: "json",
        success:function(data){
        console.log("GET success response "+data.message);
        location.reload();
        },
        error:function(xhr, status, error, data){
          var json = data;
          console.log("GET error response "+xhr.responseText);
        }
      });   
    });        
});