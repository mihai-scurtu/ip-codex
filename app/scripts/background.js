'use strict';

//get ip and set interval
updateIP();
window.setInterval(updateIP, 10 * 60000);

function updateIP(callback) {
  $.get('http://bot.whatismyipaddress.com', function(ip) {
    // set ip locally
    chrome.storage.local.set({"ip": ip});

    // set synced ip
    chrome.storage.local.get('name', function(o) {
      var name;

      if(o.name === undefined) {
        name = randomString(6);
        chrome.storage.local.set({'name': name});
      } else {
        name = o.name;
      }

      var record = {};
      record[name] = ip;

      chrome.storage.sync.set(record);
    });

    if(callback !== undefined) {
      callback(ip);
    }
  });
}