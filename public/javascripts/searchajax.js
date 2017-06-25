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
           // console.log("GET success response "+json.result[0].searchArray[0].name);
            for (var result in json.SearchArray){
               $('#searchResult').append(
                  $('#myuser').val(user.user_name);
                  $('#myEmail').val(user.email);
                  $('#myAddress').val(user.address);
                );
            }
          },
          error:function(xhr, status, error, data){
            var json = data;
            console.log("GET error response "+xhr.responseText);
          }
      });

    });
});