/*
	@program:		Sorcery
	@version:		2.0
	@author:		Jeffrey "J.D." Lowe
	@email:			jd.lowe@wendys.com
	@date_created:	February 13th, 2013
*/

/*
	Main part of Sorcery. This builds the menubar, assigns functions to stuff, etc.
*/

jinx.main = {};

jinx.main.whichTimeZone = function(tz) {
	var s = "";
	if(tz == "-500") s = "Eastern";
	else if(tz == "-600") s = "Central";
	else if(tz == "-700") s = "Mountain";
	else if(tz == "-800") s = "Pacific";
	else if(tz == "-800") s = "Hawaiian";
	else if(tz == "-400") s = "Atlantic";
	return s;
}

jinx.main.buildDetails = function(storeID, idWithout0) {
	if(storeID == "") {
		jinx.currDetails = {
			area: "",
			breakfast: "",
			DM: "",
			description: "",
			ems: "",
			micros: "",
			phoneNum: "",
			phoneProvider: "",
			regcount: "",
			safe: "",
			sla: "",
			state: "",
			tz: ""
		}
	}
	else {
		$("<iframe />").css("display", "none").attr("src", "search.asp?store=" + storeID).attr("application", "yes").load(function() {
			try {
				var obj = $(this.contentWindow.document.body);
				if(obj.find("#valid").html() == "true") {
					jinx.currDetails = {
						area: obj.find("#area").html(),
						breakfast: obj.find("#breakfast").html(),
						DM: obj.find("#dm").html(),
						description: obj.find("#desc").html(),
						ems: obj.find("#ems").html(),
						micros: micros[obj.find("#area").html()],
						phoneNum: obj.find("#phone").html(),
						phoneProvider: p[idWithout0],
						regcount: obj.find("#regcount").html(),
						safe: obj.find("#safe").html(),
						sla: obj.find("#sla").html(),
						state: obj.find("#state").html(),
						tz: jinx.main.whichTimeZone(obj.find("#tz").html())
					}
					if(obj.find("#message").html() != "") alert(obj.find("#message").html());
					$("<iframe />").css("display", "none").attr("src", "log.asp?store=" + storeID).attr("application", "yes").load(function() {
						var obj = $(this.contentWindow.document.body);
						$("#recentcalllog").html(obj.html());
						$(this).remove();
					}).appendTo("body");
				}
				else {
					jinx.currDetails = {
						area: "",
						breakfast: "",
						DM: "",
						description: "FRANCHISE STORE",
						ems: "",
						micros: "",
						phoneNum: "",
						phoneProvider: "",
						regcount: "",
						safe: "",
						sla: "",
						state: "",
						tz: ""
					}
				}
				jinx.main.showDetails();
				$(this).remove();
			}
			catch(e) {
				jinx.log.error("Search Error: " + e.message);
				$(this).remove();
			}
		}).appendTo("body");
		$("<iframe />").css("display", "none").attr("src", "tickets.asp?client=" + idWithout0).attr("application", "yes").load(function() {
			try {
				$("#ticketholder").html(this.contentWindow.document.body.innerHTML);
				$(this).remove();
			}
			catch(e) {
				jinx.log.error("Ticket Check Error: " + e.message);
				$(this).remove();
			}
		}).appendTo("body");
	}/*
	else if(typeof store[storeID] != "undefined") {
		jinx.currDetails = {
			area: store[storeID].area,
			breakfast: store[storeID].breakfast,
			DM: store[storeID].dm,
			description: store[storeID].desc,
			ems: store[storeID].ems,
			micros: micros[store[storeID].area],
			phoneNum: store[storeID].phone,
			phoneProvider: p[idWithout0],
			regcount: store[storeID].regcount,
			safe: store[storeID].safe,
			sla: store[storeID].sla,
			state: store[storeID].state,
			tz: jinx.main.whichTimeZone(store[storeID].tz)
		}
	}
	else {
		jinx.currDetails = {
			area: "",
			breakfast: "",
			DM: "",
			description: "FRANCHISE STORE",
			ems: "",
			micros: "",
			phoneNum: "",
			phoneProvider: "",
			regcount: "",
			safe: "",
			sla: "",
			state: "",
			tz: ""
		}
	}
	jinx.main.showDetails();
	*/
}

jinx.main.showDetails = function() {
	var r = jinx.currDetails;
	$("#area").html(r.area);
	$("#breakfast").html(r.breakfast);
	$("#DM").html(r.DM);
	$("#sitestatusdescription").html(r.description);
	$("#ems").html(r.ems);
	$("#phoneprovider").html(r.phoneProvider);
	$("#regcount").html(r.regcount);
	$("#safe").html(r.safe);
	$("#sla").html(r.sla);
	$("#storeState").html(r.state);
	$("#storePhoneNum").html("<a id='outboundPhone' href='Webdialer?cmd=doMakeCallProxy&uid=" + jinx.myName + "&appid=" + jinx.myName + "&pwd=null&pwdEncrypted=true&destination=91" + r.phoneNum + "' target='_blank'>" + r.phoneNum + "</a>");
	$("#timeZone").html(r.tz);
	$("#whichmicros").html(r.micros);
}

jinx.main.reset = function() {
	jinx.log.console("Reset Start");
	try {
		$("#storeid, #name, #issue").val("");
		$("#storeid").trigger("blur");
		
		$("<iframe />").css("display", "none").attr("src", "tickets.asp?client=").attr("application", "yes").load(function() {
			try {
				$("#ticketholder").html(this.contentWindow.document.body.innerHTML);
				$(this).remove();
			}
			catch(e) {
				jinx.log.error("Reset Error: " + e.message);
				$(this).remove();
			}
		}).appendTo("body");
	}
	catch(e) {
		jinx.log.error("Reset Error: " + e.message);
		return;
	}
	jinx.log.console("Reset End");
}

jinx.main.generate = function() {
	jinx.log.console("Main Form Generate Start");
	try {
		$("#storeid").blur(function() {
			jinx.main.corrector();
		}).keypress(function(e) {
			if(e.which == 13) {
				//alert("Success");
				jinx.main.corrector();
				$("#name").focus();
			}
		});
		
		$("#version").html("v. " + jinx.version).mousedown(function(e) {
			if(e.which == 3) jinx.easter.credits();
		});
		
		var oPushButton1 = new YAHOO.widget.Button("openincmon");
		oPushButton1.on("click", jinx.magic.POS.createMonitor);
		
		var oPushButton2 = new YAHOO.widget.Button("opencreateinc");
		oPushButton2.on("click", jinx.magic.POS.createIncident);
		
		var oPushButton3 = new YAHOO.widget.Button("savelog");
		oPushButton3.on("click", function() {
			jinx.install.generate();
			if($("#storeid").val() != "") {
				$("<iframe />").css("display", "none").attr("src", "addlog.asp?client=" + $("#storeid").val() + "&agent=" + jinx.myName).attr("application", "yes").load(function() {
					try {
						$(this).remove();
					}
					catch(e) {
					}
				}).appendTo("body");
			}
			var target = jinx.install.createToday();
			jinx.install.saveCall({
				storeID: $("#storeid").val(),
				target: target,
				manager: $("#name").val(),
				notes: $("#issue").val(),
				time: +new Date(),
				state: $("#storeState").html()
			});
			jinx.main.reset();
			$("#storeid").focus();
		});
		
		var oPushButton4 = new YAHOO.widget.Button("reset");
		oPushButton4.on("click", function() {
			jinx.main.reset();
			$("#storeid").focus();
		});
		
		$("#allbuttons, #accordion").hide();
		
		$("#showbuttons").click(function() {
			jinx.buttons.toggle($(this));
		});
		
		jinx.buttons.toggle($("#showbuttons"));
		
		var allPanels = $("#accordion > div").hide();
		
		$("#accordion > h3").click(function() {
			allPanels.hide();
			$(this).next().show();
		});
		
		$("#refreshautoping").click(function() {
			$("#fortinetiframe").attr("src", "pinger.html#Fortinet");
			$("#mwsiframe").attr("src", "pinger.html#MWS");
			$("#pos1iframe").attr("src", "pinger.html#POS1");
			$("#pos2iframe").attr("src", "pinger.html#POS2");
			$("#pos3iframe").attr("src", "pinger.html#POS3");
			$("#pos4iframe").attr("src", "pinger.html#POS4");
			$("#ocsiframe").attr("src", "pinger.html#OCS");
			$("#emsiframe").attr("src", "pinger.html#EMS");
			$("#hmeiframe").attr("src", "pinger.html#HME");
			$("#printeriframe").attr("src", "pinger.html#Printer");
			$("#epic1iframe").attr("src", "pinger.html#EPIC1");
			$("#epic2iframe").attr("src", "pinger.html#EPIC2");
			$("#epic3iframe").attr("src", "pinger.html#EPIC3");
			setTimeout(function() {jinx.main.corrector();}, 200);
		});
	}
	catch(e) {
		jinx.log.error("Main Form Generate Error: " + e.message);
		return;
	}
	jinx.log.console("Main Form Generate Finish");
}

jinx.main.corrector = function() {
	$("<iframe />").css("display", "none").attr("src", "tickets.asp?client=").attr("application", "yes").load(function() {
		try {
			$("#ticketholder").html(this.contentWindow.document.body.innerHTML);
			$(this).remove();
		}
		catch(e) {
			$(this).remove();
		}
	}).appendTo("body");
	jinx.myIP = "";
	var val = $("#storeid").val().toUpperCase();
	$("#recentcalllog").html("");
	jinx.services.reset();
	
	//Easter Eggs, GO!
	if(val == "AVERY") {
		jinx.easter.avery();
	}
	else if(val == "STARK") {
		jinx.easter.stark();
	}
	else if(val == "FUSRODAH") {
		jinx.easter.fusrodah();
	}
	
	val = val.replace(/[^0-9]/gi, '');
	if(val.length == 0) {
		jinx.resetDetails();
		jinx.main.showDetails();
		$("#fortinetiframe").attr("src", "pinger.html#Fortinet");
		$("#mwsiframe").attr("src", "pinger.html#MWS");
		$("#pos1iframe").attr("src", "pinger.html#POS1");
		$("#pos2iframe").attr("src", "pinger.html#POS2");
		$("#pos3iframe").attr("src", "pinger.html#POS3");
		$("#pos4iframe").attr("src", "pinger.html#POS4");
		$("#ocsiframe").attr("src", "pinger.html#OCS");
		$("#emsiframe").attr("src", "pinger.html#EMS");
		$("#hmeiframe").attr("src", "pinger.html#HME");
		$("#printeriframe").attr("src", "pinger.html#Printer");
		$("#epic1iframe").attr("src", "pinger.html#EPIC1");
		$("#epic2iframe").attr("src", "pinger.html#EPIC2");
		$("#epic3iframe").attr("src", "pinger.html#EPIC3");
		$("#storeid").val("");
		return;
	}
	
	//remove extra 0's at beginning for idWithout0
	var idWithout0 = "";
	while(val.split("")[0] == "0") {
		val = val.substring(1);
	}
	idWithout0 = val;
	while(val.length < 5) {
		val = "0" + val;
	}
	$("#storeid").val(val);	//and now the text box has the correct amount of 0's
	
	var str = val.split("");
	if(str[3] == "0") str[3] = "";
	var IPoct = "";
	IPoct = str[0] + str[1] + str[2] + "." + str[3] + str[4];
	while(IPoct.split("")[0] == "0") {
		IPoct = IPoct.substring(1);
	}
	if(IPoct.split("")[0] == ".") IPoct = "0" + IPoct;
	
	jinx.main.buildDetails(val, idWithout0);
	if(typeof store[val] != "undefined") {
		jinx.myIP = "10." + IPoct + ".";
		if(jinx.tabs.quicktoolshandler.get('activeIndex') == 2) {
			$("#fortinetiframe").attr("src", "pinger.html#Fortinet;" + jinx.myIP + "111");
			$("#mwsiframe").attr("src", "pinger.html#MWS;" + jinx.myIP + "101");
			$("#pos1iframe").attr("src", "pinger.html#POS1;" + jinx.myIP + "1");
			$("#pos2iframe").attr("src", "pinger.html#POS2;" + jinx.myIP + "2");
			$("#pos3iframe").attr("src", "pinger.html#POS3;" + jinx.myIP + "3");
			$("#pos4iframe").attr("src", "pinger.html#POS4;" + jinx.myIP + "4");
			$("#ocsiframe").attr("src", "pinger.html#OCS;" + jinx.myIP + "103");
			$("#emsiframe").attr("src", "pinger.html#EMS;" + jinx.myIP + "116");
			$("#hmeiframe").attr("src", "pinger.html#HME;" + jinx.myIP + "119");
			$("#printeriframe").attr("src", "pinger.html#Printer;" + jinx.myIP + "109");
			$("#epic1iframe").attr("src", "pinger.html#EPIC1;" + jinx.myIP + "21");
			$("#epic2iframe").attr("src", "pinger.html#EPIC2;" + jinx.myIP + "22");
			$("#epic3iframe").attr("src", "pinger.html#EPIC3;" + jinx.myIP + "23");
		}
		if(typeof aloha[val] == "undefined") {
			jinx.services.rebuild();
		}
	}
	if(jinx.settings.get("autoincmon") == true) jinx.magic.POS.createMonitor();
	if(jinx.settings.get("autocreateinc") == true) jinx.magic.POS.createIncident();
}

jinx.main.deleteAll = function() {
	jinx.myFSO.DeleteFile(jinx.appPath + "vncandbat\\*.*");
	jinx.myFSO.DeleteFile(jinx.appPath + "pings\\*.*");
	var folders = new Enumerator(jinx.myFSO.getFolder(jinx.appPath + "logs").SubFolders);
	var dropdate = new Date();
	dropdate.setDate(dropdate.getDate()-30);
	for(folders.moveFirst();!folders.atEnd();folders.moveNext()) {
		var folder = folders.item();
		if(folder.DateLastModified < dropdate) folder.Delete();
	}
}

jinx.main.getUpdates = function() {
	jinx.log.console("Get Updates Start");
	try {
		$("<iframe />").css("display", "none").attr("src", "update.asp").attr("application", "yes").load(function() {
			try {
				if(this.contentWindow.document) {
					$("#updater").html(this.contentWindow.document.body.innerHTML);
				}
				$(this).remove();
				setTimeout(jinx.main.getUpdates, 10000)
			}
			catch(e) {
				jinx.log.error("Get Updates Error: " + e.message);
				$(this).remove();
			}
		}).appendTo("body");
	}
	catch(e) {
		jinx.log.error("Get Updates Error: " + e.message);
		return;
	}
	jinx.log.console("Get Updates Finish");
}

jinx.main.getAlerts = function() {
	jinx.log.console("Get Alerts Start");
	try {
		$("<iframe />").css("display", "none").attr("src", "alerts").attr("application", "yes").load(function() {
			try {
				var temp = $(this.contentWindow.document);
				if(temp.find("#alerts").length) {
					var alerts = parseInt(temp.find("#alerts")[0].innerText);
					if(alerts !== 0) {
						jinx.log.fail("Warning, there are " + alerts + " PC Alerts. Please check the alert in your email for how to handle issue.");
					}
				}
				$(this).remove();
				setTimeout(jinx.main.getAlerts, 60*1000*5)
			}
			catch(e) {
				jinx.log.error("Get Alerts Error: " + e.message);
				$(this).remove();
			}
		}).appendTo("body");
	}
	catch(e) {
		jinx.log.error("Get Alerts Error: " + e.message);
		return;
	}
	jinx.log.console("Get Alerts Finish");
}

$(document).ready(function() {
	var start = +new Date();
	jinx.log.console("Document Load Start");
	try {
		//Overall Sorcery Stuff
		self.resizeTo(jinx.win_width, jinx.win_height);
		jinx.menubar.generate();
		jinx.tabs.generate();
		jinx.buttons.generate();
		jinx.buttons.makeDMB();
		jinx.services.generate();
		jinx.phone.generate();
		jinx.settings.generate();
		jinx.autos.getSchedule();
		jinx.main.generate();
		jinx.polling.generate();

		if(jinx.settings.exist()) {
			jinx.settings.show();
			$("#enterSorceryKey").focus();
			if($.cookie("sorcerykey")) {
				$("#enterSorceryKey").val($.cookie("sorcerykey"));
				$("#saveSorceryKey").attr("checked", true);
			}
			else {
				$("#saveSorceryKey").attr("checked", false);
			}
		}
		else {
			jinx.tabs.mainhandler.set('activeIndex', 5);
			jinx.log.fail("Welcome to Sorcery 2.0! Disregard the Fail title of this, and be sure to import your old settings!");
		}
		
		jinx.source.generate();
		
		/*var refreshUpdates = setInterval(function() {
			var myOwnTemp = $.ajax({
				url: "update.asp",
				success: function(data) {
					alert(data);
					$("#updater").html(data);
				},
				error: function(data) {
					$("#updater").html("No updates available.");
				}
			});
		}, 20000);
		*/
		/*var refreshUpdates = setInterval(function() {
			$("<iframe />").css("display", "none").attr("src", "update.asp").attr("application", "yes").load(function() {
				$("#updater").html(this.contentWindow.document.body.innerHTML);
				$(this).remove();
			}).appendTo("body");
		}, 10000);*/
		

		jinx.main.getUpdates();
		jinx.main.getAlerts();
		
	}
	catch(e) {
		jinx.log.error("Document Load Error: " + e.message + e.lineNumber);
		return;
	}
	var end = +new Date();
	jinx.log.console("Document Load Finish in " + (end - start) + "ms.");
	jinx.log.console("Whole Document Load in " + (end - truestart) + "ms.");
});

window.onbeforeunload = function() {
	jinx.main.deleteAll();
	$("#storeID").val("");
}

window.onerror = function(message, url, linenumber) {
	jinx.log.error("JavaScript error: " + message + " on line " + linenumber + " for " + url);
	return true;
};

$(document).keypress(function(e) {
	if(e.keyCode == 27) {
		if(jinx.log.dialogHandler && jinx.log.dialogHandler.destroy) jinx.log.dialogHandler.destroy();
	}
});