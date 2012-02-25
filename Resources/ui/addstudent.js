//**************************************************
// Home School Tracker
// addstudent.js
// ui for adding a student - included in ui.js
//**************************************************

(function() {
	/*
	 * function - createaddstudentview
	 */
	hs.ui.createaddstudentview = function() {
		var v = Ti.UI.createView({
			backgroundImage:hs.ui.bg
		});

		var l = Ti.UI.createLabel({
			text:'Student Name',
			color:hs.ui.color,
			font:{fontSize:hs.ui.fontsize},
			top:'20dp',
			left:'20dp',
			textAlign:'left'
		});

		var t = Ti.UI.createTextField	({
			autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
			backgroundColor:'#fff',
			height:'65dp',
			left:'20dp',
			paddingLeft:5,
			color:hs.ui.color,
			right:'20dp',
			textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
			top:'80dp',
			keyboardType:Ti.UI.KEYBOARD_ASCII,
			verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
			font:{fontSize:hs.ui.fontsize}
		});

		var cancelbutton = Ti.UI.createButton({
			top:'160dp',
			left:'10dp',
			height:'50dp',
			width:'100dp',
			title:'Cancel'
		});
		
		cancelbutton.addEventListener('click',function(){
			Ti.UI.Android.hideSoftKeyboard();
			hs.app.mainwindow.remove(hs.app.viewstack.pop());
		});

		var addbutton = Ti.UI.createButton({
			top:'160dp',
			right:'10dp',
			height:'50dp',
			width:'100dp',
			title:'Add'
		});

		addbutton.addEventListener('click',function(){
			Ti.UI.Android.hideSoftKeyboard();
			hs.db.addstudent(t.value);
			hs.app.mainwindow.remove(hs.app.viewstack.pop());
		});

		v.add(l);
		v.add(t);
		v.add(cancelbutton);
		v.add(addbutton);

		return(v);
	};

})();
