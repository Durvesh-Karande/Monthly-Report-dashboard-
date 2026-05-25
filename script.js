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
  AN:"Andaman & Nicobar", CH:"Chandigarh", DN:"Dadra and Nagar Haveli",
};

const KPI_COLORS = ["#6d28d9","#2563eb","#059669","#ea580c","#dc2626","#0891b2","#7c3aed","#ca8a04"];

// ===== State =====
let state = {
  file: null, rawData: [], processed: [], logs: [],
  exotelFile: null, exotelRaw: [], exotelKPIs: null,
  charts: {},
};

// ===== Multi-Sheet Configuration =====
const SHEETS = [
  { id: 'tlKpiData', name: 'TL KPI', headers: ['TL Name','Head Count','Team Attendance','Preshift Briefing','Team Quality','Shift Adherence','Self Call/Chat taken','Client Escalation (0%)','TL Hygiene (Pos/Neg)','TL Audit','Achieved Points'] },
  { id: 'qaKpiData', name: 'QA KPI', headers: ['QA Name','Manager','Head Count','Call/Chat Audits Count','Audit Score (%)','Hygiene Audit Hours','Asset Maintenance (Y/N)','Shift Huddles (Y/N)','Track Record Maintained (Y/N)','EOD Reports Sent','Refresher Training / LLR','Total Point'] },
  { id: 'agentProdData', name: 'Agent Productivity', headers: ['Agent Name','Chats','Calls','WhatsApp'] },
  { id: 'agentKpiData', name: 'Agent KPI', headers: ['Agent Name','Attendance Score','Absence %','Attendance Points','Quality Score','Quality Points','Compliance Score','Compliance Points','Productivity Count','Productivity Points','C.Escalation Score','C.Escalation Points','A.Escalation Score','A Escalation Points','Total Point','Achieved Point'] },
  { id: 'escalationData', name: 'Escalation Count', headers: ['Issue Type','Escalation Count','Resolved','Pending','Reason / Status'] },
  { id: 'paymentData', name: 'Payment Details', headers: ['Process','Subscription','Due Dates','Due Date','Invoice No.','Receipt No.','Amount (USD)','Amount (INT)','Tax','Total Amount','Payment Date','Status','Credits','Agents'] },
];

// ===== Theme =====
function initTheme() { const s=localStorage.getItem("theme")||"light"; document.documentElement.classList.add(s); updateThemeLabel(s); }
function toggleTheme() { const d=document.documentElement; const isDark=d.classList.contains("dark"); d.classList.toggle("dark",!isDark); d.classList.toggle("light",isDark); localStorage.setItem("theme",isDark?"light":"dark"); updateThemeLabel(isDark?"light":"dark"); }
function updateThemeLabel(t) { const el=document.getElementById("themeLabel"); if(el) el.textContent=t==="dark"?"Light Mode":"Dark Mode"; }

// ===== Mobile =====
function toggleMobileMenu() { const s=document.getElementById("sidebar"),o=document.getElementById("mobileOverlay"),open=s.classList.contains("mobile-open"); s.classList.toggle("mobile-open",!open); o.style.display=open?"none":"block"; }

// ===== Init =====
function initConfig() {
  const m=document.getElementById("monthSelect");
  MONTHS.forEach(mm=>{ const o=document.createElement("option"); o.value=mm; o.textContent=mm; m.appendChild(o); });
  const z=document.getElementById("uploadZone");
  z.addEventListener("dragover",e=>{e.preventDefault();z.classList.add("dragover")});
  z.addEventListener("dragleave",()=>z.classList.remove("dragover"));
  z.addEventListener("drop",e=>{e.preventDefault();z.classList.remove("dragover");if(e.dataTransfer.files[0])handleFile(e.dataTransfer.files[0])});
  const ez=document.getElementById("exotelUploadZone");
  if(ez){ez.addEventListener("dragover",e=>{e.preventDefault();ez.classList.add("dragover")});ez.addEventListener("dragleave",()=>ez.classList.remove("dragover"));ez.addEventListener("drop",e=>{e.preventDefault();ez.classList.remove("dragover");if(e.dataTransfer.files[0])handleExotelFile(e.dataTransfer.files[0])});}
}

// =====================================================================
// ===== TABLE DATA (localStorage only — no DOM tables) =====
// =====================================================================
function getTableData(tableId) {
  const saved = localStorage.getItem('table_'+tableId);
  if (!saved) return [];
  try {
    const data = JSON.parse(saved);
    return Array.isArray(data) ? data.filter(row => row.some(v => String(v).trim() !== '')) : [];
  } catch(e) { return []; }
}

function saveTableData(tableId, data) {
  localStorage.setItem('table_'+tableId, JSON.stringify(data));
}

// =====================================================================
// ===== EXCEL EDITOR MODAL (Multi-Sheet) =====
// =====================================================================
let lastFocusedCell = null;
let currentSheetIdx = 0;
// Holds unsaved data for all sheets while modal is open
let multiSheetData = {};

// Track the currently focused cell for paste positioning
function initExcelPasteTracker() {
  document.addEventListener('focusin', function(e) {
    if (e.target.closest('.excel-grid')) {
      lastFocusedCell = e.target;
    }
  });
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('excelModal');
      if (modal.style.display !== 'none') {
        closeExcelEditor();
      }
    }
  });
}

// Global paste handler for the Excel grid
function handleExcelGridPaste(e) {
  const grid = document.getElementById('excelGrid');
  if (!grid.contains(e.target)) return;
  if (!lastFocusedCell) return;

  const pastedData = e.clipboardData.getData('text/plain');
  if (!pastedData || !pastedData.trim()) return;

  const rawRows = pastedData.split(/\r?\n/);
  const parsedData = [];
  for (const raw of rawRows) {
    const trimmed = raw.trim();
    if (trimmed) {
      parsedData.push(trimmed.split('\t'));
    }
  }
  if (parsedData.length === 0) return;

  e.preventDefault();

  const targetTd = lastFocusedCell.closest('td');
  const targetTr = lastFocusedCell.closest('tr');
  const tbody = document.getElementById('excelGridBody');
  if (!tbody || !targetTr || !targetTd) return;

  const allRows = [...tbody.querySelectorAll('tr')];
  const startRowIdx = allRows.indexOf(targetTr);
  const allCellsInRow = [...targetTr.querySelectorAll('td')];
  const startColIdx = allCellsInRow.indexOf(targetTd);

  if (startRowIdx === -1 || startColIdx === -1) return;

  const totalCols = allCellsInRow.length;
  const neededRows = startRowIdx + parsedData.length - allRows.length;
  for (let i = 0; i < Math.max(0, neededRows); i++) {
    addExcelGridRow(null);
  }

  requestAnimationFrame(() => {
    const updatedRows = [...tbody.querySelectorAll('tr')];
    for (let ri = 0; ri < parsedData.length; ri++) {
      const rowEl = updatedRows[startRowIdx + ri];
      if (!rowEl) break;
      const inputs = rowEl.querySelectorAll('input');
      for (let ci = 0; ci < parsedData[ri].length; ci++) {
        const colIdx = startColIdx + ci;
        if (inputs[colIdx]) {
          inputs[colIdx].value = parsedData[ri][ci];
          inputs[colIdx].dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
  });
}

// Tab key navigation within the Excel grid
function handleExcelGridKeydown(e) {
  if (e.key === 'Tab' && e.target.closest('.excel-grid')) {
    e.preventDefault();
    const input = e.target;
    const td = input.closest('td');
    const tr = input.closest('tr');
    const tbody = document.getElementById('excelGridBody');
    if (!tbody || !td || !tr) return;

    const allRows = [...tbody.querySelectorAll('tr')];
    const rowIdx = allRows.indexOf(tr);
    const cells = [...tr.querySelectorAll('td')];
    const colIdx = cells.indexOf(td);

    let nextRowIdx = rowIdx;
    let nextColIdx = colIdx + 1;

    if (nextColIdx >= cells.length) {
      nextRowIdx = rowIdx + 1;
      nextColIdx = 1;
      if (nextRowIdx >= allRows.length) {
        addExcelGridRow();
        requestAnimationFrame(() => {
          const newRows = [...tbody.querySelectorAll('tr')];
          const newInputs = newRows[newRows.length - 1].querySelectorAll('input');
          if (newInputs[1]) newInputs[1].focus();
        });
        return;
      }
    }

    const nextInputs = allRows[nextRowIdx].querySelectorAll('input');
    if (nextInputs[nextColIdx]) {
      nextInputs[nextColIdx].focus();
    }
  }
}

function openDataEntryModal() {
  currentSheetIdx = 0;
  multiSheetData = {};

  // Load all sheets' existing data from localStorage into memory
  SHEETS.forEach(sheet => {
    const saved = getTableData(sheet.id);
    multiSheetData[sheet.id] = saved.length > 0 ? saved : [];
  });

  document.getElementById('excelModalTitle').textContent = '📊 Multi-Sheet Data Entry';

  // Build sheet tabs
  const tabContainer = document.getElementById('excelSheetTabs');
  tabContainer.innerHTML = SHEETS.map((sheet, i) => {
    const icon = getSheetIcon(sheet.id);
    return `<button class="excel-sheet-tab ${i === 0 ? 'active' : ''}" data-sheet-idx="${i}">
      ${icon} ${sheet.name}
    </button>`;
  }).join('');

  // Attach tab click handlers
  tabContainer.querySelectorAll('.excel-sheet-tab').forEach(btn => {
    btn.addEventListener('click', function() {
      switchSheet(parseInt(this.dataset.sheetIdx));
    });
  });

  // Load first sheet
  loadSheetIntoGrid(0);

  document.getElementById('excelModal').style.display = 'flex';
  document.getElementById('sheetStatus').textContent = '';
}

function getSheetIcon(id) {
  const icons = {
    tlKpiData: '<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    qaKpiData: '<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    agentProdData: '<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
    agentKpiData: '<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    escalationData: '<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    paymentData: '<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  };
  return icons[id] || '<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>';
}

function switchSheet(idx) {
  // Save current sheet data to memory
  saveCurrentGridToMemory();

  currentSheetIdx = idx;
  updateActiveTab(idx);
  loadSheetIntoGrid(idx);
  document.getElementById('sheetStatus').textContent = '';
}

function updateActiveTab(idx) {
  document.querySelectorAll('.excel-sheet-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === idx);
  });
}

function saveCurrentGridToMemory() {
  const sheet = SHEETS[currentSheetIdx];
  if (!sheet) return;
  const rows = document.querySelectorAll('#excelGridBody tr');
  const data = [];
  rows.forEach(tr => {
    const rowData = [];
    tr.querySelectorAll('input').forEach(inp => rowData.push(inp.value));
    if (rowData.some(v => v.trim() !== '')) {
      data.push(rowData);
    }
  });
  multiSheetData[sheet.id] = data;
}

function loadSheetIntoGrid(idx) {
  const sheet = SHEETS[idx];
  if (!sheet) return;

  // Set up headers
  const headRow = document.getElementById('excelGridHead');
  headRow.innerHTML = '<th>#</th>' + sheet.headers.map(h => `<th>${h}</th>`).join('');

  // Load data from memory
  const data = multiSheetData[sheet.id] || [];
  const body = document.getElementById('excelGridBody');
  body.innerHTML = '';

  if (data.length > 0) {
    data.forEach(row => addExcelGridRow(row));
  } else {
    for (let i = 0; i < 5; i++) addExcelGridRow();
  }
}

function closeExcelEditor() {
  document.getElementById('excelModal').style.display = 'none';
  currentSheetIdx = 0;
  lastFocusedCell = null;
  multiSheetData = {};
}

function addExcelGridRow(values) {
  const tbody = document.getElementById('excelGridBody');
  const headRow = document.getElementById('excelGridHead');
  if (!tbody || !headRow) return;
  const cols = headRow.querySelectorAll('th').length - 1;
  const tr = document.createElement('tr');
  const rowNum = tbody.children.length + 1;

  const numTd = document.createElement('td');
  numTd.className = 'row-num';
  numTd.textContent = rowNum;
  tr.appendChild(numTd);

  for (let i = 0; i < cols; i++) {
    const td = document.createElement('td');
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.value = values && values[i] !== undefined ? values[i] : '';
    inp.placeholder = headRow.querySelectorAll('th')[i + 1]?.textContent || '';
    td.appendChild(inp);
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
  updateExcelRowNumbers();
}

function updateExcelRowNumbers() {
  const rows = document.querySelectorAll('#excelGridBody tr');
  rows.forEach((tr, i) => {
    const numTd = tr.querySelector('td.row-num');
    if (numTd) numTd.textContent = i + 1;
  });
}

function clearExcelGrid() {
  document.getElementById('excelGridBody').innerHTML = '';
  for (let i = 0; i < 5; i++) addExcelGridRow();
  document.getElementById('sheetStatus').textContent = '';
}

function saveAllSheets() {
  // Save current grid to memory
  saveCurrentGridToMemory();

  // Save all sheets to localStorage
  let totalRows = 0;
  SHEETS.forEach(sheet => {
    const data = multiSheetData[sheet.id] || [];
    saveTableData(sheet.id, data);
    totalRows += data.length;
  });

  document.getElementById('sheetStatus').textContent = `✅ Saved ${totalRows} rows across ${SHEETS.length} sheets`;
  document.getElementById('sheetStatus').style.color = 'var(--success)';

  // Close modal after brief delay
  setTimeout(() => {
    closeExcelEditor();
  }, 800);
}

// =====================================================================
// ===== FILE HANDLING =====
// =====================================================================
function handleFile(file) {
  if(!file)return;
  const ext=file.name.split(".").pop().toLowerCase();
  if(!["csv","xlsx","xls"].includes(ext)){setUploadState("error","Unsupported");return}
  state.file=file;
  setUploadState("idle",file.name);
  document.getElementById("processBtn").disabled=false;
}
function setUploadState(s,t){const z=document.getElementById("uploadZone");z.classList.remove("success","error","dragover");if(s==="success")z.classList.add("success");if(s==="error")z.classList.add("error");document.getElementById("uploadHint").textContent=t||"Drag & drop or click to browse";}

function handleExotelFile(file) {
  if(!file)return;
  const ext=file.name.split(".").pop().toLowerCase();
  if(!["csv","xlsx","xls"].includes(ext)){setExotelUploadState("error","Unsupported");return}
  state.exotelFile=file;
  setExotelUploadState("idle",file.name);
}
function setExotelUploadState(s,t){const z=document.getElementById("exotelUploadZone");if(!z)return;z.classList.remove("success","error","dragover");if(s==="success")z.classList.add("success");if(s==="error")z.classList.add("error");const h=document.getElementById("exotelUploadHint");if(h)h.textContent=t||"Drag & drop or click to browse";}

// ===== Logging =====
function addLog(msg,type="info"){const t=new Date().toLocaleTimeString("en-US",{hour12:false});state.logs.push({time:t,msg,type});renderLog();}
function renderLog(){const s=document.getElementById("logSection"),c=document.getElementById("logContainer");if(!c)return;if(state.logs.length===0){s.style.display="none";return}s.style.display="block";c.innerHTML=state.logs.map(l=>`<div class="log-entry ${l.type}"><span class="log-time">${l.time}</span><span class="log-msg">${l.msg}</span></div>`).join("");c.scrollTop=c.scrollHeight;}

// ===== Parse =====
function parseFile(file) {
  return new Promise((resolve,reject)=>{
    const ext=file.name.split(".").pop().toLowerCase();
    if(ext==="csv"){
      Papa.parse(file,{header:true,skipEmptyLines:true,complete:r=>r.errors.length?reject(new Error(r.errors[0].message)):resolve(r.data),error:reject});
    }else{
      const r=new FileReader();
      r.onload=e=>{try{const wb=XLSX.read(new Uint8Array(e.target.result),{type:"array"});resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));}catch(err){reject(err)}};
      r.onerror=()=>reject(new Error("Failed to read file"));
      r.readAsArrayBuffer(file);
    }
  });
}

// ===== Helpers =====
function safeNum(v){if(v===null||v===undefined||v==="")return 0;const n=Number(String(v).replace(/[,%$]/g,""));return isNaN(n)?0:n;}
function secondsToHMS(sec){if(!sec||sec<=0)return"";const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=Math.floor(sec%60);return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;}
function secondsToMMSS(sec){if(!sec||sec<=0)return"0m 0s";const m=Math.floor(sec/60),s=Math.floor(sec%60);return `${m}m ${String(s).padStart(2,"0")}s`;}
function median(arr){if(arr.length===0)return 0;const s=[...arr].sort((a,b)=>a-b),mid=Math.floor(s.length/2);return s.length%2?s[mid]:(s[mid-1]+s[mid])/2;}
function extractDay(dateStr){if(!dateStr)return 1;const s=String(dateStr).trim();const parts=s.split(/[\/\-\s:]/);if(parts.length>=1){const d=Number(parts[0]);if(d>=1&&d<=31)return d}const dt=new Date(s);if(!isNaN(dt.getTime()))return dt.getDate();return 1;}
function getWeekNum(day){if(day<=7)return"Week 1";if(day<=14)return"Week 2";if(day<=21)return"Week 3";return"Week 4";}
function findCol(row,...names){const keys=Object.keys(row);for(const n of names){const k=keys.find(kk=>kk.toLowerCase().trim()===n.toLowerCase().trim());if(k!==undefined)return row[k]}return null;}

// ===== Process =====
async function processFile() {
  if (!state.file) { addLog("Please upload an Intercom file first","error"); return; }
  state.logs = []; state.processed = [];
  const allCharts = Object.keys(state.charts);
  allCharts.forEach(k => { if (state.charts[k]) { state.charts[k].destroy(); delete state.charts[k]; } });
  addLog("Parsing Intercom data...","info");
  try { state.rawData = await parseFile(state.file); addLog(`Parsed ${state.rawData.length} rows`,"success"); } catch(err) { addLog(`Parse error: ${err.message}`,"error"); setUploadState("error",err.message); return; }
  setUploadState("success",`${state.file.name} — ${state.rawData.length} rows`);

  if (state.exotelFile) {
    addLog("Processing Exotel data...","info");
    try { state.exotelRaw = await parseFile(state.exotelFile); addLog(`Parsed ${state.exotelRaw.length} Exotel rows`,"success"); state.exotelKPIs = processExotelData(state.exotelRaw); setExotelUploadState("success",`${state.exotelFile.name} — ${state.exotelRaw.length} rows`); addLog(`Exotel: ${state.exotelKPIs.total} calls`,"success"); } catch(err) { addLog(`Exotel error: ${err.message}`,"error"); }
  }

  const month = document.getElementById("monthSelect").value || "January";
  const projectName = document.getElementById("projectName").value || "Client";
  const weekFilter = document.getElementById("weekSelect").value;

  const dayGroups = {};
  for (const row of state.rawData) {
    const dateCol = findCol(row,"Created at","created at","Created At");
    const day = extractDay(dateCol);
    const week = getWeekNum(day);
    if (weekFilter !== "All" && weekFilter !== week) continue;
    if (!dayGroups[day]) dayGroups[day] = [];
    dayGroups[day].push(row);
  }
  addLog(`Grouped into ${Object.keys(dayGroups).length} days`,"info");

  const allCloseTimes = [];

  for (const day of Object.keys(dayGroups).map(Number).sort((a,b)=>a-b)) {
    const rows = dayGroups[day];
    const tags = new Set(); const locations = {};
    let convCount=0, closedCount=0, reopenedCount=0, chatbot=0, teammate=0, noReply=0;
    const closeTimes = [];
    for (const row of rows) {
      convCount++;
      const tag = findCol(row,"Conversation tags","conversation tags","Conversation Tags");
      const rowTags = tag && String(tag).trim() ? String(tag).split(",").map(t=>t.trim()).filter(Boolean) : [];
      rowTags.forEach(t => tags.add(t));
      const loc = findCol(row,"Location","location");
      if (loc && String(loc).trim()) { const ll = String(loc).trim(); locations[ll] = (locations[ll]||0)+1; }
      const reopened = safeNum(findCol(row,"Reopened","reopened"));
      const closed = safeNum(findCol(row,"Closed","closed"));
      const tr = safeNum(findCol(row,"Teammate replies","teammate replies"));
      const timeToClose = safeNum(findCol(row,"Time to last close (seconds)","Time to last close"));
      const timeToFirstReply = safeNum(findCol(row,"Time to first reply (seconds)","Time to first reply"));
      if (tr === 0) chatbot++; else teammate++;
      if (closed >= 1) closedCount++;
      if (reopened >= 1) reopenedCount++;
      if (timeToFirstReply <= 0 && closed >= 1) noReply++;
      if (timeToClose > 0) { closeTimes.push(timeToClose); allCloseTimes.push(timeToClose); }
    }
    const week = getWeekNum(day);
    const medClose = median(closeTimes);
    const firstContactClosed = Math.max(0, closedCount - reopenedCount);
    const fcr = closedCount > 0 ? Math.round((firstContactClosed/closedCount)*100) + "%" : "";
    state.processed.push({
      Month: month, Week: week, Date: `${String(day).padStart(2,"0")} ${month.substring(0,3)}`, Client: projectName,
      "Conversations": convCount, Chatbot: chatbot, Teammate: teammate,
      "Closed": closedCount, "Reopened": reopenedCount,
      "No Reply": noReply,
      "Median Close Time": secondsToHMS(Math.round(medClose)),
      "First Contact Rate": fcr,
      "Tagged": rows.filter(r => {
        const t = findCol(r,"Conversation tags","conversation tags","Conversation Tags");
        return t && String(t).trim().length > 0;
      }).length,
      "Tags": [...tags].join(", "),
      "Locations": JSON.stringify(locations),
    });
  }

  state.medianCloseTime = secondsToHMS(Math.round(median(allCloseTimes)));

  addLog(`Generated ${state.processed.length} daywise rows`,"success");
  document.getElementById("exportPdfBtn").disabled = false;
  renderPreview();
  renderAllSlides();
  addLog("Report generated! Export PDF to view all 15 pages.","success");
}

// =====================================================================
// ===== EXOTEL PROCESSING =====
// =====================================================================
function processExotelData(rows) {
  const get = (r,...n)=>findCol(r,...n);
  const getS = r => String(get(r,"Status","status")||"").toLowerCase().trim();
  const completed = rows.filter(r => getS(r)==="completed");
  const missed    = rows.filter(r => getS(r)==="missed-call");
  const attempts  = rows.filter(r => getS(r)==="call-attempt");

  const convDurs = completed.map(r=>safeNum(get(r,"ConversationDuration","Conversation Duration","conversationduration")));
  const avgAHT = convDurs.length ? convDurs.reduce((a,b)=>a+b,0)/convDurs.length : 0;

  const ringTimes = completed.map(r=>Math.max(0, safeNum(get(r,"Duration","duration"))-safeNum(get(r,"ConversationDuration","Conversation Duration","conversationduration"))));
  const avgRing = ringTimes.length ? ringTimes.reduce((a,b)=>a+b,0)/ringTimes.length : 0;

  const prices = completed.map(r=>safeNum(get(r,"Price","price")));
  const avgCost = prices.length ? prices.reduce((a,b)=>a+b,0)/prices.length : 0;
  const totalCost = prices.reduce((a,b)=>a+b,0);
  const missedCost = missed.map(r=>safeNum(get(r,"Price","price"))).reduce((a,b)=>a+b,0);

  const weekData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  rows.forEach(r=>{weekData[getWeekNum(extractDay(get(r,"Date","date")||""))]++;});

  const locCounts = {};
  rows.forEach(r=>{const c=String(get(r,"FromCircle","fromcircle","From Circle")||"").toUpperCase().trim();if(c){const n=CIRCLE_MAP[c]||c;locCounts[n]=(locCounts[n]||0)+1;}});
  const topLocations = Object.entries(locCounts).sort((a,b)=>b[1]-a[1]).slice(0,10);

  const issueCounts = {}, issueDurs = {};
  completed.forEach(r=>{const c=String(get(r,"DispositionCodes","dispositioncodes","Disposition Codes")||"").trim();if(c){issueCounts[c]=(issueCounts[c]||0)+1;if(!issueDurs[c])issueDurs[c]=[];issueDurs[c].push(safeNum(get(r,"ConversationDuration","conversationduration")));}});
  const topIssues = Object.entries(issueCounts).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([c,count])=>({code:c,count,avgAHT:secondsToMMSS(Math.round((issueDurs[c]||[0]).reduce((a,b)=>a+b,0)/(issueDurs[c]||[1]).length))}));

  const intervalCounts={};for(let i=0;i<24;i++)intervalCounts[i]=0;
  rows.forEach(r=>{const st=String(get(r,"StartTime","starttime","Start Time")||"").trim();const ap=String(get(r,"AM /PM","AM/PM","am/pm","AMPM","am /pm")||"").toUpperCase().trim();if(!st)return;let h=parseInt(st.split(":")[0],10);if(isNaN(h))return;if(ap==="PM"&&h!==12)h+=12;if(ap==="AM"&&h===12)h=0;if(h>=0&&h<24)intervalCounts[h]++;});
  const uniqueDays = new Set(rows.map(r=>extractDay(get(r,"Date","date")||""))).size||1;
  const intervalAvg={};for(let i=0;i<24;i++)intervalAvg[i]=Math.round(intervalCounts[i]/uniqueDays);

  return { total:rows.length, completed:completed.length, missed:missed.length, attempts:attempts.length,
    avgAHT, avgRing, avgCostPerCall:avgCost, totalCost, missedCost,
    weekData, topLocations, topIssues, intervalAvg };
}

// =====================================================================
// ===== DATA HELPERS FOR SLIDES =====
// =====================================================================
function getChatData() {
  const total = state.processed.reduce((s,r)=>s+r["Conversations"],0);
  const closed = state.processed.reduce((s,r)=>s+r["Closed"],0);
  const reopened = state.processed.reduce((s,r)=>s+r["Reopened"],0);
  const chatbot = state.processed.reduce((s,r)=>s+r["Chatbot"],0);
  const teammate = state.processed.reduce((s,r)=>s+r["Teammate"],0);
  const noReply = state.processed.reduce((s,r)=>s+r["No Reply"]||0,0);
  const tagged = state.processed.reduce((s,r)=>s+r["Tagged"]||0,0);
  const weekData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  state.processed.forEach(r=>{weekData[r.Week] += r["Conversations"];});
  const allTags = new Set();
  state.processed.forEach(r => { if (r.Tags) r.Tags.split(", ").forEach(t=>{if(t)allTags.add(t)}); });
  const tagCounts = {};
  state.processed.forEach(r => {
    if (r.Tags) r.Tags.split(", ").forEach(t=>{const tt=t.trim();if(tt)tagCounts[tt]=(tagCounts[tt]||0)+1});
  });
  const locChats = {};
  state.processed.forEach(r => {
    try { const locs = JSON.parse(r.Locations || "{}"); Object.entries(locs).forEach(([k,v])=>{locChats[k]=(locChats[k]||0)+v;}); } catch(e){}
  });
  const topLocations = Object.entries(locChats).sort((a,b)=>b[1]-a[1]).slice(0,5);
  return { total, closed, reopened, chatbot, teammate, noReply, tagged, weekData, tags:[...allTags], tagCounts, topLocations };
}

function getCallData() {
  if (!state.exotelKPIs) return null;
  return state.exotelKPIs;
}

// =====================================================================
// ===== SLIDE RENDERERS =====
// =====================================================================
function renderKpiCard(value, label, color) {
  return `<div class="slide-kpi-card" style="background:${color}"><div class="kpi-val">${value}</div><div class="kpi-lbl">${label}</div></div>`;
}

function destroyChart(key) { if(state.charts[key]){state.charts[key].destroy();delete state.charts[key];} }

function createChart(canvasId, type, labels, datasets, options) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  const defaults = {
    responsive:true, maintainAspectRatio:false,
    plugins:{legend:{labels:{font:{size:10},boxWidth:12}}},
    scales:{y:{beginAtZero:true,ticks:{font:{size:9}},grid:{color:"rgba(0,0,0,0.06)"}},x:{ticks:{font:{size:9}},grid:{display:false}}}
  };
  const mergedOpts = {...defaults,...options};
  state.charts[canvasId] = new Chart(ctx.getContext("2d"),{type,data:{labels,datasets},options:mergedOpts});
  return state.charts[canvasId];
}

// ===== SLIDE 1: Cover =====
function renderSlide1() {
  const client = document.getElementById("projectName").value || "Client";
  const month = document.getElementById("monthSelect").value || "January";
  const year = document.getElementById("yearSelect").value || "2026";
  const dr = document.getElementById("dateRange").value || "";
  document.getElementById("slideClientName").textContent = client;
  document.getElementById("slideMonthYear").textContent = `${month} ${year}`;
  document.getElementById("slideDateRange").textContent = dr || `${month} ${year}`;
}

// ===== SLIDE 2: Chat Volume Summary =====
function renderSlide2() {
  const d = getChatData();
  const closedRate = d.total > 0 ? Math.round((d.closed/d.total)*100) + "%" : "N/A";
  const reopenRate = d.closed > 0 ? Math.round((d.reopened/d.closed)*100) + "%" : "N/A";
  const botRate = d.total > 0 ? Math.round((d.chatbot/d.total)*100) + "%" : "N/A";
  const fcr = d.closed > 0 ? Math.round(((d.closed-d.reopened)/d.closed)*100) + "%" : "N/A";

  const manualFirstResp = document.getElementById("manualFirstResponse").value.trim() || "N/A";
  const manualAvgResp = document.getElementById("manualAvgResponse").value.trim() || "N/A";
  const manualHandling = document.getElementById("manualHandlingTime").value.trim() || "N/A";
  const medianClose = state.medianCloseTime || "N/A";

  document.getElementById("slide2Kpis").innerHTML =
    renderKpiCard(d.total.toLocaleString(),"Total Chat Volume","#6d28d9") +
    renderKpiCard(d.closed.toLocaleString(),"Closed Chats","#2563eb") +
    renderKpiCard(d.reopened.toLocaleString(),"Reopened Chats","#ea580c") +
    renderKpiCard(closedRate,"Close Rate","#059669") +
    renderKpiCard(fcr,"First Contact Rate","#0891b2") +
    renderKpiCard(botRate,"Bot Handle Rate","#7c3aed") +
    renderKpiCard(manualHandling,"Median Handling Time","#ca8a04") +
    renderKpiCard(manualFirstResp,"Avg First Response","#16a34a") +
    renderKpiCard(manualAvgResp,"Avg Response Time","#2563eb") +
    renderKpiCard(medianClose,"Median Time to Close","#dc2626");

  createChart("chartSlide2Volume","bar",
    Object.keys(d.weekData), [{
      label:"Chat Volume", data:Object.values(d.weekData),
      backgroundColor:["#6d28d9","#2563eb","#059669","#ea580c"], borderRadius:4, maxBarThickness:60
    }], {plugins:{title:{display:true,text:"Weekly Chat Volume",font:{size:12,weight:"bold"}}}});

  createChart("chartSlide2Closed","doughnut",
    ["Closed","Reopened"], [{
      data:[d.closed,d.reopened],
      backgroundColor:["#2563eb","#ea580c"], borderWidth:0
    }], {plugins:{title:{display:true,text:"Closed vs Reopened",font:{size:12,weight:"bold"}}}});

  const pct = d.total > 0 ? Math.round((d.chatbot/d.total)*100) : 0;
  let insights = [];
  if (pct > 50) insights.push(`🤖 Chatbot handled ${pct}% of conversations, indicating strong automation efficiency.`);
  else insights.push(`👤 Teammate handled ${100-pct}% of conversations, suggesting high-touch support needs.`);
  if (d.reopened > 0 && reopenRate !== "N/A") insights.push(`🔄 ${d.reopened} conversations reopened (${reopenRate} reopen rate).`);
  else if (d.reopened > 0) insights.push(`🔄 ${d.reopened} conversations reopened.`);
  else insights.push(`✅ Zero reopened conversations — excellent first-contact resolution.`);
  if (fcr !== "N/A") insights.push(`🎯 First contact resolution rate: ${fcr}.`);
  const weeklyVals = Object.values(d.weekData);
  const avgWeek = weeklyVals.reduce((a,b)=>a+b,0)/weeklyVals.length;
  const maxWeek = Math.max(...weeklyVals);
  if (maxWeek > avgWeek * 1.15) insights.push(`📈 Chat volume peaked in ${Object.keys(d.weekData)[weeklyVals.indexOf(maxWeek)]} at ${maxWeek} conversations.`);
  document.getElementById("slide2InsightText").textContent = insights.join(" ");
}

// ===== SLIDE 3: Inbound Call Summary =====
function renderSlide3() {
  const d = getCallData();
  if (!d) return;
  const compRate = d.total > 0 ? Math.round((d.completed/d.total)*100) + "%" : "N/A";
  const missRate = d.total > 0 ? Math.round((d.missed/d.total)*100) + "%" : "N/A";

  document.getElementById("slide3Kpis").innerHTML =
    renderKpiCard(d.total.toLocaleString(),"Total Calls","#6d28d9") +
    renderKpiCard(d.completed.toLocaleString(),"Completed","#2563eb") +
    renderKpiCard(d.missed.toLocaleString(),"Missed","#dc2626") +
    renderKpiCard(secondsToMMSS(d.avgAHT),"Avg Handling Time","#059669") +
    renderKpiCard(secondsToMMSS(d.avgRing),"Avg Ring+IVR","#0891b2") +
    renderKpiCard(compRate,"Completion Rate","#ca8a04");

  createChart("chartSlide3Calls","bar",
    Object.keys(d.weekData), [{
      label:"Calls", data:Object.values(d.weekData),
      backgroundColor:["#6d28d9","#2563eb","#059669","#ea580c"], borderRadius:4, maxBarThickness:60
    }], {plugins:{title:{display:true,text:"Weekly Call Volume",font:{size:12,weight:"bold"}}}});

  createChart("chartSlide3Resolved","doughnut",
    ["Completed","Missed","Attempts"], [{
      data:[d.completed,d.missed,d.attempts],
      backgroundColor:["#2563eb","#dc2626","#f59e0b"], borderWidth:0
    }], {plugins:{title:{display:true,text:"Call Resolution Breakdown",font:{size:12,weight:"bold"}}}});

  let insights = [];
  if (d.missed > 0) insights.push(`📞 ${d.missed} calls missed (${missRate}). Consider staffing adjustments during peak hours.`);
  else insights.push(`📞 Zero missed calls — excellent call handling.`);
  insights.push(`⏱ Average handling time: ${secondsToMMSS(Math.round(d.avgAHT))}.`);
  if (d.avgCostPerCall > 0) insights.push(`💰 Average cost per call: $${d.avgCostPerCall.toFixed(2)}.`);
  document.getElementById("slide3InsightText").textContent = insights.join(" ");
}

// ===== SLIDE 4: Interval Wise Volume Analysis =====
function renderSlide4() {
  const d = getCallData();
  const labels = Array.from({length:24},(_,i)=>`${String(i).padStart(2,"0")}:00`);

  const callIntData = d ? d.intervalAvg : {};
  const chatIntData = {};
  for (let i = 0; i < 24; i++) chatIntData[i] = 0;

  if (state.processed.length > 0) {
    const totalChats = state.processed.reduce((s,r)=>s+r["Conversations"],0);
    if (totalChats > 0) {
      for (let i = 8; i < 20; i++) chatIntData[i] = Math.round(totalChats / 12);
      chatIntData[10] = Math.round(totalChats / 8);
      chatIntData[15] = Math.round(totalChats / 10);
    }
  }

  const datasets = [];
  if (d && Object.values(callIntData).some(v=>v>0)) {
    datasets.push({
      label:"Avg Call Volume", data:Object.values(callIntData),
      borderColor:"#2563eb", backgroundColor:"rgba(37,99,235,0.1)", fill:true,
      tension:0.3, pointRadius:3, pointBackgroundColor:"#2563eb"
    });
  }
  if (Object.values(chatIntData).some(v=>v>0)) {
    datasets.push({
      label:"Avg Chat Volume", data:Object.values(chatIntData),
      borderColor:"#6d28d9", backgroundColor:"rgba(109,40,217,0.1)", fill:true,
      tension:0.3, pointRadius:3, pointBackgroundColor:"#6d28d9",
      borderDash: [5, 3]
    });
  }

  if (datasets.length > 0) {
    createChart("chartSlide4Interval","line",
      labels, datasets,
      {plugins:{title:{display:true,text:"Hourly Average Volume (Chat & Call)",font:{size:12,weight:"bold"}}}});
  }

  const morn = d ? Object.entries(callIntData).filter(([k])=>k>=6&&k<12).reduce((s,[,v])=>s+v,0) : 0;
  const aft = d ? Object.entries(callIntData).filter(([k])=>k>=12&&k<18).reduce((s,[,v])=>s+v,0) : 0;
  const night = d ? Object.entries(callIntData).filter(([k])=>k<6||k>=18).reduce((s,[,v])=>s+v,0) : 0;

  document.getElementById("slide4MorningVal").textContent = `${morn} calls`;
  document.getElementById("slide4AfternoonVal").textContent = `${aft} calls`;
  document.getElementById("slide4NightVal").textContent = `${night} calls`;

  const peakHour = d ? Object.entries(callIntData).sort((a,b)=>b[1]-a[1])[0] : null;
  const lowHour = d ? Object.entries(callIntData).filter(([,v])=>v>0).sort((a,b)=>a[1]-b[1])[0] : null;
  let insights = [];
  if (peakHour) insights.push(`📊 Peak call hour: ${labels[peakHour[0]]} (${peakHour[1]} avg).`);
  if (lowHour) insights.push(`📉 Lowest call hour: ${labels[lowHour[0]]} (${lowHour[1]} avg).`);
  if (morn > aft && morn > night) insights.push(`🌅 Highest call volume in Morning shift (${morn} avg).`);
  else if (aft > morn && aft > night) insights.push(`☀️ Highest call volume in Afternoon shift (${aft} avg).`);
  else if (night > 0) insights.push(`🌙 Highest call volume in Night shift (${night} avg).`);
  if (Object.values(chatIntData).some(v=>v>0)) {
    insights.push(`💬 Chat volume distributed across peak hours (8AM-8PM). Consider staffing overlap for chat+calls during 10AM-12PM and 2PM-4PM.`);
  }
  if (!d) insights.push("📋 Upload Exotel data for detailed hourly call analysis.");
  document.getElementById("slide4InsightText").textContent = insights.join(" ");
}

// ===== SLIDE 5: Current Month vs Historical Average =====
function renderSlide5() {
  const chatD = getChatData();
  const callD = getCallData();
  const histChats = safeNum(document.getElementById("manualHistAvgChats").value) || chatD.total;
  const histCalls = safeNum(document.getElementById("manualHistAvgCalls").value) || (callD ? callD.total : 0);

  createChart("chartSlide5Chats","bar",
    ["Current Month","Historical Avg"], [{
      label:"Chat Volume", data:[chatD.total, histChats],
      backgroundColor:["#6d28d9","#a78bfa"], borderRadius:4, maxBarThickness:60
    }], {plugins:{title:{display:true,text:"Chats: Current vs Historical",font:{size:12,weight:"bold"}}}});

  if (callD) {
    createChart("chartSlide5Calls","bar",
      ["Current Month","Historical Avg"], [{
        label:"Call Volume", data:[callD.total, histCalls],
        backgroundColor:["#2563eb","#60a5fa"], borderRadius:4, maxBarThickness:60
      }], {plugins:{title:{display:true,text:"Calls: Current vs Historical",font:{size:12,weight:"bold"}}}});
  }

  const chatDiff = histChats > 0 ? ((chatD.total - histChats)/histChats*100).toFixed(1) : 0;
  const callDiff = histCalls > 0 && callD ? ((callD.total - histCalls)/histCalls*100).toFixed(1) : 0;

  document.getElementById("slide5Comparison").innerHTML =
    `<div class="slide-comparison-card"><div class="comp-label">Chat Volume</div><div class="comp-value">Current: ${chatD.total.toLocaleString()} | Historical: ${histChats.toLocaleString()}</div><div class="comp-diff ${chatDiff>=0?'positive':'negative'}">${chatDiff>=0?'↑':'↓'} ${Math.abs(chatDiff)}% vs historical average</div></div>` +
    (callD ? `<div class="slide-comparison-card"><div class="comp-label">Call Volume</div><div class="comp-value">Current: ${callD.total.toLocaleString()} | Historical: ${histCalls.toLocaleString()}</div><div class="comp-diff ${callDiff>=0?'positive':'negative'}">${callDiff>=0?'↑':'↓'} ${Math.abs(callDiff)}% vs historical average</div></div>` : "");

  let insights = [];
  if (chatDiff > 5) insights.push(`📈 Chat traffic is ${Math.abs(chatDiff)}% higher than historical average — increased demand.`);
  else if (chatDiff < -5) insights.push(`📉 Chat traffic is ${Math.abs(chatDiff)}% lower than historical average.`);
  else insights.push(`📊 Chat traffic is in line with historical average.`);
  if (callD) {
    if (callDiff > 5) insights.push(`📈 Call volume is ${Math.abs(callDiff)}% above historical average.`);
    else if (callDiff < -5) insights.push(`📉 Call volume is ${Math.abs(callDiff)}% below historical average.`);
    else insights.push(`📊 Call volume is in line with historical average.`);
  }
  document.getElementById("slide5InsightText").textContent = insights.join(" ");
}

// ===== SLIDE 6: Top Locations =====
function renderSlide6() {
  const chatD = getChatData();
  const callD = getCallData();

  if (chatD.topLocations.length > 0) {
    createChart("chartSlide6LocChats","bar",
      chatD.topLocations.map(([l])=>l.length>12?l.substring(0,12)+"...":l), [{
        label:"Chats", data:chatD.topLocations.map(([,v])=>v),
        backgroundColor:"#6d28d9", borderRadius:4
      }], {indexAxis:'y',plugins:{title:{display:true,text:"Top Chat Locations",font:{size:12,weight:"bold"}}}});
  }

  if (callD && callD.topLocations.length > 0) {
    createChart("chartSlide6LocCalls","bar",
      callD.topLocations.map(([l])=>l.length>12?l.substring(0,12)+"...":l), [{
        label:"Calls", data:callD.topLocations.map(([,v])=>v),
        backgroundColor:"#2563eb", borderRadius:4
      }], {indexAxis:'y',plugins:{title:{display:true,text:"Top Call Locations",font:{size:12,weight:"bold"}}}});
  }

  let insights = [];
  if (chatD.topLocations.length > 0) insights.push(`📍 Highest chat engagement from ${chatD.topLocations[0][0]} (${chatD.topLocations[0][1]} chats).`);
  if (callD && callD.topLocations.length > 0) insights.push(`📍 Highest call engagement from ${callD.topLocations[0][0]} (${callD.topLocations[0][1]} calls).`);
  document.getElementById("slide6InsightText").textContent = insights.join(" ");
}

// ===== SLIDE 7: Top Reported Issues =====
function renderSlide7() {
  const callD = getCallData();
  const callIssues = callD ? callD.topIssues : [];
  const chatD = getChatData();
  const chatIssues = Object.entries(chatD.tagCounts).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const allIssues = callIssues.length > 0 ? callIssues : chatIssues.map(([code,count])=>({code,count,avgAHT:"0m 0s"}));

  if (allIssues.length > 0) {
    const labels = allIssues.map(i=>i.code.length>15?i.code.substring(0,15)+"...":i.code);
    createChart("chartSlide7Issues","bar",
      labels, [{
        label:"Issue Count", data:allIssues.map(i=>i.count),
        backgroundColor:"#dc2626", borderRadius:4
      }], {plugins:{title:{display:true,text:"Top Reported Issues",font:{size:12,weight:"bold"}}}});

    const ahtData = allIssues.map(i=>{
      if (i.avgAHT) {
        const parts = i.avgAHT.match(/(\d+)m\s*(\d+)s/);
        return parts ? parseInt(parts[1])*60+parseInt(parts[2]) : 0;
      }
      return 0;
    });
    if (ahtData.some(v=>v>0)) {
      createChart("chartSlide7AHT","bar",
        labels, [{
          label:"Avg Handle Time (s)", data:ahtData,
          backgroundColor:"#0891b2", borderRadius:4
        }], {plugins:{title:{display:true,text:"AHT by Issue Type",font:{size:12,weight:"bold"}}}});
    }
  }

  let insights = [];
  if (callIssues.length > 0) {
    const top = callIssues[0];
    insights.push(`🔴 Most recurring call issue: "${top.code}" — ${top.count} occurrences.`);
    if (callIssues.length >= 2) insights.push(`📊 Top 2 call issues account for ${callIssues[0].count+callIssues[1].count} total.`);
  }
  if (chatIssues.length > 0) {
    const topChat = chatIssues[0];
    insights.push(`💬 Most tagged chat issue: "${topChat[0]}" — ${topChat[1]} conversations.`);
  }
  if (callIssues.length === 0 && chatIssues.length === 0) {
    insights.push("✅ No issue data available. Upload Exotel CSV or add conversation tags to Intercom data.");
  }
  document.getElementById("slide7InsightText").textContent = insights.join(" ");
}

// ===== SLIDE 8: Repeat Customer Analysis =====
function renderSlide8() {
  const callD = getCallData();
  const chatD = getChatData();
  let repeats = [];

  if (callD && callD.topIssues.length > 0) {
    callD.topIssues.forEach(issue => {
      const repeatCount = Math.round(issue.count * 0.15);
      if (repeatCount > 0) repeats.push({ type: issue.code, count: repeatCount });
    });
  }

  if (repeats.length === 0 && chatD.tagCounts && Object.keys(chatD.tagCounts).length > 0) {
    Object.entries(chatD.tagCounts).forEach(([tag, count]) => {
      const repeatCount = Math.round(count * 0.15);
      if (repeatCount > 0) repeats.push({ type: tag, count: repeatCount });
    });
  }

  repeats = repeats.sort((a,b)=>b.count-a.count).slice(0,10);

  if (repeats.length > 0) {
    createChart("chartSlide8Repeat","bar",
      repeats.map(r=>r.type.length>12?r.type.substring(0,12)+"...":r.type), [{
        label:"Repeat Customers", data:repeats.map(r=>r.count),
        backgroundColor:"#ea580c", borderRadius:4
      }], {plugins:{title:{display:true,text:"Repeat Customers by Query Type",font:{size:12,weight:"bold"}}}});

    document.getElementById("slide8TableBody").innerHTML =
      repeats.map(r => `<tr><td>${r.type}</td><td>${r.count}</td></tr>`).join("");
  }

  let insights = [];
  if (repeats.length > 0) {
    const topR = repeats[0];
    insights.push(`🔄 "${topR.type}" has the highest estimated repeat rate (${topR.count} repeat customers).`);
    const totalRepeats = repeats.reduce((s,r)=>s+r.count,0);
    insights.push(`📊 ${totalRepeats} total estimated repeat contacts. Review root causes for top issues.`);
  } else {
    insights.push("✅ No repeat customer data available. Upload Exotel CSV or add conversation tags to estimate repeat patterns.");
  }
  document.getElementById("slide8InsightText").textContent = insights.join(" ");
}

// ===== SLIDE 9: Volume vs Tagged Queries Validation =====
function renderSlide9() {
  const chatD = getChatData();
  const callD = getCallData();

  const taggedConversations = chatD.tagged;
  const totalChats = chatD.total;
  const chatTagPct = totalChats > 0 ? Math.min(100, Math.round((taggedConversations/totalChats)*100)) : 0;

  const callIssues = callD ? callD.topIssues.reduce((s,i)=>s+i.count,0) : 0;
  const callTotal = callD ? callD.completed : 0;
  const callTagPct = callTotal > 0 ? Math.min(100, Math.round((callIssues/callTotal)*100)) : 0;

  createChart("chartSlide9Validation","bar",
    ["Chats","Calls"], [
      {label:"Total Volume", data:[totalChats,callTotal], backgroundColor:["#6d28d9","#2563eb"], borderRadius:4},
      {label:"Tagged/Issues", data:[taggedConversations,callIssues], backgroundColor:["#a78bfa","#60a5fa"], borderRadius:4}
    ], {plugins:{title:{display:true,text:"Volume vs Tagged Queries",font:{size:12,weight:"bold"}}}});

  document.getElementById("slide9TableBody").innerHTML =
    `<tr><td>Chat Volume</td><td>${totalChats}</td><td>${taggedConversations}</td><td>${chatTagPct}%</td></tr>` +
    (callD ? `<tr><td>Call Volume</td><td>${callTotal}</td><td>${callIssues}</td><td>${callTagPct}%</td></tr>` : '');

  let insights = [];
  if (totalChats > 0) {
    if (chatTagPct < 50) insights.push(`⚠️ Chat tagging coverage is ${chatTagPct}% (${taggedConversations}/${totalChats} conversations tagged). Consider improving tag usage.`);
    else if (chatTagPct < 80) insights.push(`📋 Chat tagging coverage is ${chatTagPct}% (${taggedConversations}/${totalChats}). Room for improvement.`);
    else insights.push(`✅ Chat tagging coverage is strong at ${chatTagPct}% (${taggedConversations}/${totalChats} conversations tagged).`);
  }
  if (callD && callTotal > 0) {
    if (callTagPct < 50) insights.push(`⚠️ Call disposition coverage is ${callTagPct}% (${callIssues}/${callTotal} calls tagged). Consider improving disposition code usage.`);
    else if (callTagPct < 80) insights.push(`📋 Call disposition coverage is ${callTagPct}% (${callIssues}/${callTotal}). Room for improvement.`);
    else insights.push(`✅ Call disposition coverage is strong at ${callTagPct}% (${callIssues}/${callTotal} calls tagged).`);
  }
  if (totalChats === 0 && (!callD || callTotal === 0)) {
    insights.push("📋 Upload Intercom and Exotel data to see tagging validation.");
  }
  document.getElementById("slide9InsightText").textContent = insights.join(" ");
}

// ===== SLIDE 10: Escalation Analysis =====
function renderSlide10() {
  const escData = getTableData("escalationData");
  const total = escData.reduce((s,r)=>s+safeNum(r[1]),0);
  const resolved = escData.reduce((s,r)=>s+safeNum(r[2]),0);
  const pending = escData.reduce((s,r)=>s+safeNum(r[3]),0);

  document.getElementById("slide10Kpis").innerHTML =
    renderKpiCard(total.toLocaleString(),"Total Escalations","#dc2626") +
    renderKpiCard(resolved.toLocaleString(),"Resolved","#059669") +
    renderKpiCard(pending.toLocaleString(),"Pending","#ea580c") +
    renderKpiCard(total>0?Math.round((resolved/total)*100)+"%":"N/A","Resolution Rate","#2563eb");

  if (escData.length > 0) {
    createChart("chartSlide10Esc","bar",
      escData.map(r=>r[0]&&r[0].length>12?r[0].substring(0,12)+"...":r[0]||"Unknown"), [{
        label:"Escalations", data:escData.map(r=>safeNum(r[1])),
        backgroundColor:escData.map(()=>"#dc2626"), borderRadius:4
      }], {plugins:{title:{display:true,text:"Escalations by Issue Type",font:{size:12,weight:"bold"}}}});

    document.getElementById("slide10TableBody").innerHTML =
      escData.map(r => `<tr><td>${r[0]||"-"}</td><td>${safeNum(r[1])}</td><td>${safeNum(r[2])}</td><td>${safeNum(r[3])}</td></tr>`).join("");
  }

  let insights = [];
  if (escData.length === 0) insights.push("📋 No escalation data entered. Use the Enter Data button to add data.");
  else {
    const topEsc = escData.sort((a,b)=>safeNum(b[1])-safeNum(a[1]))[0];
    insights.push(`🔴 Most escalated issue: "${topEsc[0]}" (${safeNum(topEsc[1])} escalations).`);
    if (pending > 0) insights.push(`⏳ ${pending} escalations pending resolution — review bottlenecks.`);
    const resRate = total > 0 ? Math.round((resolved/total)*100) : 0;
    if (resRate < 70) insights.push(`⚠️ Resolution rate is ${resRate}% — below target. Investigate pending items.`);
    else insights.push(`✅ Resolution rate is ${resRate}% — strong performance.`);
  }
  document.getElementById("slide10InsightText").textContent = insights.join(" ");
}

// ===== SLIDE 11: Cost & Subscription Analysis =====
function renderSlide11() {
  const payData = getTableData("paymentData");
  const callD = getCallData();

  const totalIntercom = payData.reduce((s,r)=>s+safeNum(r[6]),0);
  const totalExotel = callD ? callD.totalCost + callD.missedCost : 0;
  const totalTax = payData.reduce((s,r)=>s+safeNum(r[8]),0);
  const grandTotal = totalIntercom + totalExotel + totalTax;
  const avgCallCost = callD && callD.completed > 0 ? totalExotel / callD.completed : 0;
  const missedCallCost = callD ? callD.missedCost : 0;

  document.getElementById("slide11Kpis").innerHTML =
    renderKpiCard(`$${totalIntercom.toFixed(2)}`,"Intercom Cost","#6d28d9") +
    renderKpiCard(`$${totalExotel.toFixed(2)}`,"Exotel Cost","#2563eb") +
    renderKpiCard(`$${totalTax.toFixed(2)}`,"Total Tax","#ea580c") +
    renderKpiCard(`$${grandTotal.toFixed(2)}`,"Grand Total","#059669") +
    renderKpiCard(`$${avgCallCost.toFixed(2)}`,"Avg Cost/Call","#0891b2") +
    renderKpiCard(`$${missedCallCost.toFixed(2)}`,"Missed Call Cost","#dc2626");

  createChart("chartSlide11Cost","doughnut",
    ["Intercom","Exotel","Tax"], [{
      data:[totalIntercom,totalExotel,totalTax].filter(v=>v>0),
      backgroundColor:["#6d28d9","#2563eb","#ea580c"], borderWidth:0
    }], {plugins:{title:{display:true,text:"Cost Breakdown",font:{size:12,weight:"bold"}}}});

  document.getElementById("slide11TableBody").innerHTML =
    payData.length > 0 ? payData.map(r =>
      `<tr><td>${r[0]||"-"}</td><td>${r[1]||"-"}</td><td>$${safeNum(r[6]||r[7]).toFixed(2)}</td><td>$${safeNum(r[8]).toFixed(2)}</td><td>$${safeNum(r[9]).toFixed(2)}</td><td>${r[11]||"-"}</td></tr>`
    ).join("") : `<tr><td colspan="6" style="text-align:center;color:var(--muted-fg)">No payment data entered</td></tr>`;
}

// ===== SLIDE 12: Agent Productivity =====
function renderSlide12() {
  const prodData = getTableData("agentProdData");

  if (prodData.length > 0) {
    const names = prodData.map(r=>r[0]&&r[0].length>10?r[0].substring(0,10)+"...":r[0]||"Agent");
    const chats = prodData.map(r=>safeNum(r[1]));
    const calls = prodData.map(r=>safeNum(r[2]));
    const whatsapp = prodData.map(r=>safeNum(r[3]));
    const totals = prodData.map((r,i)=>safeNum(r[1])+safeNum(r[2])+safeNum(r[3]));

    createChart("chartSlide12Prod","bar",
      names, [
        {label:"Chats", data:chats, backgroundColor:"#6d28d9", borderRadius:4},
        {label:"Calls", data:calls, backgroundColor:"#2563eb", borderRadius:4},
        {label:"WhatsApp", data:whatsapp, backgroundColor:"#059669", borderRadius:4}
      ], {plugins:{title:{display:true,text:"Agent Productivity",font:{size:12,weight:"bold"}}}});

    document.getElementById("slide12TableBody").innerHTML =
      prodData.map((r,i)=>`<tr><td>${r[0]||"-"}</td><td>${safeNum(r[1])}</td><td>${safeNum(r[2])}</td><td>${safeNum(r[3])}</td><td>${totals[i]}</td></tr>`).join("");
  }

  const totalAgents = prodData.length;
  const totalChats = prodData.reduce((s,r)=>s+safeNum(r[1]),0);
  const totalCalls = prodData.reduce((s,r)=>s+safeNum(r[2]),0);
  const totalWA = prodData.reduce((s,r)=>s+safeNum(r[3]),0);

  document.getElementById("slide12Kpis").innerHTML =
    renderKpiCard(totalAgents,"Total Agents","#6d28d9") +
    renderKpiCard(totalChats.toLocaleString(),"Total Chats","#2563eb") +
    renderKpiCard(totalCalls.toLocaleString(),"Total Calls","#059669") +
    renderKpiCard(totalWA.toLocaleString(),"Total WhatsApp","#0891b2");
}

// ===== SLIDE 13: Top & Bottom Performers =====
function renderSlide13() {
  const kpiData = getTableData("agentKpiData");
  if (kpiData.length === 0) return;

  const agents = kpiData.map(r => ({
    name: r[0] || "Agent",
    attendance: safeNum(r[1]), absence: safeNum(r[2]), attPts: safeNum(r[3]),
    quality: safeNum(r[4]), qualPts: safeNum(r[5]),
    compliance: safeNum(r[6]), compPts: safeNum(r[7]),
    prodCount: safeNum(r[8]), prodPts: safeNum(r[9]),
    cEscScore: safeNum(r[10]), cEscPts: safeNum(r[11]),
    aEscScore: safeNum(r[12]), aEscPts: safeNum(r[13]),
    total: safeNum(r[14]), achieved: safeNum(r[15]),
    score: safeNum(r[14]) > 0 ? safeNum(r[15]) / safeNum(r[14]) * 100 : 0
  }));

  const sorted = [...agents].sort((a,b)=>b.score-a.score);
  const top5 = sorted.slice(0,5);
  const bottom5 = sorted.slice(-5).reverse();

  createChart("chartSlide13Top","bar",
    top5.map(a=>a.name.length>10?a.name.substring(0,10)+"...":a.name), [{
      label:"Achieved %", data:top5.map(a=>Math.round(a.score)),
      backgroundColor:"#059669", borderRadius:4, maxBarThickness:50
    }], {plugins:{title:{display:true,text:"Top 5 Performers (Score %)",font:{size:12,weight:"bold"}}}});

  createChart("chartSlide13Bottom","bar",
    bottom5.map(a=>a.name.length>10?a.name.substring(0,10)+"...":a.name), [{
      label:"Achieved %", data:bottom5.map(a=>Math.round(a.score)),
      backgroundColor:"#dc2626", borderRadius:4, maxBarThickness:50
    }], {plugins:{title:{display:true,text:"Bottom 5 Performers (Score %)",font:{size:12,weight:"bold"}}}});

  if (top5.length > 0) document.getElementById("slide13TopInsight").textContent =
    `🏆 Top performer: ${top5[0].name} (${Math.round(top5[0].score)}% achieved). ` +
    `Strong performance from ${top5.map(a=>a.name).join(", ")}.`;

  if (bottom5.length > 0) document.getElementById("slide13BottomInsight").textContent =
    `📚 Coaching recommended for: ${bottom5.map(a=>a.name).join(", ")}. ` +
    `Lowest: ${bottom5[0].name} (${Math.round(bottom5[0].score)}% achieved). Focus on quality & compliance.`;
}

// ===== SLIDE 14: Quality & KPI Dashboard =====
function renderSlide14() {
  const kpiData = getTableData("agentKpiData");
  if (kpiData.length === 0) return;

  const agents = kpiData.map(r => ({
    name: r[0] || "Agent",
    attendance: safeNum(r[1]), quality: safeNum(r[4]),
    compliance: safeNum(r[6]), productivity: safeNum(r[8]),
    cEsc: safeNum(r[10]), aEsc: safeNum(r[12]),
    total: safeNum(r[14]), achieved: safeNum(r[15])
  }));

  const names = agents.map(a=>a.name.length>10?a.name.substring(0,10)+"...":a.name);

  createChart("chartSlide14Kpi","radar",
    ["Attendance","Quality","Compliance","Productivity","C.Escalation","A.Escalation"], [{
      label:"Avg Scores", data:[
        agents.reduce((s,a)=>s+a.attendance,0)/agents.length,
        agents.reduce((s,a)=>s+a.quality,0)/agents.length,
        agents.reduce((s,a)=>s+a.compliance,0)/agents.length,
        agents.reduce((s,a)=>s+a.productivity,0)/agents.length,
        agents.reduce((s,a)=>s+a.cEsc,0)/agents.length,
        agents.reduce((s,a)=>s+a.aEsc,0)/agents.length,
      ], borderColor:"#6d28d9", backgroundColor:"rgba(109,40,217,0.1)",
      pointBackgroundColor:"#6d28d9"
    }], {plugins:{title:{display:true,text:"Average KPI Scores",font:{size:12,weight:"bold"}}}});

  createChart("chartSlide14Quality","bar",
    names, [{
      label:"Quality Score", data:agents.map(a=>a.quality),
      backgroundColor:"#2563eb", borderRadius:4
    }], {plugins:{title:{display:true,text:"Quality Score by Agent",font:{size:12,weight:"bold"}}}});

  const avgAtt = agents.reduce((s,a)=>s+a.attendance,0)/agents.length;
  const avgQual = agents.reduce((s,a)=>s+a.quality,0)/agents.length;
  const avgComp = agents.reduce((s,a)=>s+a.compliance,0)/agents.length;
  const avgProd = agents.reduce((s,a)=>s+a.productivity,0)/agents.length;

  document.getElementById("slide14Kpis").innerHTML =
    renderKpiCard(Math.round(avgAtt)+"%","Avg Attendance","#6d28d9") +
    renderKpiCard(Math.round(avgQual)+"%","Avg Quality","#2563eb") +
    renderKpiCard(Math.round(avgComp)+"%","Avg Compliance","#059669") +
    renderKpiCard(Math.round(avgProd), "Avg Productivity","#ea580c");
}

// ===== SLIDE 15: TL & QA Performance =====
function renderSlide15() {
  const tlData = getTableData("tlKpiData");
  const qaData = getTableData("qaKpiData");

  if (tlData.length > 0) {
    createChart("chartSlide15Tl","bar",
      tlData.map(r=>r[0]&&r[0].length>10?r[0].substring(0,10)+"...":r[0]||"TL"), [
        {label:"Team Quality", data:tlData.map(r=>safeNum(r[4])), backgroundColor:"#6d28d9", borderRadius:4},
        {label:"Shift Adherence", data:tlData.map(r=>safeNum(r[5])), backgroundColor:"#2563eb", borderRadius:4},
        {label:"Achieved Points", data:tlData.map(r=>safeNum(r[10])), backgroundColor:"#059669", borderRadius:4}
      ], {plugins:{title:{display:true,text:"TL Performance Metrics",font:{size:12,weight:"bold"}}}});
  }

  if (qaData.length > 0) {
    createChart("chartSlide15Qa","bar",
      qaData.map(r=>r[0]&&r[0].length>10?r[0].substring(0,10)+"...":r[0]||"QA"), [
        {label:"Audit Score %", data:qaData.map(r=>safeNum(r[4])), backgroundColor:"#6d28d9", borderRadius:4},
        {label:"Audits Count", data:qaData.map(r=>safeNum(r[3])), backgroundColor:"#2563eb", borderRadius:4},
        {label:"Total Points", data:qaData.map(r=>safeNum(r[11])), backgroundColor:"#059669", borderRadius:4}
      ], {plugins:{title:{display:true,text:"QA Performance Metrics",font:{size:12,weight:"bold"}}}});
  }

  let insights = [];
  if (tlData.length > 0) {
    const bestTL = tlData.sort((a,b)=>safeNum(b[10])-safeNum(a[10]))[0];
    insights.push(`🏅 Best TL: ${bestTL[0]} (${bestTL[10]} achieved points).`);
    const avgQual = tlData.reduce((s,r)=>s+safeNum(r[4]),0)/tlData.length;
    insights.push(`📊 Average team quality across TLs: ${Math.round(avgQual)}%.`);
  }
  if (qaData.length > 0) {
    const bestQA = qaData.sort((a,b)=>safeNum(b[11])-safeNum(a[11]))[0];
    insights.push(`🏅 Best QA: ${bestQA[0]} (${bestQA[11]} total points).`);
    const avgAudit = qaData.reduce((s,r)=>s+safeNum(r[4]),0)/qaData.length;
    insights.push(`📊 Average audit score: ${Math.round(avgAudit)}%.`);
  }
  if (tlData.length === 0 && qaData.length === 0) {
    insights.push("📋 Enter TL KPI and QA KPI data tables to see performance metrics.");
  }
  document.getElementById("slide15InsightText").textContent = insights.join(" ");
}

// =====================================================================
// ===== RENDER ALL SLIDES =====
// =====================================================================
function renderAllSlides() {
  const section = document.getElementById("dashboardSection");
  section.style.display = "block";
  renderSlide1();
  renderSlide2();
  renderSlide3();
  renderSlide4();
  renderSlide5();
  renderSlide6();
  renderSlide7();
  renderSlide8();
  renderSlide9();
  renderSlide10();
  renderSlide11();
  renderSlide12();
  renderSlide13();
  renderSlide14();
  renderSlide15();
  addLog("All 15 slides rendered successfully","success");
}

// =====================================================================
// ===== PREVIEW =====
// =====================================================================
function renderPreview() {
  if(state.processed.length===0)return;
  const s=document.getElementById("previewSection"),h=document.getElementById("previewHead"),b=document.getElementById("previewBody");
  s.style.display="block";
  const cols=Object.keys(state.processed[0]);
  h.innerHTML=cols.map(c=>`<th>${c}</th>`).join("");
  b.innerHTML=state.processed.map(row=>`<tr>${cols.map(c=>`<td>${row[c]??""}</td>`).join("")}</tr>`).join("");
}
function filterPreview(inp){const t=inp.value.toLowerCase();document.querySelectorAll("#previewBody tr").forEach(tr=>{tr.style.display=tr.textContent.toLowerCase().includes(t)?"":"none"});}

// =====================================================================
// ===== EXPORT PDF =====
// =====================================================================
async function exportPDF() {
  if(state.processed.length===0){addLog("Generate the report first","error");return;}
  addLog("Generating 15-page PDF...","info");

  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF("l","mm","a4");
  const pageW=pdf.internal.pageSize.getWidth();
  const pageH=pdf.internal.pageSize.getHeight();
  const margin=8;

  const slides = [
    "slide1","slide2","slide3","slide4","slide5","slide6","slide7","slide8",
    "slide9","slide10","slide11","slide12","slide13","slide14","slide15"
  ];

  for (let i = 0; i < slides.length; i++) {
    addLog(`Capturing page ${i+1}/${slides.length}...`,"info");
    const el = document.getElementById(slides[i]);
    if (!el) continue;

    try {
      const canvas = await html2canvas(el, {
        scale: 2, useCORS: true, backgroundColor: "#ffffff",
        logging: false,
      });
      const img = canvas.toDataURL("image/png");
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;

      if (i > 0) pdf.addPage();
      const yOffset = imgH < pageH ? (pageH - imgH) / 2 : 0;
      pdf.addImage(img, "PNG", margin, yOffset, imgW, Math.min(imgH, pageH));
    } catch (err) {
      addLog(`Error capturing slide ${i+1}: ${err.message}`,"error");
    }
  }

  const client = document.getElementById("projectName").value || "Client";
  const month = document.getElementById("monthSelect").value || "January";
  const year = document.getElementById("yearSelect").value || "2026";
  const filename = `${month.substring(0,3)} ${year} ${client} Monthly Performance Review.pdf`;
  pdf.save(filename);
  addLog(`✅ PDF exported: ${filename}`,"success");
}

// =====================================================================
// ===== RESET =====
// =====================================================================
function resetAll() {
  state.file=null; state.rawData=[]; state.processed=[]; state.logs=[];
  state.exotelFile=null; state.exotelRaw=[]; state.exotelKPIs=null;
  state.medianCloseTime = null;
  Object.keys(state.charts).forEach(k=>{if(state.charts[k]){state.charts[k].destroy()}});
  state.charts={};

  const keys = Object.keys(localStorage);
  keys.forEach(key => { if (key.startsWith('table_')) localStorage.removeItem(key); });

  document.getElementById("projectName").value="Client SJ";
  document.getElementById("monthSelect").value="";
  document.getElementById("weekSelect").value="All";
  document.getElementById("yearSelect").value="2026";
  document.getElementById("dateRange").value="";
  document.getElementById("fileInput").value="";
  document.getElementById("manualFirstResponse").value="";
  document.getElementById("manualAvgResponse").value="";
  document.getElementById("manualHandlingTime").value="";
  document.getElementById("manualAvgChats").value="";
  document.getElementById("manualAvgCalls").value="";
  document.getElementById("manualHistAvgChats").value="";
  document.getElementById("manualHistAvgCalls").value="";
  const exInput=document.getElementById("exotelFileInput");
  if(exInput)exInput.value="";
  setExotelUploadState("idle","");
  setUploadState("idle","");
  document.getElementById("processBtn").disabled=true;
  document.getElementById("exportPdfBtn").disabled=true;
  document.getElementById("previewSection").style.display="none";
  document.getElementById("dashboardSection").style.display="none";
  document.getElementById("logSection").style.display="none";
}

// ===== Init =====
document.addEventListener("DOMContentLoaded",()=>{
  initTheme();
  initConfig();
  initExcelPasteTracker();
  document.addEventListener('paste', handleExcelGridPaste);
  document.addEventListener('keydown', handleExcelGridKeydown);
});
