
      var JsonData;
      var ParentGood="goodflags";
      var ParentBad ="badflags";

      loadJSON("../data/flagList.json", function(response) 
      {
       JsonData = JSON.parse(response);

       var NbrOfGoodFlags =  JsonData.flags.goodflags.length;
       var NbrOfBadFlags  = JsonData.flags.badflags.length ;

      for( var i = 0 ; i < NbrOfGoodFlags ; i++ )
      {
        var NewLabel = document.createElement("LABEL");
        var NewInput = document.createElement("INPUT");

        NewLabel.setAttribute("for"    , JsonData.flags.goodflags[i].abrv );
        NewLabel.setAttribute("class"    , "GreenRedButton");

        var Text     = document.createTextNode(  JsonData.flags.goodflags[i].Name );

        NewInput.setAttribute("type"   , "checkbox");
        NewInput.setAttribute("name"   , "listofgoodflags[]");
        NewInput.setAttribute("value"  ,  "f " + JsonData.flags.goodflags[i].abrv );
        NewInput.setAttribute("id"     ,  JsonData.flags.goodflags[i].abrv );
        NewInput.setAttribute("checked",'checked');

        NewLabel.appendChild(Text);
        document.getElementById(ParentGood).appendChild(NewInput);
        document.getElementById(ParentGood).appendChild(NewLabel);

      }

      for( var i = 0 ; i < NbrOfBadFlags ; i++ )
      {
        var NewLabel = document.createElement("LABEL");
        var NewInput = document.createElement("INPUT");

        NewLabel.setAttribute("for"    ,JsonData.flags.badflags[i].abrv );
        NewLabel.setAttribute("class"    , "GreenRedButton");

        var Text     = document.createTextNode(  JsonData.flags.badflags[i].Name );

        NewInput.setAttribute("type"   , "checkbox");
        NewInput.setAttribute("name"   , "listofbadflags[]");
        NewInput.setAttribute("value"  , "f " + JsonData.flags.badflags[i].abrv );
        NewInput.setAttribute("id"     , JsonData.flags.badflags[i].abrv );

        NewLabel.appendChild(Text);
        document.getElementById(ParentBad).appendChild(NewInput);
        document.getElementById(ParentBad).appendChild(NewLabel);
      }


     });



     var USERWANTTOSELECT = { good: true, bad: false}

     var addSelectAllButton = (parent, type) => {

      var select = document.createElement("BUTTON");
      select.innerHTML = "(un)select all";
 
      select.onclick = () => {
 
         const childs = document.getElementById(parent).children();
 
         for (var c = 0; c < childs.length; c++ ) {
 
           if ( USERWANTTOSELECT[type] ) 
             childs[c].setAttribute('checked', true)
           else {
             childs[c].setAttribute('checked', true)
 
           }
 
         }
 
         USERWANTTOSELECT[type]!=USERWANTTOSELECT[type]
 
      }
 
      document.getElementById(parent).appendChild(select);

     }


     addSelectAllButton(ParentGood, "good");
     addSelectAllButton(ParentBad, "bad");