// ===== Constants =====
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const CIRCLE_MAP = {
  AP:"Andhra Pradesh", MP:"Madhya Pradesh", TS:"Telangana", TN:"Tamil Nadu",
  KA:"Karnataka", MH:"Maharashtra", DL:"Delhi", HR:"Haryana", PB:"Punjab",
  RJ:"Rajasthan", WB:"West Bengal", OD:"Odisha", OR:"Odisha", GJ:"Gujarat",
  UP:"Uttar Pradesh", UE:"Uttar Pradesh (East)", UW:"Uttar Pradesh (West)",
  BR:"Bihar", KL:"Kerala", HP:"Himachal Pradesh", JK:"Jammu & Kashmir",
  CG:"Chhattisgarh", AS:"Assam", TR:"Tripura", MN:"Manipur", NL:"Nagaland",
  MZ:"Mizoram", AR:"Arunachal Pradesh", SK:"Sikkim", LD:"Lakshadweep",
  AN:"Andaman & Nicobar", CH:"Chandigarh", DN:"Dadra and Nagar Haveli", DD:"Daman and Diu",
};

// ===== State =====
let state = {
  file: null,
  rawData: [],
  processed: [],
  logs: [],
  chart: null,
  exotelFile: null,
  exotelRaw: [],
  exotelKPIs: null,
  callsChart: null,
};

// ===== Theme =====
function initTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.classList.add(saved);
  updateThemeLabel(saved);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", !isDark);
  document.documentElement.classList.toggle("light", isDark);
  localStorage.setItem("theme", isDark ? "light" : "dark");
  updateThemeLabel(isDark ? "light" : "dark");
}

function updateThemeLabel(theme) {
  const el = document.getElementById("themeLabel");
  if (el) el.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
}

// ===== Mobile =====
function toggleMobileMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("mobileOverlay");
  const open = sidebar.classList.contains("mobile-open");
  sidebar.classList.toggle("mobile-open", !open);
  overlay.style.display = open ? "none" : "block";
}

// ===== Init config =====
function initConfig() {
  const monthSel = document.getElementById("monthSelect");
  MONTHS.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    monthSel.appendChild(opt);
  });

  // Drag and drop — Intercom
  const zone = document.getElementById("uploadZone");
  zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("dragover"); });
  zone.addEventListener("dragleave", () => zone.classList.remove("dragover"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("dragover");
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });

  // Drag and drop — Exotel
  const exotelZone = document.getElementById("exotelUploadZone");
  if (exotelZone) {
    exotelZone.addEventListener("dragover", (e) => { e.preventDefault(); exotelZone.classList.add("dragover"); });
    exotelZone.addEventListener("dragleave", () => exotelZone.classList.remove("dragover"));
    exotelZone.addEventListener("drop", (e) => {
      e.preventDefault();
      exotelZone.classList.remove("dragover");
      if (e.dataTransfer.files[0]) handleExotelFile(e.dataTransfer.files[0]);
    });
  }
}

// ===== File handling =====
function handleFile(file) {
  if (!file) return;
  const ext = file.name.split(".").pop().toLowerCase();
  if (!["csv", "xlsx", "xls"].includes(ext)) {
    setUploadState("error", "Unsupported file type");
    return;
  }
  state.file = file;
  setUploadState("idle", file.name);
  document.getElementById("processBtn").disabled = false;
}

function setUploadState(status, text) {
  const zone = document.getElementById("uploadZone");
  zone.classList.remove("success", "error", "dragover");
  if (status === "success") zone.classList.add("success");
  if (status === "error") zone.classList.add("error");
  document.getElementById("uploadHint").textContent = text || "Drag & drop or click to browse";
}

function handleExotelFile(file) {
  if (!file) return;
  const ext = file.name.split(".").pop().toLowerCase();
  if (!["csv", "xlsx", "xls"].includes(ext)) {
    setExotelUploadState("error", "Unsupported file type");
    return;
  }
  state.exotelFile = file;
  setExotelUploadState("idle", file.name);
}

function setExotelUploadState(status, text) {
  const zone = document.getElementById("exotelUploadZone");
  if (!zone) return;
  zone.classList.remove("success", "error", "dragover");
  if (status === "success") zone.classList.add("success");
  if (status === "error") zone.classList.add("error");
  const hint = document.getElementById("exotelUploadHint");
  if (hint) hint.textContent = text || "Drag & drop or click to browse";
}

// ===== Logging =====
function addLog(msg, type = "info") {
  const time = new Date().toLocaleTimeString("en-US", { hour12: false });
  state.logs.push({ time, msg, type });
  renderLog();
}

function renderLog() {
  const section = document.getElementById("logSection");
  const container = document.getElementById("logContainer");
  if (state.logs.length === 0) { section.style.display = "none"; return; }
  section.style.display = "block";
  container.innerHTML = state.logs
    .map((l) => `<div class="log-entry ${l.type}"><span class="log-time">${l.time}</span><span class="log-msg">${l.msg}</span></div>`)
    .join("");
  container.scrollTop = container.scrollHeight;
}

// ===== Parse file =====
function parseFile(file) {
  return new Promise((resolve, reject) => {
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (r) => r.errors.length ? reject(new Error(r.errors[0].message)) : resolve(r.data),
        error: reject,
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const wb = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
          resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        } catch (err) { reject(err); }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    }
  });
}

// ===== Helpers =====
function safeNum(v) {
  if (v === null || v === undefined || v === "") return 0;
  const n = Number(String(v).replace(/[,%]/g, ""));
  return isNaN(n) ? 0 : n;
}

function secondsToHMS(sec) {
  if (!sec || sec <= 0) return "";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function secondsToMMSS(sec) {
  if (!sec || sec <= 0) return "0m 0s";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

function median(arr) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function extractDay(dateStr) {
  if (!dateStr) return 1;
  const s = String(dateStr).trim();
  // Try DD/MM/YYYY or DD-MM-YYYY
  const parts = s.split(/[\/\-\s]/);
  if (parts.length >= 1) {
    const d = Number(parts[0]);
    if (d >= 1 && d <= 31) return d;
  }
  // Fallback: try Date object
  const dt = new Date(s);
  if (!isNaN(dt.getTime())) return dt.getDate();
  return 1;
}

function getWeekNum(day) {
  if (day <= 7) return "Week 1";
  if (day <= 14) return "Week 2";
  if (day <= 21) return "Week 3";
  return "Week 4";
}

function findCol(row, ...names) {
  const keys = Object.keys(row);
  for (const name of names) {
    const key = keys.find((k) => k.toLowerCase().trim() === name.toLowerCase().trim());
    if (key !== undefined) return row[key];
  }
  return null;
}

// ===== Process =====
async function processFile() {
  if (!state.file) return;

  state.logs = [];
  state.processed = [];
  addLog("Parsing file...", "info");

  try {
    state.rawData = await parseFile(state.file);
    addLog(`Parsed ${state.rawData.length} rows`, "success");
  } catch (err) {
    addLog(`Parse error: ${err.message}`, "error");
    setUploadState("error", err.message);
    return;
  }

  setUploadState("success", `${state.file.name} — ${state.rawData.length} rows`);

  const month = document.getElementById("monthSelect").value || "January";
  const weekFilter = document.getElementById("weekSelect").value;
  const projectName = document.getElementById("projectName").value || "Client";

  // Group rows by day
  const dayGroups = {};
  for (const row of state.rawData) {
    const dateCol = findCol(row, "Created at", "created at", "Created At");
    const day = extractDay(dateCol);
    const week = getWeekNum(day);
    if (weekFilter !== "All" && week !== weekFilter) continue;
    if (!dayGroups[day]) dayGroups[day] = [];
    dayGroups[day].push(row);
  }

  addLog(`Grouped into ${Object.keys(dayGroups).length} days`, "info");

  // Build daywise rows
  const year = "26";
  for (const day of Object.keys(dayGroups).map(Number).sort((a, b) => a - b)) {
    const rows = dayGroups[day];
    const week = getWeekNum(day);
    const dateLabel = `${String(day).padStart(2, "0")} ${month.substring(0, 3)} ${year}`;

    // All conversations
    const allConversations = rows.length;

    // Chatbot vs Teammate
    // Chatbot: teammate replies = 0 (bot handled it)
    // Teammate: teammate replies > 0
    let chatbot = 0, teammate = 0, noReply = 0, repliedTo = 0;
    let closedCount = 0, reopenedCount = 0;
    let reassignedCount = 0;
    const closeTimes = [];

    for (const row of rows) {
      const teammateReplies = safeNum(findCol(row, "Teammate replies", "teammate replies"));
      const timeToFirstReply = safeNum(findCol(row, "Time to first reply (seconds)", "Time to first reply"));
      const timeToClose = safeNum(findCol(row, "Time to last close (seconds)", "Time to last close"));
      const reopened = safeNum(findCol(row, "Reopened", "reopened"));
      const closed = safeNum(findCol(row, "Closed", "closed"));

      // Chatbot vs Teammate
      if (teammateReplies === 0) {
        chatbot++;
      } else {
        teammate++;
      }

      // No reply: closed conversation with no first reply
      if (timeToFirstReply <= 0 && closed >= 1) {
        noReply++;
      } else {
        repliedTo++;
      }

      // Closed / Reopened
      if (closed >= 1) closedCount++;
      if (reopened >= 1) reopenedCount++;

      // Close time
      if (timeToClose > 0) closeTimes.push(timeToClose);

      // Reassigned: teammates participated > 1 as proxy
      const teammatesParticipated = findCol(row, "Teammates participated", "teammates participated");
      if (teammatesParticipated) {
        // Could be comma-separated names or a number
        const count = String(teammatesParticipated).includes(",")
          ? String(teammatesParticipated).split(",").length
          : safeNum(teammatesParticipated);
        if (count > 1) reassignedCount++;
      }
    }

    const medTimeToClose = median(closeTimes);

    // First contact rate: closed conversations that were NOT reopened
    const firstContactClosed = Math.max(0, closedCount - reopenedCount);
    const firstContactRate = closedCount > 0
      ? `${Math.round((firstContactClosed / closedCount) * 100)}%`
      : "";

    // Manual values (same across all rows)
    const manualFirstResp = document.getElementById("manualFirstResponse").value.trim();
    const manualAvgResp = document.getElementById("manualAvgResponse").value.trim();
    const manualHandling = document.getElementById("manualHandlingTime").value.trim();

    state.processed.push({
      Month: month,
      Week: week,
      Date: dateLabel,
      Client: projectName,
      "All conversations": allConversations,
      Chatbot: chatbot,
      Teammate: teammate,
      "No reply": noReply,
      "Conversations replied to": repliedTo,
      "Closed conversations": closedCount,
      "Reopened conversations": reopenedCount,
      "Average first response time": manualFirstResp || "",
      "Average response time": manualAvgResp || "",
      "Median time to close": secondsToHMS(Math.round(medTimeToClose)),
      "Median handling time": manualHandling || "",
      "Closed conversations on first contact rate": firstContactRate,
      "Conversations reassigned": reassignedCount,
    });
  }

  addLog(`Generated ${state.processed.length} daywise rows`, "success");

  // Process Exotel data if uploaded
  if (state.exotelFile) {
    addLog("Processing Exotel call data...", "info");
    try {
      state.exotelRaw = await parseFile(state.exotelFile);
      addLog(`Parsed ${state.exotelRaw.length} Exotel rows`, "success");
      state.exotelKPIs = processExotelData(state.exotelRaw);
      setExotelUploadState("success", `${state.exotelFile.name} — ${state.exotelRaw.length} rows`);
      addLog(`Exotel: ${state.exotelKPIs.total} calls | ${state.exotelKPIs.completed} completed | ${state.exotelKPIs.missed} missed`, "success");
    } catch (err) {
      addLog(`Exotel parse error: ${err.message}`, "error");
    }
  }

  // Enable buttons
  document.getElementById("exportCsvBtn").disabled = false;
  document.getElementById("exportPdfBtn").disabled = false;

  renderPreview();
  renderDashboard();
  addLog("Processing complete!", "success");
}

// ===== Preview table =====
function renderPreview() {
  if (state.processed.length === 0) return;
  const section = document.getElementById("previewSection");
  const head = document.getElementById("previewHead");
  const body = document.getElementById("previewBody");
  section.style.display = "block";

  const cols = Object.keys(state.processed[0]);
  head.innerHTML = cols.map((c) => `<th>${c}</th>`).join("");
  body.innerHTML = state.processed
    .map((row) => `<tr>${cols.map((c) => `<td>${row[c] ?? ""}</td>`).join("")}</tr>`)
    .join("");
}

function filterPreview(input) {
  const term = input.value.toLowerCase();
  document.querySelectorAll("#previewBody tr").forEach((tr) => {
    tr.style.display = tr.textContent.toLowerCase().includes(term) ? "" : "none";
  });
}

// ===== Shared KPI renderer =====
function renderKpis(kpiArr) {
  return kpiArr.map((kpi) => `
    <div class="kpi-card" style="background:${kpi.color}">
      <div class="kpi-value">${kpi.value}</div>
      <div class="kpi-label">${kpi.label}</div>
    </div>
  `).join("");
}

// ===== Exotel Processing =====
function processExotelData(rows) {
  const weekFilter = document.getElementById("weekSelect").value;

  const allRows = rows.filter(r => {
    if (weekFilter === "All") return true;
    const day = extractDay(findCol(r, "Date", "date") || "");
    return getWeekNum(day) === weekFilter;
  });

  const getStatus = r => String(findCol(r, "Status", "status") || "").toLowerCase().trim();
  const completed = allRows.filter(r => getStatus(r) === "completed");
  const missed    = allRows.filter(r => getStatus(r) === "missed-call");
  const attempts  = allRows.filter(r => getStatus(r) === "call-attempt");

  const convDurations = completed.map(r => safeNum(findCol(r, "ConversationDuration", "Conversation Duration", "conversationduration")));
  const avgAHT = convDurations.length ? convDurations.reduce((a,b)=>a+b,0)/convDurations.length : 0;

  const ringTimes = completed.map(r => Math.max(0,
    safeNum(findCol(r, "Duration", "duration")) -
    safeNum(findCol(r, "ConversationDuration", "Conversation Duration", "conversationduration"))
  ));
  const avgRingTime = ringTimes.length ? ringTimes.reduce((a,b)=>a+b,0)/ringTimes.length : 0;

  const completedPrices  = completed.map(r => safeNum(findCol(r, "Price", "price")));
  const avgCostPerCall   = completedPrices.length ? completedPrices.reduce((a,b)=>a+b,0)/completedPrices.length : 0;
  const totalCompletedCost = completedPrices.reduce((a,b)=>a+b,0);
  const totalMissedCost    = missed.map(r=>safeNum(findCol(r,"Price","price"))).reduce((a,b)=>a+b,0);
  const totalAttemptCost   = attempts.map(r=>safeNum(findCol(r,"Price","price"))).reduce((a,b)=>a+b,0);

  const weekData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  allRows.forEach(r => { weekData[getWeekNum(extractDay(findCol(r,"Date","date")||""))]++; });

  const locCounts = {};
  allRows.forEach(r => {
    const circle = String(findCol(r,"FromCircle","fromcircle","From Circle")||"").toUpperCase().trim();
    if (circle) { const name = CIRCLE_MAP[circle]||circle; locCounts[name]=(locCounts[name]||0)+1; }
  });
  const top10Locations = Object.entries(locCounts).sort((a,b)=>b[1]-a[1]).slice(0,10);

  const issueCounts={}, issueConvDur={};
  completed.forEach(r => {
    const code = String(findCol(r,"DispositionCodes","dispositioncodes","Disposition Codes")||"").trim();
    if (code) {
      issueCounts[code]=(issueCounts[code]||0)+1;
      if (!issueConvDur[code]) issueConvDur[code]=[];
      issueConvDur[code].push(safeNum(findCol(r,"ConversationDuration","Conversation Duration","conversationduration")));
    }
  });
  const top10Issues = Object.entries(issueCounts).sort((a,b)=>b[1]-a[1]).slice(0,10)
    .map(([code,count])=>({ code, count, avgAHT: secondsToMMSS(Math.round(issueConvDur[code].reduce((a,b)=>a+b,0)/issueConvDur[code].length)) }));

  const intervalCounts={};
  for (let i=0;i<24;i++) intervalCounts[i]=0;
  allRows.forEach(r => {
    const st   = String(findCol(r,"StartTime","starttime","Start Time")||"").trim();
    const ampm = String(findCol(r,"AM /PM","AM/PM","am/pm","AMPM","am /pm")||"").toUpperCase().trim();
    if (!st) return;
    let hour = parseInt(st.split(":")[0],10);
    if (isNaN(hour)) return;
    if (ampm==="PM"&&hour!==12) hour+=12;
    if (ampm==="AM"&&hour===12) hour=0;
    if (hour>=0&&hour<24) intervalCounts[hour]++;
  });
  const uniqueDays = new Set(allRows.map(r=>extractDay(findCol(r,"Date","date")||""))).size||1;
  const intervalAvg={};
  for (let i=0;i<24;i++) intervalAvg[i]=Math.round(intervalCounts[i]/uniqueDays);

  const custQueryMap={};
  completed.forEach(r => {
    const from = String(findCol(r,"From","from")||"").trim();
    const code = String(findCol(r,"DispositionCodes","dispositioncodes")||"").trim();
    if (from&&code) { const key=`${from}|||${code}`; custQueryMap[key]=(custQueryMap[key]||0)+1; }
  });
  const repeatByCode={};
  Object.entries(custQueryMap).forEach(([key,count])=>{ if(count>1){ const code=key.split("|||")[1]; repeatByCode[code]=(repeatByCode[code]||0)+1; } });
  const top10Repeat = Object.entries(repeatByCode).sort((a,b)=>b[1]-a[1]).slice(0,10);

  return { total:allRows.length, completed:completed.length, missed:missed.length, attempts:attempts.length,
    avgAHT, avgRingTime, avgCostPerCall, totalCompletedCost, totalMissedCost, totalAttemptCost,
    weekData, top10Locations, top10Issues, intervalAvg, top10Repeat };
}

// ===== Slide 3: Inbound Calls =====
function renderSlide3Calls(d) {
  const slide = document.getElementById("slideCallsFlow");
  if (!slide) return;
  slide.style.display = "block";

  const completionRate = d.total > 0 ? `${Math.round((d.completed/d.total)*100)}%` : "N/A";

  document.getElementById("kpiGridCallsRight").innerHTML = renderKpis([
    { value: secondsToMMSS(d.avgAHT),               label: "Average Handling Time",  color: "#16a34a" },
    { value: secondsToMMSS(d.avgRingTime),           label: "Avg Ring + IVR Time",    color: "#0891b2" },
    { value: `₹${d.avgCostPerCall.toFixed(2)}`,      label: "Avg Cost Per Call",      color: "#7c3aed" },
    { value: completionRate,                          label: "Call Completion Rate",   color: "#ca8a04" },
  ]);

  document.getElementById("kpiGridCallsBottom").innerHTML = renderKpis([
    { value: d.total.toLocaleString(),      label: "Inbound Calls Volume", color: "#6d28d9" },
    { value: d.completed.toLocaleString(),  label: "Completed Calls",      color: "#2563eb" },
    { value: d.missed.toLocaleString(),     label: "Missed Calls",         color: "#dc2626" },
    { value: d.attempts.toLocaleString(),   label: "Call Attempts",        color: "#ea580c" },
  ]);

  const ctx = document.getElementById("callsVolumeChart").getContext("2d");
  if (state.callsChart) state.callsChart.destroy();
  state.callsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(d.weekData),
      datasets: [{ label:"Inbound Calls", data:Object.values(d.weekData),
        backgroundColor:["#6d28d9","#2563eb","#16a34a","#ea580c"], borderRadius:6, maxBarThickness:80 }],
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins: {
        legend:{ display:false },
        title:{ display:true, text:"Week-wise Calls Volume", font:{size:16,weight:"bold"}, color:"#111" },
      },
      scales: {
        y:{ beginAtZero:true, ticks:{color:"#374151"}, grid:{color:"#e5e7eb"} },
        x:{ ticks:{color:"#374151"}, grid:{display:false} },
      },
    },
  });
}

// ===== Dashboard (for PDF) =====
function renderDashboard() {
  if (state.processed.length === 0) return;
  const section = document.getElementById("dashboardSection");
  section.style.display = "block";

  const month = document.getElementById("monthSelect").value || "January";
  const project = document.getElementById("projectName").value || "Client";
  const dateRange = document.getElementById("dateRange").value || "";

  // Slide 1: Title
  document.getElementById("slideMonth").textContent = `${month} 26`;

  // Slide 2 header

  // KPI cards
  const totalConv = state.processed.reduce((s, r) => s + r["All conversations"], 0);
  const totalClosed = state.processed.reduce((s, r) => s + r["Closed conversations"], 0);
  const totalNoReply = state.processed.reduce((s, r) => s + r["No reply"], 0);
  const totalReopened = state.processed.reduce((s, r) => s + r["Reopened conversations"], 0);

  const manualFirstResp = document.getElementById("manualFirstResponse").value.trim() || "N/A";
  const manualAvgResp = document.getElementById("manualAvgResponse").value.trim() || "N/A";
  const manualHandling = document.getElementById("manualHandlingTime").value.trim() || "N/A";

  const firstContactClosed = Math.max(0, totalClosed - totalReopened);
  const firstContactRate = totalClosed > 0
    ? `${Math.round((firstContactClosed / totalClosed) * 100)}%`
    : "N/A";

  const leftKpis = [
    { value: totalConv.toLocaleString(), label: "Chat Volume", color: "#6d28d9" },
    { value: totalClosed.toLocaleString(), label: "Closed Chats", color: "#2563eb" },
    { value: totalNoReply.toLocaleString(), label: "Closed with No Reply", color: "#dc2626" },
    { value: totalReopened.toLocaleString(), label: "Reopened Chats", color: "#ea580c" },
  ];

  const rightKpis = [
    { value: manualFirstResp, label: "Avg First Response Time", color: "#16a34a" },
    { value: manualAvgResp, label: "Avg Response Time", color: "#0891b2" },
    { value: manualHandling, label: "Median Handling Time", color: "#7c3aed" },
    { value: firstContactRate, label: "First Contact Rate", color: "#ca8a04" },
  ];

  document.getElementById("kpiGridLeft").innerHTML = renderKpis(leftKpis);
  document.getElementById("kpiGridRight").innerHTML = renderKpis(rightKpis);

  // Week-wise volume bar chart
  const weekData = { "Week 1": 0, "Week 2": 0, "Week 3": 0, "Week 4": 0 };
  state.processed.forEach((r) => { weekData[r.Week] += r["All conversations"]; });

  const ctx = document.getElementById("volumeChart").getContext("2d");
  if (state.chart) state.chart.destroy();
  state.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(weekData),
      datasets: [{
        label: "Conversations Volume",
        data: Object.values(weekData),
        backgroundColor: ["#6d28d9", "#2563eb", "#16a34a", "#ea580c"],
        borderRadius: 6,
        maxBarThickness: 80,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Week-wise Volume", font: { size: 16, weight: "bold" }, color: "#111" },
      },
      scales: {
        y: { beginAtZero: true, ticks: { color: "#374151" }, grid: { color: "#e5e7eb" } },
        x: { ticks: { color: "#374151" }, grid: { display: false } },
      },
    },
  });

  // Slide 3: Calls (if Exotel data available)
  if (state.exotelKPIs) renderSlide3Calls(state.exotelKPIs);
}

// ===== Export CSV =====
function exportCSV() {
  if (state.processed.length === 0) return;
  const project = document.getElementById("projectName").value || "Client";
  const month = document.getElementById("monthSelect").value || "January";
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(state.processed);
  ws["!cols"] = Object.keys(state.processed[0]).map((k) => ({ wch: Math.max(k.length + 2, 14) }));
  XLSX.utils.book_append_sheet(wb, ws, "Chatbot_Performance");
  XLSX.writeFile(wb, `${project.replace(/\s+/g, "_")}_${month}_Report.csv`, { bookType: "csv" });
  addLog(`CSV exported`, "success");
}

// ===== Export PDF =====
async function exportPDF() {
  if (state.processed.length === 0) return;
  addLog("Generating PDF...", "info");

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("l", "mm", "a4"); // landscape
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const project = document.getElementById("projectName").value || "Client";
  const month = document.getElementById("monthSelect").value || "January";
  const monthShort = month.substring(0, 3);
  const year = "26";

  // --- Slide 1: Title Slide ---
  const titleSlide = document.getElementById("slideTitle");
  const titleCanvas = await html2canvas(titleSlide, { scale: 2, useCORS: true });
  const titleImg = titleCanvas.toDataURL("image/png");
  const titleImgW = pageW;
  const titleImgH = (titleCanvas.height * titleImgW) / titleCanvas.width;
  pdf.addImage(titleImg, "PNG", 0, 0, titleImgW, titleImgH);

  // --- Slide 2: Weekly Chat Flow ---
  pdf.addPage();
  const flowSlide = document.getElementById("slideFlow");
  const flowCanvas = await html2canvas(flowSlide, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
  const flowImg = flowCanvas.toDataURL("image/png");
  const flowImgW = pageW - 20;
  const flowImgH = (flowCanvas.height * flowImgW) / flowCanvas.width;

  if (flowImgH > pageH) {
    // Multi-page slice
    let remaining = flowImgH;
    let srcY = 0;
    let yPos = 0;
    while (remaining > 0) {
      const sliceH = Math.min(remaining, pageH);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = flowCanvas.width;
      sliceCanvas.height = (sliceH / flowImgH) * flowCanvas.height;
      const sliceCtx = sliceCanvas.getContext("2d");
      sliceCtx.drawImage(flowCanvas, 0, srcY, flowCanvas.width, sliceCanvas.height, 0, 0, flowCanvas.width, sliceCanvas.height);
      pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", 10, yPos, flowImgW, sliceH);
      remaining -= sliceH;
      srcY += sliceCanvas.height;
      if (remaining > 0) { pdf.addPage(); yPos = 0; }
    }
  } else {
    pdf.addImage(flowImg, "PNG", 10, 0, flowImgW, flowImgH);
  }

  // --- Slide 3: Inbound Calls Performance ---
  if (state.exotelKPIs) {
    pdf.addPage();
    const callsSlide = document.getElementById("slideCallsFlow");
    const callsCanvas = await html2canvas(callsSlide, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const callsImg = callsCanvas.toDataURL("image/png");
    const callsImgW = pageW - 20;
    const callsImgH = (callsCanvas.height * callsImgW) / callsCanvas.width;
    pdf.addImage(callsImg, "PNG", 10, 0, callsImgW, callsImgH);
  }

  // Filename: Month YY Project Name Monthly Performance Review
  const filename = `${monthShort} ${year} ${project} Monthly Performance Review.pdf`;
  pdf.save(filename);
  addLog(`PDF exported: ${filename}`, "success");
}

// ===== Reset =====
function resetAll() {
  state.file = null;
  state.rawData = [];
  state.processed = [];
  state.logs = [];
  if (state.chart) { state.chart.destroy(); state.chart = null; }

  state.exotelFile = null;
  state.exotelRaw = [];
  state.exotelKPIs = null;
  if (state.callsChart) { state.callsChart.destroy(); state.callsChart = null; }

  document.getElementById("projectName").value = "Client PK";
  document.getElementById("monthSelect").value = "";
  document.getElementById("weekSelect").value = "All";
  document.getElementById("dateRange").value = "";
  document.getElementById("fileInput").value = "";
  document.getElementById("manualFirstResponse").value = "";
  document.getElementById("manualAvgResponse").value = "";
  document.getElementById("manualHandlingTime").value = "";

  const exotelInput = document.getElementById("exotelFileInput");
  if (exotelInput) exotelInput.value = "";
  setExotelUploadState("idle", "");

  setUploadState("idle", "");
  document.getElementById("processBtn").disabled = true;
  document.getElementById("exportCsvBtn").disabled = true;
  document.getElementById("exportPdfBtn").disabled = true;

  document.getElementById("previewSection").style.display = "none";
  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("logSection").style.display = "none";
  const callsSlide = document.getElementById("slideCallsFlow");
  if (callsSlide) callsSlide.style.display = "none";
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initConfig();
});
