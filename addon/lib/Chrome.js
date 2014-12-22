var {Cc,Ci,Cu,components} = require("chrome"),
  Tab = require("./Tab"),
  Notification = require("./Notification");

const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});

exports.getHomeDir = function() {
  return Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("Home", Ci.nsIFile);
};

exports.selectDir = function(selectedText) {
  var nsIFilePicker = Ci.nsIFilePicker,
    fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
    
  fp.init(window.get(),
		  Localisation.getString("browse_title"), 
		  nsIFilePicker.modeGetFolder);
  
  var ret = fp.show();
  
  if (ret == nsIFilePicker.returnOK || ret == nsIFilePicker.returnReplace) {
    Preference.set("pathToFile", fp.file.path);
    Panel.show(selectedText);
  }
};

function createFilePath(saveDirectory, fileName) {
  var filePath = (Preference.get('format') === 0 ?
		  Utils.sanitizeFilename(fileName) + ".txt" : Utils.sanitizeFilename(fileName) + ".csv");

  return OS.Path.join(saveDirectory, fileName);
}

exports.createFilePath = function(saveDirectory, fileName) {
  return createFilePath(saveDirectory, fileName);
};

exports.saveTo = function(data){
  var file = createFilePath(
		  data.filePath,
		  data.fileName);
  
  //data.content;	
  
  if (Preference.get('saveMode') === 0){
	  
    let encodedArray = new TextEncoder().encode(combinedString);
	let promise = OS.File.writeAtomic(filePath, encodedArray);
  	promise.then(
  	  function() {
  	    if (Preference.get('showNotifications')){
  	  	  Notification.sendMsg("saveComplete_id", filePath);
  	    }
  	  },
  	  function(ex) {
  		if (Preference.get('showNotifications')){
    	  Notification.sendMsg("saveError_id", filePath);
  		}
  	  }
  	); 
	  
  } else if (Preference.get('saveMode') === 1){
	  
    let promise = OS.File.read(filePath);
	promise = promise.then(function onSuccess(contents) {
	  let text = new TextDecoder().decode(contents);
	  combinedString = text + '\n\n' + combinedString;
	  
	  if (System.getPlatform().indexOf('win') >= 0){
		combinedString = combinedString.replace(/[\n]/g, '\r\n');
	  }
	  
	  let encodedArray = new TextEncoder().encode(combinedString);
	  let promise = OS.File.writeAtomic(filePath, encodedArray);
  	  promise.then(
  	    function() {
  	  	  if (Preference.get('showNotifications')){
  	  	    Notification.sendMsg("saveComplete_id", filePath);
  	  	  }
  	    },
  	    function(ex) {
  		  if (Preference.get('showNotifications')){
    		Notification.sendMsg("saveError_id", filePath);
  		  }
  	    }
  	  );
	}, 
	function onError(reason) {
      if (System.getPlatform().indexOf('win') >= 0){
		combinedString = combinedString.replace(/[\n]/g, '\r\n');
      }
	  let encodedArray = new TextEncoder().encode(combinedString);
	  let promise = OS.File.writeAtomic(filePath, encodedArray);
	  promise.then(
	    function() {
    	  if (Preference.get('showNotifications')){
    		Notification.sendMsg("saveComplete_id", filePath);
    	  }
	    },
    	function(ex) {
    	  if (Preference.get('showNotifications')){
      		Notification.sendMsg("saveError_id", filePath);
    	  }
	    }
	  );
	});
	  
  }else {
	
	let promise = OS.File.read(filePath);
	promise = promise.then(function onSuccess(contents) {
	  let text = new TextDecoder().decode(contents);
	  combinedString = combinedString + '\n\n' + text;
	  
	  if (System.getPlatform().indexOf('win') >= 0){
		combinedString = combinedString.replace(/[\n]/g, '\r\n');
	  }
	  
	  let encodedArray = new TextEncoder().encode(combinedString);
	  let promise = OS.File.writeAtomic(filePath, encodedArray);
  	  promise.then(
  	    function() {
  	  	  if (Preference.get('showNotifications')){
  	  	    Notification.sendMsg("saveComplete_id", filePath);
  	  	  }
  	    },
  	    function(ex) {
  		  if (Preference.get('showNotifications')){
    		Notification.sendMsg("saveError_id", filePath);
  		  }
  	    }
  	  );
	}, 
	function onError(reason) {
      if (System.getPlatform().indexOf('win') >= 0){
		combinedString = combinedString.replace(/[\n]/g, '\r\n');
      }
	  let encodedArray = new TextEncoder().encode(combinedString);
	  let promise = OS.File.writeAtomic(filePath, encodedArray);
	  promise.then(
    	function() {
    	  if (Preference.get('showNotifications')){
    		Notification.sendMsg("saveComplete_id", filePath);
    	  }
    	},
    	function(ex) {
    	  if (Preference.get('showNotifications')){
      		Notification.sendMsg("saveError_id", filePath);
    	  }
    	}
      );
    });
  }
};