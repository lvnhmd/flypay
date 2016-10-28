// var fs = require('fs');
// var Competition = require('../models/competition');
// var UserComp = require('../models/usercomp');
// var SourceMeta = require('../models/sourcemeta');
// var util = require('../util');
var Sequelize = require('sequelize');
module.exports = function(app) {
	
	var mysql      = require('mysql');
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'flypay',
		  password : 'hackathon',
		  database : 'flypay'
		});

	// show the home page (will also have our login links)
	app.get('/v1/hello', function(req, res) {
		
		var sequelize = new Sequelize('mysql://flypay:hackathon/flypay');

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
		    name: 'ElvinTest3',
		    description: 'Test'
		  })


		.then(function(new_menu) {
  		

			//create the mbl

			var menu = new_menu.get({
    			plain: true
  			});

  			Mbl.create({
		    menuId:menu.id,
		    fp_BusinessLocationsId:5, 
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

								  		// look up business id from fp_BusinessLocations
						  				// create 
						  				// MenuPlus
								  		// plu vat slot type businessId

								  		// MenuPluIngredientsOrderTypes
								  		// pluId ingredientId orderTypeId
								  		
								  		// MenuPluPrices
								  		// menuPluId fp_BusinessLocationsId price validFrom validTo
								  		
								  		// MenuPluStocks
								  		// menuPluId fp_BusinessLocationsId count updated

						  				
									});

					  				
								});



		  				//create the portion ingredient


					});


			});


			return res.json(menu);


  // 	data = menu.get({
  //   plain: true
  // });
  // console.log(menu.get({
  //   plain: true
  // }));

	});
});

	// app.post('/api/track', function(req, res) {

	// 	UserComp.findOne({
	// 		'userid': req.body.userid,
	// 		'compid': req.body.compid
	// 	}, function(err, usercomp) {
	// 		if (err) console.log(err);
	// 		if (usercomp) {
	// 			usercomp.count = usercomp.count + 1;
	// 			usercomp.save(function(err) {
	// 				if (err) console.log(err);
	// 				return res.json(usercomp);
	// 			});
	// 		} else {
	// 			var newUsercomp = new UserComp();
	// 			newUsercomp.userid = req.body.userid;
	// 			newUsercomp.compid = req.body.compid;

	// 			newUsercomp.save(function(err) {
	// 				if (err) console.log(err);
	// 				return res.json(newUsercomp);
	// 			});
	// 		}
	// 	});

	// });


	app.post('/v1/menu/:locationId', function(req, res) {
		
		// var mysql      = require('mysql');
		// var connection = mysql.createConnection({
		//   host     : 'localhost',
		//   user     : 'flypay',
		//   password : 'hackathon',
		//   database : 'flypay'
		// });

		//insert a menu - just name
		//get the menuId 
		//insert a menubusinesslocation
		//menuId,fp_BusinessLocationId(locationId), revision(0), weight(0) , orderType (1)
		//in order for flypay location id to work, insert category and items 
// 		{
//   "name": "Weekday Menu",
//   "categories": [
//     {
//       "name": "All",
//       "description": "Default Menu",
//       "items": [ 		MenuItems
//         {
          
//           "name": "Default item",
//           "description": "description",
//           "portions": [ 	MenuPortions
//             {
//               "name": "Default portion",
//               "ingredient": { 	MenuPortionIngredients
//                 "id": 3005,
//                 "name": "Default portion ingredient",
//                 "addPrice": 5
//               }
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }






		connection.connect();

		connection.query('INSERT INTO Menus ', function(err, rows, fields) {
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