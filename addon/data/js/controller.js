// listen for click events on UI
window.addEventListener('click', function(event) {

  if (event.target.id.indexOf('save') === 0){
    texteditor.save();
    
  }else if (event.target.id.indexOf('pathToFile') === 0){
    texteditor.selectDir();
  }
}, false);


var texteditor = {
  selectDir: function() {
	  
    var data = JSON.stringify({
		    operation: 'selectDir'
	    });
    self.postMessage(data);
  },
  save: function() {
    var input = JSON.stringify({
      data: CKEDITOR.instances.editor1.getData()
    });

    addon.port.emit("input", input);
  }
};


//messages from addon code
addon.port.on("result", function(data) {
  var result = JSON.parse(data);
});