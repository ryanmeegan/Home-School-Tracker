// Home School Tracker
// addstudent.js
// ui for adding a student - included in ui.js
(function() {
	//view elements
	hs.ui.addstudentview = Ti.UI.createView({
		backgroundImage:hs.ui.bg
	});
	var label1 = Ti.UI.createLabel({
		text:'Student Name',
		color:hs.ui.color,
		font:{fontSize:hs.ui.fontsize},
		top:20,
		left:20,
		textAlign:'left'
	});
	hs.ui.addstudentview.add(label1);
	hs.ui.addstudenttextfield = Ti.UI.createTextField	({
		autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
		backgroundColor:'#fff',
		height:65,
		left:20,
		paddingLeft:5,
		color:hs.ui.color,
		right:20,
		textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
		top:80,
		keyboardType:Ti.UI.KEYBOARD_ASCII,
		verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		font:{fontSize:hs.ui.fontsize}
	});
	hs.ui.addstudentview.add(hs.ui.addstudenttextfield);
	var cancelbutton = Ti.UI.createButton({
		top:160,
		left:100,
		height:50,
		width:100,
		title:'Cancel'
	});
	cancelbutton.addEventListener('click',function(){
		Ti.UI.Android.hideSoftKeyboard();
		hs.app.mainwindow.remove(hs.app.viewstack.pop());
	});
	hs.ui.addstudentview.add(cancelbutton);
	var addbutton = Ti.UI.createButton({
		top:160,
		right:100,
		height:50,
		width:100,
		title:'Add'
	});
	addbutton.addEventListener('click',function(){
		Ti.UI.Android.hideSoftKeyboard();
		hs.db.addstudent(hs.ui.addstudenttextfield.value);
		hs.ui.updatestudenttable();
		hs.app.mainwindow.remove(hs.app.viewstack.pop());
	});
	hs.ui.addstudentview.add(addbutton);

})();
