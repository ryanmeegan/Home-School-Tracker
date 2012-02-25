// Home School Tracker
// addinstruction.js
// add an instruction - called from studentdetail.js
(function(){
	hs.ui.pickeddate = new Date();
	hs.ui.pickedtime = new Date();
	
	hs.ui.addinstructionview = Ti.UI.createView({
		backgroundImage:hs.ui.bg,
		studentid:null
	});
	var label1 = Ti.UI.createLabel({
		text:'Add Instruction Time',
		color:hs.ui.color,
		font:{fontSize:hs.ui.fontsize},
		top:10
	});
	var subjectlabel = Ti.UI.createLabel({
		text:'Subject:',
		color:hs.ui.color,
		font:{fontSize:hs.ui.fontsize},
		top: 75,
		left:5
	});
	hs.ui.subjectpicker = Ti.UI.createPicker({
		top:65,
		right:80
		// useSpinner:true
	});
	var data = [];
	var i;
	for(i=0;i<hs.db.subjects.length;i++) {
		data[i] = Ti.UI.createPickerRow({
			title:hs.db.subjects[i].name,
			subjectid:hs.db.subjects[i].id
		});
	};
	hs.ui.subjectpicker.add(data);
	var datelabel = Ti.UI.createLabel({
		text:'Date:',
		color:hs.ui.color,
		font:{fontSize:hs.ui.fontsize},
		top:210,
		left:5
	});
	hs.ui.datepicker = Ti.UI.createPicker({
		top:135,
		right:5,
		value:hs.ui.pickeddate,
		type:Ti.UI.PICKER_TYPE_DATE
	});
	hs.ui.datepicker.addEventListener('change',function(e) {
		hs.ui.pickeddate = e.value;
	});
	var timelabel = Ti.UI.createLabel({
		text:'Time:',
		color:hs.ui.color,
		font:{fontSize:hs.ui.fontsize},
		top:410,
		left:5
	});
	hs.ui.timepicker = Ti.UI.createPicker({
		top:335,
		right:5,
		value:hs.ui.pickedtime,
		type:Ti.UI.PICKER_TYPE_TIME
	});
	hs.ui.timepicker.addEventListener('change',function(e) {
		hs.ui.pickedtime = e.value;
	});
	var durationlabel = Ti.UI.createLabel({
		text:'Duration:',
		color:hs.ui.color,
		font:{fontSize:hs.ui.fontsize},
		top:545,
		left:5
	});
	hs.ui.durationpicker = Ti.UI.createPicker({
		top:530,
		right:80
	});
	var duration = [];
	duration[0] = Ti.UI.createPickerRow({title:15});
	duration[1] = Ti.UI.createPickerRow({title:30});
	duration[2] = Ti.UI.createPickerRow({title:45});
	duration[3] = Ti.UI.createPickerRow({title:60});
	hs.ui.durationpicker.add(duration);
	var cancelbutton = Ti.UI.createButton({
		top:700,
		left:100,
		height:50,
		width:100,
		title:'Cancel'
	});
	cancelbutton.addEventListener('click',function(){
		hs.app.mainwindow.remove(hs.app.viewstack.pop());
	});
	var addbutton = Ti.UI.createButton({
		top:700,
		right:100,
		height:50,
		width:100,
		title:'Add'
	});
	addbutton.addEventListener('click',function(){
		var datetime = new Date();
		datetime.setTime(hs.ui.pickedtime.getTime());
		datetime.setFullYear(hs.ui.pickeddate.getFullYear());
		datetime.setMonth(hs.ui.pickeddate.getMonth());
		datetime.setDate(hs.ui.pickeddate.getDate());
		hs.db.addinstruction(hs.ui.addinstructionview.studentid,hs.ui.subjectpicker.getSelectedRow(0).subjectid,
				datetime,hs.ui.durationpicker.getSelectedRow(0).title);
		hs.app.mainwindow.remove(hs.app.viewstack.pop());
	});
	hs.ui.addinstructionview.add(label1);
	hs.ui.addinstructionview.add(subjectlabel);	
	hs.ui.addinstructionview.add(hs.ui.subjectpicker);
	hs.ui.addinstructionview.add(datelabel);
	hs.ui.addinstructionview.add(hs.ui.datepicker);
	hs.ui.addinstructionview.add(timelabel);
	hs.ui.addinstructionview.add(hs.ui.timepicker);
	hs.ui.addinstructionview.add(durationlabel);
	hs.ui.addinstructionview.add(hs.ui.durationpicker);
	hs.ui.addinstructionview.add(cancelbutton);
	hs.ui.addinstructionview.add(addbutton);
})();