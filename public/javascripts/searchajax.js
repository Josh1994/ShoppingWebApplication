$(document).ready(function() {
    $('#list').click(function(event){
      event.preventDefault();
      $('#products .item').addClass('list-group-item');
    });

    $('#grid').click(function(event){
      event.preventDefault();
      $('#products .item').removeClass('list-group-item');
      $('#products .item').addClass('grid-group-item');
    });
    
    $('#searchButton').click(function(event){
      event.preventDefault();
      var textboxvalue = $('input[name=searchText]').val();
      console.log(textboxvalue);
      $.ajax({
          method: 'GET',
          url: '/search/result',
          data: ({
          'searchAnswer': textboxvalue
          }),
          contentType: "application/json",
          dataType: "json",
          success:function(data){
            var json = data;
          //  console.log(data);
            console.log("GET success response "+json.searchArray[0].name);
            $('#products').empty();
            if(json.searchArray.length > 0){
              $('#products').append(
                '<div class="item  col-xs-4 col-lg-4"> \
                      <div class="thumbnail">\
                          <img class="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />\
                          <div class="caption">\
                              <h4 id="productName" class="group inner list-group-item-heading">\
                                   '+json.searchArray[0].name+'</h4>\
                              <p class="group inner list-group-item-text">\
                                   '+json.searchArray[0].description+'</p>\
                              <div class="row">\
                                  <div class="col-xs-12 col-md-6">\
                                      <p class="lead">\
                                         '+json.searchArray[0].price+' </p>\
                                  </div>\
                                  <div class="col-xs-12 col-md-6">\
                                      <a class="btn btn-success" href="#" id="addCart">Add to cart</a>\
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

    $('#products').on('click',"#addCart",function(){
      //var name = $.trim(document.getElementById("productName").innerHTML);
      var name = $.trim($(this).closest(".item").find(".caption h4").html());
      console.log(name);
      $.ajax({
        method: 'POST',
        url: '/cart/'+name,
        data: 
          JSON.stringify({ "itemBought": name }),
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
});