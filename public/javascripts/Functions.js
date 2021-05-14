/********************** Load JSON file containing flag name and abreviation***************************/
function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

/********************** Hide Or Show the random map configurator**************************************/
// Should not display if using capture the flag : use a balanced map instead
function HideOrShow(){

    var SelectedGameTypeIndex = document.getElementById(ID_Select).selectedIndex;
    var SelectedGameType      = document.getElementById(ID_Select).options[SelectedGameTypeIndex].text;

    var dom_obj_Parent                  = document.getElementById(ID_Parent);
    var dom_obj_Input_FriendlyFireKills = document.getElementById(ID_Input_FriendlyFireKills);
    var dom_obj_Label_FriendlyFireKills = document.getElementById(ID_Label_FriendlyFireKills);

    var dom_obj_Input_WithTP     = document.getElementById(ID_WithTP);
    var dom_obj_Input_RandHeight = document.getElementById(ID_WithRandBuildingHeigh);
    var dom_obj_Input_Density    = document.getElementById(ID_BuildDensity);
    var dom_obj_Input_WorldSize  = document.getElementById(ID_WorldSize);

    var dom_obj_Input_WorldSize  = document.getElementById(ID_WorldSize);


    if( SelectedGameType !== 'Capture the flag' )
    {
        dom_obj_Parent.style.display = '';
        dom_obj_Input_WithTP.disabled     = false;    
        dom_obj_Input_RandHeight.disabled = false;
        dom_obj_Input_Density.disabled    = false;
        dom_obj_Input_WorldSize.disabled  = false;
    }
    else 
    {
        dom_obj_Parent.style.display = 'none';
        dom_obj_Input_WithTP.disabled     = true;    
        dom_obj_Input_RandHeight.disabled = true;
        dom_obj_Input_Density.disabled    = true;
        dom_obj_Input_WorldSize.disabled  = true;
    }


    if( SelectedGameType !== 'Open Free For All' )
    {
        dom_obj_Input_FriendlyFireKills.style.display = '';
        dom_obj_Label_FriendlyFireKills.style.display = '';
        dom_obj_Input_FriendlyFireKills.checked        = true;
    }
    else 
    {
         dom_obj_Input_FriendlyFireKills.style.display  = 'none';
         dom_obj_Label_FriendlyFireKills.style.display  = 'none'; 
         dom_obj_Input_FriendlyFireKills.checked         = false;
    }

}
/********************** Update value user selected via the input range (slide bar) ******************/
function ShowSlideValue(newValue,ElementID){
        document.getElementById(ElementID).innerHTML=newValue;
}

/********************** Function to add two input to select shot limit per flag  ********************/
var counter = 1;
function addFlagLimit(DefaultValue){

    var Parent   = "ShotPerFlag";
    var SelectID = "SelectShotFlag"+counter;
    var NewDivID = "ContainerShotFlag"+counter;
    var NewNumID = "NumShots"+counter;

/** CREATES ELEMENTS **/
    var NewDiv         = document.createElement("DIV");
    var NewSelect      = document.createElement("SELECT");
    var NewNumberInput = document.createElement("INPUT");
    var DeleteEntry = document.createElement("BUTTON");
    DeleteEntry.innerHTML = "X";

    var lab1 = document.createElement("LABEL");
    var lab2 = document.createElement("LABEL");
    var title1 = document.createTextNode("Flag");
    var title2 = document.createTextNode("# shots");

/** ATTRIBUTES **/
    NewDiv.setAttribute("id", NewDivID);
    NewSelect.setAttribute("id", SelectID);
    NewSelect.setAttribute("name", "LimitedFlag[]");

    NewNumberInput.setAttribute("type" , "number");
    NewNumberInput.setAttribute("min" , 1);
    NewNumberInput.setAttribute("max" , 10);
    NewNumberInput.setAttribute("id", NewNumID);
    NewNumberInput.setAttribute("value", "5");
    NewNumberInput.setAttribute("name" , "ShotLimitPerFlag[]");

    lab1.setAttribute("for",SelectID)
    lab2.setAttribute("for",NewNumID)

    //Create elements option and attribute for SELECT by reading the List of BZFlag flags
    loadJSON("../data/flagList.json", function(response) 
    {
        if(JsonData)
        { 
            JsonData = JSON.parse(response);
         }   
        var NbrOfGoodFlags =  JsonData.flags.goodflags.length;

         for( var i = 0 ; i < NbrOfGoodFlags ; i++ )
         { 
            var SelectEntry = document.createElement("option");
            SelectEntry.setAttribute("value", "-sl " + JsonData.flags.goodflags[i].abrv);

            if("-sl " + JsonData.flags.goodflags[i].abrv == DefaultValue )
             SelectEntry.setAttribute("selected", "selected");


            var Label = document.createTextNode(JsonData.flags.goodflags[i].Name);
            SelectEntry.appendChild(Label);

            NewSelect.appendChild(SelectEntry);
         }   
    }); 

    DeleteEntry.onclick = () => {
        document.getElementById(Parent).removeChild(NewDiv);
    }

/** FILL DOM TREE **/
    lab1.appendChild(title1);      
    lab2.appendChild(title2);
    NewDiv.appendChild(lab1);
    NewDiv.appendChild(NewSelect);
    NewDiv.appendChild(lab2);
    NewDiv.appendChild(NewNumberInput);
    NewDiv.appendChild(DeleteEntry);
    document.getElementById(Parent).appendChild(NewDiv);

    counter++;
}; 

/********************** Function to add two input to select shot limit per flag  ********************/
var counter_plugin = 1;
function addPlugin(){

    var Parent   = "Plugins";
    var SelectID = "SelectPlugin"+counter_plugin;
    var NewDivID = "ContainerPlugin"+counter_plugin;
    var NewConfID = "PluginConf"+counter_plugin;

/** CREATES ELEMENTS **/
    var NewDiv         = document.createElement("DIV");
    var NewSelect      = document.createElement("SELECT");
    var NewTextInput = document.createElement("INPUT");
    var DeleteEntry = document.createElement("BUTTON");
    DeleteEntry.innerHTML = "X";

    var lab1 = document.createElement("LABEL");
    var lab2 = document.createElement("LABEL");
    var title1 = document.createTextNode("Plugin");
    var title2 = document.createTextNode("Conf");

/** ATTRIBUTES **/
    NewDiv.setAttribute("id", NewDivID);
    NewSelect.setAttribute("id", SelectID);
    NewSelect.setAttribute("name", "PluginsPath[]");

    NewTextInput.setAttribute("type" , "text");
    NewTextInput.setAttribute("size" , 60);
    NewTextInput.setAttribute("id", NewConfID);
    NewTextInput.setAttribute("value", "");
    NewTextInput.setAttribute("name" , "PluginsConf[]");

    lab1.setAttribute("for",SelectID)
    lab2.setAttribute("for",NewConfID)

    //Create elements option and attribute for SELECT by reading the List of BZFlag plugins
    loadJSON( "../data/plugins.json", function(response) 
    {
        const plugins = JSON.parse( response ).plugins;

        var NbrOfPlugins = plugins.length;

         for( var i = 0 ; i < NbrOfPlugins ; i++ )
         { 
            var SelectEntry = document.createElement("option");
            SelectEntry.setAttribute("value", "-loadplugin " + plugins[i].path);

            var Label = document.createTextNode( plugins[i].name );
            SelectEntry.appendChild(Label);

            NewSelect.appendChild(SelectEntry);
         }   
    }); 

    DeleteEntry.onclick = () => {
        document.getElementById(Parent).removeChild(NewDiv);
    }

/** FILL DOM TREE **/
    lab1.appendChild(title1);      
    lab2.appendChild(title2);
    NewDiv.appendChild(lab1);
    NewDiv.appendChild(NewSelect);
    NewDiv.appendChild(lab2);
    NewDiv.appendChild(NewTextInput);
    NewDiv.appendChild(DeleteEntry);
    document.getElementById(Parent).appendChild(NewDiv);

    counter_plugin++;
}; 

var USERWANTTOSELECT = { good: true, bad: false};
function selectAll(parent, type) {

    const parentObj = document.getElementById(parent);
    const childs = parentObj.children;
    if ( childs ) {

      for (var c = 0; c < childs.length; c++ ) {
        
        if ( childs[ c ].tagName == "INPUT" ) {
          console.log(childs[ c ])
          if ( USERWANTTOSELECT[type] ) 
            childs[c].setAttribute('checked', true)
          else {
            childs[c].setAttribute('checked', true)

          }
        }

      }

      USERWANTTOSELECT[type]!=USERWANTTOSELECT[type]
    }

 }

function selectAllGood() {

    selectAll("goodflags", "good");
}

function selectAllBad() {

    selectAll("badflags", "bad");
}

/********************** Save form in local storage when form change ********************/
/*document.getElementById("ConfigForm").addEventListener('change', function () {
    alert("change");

}, false);
*/
/********************** Prepare Datas for submit (on click on submit)********************/
//GRRrrrr : uncheck checkbox does not send their state and value to the server 
//The following is a workaround
function PrepareDataAndSubmit(frm){

    var NbrOfGoodFlags =  JsonData.flags.goodflags.length;
    var NbrOfBadFlags  = JsonData.flags.badflags.length;

    for( var i = 0 ; i < NbrOfGoodFlags ; i++ )
    {
         var Flag_i = document.getElementById(JsonData.flags.goodflags[i].abrv);

         if(Flag_i.checked)
         {
            Flag_i.value= "+" + Flag_i.value;
         }
         else
         {  //set the checkbox to checked in order to send the value to the server
            Flag_i.checked = true;
            Flag_i.value = "-" + Flag_i.value;
         }
    }
    for( var i = 0 ; i < NbrOfBadFlags ; i++ )
    {
         var Flag_i = document.getElementById(JsonData.flags.badflags[i].abrv);

         if(Flag_i.checked)
         {
            Flag_i.value= "+" + Flag_i.value;
         }
         else
         {  //set the checkbox to checked in order to send the value to the server
            Flag_i.checked = true;
            Flag_i.value = "-" + Flag_i.value;
         }
    }

  //form submission
    frm.submit();

}

