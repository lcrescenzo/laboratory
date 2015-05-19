(function ($) {
    
    var tag = "translate";
    var localeDefault = "pt-br";
	var settings = {};
	
    function getResource(locale){
        //TODO: tratar quando nao existir  elemento
        return settings.resources[locale] || settings.resources;
    }
    
	function getMessage(key, locale){
		return LoadDataByNamespace(key.split("."), getResource(locale));
	}
	
	
	function LoadDataByNamespace(namespaces, data, index){
		index = index || 0;
        
        if(namespaces.length >= index)
            return data;
        
        if(data === null)
            return null;;
            
        LoadDataByNamespace(namespaces, data, index++);
	}
	
    $.fn.translate = function (options, key, locale) {
		locale = locale || localeDefault;
		
		if (options === "getMassage") {
			return getMessage(key, locale);
		}
        // Establish our default settings
        settings = $.extend({
            resources : { "pt-br": null }
        }, options);

        return this.each(function () {
            var children = $(this).find("[" + tag + "]");
            if (children.length > 0){
                children.each(function (element) {
                    var translation = LoadDataByNamespace(element.attr(tag), getResource(locale));
                    if(translation !== null){
                        element.html(translation);
                    }
                    element.removeAttr(tag);
                });
                
            }
        });
    };
})(jQuery);
