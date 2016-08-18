     
  var Parent            = "serveropt";
  var ID_Div_Serv       = "div_serv"

  var ID_Input_BZPath   = "BZPath";
  var ID_Input_Port     = "Port";

/** CREATES ELEMENTS **/
  var Div_Serv      = document.createElement("DIV");
  var Label_BZPath  = document.createElement("LABEL");
  var Input_BZPath  = document.createElement("INPUT");
  var Label_Port    = document.createElement("LABEL");
  var Input_Port    = document.createElement("INPUT");

  /*text nodes*/
  var Text_BZPath  = document.createTextNode("Path of the bzfs binary");
  var Text_Port    = document.createTextNode("Port");

/** ATTRIBUTES **/
  /*DIV*/
  Div_Serv.setAttribute("id", ID_Div_Serv);

  /*LABEL*/
  Label_BZPath.setAttribute("for"  , ID_Input_BZPath );
  Label_Port.setAttribute("for", ID_Input_Port );

  /*INPUT*/
  Input_BZPath.setAttribute("type" , "text");
  Input_BZPath.setAttribute("id", ID_Input_BZPath);
  Input_BZPath.setAttribute("value", "/Applications/BZFlag-2.0.16.app/Contents/MacOS/bzfs");
  Input_BZPath.setAttribute("name" , ID_Input_BZPath);
  Input_BZPath.setAttribute("size" , "55");

  Input_Port.setAttribute("type" , "number");
  Input_Port.setAttribute("id", ID_Input_Port);
  Input_Port.setAttribute("value", "5154");
  Input_Port.setAttribute("name" , ID_Input_Port);
  Input_Port.setAttribute("min" , "1");

/** FILL DOM TREE **/
  Label_BZPath.appendChild(Text_BZPath);
  Label_Port.appendChild(Text_Port);
  Div_Serv.appendChild(Label_BZPath);
  Div_Serv.appendChild(Input_BZPath);
  Div_Serv.appendChild(Label_Port);
  Div_Serv.appendChild(Input_Port);

  document.getElementById(Parent).appendChild(Div_Serv);


      