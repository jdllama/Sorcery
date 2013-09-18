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
var jinx = {};

/*
	Global constants
*/

jinx.version = "2.5.2";
jinx.win_width = 800;
jinx.win_height = 500;
jinx.myShell = new ActiveXObject("WScript.Shell");
jinx.myFSO = new ActiveXObject("Scripting.FileSystemObject");
jinx.myNetwork = new ActiveXObject("WScript.Network");
jinx.myName = jinx.myNetwork.UserName;
jinx.appPath = jinx.myShell.ExpandEnvironmentStrings("%APPDATA%") + "\\sorcery\\";
jinx.rdPath = jinx.appPath + "generic.rdp";
jinx.myIE = null;
jinx.myIP = "";	//Format: 10.xx.xx. (ALWAYS INCLUDE THE LAST PERIOD)
jinx.currDetails = {
}
jinx.resetDetails = function() {
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
jinx.resetDetails();
jinx.rand = function(len, charSet) {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	var randomPoz = Math.floor(Math.random() * charSet.length);
    	randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}