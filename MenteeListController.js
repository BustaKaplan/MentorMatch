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
        //Pass selected application Id to the mentormatch component
        var selectedAppliation = event.currentTarget.dataset.myid;
    	component.set("v.selectedApplication", selectedAppliation);
        
        //Remove highlight from all previous selected rows
        var oldRows = document.getElementsByClassName("selectedRow");
        for (let i = 0; i < oldRows.length; i++) {
            $A.util.removeClass(oldRows[i], 'selectedRow');
        }
        
        //Highlight the selected row
        var selectedRow = event.currentTarget;
        $A.util.addClass(selectedRow, 'selectedRow');       
        
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
        helper.sortBy(component, "Industry__c");
    },
    sortByFunction: function(component, event, helper) {
        helper.sortBy(component, "Function__c");
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
        
})
