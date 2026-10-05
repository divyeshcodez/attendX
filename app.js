const state={role:"Student",page:"Overview",marks:[],claims:[]};

const students=[
["AR","Aarav Rao","COA","A","Present","Verified","86%"],
["SP","Sia Patil","COA","A","Present","Verified","91%"],
["VK","Ved Kulkarni","COA","A","Late","Suspicious","73%"],
["NM","Neha More","COA","A","Absent","—","68%"],
["RS","Rohan Shah","COA","A","Present","Unverified","79%"],
["AK","Ananya Kulkarni","COA","A","Present","Verified","94%"]
];

function nav(){
 const items=state.role==="Student"
 ? [["⌂","Overview"],["◷","My Attendance"],["▣","Lectures"],["↥","OD Claims"]]
 : state.role==="Teacher"
 ? [["⌂","Overview"],["◉","Live Lecture"],["▣","Lectures"],["♙","Roster"],["↥","OD Claims"]]
 : [["⌂","Overview"],["▣","Lectures"],["♙","Students"],["↥","OD Approvals"],["◌","Audit Log"],["▤","Reports"]];
 return items.map(x=>`<button class="${state.page===x[1]?'active':''}" onclick="setPage('${x[1]}')"><span class="nav-icon">${x[0]}</span><span>${x[1]}</span></button>`).join("");
}

function shell(content){
 document.getElementById("app").innerHTML=`<aside class="sidebar">
 <div class="logo"><div class="logo-mark">A</div><span>AttendX</span></div>
 <div class="nav-title">Workspace</div><div class="nav">${nav()}</div>
 <div class="sidebar-bottom"><div class="user-mini"><div class="avatar">DP</div><div><b style="font-size:12px">Divyesh Patil</b><small style="display:block;color:#7d849e">${state.role}</small></div></div></div>
 </aside><main class="main"><header class="topbar"><div class="breadcrumb">AttendX / ${state.page}</div><div class="top-actions"><select class="role" onchange="changeRole(this.value)"><option>Student</option><option>Teacher</option><option>HOD</option></select><div class="avatar">DP</div></div></header><section class="content">${content}</section></main>`;
}

function stats(){
 return `<div class="grid stats">
 <div class="card"><div class="stat-label">Overall attendance</div><div class="stat-value">86.4%</div><div class="stat-foot up">↑ 2.1% this month</div></div>
 <div class="card"><div class="stat-label">Classes attended</div><div class="stat-value">38 / 44</div><div class="stat-foot">6 absences recorded</div></div>
 <div class="card"><div class="stat-label">Current streak</div><div class="stat-value">8 days</div><div class="stat-foot up">Personal best: 12 days</div></div>
 <div class="card"><div class="stat-label">Risk status</div><div class="stat-value">Safe</div><div class="stat-foot up">Above 75% threshold</div></div></div>`;
}

function studentOverview(){
 return `<div class="eyebrow">Monday · 6 October 2026</div><h1 class="page-title">Good morning, Divyesh.</h1><p class="sub">Here's your attendance snapshot and today's classes.</p>${stats()}
 <div class="grid two" style="margin-top:18px">
 <div class="card"><div class="section-head"><h3 class="section-title">Today's lectures</h3><button class="btn small" onclick="setPage('Lectures')">View all</button></div>
 ${lecture("09:00","Computer Organization","Prof. Mehta","Room C-204","OPEN",true)}${lecture("11:00","Discrete Structures","Dr. Shah","Room B-102","SCHEDULED")}${lecture("14:00","Data Structures","Prof. Joshi","Lab 3","SCHEDULED")}</div>
 <div class="card"><div class="section-head"><h3 class="section-title">Attendance health</h3></div><div style="display:flex;gap:22px;align-items:center"><div class="kpi-ring"><b>86%</b></div><div><b style="font-size:15px">You're on track</b><p class="sub" style="margin:6px 0 0">You can miss <b>5 more</b> lectures before approaching the 75% threshold.</p></div></div>
 <div style="margin-top:22px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:7px"><span>Semester target</span><b>86 / 90%</b></div><div class="progress"><i style="width:86%"></i></div></div></div></div>
 <div class="card" style="margin-top:18px"><div class="section-head"><h3 class="section-title">Subject-wise attendance</h3><button class="btn small" onclick="setPage('My Attendance')">Details</button></div>${subject("Computer Organization","12 / 14",86)}${subject("Discrete Structures","10 / 11",91)}${subject("Data Structures","9 / 11",82)}${subject("Engineering Mathematics","7 / 8",88)}</div>`;
}

function lecture(time,name,teacher,room,status,open=false){
 return `<div class="lecture"><div class="lecture-main"><div class="timebox">${time}</div><div><h4>${name}</h4><p>${teacher} · ${room}</p></div></div><div>${status==="OPEN"?`<button class="btn primary small" onclick="markModal()">Mark now</button>`:`<span class="badge gray">${status}</span>`}</div></div>`;
}
function subject(n,x,p){return `<div style="margin:13px 0"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:7px"><span>${n}</span><b>${p}% <span style="color:#89919f;font-weight:400">${x}</span></b></div><div class="progress"><i style="width:${p}%"></i></div></div>`}

function myAttendance(){
 const rows=[["Computer Organization","12","14","86%"],["Discrete Structures","10","11","91%"],["Data Structures","9","11","82%"],["Engineering Mathematics","7","8","88%"],["Python Programming","8","10","80%"]];
 return `<div class="eyebrow">Student record</div><h1 class="page-title">My Attendance</h1><p class="sub">Detailed attendance record for Semester 3.</p><div class="card"><div class="section-head"><h3 class="section-title">Attendance by subject</h3><select class="role"><option>Semester 3</option></select></div><div class="table-wrap"><table class="table"><thead><tr><th>Subject</th><th>Present</th><th>Total</th><th>Attendance</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td><b>${r[3]}</b></td><td><span class="badge ${parseInt(r[3])<75?'red':'green'}">${parseInt(r[3])<75?'At risk':'Safe'}</span></td></tr>`).join("")}</tbody></table></div></div>`;
}

function lectures(){
 return `<div class="eyebrow">Schedule</div><h1 class="page-title">Lectures</h1><p class="sub">Your timetable and active attendance windows.</p><div class="card">${lecture("09:00","Computer Organization","Prof. Mehta","Room C-204","OPEN",true)}${lecture("11:00","Discrete Structures","Dr. Shah","Room B-102","SCHEDULED")}${lecture("14:00","Data Structures","Prof. Joshi","Lab 3","SCHEDULED")}${lecture("16:00","Engineering Mathematics","Dr. Kulkarni","Room A-105","SCHEDULED")}</div>`;
}

function teacherOverview(){
 return `<div class="eyebrow">Faculty workspace</div><h1 class="page-title">Good morning, Prof. Mehta.</h1><p class="sub">Monitor today's classes and attendance in real time.</p>
 <div class="grid stats"><div class="card"><div class="stat-label">Today's lectures</div><div class="stat-value">4</div><div class="stat-foot">2 completed · 1 live</div></div><div class="card"><div class="stat-label">Students marked</div><div class="stat-value">31 / 42</div><div class="stat-foot up">73.8% attendance</div></div><div class="card"><div class="stat-label">Suspicious</div><div class="stat-value">2</div><div class="stat-foot down">Needs review</div></div><div class="card"><div class="stat-label">Pending OD</div><div class="stat-value">3</div><div class="stat-foot">Awaiting approval</div></div></div>
 <div class="grid two" style="margin-top:18px"><div class="card"><div class="section-head"><h3 class="section-title">Live lecture · COA</h3><button class="btn primary" onclick="setPage('Live Lecture')">Open dashboard</button></div><div class="notice">Lecture window closes in <b>08:42</b>. 11 students are yet to mark.</div>${students.slice(0,4).map(s=>studentRow(s)).join("")}</div><div class="card"><div class="section-head"><h3 class="section-title">Alerts</h3></div><div class="alert-row"><span class="dot"></span><div><b>2 suspicious Wi-Fi scans</b><p class="sub" style="margin:3px 0">Ved Kulkarni, Rohan Shah</p></div></div><div class="alert-row"><span class="dot" style="background:var(--amber)"></span><div><b>3 OD claims pending</b><p class="sub" style="margin:3px 0">Review before tomorrow</p></div></div></div></div>`;
}
function studentRow(s){return `<div class="lecture"><div class="student"><div class="avatar sm">${s[0]}</div><div><b>${s[1]}</b><p style="margin:2px 0;color:#8a91a0;font-size:11px">${s[5]} confidence</p></div></div><span class="badge ${s[4]==='Present'?'green':s[4]==='Late'?'amber':'red'}">${s[4]}</span></div>`}

function liveLecture(){
 return `<div class="eyebrow">Teacher control</div><h1 class="page-title">Computer Organization</h1><p class="sub">C-204 · Semester 3 · Division A</p>
 <div class="grid two"><div class="card hero"><div class="eyebrow" style="color:#9ea3ff">Live marking code</div><div class="code">K7M2Q9</div><div class="code-timer">Rotates in 18 seconds · 31 students marked</div><div style="margin-top:24px"><button class="btn" onclick="toast('Lecture closed and unmarked students set to absent.')">Close lecture</button></div></div>
 <div class="card"><div class="section-head"><h3 class="section-title">Live stats</h3></div><div style="font:700 35px 'Space Grotesk'">73.8%</div><div class="progress" style="margin:10px 0"><i style="width:74%"></i></div><p class="sub">31 Present · 3 Late · 8 Unmarked</p><button class="btn" onclick="toast('Attendance sheet prepared for export.')">Export Excel</button></div></div>
 <div class="card" style="margin-top:18px"><div class="section-head"><h3 class="section-title">Student roster</h3><input class="search" placeholder="Search student..." oninput="filterStudents(this.value)"></div><div id="roster">${students.map(s=>studentRow(s)).join("")}</div></div>`;
}
function filterStudents(q){document.querySelectorAll("#roster .lecture").forEach(x=>x.style.display=x.innerText.toLowerCase().includes(q.toLowerCase())?"flex":"none")}

function odClaims(){
 return `<div class="eyebrow">On Duty</div><h1 class="page-title">${state.role==="Student"?"OD Claims":"OD Claims"}</h1><p class="sub">${state.role==="Student"?"Upload event proof for official academic activities.":"Review student claims and verify supporting evidence."}</p>
 <div class="card"><div class="section-head"><h3 class="section-title">${state.role==="Student"?"My claims":"Pending approval"}</h3>${state.role==="Student"?'<button class="btn primary" onclick="claimModal()">+ New claim</button>':''}</div>
 <table class="table"><thead><tr><th>Student / Event</th><th>Date</th><th>Evidence</th><th>Status</th><th>Action</th></tr></thead><tbody>
 <tr><td><b>${state.role==="Student"?"Divyesh Patil":"Aarav Rao"}</b><br><small>NEC Campus Ambassador</small></td><td>04 Oct</td><td>3 photos · EXIF matched</td><td><span class="badge amber">Pending</span></td><td>${state.role==="Student"?"—":'<button class="btn small primary" onclick="toast(\\'OD approved — existing Present marks preserved.\\')">Review</button>'}</td></tr>
 <tr><td><b>Rugved Shah</b><br><small>Hackathon — IIT Bombay</small></td><td>28 Sep</td><td>5 photos · Location matched</td><td><span class="badge green">Approved</span></td><td>—</td></tr>
 </tbody></table></div>`;
}

function hodOverview(){
 return `<div class="eyebrow">Administration</div><h1 class="page-title">Attendance command center</h1><p class="sub">College-wide attendance health and compliance.</p>
 <div class="grid stats"><div class="card"><div class="stat-label">Overall attendance</div><div class="stat-value">82.7%</div><div class="stat-foot up">+1.4% vs last month</div></div><div class="card"><div class="stat-label">Below 75%</div><div class="stat-value">64</div><div class="stat-foot down">Across 11 divisions</div></div><div class="card"><div class="stat-label">Below 25%</div><div class="stat-value">7</div><div class="stat-foot down">Parent meetings required</div></div><div class="card"><div class="stat-label">Audit events</div><div class="stat-value">142</div><div class="stat-foot">This semester</div></div></div>
 <div class="grid two" style="margin-top:18px"><div class="card"><div class="section-head"><h3 class="section-title">At-risk divisions</h3><button class="btn small" onclick="setPage('Reports')">Reports</button></div>${subject("Computer Engg · Div B","71 students",72)}${subject("IT · Div A","68 students",74)}${subject("Computer Engg · Div A","65 students",78)}${subject("AI & DS · Div C","59 students",81)}</div><div class="card"><div class="section-head"><h3 class="section-title">Recent audit activity</h3></div>${["Prof. Mehta changed NM to Present","Dr. Shah reset device binding","Prof. Joshi approved OD claim"].map((x,i)=>`<div class="alert-row"><span class="dot" style="background:${i===0?'var(--amber)':'var(--brand)'}"></span><div><b>${x}</b><p class="sub" style="margin:3px 0">${i+2} min ago · reason recorded</p></div></div>`).join("")}</div></div>`;
}
function audit(){
 return `<div class="eyebrow">Compliance</div><h1 class="page-title">Audit Log</h1><p class="sub">Append-only record of attendance overrides and sensitive actions.</p><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Student</th><th>Reason</th></tr></thead><tbody>${[
["10:42","Prof. Mehta","PRESENT","Neha More","Student arrived with medical permission"],
["09:58","Dr. Shah","DEVICE RESET","Ved Kulkarni","Phone replaced after damage"],
["09:12","Prof. Joshi","ABSENT → PRESENT","Rohan Shah","Official college duty"],
["Yesterday","Admin","OD APPROVED","Aarav Rao","IIT Bombay NEC event"]
].map(r=>`<tr>${r.map((c,i)=>`<td>${i===2?`<span class="badge blue">${c}</span>`:c}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
}
function reports(){
 return `<div class="eyebrow">Exports</div><h1 class="page-title">Reports</h1><p class="sub">Generate attendance matrices and defaulter lists.</p><div class="grid three"><div class="card"><h3 class="section-title">Attendance Matrix</h3><p class="sub">Student × lecture matrix with status, confidence and source.</p><button class="btn primary" onclick="toast('Excel export generated.')">Export XLSX</button></div><div class="card"><h3 class="section-title">Defaulters</h3><p class="sub">Students below 75%, grouped by division and subject.</p><button class="btn primary" onclick="toast('Defaulters sheet generated.')">Export XLSX</button></div><div class="card"><h3 class="section-title">Critical cases</h3><p class="sub">Students below 25% requiring parent meetings.</p><button class="btn primary" onclick="toast('Critical cases report generated.')">Export XLSX</button></div></div>`;
}

function render(){
 let c="";
 if(state.role==="Student"){
   if(state.page==="Overview")c=studentOverview(); else if(state.page==="My Attendance")c=myAttendance(); else if(state.page==="Lectures")c=lectures(); else c=odClaims();
 }else if(state.role==="Teacher"){
   if(state.page==="Overview")c=teacherOverview(); else if(state.page==="Live Lecture")c=liveLecture(); else if(state.page==="Lectures")c=lectures(); else if(state.page==="Roster")c=liveLecture(); else c=odClaims();
 }else{
   if(state.page==="Overview")c=hodOverview(); else if(state.page==="OD Approvals")c=odClaims(); else if(state.page==="Audit Log")c=audit(); else if(state.page==="Reports")c=reports(); else c=hodOverview();
 }
 shell(c);
}
function setPage(p){state.page=p;render()}
function changeRole(r){state.role=r;state.page="Overview";render()}
function markModal(){
 document.body.insertAdjacentHTML("beforeend",`<div class="modal-bg" id="modal"><div class="modal"><h2>Mark attendance</h2><p>Computer Organization · Room C-204 · Window closes in 08:42</p><div class="form"><div><label>6-character lecture code</label><input id="code" maxlength="6" placeholder="e.g. K7M2Q9" style="font-size:20px;letter-spacing:4px"></div><div class="notice" style="margin:0">Location permission will be used to verify campus presence. Your device binding and confidence grade are recorded securely.</div></div><div class="modal-actions"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="submitMark()">Verify & mark</button></div></div></div>`);
}
function submitMark(){const v=document.getElementById("code").value.toUpperCase();if(v.length!==6){toast("Enter a 6-character code.");return}closeModal();toast("Attendance marked Present · Verified");}
function claimModal(){
 document.body.insertAdjacentHTML("beforeend",`<div class="modal-bg" id="modal"><div class="modal"><h2>New OD claim</h2><p>Upload 1–6 photos. EXIF date/location will be cross-checked against the event.</p><div class="form"><label>Event</label><input placeholder="Event name"><label>Date</label><input type="date"><label>Evidence photos</label><input type="file" accept="image/*" multiple><label>Notes</label><textarea placeholder="Briefly explain the official duty..."></textarea></div><div class="modal-actions"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="closeModal();toast('OD claim submitted for HOD approval.')">Submit claim</button></div></div></div>`);
}
function closeModal(){document.getElementById("modal")?.remove()}
function toast(msg){const t=document.createElement("div");t.style.cssText="position:fixed;right:22px;bottom:22px;background:#151936;color:#fff;padding:13px 17px;border-radius:10px;z-index:100;font-size:13px;box-shadow:0 12px 35px #0003";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2800)}
render();
