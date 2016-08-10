
/** ID's **/
	var ID_Select      = "GameType";
	var ID_Parent      = "RandomMap";
	var ID_Div_check   = "RM_DivCheck";
	
	var ID_WithTP                = "WithTP";
	var ID_WithRandBuildingHeigh = "WithRandBuildingH";

	var ID_BuildDensity = "BuildingDensity";
	var ID_WorldSize    = "WorldSize";

	var ID_Span_Input_BuildDensity = "RM_BuildDensity_span";
	var ID_Div_Density = "RM_Density"
/** CREATES ELEMENTS **/
	var FieldSet_RandomMap = document.createElement("FIELDSET");
	var Legend_RandomMap   = document.createElement("LEGEND");
	var Text_Legend        = document.createTextNode("RANDOM MAP CONFIG");
	
	var Div_Check                   = document.createElement("DIV");
	var Label_WithTP                = document.createElement("LABEL");
	var Input_WithTP                = document.createElement("INPUT");
	var Label_WithRandBuildingHeigh = document.createElement("LABEL");
	var Input_WithRandBuildingHeigh = document.createElement("INPUT");

	var Div_Size = document.createElement("DIV");
	var Div_Density        = document.createElement("DIV");
	var Label_BuildDensity = document.createElement("LABEL");
	var Input_BuildDensity = document.createElement("INPUT");
	var Span_BuildDensity  = document.createElement("SPAN");

	var Label_WorldSize    = document.createElement("LABEL");
	var Input_WorldSize    = document.createElement("INPUT");

  /*text nodes*/
	var Text_WithTP                = document.createTextNode("Teleporters");
	var Text_WithRandBuildingHeigh = document.createTextNode("Random building heigh");
	var Text_BuildDensity          = document.createTextNode("Building Density");
	var Text_WorldSize             = document.createTextNode("World Size");

/** ATTRIBUTES **/

	FieldSet_RandomMap.setAttribute("class","form-group");
  /*LABEL*/
  	//checkboxes
  	Label_WithTP.setAttribute("for"       , ID_WithTP );
	Label_WithTP.setAttribute("class"    , "GreenRedButton");

	Label_WithRandBuildingHeigh.setAttribute("for"   , ID_WithRandBuildingHeigh);
	Label_WithRandBuildingHeigh.setAttribute("class"    , "GreenRedButton");

  	Label_WorldSize.setAttribute("for"   , ID_WorldSize );
	Label_BuildDensity.setAttribute("for" , ID_BuildDensity);

  /*INPUT*/
	//checkboxes
	Input_WithTP.setAttribute("type" , "checkbox");
	Input_WithTP.setAttribute("name" , ID_WithTP);
	Input_WithTP.setAttribute("id", ID_WithTP);
	Input_WithTP.setAttribute("value"  ,  "-t" );//-t if checked
	Input_WithTP.setAttribute("checked",'checked');

	Input_WithRandBuildingHeigh.setAttribute("type" , "checkbox");
	Input_WithRandBuildingHeigh.setAttribute("name" , ID_WithRandBuildingHeigh);
	Input_WithRandBuildingHeigh.setAttribute("id", ID_WithRandBuildingHeigh);
	Input_WithRandBuildingHeigh.setAttribute("value"  ,  "-h" ); //-h if checked
	Input_WithRandBuildingHeigh.setAttribute("checked",'checked');

	//Slide bar
	var default_density = 5;
	Input_BuildDensity.setAttribute("type" , "range");
	Input_BuildDensity.setAttribute("id",ID_BuildDensity );
	Input_BuildDensity.setAttribute("Name", ID_BuildDensity);
	Input_BuildDensity.setAttribute("value", default_density);//-density 7
	Input_BuildDensity.setAttribute("defaultValue", default_density );
	Input_BuildDensity.setAttribute("min", 1);
	Input_BuildDensity.setAttribute("max", 10);
	Input_BuildDensity.setAttribute("step", 0.2 );
	Input_BuildDensity.setAttribute("onchange", "ShowSlideValue(this.value,'"+ID_Span_Input_BuildDensity+"')");

		//span for slide bar
	Span_BuildDensity.setAttribute("id" , ID_Span_Input_BuildDensity);
	Span_BuildDensity.innerHTML = default_density;

	//text entry
  	Input_WorldSize.setAttribute("type" , "number");
  	Input_WorldSize.setAttribute("min" , 5);
  	Input_WorldSize.setAttribute("max" , 1000);
  	Input_WorldSize.setAttribute("id", ID_WorldSize);
  	Input_WorldSize.setAttribute("value", 250);//-worldsize 800
  	Input_WorldSize.setAttribute("name" , ID_WorldSize);

	//DIV
	Div_Check.setAttribute("id", ID_Div_check);

	Div_Density.setAttribute("id",ID_Div_Density);

/** FILL DOM TREE **/
 	Legend_RandomMap.appendChild(Text_Legend);
 	FieldSet_RandomMap.appendChild(Legend_RandomMap);

 	Label_WithTP.appendChild(Text_WithTP);
 	Label_WithRandBuildingHeigh.appendChild(Text_WithRandBuildingHeigh);

 	Div_Check.appendChild(Input_WithRandBuildingHeigh);
 	Div_Check.appendChild(Label_WithRandBuildingHeigh);
 	Div_Check.appendChild(Input_WithTP);
 	Div_Check.appendChild(Label_WithTP);

 	Label_WorldSize.appendChild(Text_WorldSize);
 	Label_BuildDensity.appendChild(Text_BuildDensity);

 	Div_Size.appendChild(Label_WorldSize);
 	Div_Size.appendChild(Input_WorldSize);

 	Div_Density.appendChild(Label_BuildDensity);
 	Div_Density.appendChild(Span_BuildDensity);
 	Div_Density.appendChild(Input_BuildDensity);


	document.getElementById(ID_Parent).appendChild(FieldSet_RandomMap);
	document.getElementById(ID_Parent).appendChild(Div_Size);
	document.getElementById(ID_Parent).appendChild(Div_Density);
	document.getElementById(ID_Parent).appendChild(Div_Check);





