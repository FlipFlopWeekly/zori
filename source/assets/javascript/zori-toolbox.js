var toolbox = {
	initMouseScrollEvent : function() {
		var mouseWheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
 
		if (document.attachEvent) {
			//if IE (and Opera depending on user setting)
			document.attachEvent("on" + mouseWheelEvent, toolbox.showTopMenu);
		} else if (document.addEventListener) {//WC3 browsers
			document.addEventListener(mouseWheelEvent, toolbox.showTopMenu, false);
		}
    },
    
	// Top menu behaviour
	showTopMenu : function(event) {
		console.log('test');
    }
    
};

//toolbox.initMouseScrollEvent();