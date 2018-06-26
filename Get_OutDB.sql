CREATE TABLE Subject(-- ctrl shift enter
	Subject_Id varchar(100) not null,
	Subject_Name   varchar(100) not null,
	Semester      Integer not null,
	Professor      varchar(100),
	Plan			varchar(100),
	Track_Name    INTEGER, 

	PRIMARY KEY(Subject_Id)
);

CREATE TABLE Fin_Subject(
	Fin_Student_Id varchar(100) not null,
    Fin_Subject_Id varchar(100) not null,
	
	FOREIGN KEY(Fin_Subject_Id) REFERENCES Subject(Subject_Id),
    FOREIGN KEY(Fin_Student_Id) REFERENCES Student(Student_Id) 
	
);

CREATE TABLE Student(
	Student_Id varchar(100) not null,
	Student_Name varchar(100) not null,
    Student_Passwd varchar(100),
    

    PRIMARY KEY(Student_id)
);

select * from subject;
show tables;

INSERT INTO Subject VALUES ('18-602583-60', '멀티미디어프로그래밍', 0201, '안용학','IMG',0000011100);
INSERT INTO Subject VALUES ('18-602583-62', '신호및시스템', 0301, '유영환','IMG1',0110000000);
INSERT INTO Subject VALUES ('18-602583-63', '데이터베이스', 0301, '신동일','IMG2',0001100001);

INSERT INTO Student VALUES ('14011003', '안종희', 'asd123');
INSERT INTO Student VALUES ('14011049', '김명길', 'qwe123');





drop table Fin_Subject;
drop table Subject;
drop table Student;

