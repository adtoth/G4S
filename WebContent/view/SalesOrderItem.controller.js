jQuery.sap.require("BP_Fiori.util.Formatter");
sap.ui.controller("BP_Fiori.view.SalesOrderItem", {
	
		 handleNavBack : function (evt) { 
		  this.nav.back("Detail");
		 },
 	
 

		handleApprove : function(evt) {

		var a = evt.getSource().getBindingContext();
		var oData = oModel.getProperty(a.sPath);
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		if(oModel.getProperty(a.sPath + "/Status") != 'P' && oModel.getProperty(a.sPath + "/Status") != 'D'){
		sap.m.MessageBox.confirm(bundle.getText("ApproveDialogMsg"), function(
				oAction) {			
			if (sap.m.MessageBox.Action.OK === oAction){
				// notify user
				var successMsg = bundle.getText("ApproveDialogSuccessMsg");
				sap.m.MessageToast.show(successMsg);
				jQuery.sap.require("sap.m.MessageToast");
				oModel.setProperty(a.sPath + "/Status", 'P');

			}
		},
		   
		   bundle.getText("ApproveDialogTitle")
		);
		 }
		
		else {
			sap.m.MessageBox.alert(bundle.getText("AlreadyApprovedMsg"), function(
					oAction) {
				
			},
			   
			   bundle.getText("AlreadyApprovedTitle")
			  );
			 }
	},
		 
			handleDecline : function(evt) {

				var a = evt.getSource().getBindingContext();
				var oData = oModel.getProperty(a.sPath);
				var bundle = this.getView().getModel("i18n").getResourceBundle();
				if(oModel.getProperty(a.sPath + "/Status") != 'D' && oModel.getProperty(a.sPath + "/Status") != 'P'){
				sap.m.MessageBox.confirm(bundle.getText("DeclineDialogMsg"), function(
						oAction) {
					if (sap.m.MessageBox.Action.OK === oAction) {
						// notify user
						var successMsg = bundle.getText("DeclineDialogSuccessMsg");
						sap.m.MessageToast.show(successMsg);
						jQuery.sap.require("sap.m.MessageToast");
						oModel.setProperty(a.sPath + "/Status", 'D');

					}
				},
				   
				   bundle.getText("AlreadyRejectedTitle")
				  );
				 }
				
				else {
					sap.m.MessageBox.alert(bundle.getText("AlreadyRejectedMsg"), function(
							oAction) {
						
					},
					   
					   bundle.getText("AlreadyRejectedTitle")
					  );
					 }
			},

			scan: function(evt) {
				var a = evt.getSource().getBindingContext();
				var oData = oModel.getProperty(a.sPath);
				var bundle = this.getView().getModel("i18n").getResourceBundle();				
		        console.log('scanning');
		        
		        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

		        scanner.scan( function (result) { 
		        	for(var i = 0; i < 5; i++ ){
//		            alert("We got a barcode\n" + 
//		            "Result: " + result.text + "\n" + 
//		            "Format: " + result.format + "\n" + 
//		            "Cancelled: " + result.cancelled);  
		            
		            if(oModel.getProperty(a.sPath + "/SalesOrderID") === result.text){
		            	sap.m.MessageToast.show("Confirmed");
		            }
		            else sap.m.MessageToast.show("Not Confirmed");
		            
		            /*
		            if (args.format == "QR_CODE") {
		                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
		            }
		            */
		        	}
		        }, function (error) { 
		            console.log("Scanning failed: ", error); 
		        } );
		    }
				

});
				