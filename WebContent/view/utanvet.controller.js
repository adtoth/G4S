jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
sap.ui.controller("sap.ui.demo.myFiori.view.utanvet", {
	
	onInit: function(){
		super.appView.setLayerType(WebView.LAYER_TYPE_SOFTWARE, null);
	}

	handleNavButtonPress : function(evt) {
		this.nav.back("Master");
	},

	scan : function(evt) {
		var a = evt.getSource().getBindingContext();
		
		var foundItems = 0;
		var scanner = cordova.require("cordova/plugin/BarcodeScanner");
		var found = 0;
		var closedItems = 0;
		scanner.scan(function(result) {
			
			sap.ui.getCore().getModel().read(a.sPath, null, {
				"$expand" : "Items"
			}, true, function(response) {
				for(var i = 0; i < response.Items.results.length; i++){
					if(response.Items.results[i].PickupStatus == 'A'){
						closedItems++;
					}
					if(response.Items.results[i].ProductId === result.text){
						found++;
						if(response.Items.results[i].PickupStatus != 'A'){
						sap.ui.getCore().getModel().setProperty("/Item(" + response.Items.results[i].Id + ")/PickupStatus", "A");
						sap.ui.getCore().getModel().submitChanges();
						sap.ui.getCore().getModel().updateBindings(true);
						sap.ui.getCore().getModel().forceNoCache(true);
						sap.m.MessageToast.show("Csomag felvéve");
						}
						else if(response.Items.results[i].PickupStatus == 'A'){
							sap.m.MessageToast.show("Ez a csomag már fel van véve!");
						}
					}
					
				}
				
				if(found == 0) {
					sap.m.MessageToast.show("Nincs ilyen azonosítójú csomag");
				}
				
				if(closedItems == response.Items.results.length){
					sap.ui.getCore().getModel().setProperty(
							a.sPath + "/SzallitasStatus", "R");
					sap.m.MessageToast.show("Lezárva");
					sap.ui.getCore().getModel().submitChanges();
					sap.ui.getCore().getModel().updateBindings(true);
					sap.ui.getCore().getModel().forceNoCache(true);
				}
					
			});


		});

	},

	scan_debug : function(evt) {
		var a = evt.getSource().getBindingContext();
		var b = this.getView().getBindingContext();
		
		var talalt = "8006085"
		sap.ui.getCore().getModel().read(a.sPath, null, {
			"$expand" : "Items"
		}, true, function(response) {
			for(var i = 0; i < response.Items.results.length; i++){
				if(response.Items.results[i].ProductId === talalt){
					sap.ui.getCore().getModel().setProperty("/Item(" + response.Items.results[i].Id + ")/PickupStatus", 'A');
					//sap.ui.getCore().getModel().setProperty("/Item(9)/PickupStatus", 'M');
					sap.ui.getCore().getModel().submitChanges();
					sap.ui.getCore().getModel().updateBindings(true);
				}
			}
				
		});
		
	},

	close : function(evt) {
		var a = evt.getSource().getBindingContext();
		var data = sap.ui.getCore().getModel().getProperty(a.sPath + "/SzallitasStatus");
		if (data == 'C') {
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
		}
		
	}

});