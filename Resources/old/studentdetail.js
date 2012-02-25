//*************************************************
// Home School Tracker
// studentdetail.js
// student detail screen
//*************************************************

(function () {
	hs.ui.instructiontabledata = [];
	hs.ui.instructiontablerows = [];
	hs.ui.instructiontablelabels = [];
	
	// function to populate student detail view based on which row was clicked
	hs.ui.populatestudentdetailview = function(sid) {
		var i=0;
		hs.db.instructions.length = 0;		// clear previous instructions array
		hs.ui.instructiontabledata.length = 0;		// clear previous table data
		hs.ui.instructiontablerows.length = 0;		// clear previous table rows
		hs.ui.instructiontablelabels.length = 0;	// clear pevious table labels
		for(i=0;i<hs.db.students.length;i++){
			if(sid == hs.db.students[i].id) {
				hs.ui.studentdetailnamelabel.text=hs.db.students[i].name;
			}
		}
		hs.ui.deletestudentbutton.studentid=sid;
		hs.ui.addinstructionbutton.studentid=sid;
		hs.db.loadstudentinstructions(sid);
		if(hs.db.instructions.length == 0) {		// no instructions
			var dummylabel = Ti.UI.createLabel({		// make a dummy label...
				color:hs.ui.color,
				left:10,
				text:'No Instruction',
				font:{fontSize:hs.ui.fontsize}
			});
			var dummyrow = Ti.UI.createTableViewRow({});		// make a dummy row....
			dummyrow.add(dummylabel);		//  add dummy label to dummy row
			hs.ui.instructiontabledata[0]=dummyrow;		// add dummy row to table
		} else {		// there are instructions
			for(i=0;i<hs.db.instructions.length;i++){
				hs.ui.instructiontablelabels[i]=Ti.UI.createLabel({
					color:hs.ui.color,
					left:10,
					text:hs.db.instructions[i].subjectname,
					font:{fontSize:hs.ui.fontsize}
				});
				hs.ui.instructiontablerows[i]=Ti.UI.createTableViewRow({
					hasChild:true,
					className:'studentrow',
					height:75,
					studentid:sid,
					instructionid:hs.db.instructions[i].id
				});
				hs.ui.instructiontablerows[i].add(hs.ui.instructiontablelabels[i]);
				hs.ui.instructiontabledata[i]=hs.ui.instructiontablerows[i];
			};
		};
		hs.ui.instructiontable.setData(hs.ui.instructiontabledata);		
	};
	
	hs.ui.studentdetailnamelabel = Ti.UI.createLabel({		// label with student name
		text:'Name',
		color:hs.ui.color,
		font:{fontSize:hs.ui.fontsize},
		top:20,
		left:5,
		textAlign:'left'
	});
	
	hs.ui.deletestudentbutton = Ti.UI.createButton({		// delete student button
		top:7,
		right:5,
		height:60,
		title:'Delete',
		studentid:null
	});
	hs.ui.deletestudentbutton.addEventListener('click',function(){
		// delete a student
		hs.db.deletestudent(hs.ui.deletestudentbutton.studentid);
	});
	
	hs.ui.addinstructionbutton = Ti.UI.createButton({
		top:70,
		height:60,
		width:'100%',
		title:'Add Instruction',
		studentid:null
	});
	hs.ui.addinstructionbutton.addEventListener('click',function(){
		// add an instruction
		hs.app.viewstack.push(hs.ui.addinstructionview);
		hs.ui.addinstructionview.studentid=hs.ui.addinstructionbutton.studentid;
		hs.app.mainwindow.add(hs.ui.addinstructionview);
	});
	
	hs.ui.instructiontable = Ti.UI.createTableView({
		headerTitle:'Instructions',
		top:130,
		left:0
	});
	hs.ui.instructiontable.addEventListener('click',function(e){
		if(hs.db.instructions.length == 0) {
			return;
		}
		hs.ui.selectedinstructionid = e.rowData.instructionid;
		hs.ui.populateinstructiondetailview(hs.ui.selectedinstructionid);
		hs.app.mainwindow.add(hs.ui.instructiondetailview);
		hs.app.viewstack.push(hs.ui.studentdetailview);
	});
	
	// student detail view
	hs.ui.studentdetailview = Ti.UI.createView({
		backgroundImage:hs.ui.bg
	});
	hs.ui.studentdetailview.add(hs.ui.studentdetailnamelabel);
	hs.ui.studentdetailview.add(hs.ui.deletestudentbutton);
	hs.ui.studentdetailview.add(hs.ui.instructiontable);
	hs.ui.studentdetailview.add(hs.ui.addinstructionbutton);
})();
