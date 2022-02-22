import Database from "better-sqlite3";

const db = new Database("./data.db", {
  verbose: console.log,
});

const applicants = [
  {
    name: "Besim",
    email: "besim@gmail.com",
  },
  {
    name: "Arita",
    email: "arita@gmail.com",
  },
  {
    name: "Elidon",
    email: "elidon@gmail.com",
  },
  {
    name: "Ilir",
    email: "ilir@gmail.com",
  },
  {
    name: "Egon",
    email: "egon@gmail.com",
  },
];

const interviewers = [
  {
    name: "Nicolas",
    email: "nicolas@gmail.com",
  },
  {
    name: "Ed",
    email: "ed@gmail.com",
  },
  {
    name: "Visard",
    email: "visard@gmail.com",
  },
  {
    name: "Marvin",
    email: "marvin@gmail.com",
  },
  {
    name: "Marsel",
    email: "marsel@gmail.com",
  },
  {
    name: "Artiola",
    email: "artiola@gmail.com",
  },
];

const interviews = [
  {
    applicantId: 1,
    interviewerId: 1,
    date: "12/01/2021",
    score: 45.45,
  },
  {
    applicantId: 3,
    interviewerId: 1,
    date: "30/05/2021",
    score: 55.55,
  },
  {
    applicantId: 5,
    interviewerId: 4,
    date: "22/12/2021",
    score: 65.45,
  },
  {
    applicantId: 3,
    interviewerId: 3,
    date: "05/02/2022",
    score: 75.45,
  },
  {
    applicantId: 4,
    interviewerId: 1,
    date: "12/02/2022",
    score: 85.45,
  },
  {
    applicantId: 5,
    interviewerId: 6,
    date: "01/01/2022",
    score: 95.45,
  },
];

db.exec(`
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS applicants;
DROP TABLE IF EXISTS interviewers;

CREATE TABLE IF NOT EXISTS applicants ( 
id INTEGER PRIMARY KEY,
name TEXT NOT NULL,
email TEXT NOT NULL );

CREATE TABLE IF NOT EXISTS interviewers ( 
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL );

CREATE TABLE IF NOT EXISTS interviews ( 
id INTEGER PRIMARY KEY,
date TEXT NOT NULL,
score REAL,
applicantId INTEGER FOREIN KEY references applicants(id),
interviewerId INTEGER FOREIN KEY references interviewers(id));
`);

const createApplicant = db.prepare(`
INSERT INTO applicants (name, email) VALUES (?, ?);
`);

const createInterviewer = db.prepare(`
INSERT INTO interviewers (name, email) VALUES (?, ?);
`);

const createInterview = db.prepare(`
INSERT INTO interviews (applicantId, interviewerId, date, score) VALUES (?,?,?,?);
`);

for (const applicant of applicants) {
  createApplicant.run(applicant.name, applicant.email);
}

for (const interviewer of interviewers) {
  createInterviewer.run(interviewer.name, interviewer.email);
}

for (const interview of interviews) {
  createInterview.run(
    interview.applicantId,
    interview.interviewerId,
    interview.date,
    interview.score
  );
}
