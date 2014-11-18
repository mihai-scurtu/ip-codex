function randomString(size) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for( var i=0; i < size; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getData(callback) {
  var data = {};

  async.parallel([
    function(done) {
      chrome.storage.local.get(null, function(items) {
        data.name = items.name;
        data.ip = items.ip;

        done();
      });
    },
    function(done) {
      chrome.storage.sync.get(null, function(items) {
        data.ips = items;

        console.log(items);

        done();
      });
    }
  ], function() {
    if(callback !== undefined) {
      callback(data);
    }
  });

  // chrome.storage.local.get(null, function(items) {
  //   data.name = items.name;
  //   data.ip = items.ip;

  //   chrome.storage.sync.get(null, function(items) {
  //     data.ips = items;

  //     if(callback !== undefined) {
  //       callback(data);
  //     }
  //   });
  // });
}

function updateName(name, data, callback) {
  if(name == '' || _.has(data.ips, name)) return;

  async.parallel([
    function(done) {
      chrome.storage.sync.remove(data.name);
      
      done()
    },
    function(done) {
      var record = {};
      record[name] = data.ip;
      chrome.storage.sync.set(record);

      done();
    },
    function(done) {
      chrome.storage.local.set({'name': name});

      done();
    }
  ], function() {
    console.log(callback);
    if(callback !== undefined) {
      getData(callback);
    }
  });
}