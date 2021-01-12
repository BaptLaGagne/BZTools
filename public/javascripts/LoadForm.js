/***************************************************************/
// Functions to fill the BZConfig form from a server side JSON
/***************************************************************/

var savedConf ="../data/SavedConf.json"

$(document).ready( FillFormFromJSON($('#ConfigForm'),savedConf) );

function FillFormFromJSON($form,PathToJSON){
      loadJSON(PathToJSON, function(response) 
      {
        var Data = JSON.parse(response);
        populateForm($form,Data);

     });
}

// Functions in JQuery "stolen" from :
//http://stackoverflow.com/questions/7298364/using-jquery-and-json-to-populate-forms

function resetForm($form){
    $form.find('input:text,  input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
    $form.find('[id^=ContainerShotFlag]').remove();
}

function populateForm($form, data){
    resetForm($form);
    $.each(data, function(key, value) {

        var $ctrl = $form.find('[name='+key+']'); 
       // console.log(key+" "+value+" "+$ctrl.attr('type'));

        if ($ctrl.is('select')){
            $('option', $ctrl).each(function() {
                if (this.value == value)
                    this.selected = true;
            });
        } else if ($ctrl.is('textarea')) {
            $ctrl.val(value);
        }
        else if ($ctrl.is('number')){
            $ctrl.val(value);
        } 
        else {
            switch($ctrl.attr("type")) {
                case "range":
                    $ctrl.val(value);    
                    if($ctrl.attr("id")=="BuildingDensity")
                     ShowSlideValue(value,'RM_BuildDensity_span')
                break;
                case "text":
                case "number":
                case "hidden":
                    $ctrl.val(value);   
                break;
                case "checkbox":
                    $ctrl.prop('checked', true);
                break;
                case undefined:
                  //special cases : array of checkboxes & dynamic input
                  switch(key){
                  	case "listofgoodflags":
                          var DomObjects =[];
                           $('input:checkbox[name="listofgoodflags[]"]').map(function(){   				
                                  DomObjects.push($(this));
                                  return DomObjects;
                            }).get();;

                           for(index=0;index<DomObjects.length ;index++){
                            if(value[index][0]=='+')
                   	         DomObjects[index].prop('checked', true);
                  		      else
                    		     DomObjects[index].prop('checked', false);
                           }

                    break;

                  	case "listofbadflags":
                        var DomObjects =[];
                          $('input:checkbox[name="listofbadflags[]"]').map(function(){   				
                             DomObjects.push($(this));
                             return DomObjects;
                          }).get();;

                          for(index=0;index<DomObjects.length ;index++){
                            if(value[index][0]=='+')
                   	     	   DomObjects[index].prop('checked', true);
                  		      else
                    		     DomObjects[index].prop('checked', false);
                          }
                  	break;

                  	case "LimitedFlag":
                  	  for(index=0; index < value.length ;index++ ){
                  	     addFlagLimit(value[index]);
                  	  }
 
        		         break;

        		        case "ShotLimitPerFlag":
        		         for(index=0; index < value.length ;index++ ){
        		    	     var NumshotIndex = index+1;
        		          $("#NumShots"+NumshotIndex).val(value[index]);
        		         }
        		        break;

        		        default:
        		         console.log("Item not handle");
        		        break;

        	     }
               break;   

               default:
                console.log("What am I ?");
               break;	 
            } 
        }
    });
};
