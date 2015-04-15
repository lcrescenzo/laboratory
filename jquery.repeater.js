

(function ($) {
    
    var templateTag = "[template]";
    var headerTag = "[header]";
    var footerTag = "[footer]";
    var jsStartMark = "{javascript:[";
    var jsEndMark = "]}";
    
    $.fn.repeater = function (options) {
        

        // Establish our default settings
        var settings = $.extend({
            data: null
        }, options);

        return this.each(function () {
            var children = $("[clonedby=" + $(this).id + "]");
            if (children.length > 0)
                $(document).remove("[clonedby=" + $(this).id + "]");
            
            var newElement = $(this).clone(true);
            var template = GetRepeatTemplate($(this));
            var footer = GetRepeatFooter($(this));
            var header = GetRepeatHeader($(this));
            newElement.attr("clonedby", $(this).id)
            newElement.empty();

            newElement.append(header);

            if (settings.data !== null) {
                

                $.each(settings.data, function (i, item) {
                    var itemRepeat = template.clone(true).html();
                        if (itemRepeat != undefined) {
                        $.each(item, function (key, data) {

                            itemRepeat = ReplaceAll(itemRepeat, "{data:" + key + "}", data, true);
                        });

                        while (itemRepeat.indexOf(jsStartMark) != -1) {
                            var script = itemRepeat.substring(itemRepeat.indexOf(jsStartMark) + jsStartMark.length, itemRepeat.indexOf(jsEndMark))
                            //TODO: melhorar este código eval pode ser perigoso
                            $.globalEval("var replaceValueRepeaterScript = function () { " + script + " };");
                            itemRepeat = itemRepeat.replace(jsStartMark + script + jsEndMark, replaceValueRepeaterScript());
                        }

                        newElement.append(itemRepeat);
                    }
                });
            }
            newElement.append(footer);
            newElement.insertBefore(this);
            newElement.show();



        });

    }
    function ReplaceAll(oldStr, removeStr, replaceStr, caseSenitivity) {
        var myPattern = new RegExp(removeStr, (caseSenitivity) ? "g" : "gi");
        return oldStr.replace(myPattern, replaceStr);
    }

    function GetRepeatTemplate(jqueryElement) {
        var element = jqueryElement.children(templateTag).clone(true).removeAttr("template").css({ display: "block" });
        jqueryElement.remove(templateTag);
        return element;
    }

    function GetRepeatHeader(jqueryElement) {
        return jqueryElement.children(headerTag);
    }

    function GetRepeatFooter(jqueryElement) {
        return jqueryElement.children(footerTag);
    }
}(jQuery));
