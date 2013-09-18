/*
	@program:		Sorcery
	@version:		2.0
	@author:		Jeffrey "J.D." Lowe
	@email:			jd.lowe@wendys.com
	@date_created:	March 2nd, 2013
*/

/*
	Global holder of functions and variables.
*/

jinx.install = {};

jinx.install.generate = function() {
	if(!jinx.myFSO.FolderExists(jinx.appPath)) {
		jinx.myFSO.CreateFolder(jinx.appPath);
	}
	if(!jinx.myFSO.FolderExists(jinx.appPath + "vncandbat")) {
		jinx.myFSO.CreateFolder(jinx.appPath + "vncandbat");
	}
	if(!jinx.myFSO.FolderExists(jinx.appPath + "logs")) {
		jinx.myFSO.CreateFolder(jinx.appPath + "logs");
	}
	if(!jinx.myFSO.FolderExists(jinx.appPath + "pings")) {
		jinx.myFSO.CreateFolder(jinx.appPath + "pings");
	}

	if(jinx.myFSO.FileExists(jinx.appPath + "generic.rdp")) jinx.rdPath = jinx.appPath + "generic.rdp";
	jinx.install.createToday();
}

jinx.install.createToday = function() {
		var d = new Date();
		var myDay = d.getDate();
		if(myDay < 10) myDay = "0" + myDay;
		var myMonth = d.getMonth() + 1;
		if(myMonth < 10) myMonth = "0" + myMonth;
		var myYear = d.getFullYear();
		var myFolder = jinx.appPath + "logs\\" + myMonth + "" + myDay + myYear + "\\";
		if(!jinx.myFSO.FolderExists(myFolder)) {
			jinx.myFSO.CreateFolder(myFolder);
		}
		return myFolder;
}

jinx.install.saveCall = function(obj) {
	var str = obj.target + obj.time + " " + obj.storeID + ".txt";
	var fileTxt = jinx.myFSO.CreateTextFile(str);
	fileTxt.WriteLine("Store ID: " + obj.storeID);
	fileTxt.WriteLine("Name: " + obj.manager);
	fileTxt.WriteLine("State: " + obj.state);
	fileTxt.WriteLine("Notes: " + obj.notes);
	fileTxt.close();
}

jinx.install.generate();