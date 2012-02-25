//***************************************************
// Home School Tracker
// ui.js
// User Interface Crud
//***************************************************

(function(){								// self-calling anonymous function
	hs.ui = {};								// user interface namespace 
	var i;
	hs.ui.studenttabledata = [];		// data for student table
	hs.ui.studenttablerows = [];		// rows for student table
	hs.ui.studenttablelabels = [];	// labels for rows for student table
	hs.ui.selectedstudentid = null;	// which student is currently selected
	
	// universal design attribute functions
	hs.ui.bg = Ti.Filesystem.resourcesDirectory+'images/bg.png';
	hs.ui.color = '#111';
	hs.ui.fontsize = 32;

	Ti.include('addstudent.js');
	Ti.include('studentdetail.js');
	Ti.include('instructiondetail.js');
	Ti.include('addinstruction.js');
		
	// event listener for main window - handles back button
	mainwindoweventlistener = function(e){
		if(hs.app.viewstack.length == 0)
			hs.app.mainwindow.close();
		hs.app.mainwindow.remove(hs.app.viewstack.pop());
	};
	
	// event listener for student table
	studenttableeventlistener = function(e) {
		if(hs.db.students.length==0){		// no students so only row is dummy - do nothing
			return;
		}
		Ti.API.error('### studenttableeventlistener');
		Ti.API.error('### e.row.studentid: '+e.rowData.studentid);
		hs.ui.selectedstudentid = e.rowData.studentid;
		Ti.API.error('### selectedstudentid: '+hs.ui.selectedstudentid);
		// create student detail view based on which row was clicked
		hs.ui.populatestudentdetailview(hs.ui.selectedstudentid);
		hs.app.mainwindow.add(hs.ui.studentdetailview);
		hs.app.viewstack.push(hs.ui.studentdetailview);
	};

	
	// function to load/refresh student table data
	hs.ui.loadstudenttabledata = function(){
		hs.db.students.length=0;						// clear it
		hs.ui.studenttabledata.length=0;		// clear old contents of array
		hs.ui.studenttablelabels.length=0;	// clear old contents...
		hs.ui.studenttablerows.length=0;		// ditto...
		
		hs.db.loadstudents();								// load students from db 
		
		if(hs.db.students.length==0){				// if there are no students...
			var dummylabel = Ti.UI.createLabel({		// make a dummy label...
				color:hs.ui.color,
				left:10,
				text:'No Students',
				font:{fontSize:hs.ui.fontsize}
			});
			var dummyrow = Ti.UI.createTableViewRow({});		// make a dummy row....
			dummyrow.add(dummylabel);							//  add dummy label to dummy row
			hs.ui.studenttabledata[0]=dummyrow;		// add dummy row to table
		} else {																// there are students
			for(i=0;i<hs.db.students.length;i++){
				hs.ui.studenttablelabels[i]=Ti.UI.createLabel({
					color:hs.ui.color,
					left:10,
					text:hs.db.students[i].name,
					font:{fontSize:hs.ui.fontsize}
				});
				hs.ui.studenttablerows[i]=Ti.UI.createTableViewRow({
					hasChild:true,
					className:'studentrow',
					height:75,
					studentid:hs.db.students[i].id
				});
				hs.ui.studenttablerows[i].add(hs.ui.studenttablelabels[i]);
				hs.ui.studenttabledata[i]=hs.ui.studenttablerows[i];
			};
		};		
	};
	
	addstudentbuttonlistener = function(){
		hs.ui.addstudenttextfield.setValue('');
		hs.app.mainwindow.add(hs.ui.addstudentview);
		hs.ui.addstudenttextfield.focus();
		hs.app.viewstack.push(hs.ui.addstudentview);
	};
	
	var addstudentbutton = Ti.UI.createButton({
		top:7,
		right:5,
		height:60,
		title:'Add Student'
	});
	addstudentbutton.addEventListener('click',addstudentbuttonlistener);
	
	hs.ui.studenttable = Ti.UI.createTableView({
		headerTitle:'Students',
		left:0,
		top:70,
		height:'100%',
		width:'100%'
	});
	hs.ui.studenttable.addEventListener('click',studenttableeventlistener);
	
	hs.ui.updatestudenttable = function() {
		hs.ui.loadstudenttabledata();
		hs.ui.studenttable.setData(hs.ui.studenttabledata);
	};
	
	hs.ui.createmainwindow=function(){
		var win=Ti.UI.createWindow({
			backgroundImage:hs.ui.bg,
			exitOnClose:true,
			fullscreen:true,
			title:'Home School Tracker'
		});
		win.add(addstudentbutton);
		hs.ui.updatestudenttable();
		win.add(hs.ui.studenttable);
		win.addEventListener('android:back',mainwindoweventlistener);
		return(win);
	}
})();
