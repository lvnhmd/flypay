var Sequelize = require('sequelize');
module.exports = function(app) {
	
	


	app.get('/v1/health', function(req, res) {
		
		return res.sendStatus(200);
	});

	
	app.get('/v1/menu/:locationId', function(req, res) {
		
		var locationId = req.params.locationId;
		console.log(locationId)

		var sequelize = new Sequelize('flypay', 'flypay', 'hackathon', {
  			host: 'localhost',
  			dialect: 'mysql',

			  pool: {
			    max: 5,
			    min: 0,
			    idle: 10000
			  },

			  // SQLite only
			  // storage: 'path/to/database.sqlite'
			});



// create 
						  				// MenuPlus
								  		// plu vat slot type businessId

								  		// MenuPluIngredientsOrderTypes
								  		// pluId ingredientId orderTypeId
								  		
								  		// MenuPluPrices
								  		// menuPluId fp_BusinessLocationsId price validFrom validTo
								  		
								  		// MenuPluStocks
								  		// menuPluId fp_BusinessLocationsId count updated

var fbl = sequelize.define('fp_BusinessLocations', {
		   i_Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

		  i_BusinessId: {
		    type: Sequelize.INTEGER
		  }
		},
		{
		    timestamps: false
		});

var MenuPluPrices = sequelize.define('MenuPluPrices', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

		  menuPluId: {
		    type: Sequelize.INTEGER
		  },
		  fp_BusinessLocationsId: {
		    type: Sequelize.INTEGER
		  },
		  price: {
		    type: Sequelize.INTEGER
		  }
		},
		{
		    timestamps: false
		});

var MenuPluStocks = sequelize.define('MenuPluStocks', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

		  menuPluId: {
		    type: Sequelize.INTEGER
		  },
		  fp_BusinessLocationsId: {
		    type: Sequelize.INTEGER
		  },
		  count: {
		    type: Sequelize.INTEGER
		  }
		},
		{
		    timestamps: false
		});


var MenuPlus = sequelize.define('MenuPlus', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

		  plu: {
		    type: Sequelize.INTEGER
		  },
		  vat: {
		    type: Sequelize.INTEGER
		  },
		  slot: {
		    type: Sequelize.INTEGER
		  },
		  type: {
		    type: Sequelize.STRING
		  },
		  businessId: {
		    type: Sequelize.INTEGER
		  }
		},
		{
		    timestamps: false
		});


var MenuPluIngredientsOrderTypes = sequelize.define('MenuPluIngredientsOrderTypes', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

		  pluId: {
		    type: Sequelize.INTEGER
		  },
		  ingredientId: {
		    type: Sequelize.INTEGER
		  },
		  orderTypeId: {
		    type: Sequelize.INTEGER
		  }
		},
		{
		    timestamps: false
		});

		var Menu = sequelize.define('Menus', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

		  name: {
		    type: Sequelize.STRING
		  },
		  description: {
		    type: Sequelize.STRING
		  },
		  availability: {
		    type: Sequelize.STRING
		  },
		  allergyInfoUri: {
		    type: Sequelize.STRING
		  }
		},
		{
		    timestamps: false
		});

		//insert a menubusinesslocation
		//menuId,fp_BusinessLocationId(locationId), revision(0), weight(0) , orderType (1)
		var Mbl = sequelize.define('MenusBusinessLocations', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        	},
	        menuId:{
	        	type: Sequelize.INTEGER
	        },
		  fp_BusinessLocationsId: {
		    type: Sequelize.INTEGER
		  },
		  revision: {
		    type: Sequelize.INTEGER
		  },
		  weight: {
		    type: Sequelize.INTEGER
		  },
		  orderType: {
		    type: Sequelize.INTEGER
		  }


		},
		{
   			 timestamps: false
		});

		var MenuItems = sequelize.define('MenuItems', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        	},
	        name: {
	        	type: Sequelize.STRING
	        },
	        description: {
	        	type: Sequelize.STRING	
	        }

		},
		{
    		timestamps: false
		}); 

		var MenuCategoryItems = sequelize.define('MenuCategoryItems', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        	},
	        itemId: {
	        	type: Sequelize.INTEGER
	        },
	        categoryId: {
	        	type: Sequelize.INTEGER	
	        }

		},
		{
    		timestamps: false
		}); 

		var MenuPortions = sequelize.define('MenuPortions', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        	},
        	itemId: {
        		type: Sequelize.INTEGER
        	},
	        name: {
	        	type: Sequelize.STRING
	        },
	        description: {
	        	type: Sequelize.STRING	
	        },
	        weight: {
	        	type: Sequelize.INTEGER	
	        }
	    },    
		{
    		timestamps: false
		}); 

		var MenuIngredients = sequelize.define('MenuIngredients', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        	},
        	name: {
        		type: Sequelize.STRING
        	},
	        description: {
        		type: Sequelize.STRING
        	}

		},
		{
    	timestamps: false
	}); 

	var MenuPortionIngredients = sequelize.define('MenuPortionIngredients', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        	},
        	portionId: {
        		type: Sequelize.INTEGER
        	},
	        ingredientId: {
        		type: Sequelize.INTEGER
        	}

		},
		{
    	timestamps: false
	}); 

		var MenuCategoryItems = sequelize.define('MenuCategoryItems', {
		   id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        	},
	        itemId: {
	        	type: Sequelize.INTEGER
	        },
	        categoryId: {
	        	type: Sequelize.INTEGER	
	        }

		},
		{
    		timestamps: false
		});


		var data;
			
		Menu.create({
		    name: 'Default',
		    description: 'Default'
		  })


		.then(function(new_menu) {
  		

			//create the mbl

			var menu = new_menu.get({
    			plain: true
  			});

  			Mbl.create({
		    menuId:menu.id,
		    fp_BusinessLocationsId:locationId, 
		    revision:0, 
		    weight:0 , 
		    orderType:1
		  	}).then(function(new_mbl) {
		  		var bl = new_mbl.get({
    				plain: true
  				});
  				// console.log(bl);
			});

			MenuItems.create({
		    name : "Default",
		    description: "Default"
		  	}).then(function(new_mi) {

		  		var mi = new_mi.get({
    				plain: true
  				});
  				// console.log(mi);


  				MenuPortions.create({
				    itemId: mi.id,
				    name : "Default",
				    description: "Default",
				    weight: 0
				  	}).then(function(new_mp) {

				  		var mp = new_mp.get({
		    				plain: true
		  				});
		  				// console.log(mp);

		  				//create the ingredient

		  					MenuIngredients.create({
							    
							    name : "Default",
							    description: "Default"
							  	}).then(function(new_ming) {

							  		var ming = new_ming.get({
					    				plain: true
					  				});
					  				// console.log(ming);

					  				
					  				//create the portion ingredient

					  				MenuPortionIngredients.create({
							    
								    portionId : mp.id,
								    ingredientId: ming.id
								  	}).then(function(new_mPing) {

								  		var mPing = new_mPing.get({
						    				plain: true
						  				});
						  				// console.log(ming);
						  				
						  				// create category menu relationship
						  				MenuCategoryItems.create({
							    			itemId : mi.id,
								    		categoryId: 2
								  		}).then(function(new_mci) {

								  		var mci = new_mci.get({
						    				plain: true
						  				});
						  				
									});

								  			fbl.find({
									        where: {
									           i_Id: locationId
									        }
									     }).then(function(found_fbl) {
									        
									     	var bl = found_fbl.get({
							    				plain: true
							  				});


									     	// look up business id from fp_BusinessLocations by locationId
						  				// create MenuPlus
						  				// plu vat slot type businessId

						  				

						  				
								  		MenuPlus.create({
							    			plu : 11001,	
								    		vat: 1,
								    		slot: 1,
								    		type: "add",
								    		businessId: bl.i_BusinessId
								  		}).then(function(new_mp) {

									  		var mp = new_mp.get({
							    				plain: true
							  				});
									  		
									  		// MenuPluPrices
									  		// menuPluId fp_BusinessLocationsId price validFrom validTo

									  		MenuPluPrices.create({
								    			menuPluId : mp.id,	
									    		fp_BusinessLocationsId: locationId,
									    		price: 3.75
									  		}).then(function(new_mpp) {

										  		var mpp = new_mpp.get({
								    				plain: true
								  				});

										  		// MenuPluStocks
								  				// menuPluId fp_BusinessLocationsId count updated
										  		MenuPluStocks.create({
								    			menuPluId : mp.id,	
									    		fp_BusinessLocationsId: locationId,
									    		count: 100
										  		}).then(function(new_ms) {

											  		var ms = new_ms.get({
									    				plain: true
									  				});

											  		// MenuPluIngredientsOrderTypes
									  				// pluId ingredientId orderTypeId
									  				MenuPluIngredientsOrderTypes.create({
										    			pluId : mp.id,
										    			ingredientId:ming.id,	
											    		orderTypeId: 1
											    		
												  		}).then(function(new_miot) {

													  		var miot = new_miot.get({
											    				plain: true
											  				});

													  		// MenuPluIngredientsOrderTypes
											  				// pluId ingredientId orderTypeId

										  				
														});

								  				
												});

							  				
											});

										});

									     });

						  				
									});

					  				
								});



		  				

					});


			});


			return res.json(menu);


  

	});
});
	

	app.post('/v1/item', function(req, res) {
		
		var mysql      = require('mysql');
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'flypay',
		  password : 'hackathon',
		  database : 'flypay'
		});

		connection.connect();

		connection.query('SELECT * from MenuCategories', function(err, rows, fields) {
		  if (!err)
		    console.log('The solution is: ', rows);
		  else
		    console.log('Error while performing Query.');
		});

		connection.end();

		var data = {
			myString:"hello"
		};
		return res.json(data);
	});

	

};