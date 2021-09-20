({
	doInit: function(component, event, helper) {
        var action = component.get("c.getMentorPrograms");
        var returnValue;
        
        //Callback
        var self = this;
        action.setCallback(this,function(response){     
            var state=response.getState();
            var responseValue = response.getReturnValue();
            if(state==="SUCCESS")
            {
             component.set("v.mentorPrograms", responseValue);
            }
       
        });
        $A.enqueueAction(action);
    },
    
    programSelected: function(component, event, helper) {
        var selectedProgram = component.find("selectedProgram").get("v.value");
        
    	//Pass selected application Id to the mentormatch component
    	component.set("v.mentorProgramId", selectedProgram);
	},
    mentorSelected: function(component, event, helper) {
        var mentorApp = event.getParam("mentorApp");
        var menteeApp = event.getParam("menteeApp");
        component.set("v.mentorApp", mentorApp);
        component.set("v.menteeApp", menteeApp);

    },
    matchSelected: function(component, event, helper){
        //When the action starts, show the spinner
        helper.showSpinner(component);
        
        //Get the ID from the mentor and the mentee from the component
        var menteeApp = component.get("v.menteeApp");
        var mentorApp = component.get("v.mentorApp");       
        
        //Pass the mentor and mentee values to the createMatch Apex Class
        var action = component.get("c.createMatch");
        var returnValue
        action.setParams ({
            mentorApp: mentorApp,
            menteeApp: menteeApp
        });
        
        var params = event.getParam('arguments');
        var callback;
        if (params) {
            callback = params.callback;
        }
        
        //Callback
        var self = this;
        action.setCallback(this,function(response){     
            var state=response.getState();
            var responseValue = response.getReturnValue();
            if(state==="SUCCESS")
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": 'Match # ' + responseValue + ' created!',
                    "variant": "success"
                });
                if (callback) callback(responseValue);
                toastEvent.fire();
                helper.hideSpinner(component);   
            }
            if(state!="SUCCESS"){
                alert('No Match Created, error occured'); /*TURN THIS INTO TOAST*/
                helper.hideSpinner(component);                
            }
       		//$A.get('e.force:refreshView').fire(); 
        });
        $A.enqueueAction(action);
         
    }
          
})
