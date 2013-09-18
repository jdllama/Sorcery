/*
	@program:		Sorcery
	@version:		2.0
	@author:		Jeffrey "J.D." Lowe
	@email:			jd.lowe@wendys.com
	@date_created:	February 13th, 2013
*/

/*
	Global holder of functions and variables.
*/

jinx.log = {};

jinx.log.dialogHandler = null;

jinx.log.console = function(text, opt_class) {
	var scroll = $("#console").prop("scrollHeight") - $("#console").height() - $("#console").prop("scrollTop") <= 5;
	var node = $("<span></span><br/>");
	$(node[0]).text("[" + new Date().toLocaleTimeString() + "] " + text + "\n");
	if (opt_class) {
		$(node).addClass(opt_class);
	}
	$("#console").append(node);

	if (scroll) {
		$("#log").prop("scrollTop", $("#log").prop("scrollHeight"));
	}
}

jinx.log.error = function(text) {
	jinx.log.fail(text);
	jinx.log.console(text, "error");
}

jinx.log.fail = function(text) {
	jinx.log.dialogHandler = new YAHOO.widget.Panel(jinx.rand(10),{
		width:"240px",  
		fixedcenter:true,  
		close:true,  
		draggable:false,  
		zindex:4, 
		modal:true, 
		visible:true 
	});
	var doubleDig = function(val) {
		val= val + "";
		return (val.length > 1) ? val : "0" + val;
	}
	var test = new Date();
	jinx.log.console(text, "fail");
	jinx.log.dialogHandler.setHeader("Fail " + doubleDig(test.getHours()) + ":" + doubleDig(test.getMinutes()));
	jinx.log.dialogHandler.setBody(text);
	jinx.log.dialogHandler.render(document.body);
}