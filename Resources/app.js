//***************************************************
// Home School Tracker
// app.js
// main file
//***************************************************

var hs = {};									// entire hs namespace
hs.app = {};									// hs.app namespace
hs.app.viewstack = [];				// stack of views to remove on back button

Ti.include('db.js');
Ti.include('ui/ui.js');	// includes 

hs.app.mainwindow = hs.ui.createmainwindow();		// create main ui tabgroup
hs.app.mainwindow.open();			// open main ui window
