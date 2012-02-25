//***************************************************
//Home School Tracker
//db.js
//database crud
//***************************************************

(function(){
	hs.db = {};											// database namespace
	
	/*
	 * function - loadstudents
	 */
	hs.db.loadstudents = function(){
		var students = [];

		var studentsrs = hs.db.db.execute('SELECT studentid,name FROM students');
		var i=0;
		while(studentsrs.isValidRow()) {
			students[i] = {};
			students[i].id = studentsrs.fieldByName('studentid');
			students[i].name = studentsrs.fieldByName('name');
			i++;
			studentsrs.next();
		};		

		return(students);
	};
	
	/*
	 * function - addstudent
	 */
	hs.db.addstudent = function(stu){
		hs.db.db.execute('INSERT INTO students (name) VALUES (?)',stu);
		Ti.App.fireEvent('app:studentchange');
	};
	
	/*
	 * function - delete student
	 */
	hs.db.deletestudent = function(sid) {
		hs.db.db.execute('DELETE from students WHERE studentid=?',sid);
		Ti.App.fireEvent('app:studentchange');
	};
	
	/*
	 * function getstudentname
	 *
	 * get students name based on student id
	 */
	hs.db.getstudentname = function(studentid) {
		var i;
		var students = hs.db.loadstudents();
		for(i=0;i<students.length;i++) {
			if(studentid == students[i].id) {
				return(students[i].name);
			};
		};
		return(null);
	};

	/*
	 * function - loadsubjects
	 */
	hs.db.loadsubjects = function() {
		var subjects = [];
		var subjectsrs = hs.db.db.execute('SELECT subjectid,name FROM subjects');
		var i=0;
		while(subjectsrs.isValidRow()){
			subjects[i] = {};
			subjects[i].id = subjectsrs.fieldByName('subjectid');
			subjects[i].name = subjectsrs.fieldByName('name');
			i++;
			subjectsrs.next();
		};
		return(subjects);
	};
	
	/*
	 * function - loadinstructions
	 *
	 * load instructions for student id
	 */
	hs.db.loadinstructions = function(studentid) {
		var instructions = [];
		var subjects = [];
		var i=0;
		var j=0;

		var instructionsrs = 
			hs.db.db.execute('SELECT instructionid,subjectid,studentid,datetime,duration FROM instructions WHERE studentid=?',studentid);

		while(instructionsrs.isValidRow()) {
			instructions[i] = {};
			instructions[i].id = instructionsrs.fieldByName('instructionid');
			instructions[i].subjectid = instructionsrs.fieldByName('subjectid');
			instructions[i].studentid = instructionsrs.fieldByName('studentid');
			instructions[i].datetime = instructionsrs.fieldByName('datetime');
			instructions[i].duration = instructionsrs.fieldByName('duration');
			i++;
			instructionsrs.next();
		};

		subjects = hs.db.loadsubjects();
		for(i=0;i<instructions.length;i++) {
			for(j=0;j<subjects.length;j++) {
				if(instructions[i].subjectid == subjects[j].id) {
					instructions[i].subjectname = subjects[j].name;
				};
			};
		};

		return(instructions);
	};
	
	hs.db.addinstruction = function(sid,subjectid,datetime,duration) {
		// add instruction record
		hs.db.db.execute('INSERT into instructions (subjectid,studentid,datetime,duration) VALUES (?,?,?,?)',subjectid,sid,datetime,duration);
		Ti.App.fireEvent('app:instructionchange');
	};
	
	/*
	 * open or install the database
	 */
	hs.db.db = Ti.Database.install('hstrack.sqlite','hstrackdb');
})();
