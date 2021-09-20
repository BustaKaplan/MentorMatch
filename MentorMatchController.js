({
	doInit: function(component, event, helper) {        
    	var recordId = component.get("v.recordId");
        var action = component.get("c.getMentorRecords");
        var returnValue;
        
        action.setParams({
            recordId: recordId
        });
        
        //Callback
        var self = this;
        action.setCallback(this,function(response){     
            var state=response.getState();
            var responseValue = response.getReturnValue();
            console.log('responseValue ' +responseValue);
            if(state==="SUCCESS")
            {
             component.set("v.mentors", responseValue);
             console.log("In Match");
            }
       
        });
        $A.enqueueAction(action);
    },
    sortByName: function(component, event, helper) {
            helper.sortBy(component, "Name");
    },
    sortByIndustry: function(component, event, helper) {
            helper.sortBy(component, "IndustryData");
    },
    sortByFuction: function(component, event, helper) {
            helper.sortBy(component, "FunctionData");
    },
    sortByMentees: function(component, event, helper) {
            helper.sortBy(component, "Mentees");
    },
    sortByMatchScore: function(component, event, helper) {
            helper.sortBy(component, "matchScore");
    },
    calculateWidth : function(component, event, helper) {
            var childObj = event.target
            var parObj = childObj.parentNode;
            var count = 1;
            while(parObj.tagName != 'TH') {
                parObj = parObj.parentNode;
                count++;
            }
            console.log('final tag Name'+parObj.tagName);
            var mouseStart=event.clientX;
            component.set("v.mouseStart",mouseStart);
            component.set("v.oldWidth",parObj.offsetWidth);
    },
    setNewWidth : function(component, event, helper) {
            var childObj = event.target
            var parObj = childObj.parentNode;
            var count = 1;
            while(parObj.tagName != 'TH') {
                parObj = parObj.parentNode;
                count++;
            }
            var mouseStart = component.get("v.mouseStart");
            var oldWidth = component.get("v.oldWidth");
            var newWidth = event.clientX- parseFloat(mouseStart)+parseFloat(oldWidth);
            parObj.style.width = newWidth+'px';
    },
    
    mentorSelected : function(component, event, helper){
        //set the selected mentors ID TEST IF WE CAN REMOVE
        var mentorApp = event.currentTarget.dataset.myid;
        var menteeApp = component.get("v.recordId");
        
        //Remove highlight from all previous selected rows
        var oldRows = document.getElementsByClassName("selectedMentorRow");
        for (let i = 0; i < oldRows.length; i++) {
            $A.util.removeClass(oldRows[i], 'selectedMentorRow');
        }
        
        //Highlight the selected row
        var selectedMentorRow = event.currentTarget;
        $A.util.addClass(selectedMentorRow, 'selectedMentorRow');
        
        // Pass the aplication Ids to the parent component through an event so the match button has them
        var cmpEvent = component.getEvent("mentorEvent");
        	cmpEvent.setParams({
                "menteeApp" : menteeApp,
            	"mentorApp" : mentorApp
            });
        cmpEvent.fire();
    },
    
    matchSelected: function(component, event, helper){
         //Get the ID from the mentor and the mentee from the component
        var menteeApp = component.get("v.recordId");
        var mentorApp = component.get("v.selectedMentorApplication");
        
		// Get the component event by using the
        // name value from aura:registerEvent
        var cmpEvent = component.getEvent("mentorEvent");
        	cmpEvent.setParams({
                "MenteeApp" : menteeApp,
            	"mentorApp" : mentorApp
            });
        cmpEvent.fire();        
        
        helper.showSpinner(component);
        
        //Pass the mentor and mentee values to the createMatch Apex Class
        var action = component.get("c.createMatch");
        var returnValue
        action.setParams ({
            mentorApp: mentorApp,
            menteeApp: menteeApp
        });
        
        //Callback
        var self = this;
        action.setCallback(this,function(response){     
            var state=response.getState();
            var responseValue = response.getReturnValue();
            console.log('responseValue ' +responseValue);
            if(state==="SUCCESS")
            {
             //alert('Match # ' + responseValue + ' created!');
    		var toastEvent = $A.get("e.force:showToast");
    		toastEvent.setParams({
        		"title": "Success!",
        		"message": 'Match # ' + responseValue + ' created!',
                "variant": "success"
    		});
    		toastEvent.fire();
            helper.hideSpinner(component);   
            }
            if(state!="SUCCESS"){
                alert('No Match Created, error occured');
                helper.hideSpinner(component);                  
            }
       		$A.get('e.force:refreshView').fire(); 
        });
        $A.enqueueAction(action);
         
    }
})
