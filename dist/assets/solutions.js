const ILMA_SOLUTIONS = [
  {
    "id": "schools",
    "icon": "🏫",
    "title": "K–12 Schools",
    "description": "Admissions, attendance, exams and parent communication.",
    "topics": [
      "Admissions",
      "Attendance",
      "Exams and Results"
    ]
  },
  {
    "id": "colleges",
    "icon": "🎓",
    "title": "Colleges",
    "description": "Keep admissions, courses and student records connected.",
    "topics": [
      "Admissions",
      "Courses",
      "Results"
    ]
  },
  {
    "id": "universities",
    "icon": "🏛️",
    "title": "Universities",
    "description": "Explore connected workflows for departments and student services.",
    "topics": [
      "Courses",
      "Admissions",
      "Finance"
    ]
  },
  {
    "id": "preschools",
    "icon": "🧸",
    "title": "Preschools",
    "description": "Stay close to families from enrolment to the daily update.",
    "topics": [
      "Admissions",
      "Attendance",
      "Parent"
    ]
  },
  {
    "id": "academies",
    "icon": "📚",
    "title": "Tuition Academies",
    "description": "Organize classes, assessments and fee collection.",
    "topics": [
      "Courses",
      "Attendance",
      "Fees"
    ]
  },
  {
    "id": "vocational",
    "icon": "🛠️",
    "title": "Vocational Institutes",
    "description": "Explore course delivery, practical learning and student progress.",
    "topics": [
      "Courses",
      "Learning",
      "Results"
    ]
  },
  {
    "id": "faith-schools",
    "icon": "📖",
    "title": "Faith-Based Schools",
    "description": "Bring learning, attendance and family communication together.",
    "topics": [
      "Learning",
      "Attendance",
      "Parent"
    ]
  },
  {
    "id": "summer-schools",
    "icon": "☀️",
    "title": "Summer Schools",
    "description": "Coordinate short courses, registrations and schedules.",
    "topics": [
      "Admissions",
      "Courses",
      "Timetable"
    ]
  },
  {
    "id": "school-groups",
    "icon": "🌐",
    "title": "School Groups",
    "description": "Explore shared oversight for campuses and school teams.",
    "topics": [
      "Campus",
      "Finance",
      "Analytics"
    ]
  },
  {
    "id": "principals",
    "icon": "👥",
    "title": "For Principals",
    "description": "Find the ILMA modules that support your team’s daily work.",
    "topics": [
      "Analytics",
      "Attendance",
      "Results"
    ]
  },
  {
    "id": "school-owners",
    "icon": "👥",
    "title": "For School Owners",
    "description": "Find the ILMA modules that support your team’s daily work.",
    "topics": [
      "Finance",
      "Campus",
      "Admissions"
    ]
  },
  {
    "id": "finance-teams",
    "icon": "👥",
    "title": "For Finance Teams",
    "description": "Find the ILMA modules that support your team’s daily work.",
    "topics": [
      "Fees",
      "Finance",
      "Payments"
    ]
  },
  {
    "id": "registrars",
    "icon": "👥",
    "title": "For Registrars",
    "description": "Find the ILMA modules that support your team’s daily work.",
    "topics": [
      "Admissions",
      "Student",
      "Records"
    ]
  },
  {
    "id": "admissions-teams",
    "icon": "👥",
    "title": "For Admissions Teams",
    "description": "Find the ILMA modules that support your team’s daily work.",
    "topics": [
      "Admissions",
      "Enrolment",
      "Communication"
    ]
  },
  {
    "id": "teachers",
    "icon": "👥",
    "title": "For Teachers",
    "description": "Find the ILMA modules that support your team’s daily work.",
    "topics": [
      "Learning",
      "Exams",
      "Attendance"
    ]
  },
  {
    "id": "it-administrators",
    "icon": "👥",
    "title": "For IT Administrators",
    "description": "Find the ILMA modules that support your team’s daily work.",
    "topics": [
      "Security",
      "Integration",
      "Administration"
    ]
  },
  {
    "id": "parents",
    "icon": "👥",
    "title": "For Parents",
    "description": "Find the ILMA modules that support your team’s daily work.",
    "topics": [
      "Parent",
      "Fees",
      "Communication"
    ]
  },
  {
    "id": "montessori",
    "icon": "✦",
    "title": "Montessori Schools",
    "description": "Explore learning, administration and communication modules for your institution.",
    "topics": [
      "Courses",
      "Admissions",
      "Communication"
    ]
  },
  {
    "id": "international",
    "icon": "✦",
    "title": "International Schools",
    "description": "Explore learning, administration and communication modules for your institution.",
    "topics": [
      "Courses",
      "Admissions",
      "Communication"
    ]
  },
  {
    "id": "boarding",
    "icon": "✦",
    "title": "Boarding Schools",
    "description": "Explore learning, administration and communication modules for your institution.",
    "topics": [
      "Courses",
      "Admissions",
      "Communication"
    ]
  },
  {
    "id": "language",
    "icon": "✦",
    "title": "Language Schools",
    "description": "Explore learning, administration and communication modules for your institution.",
    "topics": [
      "Courses",
      "Admissions",
      "Communication"
    ]
  },
  {
    "id": "music",
    "icon": "✦",
    "title": "Music Schools",
    "description": "Explore learning, administration and communication modules for your institution.",
    "topics": [
      "Courses",
      "Admissions",
      "Communication"
    ]
  },
  {
    "id": "sports",
    "icon": "✦",
    "title": "Sports Academies",
    "description": "Explore learning, administration and communication modules for your institution.",
    "topics": [
      "Courses",
      "Admissions",
      "Communication"
    ]
  },
  {
    "id": "after-school",
    "icon": "✦",
    "title": "After-School Programs",
    "description": "Explore learning, administration and communication modules for your institution.",
    "topics": [
      "Courses",
      "Admissions",
      "Communication"
    ]
  }
];
function renderSolutions(id) {
 const target=document.querySelector('#solutions-content');
 const solution=ILMA_SOLUTIONS.find(s=>s.id===id);
 if(!solution){
  target.innerHTML=`<div class="pt"><span class="pill">Built around your day</span><h1>A starting point for every institution</h1><p class="sub">Explore ILMA by institution or role, then choose the modules you want to see in a demo.</p></div><div class="solution-cards">${ILMA_SOLUTIONS.map(s=>`<a class="solution-card" href="#/solutions/${s.id}"><span class="solution-icon" aria-hidden="true">${s.icon}</span><h2>${s.title}</h2><p>${s.description}</p><span class="solution-card-link">Explore solution →</span></a>`).join('')}</div>`;
  return;
 }
 target.innerHTML=`<div class="pt solution-heading"><a class="solution-back" href="#/solutions">← All solutions</a><span class="solution-icon" aria-hidden="true">${solution.icon}</span><h1>${solution.title}</h1><p class="sub">${solution.description}</p><div class="solution-actions"><button class="btn p" data-demo>Book a tailored demo</button><a class="btn advisor" href="#/contact">Talk to an Advisor</a></div></div><div class="solution-note">Explore these workflows with our team to confirm the right fit for your institution.</div><div class="solution-cards">${solution.topics.map((topic,i)=>`<article class="solution-card"><span class="solution-number">0${i+1}</span><h2>${topic}</h2><p>Browse the catalogue and choose the ${topic.toLowerCase()} capabilities you want to explore.</p><a class="solution-card-link" href="#/features" data-solution-search="${topic}">View related modules →</a></article>`).join('')}</div><div class="cta"><div><h2>Your institution. Your starting point.</h2><p>Tell us what takes the most time today. We will help you explore the relevant modules.</p></div><button class="btn w" data-demo>Book a demo</button></div>`;
}
