$(function() {
  getData(function(data) {
    $('#name').val(data.name);
    $('.this.ip').text(data.ip);

    printIPS(data);
  });

  $('#name').on('blur', function() {
    var elem = $(this);
    var name = elem.val();

    getData(function(data) {
      if(name == '') {
        elem.val(data.name);
      } else {
        updateName(name, data, function(data) {
          console.log('repint');
          printIPS(data);
        });
      }
    });
  }); 
}); 

function printIPS(data) {
  $('#ips table').empty();
  _.each(data.ips, function(ip, name, list) {
    $('#ips table').append(
      $('<tr>').append(
        $('<td>').text(name),
        $('<td>').text(ip)
      )
    );
  });
}