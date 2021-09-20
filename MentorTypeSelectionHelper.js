({
	showSpinner: function(component) {
        console.log('showSpinner');
    	var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
	},
    
 	hideSpinner: function(component) {
        console.log('hideSpinner');
    	var spinner = component.find("spinner");
        $A.util.addClass(spinner, "slds-hide");
	}
})
