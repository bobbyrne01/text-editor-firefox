var { ActionButton } = require("sdk/ui/button/action"),
	Tabs = require("./Tabs");


function init(){
	
	var button = ActionButton({
		id: "text-editor-actionbutton",
		label: "Basic Text Editor",
		icon: {
		    "32": "./icons/ico32.png"
		},
	    onClick: handleClick
	});
}

exports.init = function(){
	return init();
};

function handleClick(state) {
	Tabs.open();
}