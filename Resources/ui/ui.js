//***************************************************
// Home School Tracker
// ui.js
// User Interface Crud
//***************************************************

(function(){								// self-calling anonymous function
	hs.ui = {};								// user interface namespace 
	
	/*
	 * universal design attributes
	 */
	hs.ui.bg = Ti.Filesystem.resourcesDirectory+'images/bg.png';
	hs.ui.color = '#111';
	hs.ui.fontsize = '24dp';

	/*
	 * includes
	 */
	Ti.include('addstudent.js');
	Ti.include('studentdetail.js');
	Ti.include('instructiondetail.js');
	Ti.include('addinstruction.js');
		
	/*
	 * function - createaddstudentbutton
	 */
	hs.ui.createaddstudentbutton = function() {
		var b = Ti.UI.createButton({
			top:'5dp',
			right:'5dp',
			height:'60dp',
			title:'Add Student'
		});

		b.addEventListener('click',function() {
			var v = hs.ui.createaddstudentview();
			hs.app.mainwindow.add(v);
			hs.app.viewstack.push(v);
		});

		return(b);
	};
	
	/*
	 * function - createstudentrows
	 */
	hs.ui.createstudentrows = function() {
		var i=0;			// index
		var l = [];		// labels
		var r = [];		// rows

		var students = hs.db.loadstudents();

		if(students.length==0){
			l[0] = Ti.UI.createLabel({		// dummy label
				color:hs.ui.color,
				left:'10dp',
				text:'No Students',
				font:{fontSize:hs.ui.fontsize}
			});
			r[0] = Ti.UI.createTableViewRow({
				height:'75dp',
				studentid:null
			});		// dummy row
			r[0].add(l[0]);		// add dummy label to dummy row
		} else {
			for(i=0;i<students.length;i++) {
				l[i] = Ti.UI.createLabel({
					color:hs.ui.color,
					left:'10dp',
					text:students[i].name,
					font:{fontSize:hs.ui.fontsize}
				});
				r[i] = Ti.UI.createTableViewRow({
					hasChild:true,
					className:'studentrow',
					height:'75dp',
					studentid:students[i].id
				});
				r[i].add(l[i]);
			};
		};

		return(r);
	}
		
	/*
	 * function - createstudenttable
	 */
	hs.ui.createstudenttable = function() {
		var r = hs.ui.createstudentrows();

		var t = Ti.UI.createTableView({
			headerTitle:'Students',
			left:'0dp',
			top:'70dp',
			height:'100%',
			width:'100%',
			data:r
		});

		t.addEventListener('click',function(e) {
			if(e.rowData.studentid == null){		// no students - do nothing
				return;
			}
			var v = hs.ui.createstudentdetailview(e.rowData.studentid);
			hs.app.mainwindow.add(v);
			hs.app.viewstack.push(v);
		});

		Ti.App.addEventListener('app:studentchange',function() {
			var r = hs.ui.createstudentrows();
			t.data = r;
		});

		return(t);
	};
	
	/*
	 * function - createmainwindow
	 */
	hs.ui.createmainwindow=function(){
		var w = Ti.UI.createWindow({
			backgroundImage:hs.ui.bg,
			exitOnClose:true,
			fullscreen:true,
			title:'Home School Tracker'
		});
		w.addEventListener('android:back',function(e) {
			if(hs.app.viewstack.length == 0)
				hs.app.mainwindow.close();
			hs.app.mainwindow.remove(hs.app.viewstack.pop());
		});

		w.add(hs.ui.createaddstudentbutton());
		w.add(hs.ui.createstudenttable());

		return(w);
	};

})();
