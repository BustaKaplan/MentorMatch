({
    doAction: function(component, event, helper) {
        var action = component.get("c.getMentees");
        var returnValue;
        var applyingTo = component.get("v.applyingTo")        
        action.setParams({
            applyingTo: applyingTo
        });
        
        //Callback
        var self = this;
        action.setCallback(this,function(response){     
            var state=response.getState();
            var responseValue = response.getReturnValue();
            if(state==="SUCCESS")
            {                
             component.set("v.mentees", responseValue);
            }
       
        });
        $A.enqueueAction(action);
    },
    
    menteeSelected: function(component, event, helper) {
        var selectedRow = event.currentTarget;
    	var selectedApplication = event.currentTarget.dataset.myid;
        
    	//Pass selected application Id to the mentormatch component
    	component.set("v.selectedApplication", selectedApplication);
        console.log("selected application " +  selectedApplication);
        
        //Apply and remove select styling
        $A.util.addClass(event.target, 'setSelected');
        //var selectedRow = 
        //var selectedApplication
    },
    
    
    doInit: function(component, event, helper) {
        var action = component.get("c.getMentees");
        
        action.setCallback(this, function(result) {
            var records = result.getReturnValue();
            component.set("v.mentees", records);
            console.log('records ' + records);
            component.set("v.maxPage", Math.floor((records.length+9)/10));
            helper.sortBy(component, "Name");
        });
        $A.enqueueAction(action);
	},
    sortByName: function(component, event, helper) {
        helper.sortBy(component, "Name");
    },
    sortByIndustry: function(component, event, helper) {
        helper.sortBy(component, "Industry");
    },
    sortByAnnualRevenue: function(component, event, helper) {
        helper.sortBy(component, "AnnualRevenue");
    },
        
})
