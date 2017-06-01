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
      // $.ajax({
      //     method: 'POST',
      //     url: 'http://localhost:8080/search',
      //     data: JSON.stringify({
      //     task: taskName
      //     }),
      //     contentType: "application/json",
      //     dataType: "json",
      //     success:function(data){
      //       var json = data;
      //       console.log("POST success response "+json.code+" "+json.message);
      //     },
      //     error:function(data){
      //       var json = data;
      //       console.log("POST error response "+json.message);
      //     }
      // });

    });
});