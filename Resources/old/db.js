//***************************************************
//Home School Tracker
//db.js
//database crud
//***************************************************

(function(){
	hs.db = {};											// database namespace
	hs.db.students = [];
	hs.db.instructions = [];
	hs.db.subjects = [];
	
	// load students from database
	hs.db.loadstudents = function(){
		var studentsrs = hs.db.db.execute('SELECT studentid,name FROM students');
		var i=0;
		while(studentsrs.isValidRow()) {
			hs.db.students[i] = {};
			hs.db.students[i].id = studentsrs.fieldByName('studentid');
			hs.db.students[i].name = studentsrs.fieldByName('name');
			i++;
			studentsrs.next();
		};		
	};
	
	// add a student to the database
	hs.db.addstudent = function(stu){
		hs.db.db.execute('INSERT INTO students (name) VALUES (?)',stu)
	};
	
	// delete a student
	hs.db.deletestudent = function(sid) {
		hs.db.db.execute('DELETE from students WHERE studentid=?',sid);
		hs.ui.updatestudenttable();
		hs.app.mainwindow.remove(hs.app.viewstack.pop());
	};
	
	// load subjects from database
	hs.db.loadsubjects = function() {
		Ti.API.error('hs.db.loadsubjects()');
		var subjectsrs = hs.db.db.execute('SELECT subjectid,name FROM subjects');
		var i=0;
		while(subjectsrs.isValidRow()){
			hs.db.subjects[i] = {};
			hs.db.subjects[i].id = subjectsrs.fieldByName('subjectid');
			hs.db.subjects[i].name = subjectsrs.fieldByName('name');
			Ti.API.error('Loaded subject: '+hs.db.subjects[i].name);
			i++;
			subjectsrs.next();
		};
	};
	
	// load student instructions from database
	hs.db.loadstudentinstructions = function(sid) {
		var instructionsrs = 
			hs.db.db.execute('SELECT instructionid,subjectid,studentid,datetime,duration FROM instructions WHERE studentid=?',sid);
		var i=0;
		var j=0;
		while(instructionsrs.isValidRow()) {
			hs.db.instructions[i] = {};
			hs.db.instructions[i].id = instructionsrs.fieldByName('instructionid');
			hs.db.instructions[i].subjectid = instructionsrs.fieldByName('subjectid');
			hs.db.instructions[i].studentid = instructionsrs.fieldByName('studentid');
			hs.db.instructions[i].datetime = instructionsrs.fieldByName('datetime');
			hs.db.instructions[i].duration = instructionsrs.fieldByName('duration');
			i++;
			instructionsrs.next();
		};
		// hs.db.loadsubjects();
		for(i=0;i<hs.db.instructions.length;i++) {
			for(j=0;j<hs.db.subjects.length;j++) {
				if(hs.db.instructions[i].subjectid == hs.db.subjects[j].id) {
					hs.db.instructions[i].subjectname = hs.db.subjects[j].name;
				};
			};
		};
	};
	
	hs.db.addinstruction = function(sid,subjectid,datetime,duration) {
		// add instruction record
		Ti.API.error('sid: '+sid+' subjectid: '+subjectid+' datetime: '+datetime+' duration: '+duration);
		hs.db.db.execute('INSERT into instructions (subjectid,studentid,datetime,duration) VALUES (?,?,?,?)',
			subjectid,sid,datetime,duration);
		hs.ui.populatestudentdetailview(sid);
	};
	
	// open/install database
	hs.db.db = Ti.Database.install('hstrack.sqlite','hstrackdb');		// install or open db
	hs.db.loadsubjects();		// preload subjects
})();
