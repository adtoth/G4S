jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
sap.ui
		.controller(
				"sap.ui.demo.myFiori.view.bevetDetail",
				{

					handleNavButtonPress : function(evt) {
						this.nav.back("bevetMaster");
					},

					scan : function(evt) {

						
						var foundItems = 0;
						console.log('scanning');

						var scanner = cordova
								.require("cordova/plugin/BarcodeScanner");

						scanner.scan(function(result) {

							var data = oModel.getProperty(a.sPath + "/Item");
							for ( var i = 0; i < data.length; i++) {
								if (oModel.getProperty(a.sPath + "/Item" + "/"
										+ i + "/ProductID") === result.text) {
									sap.m.MessageToast.show("Confirmed");
									oModel.setProperty(a.sPath + "/Items" + "/"
											+ i + "/Pick up status", 'K');
									foundItems++;
								}

								else
									sap.m.MessageToast.show("Not Confirmed");
							}

						}, function(error) {
							console.log("Scanning failed: ", error);
						});

					},
					
					scan_debug : function(evt) {
							var a = evt.getSource().getBindingContext();
							var data = sap.ui.getCore().getModel().getProperty(a.sPath + "/DelStatus");
							alert(data);
							//var data = sap.ui.getCore().getModel();
							//alert(data);
							/*for ( var i = 0; i < data.length; i++) {
								if (oModel.getProperty(a.sPath + "/Item" + "/"
										+ i + "/ProductID") === result.text) {
									sap.m.MessageToast.show("Confirmed");
									oModel.setProperty(a.sPath + "/Items" + "/"
											+ i + "/Pick up status", 'K');
									foundItems++;
								}

								else
									sap.m.MessageToast.show("Not Confirmed");
							} 
*/
					},
					
					close : function(evt) {
						var a = evt.getSource().getBindingContext();
						var bundle = this.getView().getModel("i18n")
								.getResourceBundle();
						var data = oModel.getProperty(a.sPath);
						oModel.setProperty(a.sPath + "/DelStatus", 'C');
						sap.m.MessageToast.show("Lezárva");
					},

					send : function(evt) {
						//header_xcsrf_token = response.headers['x-csrf-token']; 
						OData
								.request({
									requestUri : "proxy/http/office.netlife.hu:8181/futarfioriodataprovider/courierdata.svc/deliverySheet",
									method : "POST",
									data : {
										status : "2"
									}
								});
					}

				});