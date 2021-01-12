/*********************************/
//   DEPENDENCIES
/*********************************/
var express = require('express');
var router = express.Router();
var fs = require('fs');
const exec = require('child_process').exec;
var debug = require('debug')('demo_express:server');


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
   // debug('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

/*********************************/
//  GET home page
/*********************************/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BZFlag helper' });
});

/*********************************/
//  GET BZConfig page. 
/*********************************/

router.get('/BZConfig', function(req, res) {
//Redirect to kill server page if a server is already running
  exec( "ps cax | grep bzfs" , (error, stdout, stderr) => {  
        if(stdout){
            debug(`stdout: ${stdout}`);
            res.redirect('/api/KillBZServer?RedirMessage=Configuration+not+allowed+:+serveur+is+already+running');
            return;
        }
        RenderWithMessage(res,'../views/BZConfig.html',req.query.RedirMessage );
     });

});

/*********************************/
//   POST BZConfig page (submit).
/*********************************/
router.post('/BZConfig', function(req, res) {

    var ConfFileName = "bz.cfg";
    Form = req.body;
    WriteConfigFile(Form,ConfFileName,function(){
    var CMD_Run_Server = "" + Form.BZPath + " -conf " + ConfFileName;
    ExecThisCommand(CMD_Run_Server);
    });

   res.redirect('/api/KillBZServer?RedirMessage=Server+lanch+...+redirecting');

});

/*********************************/
//  GET Kill Server page
/*********************************/
router.get('/KillBZServer', function(req, res, next) {
//Redirect to BzConfig  page if a server is not running
  exec( "ps cax | grep bzfs" , (error, stdout, stderr) => {  
        if(stdout){
            debug(`stdout: ${stdout}`);
            debug(`serveur is running`);
            var Message = req.query.RedirMessage;
            if(Message){ //if its a redirection show a warnin
             res.render('../views/KillBZServer.html', {redirecting : true, RedirMessage: Message, ServerParameters:  JSON.stringify(Form,undefined,2) });
            }
            else{ //if not render without warning
              res.render('../views/KillBZServer.html', {redirecting : false, ServerParameters:  JSON.stringify(Form,undefined,2) });
            }
            return;
        }
          res.redirect('/api/BZConfig?RedirMessage=Noting+to+kill...redirecting');
     });
});


/************************************************/
//  POST Kill Server (user want to kill server ?)
/************************************************/
router.post('/KillBZServer', function(req, res, next) {
  //Kill the server and redirect to config

  KillServer( function(){

    res.redirect('/api/BZConfig?RedirMessage=Server+Killed+...+redirecting');
  });

});

/*********************************/
//       EXPORT ROUTES
/*********************************/
module.exports = router;  

/*********************************/
//       FUNCTIONS
/*********************************/
//**** render with a message over the navbar
function RenderWithMessage(res,NewRender,Message){

      if ( Message ) {  //if its from a redirection render NewRender with a Message

           res.render(NewRender,{redirecting : true, RedirMessage: Message});
           } 
         else{ //else render the BZconfig without warning message
            res.render(NewRender,{ redirecting : false });

         }  
}


//**** KIll THe server if it exists

function KillServer(callback){      

  exec( "ps cax | grep bzfs" , (error, stdout, stderr) => {
          
        if(error){
            console.error(`exec error: ${error}`);
            debug(`no server running ... can't kill it`);
            return ;
        }
          ExecThisCommand("pkill bzfs");

     });

  setTimeout(callback,50);
}

// Function to execute command
function ExecThisCommand(CMD){

      exec( CMD, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          debug(`stdout: ${stdout}`);
          debug(`stderr: ${stderr}`);
     });
}


// Write config file for bzfs
function WriteConfigFile(form,filename,callback){
 var date = new Date(); 
 var timestamp= date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes();

 var PosOf2_0_16 = ("" + form.BZPath).search("2.0.16");

 var CONFIG  = "### BZFLag server configuration ###\n";
    CONFIG += "### Creation Time : " + timestamp + " ###\n";
    CONFIG += "### Runnig server @: " + form.BZPath + " ###\n";
    CONFIG += "### Server Options: ###\n";
    CONFIG += "-p " + form.Port + "\n";
    CONFIG += "### MAIN OPTIONS: ###\n";
    CONFIG += "### Game Type : ###\n";
      if(PosOf2_0_16 == -1){ //option -offa not allowed in BzFlag version 2.0.16 (offa is then default)
         CONFIG += form.GameType + "\n";
      }
    CONFIG += "### Game duration ###\n";
    CONFIG +=  "-time " + form.GameDuration + "\n";
    CONFIG += "### Number of shots before reload: (dafault :5) ###\n";
    CONFIG += "-ms " + form.ShotBeforReload + "\n";

      if( "" + form.IsJumpAllow != "undefined"){ //option -offa not allowed in BzFlag version 2.0.16 (offa is then default)
         CONFIG += "### This option allows jumping : ###\n";
         CONFIG += form.IsJumpAllow + "\n";
      }
      if( "" + form.SpawnOnBuilding != "undefined"){ 
        CONFIG += "### Players can born on building: ###\n";
        CONFIG += form.SpawnOnBuilding + "\n";
      }  
      if( "" + form.BulletRicochet != "undefined"){ 
        CONFIG += "### Bullets can ricochets: ###\n";
        CONFIG += form.BulletRicochet + "\n";
      }
      if(form.GameType != "-cr"){
        CONFIG += "### RANDOM MAP SETTINGS ###\n";
        CONFIG += "### Map Size ###\n";
        CONFIG += "-worldsize " + form.WorldSize + "\n";
        CONFIG += "### Density of buildings ###\n";
        CONFIG += "-density " + form.BuildingDensity + "\n";
        CONFIG += " # This option allows world objects to be randomly rotated. \n"
        CONFIG += "-b \n"
        if( "" + form.WithRandBuildingH != "undefined"){ 
          CONFIG += "### Height of building is random ###\n";
          CONFIG += form.WithRandBuildingH + "\n";
        } 
        if( "" + form.WithTP != "undefined"){ 
          CONFIG += "### Add teleporters ###\n";
          CONFIG += form.WithTP + "\n";
        }
      }

  CONFIG += "### FLAGS OPTIONS ###\n";
  CONFIG += "### List of good flags ###\n";
  var goodflags = "" + form.listofgoodflags;
  CONFIG += goodflags.replace(/,/g," ")  +"\n";
  CONFIG += "# Bad flags are automatically dropped after this many wins. (not in web app)\n";
  CONFIG +="-sw 1" + "\n";
    if(form.AntidoteFlag!=undefined){
      CONFIG += "# Antidote flag is allowed\n";
      CONFIG += form.AntidoteFlag + "\n";
    }
  CONFIG += "# time before dropping a badflag (s)\n";
  CONFIG += "-st " + form.BadDrop + "\n";
  CONFIG += "### List of bad flags ###\n";
  var badflags = "" + form.listofbadflags;
  CONFIG += badflags.replace(/,/g," ") + "\n";

    if(form.LimitedFlag!=undefined){
        CONFIG += "### Shot Limit per flag ###\n";
          for( var i=0 ; i<form.LimitedFlag.length;i++){

          CONFIG += form.LimitedFlag[i] + " " + form.ShotLimitPerFlag[i]+"\n";
          }
    }
     if( "" + form.FlagOnBuilding != "undefined"){ 
       CONFIG += "### Flags can pop on building ###\n"; 
       CONFIG += form.FlagOnBuilding + "\n";
     }

  fs.writeFile(filename, CONFIG,  function(err) {
      if (err){
         return console.error(err);
      }

     debug(filename + " written successfully!");
     callback(form,filename);

  });
}
