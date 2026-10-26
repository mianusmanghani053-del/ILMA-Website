const SUITES=[
['Learning and Teaching','LT','Courses, live classes, quizzes and assignments in one place.',[
 ['ILMA Courses','Builds and organizes every course and subject.','Syllabus and units;Outcomes;Content delivery to each class'],
 ['ILMA Learning Hub','Cloud learning space for lessons.','Video, files, quizzes and discussion;Progress tracking;Certificates'],
 ['ILMA Live Classes','Timetabled online classes.','Zoom, Meet, Teams or built-in video;Automatic attendance;Recordings'],
 ['ILMA Quizzes','Quizzes and tests that mark themselves.','Reusable question banks;Per-question analytics;Scores flow to the gradebook'],
 ['ILMA Exam Guard','Protects online test integrity.','Browser lockdown;AI proctoring;Violation log'],
 ['ILMA Paper Scan','Marks bubble sheets from a photo or scanner.','OMR grading;Item analysis;Results sync to marks'],
 ['ILMA Assignments','Homework from set to graded.','Due dates;Submissions;Progress by student'],
 ['ILMA Markup','Feedback directly on student work.','Comments on the page;Rubric scoring;Faster grading'],
 ['ILMA Timetable','Conflict-free weekly schedules.','Rooms and teachers allocated;Substitutions;Instant change alerts'],
 ['ILMA Digital Shelf','E-books, journals and videos tied to courses.','Course-linked reading;Usage reports;Subscription tracking'],
 ['ILMA Research Desk','Thesis and project tracking for senior classes and colleges.','Topic approval;Supervisors;Milestones to final defense']]],
['Exams and Results','ER','Schedule, mark, publish and verify results.',[
 ['ILMA Exams','Plans every exam without clashes.','Teachers or the exam office schedule;Room, class and invigilator checks;Roll number slips;HOD approval'],
 ['ILMA Marks and Results','Enter, check and publish marks.','Total and passing marks per test;Excel upload, paste or scan;Absent and excused status;Draft, review, publish and history'],
 ['ILMA Verified Results','Result cards and transcripts that can be trusted.','Digital signature and QR check;Online requests;Access control'],
 ['ILMA Graduation','Completion and farewell events.','Eligibility checks;Certificates;Guest and seating lists']]],
['Admissions and Students','AS','From enquiry to enrolled student record.',[
 ['ILMA Admissions','Online application and review.','Apply online;Upload documents and track status;Merit lists;One-tap enrollment'],
 ['ILMA Student Records','The single file for every student.','Academic, health, family and document records;Searchable;Reports'],
 ['ILMA Attendance','Daily attendance in seconds.','Mark by class or period;Live absence alerts to parents;Trends'],
 ['ILMA Smart Attendance','Identity-checked attendance.','Fingerprint, face or card;Syncs live;Students and staff'],
 ['ILMA Leave','Student leave without paper.','Parent requests in the app;Teacher approval;Absences recorded'],
 ['ILMA Careers','Placement and next-step support.','Employer listings;Student matching;Interviews and offers tracked'],
 ['ILMA Appointments','Meetings with teachers and counsellors.','Open slots booked by parents;Reminders;No-show tracking']]],
['Fees and Finance','FF','Fees collected on time, books always balanced.',[
 ['ILMA Fees','Fee structures, invoices and collection.','Fee plans per class;Installments, discounts and scholarships;Online and cash payments with receipts;Defaulter follow-up'],
 ['ILMA Ledger','Full school accounting.','Chart of accounts;Bank reconciliation;Payables and receivables;Multi-campus funds'],
 ['ILMA Procure','Buying with control.','Budget-checked requests;Multi-level approval;Vendor and order matching'],
 ['ILMA Expenses','Staff claims and reimbursements.','Receipt upload;Policy checks;Paid with payroll'],
 ['ILMA Store','Online shop for the school.','Uniforms, books, tickets, certificates;Stock and accounts linked;Pay online'],
 ['ILMA Revenue Desk','Income beyond tuition.','Quotes and contracts;Discount limits;Revenue forecast']]],
['People and Staff','PS','Hiring, time, payroll and reviews.',[
 ['ILMA Staff Records','Teacher and staff profiles.','Qualifications and documents;Workload balance;Substitutions'],
 ['ILMA Hiring','Recruitment from job post to offer.','Applicant tracking;Interviews;Offer and onboarding records'],
 ['ILMA Staff Time','Hours and shifts.','Check-in and out;Shift roster;Feeds payroll'],
 ['ILMA Payroll','Salaries done right.','Salary rules and tax;Allowances;Payslips linked to attendance'],
 ['ILMA Reviews','Fair staff appraisals.','Goals;Competency framework;Evidence and feedback'],
 ['ILMA Staffing Forecast','Predicts staff shortages.','Teaching load;Substitute needs;Leave patterns;Shortage warnings by campus','soon']]],
['Campus and Facilities','CF','Rooms, transport, hostel, canteen, library and events.',[
 ['ILMA Rooms and Facilities','Classrooms, labs and halls.','Booking;Usage view;Clash prevention;Maintenance requests'],
 ['ILMA Transport','School buses end to end.','Routes and stops;Vehicles and driver documents;Transport fee billing'],
 ['ILMA Hostel','Boarding and multi-campus stay.','Room allocation;Occupancy;Fees and maintenance'],
 ['ILMA Canteen','Menus and meal accounts.','Point of sale;Prepaid balance;Stock and dietary notes'],
 ['ILMA Library','Physical library.','Catalogue;Barcode issue and return;Fines added to the fee account'],
 ['ILMA Stock','Supplies and equipment.','Lab, IT and store items;Low-stock reorder;Valuation'],
 ['ILMA Assets','Requests and life of assets.','Request with approval;Assignment;Disposal record'],
 ['ILMA Events','Campus events from plan to report.','Registration and tickets;Room and budget linked;Attendance and feedback']]],
['Communication and Community','CC','Notices, WhatsApp, forums, helpdesk and surveys.',[
 ['ILMA Notices','Targeted announcements.','By class, section or group;Scheduled;Read receipts and archive'],
 ['ILMA News','School news and stories.','One editing flow;Audience by role;Reader stats'],
 ['ILMA Forums','Course and community discussion.','A forum per class;Study groups;Alumni mentoring'],
 ['ILMA Polls and Surveys','Quick polls and course feedback.','Targeted audience;Live results;Evaluation reports'],
 ['ILMA Helpdesk','Requests to IT, office and facilities.','Ticket routing;Response timers;Queue view'],
 ['ILMA Care','Complaints handled properly.','Private intake;Routing;Resolution record'],
 ['ILMA Mailbox','Email inside the student file.','Mail linked to students, admissions and staff;Search;History'],
 ['ILMA WhatsApp and SMS','Messages parents read.','Fee reminders;Attendance and exam alerts;Delivery tracking']]],
['Growth and Enrollment','GE','Enquiries, campaigns, social and email.',[
 ['ILMA Enquiries','Every prospective family in one pipeline.','Capture from web, phone and walk-in;Follow-up tasks;Conversion view'],
 ['ILMA Campaigns','Automated enrollment journeys.','Lead nurturing;Personalized messages;Results by campaign'],
 ['ILMA Mail Campaigns','Bulk email to families, alumni and donors.','Audience lists;Templates;Open and enrollment tracking'],
 ['ILMA Social','Social media for admissions.','Scheduled posts;Leads sent to Enquiries;Cost per admission']]],
['Portals and Apps','PA','One login, one app, on any phone.',[
 ['ILMA Parent Portal','Everything a parent needs about their child.','Results and attendance;Fee balance and payment;Messages, leave requests and exam dates'],
 ['ILMA Student Portal','Students\' daily workspace.','Timetable and homework;Quizzes and results;Library and announcements'],
 ['ILMA Teacher Portal','Teachers\' daily workspace.','Classes and attendance;Classwork, marks and exam scheduling;Timetable and leave'],
 ['ILMA App','iOS and Android for everyone.','Notifications;Payments;Works on weak networks']]],
['Insight and AI','IA','Live dashboards, reports and ILMA AI.',[
 ['ILMA Insights','Live dashboards for each role.','Enrollment, attendance and fee collection;Exam results and staffing;Alerts across modules'],
 ['ILMA Reports','Reports on demand or on schedule.','Academic, financial and compliance;Live data;Export to Excel and PDF'],
 ['ILMA AI','Assistant inside every module.','Reads a marks sheet from a photo;Drafts quizzes, lesson plans and parent updates;Flags students at risk']]],
['Platform and Connections','PC','No-code builder, e-sign, approvals and integrations.',[
 ['ILMA Studio','Build forms, workflows and simple apps without code.','Drag and drop;Custom fields;School-specific reports'],
 ['ILMA Sign','Legally valid digital signatures.','Admission forms and undertakings;Signing trail;Reminders'],
 ['ILMA Docs Vault','One safe place for school files.','Search and versions;Permissions;Approval before publishing'],
 ['ILMA Flow','Approvals for anything.','Purchases, leave, scholarships and grade changes;Escalation;Audit log'],
 ['ILMA Connect','Plug in the tools schools already use.','Zoom, Google Meet, Microsoft Teams;BigBlueButton and Moodle;WhatsApp Business'],
 ['ILMA ROI','Shows which tools actually work.','Usage, cost per student and results for each tool','soon'],
 ['ILMA Vendors','One list of suppliers and contracts.','Contracts;Renewals and licences;What data each vendor can see','soon'],
 ['ILMA Open API','One connection to the student profile.','Records, marks, attendance and fees;One secure interface']]],
['Student Success','SS','Know who needs help and what to do.',[
 ['ILMA Early Alert','Finds students who may struggle before they fail.','Risk score from attendance, marks, homework and activity;Reasons shown with a suggested action;Result of each action tracked'],
 ['ILMA Wellbeing','Watches non-sensitive signs of student wellbeing.','Attendance, workload and survey trends;Patterns by class and grade;Cases passed to counsellors','soon'],
 ['ILMA Family Insight','One view of how each family feels about the school.','Engagement score;Complaints and message reach;Payment behaviour and event attendance'],
 ['ILMA Renewals','Shows which families may not return next year.','Likelihood of re-enrollment with reasons;Suggested action for the principal;Linked to fees and complaints']]],
['AI and Assessment','AA','Lesson planning, marking help and safe AI use.',[
 ['ILMA Lesson Studio','Lesson planning assistant for teachers.','Lesson plans and activities for different ability levels;Worksheets, quizzes and homework;Rubrics and catch-up work after a test'],
 ['ILMA AI Policy','The school\'s rules for AI use.','Approved and blocked tools;Age limits and teacher permissions;Usage log and human review'],
 ['ILMA Assessment Quality','Checks a test before students sit it.','Match with the syllabus;Difficulty, question level and bias;Which learning outcomes were achieved','soon'],
 ['ILMA Essay Review','Marks written answers against a rubric.','Urdu and English essays and short answers;Score with reasons and learning gaps;Teacher confirms every mark','soon'],
 ['ILMA Content Factory','Builds lessons and materials from the syllabus.','Worksheets, slides and teacher guides;Urdu and English versions;Approval before use','soon'],
 ['ILMA AI Skills','Tracks AI literacy by grade.','Learning stages and a progress test;Teacher training needs;Reports for the principal','soon'],
 ['ILMA Work Attribution','Shows how an assignment was produced.','Own work, AI help and copied text told apart;Sources used;A report for the teacher','soon'],
 ['ILMA Agents','Ready-made assistants for each office.','Admissions, attendance and parent messages;Teacher planning, finance and counselling;All using school data'],
 ['ILMA Ask','Ask the school anything in plain words.','Questions such as why Grade 8 maths dropped;Causes found;Actions suggested and assigned']]],
['Quality and Compliance','QC','Inspection-ready evidence and protected data.',[
 ['ILMA Accreditation','Keeps evidence ready for inspections and reviews.','Course, outcome, assessment and evidence linked;List of missing evidence;Ready-made report','soon'],
 ['ILMA Curriculum Map','Shows gaps and overlaps in what is taught.','Outdated content;Overlapping outcomes;Skills not covered by any course','soon'],
 ['ILMA Data Privacy','Protects student and staff data.','Consent records;Who viewed what;Retention rules and data requests']]],
['Credentials and Growth','CG','Verified certificates, student passport and teacher growth.',[
 ['ILMA Credentials','Verified digital certificates.','Issued with a QR check;A page where employers confirm it;Evidence attached'],
 ['ILMA Teacher Growth','Training and skills tracking for teachers.','Skill gaps;Suggested courses and certificates;School-wide view for leaders'],
 ['ILMA Student Passport','A lifelong record of each student.','Achievements, projects, certificates and languages;Verified entries;Follows the student to college and work'],
 ['ILMA Skills Map','Links courses to skills employers want.','Skills per course;Gaps against jobs;Each student\'s skill profile','soon'],
 ['ILMA Graduate Outcomes','Tracks what happens after graduation.','Jobs and further study by programme;Employer feedback','soon']]]
];
SUITES.unshift(SUITES.splice(SUITES.findIndex(x=>x[0]==='Insight and AI'),1)[0]);
const HUES=['#104ac8','#155eef','#1769d5','#087fa9','#006e9c','#2254d8','#4546dc','#6545ed','#7341d3','#087b94','#1565ba','#1647b8','#4c4cce','#5d43d5','#075f90'];
const MODS=SUITES.flatMap((s,si)=>s[3].map(m=>({n:m[0],d:m[1],c:m[2].split(';'),soon:m[3]==='soon',s:s[0],si,id:m[0]})));
const total=MODS.length; // 90
