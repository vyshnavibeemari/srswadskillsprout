// ==========================================
// SKILLSPROUT - LEARNLOOP
// Frontend Application
// ==========================================

const $ = id => document.getElementById(id);

const STORAGE = {
    users: "ss_users",
    current: "ss_current",
    profile: "ss_profile",
    enrolled: "ss_enrolled",
    completed: "ss_completed",
    sound: "ss_sound"
};

let currentUser = null;
let profile = {};
let enrolled = [];
let completed = [];
let soundOn = localStorage.getItem(STORAGE.sound) !== "false";
let authMode = "login";
let roadmap = [];

// ==========================================
// COURSE DATABASE - 40+ COURSES
// ==========================================

const courses = [
    {code:"CS101",title:"Programming Fundamentals",credits:3,difficulty:"Beginner",prerequisites:[],skill:"Programming",icon:"💻",hours:4,career:["Full-Stack Web","AI & ML","Data Science","Cybersecurity","Cloud Computing","Mobile Development"]},
    {code:"CS102",title:"Python Programming",credits:3,difficulty:"Beginner",prerequisites:["CS101"],skill:"Python",icon:"🐍",hours:4,career:["Full-Stack Web","AI & ML","Data Science","Cybersecurity"]},
    {code:"CS103",title:"Computer Fundamentals",credits:2,difficulty:"Beginner",prerequisites:[],skill:"Computing",icon:"🖥️",hours:2,career:["Full-Stack Web","AI & ML","Data Science","Cybersecurity","Cloud Computing"]},
    {code:"MA101",title:"Engineering Mathematics I",credits:4,difficulty:"Beginner",prerequisites:[],skill:"Mathematics",icon:"📐",hours:5,career:["AI & ML","Data Science"]},
    {code:"PH101",title:"Engineering Physics",credits:3,difficulty:"Beginner",prerequisites:[],skill:"Science",icon:"🔬",hours:3,career:[]},
    {code:"CH101",title:"Engineering Chemistry",credits:3,difficulty:"Beginner",prerequisites:[],skill:"Science",icon:"🧪",hours:3,career:[]},
    {code:"EN101",title:"Communication Skills",credits:2,difficulty:"Beginner",prerequisites:[],skill:"Communication",icon:"🗣️",hours:2,career:[]},
    {code:"ME101",title:"Engineering Workshop",credits:2,difficulty:"Beginner",prerequisites:[],skill:"Practical",icon:"🔧",hours:2,career:[]},

    {code:"CS201",title:"Data Structures",credits:4,difficulty:"Intermediate",prerequisites:["CS102"],skill:"Algorithms",icon:"🌳",hours:6,career:["Full-Stack Web","AI & ML","Data Science","Cybersecurity"]},
    {code:"CS202",title:"Object Oriented Programming",credits:3,difficulty:"Intermediate",prerequisites:["CS101"],skill:"OOP",icon:"🧩",hours:4,career:["Full-Stack Web","Mobile Development"]},
    {code:"CS203",title:"Database Management Systems",credits:3,difficulty:"Intermediate",prerequisites:["CS101"],skill:"SQL",icon:"🗄️",hours:4,career:["Full-Stack Web","Data Science"]},
    {code:"CS204",title:"Digital Logic Design",credits:3,difficulty:"Intermediate",prerequisites:[],skill:"Hardware",icon:"⚡",hours:3,career:[]},
    {code:"MA201",title:"Engineering Mathematics II",credits:4,difficulty:"Intermediate",prerequisites:["MA101"],skill:"Mathematics",icon:"📊",hours:5,career:["AI & ML","Data Science"]},
    {code:"CS205",title:"Discrete Mathematics",credits:3,difficulty:"Intermediate",prerequisites:["MA101"],skill:"Logic",icon:"🔢",hours:4,career:["AI & ML","Cybersecurity"]},
    {code:"CS206",title:"Web Technologies",credits:3,difficulty:"Intermediate",prerequisites:["CS101"],skill:"HTML CSS JS",icon:"🌐",hours:5,career:["Full-Stack Web","Mobile Development"]},
    {code:"CS207",title:"Computer Organization",credits:3,difficulty:"Intermediate",prerequisites:["CS103"],skill:"Computer Systems",icon:"⚙️",hours:4,career:["Cloud Computing"]},

    {code:"CS301",title:"Operating Systems",credits:4,difficulty:"Advanced",prerequisites:["CS201"],skill:"Systems",icon:"💿",hours:6,career:["Cloud Computing","Cybersecurity"]},
    {code:"CS302",title:"Computer Networks",credits:3,difficulty:"Advanced",prerequisites:["CS201"],skill:"Networking",icon:"📡",hours:5,career:["Cybersecurity","Cloud Computing"]},
    {code:"CS303",title:"Software Engineering",credits:3,difficulty:"Intermediate",prerequisites:["CS202"],skill:"Development",icon:"🛠️",hours:4,career:["Full-Stack Web"]},
    {code:"CS304",title:"Advanced Database Systems",credits:3,difficulty:"Advanced",prerequisites:["CS203"],skill:"Database",icon:"📁",hours:5,career:["Full-Stack Web","Data Science"]},
    {code:"CS305",title:"Java Programming",credits:3,difficulty:"Intermediate",prerequisites:["CS202"],skill:"Java",icon:"☕",hours:4,career:["Full-Stack Web","Mobile Development"]},
    {code:"CS306",title:"Algorithm Design",credits:4,difficulty:"Advanced",prerequisites:["CS201","CS205"],skill:"Algorithms",icon:"🧠",hours:6,career:["AI & ML","Data Science"]},
    {code:"CS307",title:"Introduction to Artificial Intelligence",credits:3,difficulty:"Advanced",prerequisites:["CS102","MA201"],skill:"AI",icon:"🤖",hours:5,career:["AI & ML"]},
    {code:"CS308",title:"Statistics for Computing",credits:3,difficulty:"Intermediate",prerequisites:["MA101"],skill:"Statistics",icon:"📈",hours:4,career:["AI & ML","Data Science"]},

    {code:"CS401",title:"Machine Learning",credits:4,difficulty:"Advanced",prerequisites:["CS307","CS308"],skill:"Machine Learning",icon:"🧠",hours:7,career:["AI & ML","Data Science"]},
    {code:"CS402",title:"Full Stack Development",credits:4,difficulty:"Advanced",prerequisites:["CS206","CS203"],skill:"Web Development",icon:"🌐",hours:7,career:["Full-Stack Web"]},
    {code:"CS403",title:"Cyber Security Fundamentals",credits:3,difficulty:"Advanced",prerequisites:["CS302"],skill:"Security",icon:"🔐",hours:5,career:["Cybersecurity"]},
    {code:"CS404",title:"Cloud Computing",credits:3,difficulty:"Advanced",prerequisites:["CS301","CS302"],skill:"Cloud",icon:"☁️",hours:5,career:["Cloud Computing"]},
    {code:"CS405",title:"Mobile Application Development",credits:3,difficulty:"Advanced",prerequisites:["CS305"],skill:"Mobile Apps",icon:"📱",hours:5,career:["Mobile Development"]},
    {code:"CS406",title:"Data Visualization",credits:3,difficulty:"Intermediate",prerequisites:["CS308","CS203"],skill:"Visualization",icon:"📊",hours:4,career:["Data Science"]},
    {code:"CS407",title:"Deep Learning",credits:4,difficulty:"Advanced",prerequisites:["CS401"],skill:"Deep Learning",icon:"🧬",hours:7,career:["AI & ML"]},
    {code:"CS408",title:"DevOps Fundamentals",credits:3,difficulty:"Advanced",prerequisites:["CS301"],skill:"DevOps",icon:"🚀",hours:5,career:["Full-Stack Web","Cloud Computing"]},

    {code:"CS501",title:"Natural Language Processing",credits:3,difficulty:"Advanced",prerequisites:["CS401"],skill:"NLP",icon:"💬",hours:6,career:["AI & ML"]},
    {code:"CS502",title:"Big Data Analytics",credits:4,difficulty:"Advanced",prerequisites:["CS308","CS304"],skill:"Big Data",icon:"📦",hours:6,career:["Data Science"]},
    {code:"CS503",title:"Ethical Hacking",credits:3,difficulty:"Advanced",prerequisites:["CS403"],skill:"Ethical Hacking",icon:"🛡️",hours:6,career:["Cybersecurity"]},
    {code:"CS504",title:"Advanced Cloud Architecture",credits:4,difficulty:"Advanced",prerequisites:["CS404"],skill:"Cloud Architecture",icon:"🏗️",hours:6,career:["Cloud Computing"]},
    {code:"CS505",title:"Web Application Security",credits:3,difficulty:"Advanced",prerequisites:["CS402","CS403"],skill:"Web Security",icon:"🔒",hours:5,career:["Full-Stack Web","Cybersecurity"]},
    {code:"CS506",title:"Data Mining",credits:3,difficulty:"Advanced",prerequisites:["CS308","CS306"],skill:"Data Mining",icon:"⛏️",hours:6,career:["Data Science"]},
    {code:"CS507",title:"Computer Vision",credits:3,difficulty:"Advanced",prerequisites:["CS401"],skill:"Computer Vision",icon:"👁️",hours:6,career:["AI & ML"]},
    {code:"CS508",title:"Final Year Project",credits:4,difficulty:"Advanced",prerequisites:["CS402"],skill:"Project",icon:"🏆",hours:8,career:["Full-Stack Web"]}
];

// ==========================================
// AUTHENTICATION
// ==========================================

function showAuth(mode) {
    authMode = mode;

    $("loginTab").classList.toggle("active", mode === "login");
    $("registerTab").classList.toggle("active", mode === "register");

    $("nameField").classList.toggle("hidden", mode !== "register");

    $("authSubmit").textContent =
        mode === "login" ? "Login to SkillSprout →" : "Create My Account →";

    $("studentName").required = mode === "register";
}

$("authForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = $("email").value.trim().toLowerCase();
    const password = $("password").value;
    const users = JSON.parse(localStorage.getItem(STORAGE.users) || "{}");

    if (authMode === "register") {
        const name = $("studentName").value.trim();

        if (password.length < 6) {
            notify("Password must contain at least 6 characters.");
            return;
        }

        if (users[email]) {
            notify("This email is already registered.");
            return;
        }

        users[email] = {name, password};

        localStorage.setItem(STORAGE.users, JSON.stringify(users));

        notify("Account created successfully! Please login.");
        showAuth("login");
        $("authForm").reset();
        return;
    }

    if (!users[email] || users[email].password !== password) {
        notify("Incorrect email or password.");
        return;
    }

    localStorage.setItem(STORAGE.current, email);
    loginUser(email);
});

function loginUser(email) {
    currentUser = email;

    const users = JSON.parse(localStorage.getItem(STORAGE.users) || "{}");

    $("authPage").classList.add("hidden");
    $("appPage").classList.remove("hidden");

    $("sideName").textContent = users[email].name;
    $("welcomeName").textContent = users[email].name;
    $("sideAvatar").textContent = users[email].name.charAt(0).toUpperCase();
    $("topAvatar").textContent = users[email].name.charAt(0).toUpperCase();

    loadStudentData();
    updateDashboard();
    notify("Welcome to SkillSprout! 🌱");
}

function logout() {
    localStorage.removeItem(STORAGE.current);
    currentUser = null;

    $("appPage").classList.add("hidden");
    $("authPage").classList.remove("hidden");
    $("authForm").reset();

    notify("You have logged out.");
}

$("logoutBtn").addEventListener("click", logout);

// ==========================================
// STUDENT DATA AND LOCAL STORAGE
// ==========================================

function studentKey(key) {
    return key + "_" + currentUser;
}

function loadStudentData() {
    profile = JSON.parse(localStorage.getItem(studentKey(STORAGE.profile)) || "{}");
    enrolled = JSON.parse(localStorage.getItem(studentKey(STORAGE.enrolled)) || "[]");
    completed = JSON.parse(localStorage.getItem(studentKey(STORAGE.completed)) || "[]");

    if (profile.branch) {
        $("branch").value = profile.branch;
        $("semester").value = profile.semester;
        $("coding").value = profile.coding;
        $("career").value = profile.career;
        $("goal").value = profile.goal || "";
    }

    updateProfileSummary();
    generateRoadmap();
    renderCatalog();
    updateProgress();
    updateStudyHours();
    renderPeers();
}

function saveStudentData() {
    localStorage.setItem(studentKey(STORAGE.profile), JSON.stringify(profile));
    localStorage.setItem(studentKey(STORAGE.enrolled), JSON.stringify(enrolled));
    localStorage.setItem(studentKey(STORAGE.completed), JSON.stringify(completed));
}

$("intakeForm").addEventListener("submit", function(e) {
    e.preventDefault();

    profile = {
        branch: $("branch").value,
        semester: Number($("semester").value),
        coding: $("coding").value,
        career: $("career").value,
        goal: $("goal").value
    };

    generateRoadmap();

    const cycle = validateDependencies();

    if (!cycle.valid) {
        notify("Circular course dependency found. Please check the catalog.");
        return;
    }

    saveStudentData();
    updateProfileSummary();
    renderCatalog();
    updateDashboard();
    updateStudyHours();
    renderPeers();

    notify("Your personalized learning roadmap is ready! 🎉");
    navigate("roadmap");
});

// ==========================================
// NAVIGATION
// ==========================================

const pageTitles = {
    dashboard: "Dashboard",
    intake: "Student Profile",
    roadmap: "Learning Roadmap",
    catalog: "Course Catalog",
    progress: "My Progress",
    graph: "Prerequisite Graph",
    study: "Study Planner",
    peers: "Study Groups"
};

function navigate(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".nav-link[data-page]").forEach(b => b.classList.remove("active"));

    $(page).classList.add("active");

    const nav = document.querySelector(`[data-page="${page}"]`);

    if (nav) nav.classList.add("active");

    $("pageHeading").textContent = pageTitles[page];

    if (page === "dashboard") updateDashboard();
    if (page === "roadmap") generateRoadmap();
    if (page === "catalog") renderCatalog();
    if (page === "progress") updateProgress();
    if (page === "graph") renderGraph();
    if (page === "study") updateStudyHours();
    if (page === "peers") renderPeers();

    window.scrollTo({top: 0, behavior: "smooth"});
}

document.querySelectorAll(".nav-link[data-page]").forEach(button => {
    button.addEventListener("click", () => navigate(button.dataset.page));
});

// ==========================================
// DAG - KAHN'S TOPOLOGICAL SORT
// ==========================================

function topologicalSort() {
    const indegree = {};
    const adjacency = {};

    courses.forEach(course => {
        indegree[course.code] = 0;
        adjacency[course.code] = [];
    });

    courses.forEach(course => {
        course.prerequisites.forEach(pre => {
            if (!indegree.hasOwnProperty(pre)) {
                throw new Error("Missing prerequisite: " + pre);
            }

            adjacency[pre].push(course.code);
            indegree[course.code]++;
        });
    });

    const queue = Object.keys(indegree).filter(code => indegree[code] === 0);
    const result = [];

    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);

        adjacency[current].forEach(next => {
            indegree[next]--;

            if (indegree[next] === 0) {
                queue.push(next);
            }
        });
    }

    if (result.length !== courses.length) {
        return null;
    }

    return result;
}

function validateDependencies() {
    try {
        const result = topologicalSort();

        if (!result) {
            return {
                valid: false,
                message: "Circular dependency detected!"
            };
        }

        return {
            valid: true,
            message: "All course dependencies are valid."
        };

    } catch (error) {
        return {valid: false, message: error.message};
    }
}

// ==========================================
// COURSE ELIGIBILITY
// ==========================================

function isUnlocked(course) {
    return course.prerequisites.every(pre => completed.includes(pre));
}

function courseStatus(course) {
    if (completed.includes(course.code)) return "Completed";
    if (enrolled.includes(course.code)) return "Enrolled";
    if (isUnlocked(course)) return "Unlocked";
    return "Locked";
}

function getRecommendedCourses() {
    if (!profile.career) return [];

    const order = topologicalSort();

    if (!order) return [];

    let selected = courses.filter(course =>
        course.career.includes(profile.career) ||
        course.prerequisites.some(pre =>
            courses.some(c => c.code === pre && c.career.includes(profile.career))
        )
    );

    // Always include the beginner baseline for students
    // who have no programming experience.

    if (profile.coding === "beginner") {
        const baseline = ["CS101","CS103","MA101"];
        selected = courses.filter(c =>
            selected.includes(c) || baseline.includes(c.code)
        );
    }

    // Add prerequisites recursively.
    const required = new Set(selected.map(c => c.code));

    function addPrerequisites(code) {
        const course = courses.find(c => c.code === code);

        if (!course) return;

        course.prerequisites.forEach(pre => {
            required.add(pre);
            addPrerequisites(pre);
        });
    }

    [...required].forEach(addPrerequisites);

    return order
        .filter(code => required.has(code))
        .map(code => courses.find(c => c.code === code));
}

// ==========================================
// ROADMAP GENERATION
// ==========================================

function generateRoadmap() {
    if (!profile.career) {
        $("roadmapInfo").textContent =
            "Complete your student diagnostic intake to generate your roadmap.";

        $("roadmapContainer").innerHTML =
            '<div class="empty-message">📝 Complete your student profile first.</div>';

        roadmap = [];
        return;
    }

    const validation = validateDependencies();

    if (!validation.valid) {
        $("roadmapInfo").textContent = validation.message;
        $("roadmapContainer").innerHTML =
            '<div class="empty-message">⚠️ Please correct the course dependencies.</div>';
        return;
    }

    roadmap = getRecommendedCourses();

    const baseSemester = Number(profile.semester) || 1;

    $("roadmapInfo").textContent =
        `🎯 Career: ${profile.career} | Branch: ${profile.branch} | ` +
        `Starting Semester: ${baseSemester} | ${roadmap.length} recommended courses`;

    const semesterGroups = {};

    roadmap.forEach(course => {
        const level = Math.max(0, Math.floor(
            (courses.findIndex(c => c.code === course.code)) / 8
        ));

        const semester = Math.min(8, baseSemester + level);

        if (!semesterGroups[semester]) semesterGroups[semester] = [];

        semesterGroups[semester].push(course);
    });

    $("roadmapContainer").innerHTML = Object.entries(semesterGroups)
        .map(([semester, list]) => `
            <div class="semester-card">
                <h3>📘 Semester ${semester}</h3>
                <p>${list.reduce((sum,c) => sum+c.credits,0)} planned credits</p>

                ${list.map(course => `
                    <div class="roadmap-course">
                        <strong>${course.icon} ${course.title}</strong>
                        <small>${course.code} • ${course.credits} credits • ${course.difficulty}</small>
                        <small>Prerequisites: ${
                            course.prerequisites.join(", ") || "None"
                        }</small>

                        <span class="tag ${courseStatus(course)==="Completed"?"green":""}">
                            ${courseStatus(course)}
                        </span>

                        ${!completed.includes(course.code) ? `
                            <button class="outline-btn"
                                onclick="enrollCourse('${course.code}')"
                                ${!isUnlocked(course) ? "disabled" : ""}>
                                ${enrolled.includes(course.code) ? "Enrolled" : "Enroll"}
                            </button>
                        ` : ""}
                    </div>
                `).join("")}
            </div>
        `).join("") || '<div class="empty-message">No recommended courses found.</div>';
}

// ==========================================
// COURSE ENROLLMENT
// ==========================================

function enrollCourse(code) {
    const course = courses.find(c => c.code === code);

    if (!course) return;

    if (completed.includes(code) || enrolled.includes(code)) {
        notify("You already enrolled in this course.");
        return;
    }

    if (!isUnlocked(course)) {
        notify("Complete the prerequisites before enrollinf!");
        return;
    }
    enrolled.push(code);
    saveStudentData();

    notify(course.title + " enrolled successfully! 🎉");

    updateDashboard();
    generateRoadmap();
    renderCatalog();
    updateProgress();
    updateStudyHours();
    renderGraph();
}

function completeCourse(code) {
    const course = courses.find(c => c.code === code);

    if (!course || !enrolled.includes(code)) {
        notify("Enroll in the course first.");
        return;
    }

    if (!isUnlocked(course)) {
        notify("Prerequisites are not completed.");
        return;
    }

    enrolled = enrolled.filter(item => item !== code);

    if (!completed.includes(code)) {
        completed.push(code);
    }

    saveStudentData();
    notify(course.title + " completed successfully! 🏆");

    updateDashboard();
    generateRoadmap();
    renderCatalog();
    updateProgress();
    updateStudyHours();
    renderGraph();
}

// ==========================================
// COURSE CATALOG AND FILTERS
// ==========================================

function renderCatalog() {
    const search = $("searchCourse").value.toLowerCase().trim();
    const credit = $("creditFilter").value;
    const difficulty = $("difficultyFilter").value;

    const filtered = courses.filter(course => {
        const matchesSearch =
            course.title.toLowerCase().includes(search) ||
            course.code.toLowerCase().includes(search) ||
            String(course.credits).includes(search);

        const matchesCredit = !credit || course.credits == credit;
        const matchesDifficulty = !difficulty || course.difficulty === difficulty;

        return matchesSearch && matchesCredit && matchesDifficulty;
    });

    $("catalogCount").textContent =
        `Showing ${filtered.length} of ${courses.length} courses`;
        $("catalogGrid").innerHTML = filtered.map(course => {
        const status = courseStatus(course);

        return `
            <div class="course-card">
                <div class="course-top">
                    <div class="course-icon">${course.icon}</div>
                    <span class="tag ${status==="Completed"?"green":""}">
                        ${status}
                    </span>
                </div>

                <h3>${course.title}</h3>
                <span class="course-code">${course.code}</span>

                <div class="course-meta">
                    <span class="tag">${course.credits} Credits</span>
                    <span class="tag orange">${course.difficulty}</span>
                </div>

                <p class="course-prereq">
                    Prerequisites: ${course.prerequisites.join(", ") || "None"}
                </p>

                ${
                    status === "Completed"
                    ? '<button class="outline-btn" disabled>Completed ✓</button>'
                    : status === "Enrolled"
                    ? '<button class="outline-btn" disabled>Already Enrolled</button>'
                    : `
                        <button class="primary-btn"
                        onclick="enrollCourse('${course.code}')"
                        ${!isUnlocked(course)?"disabled":""}>
                            ${isUnlocked(course)?"Enroll Now +":"🔒 Prerequisites Required"}
                        </button>
                    `
                }
            </div>
        `;
    }).join("") || '<div class="empty-message">No courses match your filters.</div>';
}
["searchCourse","creditFilter","difficultyFilter"].forEach(id => {
    $(id).addEventListener(id === "searchCourse" ? "input" : "change", renderCatalog);
});

$("clearFilters").addEventListener("click", function() {
    $("searchCourse").value = "";
    $("creditFilter").value = "";
    $("difficultyFilter").value = "";
    renderCatalog();
});

// ==========================================
// DASHBOARD
// ==========================================

function updateProfileSummary() {
    if (!profile.branch) {
        $("profileSummary").innerHTML =
            "Your student profile has not been completed yet.";
        return;
    }

    $("profileSummary").innerHTML = `
        <div>🎓 Branch: <strong>${profile.branch}</strong></div>
        <div>📖 Semester: <strong>${profile.semester}</strong></div>
        <div>💻 Coding: <strong>${profile.coding}</strong></div>
        <div>🎯 Career: <strong>${profile.career}</strong></div>
    `;
}

function updateDashboard() {
    const totalCredits = completed.reduce((sum, code) => {
        const course = courses.find(c => c.code === code);
        return sum + (course ? course.credits : 0);
    }, 0);

    const totalRecommended = roadmap.length;
    const percentage = totalRecommended
        ? Math.round(completed.filter(code =>
            roadmap.some(c => c.code === code)
            ).length / totalRecommended * 100)
        : 0;

    $("enrolledCount").textContent = enrolled.length;
    $("creditCount").textContent = totalCredits;
    $("overallCount").textContent = percentage + "%";
    $("dashboardPercent").textContent = percentage + "%";
    $("dashboardRing").style.background =
        `conic-gradient(#7455e8 ${percentage*3.6}deg, #eeeaf5 0deg)`;

    $("hoursCount").textContent =
        calculateStudyHours() + "h";

    $("dashboardCourses").innerHTML = enrolled.length
        ? enrolled.map(code => {
            const course = courses.find(c => c.code === code);

            return `
                <div class="course-card">
                    <div class="course-icon">${course.icon}</div>
                    <h3>${course.title}</h3>
                    <p class="course-code">${course.code}</p>
                    <span class="tag">In Progress</span>
                </div>
            `;
        }).join("")
        : '<div class="empty-message">No enrolled courses yet. Explore the catalog!</div>';

    updateProfileSummary();
}

// ==========================================
// PROGRESS TRACKER
// ==========================================

function updateProgress() {
    const credits = completed.reduce((sum, code) => {
        const course = courses.find(c => c.code === code);
        return sum + (course ? course.credits : 0);
    }, 0);

    const percentage = roadmap.length
        ? Math.round(completed.filter(code =>
            roadmap.some(c => c.code === code)
        ).length / roadmap.length * 100)
        : 0;

    $("progressPercent").textContent = percentage + "%";
    $("progressEnrolled").textContent = enrolled.length;
    $("progressCompleted").textContent = completed.length;
    $("progressCredits").textContent = credits;

    const allCodes = [...new Set([...enrolled, ...completed])];

    $("progressCourseList").innerHTML = allCodes.length? allCodes.map(code => {
            const course = courses.find(c => c.code === code);

            return `
                <div class="progress-item">
                    <div>
                        <strong>${course.title}</strong>
                        <small>${course.code} • ${course.credits} credits</small>
                    </div>

                    ${
                        completed.includes(code)
                        ? '<span class="tag green">Completed ✓</span>'
                        : `<button class="primary-btn" onclick="completeCourse('${code}')">
                            Mark Complete
                           </button>`
                    }
                </div>
            `;
        }).join("")
        : '<div class="empty-message">Enroll in a course to start tracking your progress.</div>';

    const semesters = {};

    completed.forEach(code => {
        const course = courses.find(c => c.code === code);
        const index = courses.findIndex(c => c.code === code);
        const semester = Math.min(8, (Math.floor(index/8)+1));

        semesters[semester] = (semesters[semester] || 0) + course.credits;
    });
    $("semesterSummary").innerHTML =
        Object.keys(semesters).length
        ? Object.entries(semesters).map(([semester, credits]) => `
            <div class="semester-summary-row">
                <strong>Semester ${semester}</strong>
                <span>${credits} credits completed</span>
            </div>
        `).join("")
        : '<p>No semester credits completed yet.</p>';
}

// ==========================================
// STUDY HOURS ESTIMATOR
// ==========================================

function calculateStudyHours() {
    return enrolled.reduce((sum, code) => {
        const course = courses.find(c => c.code === code);
        return sum + (course ? course.hours : 0);
    }, 0);
}

function updateStudyHours() {
    const total = calculateStudyHours();

    $("studyHours").textContent = total + " Hours";

    $("studyExplanation").textContent = total
        ? "Your estimated weekly workload based on enrolled course difficulty."
        : "Enroll in courses to calculate your weekly study workload.";

    $("studyBreakdown").innerHTML = enrolled.length
        ? enrolled.map(code => {
            const course = courses.find(c => c.code === code);

            return `
                <div class="study-breakdown-row">
                    <span>${course.title}</span>
                    <strong>${course.hours} hrs/week</strong>
                </div>
            `;
        }).join("")
        : "";
}

// ==========================================
// PEER STUDY GROUP RECOMMENDER
// ==========================================

function renderPeers() {
    if (!profile.career) {
        $("peerContainer").innerHTML =
            '<div class="empty-message">Complete your profile to see suggested study groups.</div>';
        return;
    }

    const groups = [
        {name:"Beginner Coding Circle",career:["Full-Stack Web","Mobile Development"],level:"Beginner",icon:"💻",members:8},
        {name:"AI Explorers",career:["AI & ML","Data Science"],level:"Intermediate",icon:"🤖",members:12},
        {name:"Web Developers Hub",career:["Full-Stack Web"],level:"Intermediate",icon:"🌐",members:10},
        {name:"Cyber Safety Club",career:["Cybersecurity"],level:"Advanced",icon:"🔐",members:7},
        {name:"Cloud Learners",career:["Cloud Computing"],level:"Intermediate",icon:"☁️",members:9},
        {name:"Data Thinkers",career:["Data Science"],level:"Advanced",icon:"📊",members:11},
        {name:"Mobile App Creators",career:["Mobile Development"],level:"Intermediate",icon:"📱",members:6}
    ];
    const matched = groups.filter(g => g.career.includes(profile.career));

    $("peerContainer").innerHTML = matched.map(group => `
        <div class="peer-card">
            <span>${group.icon}</span>
            <h3>${group.name}</h3>
            <p>Career: ${profile.career}</p>
            <p>Level: ${group.level}</p>
            <p>Suggested group size: ${group.members} students</p>
            <button class="primary-btn" onclick="notify('This is a suggested study group. Connect with classmates following this pathway.')">
                View Group
            </button>
        </div>
    `).join("") || '<div class="empty-message">No matching study groups found.</div>';
}

// ==========================================
// SVG PREREQUISITE GRAPH
// ==========================================

function renderGraph() {
    const selected = roadmap.length
        ? roadmap.slice(0, 12)
        : courses.slice(0, 12);

    const nodeWidth = 145;
    const nodeHeight = 48;
    const gapX = 185;
    const gapY = 90;
    const positions = {};

    selected.forEach((course, index) => {
        positions[course.code] = {
            x: 30 + (index % 4) * gapX,
            y: 25 + Math.floor(index / 4) * gapY
        };
    });

    let edges = "";

    selected.forEach(course => {
        course.prerequisites.forEach(pre => {
            if (positions[pre] && positions[course.code]) {
                const a = positions[pre];
                const b = positions[course.code];

                edges += `
                    <line class="graph-edge"
                        x1="${a.x+nodeWidth/2}"
                        y1="${a.y+nodeHeight}"
                        x2="${b.x+nodeWidth/2}"
                        y2="${b.y}"/>
                `;
            }
        });
    });

    let nodes = selected.map(course => {
        const p = positions[course.code];

        const color = completed.includes(course.code)
            ? "#37ad83"
            : enrolled.includes(course.code)
            ? "#4d9de0"
            : isUnlocked(course)
            ? "#7962d8"
            : "#b0a8c2";

        return `
            <g class="graph-node">
                <rect x="${p.x}" y="${p.y}"
                    width="${nodeWidth}" height="${nodeHeight}"
                    rx="10" fill="${color}" stroke="${color}"/>
                <text x="${p.x+nodeWidth/2}"
                    y="${p.y+19}">${course.code}</text>
                <text x="${p.x+nodeWidth/2}"
                    y="${p.y+34}"
                    style="font-size:9px">${course.title.slice(0,19)}</text>
            </g>
        `;
    }).join("");

    const height = Math.ceil(selected.length/4)*gapY+60;
    $("dependencyGraph").innerHTML = `
        <svg viewBox="0 0 770 ${height}"
            xmlns="http://www.w3.org/2000/svg">
            ${edges}
            ${nodes}
        </svg>
    `;

    const validation = validateDependencies();

    $("cycleStatus").textContent = validation.message;
}

// ==========================================
// PDF ROADMAP EXPORT
// ==========================================

function exportRoadmap() {
    if (!roadmap.length) {
        notify("Generate your roadmap before exporting.");
        return;
    }

    const coursesHTML = roadmap.map(course => `
        <tr>
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.credits}</td>
            <td>${course.prerequisites.join(", ") || "None"}</td>
            <td>${courseStatus(course)}</td>
        </tr>
    `).join("");

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
        notify("Please allow pop-ups to export your roadmap.");
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>SkillSprout Learning Roadmap</title>
            <style>
                body{font-family:Arial;padding:35px;color:#292344}
                h1{color:#7455e8}
                p{line-height:1.7}
                table{width:100%;border-collapse:collapse;margin-top:25px}
                th,td{border:1px solid #ddd;padding:10px;text-align:left}
                th{background:#7455e8;color:white}
                .sign{margin-top:70px;display:flex;justify-content:space-between}
            </style>
        </head>
        <body>
            <h1>🌱 SkillSprout - LearnLoop</h1>
            <h2>Student Learning Roadmap</h2>
            <p><b>Student:</b> ${$("sideName").textContent}</p>
            <p><b>Branch:</b> ${profile.branch}</p>
            <p><b>Career Path:</b> ${profile.career}</p>
            <p><b>Semester:</b> ${profile.semester}</p>
            <table>
                <tr>
                    <th>Code</th>
                    <th>Course</th>
                    <th>Credits</th>
                    <th>Prerequisites</th>
                    <th>Status</th>
                </tr>
                ${coursesHTML}
            </table>
            <div class="sign">
                <p>Student Signature: __________</p>
                <p>Academic Advisor: __________</p>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>
        </body>
        </html>
    `);

    printWindow.document.close();
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function notify(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    $("toastContainer").appendChild(toast);

    setTimeout(() => toast.remove(), 3500);

    playSound();
}

// ==========================================
// SOUND EFFECTS
// ==========================================

function playSound() {
    if (!soundOn) return;

    try {
        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) return;

        const audio = new AudioContext();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.frequency.value = 660;
        oscillator.type = "sine";

        gain.gain.setValueAtTime(0.08, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001, audio.currentTime + 0.15
        );

        oscillator.start();
        oscillator.stop(audio.currentTime + 0.15);

        oscillator.onended = () => audio.close();

    } catch (error) {
        console.log("Sound unavailable.");
    }
}

$("soundToggle").addEventListener("click", function() {
    soundOn = !soundOn;

    localStorage.setItem(STORAGE.sound, soundOn);

    this.textContent = soundOn
        ? "🔊 Sound: On"
        : "🔇 Sound: Off";

    notify(soundOn ? "Sound enabled." : "Sound disabled.");
});

$("notificationBtn").addEventListener("click", () => {
    notify("Welcome! Keep working towards your learning goals. 🌱");
});

// ==========================================
// START APPLICATION
// ==========================================

function initializeApp() {
    $("soundToggle").textContent =
        soundOn ? "🔊 Sound: On" : "🔇 Sound: Off";

    $("todayText").textContent =
        new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    const validation = validateDependencies();

    if (!validation.valid) {
        console.error(validation.message);
    }

    const savedEmail = localStorage.getItem(STORAGE.current);

    if (savedEmail) {
        const users = JSON.parse(localStorage.getItem(STORAGE.users) || "{}");

        if (users[savedEmail]) {
            loginUser(savedEmail);
            return;
        }

        localStorage.removeItem(STORAGE.current);
    }

    $("authPage").classList.remove("hidden");
    $("appPage").classList.add("hidden");
}

initializeApp();