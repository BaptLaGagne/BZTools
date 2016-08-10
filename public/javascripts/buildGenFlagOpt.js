     
  var Parent            = "GenFlagOpt";
  var ID_FlagOnBuilding = "FlagOnBuilding";
  var ID_DivCheck       = "CheckBoxInFlagOpt";

/** CREATES ELEMENTS **/

  var Label_FlagOnBuilding = document.createElement("LABEL");
  var Input_FlagOnBuilding = document.createElement("INPUT");
  var DivCheck = document.createElement("DIV");
 

  /*text nodes*/
  var Text_FlagOnBuilding  = document.createTextNode("flags on buildings");

/** ATTRIBUTES **/
  /*DIV*/
  DivCheck.setAttribute("id", ID_DivCheck);
  /*LABEL*/
  Label_FlagOnBuilding.setAttribute("for", ID_FlagOnBuilding);
  Label_FlagOnBuilding.setAttribute("class", "GreenRedButton");

  /*INPUT*/
  Input_FlagOnBuilding.setAttribute("type" , "checkbox");
  Input_FlagOnBuilding.setAttribute("name" , ID_FlagOnBuilding);
  Input_FlagOnBuilding.setAttribute("id"   , ID_FlagOnBuilding);
  Input_FlagOnBuilding.setAttribute("value" , "-fb"); //-fb if checked


/** FILL DOM TREE **/

  Label_FlagOnBuilding.appendChild(Text_FlagOnBuilding);
  DivCheck.appendChild(Input_FlagOnBuilding);
  DivCheck.appendChild(Label_FlagOnBuilding);
  document.getElementById(Parent).appendChild(DivCheck);

  






      