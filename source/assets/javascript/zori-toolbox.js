var toolbox = {
    /**
     * Used to capture the mouse scroll event
     */
	initMouseScrollEvent : function() {
		var mouseWheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
 
		if (document.attachEvent) {
			//if IE (and Opera depending on user setting)
			document.attachEvent("on" + mouseWheelEvent, toolbox.showTopMenu);
		} else if (document.addEventListener) {
            //W3C browsers
			document.addEventListener(mouseWheelEvent, toolbox.showTopMenu, false);
		}
    },
    
    /**
     * Tooltips
     */
    initTooltips : function() {
        $(document).tooltip({
            position: {
                my: "center bottom-16",
                at: "center top",
                using: function(position, feedback) {
                    $(this).css(position);
                    $("<div>")
                        .addClass("arrow")
                        .addClass(feedback.vertical)
                        .addClass(feedback.horizontal)
                        .appendTo(this);
                }
            }
        });
    },
    
    /**
     * Tabs
     */
    initTabs : function() {
        $('#toolbar-panel').tabs({
            collapsible: true,
            active: false
        });
    }
};

$(document).ready(function() {
    //toolbox.initMouseScrollEvent();
    toolbox.initTooltips();
    toolbox.initTabs();
});
