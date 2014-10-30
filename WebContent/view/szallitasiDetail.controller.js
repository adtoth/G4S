jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("Signature");
sap.ui.controller("sap.ui.demo.myFiori.view.szallitasiDetail", {
	
	onInit: function(){
		super.appView.setLayerType(WebView.LAYER_TYPE_SOFTWARE, null);
	}

	handleNavButtonPress : function(evt) {
		this.nav.back("szallitasiMaster");
	},
	
	onSelect: function(evt){
		if(this.getView().byId("grpA02").getSelected() === true){
			this.getView().byId("grpB").setVisible(true);
			this.getView().byId("otherText").setVisible(false);
		}
		
		if(this.getView().byId("grpA01").getSelected() === true){
			this.getView().byId("grpB").setVisible(false);
		}
		
	},
	
	onSelectOther: function(evt){
		if(this.getView().byId("grpB10").getSelected() === true){
			this.getView().byId("otherText").setVisible(true);
		}
		else {
			this.getView().byId("otherText").setVisible(false);
		}
	},
//	scan : function scannerLoop(evt) {
//
//		var a = evt.getSource().getBindingContext();
//		var oData = oModel.getProperty(a.sPath);
//		var bundle = this.getView().getModel("i18n").getResourceBundle();
//		var foundItems = 0;
//		console.log('scanning');

		//var scanner = cordova.require("cordova/plugin/BarcodeScanner");

//		scanner.scan(function(result) {
//
//			//		            alert("We got a barcode\n" + 
//			//		            "Result: " + result.text + "\n" + 
//			//		            "Format: " + result.format + "\n" + 
//			//		            "Cancelled: " + result.cancelled);
//			var data = oModel.getProperty(a.sPath + "/Items");
//			for ( var i = 0; i < data.length; i++) {
//				if (oModel.getProperty(a.sPath + "/Items" + "/" + i
//						+ "/ProductID") === result.text) {
//					//alert(result.text);
//					sap.m.MessageToast.show("Confirmed");
//					oModel.setProperty(a.sPath + "/Items" + "/" + i
//							+ "/Pick up status", 'K');
//					foundItems++;
//				}
//
//				//else sap.m.MessageToast.show("Not Confirmed");	
//			}
//			if (foundItems != data.length)
//				scannerLoop();
//
//			/*
//			if (args.format == "QR_CODE") {
//			    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
//			}
//			 */
//
//		}, function(error) {
//			console.log("Scanning failed: ", error);
//		});

	//},
	
	close : function(evt) {
		var a = evt.getSource().getBindingContext();
		var myView = this.getView();
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		var data = sap.ui.getCore().getModel().getProperty(a.sPath + "/SzallitasStatus");
		sap.m.MessageBox.confirm(bundle.getText("CloseDialogMsg"), function(
				oAction) {			
			if (sap.m.MessageBox.Action.OK === oAction){
				if(myView.byId("grpB10").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/Comment", myView.byId("otherText").getValue());
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "10");
				}
				else if (myView.byId("grpB01").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "1");
				}
				else if (myView.byId("grpB02").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "2");
				}
				else if (myView.byId("grpB03").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "3");
				}
				else if (myView.byId("grpB04").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "4");
				}
				else if (myView.byId("grpB05").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "5");
				}
				else if (myView.byId("grpB06").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "6");
				}
				else if (myView.byId("grpB07").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "7");
				}
				else if (myView.byId("grpB08").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "8");
				}
				else if (myView.byId("grpB09").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "9");
				}
				else if (myView.byId("grpA01").getSelected() === true){
					sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", "S");
				}
				
				sap.ui.getCore().getModel().submitChanges();
				sap.ui.getCore().getModel().updateBindings(true);
				sap.ui.getCore().getModel().refresh(true);
				sap.m.MessageToast.show("Lezárva");

			}
		},
		   
		   bundle.getText("CloseDialogTitle")
		);
		 },
		
/*		if (data == 'C') {
			sap.m.MessageToast.show("Már le van zárva!");
		} else {
			sap.ui.getCore().getModel().setProperty(
					a.sPath + "/SzallitasStatus", 'C');
			sap.ui.getCore().getModel().submitChanges();
			sap.ui.getCore().getModel().updateBindings(true);
			sap.ui.getCore().getModel().forceNoCache(true);
			if(sap.ui.getCore().getModel().getProperty(a.sPath + "/SzallitasStatus") == 'C')
			sap.m.MessageToast.show("Lezárva");
			else sap.m.MessageToast.show("Szopás!");
		}*/
		
		

	
	activate: function(evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("aktualis", context);
	},
	
	signee: function () {
		 var mySignature = '<div id="wrapper"> ' +
	        '            <p>Zetakey Signature Webapp</p> ' +
	        '            <div id="canvas"> ' +
	        '                Canvas is not supported. ' +
	        '            </div> ' +
	        ' ' +
	        '            <script> ' +
	        '                signatureCapture(); ' +
	        '            </script> ' +
	        '        </div>';

	        var myhtml = new sap.ui.core.HTML();
	        myhtml.setContent(mySignature);

	        var clearBtn = new sap.m.Button({text: "Clear Signature", tap: function(evt) {
	            signatureClear();
	        }});

	        return new sap.m.Page({
	            title: "Title",
	            content: [
	                      myhtml,
	                      clearBtn
	            ]
	        });
	},
	
	
});