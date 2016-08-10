     
  var Parent                     ="gameStyle";
  var ID_Select_GameType         ="GameType";
  var ID_Input_ShotBeforReload   ="ShotBeforReload";
  var ID_Input_IsJumpAllow       ="IsJumpAllow";
  var ID_Input_SpawnOnBuilding   ="SpawnOnBuilding";
  var ID_Input_BulletRicochet    ="BulletRicochet"; 
  var ID_Div_Check               ="CheckBoxInGameStyle"
  var ID_Div_Gene                ="GeneralGameInfo"
  var ID_Div_Gene2               ="GeneralGameInfo2"

  var ID_Input_Time              ="GameDuration";
  var ID_Input_FriendlyFireKills ="Input_FFKY";
  var ID_Label_FriendlyFireKills ="Label_FFKY";

/** CREATES ELEMENTS **/
  var Div_Gene                = document.createElement("DIV");
  var Div_Gene2               = document.createElement("DIV");
  var Label_Time              = document.createElement("LABEL");
  var Input_Time              = document.createElement("INPUT");
  var Label_GameType          = document.createElement("LABEL");
  var Select_GameType         = document.createElement("SELECT");
  var Label_ShotBeforReload   = document.createElement("LABEL");
  var Input_ShotBeforReload   = document.createElement("INPUT");
  var Div_Check               = document.createElement("DIV");
  var Label_IsJumpAllow       = document.createElement("LABEL");
  var Input_IsJumpAllow       = document.createElement("INPUT");
  var Label_SpawnOnBuilding   = document.createElement("LABEL");
  var Input_SpawnOnBuilding   = document.createElement("INPUT");
  var Label_BulletRicochet    = document.createElement("LABEL");
  var Input_BulletRicochet    = document.createElement("INPUT");
  var Label_FriendlyFireKills = document.createElement("LABEL");
  var Input_FriendlyFireKills = document.createElement("INPUT");

  /*entries*/
  var Entry_GameType1 = document.createElement("option");
  var Entry_GameType2 = document.createElement("option");
  var Entry_GameType3 = document.createElement("option");
  var Entry_GameType4 = document.createElement("option");
  var Entry_GameType5 = document.createElement("option");

  /*text nodes*/
  var title                     = document.createTextNode("Type of game");
  var Text_Time                 = document.createTextNode("Game duration (s)");
  var Text_Input_ShotBeforReload= document.createTextNode("# of shots before reload");
  var Text_IsJumpAllow          = document.createTextNode("Allow to jump");
  var Text_SpawnOnBuilding      = document.createTextNode("Allow to spawn on building");
  var Text_BulletRicochet       = document.createTextNode("Allow bullets to ricochet");

  var Text_FriendlyFireKills    = document.createTextNode("Friendly fire kills you");

  var Text_GameType1            = document.createTextNode("Open Free For All");
  var Text_GameType2            = document.createTextNode("Capture the flag");
  var Text_GameType3            = document.createTextNode("Rabbit : Rabbit is the most scored player");
  var Text_GameType4            = document.createTextNode("Rabbit : Rabbit is the last player who killed it");
  var Text_GameType5            = document.createTextNode("Rabbit : Rabbit is random");

/** ATTRIBUTES **/
  /*DIV*/
  Div_Check.setAttribute("id", ID_Div_Check);
  Div_Gene.setAttribute("id", ID_Div_Gene);
  Div_Gene2.setAttribute("id", ID_Div_Gene2);

  /*LABEL*/
  Label_Time.setAttribute("for"          , ID_Input_Time );
  Label_GameType.setAttribute("for"          , ID_Select_GameType );
  Label_ShotBeforReload.setAttribute("for"   , ID_Input_ShotBeforReload );

  Label_IsJumpAllow.setAttribute("class"    , "GreenRedButton");
  Label_IsJumpAllow.setAttribute("for"       , ID_Input_IsJumpAllow );

  Label_SpawnOnBuilding.setAttribute("class"    , "GreenRedButton");
  Label_SpawnOnBuilding.setAttribute("for"   , ID_Input_SpawnOnBuilding);

  Label_BulletRicochet.setAttribute("class"    , "GreenRedButton");
  Label_BulletRicochet.setAttribute("for"   , ID_Input_BulletRicochet);

  Label_FriendlyFireKills.setAttribute("class"    , "GreenRedButton");
  Label_FriendlyFireKills.setAttribute("for"   , ID_Input_FriendlyFireKills);
  Label_FriendlyFireKills.setAttribute("id",ID_Label_FriendlyFireKills);

  /*SELECT*/
  Select_GameType.setAttribute("id"   , ID_Select_GameType);
  Select_GameType.setAttribute("name"   , ID_Select_GameType);
  Select_GameType.setAttribute("onchange"   , "HideOrShow()");

  Entry_GameType1.setAttribute("value", "-offa");
  Entry_GameType2.setAttribute("value", "-cr");
  Entry_GameType3.setAttribute("value", "-rabbit score");
  Entry_GameType4.setAttribute("value", "-rabbit killer");
  Entry_GameType5.setAttribute("value", "-rabbit random");


  /*INPUT*/
  Input_Time.setAttribute("type" , "number");
  Input_Time.setAttribute("min" , 60);
  Input_Time.setAttribute("id", ID_Input_Time);
  Input_Time.setAttribute("value", "780");//-time 780
  Input_Time.setAttribute("name" , ID_Input_Time);

  Input_ShotBeforReload.setAttribute("type" , "number");
  Input_ShotBeforReload.setAttribute("min" , 1);
  Input_ShotBeforReload.setAttribute("id", ID_Input_ShotBeforReload);
  Input_ShotBeforReload.setAttribute("value", "5");//-ms 5
  Input_ShotBeforReload.setAttribute("name" , ID_Input_ShotBeforReload);

  Input_IsJumpAllow.setAttribute("type" , "checkbox");
  Input_IsJumpAllow.setAttribute("name" , ID_Input_IsJumpAllow);
  Input_IsJumpAllow.setAttribute("id", ID_Input_IsJumpAllow);
  Input_IsJumpAllow.setAttribute("value"  ,  "-j" );//-j if checked
  Input_IsJumpAllow.setAttribute("checked",'checked');

  Input_SpawnOnBuilding.setAttribute("type" , "checkbox");
  Input_SpawnOnBuilding.setAttribute("name" , ID_Input_SpawnOnBuilding);
  Input_SpawnOnBuilding.setAttribute("id" , ID_Input_SpawnOnBuilding);
  Input_SpawnOnBuilding.setAttribute("value" , "-sb"); //-sb if checked

  Input_BulletRicochet.setAttribute("type" , "checkbox");
  Input_BulletRicochet.setAttribute("name" , ID_Input_BulletRicochet);
  Input_BulletRicochet.setAttribute("id" , ID_Input_BulletRicochet);
  Input_BulletRicochet.setAttribute("value" , "+r"); //+r if checked
  Input_BulletRicochet.setAttribute("checked",'checked');

  Input_FriendlyFireKills.setAttribute("type" , "checkbox");
  Input_FriendlyFireKills.setAttribute("name" ,ID_Input_FriendlyFireKills);
  Input_FriendlyFireKills.setAttribute("id" , ID_Input_FriendlyFireKills);
  Input_FriendlyFireKills.setAttribute("value" , "-tk"); //-tk if checked
  Input_FriendlyFireKills.setAttribute("checked" , "checked"); //-tk if checked

/** FILL DOM TREE **/
  Label_Time.appendChild(Text_Time);
  Label_GameType.appendChild(title);
  Label_ShotBeforReload.appendChild(Text_Input_ShotBeforReload);
  Label_IsJumpAllow.appendChild(Text_IsJumpAllow);
  Label_SpawnOnBuilding.appendChild(Text_SpawnOnBuilding);
  Label_BulletRicochet.appendChild(Text_BulletRicochet);
  Label_FriendlyFireKills.appendChild(Text_FriendlyFireKills);

  Entry_GameType1.appendChild(Text_GameType1);
  Entry_GameType2.appendChild(Text_GameType2);
  Entry_GameType3.appendChild(Text_GameType3);
  Entry_GameType4.appendChild(Text_GameType4);
  Entry_GameType5.appendChild(Text_GameType5);

  Select_GameType.appendChild(Entry_GameType1);
  Select_GameType.appendChild(Entry_GameType2);
  Select_GameType.appendChild(Entry_GameType3);
  Select_GameType.appendChild(Entry_GameType4);
  Select_GameType.appendChild(Entry_GameType5);

  Div_Check.appendChild(Input_IsJumpAllow);
  Div_Check.appendChild(Label_IsJumpAllow);
  Div_Check.appendChild(Input_SpawnOnBuilding);
  Div_Check.appendChild(Label_SpawnOnBuilding);
  Div_Check.appendChild(Input_BulletRicochet);
  Div_Check.appendChild(Label_BulletRicochet);
  Div_Check.appendChild(Input_FriendlyFireKills);
  Div_Check.appendChild(Label_FriendlyFireKills);

  Div_Gene.appendChild(Label_Time);
  Div_Gene.appendChild(Input_Time);
  Div_Gene.appendChild(Label_GameType);
  Div_Gene.appendChild(Select_GameType);
  Div_Gene2.appendChild(Label_ShotBeforReload);
  Div_Gene2.appendChild(Input_ShotBeforReload);

  document.getElementById(Parent).appendChild(Div_Gene);
  document.getElementById(Parent).appendChild(Div_Gene2);
  document.getElementById(Parent).appendChild(Div_Check);


  /** Hide or show element*/
  Label_FriendlyFireKills.style.display = 'none';
  Input_FriendlyFireKills.style.display = 'none';
  Input_FriendlyFireKills.checked = false;


      