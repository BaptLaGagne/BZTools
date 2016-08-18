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
function addFlagLimit(){

    var Parent   = "ShotPerFlag";
    var SelectID = "SelectShotFlag"+counter;
    var NewDivID = "ContainerShotFlag"+counter;
    var NewNumID = "NumShots"+counter;

/** CREATES ELEMENTS **/
    var NewDiv         = document.createElement("DIV");
    var NewSelect      = document.createElement("SELECT");
    var NewNumberInput = document.createElement("INPUT");
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

            var Label = document.createTextNode(JsonData.flags.goodflags[i].Name);
            SelectEntry.appendChild(Label);

            NewSelect.appendChild(SelectEntry);
         }   
    }); 

/** FILL DOM TREE **/
    lab1.appendChild(title1);      
    lab2.appendChild(title2);
    NewDiv.appendChild(lab1);
    NewDiv.appendChild(NewSelect);
    NewDiv.appendChild(lab2);
    NewDiv.appendChild(NewNumberInput);
    document.getElementById(Parent).appendChild(NewDiv);

    counter++;
}; 

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

    console.log(NbrOfBadFlags);

    for( var i = 0 ; i < NbrOfGoodFlags ; i++ )
    {
         var Flag_i = document.getElementById(JsonData.flags.goodflags[i].abrv);
         console.log(Flag_i.checked);

         if(Flag_i.checked)
         {
            Flag_i.value= "+" + Flag_i.value;
         }
         else
         {  //set the checkbox to checked in order to send the value to the server
            console.log("flag unchek :"+JsonData.flags.goodflags[i].abrv)
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

