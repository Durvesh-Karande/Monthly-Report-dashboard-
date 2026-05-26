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

const KPI_COLORS = ["#8b5cf6","#3b82f6","#10b981","#f59e0b","#fb7185","#06b6d4","#a78bfa","#fbbf24"];

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
  // Exclude the row-number column (td.row-num) from column index calculation
  const allDataCells = [...targetTr.querySelectorAll('td:not(.row-num)')];
  const startColIdx = allDataCells.indexOf(targetTd);

  if (startRowIdx === -1 || startColIdx === -1) return;

  const totalCols = allDataCells.length;
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
    for (let i = 0; i < 100; i++) addExcelGridRow();
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
  for (let i = 0; i < 100; i++) addExcelGridRow();
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
  scaleSlides();
  addLog("Slides rendered.","success");
}

// =====================================================================
// ===== EXOTEL PROCESSING =====
// =====================================================================
function processExotelData(rows) {
  const get = (r,...n)=>findCol(r,...n);
  const getS = r => String(get(r,"Status","status")||"").toLowerCase().trim();
  const getStartTime = r => String(get(r,"StartTime","starttime","Start Time","start time")||"").trim();
  const extractDateOnly = dt => { const s = dt.split(/\s+/)[0]; return s || ''; };
  const getDate = r => extractDateOnly(getStartTime(r));

  const completed = rows.filter(r => getS(r)==="completed");
  const missed    = rows.filter(r => getS(r)==="missed-call");
  const attempts  = rows.filter(r => getS(r)==="call-attempt");

  // --- Per-date aggregation ---
  const dateMap = {};
  rows.forEach(r => {
    const d = getDate(r);
    if (!d) return;
    if (!dateMap[d]) dateMap[d] = { completed:0, missed:0, attempts:0, convDurs:[], ringTimes:[], prices:[], priceCompleted:0, priceMissed:0, priceAttempt:0 };
    const status = getS(r);
    const p = safeNum(get(r,"Price","price"));
    if (status === "completed") {
      dateMap[d].completed++;
      const cd = safeNum(get(r,"ConversationDuration","Conversation Duration","conversationduration"));
      dateMap[d].convDurs.push(cd);
      const rt = Math.max(0, safeNum(get(r,"Duration","duration")) - cd);
      dateMap[d].ringTimes.push(rt);
      dateMap[d].prices.push(p);
      dateMap[d].priceCompleted += p;
    } else if (status === "missed-call") {
      dateMap[d].missed++;
      dateMap[d].priceMissed += p;
    } else if (status === "call-attempt") {
      dateMap[d].attempts++;
      dateMap[d].priceAttempt += p;
    }
  });

  const sortedDates = Object.keys(dateMap).sort();

  // Table 1: Call Count per date
  const dateCallCounts = sortedDates.map(d => ({
    date:d, completed:dateMap[d].completed, missed:dateMap[d].missed,
    attempts:dateMap[d].attempts, total: dateMap[d].completed+dateMap[d].missed+dateMap[d].attempts,
  }));

  // Table 2: AHT per date
  const dateAHT = sortedDates.map(d => {
    const c = dateMap[d].convDurs;
    return { date:d, avgAHT: c.length ? c.reduce((a,b)=>a+b,0)/c.length : 0 };
  });

  // Table 3: Ring Time per date
  const dateRing = sortedDates.map(d => {
    const r = dateMap[d].ringTimes;
    return { date:d, avgRing: r.length ? r.reduce((a,b)=>a+b,0)/r.length : 0 };
  });

  // Table 4: Avg Cost Per Call (ALL calls)
  const dateCost = sortedDates.map(d => {
    const dayRows = rows.filter(r => getDate(r) === d);
    const dayPrices = dayRows.map(r => safeNum(get(r,"Price","price")));
    return { date:d, avgCost: dayPrices.length ? dayPrices.reduce((a,b)=>a+b,0)/dayPrices.length : 0 };
  });

  // Table 5: Cost Spend per date x status
  const dateCostSpend = sortedDates.map(d => ({
    date:d, completed:dateMap[d].priceCompleted, missed:dateMap[d].priceMissed,
    attempts:dateMap[d].priceAttempt, total: dateMap[d].priceCompleted+dateMap[d].priceMissed+dateMap[d].priceAttempt,
  }));

  // --- Overall aggregates ---
  const convDurs = completed.map(r=>safeNum(get(r,"ConversationDuration","Conversation Duration","conversationduration")));
  const avgAHT = convDurs.length ? convDurs.reduce((a,b)=>a+b,0)/convDurs.length : 0;

  const ringTimes = completed.map(r=>Math.max(0, safeNum(get(r,"Duration","duration"))-safeNum(get(r,"ConversationDuration","Conversation Duration","conversationduration"))));
  const avgRing = ringTimes.length ? ringTimes.reduce((a,b)=>a+b,0)/ringTimes.length : 0;

  // Avg cost per call — ALL calls
  const allPrices = rows.map(r=>safeNum(get(r,"Price","price")));
  const avgCostPerCall = allPrices.length ? allPrices.reduce((a,b)=>a+b,0)/allPrices.length : 0;

  const totalCost = completed.map(r=>safeNum(get(r,"Price","price"))).reduce((a,b)=>a+b,0);
  const missedCost = missed.map(r=>safeNum(get(r,"Price","price"))).reduce((a,b)=>a+b,0);
  const attemptCost = attempts.map(r=>safeNum(get(r,"Price","price"))).reduce((a,b)=>a+b,0);

  // Week data — total and by status (uses StartTime for date extraction)
  const weekData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  const weekCompletedData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  const weekMissedData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  rows.forEach(r=>{
    const st = getStartTime(r);
    const day = extractDay(st);
    const wk = getWeekNum(day);
    weekData[wk]++;
    const sts = getS(r);
    if (sts === "completed") weekCompletedData[wk]++;
    else if (sts === "missed-call") weekMissedData[wk]++;
  });

  // --- Location Table (top 10) ---
  const locCounts = {};
  rows.forEach(r=>{const c=String(get(r,"FromCircle","fromcircle","From Circle")||"").toUpperCase().trim();if(c){const n=CIRCLE_MAP[c]||c;locCounts[n]=(locCounts[n]||0)+1;}});
  const topLocations = Object.entries(locCounts).sort((a,b)=>b[1]-a[1]).slice(0,10);

  const month = document.getElementById("monthSelect")?.value || "January";
  const projectName = document.getElementById("projectName")?.value || "Client";
  const weekFilter = document.getElementById("weekSelect")?.value || "All";

  // --- Issue Count & AHT Table (top 10) ---
  const issueCounts = {}, issueDurs = {};
  completed.forEach(r=>{const c=String(get(r,"DispositionCodes","dispositioncodes","Disposition Codes")||"").trim();if(c){issueCounts[c]=(issueCounts[c]||0)+1;if(!issueDurs[c])issueDurs[c]=[];issueDurs[c].push(safeNum(get(r,"ConversationDuration","conversationduration")));}});
  const topIssues = Object.entries(issueCounts).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([code,count])=>({code,count,avgAHT:secondsToHMS(Math.round((issueDurs[code]||[0]).reduce((a,b)=>a+b,0)/(issueDurs[code]||[1]).length))}));

  const issueCountTable = topIssues.map(({code,count,avgAHT}) => ({
    Month: month, Week: weekFilter, Date: "", Client: projectName, MOC: "Inbound",
    DispositionCodes: code, Count: count, "Average of ConversationDuration": avgAHT,
  }));

  // --- Difference Table ---
  const totalVolume = completed.length + missed.length + attempts.length;
  const taggedCount = completed.filter(r => { const c = String(get(r,"DispositionCodes","dispositioncodes","Disposition Codes")||"").trim(); return c.length > 0; }).length;
  const differenceTable = {
    "Total Volume": totalVolume,
    "Tagged": taggedCount,
    "Not Autotagged": totalVolume - taggedCount,
    "Query Count": topIssues.reduce((s,i)=>s+i.count,0),
  };

  // --- Interval-Wise Table ---
  const intervalCounts={};for(let i=0;i<24;i++)intervalCounts[i]=0;
  rows.forEach(r=>{const st=String(get(r,"StartTime","starttime","Start Time")||"").trim();if(!st)return;const timePart=st.split(/\s+/)[1]||'';let h=parseInt(timePart.split(":")[0],10);if(isNaN(h))h=parseInt(st.split(/[\s:]/)[2],10);if(isNaN(h))return;if(h>=0&&h<24)intervalCounts[h]++;});

  // Use actual days in the month (prompt: "total days in month")
  const monthIndex = MONTHS.indexOf(month);
  const year = parseInt(document.getElementById("yearSelect")?.value) || 2026;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const intervalAvg={};for(let i=0;i<24;i++)intervalAvg[i]=daysInMonth > 0 ? Math.round(intervalCounts[i]/daysInMonth) : 0;

  const intervalTable = Array.from({length:24},(_,i)=>({
    Month: month, Week: weekFilter, Date: "", Client: projectName,
    Intervals: i, Time: `(${i}-${i+1===24?"0":i+1} ${i<12?"AM":"PM"})`,
    Shifts: i<8?"Night":i<17?"Morning":"Evening",
    MOC: "Inbound", Count: intervalAvg[i],
  }));

  // --- Repeat Count Table (top 10) ---
  const repeatRaw = {};
  completed.forEach(r => {
    const c = String(get(r,"DispositionCodes","dispositioncodes","Disposition Codes")||"").trim();
    const from = String(get(r,"From","from")||"").trim();
    if (!c || !from) return;
    if (!repeatRaw[c]) repeatRaw[c] = new Set();
    repeatRaw[c].add(from);
  });
  const repeatTable = Object.entries(repeatRaw)
    .map(([code, fromSet]) => ({ code, count: fromSet.size }))
    .filter(x => x.count > 1)
    .sort((a,b) => b.count - a.count)
    .slice(0, 10)
    .map(({code, count}) => ({ DispositionCodes: code, "Count of Count of From": count }));

  // --- Final Summary Table (Table 6) ---
  const summaryTable = sortedDates.map(d => ({
    Date: d,
    "Inbound Calls": dateMap[d].completed + dateMap[d].missed + dateMap[d].attempts,
    Completed: dateMap[d].completed,
    "Missed Calls": dateMap[d].missed,
    "Inbound AHT": secondsToHMS(Math.round((dateAHT.find(x=>x.date===d)||{avgAHT:0}).avgAHT)),
    "Average Ring Time": secondsToHMS(Math.round((dateRing.find(x=>x.date===d)||{avgRing:0}).avgRing)),
    "Average Cost Per Call": `$${(dateCost.find(x=>x.date===d)||{avgCost:0}).avgCost.toFixed(4)}`,
    "Price": `$${dateCostSpend.find(x=>x.date===d).total.toFixed(2)}`,
    "Completed Call Price": `$${dateMap[d].priceCompleted.toFixed(2)}`,
    "Missed Call Price": `$${dateMap[d].priceMissed.toFixed(2)}`,
    "Call Attempt Price": `$${dateMap[d].priceAttempt.toFixed(2)}`,
  }));

  // Grand Total row
  const totalInbound = dateCallCounts.reduce((s,r)=>s+r.total,0);
  const totalCompleted = dateCallCounts.reduce((s,r)=>s+r.completed,0);
  const totalMissed = dateCallCounts.reduce((s,r)=>s+r.missed,0);
  const avgAHTAll = dateAHT.length ? dateAHT.reduce((s,r)=>s+r.avgAHT,0)/dateAHT.length : 0;
  const avgRingAll = dateRing.length ? dateRing.reduce((s,r)=>s+r.avgRing,0)/dateRing.length : 0;
  const avgCostAll = dateCost.length ? dateCost.reduce((s,r)=>s+r.avgCost,0)/dateCost.length : 0;
  summaryTable.push({
    Date: "Grand Total",
    "Inbound Calls": totalInbound,
    Completed: totalCompleted,
    "Missed Calls": totalMissed,
    "Inbound AHT": secondsToHMS(Math.round(avgAHTAll)),
    "Average Ring Time": secondsToHMS(Math.round(avgRingAll)),
    "Average Cost Per Call": `$${avgCostAll.toFixed(4)}`,
    "Price": `$${dateCostSpend.reduce((s,r)=>s+r.total,0).toFixed(2)}`,
    "Completed Call Price": `$${Object.values(dateMap).reduce((s,r)=>s+r.priceCompleted,0).toFixed(2)}`,
    "Missed Call Price": `$${Object.values(dateMap).reduce((s,r)=>s+r.priceMissed,0).toFixed(2)}`,
    "Call Attempt Price": `$${Object.values(dateMap).reduce((s,r)=>s+r.priceAttempt,0).toFixed(2)}`,
  });

  return {
    total:rows.length, completed:completed.length, missed:missed.length, attempts:attempts.length,
    avgAHT, avgRing, avgCostPerCall, totalCost, missedCost, attemptCost,
    weekData, weekCompletedData, weekMissedData, topLocations, topIssues, intervalAvg,
    dateCallCounts, dateAHT, dateRing, dateCost, dateCostSpend,
    summaryTable, issueCountTable, differenceTable, intervalTable, repeatTable,
  };
}

// =====================================================================
// ===== SLIDE 1: Cover =====
// =====================================================================
function renderSlide1() {
  const section = document.getElementById("dashboardSection");
  section.style.display = "block";

  const client = document.getElementById("projectName").value || "Client";
  const month = document.getElementById("monthSelect").value || "January";
  const year = document.getElementById("yearSelect").value || "2026";
  const range = document.getElementById("dateRange").value || `${month} ${year}`;

  document.getElementById("slide1Client").textContent = client;
  document.getElementById("slide1Month").textContent = `${month} ${year}`;
  document.getElementById("slide1Range").textContent = range;
}

// =====================================================================
// ===== SLIDE 2: Chat Volume =====
// =====================================================================
function renderSlide2() {
  const data = state.processed;
  if (!data || data.length === 0) return;

  const total = data.reduce((s, r) => s + r["Conversations"], 0);
  const closed = data.reduce((s, r) => s + r["Closed"], 0);
  const noReplyVal = data.reduce((s, r) => s + (r["No Reply"] || 0), 0);
  const reopenedVal = data.reduce((s, r) => s + r["Reopened"], 0);

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const weekData = [0, 0, 0, 0];
  const weekClosed = [0, 0, 0, 0];
  data.forEach(r => {
    const idx = weekLabels.indexOf(r.Week);
    if (idx >= 0) {
      weekData[idx] += r["Conversations"];
      weekClosed[idx] += r["Closed"];
    }
  });

  const medHandling = document.getElementById("manualHandlingTime").value.trim() || "—";
  const avgResp = document.getElementById("manualAvgResponse").value.trim() || "—";
  const avgFirstResp = document.getElementById("manualFirstResponse").value.trim() || "—";
  const fcr = closed > 0 ? Math.round(((closed - reopenedVal) / closed) * 100) + "%" : "N/A";

  const colors = ["#a78bfa", "#22c55e", "#ef4444", "#f43f5e"];

  document.getElementById("s2Kpis").innerHTML =
    `<div class="kpi-card" style="--kpi-color:${colors[0]}"><div class="kpi-val">${total.toLocaleString()}</div><div class="kpi-lbl">Chat Volume</div></div>` +
    `<div class="kpi-card" style="--kpi-color:${colors[1]}"><div class="kpi-val">${closed.toLocaleString()}</div><div class="kpi-lbl">Closed Chats</div></div>` +
    `<div class="kpi-card" style="--kpi-color:${colors[2]}"><div class="kpi-val">${noReplyVal.toLocaleString()}</div><div class="kpi-lbl">Closed With No Reply</div></div>` +
    `<div class="kpi-card" style="--kpi-color:${colors[3]}"><div class="kpi-val">${reopenedVal.toLocaleString()}</div><div class="kpi-lbl">Reopened Chats</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#3b82f6"><div class="kpi-val">${avgFirstResp}</div><div class="kpi-lbl">Avg First Response Time</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#eab308"><div class="kpi-val">${avgResp}</div><div class="kpi-lbl">Avg Response Time</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#f97316"><div class="kpi-val">${medHandling}</div><div class="kpi-lbl">Median Handling Time</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#06b6d4"><div class="kpi-val">${fcr}</div><div class="kpi-lbl">First Contact Rate</div></div>`;

  destroyChart("chartSlide2");
  createChart("chartSlide2", "bar", weekLabels, [
    {
      label: "Chat Volume",
      data: weekData,
      backgroundColor: weekData.map((v, i) =>
        `rgba(167,139,250,${0.4 + i * 0.15})`
      ),
      borderRadius: 4,
      borderColor: "rgba(167,139,250,0.8)",
      borderWidth: 1,
      order: 2
    },
    {
      label: "Closed Chats",
      type: 'line',
      data: weekClosed,
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.08)",
      borderWidth: 3,
      pointRadius: 6,
      pointBackgroundColor: "#22c55e",
      pointBorderColor: "#0b0d17",
      pointBorderWidth: 2,
      tension: 0.3,
      fill: true,
      order: 1,
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'top',
        offset: 4,
        color: '#22c55e',
        font: { size: 11, weight: '700' },
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowBlur: 3,
        formatter: v => v > 0 ? v.toLocaleString() : ''
      }
    }
  ], {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: 'rgba(255,255,255,0.6)',
          font: { size: 9, weight: '600' },
          boxWidth: 12,
          padding: 12,
          usePointStyle: true
        }
      },
      datalabels: {
        color: '#ffffff',
        font: { size: 14, weight: '800' },
        anchor: 'center',
        align: 'center',
        formatter: v => v > 0 ? v.toLocaleString() : '',
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowBlur: 4
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 9 } },
        grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
      },
      x: {
        ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10, weight: '600' } }
      }
    }
  });
}

// =====================================================================
// ===== SLIDE 3: Calls Volume =====
// =====================================================================
function renderSlide3() {
  const d = state.exotelKPIs;
  if (!d) return;

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const weekTotal = weekLabels.map(w => d.weekData[w] || 0);
  const weekCompleted = weekLabels.map(w => d.weekCompletedData[w] || 0);
  const weekMissed = weekLabels.map(w => d.weekMissedData[w] || 0);

  const aht = secondsToHMS(Math.round(d.avgAHT));
  const ring = secondsToHMS(Math.round(d.avgRing));

  document.getElementById("s3Kpis").innerHTML =
    `<div class="kpi-card" style="--kpi-color:#a78bfa"><div class="kpi-val">${d.total.toLocaleString()}</div><div class="kpi-lbl">Inbound Calls Volume</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#22c55e"><div class="kpi-val">${d.completed.toLocaleString()}</div><div class="kpi-lbl">Completed Calls</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#ef4444"><div class="kpi-val">${d.missed.toLocaleString()}</div><div class="kpi-lbl">Missed Calls</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#f97316"><div class="kpi-val">${aht}</div><div class="kpi-lbl">Avg Handling Time</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#06b6d4"><div class="kpi-val">${ring}</div><div class="kpi-lbl">Avg Ring + IVR Time</div></div>`;

  const maxVal = Math.max(...weekTotal, ...weekCompleted, 1);
  const yMax = Math.ceil(maxVal * 1.25);

  destroyChart("chartSlide3");
  createChart("chartSlide3", "bar", weekLabels, [
    {
      label: "Calls Volume",
      data: weekTotal,
      backgroundColor: weekTotal.map((v, i) =>
        `rgba(249,115,22,${0.4 + i * 0.15})`
      ),
      borderRadius: 4,
      borderColor: "rgba(249,115,22,0.8)",
      borderWidth: 1,
      order: 2
    },
    {
      label: "Completed Calls",
      type: 'line',
      data: weekCompleted,
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.08)",
      borderWidth: 3,
      pointRadius: 6,
      pointBackgroundColor: "#22c55e",
      pointBorderColor: "#0b0d17",
      pointBorderWidth: 2,
      tension: 0.3,
      fill: true,
      order: 1,
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'top',
        offset: 4,
        color: '#22c55e',
        font: { size: 11, weight: '700' },
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowBlur: 3,
        formatter: v => v > 0 ? v.toLocaleString() : ''
      }
    }
  ], {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: 'rgba(255,255,255,0.6)',
          font: { size: 9, weight: '600' },
          boxWidth: 12,
          padding: 12,
          usePointStyle: true
        }
      },
      datalabels: {
        color: '#ffffff',
        font: { size: 14, weight: '800' },
        anchor: 'center',
        align: 'center',
        formatter: v => v > 0 ? v.toLocaleString() : '',
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowBlur: 4
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: yMax,
        ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 9 } },
        grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
      },
      x: {
        ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10, weight: '600' } }
      }
    }
  });
}

// =====================================================================
// ===== SLIDE 4: Average Interval wise Volume =====
// =====================================================================
function computeChatIntervalData() {
  const hourCounts = {};
  for (let i = 0; i < 24; i++) hourCounts[i] = 0;
  const uniqueDays = new Set();

  for (const row of state.rawData) {
    const dateCol = findCol(row, "Created at", "created at", "Created At");
    if (!dateCol) continue;
    uniqueDays.add(extractDay(dateCol));
    const parts = String(dateCol).trim().split(/[\/\-\s:]/);
    const h = parseInt(parts[3], 10);
    if (h >= 0 && h < 24) hourCounts[h]++;
  }

  const daysInMonth = uniqueDays.size || 1;
  const avg = {};
  for (let i = 0; i < 24; i++) avg[i] = Math.round(hourCounts[i] / daysInMonth);
  return avg;
}

function formatIntervalLabel(h) {
  const start = h % 12 === 0 ? 12 : h % 12;
  const endH = (h + 1) % 24;
  const end = endH % 12 === 0 ? 12 : endH % 12;
  const ampm = endH < 12 ? 'AM' : 'PM';
  return `${start} - ${end} ${ampm}`;
}

function renderSlide4() {
  const exotel = state.exotelKPIs;
  if (!state.processed || state.processed.length === 0) return;

  const chatInterval = computeChatIntervalData();
  const callInterval = exotel ? exotel.intervalAvg : {};
  const hourLabels = Array.from({length:24}, (_, i) => formatIntervalLabel(i));

  const chatData = hourLabels.map((_, i) => chatInterval[i] || 0);
  const callData = hourLabels.map((_, i) => (callInterval[i] || 0));

  const chatMax = Math.max(...chatData, 1);
  const callMax = Math.max(...callData, 1);
  const chatYMax = Math.ceil(chatMax * 1.25);
  const callYMax = Math.ceil(callMax * 1.25);

  const axisOpts = {
    y: {
      beginAtZero: true,
      ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 8 } },
      grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
    },
    x: {
      ticks: {
        color: 'rgba(255,255,255,0.5)', font: { size: 7, weight: '600' },
        maxTicksLimit: 12, autoSkip: true
      }
    }
  };

  const purple = "#a78bfa";
  const orange = "#f97316";

  destroyChart("chartSlide4Chat");
  createChart("chartSlide4Chat", "bar", hourLabels, [{
    label: "Avg Chat Volume",
    data: chatData,
    backgroundColor: chatData.map((v, i) => `rgba(167,139,250,${0.35 + (i % 4) * 0.08})`),
    borderRadius: 3,
    borderColor: "rgba(167,139,250,0.5)",
    borderWidth: 0.5
  }], {
    plugins: {
      legend: { display: false },
      datalabels: {
        display: true,
        anchor: 'end', align: 'end', offset: 2,
        color: purple,
        font: { size: 8, weight: '700' },
        textShadowColor: 'rgba(0,0,0,0.6)', textShadowBlur: 3,
        formatter: v => v > 0 ? v : ''
      }
    },
    scales: { ...axisOpts, y: { ...axisOpts.y, max: chatYMax } }
  });

  destroyChart("chartSlide4Calls");
  createChart("chartSlide4Calls", "bar", hourLabels, [{
    label: "Avg Call Volume",
    data: callData,
    backgroundColor: callData.map((v, i) => `rgba(249,115,22,${0.35 + (i % 4) * 0.08})`),
    borderRadius: 3,
    borderColor: "rgba(249,115,22,0.5)",
    borderWidth: 0.5
  }], {
    plugins: {
      legend: { display: false },
      datalabels: {
        display: true,
        anchor: 'end', align: 'end', offset: 2,
        color: orange,
        font: { size: 8, weight: '700' },
        textShadowColor: 'rgba(0,0,0,0.6)', textShadowBlur: 3,
        formatter: v => v > 0 ? v : ''
      }
    },
    scales: { ...axisOpts, y: { ...axisOpts.y, max: callYMax } }
  });
}

// =====================================================================
// ===== SLIDE 5: Volume Status =====
// =====================================================================
function renderSlide5() {
  const data = state.processed;
  const exotel = state.exotelKPIs;
  if (!data || data.length === 0) return;

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const chatWeekly = [0, 0, 0, 0];
  data.forEach(r => {
    const idx = weekLabels.indexOf(r.Week);
    if (idx >= 0) chatWeekly[idx] += r["Conversations"];
  });

  const chatTotal = chatWeekly.reduce((a, b) => a + b, 0);
  const histChatVal = parseFloat(document.getElementById("manualHistAvgChats").value) || 0;
  const chatDiff = chatTotal - histChatVal;
  const chatDiffSign = chatDiff >= 0 ? "+" : "";

  const callTotal = exotel ? Object.values(exotel.weekData).reduce((a, b) => a + b, 0) : 0;
  const histCallVal = parseFloat(document.getElementById("manualHistAvgCalls").value) || 0;
  const callDiff = callTotal - histCallVal;
  const callDiffSign = callDiff >= 0 ? "+" : "";

  function renderCards(containerId, histVal, currentVal, diff, diffSign, color) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const diffColor = diff >= 0 ? "#22c55e" : "#ef4444";
    el.innerHTML =
      `<div class="slide5-card"><div class="val" style="color:rgba(255,255,255,0.6)">${histVal.toLocaleString()}</div><div class="lbl">Historical Avg</div></div>` +
      `<div class="slide5-card"><div class="val" style="color:${color}">${currentVal.toLocaleString()}</div><div class="lbl">Current Volume</div></div>` +
      `<div class="slide5-card"><div class="val" style="color:${diffColor}">${diffSign}${diff.toLocaleString()}</div><div class="lbl">Difference</div></div>`;
  }

  function renderStatus(containerId, currentVal, histVal, label) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (currentVal > histVal) {
      el.textContent = `This month's ${label} volume is higher than normal`;
      el.style.color = "#22c55e";
    } else if (currentVal < histVal) {
      el.textContent = `This month's ${label} volume is lower than normal`;
      el.style.color = "#ef4444";
    } else {
      el.textContent = `This month's ${label} volume is at normal levels`;
      el.style.color = "rgba(255,255,255,0.5)";
    }
  }

  renderCards("s5ChatCards", histChatVal, chatTotal, chatDiff, chatDiffSign, "#a78bfa");
  renderStatus("s5ChatStatus", chatTotal, histChatVal, "chat");
  renderCards("s5CallCards", histCallVal, callTotal, callDiff, callDiffSign, "#f97316");
  renderStatus("s5CallStatus", callTotal, histCallVal, "call");

  const chatYMax = Math.ceil(Math.max(chatTotal, histChatVal, 1) * 1.25);
  const callYMax = Math.ceil(Math.max(callTotal, histCallVal, 1) * 1.25);

  function buildComparisonChart(canvasId, currentVal, histVal, color, yMax) {
    destroyChart(canvasId);
    createChart(canvasId, "bar", ["Current", "Historical"], [
      {
        label: "Volume",
        data: [currentVal, histVal],
        backgroundColor: [color, "rgba(255,255,255,0.15)"],
        borderColor: [color, "rgba(255,255,255,0.25)"],
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.5
      }
    ], {
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          anchor: 'end', align: 'end', offset: 4,
          color: '#fff',
          font: { size: 13, weight: '800' },
          textShadowColor: 'rgba(0,0,0,0.6)', textShadowBlur: 3,
          formatter: v => v.toLocaleString()
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: yMax,
          ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 8 } },
          grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
        },
        x: {
          ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 11, weight: '700' } }
        }
      }
    });
  }

  buildComparisonChart("chartSlide5Chat", chatTotal, histChatVal, "#a78bfa", chatYMax);
  buildComparisonChart("chartSlide5Calls", callTotal, histCallVal, "#f97316", callYMax);
}

// =====================================================================
// ===== India Map Drawing Utility =====
// =====================================================================
var INDIA_BORDER = [
  [37.0,73.5],[36.5,74.5],[35.5,76.0],[34.5,77.5],[33.5,78.5],[32.5,79.0],
  [31.5,79.5],[30.5,80.5],[29.5,81.0],[28.5,82.0],[27.5,83.5],[27.0,85.0],
  [27.5,86.5],[27.5,88.0],[27.0,89.0],[26.5,90.0],[26.0,90.5],[25.5,89.5],
  [24.5,89.0],[23.5,89.5],[22.5,88.5],[22.0,88.0],[21.5,87.5],[21.0,87.0],
  [20.5,86.5],[20.0,86.0],[19.5,85.5],[19.0,85.0],[18.5,84.5],[18.0,84.0],
  [17.5,83.5],[17.0,83.0],[16.5,82.0],[16.0,81.5],[15.5,81.0],[15.0,80.5],
  [14.5,80.5],[14.0,80.5],[13.5,80.5],[13.0,80.5],[12.5,80.5],[12.0,80.0],
  [11.5,80.0],[11.0,79.5],[10.5,79.5],[10.0,79.0],[9.5,78.5],[9.0,78.0],
  [8.5,77.5],[8.0,77.5],[8.5,77.0],[9.0,76.5],[9.5,76.5],[10.0,76.5],
  [10.5,76.5],[11.0,76.0],[11.5,76.0],[12.0,75.5],[12.5,75.5],[13.0,75.0],
  [13.5,75.0],[14.0,74.5],[14.5,74.5],[15.0,74.5],[15.5,74.0],[16.0,74.0],
  [16.5,74.0],[17.0,73.5],[17.5,73.5],[18.0,73.0],[18.5,73.0],[19.0,73.0],
  [19.5,73.0],[20.0,72.5],[20.5,72.5],[21.0,72.5],[21.5,72.0],[22.0,71.5],
  [22.5,71.0],[23.0,70.0],[23.5,69.5],[24.0,69.0],[24.5,68.5],[25.0,68.5],
  [25.5,69.0],[26.0,69.5],[26.5,70.0],[27.0,70.5],[27.5,71.0],[28.0,71.0],
  [28.5,71.5],[29.0,72.0],[29.5,72.0],[30.0,72.5],[30.5,73.0],[31.0,73.5],
  [31.5,74.0],[32.0,74.0],[32.5,74.0],[33.0,74.0],[33.5,73.5],[34.0,73.5],
  [34.5,73.5],[35.0,73.0],[35.5,73.0],[36.0,73.0],[36.5,73.0],[37.0,73.5]
];

var STATE_COORDS = {
  "andhra pradesh": [16.0, 80.5], "arunachal pradesh": [28.0, 94.0],
  "assam": [26.5, 93.0], "bihar": [25.5, 85.5], "chhattisgarh": [21.5, 82.0],
  "delhi": [28.7, 77.1], "goa": [15.5, 74.0], "gujarat": [22.5, 72.0],
  "haryana": [29.5, 76.0], "himachal pradesh": [32.0, 77.0],
  "jammu & kashmir": [34.0, 76.0], "jharkhand": [23.5, 85.5],
  "karnataka": [15.0, 76.0], "kerala": [10.5, 76.5],
  "madhya pradesh": [23.5, 78.0], "maharashtra": [19.0, 75.0],
  "manipur": [25.0, 94.0], "meghalaya": [25.5, 91.5], "mizoram": [23.0, 93.0],
  "nagaland": [26.0, 94.5], "odisha": [20.5, 84.5], "orissa": [20.5, 84.5],
  "punjab": [31.0, 75.5], "rajasthan": [26.5, 74.0], "sikkim": [27.5, 88.5],
  "tamil nadu": [11.0, 78.5], "telangana": [18.0, 79.5],
  "tripura": [24.0, 92.0], "uttar pradesh": [27.0, 80.5],
  "uttarakhand": [30.0, 79.0], "west bengal": [23.0, 88.0],
  "andaman & nicobar": [11.5, 92.5], "lakshadweep": [10.5, 72.5],
  "dadra and nagar haveli": [20.5, 73.0], "chandigarh": [30.7, 76.8]
};

var CITY_COORDS = {
  "mumbai": [19.0760, 72.8777],
  "bombay": [19.0760, 72.8777],
  "delhi": [28.7041, 77.1025],
  "new delhi": [28.7041, 77.1025],
  "bangalore": [12.9716, 77.5946],
  "bengaluru": [12.9716, 77.5946],
  "hyderabad": [17.3850, 78.4867],
  "chennai": [13.0827, 80.2707],
  "madras": [13.0827, 80.2707],
  "kolkata": [22.5726, 88.3639],
  "calcutta": [22.5726, 88.3639],
  "pune": [18.5204, 73.8567],
  "ahmedabad": [23.0225, 72.5714],
  "jaipur": [26.9124, 75.7873],
  "lucknow": [26.8467, 80.9462],
  "surat": [21.1702, 72.8311],
  "chandigarh": [30.7333, 76.7794],
  "bhopal": [23.2599, 77.4126],
  "indore": [22.7196, 75.8577],
  "patna": [25.5941, 85.1376],
  "nagpur": [21.1458, 79.0882],
  "coimbatore": [11.0168, 76.9558],
  "kochi": [9.9312, 76.2673],
  "cochin": [9.9312, 76.2673],
  "visakhapatnam": [17.6868, 83.2185],
  "vizag": [17.6868, 83.2185],
  "vadodara": [22.3072, 73.1812],
  "baroda": [22.3072, 73.1812],
  "thiruvananthapuram": [8.5241, 76.9366],
  "trivandrum": [8.5241, 76.9366],
  "guwahati": [26.1445, 91.7362],
  "gurgaon": [28.4595, 77.0266],
  "noida": [28.5355, 77.3910],
  "srinagar": [34.0837, 74.7973],
  "amritsar": [31.6340, 74.8723],
  "dehradun": [30.3165, 78.0322],
  "ranchi": [23.3441, 85.3096],
  "raipur": [21.2514, 81.6296],
  "bhubaneswar": [20.2961, 85.8245],
  "goa": [15.4909, 73.8278],
  "panaji": [15.4909, 73.8278],
  "mysore": [12.2958, 76.6394],
  "mangalore": [12.9141, 74.8560],
  "tirupati": [13.6288, 79.4192],
  "madurai": [9.9252, 78.1198],
  "vijayawada": [16.5062, 80.6480],
  "agra": [27.1767, 78.0081],
  "varanasi": [25.3176, 82.9739],
  "jodhpur": [26.2389, 73.0243],
  "udaipur": [24.5854, 73.7125],
  "kanpur": [26.4499, 80.3319]
};

function drawIndiaMap(canvasId, locationData, dotColor, maxVal) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var ow = canvas.offsetWidth, oh = canvas.offsetHeight;
  if (ow === 0 || oh === 0) { ow = 599; oh = 625; }
  canvas.width = ow;
  canvas.height = oh;
  var ctx = canvas.getContext("2d");
  var W = ow, H = oh;

  ctx.clearRect(0, 0, W, H);

  // projection bounds
  var MIN_LAT = 6.5, MAX_LAT = 37.5, MIN_LNG = 68.0, MAX_LNG = 97.5;
  var pad = 0.08;
  var scaleX = W * (1 - 2 * pad) / (MAX_LNG - MIN_LNG);
  var scaleY = H * (1 - 2 * pad) / (MAX_LAT - MIN_LAT);
  var ox = W * pad, oy = H * pad;

  function toXY(lat, lng) {
    return [ox + (lng - MIN_LNG) * scaleX, H - oy - (lat - MIN_LAT) * scaleY];
  }

  // Draw India outline
  ctx.beginPath();
  var start = toXY(INDIA_BORDER[0][0], INDIA_BORDER[0][1]);
  ctx.moveTo(start[0], start[1]);
  for (var i = 1; i < INDIA_BORDER.length; i++) {
    var pt = toXY(INDIA_BORDER[i][0], INDIA_BORDER[i][1]);
    ctx.lineTo(pt[0], pt[1]);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(30,50,80,0.3)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // If no data, stop here
  if (!locationData || locationData.length === 0) return;

  if (maxVal === undefined || maxVal === 0) {
    maxVal = 1;
    for (var j = 0; j < locationData.length; j++) {
      if (locationData[j][1] > maxVal) maxVal = locationData[j][1];
    }
  }

  var RADIUS_MIN = 4, RADIUS_MAX = 22;

  for (var k = 0; k < locationData.length; k++) {
    var entry = locationData[k];
    var cityName = String(entry[0] || "").trim();
    var count = entry[1];
    if (!cityName || count <= 0) continue;

    var lookup = cityName.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    var coords = CITY_COORDS[lookup] || STATE_COORDS[lookup];
    if (!coords) {
      // Try partial match in cities
      var ckeys = Object.keys(CITY_COORDS);
      for (var ci = 0; ci < ckeys.length; ci++) {
        if (lookup.indexOf(ckeys[ci]) !== -1) {
          coords = CITY_COORDS[ckeys[ci]];
          break;
        }
      }
    }
    if (!coords) {
      // Try partial match in states
      var skeys = Object.keys(STATE_COORDS);
      for (var si = 0; si < skeys.length; si++) {
        if (lookup.indexOf(skeys[si]) !== -1) {
          coords = STATE_COORDS[skeys[si]];
          break;
        }
      }
    }
    if (!coords) continue;

    var pos = toXY(coords[0], coords[1]);
    var r = RADIUS_MIN + (count / maxVal) * (RADIUS_MAX - RADIUS_MIN);
    if (k === 0) r = r * 1.3;

    // Outer glow
    var glowR = r * (k === 0 ? 3 : 2.5);
    var grad = ctx.createRadialGradient(pos[0], pos[1], 0, pos[0], pos[1], glowR);
    grad.addColorStop(0, dotColor.replace("0.75","0.25"));
    grad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Dot
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Count label
    var countSize = Math.max(8, Math.min(13, 7 + r * 0.3));
    if (k === 0) countSize = Math.min(countSize * 1.2, 16);
    ctx.fillStyle = "#fff";
    ctx.font = "bold " + countSize + "px Inter,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 4;
    ctx.fillText(count, pos[0], pos[1] + 0.5);
    ctx.shadowBlur = 0;

    // City name below dot — top city gets larger font
    var nameFontSize = k === 0 ? 9 : 7;
    ctx.fillStyle = k === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)";
    ctx.font = (k === 0 ? "700" : "600") + " " + nameFontSize + "px Inter,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 3;
    ctx.fillText(cityName, pos[0], pos[1] + r + 2);
    ctx.shadowBlur = 0;
  }
}

// =====================================================================
// ===== SLIDE 6: Top Locations (India Map) =====
// =====================================================================
function renderSlide6() {
  var data = state.processed;
  var exotel = state.exotelKPIs;
  if (!data || data.length === 0) return;

  // Chat locations
  var locTotals = {};
  for (var r = 0; r < data.length; r++) {
    try {
      var locs = JSON.parse(data[r].Locations || "{}");
      var keys = Object.keys(locs);
      for (var k = 0; k < keys.length; k++) {
        var city = keys[k];
        locTotals[city] = (locTotals[city] || 0) + locs[city];
      }
    } catch (_) {}
  }
  var chatLocations = Object.entries(locTotals).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 10);

  // Call locations
  var callLocations = exotel ? (exotel.topLocations || []) : [];
  // Map exotel topLocations from {name, count} format to [name, count]
  if (callLocations.length > 0 && typeof callLocations[0] === 'object' && callLocations[0].name !== undefined) {
    callLocations = callLocations.map(function(l) { return [l.name, l.count]; });
  }
  callLocations = callLocations.sort(function(a, b) { return b[1] - a[1]; }).slice(0, 10);

  // Find max for scaling
  var chatMax = 1, callMax = 1;
  for (var i = 0; i < chatLocations.length; i++) if (chatLocations[i][1] > chatMax) chatMax = chatLocations[i][1];
  for (var j = 0; j < callLocations.length; j++) if (callLocations[j][1] > callMax) callMax = callLocations[j][1];
  var globalMax = Math.max(chatMax, callMax);

  destroyChart("chartSlide6Chat");
  destroyChart("chartSlide6Calls");
  drawIndiaMap("mapSlide6Chat", chatLocations, "rgba(139,92,246,0.75)", globalMax);
  drawIndiaMap("mapSlide6Calls", callLocations, "rgba(249,115,22,0.75)", globalMax);
}

// =====================================================================
// ===== SLIDE 7: Issue Count =====
// =====================================================================
function renderSlide7() {
  const exotel = state.exotelKPIs;
  if (!state.processed || state.processed.length === 0) return;

  const tagCounts = {};
  for (const row of state.rawData) {
    const tag = findCol(row, "Conversation tags", "conversation tags", "Conversation Tags");
    if (!tag || !String(tag).trim()) continue;
    String(tag).split(",").map(t => t.trim()).filter(Boolean).forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  }
  const chatTop = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const callTop = exotel ? (exotel.topIssues || []).map(i => [i.code, i.count]) : [];

  function buildVertBar(canvasId, labels, values, color) {
    destroyChart(canvasId);
    createChart(canvasId, "bar", labels, [{
      label: "Count",
      data: values,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 0.5,
      borderRadius: 3
    }], {
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          anchor: 'end', align: 'end', offset: 2,
          color: '#fff',
          font: { size: 9, weight: '700' },
          textShadowColor: 'rgba(0,0,0,0.6)', textShadowBlur: 3
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 8 } },
          grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
        },
        x: {
          ticks: {
            color: 'rgba(255,255,255,0.6)', font: { size: 7, weight: '600' },
            maxRotation: 35, minRotation: 35
          },
          grid: { display: false }
        }
      }
    });
  }

  const chatLabels = chatTop.map(e => e[0]);
  const chatValues = chatTop.map(e => e[1]);
  const callLabels = callTop.map(e => e[0]);
  const callValues = callTop.map(e => e[1]);

  buildVertBar("chartSlide7Chat", chatLabels, chatValues, "rgba(167,139,250,0.7)");
  buildVertBar("chartSlide7Calls", callLabels, callValues, "rgba(249,115,22,0.7)");
}

// =====================================================================
// ===== SLIDE 8: Repeat Customer Count =====
// =====================================================================
function renderSlide8() {
  var exotel = state.exotelKPIs;

  var callTop = exotel ? (exotel.repeatTable || []).map(function(r) {
    return [r.DispositionCodes, r["Count of Count of From"] || r.count];
  }) : [];

  destroyChart("chartSlide8Calls");
  if (!callTop || callTop.length === 0) return;

  var labels = callTop.map(function(e) { return e[0]; });
  var values = callTop.map(function(e) { return e[1]; });

  createChart("chartSlide8Calls", "bar", labels, [{
    label: "Repeat Customers",
    data: values,
    backgroundColor: "rgba(249,115,22,0.7)",
    borderColor: "#f97316",
    borderWidth: 0.5,
    borderRadius: 3
  }], {
    plugins: {
      legend: { display: false },
      datalabels: {
        display: true,
        anchor: 'end', align: 'end', offset: 2,
        color: '#fff',
        font: { size: 9, weight: '700' },
        textShadowColor: 'rgba(0,0,0,0.6)', textShadowBlur: 3
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 8 } },
        grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
      },
      x: {
        ticks: {
          color: 'rgba(255,255,255,0.6)', font: { size: 7, weight: '600' },
          maxRotation: 35, minRotation: 35
        },
        grid: { display: false }
      }
    }
  });
}

// =====================================================================
// ===== SLIDE 9: Disposition Count & Volume Comparison =====
// =====================================================================
function renderSlide9() {
  const data = state.processed;
  const exotel = state.exotelKPIs;
  if (!data || data.length === 0) return;

  const chatCompleted = data.reduce((s, r) => s + r["Closed"], 0);
  const chatDisposed = data.reduce((s, r) => s + r["Tagged"], 0);
  const chatRate = chatCompleted > 0 ? ((chatDisposed / chatCompleted) * 100).toFixed(1) : "—";

  let callDisposed = 0;
  if (exotel && state.exotelRaw) {
    for (const r of state.exotelRaw) {
      const s = String(findCol(r, "Status", "status") || "").toLowerCase().trim();
      const c = String(findCol(r, "DispositionCodes", "dispositioncodes", "Disposition Codes") || "").trim();
      if (s === "completed" && c.length > 0) callDisposed++;
    }
  }
  const callCompleted = exotel ? exotel.completed : 0;
  const callRate = callCompleted > 0 ? ((callDisposed / callCompleted) * 100).toFixed(1) : "—";

  document.getElementById("s9ChatRate").textContent = `${chatRate}%`;
  document.getElementById("s9ChatRate").style.color = chatDisposed >= chatCompleted / 2 ? "#22c55e" : "#f97316";
  document.getElementById("s9CallRate").textContent = `${callRate}%`;
  document.getElementById("s9CallRate").style.color = callDisposed >= callCompleted / 2 ? "#22c55e" : "#f97316";

  document.getElementById("s9ChatInsight").textContent =
    `${chatDisposed.toLocaleString()} out of ${chatCompleted.toLocaleString()} closed chats were tagged (${chatRate}%)`;
  document.getElementById("s9ChatInsight").style.color =
    chatDisposed >= chatCompleted / 2 ? "rgba(34,197,94,0.7)" : "rgba(239,68,68,0.7)";

  document.getElementById("s9CallInsight").textContent =
    `${callDisposed.toLocaleString()} out of ${callCompleted.toLocaleString()} completed calls were disposed (${callRate}%)`;
  document.getElementById("s9CallInsight").style.color =
    callDisposed >= callCompleted / 2 ? "rgba(34,197,94,0.7)" : "rgba(239,68,68,0.7)";

  function buildComparisonBar(canvasId, completedVal, disposedVal, label1, label2, color) {
    destroyChart(canvasId);
    const yMax = Math.ceil(Math.max(completedVal, disposedVal, 1) * 1.2);
    createChart(canvasId, "bar", [label1, label2], [
      {
        label: "Volume",
        data: [completedVal, disposedVal],
        backgroundColor: ["rgba(34,197,94,0.75)", color],
        borderColor: ["#22c55e", "rgba(249,115,22,0.75)"],
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      }
    ], {
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          anchor: 'end', align: 'end', offset: 4,
          color: '#fff',
          font: { size: 16, weight: '800' },
          textShadowColor: 'rgba(0,0,0,0.7)', textShadowBlur: 4
        }
      },
      scales: {
        x: {
          ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 11, weight: '700' } },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          max: yMax,
          ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 8 } },
          grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
        }
      }
    });
  }

  buildComparisonBar("chartSlide9Chat", chatCompleted, chatDisposed, "Closed", "Tagged", "rgba(167,139,250,0.75)");
  buildComparisonBar("chartSlide9Calls", callCompleted, callDisposed, "Completed", "Disposed", "rgba(249,115,22,0.75)");
}

// =====================================================================
// ===== SLIDE 10: Escalation Count =====
// =====================================================================
function renderSlide10() {
  const escData = getTableData("escalationData");
  if (!escData || escData.length === 0) return;

  const labels = [];
  const resolvedArr = [];
  const pendingArr = [];
  const otherArr = [];
  let totalSum = 0, resolvedSum = 0, pendingSum = 0;

  const sorted = [...escData].sort((a, b) => (parseInt(b[1], 10) || 0) - (parseInt(a[1], 10) || 0));

  sorted.forEach(row => {
    const name = String(row[0] || "").trim();
    const total = parseInt(row[1], 10) || 0;
    const resolved = parseInt(row[2], 10) || 0;
    const pending = parseInt(row[3], 10) || 0;
    const other = Math.max(0, total - resolved - pending);

    labels.push(name);
    resolvedArr.push(resolved);
    pendingArr.push(pending);
    otherArr.push(other);
    totalSum += total;
    resolvedSum += resolved;
    pendingSum += pending;
  });

  document.getElementById("s10Kpis").innerHTML =
    `<div class="kpi-card" style="--kpi-color:#8b5cf6"><div class="kpi-val">${totalSum.toLocaleString()}</div><div class="kpi-lbl">Total Escalations</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#22c55e"><div class="kpi-val">${resolvedSum.toLocaleString()}</div><div class="kpi-lbl">Resolved</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#fb7185"><div class="kpi-val">${pendingSum.toLocaleString()}</div><div class="kpi-lbl">Pending</div></div>`;

  let tableHtml = `<table><thead><tr><th>Issue Type</th><th>Total</th><th>Resolved</th><th>Pending</th><th>Reason / Status</th></tr></thead><tbody>`;
  sorted.forEach(row => {
    const name = String(row[0] || "").trim();
    const total = parseInt(row[1], 10) || 0;
    const resolved = parseInt(row[2], 10) || 0;
    const pending = parseInt(row[3], 10) || 0;
    const reason = String(row[4] || "").trim();
    tableHtml += `<tr><td>${name}</td><td>${total}</td><td>${resolved}</td><td>${pending}</td><td>${reason}</td></tr>`;
  });
  tableHtml += `</tbody></table>`;
  document.getElementById("s10TableWrap").innerHTML = tableHtml;

  destroyChart("chartSlide10");
  createChart("chartSlide10", "bar", labels, [
    {
      label: "Resolved",
      data: resolvedArr,
      backgroundColor: "rgba(34,197,94,0.75)",
      borderColor: "#22c55e",
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: "Pending",
      data: pendingArr,
      backgroundColor: "rgba(251,113,133,0.75)",
      borderColor: "#fb7185",
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: "Other",
      data: otherArr,
      backgroundColor: "rgba(255,255,255,0.1)",
      borderColor: "rgba(255,255,255,0.15)",
      borderWidth: 1,
      borderRadius: 2
    }
  ], {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true, position: 'bottom',
        labels: {
          color: 'rgba(255,255,255,0.5)', font: { size: 8, weight: '600' },
          boxWidth: 10, padding: 8, usePointStyle: true
        }
      },
      datalabels: { display: false }
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 8 } },
        grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
      },
      y: {
        stacked: true,
        ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 8, weight: '600' } },
        grid: { display: false }
      }
    }
  });
}

// =====================================================================
// ===== SLIDE 11: Amount Spent by Subscription =====
// =====================================================================
function renderSlide11() {
  const payData = getTableData("paymentData");
  const sideEl = document.getElementById("s11Side");
  const bottomEl = document.getElementById("s11Bottom");

  if (!payData || payData.length === 0) {
    sideEl.innerHTML = '<div style="color:rgba(255,255,255,0.3);font-size:9px;text-align:center;padding:20px">No rows found in Payment Details sheet. Open Editor → Payment Details tab, enter data, click Save All Sheets, then regenerate.</div>';
    bottomEl.innerHTML = '';
    destroyChart("chartSlide11");
    return;
  }

  let intercomAmt = 0, exotelAmt = 0, gst = 0;
  let intercomSeats = 0, exotelSeats = 0, doubletickSeats = 0;

  payData.forEach((row, idx) => {
    const col0 = String(row[0] || "").trim();
    const col1 = String(row[1] || "").trim();
    const combined = (col0 + " " + col1).toLowerCase();
    const cleanNum = function(v) { return String(v).replace(/[^0-9.\-]/g, ""); };
    const amtInt = parseFloat(cleanNum(row[7])) || 0;
    const tax = parseFloat(cleanNum(row[8])) || 0;
    const agents = parseInt(cleanNum(row[13]), 10) || 0;

    if (combined.includes("intercom")) {
      intercomAmt += amtInt;
      if (agents > 0) intercomSeats = Math.max(intercomSeats, agents);
    } else if (combined.includes("exotel")) {
      exotelAmt += amtInt;
      if (agents > 0) exotelSeats = Math.max(exotelSeats, agents);
    } else if (combined.includes("doubletick") || combined.includes("double")) {
      if (agents > 0) doubletickSeats = Math.max(doubletickSeats, agents);
    }

    gst += tax;
  });

  intercomAmt = Math.round(intercomAmt);
  exotelAmt = Math.round(exotelAmt);
  gst = Math.round(gst);
  const totalSubs = intercomAmt + exotelAmt;

  var fmt = function(v) { return '₹' + Number(v).toLocaleString('en-IN'); };

  sideEl.innerHTML =
    '<div class="kpi-card" style="--kpi-color:#a78bfa"><div class="kpi-val">' + fmt(totalSubs) + '</div><div class="kpi-lbl">Amount Spent (Incl. GST)</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#f59e0b"><div class="kpi-val">' + fmt(gst) + '</div><div class="kpi-lbl">GST</div></div>';

  bottomEl.innerHTML =
    '<div class="kpi-card" style="--kpi-color:#60a5fa"><div class="kpi-val">' + intercomSeats.toLocaleString('en-IN') + '</div><div class="kpi-lbl">Intercom Seats</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#34d399"><div class="kpi-val">' + exotelSeats.toLocaleString('en-IN') + '</div><div class="kpi-lbl">Exotel Seats</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#fb923c"><div class="kpi-val">' + doubletickSeats.toLocaleString('en-IN') + '</div><div class="kpi-lbl">Doubletick Seats</div></div>';

  destroyChart("chartSlide11");
  if (intercomAmt === 0 && exotelAmt === 0) return;

  createChart("chartSlide11", "pie", ["Intercom", "Exotel"], [
    {
      data: [intercomAmt, exotelAmt],
      backgroundColor: ["rgba(139,92,246,0.75)", "rgba(249,115,22,0.75)"],
      borderColor: ["#8b5cf6", "#f97316"],
      borderWidth: 2
    }
  ], {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255,255,255,0.6)', font: { size: 10, weight: '600' },
          padding: 12, usePointStyle: true, boxWidth: 12
        }
      },
      tooltip: {
        callbacks: {
          label: function(ctx) {
            return ctx.label + ': ₹' + Math.round(ctx.raw).toLocaleString('en-IN');
          }
        }
      },
      datalabels: {
        color: '#fff', font: { size: 11, weight: '700' },
        formatter: function(v) { return '₹' + Math.round(v).toLocaleString('en-IN'); }
      }
    }
  });
}

// =====================================================================
// ===== SLIDE 12: Product Management / Agent Productivity =====
// =====================================================================
function renderSlide12() {
  const prodData = getTableData("agentProdData");
  const sideEl = document.getElementById("s12Side");

  if (!prodData || prodData.length === 0) {
    sideEl.innerHTML = '<div style="color:rgba(255,255,255,0.3);font-size:9px;text-align:center;padding:20px">No data in Agent Productivity sheet. Open Editor → Agent Productivity tab, enter data, click Save All Sheets, then regenerate.</div>';
    destroyChart("chartSlide12");
    return;
  }

  const rows = [];
  let totalAgents = 0, nonVoiceAgents = 0, inboundAgents = 0, whatsappAgents = 0;

  const cleanNum = function(v) { return parseFloat(String(v).replace(/[^0-9.\-]/g, "")) || 0; };

  prodData.forEach(row => {
    const name = String(row[0] || "").trim();
    if (!name) return;
    const chats = cleanNum(row[1]);
    const calls = cleanNum(row[2]);
    const whatsapp = cleanNum(row[3]);
    rows.push({ name, chats, calls, whatsapp, total: chats + calls + whatsapp });
    totalAgents++;
    if (chats > 0) nonVoiceAgents++;
    if (calls > 0) inboundAgents++;
    if (whatsapp > 0) whatsappAgents++;
  });

  rows.sort(function(a, b) { return b.total - a.total; });

  const labels = rows.map(function(r) { return r.name; });
  const chatsArr = rows.map(function(r) { return r.chats; });
  const callsArr = rows.map(function(r) { return r.calls; });
  const whatsappArr = rows.map(function(r) { return r.whatsapp; });

  sideEl.innerHTML =
    '<div class="kpi-card" style="--kpi-color:#a78bfa"><div class="kpi-val">' + totalAgents + '</div><div class="kpi-lbl">Total Agents</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#60a5fa"><div class="kpi-val">' + nonVoiceAgents + '</div><div class="kpi-lbl">Non-Voice Agents (Chats)</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#34d399"><div class="kpi-val">' + inboundAgents + '</div><div class="kpi-lbl">Inbound Agents (Calls)</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#fb923c"><div class="kpi-val">' + whatsappAgents + '</div><div class="kpi-lbl">WhatsApp Agents</div></div>';

  destroyChart("chartSlide12");
  createChart("chartSlide12", "bar", labels, [
    {
      label: "Chats",
      data: chatsArr,
      backgroundColor: "rgba(139,92,246,0.75)",
      borderColor: "#8b5cf6",
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: "Calls",
      data: callsArr,
      backgroundColor: "rgba(34,197,94,0.75)",
      borderColor: "#22c55e",
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: "WhatsApp",
      data: whatsappArr,
      backgroundColor: "rgba(251,146,60,0.75)",
      borderColor: "#fb923c",
      borderWidth: 1,
      borderRadius: 2
    }
  ], {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true, position: 'bottom',
        labels: {
          color: 'rgba(255,255,255,0.5)', font: { size: 8, weight: '600' },
          boxWidth: 10, padding: 8, usePointStyle: true
        }
      },
      datalabels: {
        anchor: 'center',
        align: function(ctx) {
          var val = ctx.dataset.data[ctx.dataIndex];
          return val > 3 ? 'center' : 'end';
        },
        offset: 0,
        color: 'rgba(255,255,255,0.7)',
        font: { size: 6, weight: '700' },
        formatter: function(v) { return v > 0 ? v : ''; }
      }
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 8 } },
        grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
      },
      y: {
        stacked: true,
        ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 8, weight: '600' } },
        grid: { display: false }
      }
    }
  });
}

// =====================================================================
// ===== SLIDE 13: Top & Bottom Performers =====
// =====================================================================
function renderSlide13() {
  var data = getTableData("agentKpiData");
  var wrap = document.getElementById("s13TableWrap");

  if (!data || data.length === 0) {
    wrap.innerHTML = '<div style="color:rgba(255,255,255,0.3);font-size:9px;text-align:center;padding:20px">No data in Agent KPI sheet. Open Editor → Agent KPI tab, enter data, click Save All Sheets, then regenerate.</div>';
    destroyChart("chartSlide13Top");
    destroyChart("chartSlide13Bottom");
    return;
  }

  var agents = [];
  var clean = function(v) { return parseFloat(String(v).replace(/[^0-9.\-]/g, "")) || 0; };
  var fmtNum = function(v) { return Number(v).toLocaleString('en-IN'); };

  data.forEach(function(row) {
    var name = String(row[0] || "").trim();
    if (!name) return;
    agents.push({
      name: name,
      attendance: clean(row[1]),
      quality: clean(row[4]),
      productivity: clean(row[8]),
      achieved: clean(row[15])
    });
  });

  agents.sort(function(a, b) { return b.achieved - a.achieved; });
  var n = agents.length;
  var split = Math.ceil(n / 2);
  var topArr = agents.slice(0, split);
  var bottomArr = agents.slice(split).reverse();

  var chartOpts = function() {
    return {
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        datalabels: {
          anchor: 'end', align: 'end', offset: 2,
          color: 'rgba(255,255,255,0.6)',
          font: { size: 7, weight: '700' },
          formatter: function(v) { return v > 0 ? fmtNum(v) : ''; }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 6.5 } },
          grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
        },
        y: {
          ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 6.5, weight: '600' } },
          grid: { display: false }
        }
      }
    };
  };

  var buildChart = function(canvasId, arr, color) {
    destroyChart(canvasId);
    var labels = arr.map(function(a) { return a.name; });
    var vals = arr.map(function(a) { return a.achieved; });
    createChart(canvasId, "bar", labels, [{
      label: "Achieved Points",
      data: vals,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 0,
      borderRadius: 3
    }], chartOpts());
  };

  buildChart("chartSlide13Top", topArr, "rgba(52,211,153,0.75)");
  buildChart("chartSlide13Bottom", bottomArr, "rgba(251,113,133,0.75)");

  var html = '<table><thead><tr><th>Rank</th><th>Agent Name</th><th>Attendance Score</th><th>Quality Score</th><th>Productivity</th><th>Achieved Points</th></tr></thead><tbody>';
  var rank = 1;
  topArr.forEach(function(a) {
    html += '<tr class="top-row"><td>' + (rank++) + '</td><td>' + a.name + '</td><td>' + a.attendance + '</td><td>' + a.quality + '</td><td>' + a.productivity + '</td><td>' + fmtNum(a.achieved) + '</td></tr>';
  });
  var bottomRev = bottomArr.slice().reverse();
  bottomRev.forEach(function(a) {
    html += '<tr class="bottom-row"><td>' + (rank++) + '</td><td>' + a.name + '</td><td>' + a.attendance + '</td><td>' + a.quality + '</td><td>' + a.productivity + '</td><td>' + fmtNum(a.achieved) + '</td></tr>';
  });
  html += '</tbody></table>';
  wrap.innerHTML = html;
}

// =====================================================================
// ===== SLIDE 14: Team Performance =====
// =====================================================================
function renderSlide14() {
  var data = getTableData("agentKpiData");
  var kpisEl = document.getElementById("s14Kpis");

  if (!data || data.length === 0) {
    kpisEl.innerHTML = '<div style="color:rgba(255,255,255,0.3);font-size:9px;text-align:center;padding:10px">No data in Agent KPI sheet.</div>';
    destroyChart("chartSlide14Quality");
    destroyChart("chartSlide14Achieved");
    return;
  }

  var agents = [];
  var clean = function(v) { return parseFloat(String(v).replace(/[^0-9.\-]/g, "")) || 0; };
  var fmt = function(v) { return Number(v).toLocaleString('en-IN'); };

  data.forEach(function(row) {
    var name = String(row[0] || "").trim();
    if (!name) return;
    agents.push({
      name: name,
      attendance: clean(row[1]),
      quality: clean(row[4]),
      compliance: clean(row[6]),
      cEsc: clean(row[10]),
      aEsc: clean(row[12]),
      achieved: clean(row[15])
    });
  });

  if (agents.length === 0) return;

  var totAttendance = 0, totQuality = 0, totCompliance = 0, totEscalation = 0, totAchieved = 0;
  agents.forEach(function(a) {
    totAttendance += a.attendance;
    totQuality += a.quality;
    totCompliance += a.compliance;
    totEscalation += a.cEsc + a.aEsc;
    totAchieved += a.achieved;
  });
  var totalPossible = agents.length * 100;

  var count = agents.length;
  var avgAttendance = Math.round(totAttendance / count);
  var avgQuality = Math.round(totQuality / count);
  var avgCompliance = Math.round(totCompliance / count);

  kpisEl.innerHTML =
    '<div class="kpi-card" style="--kpi-color:#60a5fa"><div class="kpi-val">' + avgAttendance + '%</div><div class="kpi-lbl">Avg Attendance Score</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#34d399"><div class="kpi-val">' + avgQuality + '%</div><div class="kpi-lbl">Avg Quality Score</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#f59e0b"><div class="kpi-val">' + avgCompliance + '%</div><div class="kpi-lbl">Avg Compliance Score</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#fb7185"><div class="kpi-val">' + fmt(totEscalation) + '</div><div class="kpi-lbl">Audit Escalation</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#a78bfa"><div class="kpi-val">' + fmt(totAchieved) + ' / ' + fmt(totalPossible) + '</div><div class="kpi-lbl">Achieved Points vs Total</div></div>';

  // Quality Score — bar chart with average target line
  var agentsSorted = agents.slice().sort(function(a, b) { return b.quality - a.quality; });
  var qLabels = agentsSorted.map(function(a) { return a.name; });
  var qVals = agentsSorted.map(function(a) { return a.quality; });
  var avgLine = Array(qLabels.length).fill(avgQuality);

  destroyChart("chartSlide14Quality");
  var minQ = Math.min.apply(null, qVals);
  var yMin = Math.floor(minQ / 10) * 10;
  createChart("chartSlide14Quality", "line", qLabels, [
    {
      label: "Quality Score",
      data: qVals,
      borderColor: "rgba(255,255,255,0.4)",
      backgroundColor: "transparent",
      borderWidth: 1.5,
      pointBackgroundColor: qVals.map(function(v) {
        return v >= 80 ? "#34d399" : v >= 60 ? "#f59e0b" : "#fb7185";
      }),
      pointBorderColor: "rgba(255,255,255,0.3)",
      pointBorderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 6,
      fill: false,
      tension: 0.3
    },
    {
      label: "Team Avg",
      data: avgLine,
      type: 'line',
      borderColor: "#f59e0b",
      backgroundColor: "transparent",
      borderWidth: 2,
      borderDash: [4, 3],
      pointRadius: 0,
      fill: false
    }
  ], {
    plugins: {
      legend: {
        display: true, position: 'bottom',
        labels: {
          color: 'rgba(255,255,255,0.5)', font: { size: 7, weight: '600' },
          boxWidth: 10, padding: 6, usePointStyle: true
        }
      },
      datalabels: {
        anchor: 'end', align: 'end', offset: 2,
        color: 'rgba(255,255,255,0.6)',
        font: { size: 6.5, weight: '700' },
        formatter: function(v) { return v > 0 ? v : ''; }
      }
    },
    scales: {
      y: {
        min: yMin,
        ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 6.5 } },
        grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
      },
      x: {
        ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 6.5, weight: '600' }, maxRotation: 0 },
        grid: { display: false }
      }
    }
  });

  // Achieved Points — horizontal bar, descending
  var achievedSorted = agents.slice().sort(function(a, b) { return b.achieved - a.achieved; });
  var aLabels = achievedSorted.map(function(a) { return a.name; });
  var aVals = achievedSorted.map(function(a) { return a.achieved; });

  destroyChart("chartSlide14Achieved");
  createChart("chartSlide14Achieved", "bar", aLabels, [{
    label: "Achieved Points",
    data: aVals,
    backgroundColor: "rgba(167,139,250,0.75)",
    borderColor: "#a78bfa",
    borderWidth: 0,
    borderRadius: 3
  }], {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: 'end', align: 'end', offset: 2,
        color: 'rgba(255,255,255,0.6)',
        font: { size: 7, weight: '700' },
        formatter: function(v) { return v > 0 ? fmt(v) : ''; }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 6.5 } },
        grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 }
      },
      y: {
        ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 6.5, weight: '600' } },
        grid: { display: false }
      }
    }
  });
}

// =====================================================================
// ===== SLIDE 15: TL & QA Performance =====
// =====================================================================
function renderSlide15() {
  var tlData = getTableData("tlKpiData");
  var qaData = getTableData("qaKpiData");
  var clean = function(v) { return parseFloat(String(v).replace(/[^0-9.\-]/g, "")) || 0; };
  var fmt = function(v) { return Number(v).toLocaleString('en-IN'); };
  var isEmpty = function(d) { return !d || d.length === 0; };

  // --- TL Stacked Horizontal Bar ---
  // TL cols: 0=TL Name, 1=Head Count, 2=Team Attendance, 3=Preshift Briefing, 4=Team Quality, 5=Shift Adherence, 6=Self Call/Chat, 7=Client Escalation, 8=TL Hygiene, 9=TL Audit, 10=Achieved Points
  var tlLabels = [], tlA = [], tlQ = [], tlB = [], tlS = [], tlAu = [];
  if (!isEmpty(tlData)) {
    tlData.forEach(function(row) {
      var name = String(row[0] || "").trim();
      if (!name) return;
      tlLabels.push(name);
      tlA.push(clean(row[2]));
      tlQ.push(clean(row[4]));
      tlB.push(clean(row[3]));
      tlS.push(clean(row[5]));
      tlAu.push(clean(row[9]));
    });
  }

  destroyChart("chartSlide15Tl");
  if (tlLabels.length > 0) {
    createChart("chartSlide15Tl", "bar", tlLabels, [
      { label: "Team Attendance", data: tlA, backgroundColor: "rgba(96,165,250,0.75)", borderColor: "#60a5fa", borderWidth: 1, borderRadius: 2, barThickness: 30 },
      { label: "Team Quality", data: tlQ, backgroundColor: "rgba(52,211,153,0.75)", borderColor: "#34d399", borderWidth: 1, borderRadius: 2, barThickness: 30 },
      { label: "Preshift Briefing", data: tlB, backgroundColor: "rgba(251,146,60,0.75)", borderColor: "#fb923c", borderWidth: 1, borderRadius: 2, barThickness: 30 },
      { label: "Shift Adherence", data: tlS, backgroundColor: "rgba(167,139,250,0.75)", borderColor: "#a78bfa", borderWidth: 1, borderRadius: 2, barThickness: 30 },
      { label: "TL Audit", data: tlAu, backgroundColor: "rgba(251,113,133,0.75)", borderColor: "#fb7185", borderWidth: 1, borderRadius: 2, barThickness: 30 }
    ], {
      indexAxis: 'y',
      plugins: {
        legend: { display: true, position: 'bottom', labels: { color: 'rgba(255,255,255,0.5)', font: { size: 7, weight: '600' }, boxWidth: 8, padding: 6, usePointStyle: true } },
        datalabels: { anchor: 'center', align: function(ctx) { var v = ctx.dataset.data[ctx.dataIndex]; return v > 8 ? 'center' : 'end'; }, offset: 0, color: 'rgba(255,255,255,0.7)', font: { size: 6, weight: '700' }, formatter: function(v) { return v > 0 ? v : ''; } }
      },
      scales: {
        x: { stacked: true, beginAtZero: true, ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 7 } }, grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 } },
        y: { stacked: true, ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 7, weight: '600' } }, grid: { display: false } }
      }
    });
  }

  // --- QA Stacked Horizontal Bar ---
  // QA cols: 0=QA Name, 1=Manager, 2=Head Count, 3=Audits Count, 4=Audit Score(%), 5=Hygiene Hours, 6=Asset Maintenance(Y/N), 7=Shift Huddles(Y/N), 8=Track Record(Y/N), 9=EOD Reports, 10=Refresher Training/LLR, 11=Total Point
  var qaLabels = [], qaAS = [], qaAM = [], qaSH = [], qaTR = [];
  var ynVal = function(v) { var s = String(v).trim().toUpperCase(); return s === 'Y' || s === 'YES' ? 100 : 0; };

  if (!isEmpty(qaData)) {
    qaData.forEach(function(row) {
      var name = String(row[0] || "").trim();
      if (!name) return;
      qaLabels.push(name);
      qaAS.push(clean(row[4]));
      qaAM.push(ynVal(row[6]));
      qaSH.push(ynVal(row[7]));
      qaTR.push(ynVal(row[8]));
    });
  }

  destroyChart("chartSlide15Qa");
  if (qaLabels.length > 0) {
    createChart("chartSlide15Qa", "bar", qaLabels, [
      { label: "Audit Score", data: qaAS, backgroundColor: "rgba(52,211,153,0.75)", borderColor: "#34d399", borderWidth: 1, borderRadius: 2, barThickness: 30 },
      { label: "Asset Maintenance", data: qaAM, backgroundColor: "rgba(96,165,250,0.75)", borderColor: "#60a5fa", borderWidth: 1, borderRadius: 2, barThickness: 30 },
      { label: "Shift Huddles", data: qaSH, backgroundColor: "rgba(251,146,60,0.75)", borderColor: "#fb923c", borderWidth: 1, borderRadius: 2, barThickness: 30 },
      { label: "Track Record", data: qaTR, backgroundColor: "rgba(167,139,250,0.75)", borderColor: "#a78bfa", borderWidth: 1, borderRadius: 2, barThickness: 30 }
    ], {
      indexAxis: 'y',
      plugins: {
        legend: { display: true, position: 'bottom', labels: { color: 'rgba(255,255,255,0.5)', font: { size: 7, weight: '600' }, boxWidth: 8, padding: 6, usePointStyle: true } },
        datalabels: { anchor: 'center', align: function(ctx) { var v = ctx.dataset.data[ctx.dataIndex]; return v > 8 ? 'center' : 'end'; }, offset: 0, color: 'rgba(255,255,255,0.7)', font: { size: 6, weight: '700' }, formatter: function(v) { return v > 0 ? v : ''; } }
      },
      scales: {
        x: { stacked: true, beginAtZero: true, ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 7 } }, grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 } },
        y: { stacked: true, ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 7, weight: '600' } }, grid: { display: false } }
      }
    });
  }

  // --- TL Table ---
  var tlHtml = '<table><thead><tr><th>Name</th><th>Head Count</th><th>Self Call/Chat</th><th>Client Escalation</th><th>TL Hygiene</th><th>Achieved Points</th></tr></thead><tbody>';
  if (!isEmpty(tlData)) {
    tlData.forEach(function(row) {
      var name = String(row[0] || "").trim();
      if (!name) return;
      tlHtml += '<tr><td>' + name + '</td><td>' + clean(row[1]) + '</td><td>' + clean(row[6]) + '</td><td>' + String(row[7] || "").trim() + '</td><td>' + String(row[8] || "").trim() + '</td><td>' + fmt(clean(row[10])) + '</td></tr>';
    });
  }
  tlHtml += '</tbody></table>';
  document.getElementById("s15TlTable").innerHTML = tlHtml;

  // --- QA Table ---
  var qaHtml = '<table><thead><tr><th>Name</th><th>Head Count</th><th>Audits Count</th><th>Hygiene Hours</th><th>EOD Reports</th><th>Refresher Training/LLR</th><th>Achieved Point</th></tr></thead><tbody>';
  if (!isEmpty(qaData)) {
    qaData.forEach(function(row) {
      var name = String(row[0] || "").trim();
      if (!name) return;
      qaHtml += '<tr><td>' + name + '</td><td>' + clean(row[2]) + '</td><td>' + clean(row[3]) + '</td><td>' + clean(row[5]) + '</td><td>' + String(row[9] || "").trim() + '</td><td>' + String(row[10] || "").trim() + '</td><td>' + fmt(clean(row[11])) + '</td></tr>';
    });
  }
  qaHtml += '</tbody></table>';
  document.getElementById("s15QaTable").innerHTML = qaHtml;
}

// =====================================================================
// ===== SLIDE UTILITIES =====
// =====================================================================
function renderKpiCard(value, label, color) {
  return `<div class="pbi-kpi" style="--kpi-color:${color};border-color:${color}20;background:rgba(15,20,40,0.6);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)"><div class="kpi-val" style="color:${color};text-shadow:0 0 20px ${color}30">${value}</div><div class="kpi-lbl">${label}</div></div>`;
}

function destroyChart(key) { if(state.charts[key]){state.charts[key].destroy();delete state.charts[key];} }

// Create gradient fill for chart datasets
function createGradient(ctx, colorTop, colorBot) {
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height || 300);
  gradient.addColorStop(0, colorTop);
  gradient.addColorStop(1, colorBot);
  return gradient;
}

function createChart(canvasId, type, labels, datasets, options) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  const canvas = ctx.getContext("2d");

  const labelColor = '#475569';
  const gridColor = 'rgba(0,0,0,0.05)';

  // Apply gradient fills to bar datasets
  const enhancedDatasets = datasets.map(ds => {
    if ((type === 'bar' || type === 'line') && ds.backgroundColor && typeof ds.backgroundColor === 'string' && ds.backgroundColor.startsWith('rgba')) {
      const base = ds.backgroundColor;
      // Extract color components
      const match = base.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        const r = match[1], g = match[2], b = match[3], a = match[4] || '1';
        const gradient = createGradient(canvas,
          `rgba(${r},${g},${b},${a})`,
          `rgba(${r},${g},${b},${parseFloat(a) * 0.3})`
        );
        return { ...ds, backgroundColor: gradient, borderColor: `rgba(${r},${g},${b},${a})`, borderWidth: ds.borderWidth || 0 };
      }
    }
    return ds;
  });

  const defaultDatalabels = type === 'doughnut' ? {
    display: 'auto', color: '#fff', font: {size: 11, weight: 'bold', family: "'Inter','Segoe UI',sans-serif"},
    formatter: (v) => v > 0 ? v : '',
    textShadowColor: 'rgba(0,0,0,0.4)', textShadowBlur: 4
  } : type === 'radar' ? { display: false }
  : type === 'line' ? { display: false }
  : (options && options.scales && options.scales.x && options.scales.x.stacked) ? { display: false }
  : {
    anchor: 'end', align: 'end', offset: 4,
    color: 'rgba(0,0,0,0.6)',
    font: {size: 8, weight: 'bold', family: "'Inter','Segoe UI',sans-serif"},
    formatter: (v) => v > 0 ? (Number.isInteger(v) ? v.toLocaleString() : v.toFixed(1)) : ''
  };

  const defaults = {
    responsive:true, maintainAspectRatio:false,
    layout:{padding:{top:10,right:12,bottom:8,left:10}},
    animation:{duration:800,easing:'easeOutQuart'},
    plugins:{
      legend:{
        labels:{
          font:{size:9,weight:'600',family:"'Inter','Segoe UI',sans-serif"},
          boxWidth:12,padding:10,
          usePointStyle:true,
          pointStyleWidth:10,
          color: labelColor
        }
      },
      tooltip:{
        backgroundColor: 'rgba(10,14,26,0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        titleFont: {size:12, weight:'700', family:"'Inter','Segoe UI',sans-serif"},
        bodyFont: {size:11, family:"'Inter','Segoe UI',sans-serif"},
        padding: {top:10,bottom:10,left:14,right:14},
        cornerRadius: 8,
        boxPadding: 6,
        borderColor: 'rgba(124,58,237,0.25)',
        borderWidth: 1,
        displayColors: true,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      },
      datalabels: defaultDatalabels
    },
    scales:{
      y:{
        beginAtZero:true,
        ticks:{font:{size:8,weight:'500',family:"'Inter','Segoe UI',sans-serif"},padding:6,maxTicksLimit:7,color:labelColor},
        grid:{color:gridColor,lineWidth:0.5,drawBorder:false},
        border:{display:false}
      },
      x:{
        ticks:{font:{size:8,weight:'600',family:"'Inter','Segoe UI',sans-serif"},padding:4,color:labelColor},
        grid:{display:false},
        border:{display:false}
      }
    }
  };

  const mergedOpts = {...defaults, ...options};
  if (options && options.plugins) {
    mergedOpts.plugins = {...defaults.plugins, ...options.plugins};
    if (options.plugins.datalabels !== undefined) {
      mergedOpts.plugins.datalabels = options.plugins.datalabels;
    }
    if (options.plugins.tooltip !== undefined) {
      mergedOpts.plugins.tooltip = {...defaults.plugins.tooltip, ...options.plugins.tooltip};
    }
  }
  if (options && options.scales) {
    mergedOpts.scales = {...defaults.scales, ...options.scales};
  }

  // Scale all font sizes 1.2x for readability
  (function scaleFonts(o) {
    if (!o || typeof o !== 'object') return;
    for (const k of Object.keys(o)) {
      if (k === 'font' && o[k] && typeof o[k].size === 'number') {
        o[k].size = Math.round(o[k].size * 1.2);
      } else if (typeof o[k] === 'object') {
        scaleFonts(o[k]);
      }
    }
  })(mergedOpts);

  state.charts[canvasId] = new Chart(canvas,{type,data:{labels,datasets:enhancedDatasets},options:mergedOpts});
  return state.charts[canvasId];
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
  const slides = document.querySelectorAll('#dashboardSection .slide');
  if (slides.length === 0) {
    addLog("No slides to export. Generate a report first.","error");
    return;
  }
  addLog(`Exporting ${slides.length} slide(s) to PDF...`,"info");

  const { jsPDF } = window.jspdf;
  const pptW = 338.67;
  const pptH = 190.5;
  const pdf = new jsPDF({ orientation: 'l', unit: 'mm', format: [pptW, pptH] });

  // Temporarily disable scaling to capture at full resolution
  const viewports = document.querySelectorAll('.slide-viewport');
  viewports.forEach(vp => { vp.style.overflow = 'visible'; });

  for (let i = 0; i < slides.length; i++) {
    addLog(`Capturing slide ${i + 1}/${slides.length}...`,"info");
    const el = slides[i];
    try {
      const canvas = await html2canvas(el, {
        scale: 2, useCORS: true, backgroundColor: "#ffffff",
        logging: false,
      });
      const img = canvas.toDataURL("image/png");
      if (i > 0) pdf.addPage();
      pdf.addImage(img, "PNG", 0, 0, pptW, pptH);
    } catch (err) {
      addLog(`Error capturing slide ${i + 1}: ${err.message}`,"error");
    }
  }

  viewports.forEach(vp => { vp.style.overflow = ''; });

  const client = document.getElementById("projectName").value || "Client";
  const month = document.getElementById("monthSelect").value || "January";
  const year = document.getElementById("yearSelect").value || "2026";
  const filename = `${month.substring(0, 3)} ${year} ${client} Monthly Performance Review.pdf`;
  pdf.save(filename);
  addLog(`PDF exported: ${filename}`,"success");
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

// ===== Slide Responsive Scaling =====
function scaleSlides() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.slide-viewport').forEach(vp => {
      const slide = vp.querySelector('.slide');
      if (!slide) return;
      const w = vp.clientWidth;
      const h = vp.clientHeight;
      const scaleX = w / 1280;
      const scaleY = h / 720;
      const scale = Math.min(scaleX, scaleY);
      slide.style.transform = `scale(${scale})`;
    });
  });
}

window.addEventListener('resize', scaleSlides);

// ===== Chart.js Data Labels Registration =====
function initChartDataLabels() {
  if (typeof ChartDataLabels !== 'undefined' && Chart.registry && !Chart.registry.plugins.get('datalabels')) {
    Chart.register(ChartDataLabels);
  }
}



// ===== Init =====
document.addEventListener("DOMContentLoaded",()=>{
  initTheme();
  initConfig();
  initExcelPasteTracker();
  initChartDataLabels();
  scaleSlides();
  document.addEventListener('paste', handleExcelGridPaste);
  document.addEventListener('keydown', handleExcelGridKeydown);
});

// Re-register datalabels after scripts load
setTimeout(initChartDataLabels, 800);
