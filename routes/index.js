var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BZFlag helper' });
});

/* GET BZConfig page. */
router.get('/BZConfig', function(req, res) {
    res.render('BZConfig');
});

/* POST BZConfig page (submit). */
router.post('/BZConfig', function(req, res) {

    res.render('index');

    var Form = req.body;
    console.log(Form);
    WriteConfigFile(Form);

});

module.exports = router;

function WriteConfigFile(form){

var filename = 'bz.cfg';
var date = new Date(); 
var timestamp= date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes();


var CONFIG  = "### BZFLag server configuration ###\n";
    CONFIG += "### Creation Time : "+ timestamp+ " ###\n";
    CONFIG += "### MAIN OPTIONS: ###\n";
    CONFIG += "### Game Type : ###\n";
    CONFIG += form.GameType + "\n";
    CONFIG += "### Number of shots before reload: (dafault :5) ###\n";
    CONFIG += "-ms " + form.ShotBeforReload + "\n";
    CONFIG += "### This option allows jumping : ###\n";
    CONFIG += form.IsJumpAllow + "\n";
    CONFIG += "### Players can born on building: ###\n";
    CONFIG += form.SpawnOnBuilding + "\n";

   		if(form.GameType != "-cr"){
   			CONFIG += "### RANDOM MAP SETTINGS ###\n";
    		CONFIG += "### Map Size ###\n";
    		CONFIG += "-worldsize " + form.WorldSize + "\n";
    		CONFIG += "### Density of buildings ###\n";
    		CONFIG += "-density " + form.BuildingDensity + "\n";
    		CONFIG += "### Height of building is random ###\n";
    		CONFIG += form.WithRandBuildingH + "\n";
    		CONFIG += "### Add teleporters ###\n";
    		CONFIG += form.WithTP + "\n";
		}

	CONFIG += "### FLAGS OPTIONS ###\n";
	CONFIG += "### List of good flags ###\n";
	var goodflags = ""+form.listofgoodflags;
	CONFIG += goodflags.replace(/,/g," ") +"\n";
	CONFIG += "### List of bad flags ###\n";
	var badflags = ""+form.listofbadflags;
	CONFIG += badflags.replace(/,/g," ") +"\n";

		if(form.LimitedFlag!=undefined){
     		CONFIG += "### Shot Limit per flag ###\n";
     			for( var i=0 ; i<form.LimitedFlag.length;i++){

     			CONFIG += form.LimitedFlag[i] + " " + form.ShotLimitPerFlag[i]+"\n";
     			}
		}
	CONFIG += "### Flags can pop on building ###\n";	
	CONFIG += form.FlagOnBuilding +"\n";


	fs.writeFile(filename, CONFIG,  function(err) {
	   	if (err){
	       return console.error(err);
	   	}
	   console.log(filename + " written successfully!");
	});	
}	