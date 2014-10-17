﻿jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
sap.ui.controller("sap.ui.demo.myFiori.view.bevetDetail", {

	handleNavButtonPress : function(evt) {
		this.nav.back("bevetMaster");
	},

// scan : function scannerLoop(evt) {
//
// var a = evt.getSource().getBindingContext();
// var oData = oModel.getProperty(a.sPath);
// var bundle = this.getView().getModel("i18n").getResourceBundle();
// var foundItems = 0;
// console.log('scanning');

		// var scanner = cordova.require("cordova/plugin/BarcodeScanner");

// scanner.scan(function(result) {
//
// // alert("We got a barcode\n" +
// // "Result: " + result.text + "\n" +
// // "Format: " + result.format + "\n" +
// // "Cancelled: " + result.cancelled);
// var data = oModel.getProperty(a.sPath + "/Items");
// for ( var i = 0; i < data.length; i++) {
// if (oModel.getProperty(a.sPath + "/Items" + "/" + i
// + "/ProductID") === result.text) {
// //alert(result.text);
// sap.m.MessageToast.show("Confirmed");
// oModel.setProperty(a.sPath + "/Items" + "/" + i
// + "/Pick up status", 'K');
// foundItems++;
// }
//
// //else sap.m.MessageToast.show("Not Confirmed");
// }
// if (foundItems != data.length)
// scannerLoop();
//
// /*
// if (args.format == "QR_CODE") {
// window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false
// });
// }
// */
//
// }, function(error) {
// console.log("Scanning failed: ", error);
// });

	// },
	
	close: function(evt){
		var a = evt.getSource().getBindingContext();
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		var data = oModel.getProperty(a.sPath);
		oModel.setProperty(a.sPath + "/DelStatus", 'C');
		sap.m.MessageToast.show("Lezárva");
	},
	
	  send: function (evt){
		  //header_xcsrf_token = response.headers['x-csrf-token']; 
       OData.request({  
            requestUri: "proxy/http/office.netlife.hu:8181/futarfioriodataprovider/courierdata.svc/deliverySheet",  
            method: "POST",  
            headers: {   "X-Requested-With": "XMLHttpRequest",                        
            	"Content-Type": "application/atom+xml", 
            	"DataServiceVersion": "2.0",  
            	"Accept": "application/atom+xml,application/atomsvc+xml,application/xml", 
            	"X-CSRF-Token": "x-csrf-token"    },  
                  data:  
                      {  
                   status: 2,  
                
           }
       })
      }
	
});