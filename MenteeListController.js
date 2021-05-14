({
    doAction: function(component, event, helper) {
        var action = component.get("c.getMentees");
        var returnValue;
        var applyingTo = component.get("v.applyingTo")
        console.log(applyingTo);
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
                console.log(responseValue);
             component.set("v.mentees", responseValue);
            }
       
        });
        $A.enqueueAction(action);
    }
})
   
