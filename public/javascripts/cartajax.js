$(document).ready(function() {

    $('#logs').on('click',"#removeItemHistory",function(event){
      event.preventDefault();
      var name = $.trim($(this).closest(".item").find(".caption h4").html());
      var desc = $.trim($(this).closest(".item").find(".caption p").html());
      var price = $.trim($(this).closest(".item").find(".row p").html());
      var id = $.trim($(this).closest(".item").find(".row p").attr("val"));
      console.log(name+id);
      $.ajax({
        method: 'POST',
        url: '/cart/removeHistory',
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
    
    $('#printHistory').click(function(event){
      event.preventDefault();
      var userid = $('input[name=searchText]').val();
      $.ajax({
        method: 'GET',
        url: '/cart/write',
        data: 
          ({ "userId": userid }),        
        contentType: "application/json",
        dataType: "json",
        success:function(data){
        console.log("GET success response "+data.message);  
        },
        error:function(xhr, status, error, data){
          var json = data;
          console.log("GET error response "+xhr.responseText);
        }
      }); 
    });  
    
    $('#searchButton').click(function(event){
      event.preventDefault();
      var userid = $('input[name=searchText]').val();
      $.ajax({
        method: 'GET',
        url: '/cart/admin',
        data: 
          ({ "userId": userid }),        
        contentType: "application/json",
        dataType: "json",
        success:function(data){
        console.log("GET success response "+data.message);
        $('#logs').empty();
          for(var i = 0; i < data.logs.length; i++){
            $('#logs').append(
              '<div class="item  col-xs-4 col-lg-4"> \
                    <div class="thumbnail">\
                        <img class="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />\
                        <div class="caption">\
                            <h4 id="productName" class="group inner list-group-item-heading">\
                                 '+data.logs[i].name+'</h4>\
                            <p class="group inner list-group-item-text">\
                                 '+data.logs[i].description+'</p>\
                            <div class="row">\
                                <div class="col-xs-12 col-md-6">\
                                    <p class="lead" val='+data.logs[i].id+' >\
                                       '+data.logs[i].price+' </p>\
                                </div>\
                                <div class="col-xs-12 col-md-6">\
                                    <a class="btn btn-success" href="#" id="removeItemHistory">Remove</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
            );
          }        
        },
        error:function(xhr, status, error, data){
          var json = data;
          console.log("GET error response "+xhr.responseText);
        }
      }); 
    });  

    $('#history').click(function(event){
      event.preventDefault();
      $.ajax({
        method: 'GET',
        url: '/cart/history',
        contentType: "application/json",
        dataType: "json",
        success:function(data){
        console.log("GET success response "+data.history[0].name);
        $('#bought').empty();
          for(var i = 0; i < data.history.length; i++){
            $('#bought').append(
              '<div class="item  col-xs-4 col-lg-4"> \
                    <div class="thumbnail">\
                        <img class="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />\
                        <div class="caption">\
                            <h4 id="productName" class="group inner list-group-item-heading">\
                                 '+data.history[i].name+'</h4>\
                            <p class="group inner list-group-item-text">\
                                 '+data.history[i].description+'</p>\
                            <div class="row">\
                                <div class="col-xs-12 col-md-6">\
                                    <p class="lead">\
                                       '+data.history[i].price+' </p>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
            );
          }        
        },
        error:function(xhr, status, error, data){
          var json = data;
          console.log("GET error response "+xhr.responseText);
        }
      }); 
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
