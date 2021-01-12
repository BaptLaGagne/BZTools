

/** ID's **/
var ID_Parent      = "SelectMap";
var ID_SelectMap   =  "MapSelect";

/** CREATES ELEMENTS **/
var FieldSet_SelectMap = document.createElement("FIELDSET");
var Legend_SelectMap   = document.createElement("LEGEND");
var Text_Legend        = document.createTextNode("SELECT MAP");
var Select_Map        = document.createElement("SELECT");

loadJSON( "../data/maps/maps.json", function( response ) {

    const maps = JSON.parse( response ).maps;

    var opt = document.createElement( "OPTION" );
    opt.value = '' ;
    opt.appendChild( document.createTextNode( 'none' ) );
    Select_Map.appendChild( opt );

    for ( let i = 0; i < maps.length; i++ ) {

        opt = document.createElement( "OPTION" );
        opt.value = "-world " + maps[ i ];
        opt.appendChild( document.createTextNode(  maps[ i ].split('/').pop() ) )
        Select_Map.appendChild( opt );

    }

} )


Select_Map.setAttribute("id", ID_SelectMap);
Select_Map.setAttribute("name", ID_SelectMap);
/** FILL DOM TREE **/
Legend_SelectMap.appendChild(Text_Legend);
FieldSet_SelectMap.appendChild(Legend_SelectMap);
FieldSet_SelectMap.appendChild(Select_Map);

document.getElementById(ID_Parent).appendChild(FieldSet_SelectMap);


