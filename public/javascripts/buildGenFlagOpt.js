     
  var Parent            = "GenFlagOpt";
  var ID_FlagOnBuilding = "FlagOnBuilding";
  var ID_DivCheck       = "CheckBoxInFlagOpt";
  var ID_Input_AntidoteFlag = "AntidoteFlag";
  var ID_Input_BadDrop      = "BadDrop";

/** CREATES ELEMENTS **/

  var Label_FlagOnBuilding = document.createElement("LABEL");
  var Input_FlagOnBuilding = document.createElement("INPUT");
  var DivCheck = document.createElement("DIV");
  
  var Label_AntidoteFlag = document.createElement("LABEL");
  var Input_AntidoteFlag = document.createElement("INPUT");
  var Label_BadDrop      = document.createElement("LABEL");
  var Input_BadDrop      = document.createElement("INPUT");

  /*text nodes*/
  var Text_FlagOnBuilding  = document.createTextNode("flags on buildings");
  var Text_AntidoteFlag  = document.createTextNode( "Antidote Flag" );
  var Text_BadDrop       = document.createTextNode( "Time before dropping bad flag (s)" );
/** ATTRIBUTES **/
  /*DIV*/
  DivCheck.setAttribute("id", ID_DivCheck);
  /*LABEL*/
  Label_FlagOnBuilding.setAttribute("for", ID_FlagOnBuilding);
  Label_FlagOnBuilding.setAttribute("class", "GreenRedButton");

  Label_AntidoteFlag.setAttribute("for"    , ID_Input_AntidoteFlag );
  Label_AntidoteFlag.setAttribute("class"    , "GreenRedButton");

  Label_BadDrop.setAttribute("for", ID_Input_BadDrop );


  /*INPUT*/
  Input_FlagOnBuilding.setAttribute("type" , "checkbox");
  Input_FlagOnBuilding.setAttribute("name" , ID_FlagOnBuilding);
  Input_FlagOnBuilding.setAttribute("id"   , ID_FlagOnBuilding);
  Input_FlagOnBuilding.setAttribute("value" , "-fb"); //-fb if checked

  Input_AntidoteFlag.setAttribute("type"   , "checkbox");
  Input_AntidoteFlag.setAttribute("name"   , ID_Input_AntidoteFlag);
  Input_AntidoteFlag.setAttribute("value"  , "-sa" );
  Input_AntidoteFlag.setAttribute("id"     , ID_Input_AntidoteFlag);
  Input_AntidoteFlag.setAttribute("checked",'checked');

  Input_BadDrop.setAttribute("type"   , "number");
  Input_BadDrop.setAttribute("min"    , 0);
  Input_BadDrop.setAttribute("max"    , 120);
  Input_BadDrop.setAttribute("name"   , ID_Input_BadDrop);
  Input_BadDrop.setAttribute("value"  , 10 );
  Input_BadDrop.setAttribute("id"     , ID_Input_BadDrop);

/** FILL DOM TREE **/

  Label_FlagOnBuilding.appendChild(Text_FlagOnBuilding);
  Label_AntidoteFlag.appendChild(Text_AntidoteFlag);
  Label_BadDrop.appendChild(Text_BadDrop);

  DivCheck.appendChild(Input_FlagOnBuilding);
  DivCheck.appendChild(Label_FlagOnBuilding);
  DivCheck.appendChild(Input_AntidoteFlag);
  DivCheck.appendChild(Label_AntidoteFlag);
  
  document.getElementById(Parent).appendChild(Label_BadDrop);
  document.getElementById(Parent).appendChild(Input_BadDrop);
  document.getElementById(Parent).appendChild(DivCheck);




      