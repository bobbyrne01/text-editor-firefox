var Tabs = require("sdk/tabs"),
  Data = require("./Data"),
  worker;

exports.open = function(){
  return open();
};

function open(state) {

  Tabs.open({
    url: Data.get('html/view.html'),
    Ready: function onReady(tab) {
      worker = tab.attach({
        onMessage: function (message) {
          var input = JSON.parse(message);
          
          
        }
      });
    }
  });
}

exports.sendMsg = function(result){
  return sendMsg(result);
};

function sendMsg(result){
  worker.port.emit(result);
}