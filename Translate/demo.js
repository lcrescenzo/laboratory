function Demo(jQuery) {
	var multi = '{ "pt-br" : { \r\n language : "Potuguês do Brasil"}, \r\n "en-us" : { \r\n language : "English of USA"} }';
	var resources = '{ language : "Potuguês do Brasil" }';
	var Load = function (){
		var selectType = jQuery("#sltType");
		var txtResource =  jQuery("#txtResource")
		var btnLoadResource = jQuery("#btnLoadResource");
		
		selectType.change(function(){
			txtResource.val(jQuery(this).val() === "resources" ? resources : multi); 
		});
		
		
		btnLoadResource.click(function(){
			var data = JSON.parse(txtResource.val());
			
			jQuery.translate({resources : data});
			
			var label = jQuery("#lbl").clone(true);
			
			var lblPlace =jQuery("#lblPlace");
			lblPlace.html(label);
			lblPlace.translate();
		});
		
	
		
		
		
		
	};
	
	Load();
}

Demo($);