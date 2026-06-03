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

const KPI_COLORS = ["#0d9488","#3b82f6","#10b981","#f59e0b","#f43f5e","#06b6d4","#8b5cf6","#fbbf24"];

// =====================================================================
// ===== Per-Client Theme System =======================================
// =====================================================================
function hexToRgba(hex,a){var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return"rgba("+r+","+g+","+b+","+a+")";}
var CLIENT_THEMES = {
  /* ── Client SJ (C1): Bold Indigo ── */
  "Client SJ (C1)": {
    c1:"#4B49AC", c2:"#98BDFF",
    sidebar:"#EEF0F6",
    slideHead:"linear-gradient(135deg, #4B49AC 0%, #2C2A6E 100%)", headBorder:"none",
    badge:"#4B49AC", badgeBg:"rgba(75,73,172,0.12)", badgeBorder:"transparent",
    coverBg:"#2C2A6E",
    slideBg:"linear-gradient(135deg, #4B49AC 0%, #2C2A6E 80%, #1a1a4e 100%)",
    panelBg:"rgba(255,255,255,0.92)", panelBorder:"rgba(255,255,255,0.2)", panelAlt:"rgba(255,255,255,0.12)",
    slideText:"#1D1D1F", slideMuted:"#555770", slideFaint:"rgba(75,73,172,0.06)",
    tableThBg:"rgba(75,73,172,0.1)", tableTh:"#4B49AC", tableTd:"#1D1D1F",
    tableBorder:"rgba(0,0,0,0.06)", tableAlt:"rgba(75,73,172,0.04)", tableHover:"rgba(75,73,172,0.08)",
    chartTick:"#555770", chartGrid:"rgba(85,87,112,0.1)",
    headTitle:"#FFFFFF", headSubtitle:"rgba(255,255,255,0.6)"
  },
  /* ── Client WC (C10): Ocean Teal ── */
  "Client WC (C10)": {
    c1:"#0F766E", c2:"#2DD4BF",
    sidebar:"#EEF0F6",
    slideHead:"linear-gradient(135deg, #0F766E 0%, #115E59 100%)", headBorder:"none",
    badge:"#2DD4BF", badgeBg:"rgba(45,212,191,0.12)", badgeBorder:"transparent",
    coverBg:"#115E59",
    slideBg:"linear-gradient(135deg, #0F766E 0%, #115E59 80%, #042F2E 100%)",
    panelBg:"rgba(255,255,255,0.92)", panelBorder:"rgba(255,255,255,0.2)", panelAlt:"rgba(255,255,255,0.12)",
    slideText:"#1D1D1F", slideMuted:"#555770", slideFaint:"rgba(15,118,110,0.06)",
    tableThBg:"rgba(45,212,191,0.1)", tableTh:"#2DD4BF", tableTd:"#1D1D1F",
    tableBorder:"rgba(0,0,0,0.06)", tableAlt:"rgba(45,212,191,0.04)", tableHover:"rgba(45,212,191,0.08)",
    chartTick:"#555770", chartGrid:"rgba(85,87,112,0.1)",
    headTitle:"#FFFFFF", headSubtitle:"rgba(255,255,255,0.6)"
  },
  /* ── Client JE (C11): Royal Blue ── */
  "Client JE (C11)": {
    c1:"#1E40AF", c2:"#60A5FA",
    sidebar:"#EEF0F6",
    slideHead:"linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)", headBorder:"none",
    badge:"#60A5FA", badgeBg:"rgba(96,165,250,0.12)", badgeBorder:"transparent",
    coverBg:"#1E3A8A",
    slideBg:"linear-gradient(135deg, #1E40AF 0%, #1E3A8A 80%, #172554 100%)",
    panelBg:"rgba(255,255,255,0.92)", panelBorder:"rgba(255,255,255,0.2)", panelAlt:"rgba(255,255,255,0.12)",
    slideText:"#1D1D1F", slideMuted:"#555770", slideFaint:"rgba(30,64,175,0.06)",
    tableThBg:"rgba(96,165,250,0.1)", tableTh:"#60A5FA", tableTd:"#1D1D1F",
    tableBorder:"rgba(0,0,0,0.06)", tableAlt:"rgba(96,165,250,0.04)", tableHover:"rgba(96,165,250,0.08)",
    chartTick:"#555770", chartGrid:"rgba(85,87,112,0.1)",
    headTitle:"#FFFFFF", headSubtitle:"rgba(255,255,255,0.6)"
  },
  /* ── Client PK: Vibrant Purple ── */
  "Client PK": {
    c1:"#6D28D9", c2:"#A78BFA",
    sidebar:"#EEF0F6",
    slideHead:"linear-gradient(135deg, #6D28D9 0%, #5B21B6 100%)", headBorder:"none",
    badge:"#A78BFA", badgeBg:"rgba(167,139,250,0.12)", badgeBorder:"transparent",
    coverBg:"#5B21B6",
    slideBg:"linear-gradient(135deg, #6D28D9 0%, #5B21B6 80%, #2E1065 100%)",
    panelBg:"rgba(255,255,255,0.92)", panelBorder:"rgba(255,255,255,0.2)", panelAlt:"rgba(255,255,255,0.12)",
    slideText:"#1D1D1F", slideMuted:"#555770", slideFaint:"rgba(109,40,217,0.06)",
    tableThBg:"rgba(167,139,250,0.1)", tableTh:"#A78BFA", tableTd:"#1D1D1F",
    tableBorder:"rgba(0,0,0,0.06)", tableAlt:"rgba(167,139,250,0.04)", tableHover:"rgba(167,139,250,0.08)",
    chartTick:"#555770", chartGrid:"rgba(85,87,112,0.1)",
    headTitle:"#FFFFFF", headSubtitle:"rgba(255,255,255,0.6)"
  },
  /* ── Client FC (C15): Coral Fusion ── */
  "Client FC (C15)": {
    c1:"#BE123C", c2:"#FB7185",
    sidebar:"#EEF0F6",
    slideHead:"linear-gradient(135deg, #BE123C 0%, #9F1239 100%)", headBorder:"none",
    badge:"#FB7185", badgeBg:"rgba(251,113,133,0.12)", badgeBorder:"transparent",
    coverBg:"#9F1239",
    slideBg:"linear-gradient(135deg, #BE123C 0%, #9F1239 80%, #4C0519 100%)",
    panelBg:"rgba(255,255,255,0.92)", panelBorder:"rgba(255,255,255,0.2)", panelAlt:"rgba(255,255,255,0.12)",
    slideText:"#1D1D1F", slideMuted:"#555770", slideFaint:"rgba(190,18,60,0.06)",
    tableThBg:"rgba(251,113,133,0.1)", tableTh:"#FB7185", tableTd:"#1D1D1F",
    tableBorder:"rgba(0,0,0,0.06)", tableAlt:"rgba(251,113,133,0.04)", tableHover:"rgba(251,113,133,0.08)",
    chartTick:"#555770", chartGrid:"rgba(85,87,112,0.1)",
    headTitle:"#FFFFFF", headSubtitle:"rgba(255,255,255,0.6)"
  }
};;
var THEME = CLIENT_THEMES["Client SJ (C1)"];
function getTheme(){var nm=(document.getElementById("sidebarProjectName")||{}).textContent||"";return CLIENT_THEMES[nm]||THEME;}
function tc1(a){return hexToRgba(THEME.c1,a);}
function tc2(a){return hexToRgba(THEME.c2,a);}
function applyClientTheme(name){
  var t = CLIENT_THEMES[name] || CLIENT_THEMES["Client SJ (C1)"];
  THEME = t;
  var root = document.documentElement;
  // App
  root.style.setProperty("--primary", t.c1);
  root.style.setProperty("--primary-light", hexToRgba(t.c1, 0.15));
  root.style.setProperty("--ring", t.c1);
  // Keep sidebar background styled via CSS theme (so it stays dark)
  // root.style.setProperty("--sidebar-bg", t.sidebar);
  root.style.setProperty("--kpi-1", t.c1);
  root.style.setProperty("--kpi-2", t.c2);
  // Slide CSS variables
  root.style.setProperty("--sl-bg", t.slideBg);
  root.style.setProperty("--sl-panel", t.panelBg);
  root.style.setProperty("--sl-panel-border", t.panelBorder);
  root.style.setProperty("--sl-panel-alt", t.panelAlt);
  root.style.setProperty("--sl-label", t.c1);
  root.style.setProperty("--sl-text", t.slideText);
  root.style.setProperty("--sl-text-muted", t.slideMuted);
  root.style.setProperty("--sl-text-faint", t.slideFaint);
  root.style.setProperty("--sl-kpi-bg", t.panelBg);
  root.style.setProperty("--sl-kpi-border", t.panelBorder);
  root.style.setProperty("--sl-kpi-val", t.slideText);
  root.style.setProperty("--sl-kpi-lbl", t.slideMuted);
  root.style.setProperty("--sl-table-th-bg", t.tableThBg);
  root.style.setProperty("--sl-table-th", t.tableTh);
  root.style.setProperty("--sl-table-td", t.tableTd);
  root.style.setProperty("--sl-table-border", t.tableBorder);
  root.style.setProperty("--sl-table-alt", t.tableAlt);
  root.style.setProperty("--sl-table-hover", t.tableHover);
  root.style.setProperty("--sl-cover-bg", t.coverBg);
  root.style.setProperty("--sl-chart-tick", t.chartTick);
  root.style.setProperty("--sl-chart-grid", t.chartGrid);
  root.style.setProperty("--sl-slide-head", t.slideHead);
  root.style.setProperty("--sl-slide-head-border", t.headBorder);
  root.style.setProperty("--sl-badge", t.badge);
  root.style.setProperty("--sl-badge-bg", t.badgeBg);
  root.style.setProperty("--sl-badge-border", t.badgeBorder);
  root.style.setProperty("--sl-head-title", t.headTitle || t.slideText);
  root.style.setProperty("--sl-head-subtitle", t.headSubtitle || t.slideMuted);
  // Remove stale inline styles from headers — CSS variables now handle them
  document.querySelectorAll(".slide-header").forEach(function(h){
    h.style.background = "";
    h.style.borderBottomColor = "";
  });
  document.querySelectorAll(".slide-num").forEach(function(n){
    n.style.color = ""; n.style.background = ""; n.style.borderColor = "";
  });
  // Nav links
  document.querySelectorAll(".nav-link").forEach(function(l){
    l.style.background = "";
    l.style.boxShadow = "";
  });
  document.querySelectorAll(".nav-link.active").forEach(function(l){
    l.style.background = t.c1;
    l.style.boxShadow = "0 2px 8px " + hexToRgba(t.c1, 0.3);
  });
}

// ===== State =====
let state = {
  file: null, rawData: [], processed: [], logs: [],
  exotelFile: null, exotelRaw: [], exotelKPIs: null,
  ameyoFile: null, ameyoRaw: [], ameyoKPIs: null,
  frejunFile: null, frejunRaw: [], frejunKPIs: null,
  charts: {},
};
var clientStore = {};

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
function updateSidebarProject() {
  const name = document.getElementById("sidebarProjectName").textContent || "Client";
  var h = document.getElementById("headingClientName");
  if (h) h.textContent = "for " + name;
}

function syncGlobalToClient() {
  var gMonth = document.getElementById("globalMonth");
  var gYear = document.getElementById("globalYear");
  var gWeek = document.getElementById("globalWeek");
  var gRange = document.getElementById("globalDateRange");
  var cMonth = document.getElementById("monthSelect");
  var cYear = document.getElementById("yearSelect");
  var cWeek = document.getElementById("weekSelect");
  var cRange = document.getElementById("dateRange");
  if (gMonth && cMonth) cMonth.value = gMonth.value;
  if (gYear && cYear) cYear.value = gYear.value;
  if (gWeek && cWeek) cWeek.value = gWeek.value;
  if (gRange && cRange) cRange.value = gRange.value;
}

function setupGlobalSync() {
  var ids = ["globalMonth", "globalYear", "globalWeek", "globalDateRange"];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("change", syncGlobalToClient);
    if (el && el.tagName === "INPUT") el.addEventListener("input", syncGlobalToClient);
  });
}

function initConfig() {
  const m=document.getElementById("monthSelect");
  if (m) MONTHS.forEach(mm=>{ const o=document.createElement("option"); o.value=mm; o.textContent=mm; m.appendChild(o); });
  const gm=document.getElementById("globalMonth");
  if (gm) MONTHS.forEach(mm=>{ const o=document.createElement("option"); o.value=mm; o.textContent=mm; gm.appendChild(o); });
  var ys = document.getElementById("yearSelect");
  var gys = document.getElementById("globalYear");
  [2025,2026,2027].forEach(function(y) {
    if (ys) { var o=document.createElement("option"); o.value=y; o.textContent=y; ys.appendChild(o); }
    if (gys && !gys.querySelector('option[value="'+y+'"]')) { var o=document.createElement("option"); o.value=y; o.textContent=y; gys.appendChild(o); }
  });
  var ws = document.getElementById("weekSelect");
  var gws = document.getElementById("globalWeek");
  ["All","Week 1","Week 2","Week 3","Week 4"].forEach(function(w) {
    if (ws) { var o=document.createElement("option"); o.value=w; o.textContent=w; ws.appendChild(o); }
    if (gws && !gws.querySelector('option[value="'+w+'"]')) { var o=document.createElement("option"); o.value=w; o.textContent=w; gws.appendChild(o); }
  });
  const z=document.getElementById("uploadZone");
  z.addEventListener("dragover",e=>{e.preventDefault();z.classList.add("dragover")});
  z.addEventListener("dragleave",()=>z.classList.remove("dragover"));
  z.addEventListener("drop",e=>{e.preventDefault();z.classList.remove("dragover");if(e.dataTransfer.files[0])handleFile(e.dataTransfer.files[0])});
  const ez=document.getElementById("exotelUploadZone");
  if(ez){ez.addEventListener("dragover",e=>{e.preventDefault();ez.classList.add("dragover")});ez.addEventListener("dragleave",()=>ez.classList.remove("dragover"));ez.addEventListener("drop",e=>{e.preventDefault();ez.classList.remove("dragover");if(e.dataTransfer.files[0])handleExotelFile(e.dataTransfer.files[0])});}
  const az=document.getElementById("ameyoUploadZone");
  if(az){az.addEventListener("dragover",e=>{e.preventDefault();az.classList.add("dragover")});az.addEventListener("dragleave",()=>az.classList.remove("dragover"));az.addEventListener("drop",e=>{e.preventDefault();az.classList.remove("dragover");if(e.dataTransfer.files[0])handleAmeyoFile(e.dataTransfer.files[0])});}
  const fz=document.getElementById("frejunUploadZone");
  if(fz){fz.addEventListener("dragover",e=>{e.preventDefault();fz.classList.add("dragover")});fz.addEventListener("dragleave",()=>fz.classList.remove("dragover"));fz.addEventListener("drop",e=>{e.preventDefault();fz.classList.remove("dragover");if(e.dataTransfer.files[0])handleFrejunFile(e.dataTransfer.files[0])});}
  updateSidebarProject();
}

// =====================================================================
// ===== TABLE DATA (localStorage only — no DOM tables) =====
// =====================================================================
function getTableData(tableId) {
  var client = document.getElementById("sidebarProjectName").textContent || "";
  var key = 'table_' + client + '_' + tableId;
  const saved = localStorage.getItem(key);
  if (!saved) return [];
  try {
    const data = JSON.parse(saved);
    return Array.isArray(data) ? data.filter(row => row.some(v => String(v).trim() !== '')) : [];
  } catch(e) { return []; }
}

function saveTableData(tableId, data) {
  var client = document.getElementById("sidebarProjectName").textContent || "";
  var key = 'table_' + client + '_' + tableId;
  localStorage.setItem(key, JSON.stringify(data));
}

// =====================================================================
// ===== EXCEL EDITOR MODAL (Multi-Sheet) =====
// =====================================================================
let lastFocusedCell = null;
let currentSheetIdx = 0;
// Holds unsaved data for all sheets while modal is open
let multiSheetData = {};
// Column widths per sheet (for resize handles)
let sheetColumnWidths = {};
// Column resize state
let colResize = { active: false, th: null, startX: 0, startWidth: 0, colIdx: 0 };

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
  initColumnResize();

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
  initColumnResize();
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
  headRow.innerHTML = '<th style="position:relative">#' +
    sheet.headers.map((h, i) => `<th style="position:relative" data-col-idx="${i + 1}">${h}<div class="th-resize-handle" data-col-idx="${i + 1}"></div></th>`).join('');

  // Restore saved column widths
  const savedWidths = sheetColumnWidths[sheet.id];
  if (savedWidths) {
    const allTh = headRow.querySelectorAll('th');
    allTh.forEach((th, i) => {
      if (savedWidths[i]) th.style.width = savedWidths[i];
    });
  }

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

function initColumnResize() {
  const handles = document.querySelectorAll('.th-resize-handle');
  handles.forEach(handle => {
    handle.addEventListener('mousedown', function(e) {
      e.preventDefault();
      const th = this.parentElement;
      const sheet = SHEETS[currentSheetIdx];
      if (!sheet) return;
      const colIdx = parseInt(this.dataset.colIdx);
      colResize.active = true;
      colResize.th = th;
      colResize.startX = e.clientX;
      colResize.startWidth = th.offsetWidth;
      colResize.colIdx = colIdx;
      this.classList.add('resizing');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });
  });
}

document.addEventListener('mousemove', function(e) {
  if (!colResize.active || !colResize.th) return;
  const sheet = SHEETS[currentSheetIdx];
  if (!sheet) return;
  const dx = e.clientX - colResize.startX;
  const newWidth = Math.max(30, colResize.startWidth + dx);
  colResize.th.style.width = newWidth + 'px';
  // Store widths
  const allTh = document.querySelectorAll('#excelGridHead th');
  const widths = [];
  allTh.forEach(th => widths.push(th.style.width || ''));
  sheetColumnWidths[sheet.id] = widths;
});

document.addEventListener('mouseup', function(e) {
  if (colResize.active) {
    document.querySelectorAll('.th-resize-handle.resizing').forEach(h => h.classList.remove('resizing'));
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    colResize.active = false;
    colResize.th = null;
  }
});

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

function handleAmeyoFile(file) {
  if(!file)return;
  const ext=file.name.split(".").pop().toLowerCase();
  if(!["csv","xlsx","xls"].includes(ext)){setAmeyoUploadState("error","Unsupported");return}
  state.ameyoFile=file;
  setAmeyoUploadState("idle",file.name);
}
function setAmeyoUploadState(s,t){const z=document.getElementById("ameyoUploadZone");if(!z)return;z.classList.remove("success","error","dragover");if(s==="success")z.classList.add("success");if(s==="error")z.classList.add("error");const h=document.getElementById("ameyoUploadHint");if(h)h.textContent=t||"Drag & drop or click to browse";}
function handleFrejunFile(file){if(!file)return;const ext=file.name.split(".").pop().toLowerCase();if(!["csv","xlsx","xls"].includes(ext)){setFrejunUploadState("error","Unsupported");return}state.frejunFile=file;setFrejunUploadState("idle",file.name);}
function setFrejunUploadState(s,t){const z=document.getElementById("frejunUploadZone");if(!z)return;z.classList.remove("success","error","dragover");if(s==="success")z.classList.add("success");if(s==="error")z.classList.add("error");const h=document.getElementById("frejunUploadHint");if(h)h.textContent=t||"Drag & drop or click to browse";}

// ===== Logging =====
function addLog(msg,type="info"){const t=new Date().toLocaleTimeString("en-US",{hour12:false});state.logs.push({time:t,msg,type});renderLog();}
function renderLog(){const s=document.getElementById("logSection"),c=document.getElementById("logContainer");if(!c)return;if(state.logs.length===0){s.style.display="none";return}s.style.display="block";c.innerHTML=state.logs.map(l=>`<div class="log-entry ${l.type}"><span class="log-time">${l.time}</span><span class="log-msg">${l.msg}</span></div>`).join("");c.scrollTop=c.scrollHeight;}

// ===== Parse =====
function parseFile(file) {
  function stripBOM(rows) { return rows.map(function(row) { var clean = {}; Object.keys(row).forEach(function(k) { clean[k.replace(/^\uFEFF/,"").trim()] = row[k]; }); return clean; }); }
  return new Promise((resolve,reject)=>{
    const ext=file.name.split(".").pop().toLowerCase();
    if(ext==="csv"){
      Papa.parse(file,{header:true,skipEmptyLines:true,complete:r=>r.errors.length?reject(new Error(r.errors[0].message)):resolve(stripBOM(r.data)),error:reject});
    }else{
      const r=new FileReader();
      r.onload=e=>{try{const wb=XLSX.read(new Uint8Array(e.target.result),{type:"array",cellDates:true});resolve(stripBOM(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])));}catch(err){reject(err)}};
      r.onerror=()=>reject(new Error("Failed to read file"));
      r.readAsArrayBuffer(file);
    }
  });
}

// ===== Helpers =====
function safeNum(v){if(v===null||v===undefined||v==="")return 0;const n=Number(String(v).replace(/[,%$]/g,""));return isNaN(n)?0:n;}
function secondsToHMS(sec){if(!sec||sec<=0)return"";const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=Math.floor(sec%60);return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;}
function formatSecToMinSec(val){const n=Number(val);if(isNaN(n)||n<=0)return"0s";const m=Math.floor(n/60),s=Math.floor(n%60);return(m>0?m+"m ":"")+s+"s";}
function median(arr){if(arr.length===0)return 0;const s=[...arr].sort((a,b)=>a-b),mid=Math.floor(s.length/2);return s.length%2?s[mid]:(s[mid-1]+s[mid])/2;}
function extractDay(v){
  // Handle Date object (from SheetJS cellDates:true)
  if(v instanceof Date && !isNaN(v)) return v.getDate();
  // Handle Excel serial number (belt-and-suspenders)
  if(typeof v==="number"){
    const d=new Date((v-25569)*86400*1000);
    if(!isNaN(d)&&d.getFullYear()>100)return d.getDate();
  }
  if(!v)return 1;
  const s=String(v).trim();
  if(!s)return 1;

  // Match DD/MM/YYYY or D/M/YYYY (with - or /), year can be 2 or 4 digits
  const m = s.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})/);
  if (m) {
    let d = parseInt(m[1], 10), mo = parseInt(m[2], 10), y = parseInt(m[3], 10);
    if (y < 100) y += 2000;
    if (d > 12 && d <= 31) return d;       // DD/MM/YYYY
    if (mo > 12 && mo <= 31) return mo;     // MM/DD/YYYY
    // Ambiguous (both ≤ 12) — use selected month to disambiguate
    if (d >= 1 && d <= 31 && mo >= 1 && mo <= 12) {
      var sel = document.getElementById("monthSelect")?.value;
      var mNum = sel ? new Date(sel + " 1, 2000").getMonth() + 1 : 0;
      if (mNum > 0) {
        if (d === mNum) return mo;   // MM/DD — day is second part
        if (mo === mNum) return d;   // DD/MM — day is first part
      }
    }
    return d;  // fallback: assume DD/MM (Indian)
  }

  // Fallback: native Date parser for ISO or unambiguous formats
  const dt=new Date(s);
  if(!isNaN(dt.getTime()) && dt.getFullYear() > 100) return dt.getDate();

  return 1;
}
function getWeekNum(day){if(day<=7)return"Week 1";if(day<=14)return"Week 2";if(day<=21)return"Week 3";return"Week 4";}
function to12h(h){if(h===0||h===24)return"12 AM";if(h===12)return"12 PM";return h<12?h+" AM":(h-12)+" PM";}
function findCol(row,...names){const keys=Object.keys(row);for(const n of names){const k=keys.find(kk=>kk.toLowerCase().trim()===n.toLowerCase().trim());if(k!==undefined)return row[k]}return null;}

function validateColumns(rows, expectedGroups, label) {
  if (!rows || rows.length === 0) { addLog(label + ": No data rows to validate","warn"); return false; }
  var headers = Object.keys(rows[0]);
  addLog(label + " headers found: " + headers.join(", "),"info");
  var allOk = true;
  expectedGroups.forEach(function(group) {
    var found = group.names.some(function(n) {
      return headers.some(function(h) { return h.toLowerCase().trim() === n.toLowerCase().trim(); });
    });
    if (!found) {
      var hint = group.hint || group.names[0];
      addLog(label + ": Missing column — expected something like \"" + hint + "\" (variants: " + group.names.join(", ") + ")", group.critical ? "error" : "warn");
      if (group.critical) allOk = false;
    }
  });
  return allOk;
}

// ===== Process =====
async function processFile() {
  if (!state.file) { addLog("Please upload an Intercom file first","error"); return; }
  state.logs = []; state.processed = [];
  const allCharts = Object.keys(state.charts);
  allCharts.forEach(k => { if (state.charts[k]) { state.charts[k].destroy(); delete state.charts[k]; } });
  addLog("Parsing Intercom data...","info");
  try { state.rawData = await parseFile(state.file); addLog(`Parsed ${state.rawData.length} rows`,"success"); } catch(err) { addLog(`Parse error: ${err.message}`,"error"); setUploadState("error",err.message); return; }
  setUploadState("success",`${state.file.name} — ${state.rawData.length} rows`);

  // Validate Intercom columns
  var intercomOk = validateColumns(state.rawData, [
    { names:["Created at","created at","Created At"], hint:"Created at", critical:true },
    { names:["Conversation tags","conversation tags","Conversation Tags"], hint:"Conversation tags", critical:false },
    { names:["Location","location"], hint:"Location", critical:false },
    { names:["Reopened","reopened"], hint:"Reopened", critical:false },
    { names:["Closed","closed"], hint:"Closed", critical:false },
    { names:["Teammate replies","teammate replies"], hint:"Teammate replies", critical:false },
    { names:["Time to last close (seconds)","Time to last close"], hint:"Time to last close (seconds)", critical:false },
    { names:["Time to first reply (seconds)","Time to first reply"], hint:"Time to first reply (seconds)", critical:false },
  ], "Intercom");
  if (!intercomOk) { addLog("Intercom CSV is missing critical columns. Report will be incomplete.","error"); return; }

  var currentClient = document.getElementById("sidebarProjectName").textContent || "";
  if (currentClient === "Client JE (C11)" && state.frejunFile) {
    addLog("Processing Frejun data...","info");
    try { state.frejunRaw = await parseFile(state.frejunFile); addLog(`Parsed ${state.frejunRaw.length} Frejun rows`,"success"); } catch(err) { addLog(`Frejun parse error: ${err.message}`,"error"); return; }
    var frejunOk = validateColumns(state.frejunRaw, [
      { names:["Call Status","call status","Call_Status","Status","status"], hint:"Call Status", critical:true },
      { names:["Start Time","start time","StartTime","starttime","Start_Time"], hint:"Start Time", critical:true },
      { names:["Total Minutes","total minutes","Total_Minutes"], hint:"Total Minutes", critical:false },
      { names:["Call Cost","call cost","Call_Cost","Cost","cost","Price","price"], hint:"Call Cost", critical:false },
      { names:["Tags","tags"], hint:"Tags", critical:false },
      { names:["Caller","caller"], hint:"Caller", critical:false },
    ], "Frejun");
    if (!frejunOk) { addLog("Frejun CSV is missing critical columns. Call data will not be processed.","error"); return; }
    try { state.frejunKPIs = processFrejunData(state.frejunRaw); setFrejunUploadState("success",`${state.frejunFile.name} — ${state.frejunRaw.length} rows`); addLog(`Frejun: ${state.frejunKPIs.total} calls`,"success"); state.exotelKPIs = state.frejunKPIs; state.exotelRaw = state.frejunRaw; } catch(err) { addLog(`Frejun processing error: ${err.message}`,"error"); }
  } else if (currentClient === "Client WC (C10)" && state.ameyoFile) {
    addLog("Processing Ameyo data...","info");
    try { state.ameyoRaw = await parseFile(state.ameyoFile); addLog(`Parsed ${state.ameyoRaw.length} Ameyo rows`,"success"); } catch(err) { addLog(`Ameyo parse error: ${err.message}`,"error"); return; }
    // Detect transposed Ameyo CSV (field names in rows, data in columns)
    var amKeys = Object.keys(state.ameyoRaw[0] || {});
    var firstKey = amKeys[0] || "";
    var firstVals = state.ameyoRaw.map(function(r){return String(r[firstKey]||"").toLowerCase().trim();});
    var needsTranspose = amKeys.length > 1 && firstVals.some(function(v){return v==="answered/hungup"||v==="answered hungup"||v==="answered_hungup";}) && firstVals.some(function(v){return v==="call time"||v==="call_time";});
    if (needsTranspose) {
      addLog("Detected transposed Ameyo format — pivoting columns to rows...","info");
      var pivotCols = amKeys.slice(1);
      var pivoted = [];
      pivotCols.forEach(function(col) {
        var rec = {};
        state.ameyoRaw.forEach(function(row) {
          var field = String(row[firstKey] || "").trim();
          if (field) rec[field] = row[col];
        });
        pivoted.push(rec);
      });
      state.ameyoRaw = pivoted;
      addLog(`Pivoted to ${pivoted.length} call records`,"success");
    }
    var ameyoOk = validateColumns(state.ameyoRaw, [
      { names:["Answered/Hungup","answered/hungup","Answered Hungup","Answered_Hungup"], hint:"Answered/Hungup", critical:true },
      { names:["Call Time","call time","Call Time","Call_Time"], hint:"Call Time", critical:true },
      { names:["User Talk Time","user talk time","User_Talk_Time","User Talktime"], hint:"User Talk Time", critical:false },
      { names:["User Ringing Time","user ringing time","User_Ringing_Time","User Ringtime"], hint:"User Ringing Time", critical:false },
      { names:["User Disposition Code","user disposition code","User_Disposition_Code","User DispositionCode","Disposition Code"], hint:"User Disposition Code", critical:false },
      { names:["Phone","phone"], hint:"Phone", critical:false },
    ], "Ameyo");
    if (!ameyoOk) { addLog("Ameyo CSV is missing critical columns. Call data will not be processed.","error"); return; }
    try { state.ameyoKPIs = processAmeyoData(state.ameyoRaw); setAmeyoUploadState("success",`${state.ameyoFile.name} — ${state.ameyoRaw.length} rows`); addLog(`Ameyo: ${state.ameyoKPIs.total} calls`,"success"); state.exotelKPIs = state.ameyoKPIs; state.exotelRaw = state.ameyoRaw; } catch(err) { addLog(`Ameyo processing error: ${err.message}`,"error"); }
  } else if (currentClient === "Client PK" && state.ameyoFile) {
    addLog("Processing Ameyo data (Playkaro)...","info");
    try { state.ameyoRaw = await parseFile(state.ameyoFile); addLog(`Parsed ${state.ameyoRaw.length} Ameyo rows`,"success"); } catch(err) { addLog(`Ameyo parse error: ${err.message}`,"error"); return; }
    addLog("PK headers: " + Object.keys(state.ameyoRaw[0]||{}).join(", "),"info");
    if (state.ameyoRaw[0]) { var pkSampleCallTime = state.ameyoRaw[0]["Call Time"] || state.ameyoRaw[0]["call time"] || state.ameyoRaw[0]["Call_Time"]; addLog("PK raw Call Time sample: " + JSON.stringify(pkSampleCallTime), "info"); }
    // Detect transposed Ameyo CSV (field names in rows, data in columns)
    var pkKeys = Object.keys(state.ameyoRaw[0] || {});
    var pkFirstKey = pkKeys[0] || "";
    var pkFirstVals = state.ameyoRaw.map(function(r){return String(r[pkFirstKey]||"").toLowerCase().trim();});
    var pkNeedsTranspose = pkKeys.length > 1 && pkFirstVals.some(function(v){return v==="system disposition"||v==="system_disposition";}) && pkFirstVals.some(function(v){return v==="call time"||v==="call_time";});
    if (pkNeedsTranspose) {
      addLog("Detected transposed Ameyo format — pivoting columns to rows...","info");
      var pkPivotCols = pkKeys.slice(1);
      var pkPivoted = [];
      pkPivotCols.forEach(function(col) {
        var rec = {};
        state.ameyoRaw.forEach(function(row) {
          var field = String(row[pkFirstKey] || "").trim();
          if (field) rec[field] = row[col];
        });
        pkPivoted.push(rec);
      });
      state.ameyoRaw = pkPivoted;
      addLog(`Pivoted to ${pkPivoted.length} call records`,"success");
    }
    var pkOk = validateColumns(state.ameyoRaw, [
      { names:["System Disposition","system disposition","System_Disposition"], hint:"System Disposition", critical:true },
      { names:["Call Time","call time","Call Time","Call_Time"], hint:"Call Time", critical:true },
      { names:["User Talk Time","user talk time","User_Talk_Time","User Talktime"], hint:"User Talk Time", critical:false },
      { names:["User Ringing Time","user ringing time","User_Ringing_Time","User Ringtime"], hint:"User Ringing Time", critical:false },
      { names:["Disposition Code","disposition code","Disposition_Code","DispositionCode"], hint:"Disposition Code", critical:false },
      { names:["Disposition Class","disposition class","Disposition_Class","DispositionClass"], hint:"Disposition Class", critical:false },
    ], "Ameyo (PK)");
    if (!pkOk) { addLog("Ameyo CSV is missing critical columns. Call data will not be processed.","error"); return; }
    try { state.ameyoKPIs = processPKAmeyoData(state.ameyoRaw); setAmeyoUploadState("success",`${state.ameyoFile.name} — ${state.ameyoRaw.length} rows`); addLog(`Ameyo (PK): ${state.ameyoKPIs.total} calls`,"success"); state.exotelKPIs = state.ameyoKPIs; state.exotelRaw = state.ameyoRaw; } catch(err) { addLog(`Ameyo processing error: ${err.message}`,"error"); }
  } else if (state.exotelFile) {
    addLog("Processing Exotel data...","info");
    try { state.exotelRaw = await parseFile(state.exotelFile); addLog(`Parsed ${state.exotelRaw.length} Exotel rows`,"success"); } catch(err) { addLog(`Exotel parse error: ${err.message}`,"error"); return; }
    var exotelOk = validateColumns(state.exotelRaw, [
      { names:["Status","status"], hint:"Status", critical:true },
      { names:["StartTime","starttime","Start Time","start time"], hint:"StartTime", critical:true },
      { names:["ConversationDuration","Conversation Duration","conversationduration"], hint:"ConversationDuration", critical:false },
      { names:["Duration","duration"], hint:"Duration", critical:false },
      { names:["Price","price"], hint:"Price", critical:false },
      { names:["FromCircle","fromcircle","From Circle"], hint:"FromCircle", critical:false },
      { names:["DispositionCodes","dispositioncodes","Disposition Codes"], hint:"DispositionCodes", critical:false },
    ], "Exotel");
    if (!exotelOk) { addLog("Exotel CSV is missing critical columns. Call data will not be processed.","error"); return; }
    try { state.exotelKPIs = processExotelData(state.exotelRaw); setExotelUploadState("success",`${state.exotelFile.name} — ${state.exotelRaw.length} rows`); addLog(`Exotel: ${state.exotelKPIs.total} calls`,"success"); } catch(err) { addLog(`Exotel processing error: ${err.message}`,"error"); }
  }

  const month = document.getElementById("monthSelect").value || "January";
  const projectName = document.getElementById("sidebarProjectName").textContent || "Client";
  const weekFilter = document.getElementById("weekSelect").value;
  var isWC = projectName === "Client WC (C10)";
  function filterWCTags(tags) {
    if (!isWC || tags.length <= 1) return tags;
    return tags.filter(function(t) { return t !== "General Query"; });
  }

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
  var chatTagCounts = {};
  var userConvCounts = {};

  for (const day of Object.keys(dayGroups).map(Number).sort((a,b)=>a-b)) {
    const rows = dayGroups[day];
    const tags = new Set(); const locations = {};
    let convCount=0, closedCount=0, reopenedCount=0, chatbot=0, teammate=0, noReply=0;
    const closeTimes = [];
    for (const row of rows) {
      convCount++;
      const userId = String(findCol(row,"User","user","User ID","user id","Email","email")||"").trim();
      if (userId) userConvCounts[userId] = (userConvCounts[userId] || 0) + 1;
      const tag = findCol(row,"Conversation tags","conversation tags","Conversation Tags");
      const rowTags = filterWCTags(tag && String(tag).trim() ? String(tag).split(",").map(t=>t.trim()).filter(Boolean) : []);
      rowTags.forEach(t => { tags.add(t); chatTagCounts[t] = (chatTagCounts[t]||0)+1; });
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
  state.chatTagCounts = chatTagCounts;

  // Chat repeat users: users with >1 conversation per tag
  const perTagUserCounts = {};
  for (const row of state.rawData) {
    const userId = String(findCol(row,"User","user","User ID","user id","Email","email")||"").trim();
    if (!userId) continue;
    const tag = findCol(row,"Conversation tags","conversation tags","Conversation Tags");
    if (!tag || !String(tag).trim()) continue;
    filterWCTags(String(tag).split(",").map(t => t.trim()).filter(Boolean)).forEach(t => {
      if (!perTagUserCounts[t]) perTagUserCounts[t] = {};
      perTagUserCounts[t][userId] = (perTagUserCounts[t][userId] || 0) + 1;
    });
  }
  const chatRepeatRaw = {};
  Object.entries(perTagUserCounts).forEach(([tag, users]) => {
    Object.entries(users).forEach(([uid, cnt]) => {
      if (cnt > 1) {
        if (!chatRepeatRaw[tag]) chatRepeatRaw[tag] = new Set();
        chatRepeatRaw[tag].add(uid);
      }
    });
  });
  state.chatRepeatTable = Object.entries(chatRepeatRaw)
    .map(([code, userSet]) => ({ DispositionCodes: code, "Count of Count of From": userSet.size }))
    .sort((a,b) => b["Count of Count of From"] - a["Count of Count of From"])
    .slice(0, 10);
  const allChatRepeatUsers = new Set();
  Object.values(chatRepeatRaw).forEach(s => s.forEach(u => allChatRepeatUsers.add(u)));
  state.totalChatRepeatUsers = allChatRepeatUsers.size;

  // Save to per-client store
  var curName = document.getElementById("sidebarProjectName").textContent;
  saveClientState(curName);

  addLog(`Generated ${state.processed.length} daywise rows`,"success");
  document.getElementById("exportPdfBtn").disabled = false;
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
  const extractDateOnly = dt => {
    const s = String(dt).trim().split(/\s+/)[0];
    if (!s || !/^\d/.test(s)) {
      const p = new Date(String(dt).trim());
      if (!isNaN(p) && p.getFullYear() > 100) {
        const dd = String(p.getDate()).padStart(2,"0"), mm = String(p.getMonth()+1).padStart(2,"0"), yyyy = p.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
      }
    }
    return s || '';
  };
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
    const c = dateMap[d].convDurs.filter(v => v > 0);
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
  const convDurs = completed.map(r=>safeNum(get(r,"ConversationDuration","Conversation Duration","conversationduration"))).filter(v => v > 0);
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
  const projectName = document.getElementById("sidebarProjectName")?.textContent || "Client";
  const weekFilter = document.getElementById("weekSelect")?.value || "All";

  // --- Issue Count & AHT Table (top 10) ---
  const issueCounts = {}, issueDurs = {};
  completed.forEach(r=>{const c=String(get(r,"DispositionCodes","dispositioncodes","Disposition Codes")||"").trim();if(c){issueCounts[c]=(issueCounts[c]||0)+1;if(!issueDurs[c])issueDurs[c]=[];issueDurs[c].push(safeNum(get(r,"ConversationDuration","conversationduration")));}});
  const topIssues = Object.entries(issueCounts).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([code,count])=>{
    const vals = (issueDurs[code]||[]).filter(v => v > 0);
    return {code,count,avgAHT:secondsToHMS(Math.round(vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0))};
  });

  const issueCountTable = topIssues.map(({code,count,avgAHT}) => ({
    Month: month, Week: weekFilter, Date: "", Client: projectName, MOC: "Inbound",
    DispositionCodes: code, Count: count, "Average of ConversationDuration": avgAHT,
  }));

  // --- Difference Table ---
  const totalVolume = completed.length + missed.length + attempts.length;
  const taggedCount = completed.filter(r => { const c = String(get(r,"DispositionCodes","dispositioncodes","Disposition Codes")||"").trim(); return c.length > 0; }).length;
  const allIssueCount = Object.values(issueCounts).reduce((a,b)=>a+b,0);
  const differenceTable = {
    "Total Volume": totalVolume,
    "Tagged": taggedCount,
    "Not Autotagged": totalVolume - taggedCount,
    "Query Count": allIssueCount,
  };

  // --- Interval-Wise Table ---
  const intervalCounts={};for(let i=0;i<24;i++)intervalCounts[i]=0;
  const intervalDays=new Set();
  rows.forEach(r=>{
    const st=String(get(r,"StartTime","starttime","Start Time")||"").trim();
    if(!st)return;
    const wk=getWeekNum(extractDay(st));
    if(weekFilter!=="All"&&weekFilter!==wk)return;
    const parts=st.split(/\s+/);
    let timePart=parts[1]||'';
    let h=parseInt(timePart.split(":")[0],10);
    if(isNaN(h))h=parseInt(st.split(/[\s:]/)[2],10);
    if(isNaN(h))return;
    const ampm=parts.find(t=>t.toLowerCase()==="am"||t.toLowerCase()==="pm");
    if(ampm&&ampm.toLowerCase()==="pm"&&h<12)h+=12;
    if(ampm&&ampm.toLowerCase()==="am"&&h===12)h=0;
    if(h>=0&&h<24){intervalCounts[h]++;intervalDays.add(parts.filter(p=>!p.includes(':')).join(' '));}
  });
  const intervalDivisor=intervalDays.size||1;
  const intervalAvg={};for(let i=0;i<24;i++)intervalAvg[i]=Math.round(intervalCounts[i]/intervalDivisor);

  const intervalTable = Array.from({length:24},(_,i)=>({
    Month: month, Week: weekFilter, Date: "", Client: projectName,
    Intervals: i, Time: `(${to12h(i)}-${to12h(i+1===24?0:i+1)})`,
    Shifts: i<8?"Night":i<17?"Morning":"Evening",
    MOC: "Inbound", Count: intervalAvg[i],
  }));

  // --- Repeat Count Table (top 10) — per-issue: caller must call same issue >1x ---
  const perCodeCallerCounts = {};
  completed.forEach(r => {
    const c = String(get(r,"DispositionCodes","dispositioncodes","Disposition Codes")||"").trim();
    const from = String(get(r,"From","from")||"").trim();
    if (!c || !from) return;
    if (!perCodeCallerCounts[c]) perCodeCallerCounts[c] = {};
    perCodeCallerCounts[c][from] = (perCodeCallerCounts[c][from] || 0) + 1;
  });
  const repeatRaw = {};
  Object.entries(perCodeCallerCounts).forEach(([code, callers]) => {
    Object.entries(callers).forEach(([from, cnt]) => {
      if (cnt > 1) {
        if (!repeatRaw[code]) repeatRaw[code] = new Set();
        repeatRaw[code].add(from);
      }
    });
  });
  const repeatTable = Object.entries(repeatRaw)
    .map(([code, fromSet]) => ({ code, count: fromSet.size }))
    .sort((a,b) => b.count - a.count)
    .slice(0, 10)
    .map(({code, count}) => ({ DispositionCodes: code, "Count of Count of From": count }));
  const allRepeatCallers = new Set();
  Object.values(repeatRaw).forEach(s => s.forEach(c => allRepeatCallers.add(c)));

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
    totalRepeatCallers: allRepeatCallers.size,
  };
}

function processAmeyoData(rows) {
  const get = (r,...n)=>findCol(r,...n);
  const getS = r => String(get(r,"Answered/Hungup","answered/hungup","Answered Hungup","Answered_Hungup")||"").toLowerCase().trim();
  const getCallTime = r => String(get(r,"Call Time","call time","Call Time","Call_Time")||"").trim();
  const getDate = r => { const ct=getCallTime(r); if(!ct)return 1; const day=extractDay(ct); return(day>=1&&day<=31)?day:1; };
  const hmsToSec = function(s){if(!s)return 0;if(s instanceof Date&&!isNaN(s))return s.getHours()*3600+s.getMinutes()*60+s.getSeconds();var p=String(s).split(":");if(p.length===3)return parseInt(p[0],10)*3600+parseInt(p[1],10)*60+parseFloat(p[2]);var n=safeNum(s);return n>0&&n<1?Math.round(n*86400):n;};

  const completed = rows.filter(r=>getS(r).includes("answer"));
  const missed    = rows.filter(r=>!getS(r).includes("answer")&&(getS(r).includes("hung")||getS(r).includes("abandon")));
  const attempts  = rows.filter(r=>!getS(r).includes("answer")&&!getS(r).includes("hung")&&!getS(r).includes("abandon"));

  // Per-date aggregation
  const dateMap = {};
  rows.forEach(r => {
    var d = getDate(r);
    if (!d) return;
    if (!dateMap[d]) dateMap[d] = { completed:0, missed:0, attempts:0, convDurs:[], ringTimes:[], prices:[], priceCompleted:0, priceMissed:0, priceAttempt:0 };
    var sts = "", s = getS(r);
    if (s.includes("answer")) sts = "completed";
    else if (s.includes("hung")||s.includes("abandon")) sts = "missed-call";
    else sts = "call-attempt";
    if (sts === "completed") {
      dateMap[d].completed++;
      var cd = hmsToSec(get(r,"User Talk Time","user talk time","User_Talk_Time","User Talktime"));
      dateMap[d].convDurs.push(cd);
      var rt = hmsToSec(get(r,"User Ringing Time","user ringing time","User_Ringing_Time","User Ringtime"));
      dateMap[d].ringTimes.push(rt);
    } else if (sts === "missed-call") dateMap[d].missed++;
    else dateMap[d].attempts++;
  });

  var sortedDates = Object.keys(dateMap).map(Number).sort(function(a,b){return a-b;});

  // Table 1: Call Count per date
  var dateCallCounts = sortedDates.map(function(d){return {date:d, completed:dateMap[d].completed, missed:dateMap[d].missed, attempts:dateMap[d].attempts, total:dateMap[d].completed+dateMap[d].missed+dateMap[d].attempts};});

  // Table 2: AHT per date
  var dateAHT = sortedDates.map(function(d){var c=dateMap[d].convDurs; return {date:d, avgAHT:c.length?c.reduce(function(a,b){return a+b;},0)/c.length:0};});

  // Table 3: Ring Time per date
  var dateRing = sortedDates.map(function(d){var r=dateMap[d].ringTimes; return {date:d, avgRing:r.length?r.reduce(function(a,b){return a+b;},0)/r.length:0};});

  // Table 4: Avg Cost Per Call (all 0 for Ameyo)
  var dateCost = sortedDates.map(function(d){return {date:d, avgCost:0};});

  // Table 5: Cost Spend per date (all 0 for Ameyo)
  var dateCostSpend = sortedDates.map(function(d){return {date:d, completed:0, missed:0, attempts:0, total:0};});

  // Overall aggregates
  var convDurs = completed.map(function(r){return hmsToSec(get(r,"User Talk Time","user talk time","User_Talk_Time","User Talktime"));});
  var avgAHT = convDurs.length ? convDurs.reduce(function(a,b){return a+b;},0)/convDurs.length : 0;

  var ringTimes = completed.map(function(r){return hmsToSec(get(r,"User Ringing Time","user ringing time","User_Ringing_Time","User Ringtime"));});
  var avgRing = ringTimes.length ? ringTimes.reduce(function(a,b){return a+b;},0)/ringTimes.length : 0;

  var avgCostPerCall = 0;
  var totalCost = 0;
  var missedCost = 0;
  var attemptCost = 0;

  // Week data
  var weekData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  var weekCompletedData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  var weekMissedData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  rows.forEach(function(r){
    var day = getDate(r);
    var wk = getWeekNum(day);
    weekData[wk]++;
    var s = getS(r);
    if (s.includes("answer")) weekCompletedData[wk]++;
    else if (s.includes("hung")||s.includes("abandon")) weekMissedData[wk]++;
  });

  // Location Table — use Phone prefix area codes if available
  var locCounts = {};
  rows.forEach(function(r){var c=String(get(r,"Phone","phone")||"").trim();if(c){var p=c.replace(/[^0-9]/g,"").substring(0,4);if(p)locCounts[p]=(locCounts[p]||0)+1;}});
  var topLocations = Object.entries(locCounts).sort(function(a,b){return b[1]-a[1];}).slice(0,10);

  var month = document.getElementById("monthSelect")?.value || "January";
  var projectName = document.getElementById("sidebarProjectName")?.textContent || "Client";
  var weekFilter = document.getElementById("weekSelect")?.value || "All";

  // Issue Count & AHT Table (top 10) — from User Disposition Code
  var issueCounts = {}, issueDurs = {};
  completed.forEach(function(r){var c=String(get(r,"User Disposition Code","user disposition code","User_Disposition_Code","User DispositionCode","Disposition Code")||"").trim();if(c){issueCounts[c]=(issueCounts[c]||0)+1;if(!issueDurs[c])issueDurs[c]=[];issueDurs[c].push(hmsToSec(get(r,"User Talk Time","user talk time","User_Talk_Time","User Talktime")));}});
  var topIssues = Object.entries(issueCounts).sort(function(a,b){return b[1]-a[1];}).slice(0,10).map(function(e){var code=e[0],count=e[1]; return {code:code,count:count,avgAHT:secondsToHMS(Math.round((issueDurs[code]||[0]).reduce(function(a,b){return a+b;},0)/(issueDurs[code]||[1]).length))};});

  var issueCountTable = topIssues.map(function(x){return {Month:month,Week:weekFilter,Date:"",Client:projectName,MOC:"Inbound",DispositionCodes:x.code,Count:x.count,"Average of ConversationDuration":x.avgAHT};});

  // Difference Table
  var totalVolume = completed.length + missed.length + attempts.length;
  var taggedCount = completed.filter(function(r){var c=String(get(r,"User Disposition Code","user disposition code","User_Disposition_Code","User DispositionCode","Disposition Code")||"").trim();return c.length>0;}).length;
  var allIssueCount = Object.values(issueCounts).reduce(function(a,b){return a+b;},0);
  var differenceTable = {"Total Volume":totalVolume,"Tagged":taggedCount,"Not Autotagged":totalVolume-taggedCount,"Query Count":allIssueCount};

  // Interval-Wise Table
  var intervalCounts={};for(var i=0;i<24;i++)intervalCounts[i]=0;
  var intervalDays=new Set();
  rows.forEach(function(r){
    var ct=getCallTime(r);if(!ct)return;
    var day=extractDay(ct);
    var wk=getWeekNum(day);
    if(weekFilter!=="All"&&weekFilter!==wk)return;
    var p=ct.split(/\s+/);var timePart="";
    for(var ti=0;ti<p.length;ti++){if(p[ti].includes(":")){timePart=p[ti];break;}}
    if(!timePart)return;
    var h=parseInt(timePart.split(":")[0],10);
    if(isNaN(h))return;
    var ampm=p.find(function(t){return t.toLowerCase()==="am"||t.toLowerCase()==="pm";});
    if(ampm&&ampm.toLowerCase()==="pm"&&h<12)h+=12;
    if(ampm&&ampm.toLowerCase()==="am"&&h===12)h=0;
    if(h>=0&&h<24){intervalCounts[h]++;intervalDays.add(p.filter(function(t){return !t.includes(':');}).join(' '));}
  });
  var intervalDivisor=intervalDays.size||1;
  var intervalAvg={};for(var i=0;i<24;i++)intervalAvg[i]=Math.round(intervalCounts[i]/intervalDivisor);
  var intervalTable = Array.from({length:24},function(_,i){return{Month:month,Week:weekFilter,Date:"",Client:projectName,Intervals:i,Time:"("+to12h(i)+"-"+to12h(i+1===24?0:i+1)+")",Shifts:i<8?"Night":i<17?"Morning":"Evening",MOC:"Inbound",Count:intervalAvg[i]};});

  // Repeat Count Table (top 10) — per-issue: caller must call same issue >1x
  var perCodeCallerCounts = {};
  completed.forEach(function(r) {
    var c = String(get(r,"User Disposition Code","user disposition code","User_Disposition_Code","User DispositionCode","Disposition Code")||"").trim();
    var from = String(get(r,"Phone","phone")||"").trim();
    if (!c || !from) return;
    if (!perCodeCallerCounts[c]) perCodeCallerCounts[c] = {};
    perCodeCallerCounts[c][from] = (perCodeCallerCounts[c][from] || 0) + 1;
  });
  var repeatRaw = {};
  Object.entries(perCodeCallerCounts).forEach(function(e) {
    var code = e[0], callers = e[1];
    Object.entries(callers).forEach(function(f) {
      var from = f[0], cnt = f[1];
      if (cnt > 1) {
        if (!repeatRaw[code]) repeatRaw[code] = new Set();
        repeatRaw[code].add(from);
      }
    });
  });
  var repeatTable = Object.entries(repeatRaw).map(function(e){return{code:e[0],count:e[1].size};}).sort(function(a,b){return b.count-a.count;}).slice(0,10).map(function(x){return{DispositionCodes:x.code,"Count of Count of From":x.count};});
  var allRepeatCallers = new Set();
  Object.values(repeatRaw).forEach(function(s){s.forEach(function(c){allRepeatCallers.add(c);});});

  // Summary Table
  var summaryTable = sortedDates.map(function(d){return{Date:d,"Inbound Calls":dateMap[d].completed+dateMap[d].missed+dateMap[d].attempts,Completed:dateMap[d].completed,"Missed Calls":dateMap[d].missed,"Inbound AHT":secondsToHMS(Math.round((dateAHT.find(function(x){return x.date===d;})||{avgAHT:0}).avgAHT)),"Average Ring Time":secondsToHMS(Math.round((dateRing.find(function(x){return x.date===d;})||{avgRing:0}).avgRing)),"Average Cost Per Call":"$0.0000","Price":"$0.00","Completed Call Price":"$0.00","Missed Call Price":"$0.00","Call Attempt Price":"$0.00"};});
  var totalInbound = dateCallCounts.reduce(function(s,r){return s+r.total;},0);
  var totalCompleted = dateCallCounts.reduce(function(s,r){return s+r.completed;},0);
  var totalMissed = dateCallCounts.reduce(function(s,r){return s+r.missed;},0);
  var avgAHTAll = dateAHT.length?dateAHT.reduce(function(s,r){return s+r.avgAHT;},0)/dateAHT.length:0;
  var avgRingAll = dateRing.length?dateRing.reduce(function(s,r){return s+r.avgRing;},0)/dateRing.length:0;
  summaryTable.push({Date:"Grand Total","Inbound Calls":totalInbound,Completed:totalCompleted,"Missed Calls":totalMissed,"Inbound AHT":secondsToHMS(Math.round(avgAHTAll)),"Average Ring Time":secondsToHMS(Math.round(avgRingAll)),"Average Cost Per Call":"$0.0000","Price":"$0.00","Completed Call Price":"$0.00","Missed Call Price":"$0.00","Call Attempt Price":"$0.00"});

  return {
    total:rows.length, completed:completed.length, missed:missed.length, attempts:attempts.length,
    avgAHT, avgRing, avgCostPerCall, totalCost, missedCost, attemptCost,
    weekData, weekCompletedData, weekMissedData, topLocations, topIssues, intervalAvg,
    dateCallCounts, dateAHT, dateRing, dateCost, dateCostSpend,
    summaryTable, issueCountTable, differenceTable, intervalTable, repeatTable,
    totalRepeatCallers: allRepeatCallers.size,
  };
}

// =====================================================================
// ===== AMEYO PROCESSING (Client PK / Playkaro) =====
// =====================================================================
function processPKAmeyoData(rows) {
  const get = (r,...n)=>findCol(r,...n);
  const getS = r => String(get(r,"System Disposition","system disposition","System_Disposition")||"").toLowerCase().trim();
  var getCallTime = function(r) { return String(get(r,"Call Time","call time","Call Time","Call_Time")||"").trim(); };
  // Robust date extraction — handles Excel serial numbers, ISO datetimes, MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, etc.
  var excelSerialToDate = function(num) { return new Date(Math.round((num - 25569) * 86400) * 1000); };
  var getDate = function(r) {
    var ct = getCallTime(r);
    if (!ct) return 0;
    // Excel serial datetime (SheetJS returns date cells as decimal numbers, e.g. 45762.604 = Apr 15 2025 14:30)
    var num = Number(ct);
    if (!isNaN(num) && /^\d+(\.\d+)?$/.test(String(ct).trim()) && num > 40000 && num < 60000) {
      return excelSerialToDate(Math.floor(num)).getUTCDate();
    }
    // ISO datetime with T separator, DD/MM/YYYY, Date.toString(), etc. — let extractDay handle it
    var day = extractDay(ct);
    return (day >= 1 && day <= 31) ? day : 0;
  };
  var hmsToSec = function(s) { if(!s) return 0; if(s instanceof Date&&!isNaN(s)) return s.getHours()*3600+s.getMinutes()*60+s.getSeconds(); var p=String(s).split(":"); if(p.length===3) return parseInt(p[0],10)*3600+parseInt(p[1],10)*60+parseFloat(p[2]); var n=safeNum(s); return n>0&&n<1?Math.round(n*86400):n; };
  var getDisposition = function(r) { return String(get(r,"Disposition Code","disposition code","Disposition_Code","DispositionCode")||"").trim(); };

  var completed = rows.filter(function(r) { var s=getS(r); return s.includes("connected") || s.includes("answer") || s.includes("complete") || s.includes("successful"); });
  var missed    = rows.filter(function(r) { var s=getS(r); return s.includes("hangup") || s.includes("not_picked") || s.includes("not_pick") || s.includes("abandon") || s.includes("miss") || s.includes("no_answer") || s.includes("no-answer") || s.includes("unanswered") || s.includes("not-answered"); });
  var attempts  = rows.filter(function(r) { var s=getS(r); return !s.includes("connected") && !s.includes("answer") && !s.includes("complete") && !s.includes("successful") && !s.includes("hangup") && !s.includes("not_picked") && !s.includes("not_pick") && !s.includes("abandon") && !s.includes("miss") && !s.includes("no_answer") && !s.includes("no-answer") && !s.includes("unanswered") && !s.includes("not-answered"); });

  // Per-date aggregation
  var dateMap = {};
  var dayStats = {};
  rows.forEach(function(r) {
    var d = getDate(r);
    dayStats[d] = (dayStats[d]||0) + 1;
    if (!d) return;
    if (!dateMap[d]) dateMap[d] = { completed:0, missed:0, attempts:0, convDurs:[], ringTimes:[], prices:[], priceCompleted:0, priceMissed:0, priceAttempt:0 };
    var s = getS(r);
    // Match expanded keyword set (consistent with outer filters)
    if (s.includes("connected") || s.includes("answer") || s.includes("complete") || s.includes("successful")) {
      dateMap[d].completed++;
      var cd = hmsToSec(get(r,"User Talk Time","user talk time","User_Talk_Time","User Talktime"));
      dateMap[d].convDurs.push(cd);
      var rt = hmsToSec(get(r,"User Ringing Time","user ringing time","User_Ringing_Time","User Ringtime"));
      dateMap[d].ringTimes.push(rt);
    } else if (s.includes("hangup") || s.includes("not_picked") || s.includes("not_pick") || s.includes("abandon") || s.includes("miss") || s.includes("no_answer") || s.includes("no-answer") || s.includes("unanswered") || s.includes("not-answered")) {
      dateMap[d].missed++;
    } else {
      dateMap[d].attempts++;
    }
  });

  // Diagnostic Log
  const daySummary = Object.entries(dayStats).sort((a,b)=>a[0]-b[0]).map(e => `Day ${e[0]}: ${e[1]}`).join(", ");
  addLog(`Ameyo PK Day Distribution: ${daySummary}`, "info");

  // Debug sample values
  if (rows.length > 0) {
    const sample = rows[0];
    addLog(`PK sample headers: ${Object.keys(sample).join(", ")}`, "info");
    addLog(`PK sample User Talk Time: "${get(sample,"User Talk Time","user talk time","User_Talk_Time","User Talktime")}"`, "info");
    addLog(`PK sample User Ringing Time: "${get(sample,"User Ringing Time","user ringing time","User_Ringing_Time","User Ringtime")}"`, "info");
    addLog(`PK sample System Disposition: "${get(sample,"System Disposition","system disposition","System_Disposition")}"`, "info");
  }

  var sortedDates = Object.keys(dateMap).map(Number).sort(function(a,b){return a-b;});

  // Table 1: Call Count per date
  var dateCallCounts = sortedDates.map(function(d){return {date:d, completed:dateMap[d].completed, missed:dateMap[d].missed, attempts:dateMap[d].attempts, total:dateMap[d].completed+dateMap[d].missed+dateMap[d].attempts};});

  // Table 2: AHT per date (exclude zero durations)
  var dateAHT = sortedDates.map(function(d){var c=dateMap[d].convDurs.filter(function(v){return v>0;}); return {date:d, avgAHT:c.length?c.reduce(function(a,b){return a+b;},0)/c.length:0};});

  // Table 3: Ring Time per date
  var dateRing = sortedDates.map(function(d){var r=dateMap[d].ringTimes; return {date:d, avgRing:r.length?r.reduce(function(a,b){return a+b;},0)/r.length:0};});

  // Table 4: Avg Cost Per Call (all 0 for Ameyo)
  var dateCost = sortedDates.map(function(d){return {date:d, avgCost:0};});

  // Table 5: Cost Spend per date (all 0 for Ameyo)
  var dateCostSpend = sortedDates.map(function(d){return {date:d, completed:0, missed:0, attempts:0, total:0};});

  // Overall aggregates
  var convDurs = completed.map(function(r){return hmsToSec(get(r,"User Talk Time","user talk time","User_Talk_Time","User Talktime"));}).filter(function(v){return v>0;});
  var avgAHT = convDurs.length ? convDurs.reduce(function(a,b){return a+b;},0)/convDurs.length : 0;

  var ringTimes = completed.map(function(r){return hmsToSec(get(r,"User Ringing Time","user ringing time","User_Ringing_Time","User Ringtime"));});
  var avgRing = ringTimes.length ? ringTimes.reduce(function(a,b){return a+b;},0)/ringTimes.length : 0;

  var avgCostPerCall = 0, totalCost = 0, missedCost = 0, attemptCost = 0;

  // Week data
  var weekData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  var weekCompletedData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  var weekMissedData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  rows.forEach(function(r){
    var day = getDate(r);
    var wk = getWeekNum(day);
    weekData[wk]++;
    var s = getS(r);
    // Match expanded keyword set (consistent with outer filters)
    if (s.includes("connected") || s.includes("answer") || s.includes("complete") || s.includes("successful")) weekCompletedData[wk]++;
    else if (s.includes("hangup") || s.includes("not_picked") || s.includes("not_pick") || s.includes("abandon") || s.includes("miss") || s.includes("no_answer") || s.includes("no-answer") || s.includes("unanswered") || s.includes("not-answered")) weekMissedData[wk]++;
  });

  // Location Table — PK has no phone column, return empty
  var topLocations = [];

  var month = document.getElementById("monthSelect")?.value || "January";
  var projectName = document.getElementById("sidebarProjectName")?.textContent || "Client";
  var weekFilter = document.getElementById("weekSelect")?.value || "All";

  // Issue Count & AHT Table (top 10) — all Disposition Codes on completed calls
  var issueCounts = {}, issueDurs = {};
  completed.forEach(function(r) {
    var disp = getDisposition(r);
    if (!disp) return;
    issueCounts[disp] = (issueCounts[disp]||0) + 1;
    if (!issueDurs[disp]) issueDurs[disp] = [];
    issueDurs[disp].push(hmsToSec(get(r,"User Talk Time","user talk time","User_Talk_Time","User Talktime")));
  });
  var topIssues = Object.entries(issueCounts).sort(function(a,b){return b[1]-a[1];}).slice(0,10).map(function(e){
    var code=e[0], count=e[1];
    return {code:code, count:count, avgAHT:secondsToHMS(Math.round((issueDurs[code]||[0]).reduce(function(a,b){return a+b;},0)/(issueDurs[code]||[1]).length))};
  });

  var issueCountTable = topIssues.map(function(x){return {Month:month,Week:weekFilter,Date:"",Client:projectName,MOC:"Inbound",DispositionCodes:x.code,Count:x.count,"Average of ConversationDuration":x.avgAHT};});

  // Difference / Tagging Table
  var totalVolume = completed.length + missed.length + attempts.length;
  var taggedCount = completed.filter(function(r){var d=getDisposition(r);return d && d.length>0;}).length;
  var allIssueCount = Object.values(issueCounts).reduce(function(a,b){return a+b;},0);
  var differenceTable = {"Total Volume":totalVolume,"Tagged":taggedCount,"Not Autotagged":totalVolume-taggedCount,"Query Count":allIssueCount};

  // Interval-Wise Table
  var intervalCounts={};for(var i=0;i<24;i++)intervalCounts[i]=0;
  var intervalDays=new Set();
  if (rows.length > 0) {
    const sample = getCallTime(rows[0]);
    addLog(`Ameyo PK Sample Call Time: "${sample}"`, "info");
  }
  var intervalHit = 0;
  rows.forEach(function(r) {
    var ct = getCallTime(r);
    if (!ct) return;
    var day = extractDay(ct);
    var wk = getWeekNum(day);
    if(weekFilter!=="All"&&weekFilter!==wk)return;
    var h = -1;
    var dateKey = '';
    // Excel serial datetime: fractional part encodes time of day (e.g. 0.604 = 14:30)
    var num = Number(ct);
    if (!isNaN(num) && /^\d+\.\d+$/.test(String(ct).trim()) && num > 40000 && num < 60000) {
      h = Math.floor((num - Math.floor(num)) * 24);
      dateKey = String(Math.floor(num));
    } else {
      // String datetime — split on space or T, find the token containing ":"
      var timeStr = ct;
      if (!timeStr.includes(":")) {
        timeStr = String(get(r,"Call Start Time","call start time","Call_Start_Time","Start Time","start time","Start_Time","CallStartTime")||"").trim();
      }
      if (!timeStr) return;
      var parts = timeStr.split(/[\sT]+/);
      var timePart = "";
      for (var ti = 0; ti < parts.length; ti++) { if (parts[ti].includes(":")) { timePart = parts[ti]; break; } }
      if (!timePart) return;
      h = parseInt(timePart.split(":")[0], 10);
      if (isNaN(h)) return;
      var ampm = parts.find(function(t){return t.toLowerCase()==="am"||t.toLowerCase()==="pm";});
      if (ampm && ampm.toLowerCase()==="pm" && h<12) h+=12;
      if (ampm && ampm.toLowerCase()==="am" && h===12) h=0;
      dateKey = parts.filter(function(t){return !t.includes(':');}).join(' ');
    }
    if (h>=0 && h<24) { intervalCounts[h]++; intervalDays.add(dateKey); intervalHit++; }
  });
  addLog("PK interval: " + intervalHit + " rows had valid time out of " + rows.length, "info");
  var intervalDivisor=intervalDays.size||1;
  var intervalAvg={};for(var i=0;i<24;i++)intervalAvg[i]=Math.round(intervalCounts[i]/intervalDivisor);
  var intervalTable = Array.from({length:24},function(_,i){return{Month:month,Week:weekFilter,Date:"",Client:projectName,Intervals:i,Time:"("+to12h(i)+"-"+to12h(i+1===24?0:i+1)+")",Shifts:i<8?"Night":i<17?"Morning":"Evening",MOC:"Inbound",Count:intervalAvg[i]};});

  // Repeat Count Table — PK has no caller identifier column, return empty
  var repeatTable = [];
  var totalRepeatCallers = 0;

  // Summary Table
  addLog("PK debug: completed=" + completed.length + " missed=" + missed.length + " attempts=" + attempts.length, "info");
  addLog("PK debug: dates=" + sortedDates.join(",") + " weeks=" + JSON.stringify(weekData), "info");
  addLog("PK debug: avgAHT=" + avgAHT.toFixed(1) + "s avgRing=" + avgRing.toFixed(1) + "s", "info");
  var summaryTable = sortedDates.map(function(d){return{Date:d,"Inbound Calls":dateMap[d].completed+dateMap[d].missed+dateMap[d].attempts,Completed:dateMap[d].completed,"Missed Calls":dateMap[d].missed,"Inbound AHT":secondsToHMS(Math.round((dateAHT.find(function(x){return x.date===d;})||{avgAHT:0}).avgAHT)),"Average Ring Time":secondsToHMS(Math.round((dateRing.find(function(x){return x.date===d;})||{avgRing:0}).avgRing)),"Average Cost Per Call":"","Price":"","Completed Call Price":"","Missed Call Price":"","Call Attempt Price":""};});
  var totalInbound = dateCallCounts.reduce(function(s,r){return s+r.total;},0);
  var totalCompleted = dateCallCounts.reduce(function(s,r){return s+r.completed;},0);
  var totalMissed = dateCallCounts.reduce(function(s,r){return s+r.missed;},0);
  var avgAHTAll = dateAHT.length?dateAHT.reduce(function(s,r){return s+r.avgAHT;},0)/dateAHT.length:0;
  var avgRingAll = dateRing.length?dateRing.reduce(function(s,r){return s+r.avgRing;},0)/dateRing.length:0;
  summaryTable.push({Date:"Grand Total","Inbound Calls":totalInbound,Completed:totalCompleted,"Missed Calls":totalMissed,"Inbound AHT":secondsToHMS(Math.round(avgAHTAll)),"Average Ring Time":secondsToHMS(Math.round(avgRingAll)),"Average Cost Per Call":"","Price":"","Completed Call Price":"","Missed Call Price":"","Call Attempt Price":""});

  return {
    total:rows.length, completed:completed.length, missed:missed.length, attempts:attempts.length,
    avgAHT, avgRing, avgCostPerCall, totalCost, missedCost, attemptCost,
    weekData, weekCompletedData, weekMissedData, topLocations, topIssues, intervalAvg,
    dateCallCounts, dateAHT, dateRing, dateCost, dateCostSpend,
    summaryTable, issueCountTable, differenceTable, intervalTable, repeatTable,
    totalRepeatCallers,
  };
}

// =====================================================================
// ===== FREJUN PROCESSING =====
// =====================================================================
function processFrejunData(rows) {
  const get = (r,...n)=>findCol(r,...n);
  const getS = r => String(get(r,"Call Status","call status","Call_Status","Status","status")||"").toLowerCase().trim();
  const getStartTime = r => String(get(r,"Start Time","start time","StartTime","starttime","Start_Time")||"").trim();
  const getCallCost = r => safeNum(get(r,"Call Cost","call cost","Call_Cost","Cost","cost","Price","price"));
  const getTags = r => String(get(r,"Tags","tags")||"").trim();
  const getDate = r => {
    const st=getStartTime(r); if(!st)return '';
    const s=String(st).trim().split(/\s+/)[0];
    if (!s || !/^\d/.test(s)) {
      const p=new Date(String(st).trim());
      if (!isNaN(p) && p.getFullYear() > 100) {
        const dd=String(p.getDate()).padStart(2,"0"), mm=String(p.getMonth()+1).padStart(2,"0"), yyyy=p.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
      }
    }
    return s||'';
  };
  const toSec = function(s) {
    if(!s||s==="NA"||s==="na")return 0;
    if(s instanceof Date&&!isNaN(s)) return s.getHours()*3600+s.getMinutes()*60+s.getSeconds();
    var p=String(s).match(/(\d+)m\s*(\d+)s/);
    if(p)return parseInt(p[1],10)*60+parseInt(p[2],10);
    var n=safeNum(s);
    return n>0&&n<1?Math.round(n*86400):n;
  };

  const missedStatuses = ["user-not-answered","user-busy","user busy"];
  const completed = rows.filter(r => getS(r)==="answered");
  const missed    = rows.filter(r => missedStatuses.includes(getS(r)));
  // Any rows with other statuses treated as attempts
  const attempts  = rows.filter(r => !["answered",...missedStatuses].includes(getS(r)));

  // --- Per-date aggregation ---
  const dateMap = {};
  rows.forEach(r => {
    const d = getDate(r);
    if (!d) return;
    if (!dateMap[d]) dateMap[d] = { completed:0, missed:0, attempts:0, convDurs:[], ringTimes:[], prices:[], priceCompleted:0, priceMissed:0, priceAttempt:0 };
    const p = getCallCost(r);
    if (getS(r)==="answered") {
      dateMap[d].completed++;
      var totalMinSec = toSec(get(r,"Total Minutes","total minutes","Total_Minutes"));
      dateMap[d].convDurs.push(totalMinSec);
      dateMap[d].prices.push(p);
      dateMap[d].priceCompleted += p;
    } else if (missedStatuses.includes(getS(r))) {
      dateMap[d].missed++;
      dateMap[d].priceMissed += p;
    } else {
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

  // Table 3: Ring Time (not available in Frejun, all 0)
  const dateRing = sortedDates.map(d => ({ date:d, avgRing:0 }));

  // Table 4: Avg Cost Per Call
  const dateCost = sortedDates.map(d => {
    const dayRows = rows.filter(r => getDate(r) === d);
    const dayPrices = dayRows.map(r => getCallCost(r));
    return { date:d, avgCost: dayPrices.length ? dayPrices.reduce((a,b)=>a+b,0)/dayPrices.length : 0 };
  });

  // Table 5: Cost Spend per date
  const dateCostSpend = sortedDates.map(d => ({
    date:d, completed:dateMap[d].priceCompleted, missed:dateMap[d].priceMissed,
    attempts:dateMap[d].priceAttempt, total: dateMap[d].priceCompleted+dateMap[d].priceMissed+dateMap[d].priceAttempt,
  }));

  // --- Overall aggregates ---
  const convDurs = completed.map(r => toSec(get(r,"Total Minutes","total minutes","Total_Minutes")));
  const avgAHT = convDurs.length ? convDurs.reduce((a,b)=>a+b,0)/convDurs.length : 0;
  const avgRing = 0;

  const allPrices = rows.map(r => getCallCost(r));
  const avgCostPerCall = allPrices.length ? allPrices.reduce((a,b)=>a+b,0)/allPrices.length : 0;

  const totalCost = completed.map(r => getCallCost(r)).reduce((a,b)=>a+b,0);
  const missedCost = missed.map(r => getCallCost(r)).reduce((a,b)=>a+b,0);
  const attemptCost = attempts.map(r => getCallCost(r)).reduce((a,b)=>a+b,0);

  // Week data
  const weekData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  const weekCompletedData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  const weekMissedData = {"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0};
  rows.forEach(r => {
    const st = getStartTime(r);
    const day = extractDay(st);
    const wk = getWeekNum(day);
    weekData[wk]++;
    const sts = getS(r);
    if (sts === "answered") weekCompletedData[wk]++;
    else if (missedStatuses.includes(sts)) weekMissedData[wk]++;
  });

  // --- Location Table (top 10) - Frejun has no location, use caller area prefix ---
  const locCounts = {};
  rows.forEach(r => {
    var caller = String(get(r,"Caller","caller")||"").trim();
    if(caller){
      var p = caller.replace(/[^0-9]/g,"").substring(0,4);
      if(p) locCounts[p] = (locCounts[p]||0)+1;
    }
  });
  const topLocations = Object.entries(locCounts).sort((a,b)=>b[1]-a[1]).slice(0,10);

  const month = document.getElementById("monthSelect")?.value || "January";
  const projectName = document.getElementById("sidebarProjectName")?.textContent || "Client";
  const weekFilter = document.getElementById("weekSelect")?.value || "All";

  // --- Issue Count & AHT Table (top 10) - from Tags column ---
  const issueCounts = {}, issueDurs = {};
  completed.forEach(r => {
    const t = getTags(r);
    if(t){
      issueCounts[t] = (issueCounts[t]||0)+1;
      if(!issueDurs[t]) issueDurs[t] = [];
      issueDurs[t].push(toSec(get(r,"Total Minutes","total minutes","Total_Minutes")));
    }
  });
  const topIssues = Object.entries(issueCounts).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([code,count])=>({
    code,count,
    avgAHT:secondsToHMS(Math.round((issueDurs[code]||[0]).reduce((a,b)=>a+b,0)/(issueDurs[code]||[1]).length))
  }));

  const issueCountTable = topIssues.map(({code,count,avgAHT}) => ({
    Month: month, Week: weekFilter, Date: "", Client: projectName, MOC: "Inbound",
    DispositionCodes: code, Count: count, "Average of ConversationDuration": avgAHT,
  }));

  // --- Difference Table ---
  const totalVolume = completed.length + missed.length + attempts.length;
  const taggedCount = completed.filter(r => { const t = getTags(r); return t.length > 0; }).length;
  const allIssueCount = Object.values(issueCounts).reduce((a,b)=>a+b,0);
  const differenceTable = {
    "Total Volume": totalVolume,
    "Tagged": taggedCount,
    "Not Autotagged": totalVolume - taggedCount,
    "Query Count": allIssueCount,
  };

  // --- Interval-Wise Table ---
  const intervalCounts={};for(let i=0;i<24;i++)intervalCounts[i]=0;
  const intervalDays=new Set();
  rows.forEach(r => {
    const st = getStartTime(r);
    if(!st)return;
    const wk=getWeekNum(extractDay(st));
    if(weekFilter!=="All"&&weekFilter!==wk)return;
    const parts=st.split(/\s+/);
    let timePart=parts[1]||'';
    let h=parseInt(timePart.split(":")[0],10);
    if(isNaN(h))h=parseInt(st.split(/[\s:]/)[2],10);
    if(isNaN(h))return;
    const ampm=parts.find(t=>t.toLowerCase()==="am"||t.toLowerCase()==="pm");
    if(ampm&&ampm.toLowerCase()==="pm"&&h<12)h+=12;
    if(ampm&&ampm.toLowerCase()==="am"&&h===12)h=0;
    if(h>=0&&h<24){intervalCounts[h]++;intervalDays.add(parts.filter(p=>!p.includes(':')).join(' '));}
  });
  const intervalDivisor=intervalDays.size||1;
  const intervalAvg={};for(let i=0;i<24;i++)intervalAvg[i]=Math.round(intervalCounts[i]/intervalDivisor);
  const intervalTable = Array.from({length:24},(_,i)=>({
    Month: month, Week: weekFilter, Date: "", Client: projectName,
    Intervals: i, Time: `(${to12h(i)}-${to12h(i+1===24?0:i+1)})`,
    Shifts: i<8?"Night":i<17?"Morning":"Evening",
    MOC: "Inbound", Count: intervalAvg[i],
  }));

  // --- Repeat Count Table (top 10) — per-issue: caller must call same issue >1x ---
  const perCodeCallerCounts = {};
  completed.forEach(r => {
    const t = getTags(r);
    const caller = String(get(r,"Caller","caller")||"").trim();
    if (!t || !caller) return;
    if (!perCodeCallerCounts[t]) perCodeCallerCounts[t] = {};
    perCodeCallerCounts[t][caller] = (perCodeCallerCounts[t][caller] || 0) + 1;
  });
  const repeatRaw = {};
  Object.entries(perCodeCallerCounts).forEach(([code, callers]) => {
    Object.entries(callers).forEach(([caller, cnt]) => {
      if (cnt > 1) {
        if (!repeatRaw[code]) repeatRaw[code] = new Set();
        repeatRaw[code].add(caller);
      }
    });
  });
  const repeatTable = Object.entries(repeatRaw)
    .map(([code, fromSet]) => ({ code, count: fromSet.size }))
    .sort((a,b) => b.count - a.count)
    .slice(0, 10)
    .map(({code, count}) => ({ DispositionCodes: code, "Count of Count of From": count }));
  const allRepeatCallers = new Set();
  Object.values(repeatRaw).forEach(s => s.forEach(c => allRepeatCallers.add(c)));

  // --- Summary Table ---
  const summaryTable = sortedDates.map(d => ({
    Date: d,
    "Inbound Calls": dateMap[d].completed + dateMap[d].missed + dateMap[d].attempts,
    Completed: dateMap[d].completed,
    "Missed Calls": dateMap[d].missed,
    "Inbound AHT": secondsToHMS(Math.round((dateAHT.find(x=>x.date===d)||{avgAHT:0}).avgAHT)),
    "Average Ring Time": "00:00:00",
    "Average Cost Per Call": `₹${(dateCost.find(x=>x.date===d)||{avgCost:0}).avgCost.toFixed(2)}`,
    "Price": `₹${dateCostSpend.find(x=>x.date===d).total.toFixed(2)}`,
    "Completed Call Price": `₹${dateMap[d].priceCompleted.toFixed(2)}`,
    "Missed Call Price": `₹${dateMap[d].priceMissed.toFixed(2)}`,
    "Call Attempt Price": `₹${dateMap[d].priceAttempt.toFixed(2)}`,
  }));

  // Grand Total row
  const totalInbound = dateCallCounts.reduce((s,r)=>s+r.total,0);
  const totalCompleted = dateCallCounts.reduce((s,r)=>s+r.completed,0);
  const totalMissed = dateCallCounts.reduce((s,r)=>s+r.missed,0);
  const avgAHTAll = dateAHT.length ? dateAHT.reduce((s,r)=>s+r.avgAHT,0)/dateAHT.length : 0;
  const avgRingAll = 0;
  const avgCostAll = dateCost.length ? dateCost.reduce((s,r)=>s+r.avgCost,0)/dateCost.length : 0;
  summaryTable.push({
    Date: "Grand Total",
    "Inbound Calls": totalInbound,
    Completed: totalCompleted,
    "Missed Calls": totalMissed,
    "Inbound AHT": secondsToHMS(Math.round(avgAHTAll)),
    "Average Ring Time": "00:00:00",
    "Average Cost Per Call": `₹${avgCostAll.toFixed(2)}`,
    "Price": `₹${dateCostSpend.reduce((s,r)=>s+r.total,0).toFixed(2)}`,
    "Completed Call Price": `₹${Object.values(dateMap).reduce((s,r)=>s+r.priceCompleted,0).toFixed(2)}`,
    "Missed Call Price": `₹${Object.values(dateMap).reduce((s,r)=>s+r.priceMissed,0).toFixed(2)}`,
    "Call Attempt Price": `₹${Object.values(dateMap).reduce((s,r)=>s+r.priceAttempt,0).toFixed(2)}`,
  });

  return {
    total:rows.length, completed:completed.length, missed:missed.length, attempts:attempts.length,
    avgAHT, avgRing, avgCostPerCall, totalCost, missedCost, attemptCost,
    weekData, weekCompletedData, weekMissedData, topLocations, topIssues, intervalAvg,
    dateCallCounts, dateAHT, dateRing, dateCost, dateCostSpend,
    summaryTable, issueCountTable, differenceTable, intervalTable, repeatTable,
    totalRepeatCallers: allRepeatCallers.size,
  };
}

// =====================================================================
// ===== SLIDE 1: Cover =====
// =====================================================================
function renderSlide1() {
  const section = document.getElementById("dashboardSection");
  section.style.display = "";

  const client = document.getElementById("sidebarProjectName").textContent || "Client";
  const month = document.getElementById("monthSelect").value || "January";
  const year = document.getElementById("yearSelect").value || "2026";
  const range = document.getElementById("dateRange").value || "";

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

  const medHandling = formatSecToMinSec(document.getElementById("manualHandlingTime").value.trim());
  const avgResp = formatSecToMinSec(document.getElementById("manualAvgResponse").value.trim());
  const avgFirstResp = formatSecToMinSec(document.getElementById("manualFirstResponse").value.trim());
  const fcr = closed > 0 ? Math.round(((closed - reopenedVal) / closed) * 100) + "%" : "N/A";

  const colors = [THEME.c1, "#10b981", "#f43f5e", "#f59e0b"];

  // Week-over-week change arrows
  function wowArrow(arr, idx) {
    if (idx <= 0 || arr[idx - 1] === 0) return '';
    var prev = arr[idx - 1], curr = arr[idx];
    var pct = ((curr - prev) / prev * 100);
    var cls = pct > 0 ? 'up' : (pct < 0 ? 'down' : 'neutral');
    var arrow = pct > 0 ? '↑' : (pct < 0 ? '↓' : '→');
    var absPct = Math.abs(pct);
    if (absPct === Infinity || isNaN(absPct)) return '';
    return '<div class="kpi-change ' + cls + '">' + arrow + ' ' + absPct.toFixed(1) + '% WoW</div>';
  }

  // Trend line: simple linear regression across weeks
  var n = weekData.length;
  var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (var ti = 0; ti < n; ti++) { sumX += ti + 1; sumY += weekData[ti]; sumXY += (ti + 1) * weekData[ti]; sumX2 += (ti + 1) * (ti + 1); }
  var slope = n > 1 ? (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX) : 0;
  var intercept = n > 0 ? sumY / n - slope * sumX / n : 0;
  var trendLine = weekData.map(function(_, i) { return Math.round(slope * (i + 1) + intercept); });

  // Benchmark for Avg First Response (target: 2 mins)
  var benchmarkTarget = 2;
  var benchmarkLabel = 'Target: ' + benchmarkTarget + ' min';

  document.getElementById("s2Kpis").innerHTML =
    `<div class="kpi-card" style="--kpi-color:${colors[0]}"><div class="kpi-val">${total.toLocaleString()}</div><div class="kpi-lbl">Chat Volume</div>${wowArrow(weekData, weekData.length - 1)}</div>` +
    `<div class="kpi-card" style="--kpi-color:${colors[1]}"><div class="kpi-val">${closed.toLocaleString()}</div><div class="kpi-lbl">Closed Chats</div>${wowArrow(weekClosed, weekClosed.length - 1)}</div>` +
    `<div class="kpi-card" style="--kpi-color:${colors[2]}"><div class="kpi-val">${noReplyVal.toLocaleString()}</div><div class="kpi-lbl">Closed With No Reply</div></div>` +
    `<div class="kpi-card" style="--kpi-color:${colors[3]}"><div class="kpi-val">${reopenedVal.toLocaleString()}</div><div class="kpi-lbl">Reopened Chats</div></div>` +
    `<div class="kpi-card" style="--kpi-color:var(--kpi-2)"><div class="kpi-val">${avgFirstResp}<span style="font-size:9px;font-weight:600;color:var(--sl-text-muted);margin-left:6px">/ ${benchmarkLabel}</span></div><div class="kpi-lbl">Avg First Response</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#8b5cf6"><div class="kpi-val">${avgResp}</div><div class="kpi-lbl">Avg Response Time</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#06b6d4"><div class="kpi-val">${medHandling}</div><div class="kpi-lbl">Median Handling</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#10b981"><div class="kpi-val">${fcr}</div><div class="kpi-lbl">First Contact Rate</div></div>`;

  // Dynamic bar colors: green if above avg, red if below
  var avgVal = weekData.reduce(function(a,b){return a+b;},0) / weekData.filter(function(v){return v>0;}).length || 1;

  destroyChart("chartSlide2");
  createChart("chartSlide2", "bar", weekLabels, [
    {
      label: "Chat Volume",
      data: weekData,
      backgroundColor: weekData.map(function(v) {
        return v >= avgVal ? 'rgba(16,185,129,0.75)' : 'rgba(244,63,94,0.7)';
      }),
      borderRadius: 4,
      borderColor: weekData.map(function(v) { return v >= avgVal ? '#10b981' : '#f43f5e'; }),
      borderWidth: 1.5,
      order: 2
    },
    {
      label: "Closed Chats",
      type: 'line',
      data: weekClosed,
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.08)",
      borderWidth: 5,
      pointRadius: 6,
      pointBackgroundColor: "#10b981",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      tension: 0.3,
      fill: true,
      order: 1,
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'top',
        offset: 4,
        color: '#059669',
        font: { size: 11, weight: '700' },
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
          color: THEME.slideMuted || '#64748b',
          font: { size: 9, weight: '600' },
          boxWidth: 12,
          padding: 12,
          usePointStyle: true
        }
      },
      datalabels: {
        color: THEME.slideText || '#1e293b',
        font: { size: 14, weight: '800' },
        anchor: 'center',
        align: 'center',
        formatter: v => v > 0 ? v.toLocaleString() : ''
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: THEME.chartTick, font: { size: 9 } },
        grid: { color: THEME.chartGrid, lineWidth: 0.5 }
      },
      x: {
        ticks: { color: THEME.chartTick, font: { size: 10, weight: '600' } }
      }
    }
  });
}

// =====================================================================
// ===== SLIDE 3: Calls Volume =====
// =====================================================================
function renderSlide3() {
  const d = state.exotelKPIs;
  var isFC = document.getElementById("sidebarProjectName").textContent === "Client FC (C15)";
  var vp = document.getElementById("slide3")?.closest('.slide-viewport');
  if (isFC) { if (vp) vp.style.display = "none"; return; }
  if (vp) vp.style.display = "block";
  if (!d) { addLog("renderSlide3: exotelKPIs is null","warn"); return; }
  var isJE = document.getElementById("sidebarProjectName").textContent === "Client JE (C11)";
  addLog("renderSlide3: total=" + d.total + " completed=" + d.completed + " missed=" + d.missed + " avgAHT=" + d.avgAHT.toFixed(1), "info");

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const weekTotal = weekLabels.map(w => d.weekData[w] || 0);
  const weekCompleted = weekLabels.map(w => d.weekCompletedData[w] || 0);
  const weekMissed = weekLabels.map(w => d.weekMissedData[w] || 0);

  const aht = formatSecToMinSec(Math.round(d.avgAHT));
  const ring = formatSecToMinSec(Math.round(d.avgRing));

  // Answer rate
  var answerRate = d.total > 0 ? Math.round(d.completed / d.total * 100) : 0;

  // Inject answer rate gauge into the chart panel's top-right
  var chartPanel = document.getElementById("s3Chart");
  if (chartPanel) {
    var gaugeWrap = document.getElementById("s3GaugeWrap");
    if (!gaugeWrap) {
      gaugeWrap = document.createElement('div');
      gaugeWrap.id = 's3GaugeWrap';
      gaugeWrap.innerHTML = '<canvas id="s3Gauge" width="80" height="80"></canvas>';
      chartPanel.appendChild(gaugeWrap);
    }
    // Always refresh position so stale inline styles never persist
    gaugeWrap.style.cssText = 'position:absolute;top:8px;right:24px;width:80px;height:80px;z-index:5;pointer-events:none;';
    // Draw the gauge on canvas using 2D API
    var gc = document.getElementById('s3Gauge');
    if (gc) {
      gc.width = 80; gc.height = 80;
      var gctx = gc.getContext('2d');
      var cx = 40, cy = 40, rad = 34, lineW = 8;
      // Background arc (gray ring)
      gctx.beginPath();
      gctx.arc(cx, cy, rad, Math.PI * 0.75, Math.PI * 2.25);
      gctx.strokeStyle = 'rgba(85,87,112,0.12)';
      gctx.lineWidth = lineW;
      gctx.lineCap = 'round';
      gctx.stroke();
      // Filled arc (answer rate)
      var endAngle = Math.PI * 0.75 + (answerRate / 100) * Math.PI * 1.5;
      var gaugeColor = answerRate >= 80 ? '#10b981' : answerRate >= 60 ? '#f59e0b' : '#f43f5e';
      gctx.beginPath();
      gctx.arc(cx, cy, rad, Math.PI * 0.75, endAngle);
      gctx.strokeStyle = gaugeColor;
      gctx.lineWidth = lineW;
      gctx.lineCap = 'round';
      gctx.stroke();
      // Center text
      gctx.fillStyle = THEME.slideText || '#1D1D1F';
      gctx.font = 'bold 16px Inter,sans-serif';
      gctx.textAlign = 'center';
      gctx.textBaseline = 'middle';
      gctx.fillText(answerRate + '%', cx, cy - 4);
      gctx.fillStyle = THEME.slideMuted || '#555770';
      gctx.font = 'bold 7px Inter,sans-serif';
      gctx.fillText('ANSWER RATE', cx, cy + 14);
    }
  }

  // SLA threshold at 80% of max value
  var slaThreshold = 80;

  var kpis = `<div class="kpi-card" style="--kpi-color:var(--kpi-1)"><div class="kpi-val">${d.total.toLocaleString()}</div><div class="kpi-lbl">Inbound Calls Volume</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#10b981"><div class="kpi-val">${d.completed.toLocaleString()}</div><div class="kpi-lbl">Completed Calls</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#f43f5e"><div class="kpi-val">${d.missed.toLocaleString()}</div><div class="kpi-lbl">Missed Calls</div></div>` +
    `<div class="kpi-card" style="--kpi-color:var(--kpi-2)"><div class="kpi-val">${aht}</div><div class="kpi-lbl">Avg Handling Time</div></div>`;
  if (!isJE) {
    kpis += `<div class="kpi-card" style="--kpi-color:#06b6d4"><div class="kpi-val">${ring}</div><div class="kpi-lbl">Avg Ring + IVR Time</div></div>`;
  }
  document.getElementById("s3Kpis").innerHTML = kpis;

  const maxVal = Math.max(...weekTotal, ...weekCompleted, 1);
  const yMax = Math.ceil(maxVal * 1.25);

  destroyChart("chartSlide3");
  createChart("chartSlide3", "bar", weekLabels, [
    {
      label: "Calls Volume",
      data: weekTotal,
      backgroundColor: weekTotal.map((v, i) =>
        tc2(0.4 + i * 0.15)
      ),
      borderRadius: 4,
      borderColor: tc2(0.8),
      borderWidth: 1.5,
      order: 2
    },
    {
      label: "Completed Calls",
      type: 'line',
      data: weekCompleted,
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.08)",
      borderWidth: 5,
      pointRadius: 6,
      pointBackgroundColor: "#10b981",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      tension: 0.3,
      fill: true,
      order: 1,
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'top',
        offset: 4,
        color: '#059669',
        font: { size: 11, weight: '700' },
        formatter: v => v > 0 ? v.toLocaleString() : ''
      }
    }
  ], {
    layout: { padding: { right: 92, top: 8 } },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: THEME.slideMuted || '#64748b',
          font: { size: 9, weight: '600' },
          boxWidth: 12,
          padding: 12,
          usePointStyle: true
        }
      },
      datalabels: {
        color: THEME.slideText || '#1e293b',
        font: { size: 14, weight: '800' },
        anchor: 'center',
        align: 'center',
        formatter: v => v > 0 ? v.toLocaleString() : ''
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: yMax,
        ticks: { color: THEME.chartTick, font: { size: 9 } },
        grid: { color: THEME.chartGrid, lineWidth: 0.5 }
      },
      x: {
        ticks: { color: THEME.chartTick, font: { size: 10, weight: '600' } }
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
  const weekFilter = document.getElementById("weekSelect")?.value || "All";

  for (const row of state.rawData) {
    const dateCol = findCol(row, "Created at", "created at", "Created At");
    if (!dateCol) continue;
    const day = extractDay(dateCol);
    const wk = getWeekNum(day);
    if (weekFilter !== "All" && weekFilter !== wk) continue;
    uniqueDays.add(day);
    var h = NaN;
    if (dateCol instanceof Date && !isNaN(dateCol)) {
      h = dateCol.getHours();
    } else if (typeof dateCol === "number") {
      var dd = new Date((dateCol - 25569) * 86400 * 1000);
      if (!isNaN(dd) && dd.getFullYear() > 100) h = dd.getHours();
    } else {
      var timeMatch = String(dateCol).trim().match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?/i);
      if (timeMatch) {
        h = parseInt(timeMatch[1], 10);
        if (timeMatch[4] && timeMatch[4].toUpperCase() === "PM" && h !== 12) h += 12;
        if (timeMatch[4] && timeMatch[4].toUpperCase() === "AM" && h === 12) h = 0;
      }
    }
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
  var isFC = document.getElementById("sidebarProjectName").textContent === "Client FC (C15)";
  var callChart = document.getElementById("s4CallChart");
  var chatChart = document.getElementById("s4ChatChart");
  if (callChart) callChart.style.display = isFC ? "none" : "";

  const chatInterval = computeChatIntervalData();
  const callInterval = exotel ? exotel.intervalAvg : {};
  const hourLabels = Array.from({length:24}, (_, i) => formatIntervalLabel(i));

  const chatData = hourLabels.map((_, i) => chatInterval[i] || 0);
  const callData = hourLabels.map((_, i) => (callInterval[i] || 0));

  const chatMax = Math.max(...chatData, 1);
  const callMax = Math.max(...callData, 1);
  const chatYMax = Math.ceil(chatMax * 1.25);
  const callYMax = Math.ceil(callMax * 1.25);

  // Find peak hours
  var chatPeakIdx = chatData.indexOf(chatMax);
  var callPeakIdx = callData.indexOf(callMax);
  var chatPeakLabel = hourLabels[chatPeakIdx] || '';
  var callPeakLabel = hourLabels[callPeakIdx] || '';

  // Inject peak hour badges into chart containers
  function injectPeakBadge(containerId, label) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var existing = container.querySelector('.peak-badge');
    if (!existing) {
      var badge = document.createElement('div');
      badge.className = 'peak-badge';
      badge.style.cssText = 'position:absolute;top:4px;right:6px;background:rgba(244,63,94,0.15);border:1px solid rgba(244,63,94,0.35);color:#f43f5e;font-size:8px;font-weight:800;padding:3px 10px;border-radius:12px;letter-spacing:0.04em;z-index:5;white-space:nowrap;';
      badge.textContent = 'Peak: ' + label;
      container.style.position = 'relative';
      container.appendChild(badge);
    } else {
      existing.textContent = 'Peak: ' + label;
    }
  }
  injectPeakBadge('s4ChatChart', chatPeakLabel);
  injectPeakBadge('s4CallChart', callPeakLabel);

  const axisOpts = {
    y: {
      beginAtZero: true,
      ticks: { color: THEME.chartTick || '#555770', font: { size: 8 } },
      grid: { color: THEME.chartGrid || 'rgba(85,87,112,0.08)', lineWidth: 0.5 }
    },
    x: {
      ticks: {
        color: THEME.chartTick || '#555770', font: { size: 7, weight: '600' },
        maxTicksLimit: 12, autoSkip: true
      }
    }
  };

  const teal = THEME.c1;
  const blue = THEME.c2;

  // Create gradient fill helper
  function makeGradient(ctx, colorTop, colorBot) {
    var g = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height || 200);
    g.addColorStop(0, colorTop);
    g.addColorStop(1, colorBot);
    return g;
  }

  // Build chart config with peak highlight and gradient fill
  function buildIntervalChart(canvasId, data, baseColor, peakIdx, yMax) {
    destroyChart(canvasId);
    var bgColors = data.map(function(v, i) {
      if (v <= 0) return 'transparent';
      if (i === peakIdx) return 'rgba(244,63,94,0.65)';
      return hexToRgba(baseColor, 0.35 + (i % 4) * 0.08);
    });
    var borderColors = data.map(function(v, i) {
      if (i === peakIdx) return '#f43f5e';
      return hexToRgba(baseColor, 0.5);
    });

    // Line data for gradient fill overlay
    var lineData = data.map(function(v) { return v; });

    createChart(canvasId, "bar", hourLabels, [
      {
        label: "Volume",
        data: data,
        backgroundColor: bgColors,
        borderRadius: 3,
        borderColor: borderColors,
        borderWidth: 0.5,
        order: 2
      },
      {
        label: "Trend",
        type: 'line',
        data: lineData,
        borderColor: hexToRgba(baseColor, 0.5),
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
        fill: true,
        backgroundColor: function(ctx) {
          if (!ctx.chart) return 'transparent';
          return makeGradient(ctx.chart.ctx, hexToRgba(baseColor, 0.12), 'transparent');
        },
        order: 0,
        datalabels: { display: false }
      }
    ], {
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          anchor: 'end', align: 'end', offset: 2,
          color: THEME.slideText || '#1D1D1F',
          font: { size: 8, weight: '700' },
          formatter: function(v) { return v > 0 ? v : ''; }
        }
      },
      scales: { ...axisOpts, y: { ...axisOpts.y, max: yMax } }
    });
  }

  buildIntervalChart("chartSlide4Chat", chatData, THEME.c1, chatPeakIdx, chatYMax);
  buildIntervalChart("chartSlide4Calls", callData, THEME.c2, callPeakIdx, callYMax);
}

// =====================================================================
// ===== SLIDE 5: Volume Status =====
// =====================================================================
function renderSlide5() {
  const data = state.processed;
  const exotel = state.exotelKPIs;
  if (!data || data.length === 0) return;
  var isFC = document.getElementById("sidebarProjectName").textContent === "Client FC (C15)";
  var callPanel = document.querySelector("#slide5 .slide5-panel.right");
  if (callPanel) callPanel.style.display = isFC ? "none" : "flex";
  var chatPanel = document.querySelector("#slide5 .slide5-panel.left");
  if (chatPanel) chatPanel.style.width = isFC ? "100%" : "";

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
    const diffColor = diff >= 0 ? "#059669" : "#e11d48";
    const arrow = diff >= 0 ? "↑" : "↓";
    el.innerHTML =
      `<div class="slide5-card"><div class="val" style="color:var(--sl-text-muted)">${histVal.toLocaleString()}</div><div class="lbl">Historical Avg</div></div>` +
      `<div class="slide5-card"><div class="val" style="color:${color}">${currentVal.toLocaleString()}</div><div class="lbl">Current Volume</div></div>` +
      `<div class="slide5-card"><div class="val" style="color:${diffColor}">${arrow} ${diffSign}${Math.abs(diff).toLocaleString()}</div><div class="lbl">Difference</div></div>`;
  }

  function renderStatus(containerId, currentVal, histVal, label) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.style.color = "";
    var pct = histVal > 0 ? Math.abs(Math.round((currentVal - histVal) / histVal * 100)) : 0;
    if (currentVal > histVal) {
      el.innerHTML = '<span class="slide5-badge above">🟢 Above Avg</span>' +
        '<span style="font-size:9px;margin-left:8px;color:#059669;font-weight:700">+' + pct + '% vs Historical</span>';
    } else if (currentVal < histVal) {
      el.innerHTML = '<span class="slide5-badge below">🔴 Below Avg</span>' +
        '<span style="font-size:9px;margin-left:8px;color:#e11d48;font-weight:700">-' + pct + '% vs Historical</span>';
    } else {
      el.innerHTML = '<span class="slide5-badge equal">⚪ On Target</span>';
    }
  }

  renderCards("s5ChatCards", histChatVal, chatTotal, chatDiff, chatDiffSign, THEME.c1);
  renderStatus("s5ChatStatus", chatTotal, histChatVal, "chat");
  renderCards("s5CallCards", histCallVal, callTotal, callDiff, callDiffSign, THEME.c2);
  renderStatus("s5CallStatus", callTotal, histCallVal, "call");

  const chatYMax = Math.ceil(Math.max(chatTotal, histChatVal, 1) * 1.25);
  const callYMax = Math.ceil(Math.max(callTotal, histCallVal, 1) * 1.25);

  function buildComparisonChart(canvasId, currentVal, histVal, color, yMax) {
    destroyChart(canvasId);
    createChart(canvasId, "bar", ["Current", "Historical"], [
      {
        label: "Volume",
        data: [currentVal, histVal],
        backgroundColor: [color, hexToRgba(THEME.c1, 0.15)],
        borderColor: [color, hexToRgba(THEME.c1, 0.3)],
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
          color: THEME.slideText || '#1D1D1F',
          font: { size: 13, weight: '800' },
          formatter: v => v.toLocaleString()
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: yMax,
          ticks: { color: THEME.chartTick || '#555770', font: { size: 8 } },
          grid: { color: THEME.chartGrid || 'rgba(85,87,112,0.08)', lineWidth: 0.5 }
        },
        x: {
          ticks: { color: THEME.chartTick || '#555770', font: { size: 11, weight: '700' } }
        }
      }
    });
  }

  buildComparisonChart("chartSlide5Chat", chatTotal, histChatVal, THEME.c1, chatYMax);
  buildComparisonChart("chartSlide5Calls", callTotal, histCallVal, THEME.c2, callYMax);
}

// =====================================================================
// ===== India Map Drawing Utility =====
// =====================================================================
var INDIA_BORDER = [
  // Rann of Kutch / Pakistan border start
  [23.6,68.1],
  // Pakistan border going north
  [24.5,68.3],[25.5,68.5],[26.2,69.0],[26.8,69.7],[27.3,70.0],
  [27.8,70.5],[28.3,71.0],[28.8,71.3],[29.3,71.6],[29.8,72.2],
  [30.3,72.8],[30.8,73.3],[31.3,73.8],[31.8,74.1],[32.2,74.3],
  [32.6,74.4],
  // J&K / Himalayan border going northeast
  [33.0,74.1],[33.4,73.8],[33.9,74.0],[34.4,74.5],[34.9,75.2],
  [35.4,76.0],[35.9,76.8],[36.4,77.5],[36.9,77.9],
  // LAC / China border going east (Ladakh)
  [36.5,79.2],[35.8,79.8],[35.2,80.4],[34.7,81.0],[34.1,81.8],
  [33.5,82.3],[32.9,82.9],[32.3,83.5],[31.8,84.1],
  // Nepal border going east
  [30.5,80.2],[30.1,80.5],[29.6,81.1],[29.1,81.8],[28.6,83.0],
  [28.1,84.1],[27.9,85.5],[27.6,86.7],[27.5,87.5],[27.5,88.0],
  // Sikkim
  [27.8,88.5],
  // Bhutan border
  [27.5,89.2],[27.3,90.5],[27.0,91.5],[27.1,92.0],
  // Arunachal Pradesh goes far northeast
  [27.4,92.6],[27.8,93.5],[28.1,94.6],[28.4,95.8],[28.3,96.8],[27.8,97.4],
  // Myanmar border going south
  [26.7,97.4],[26.1,96.6],[25.6,96.0],[25.1,95.1],[24.6,94.4],
  [24.1,93.8],[23.6,93.2],[23.0,93.0],[22.5,92.7],
  // Mizoram / Tripura / Bangladesh border
  [22.1,92.5],[22.6,91.9],[23.1,91.5],[23.6,91.5],
  [24.1,91.7],[24.5,91.0],[24.5,90.4],[25.0,90.0],
  [25.5,89.8],[26.0,89.2],
  // Siliguri corridor / chicken neck
  [26.7,88.5],[26.5,88.0],
  // West Bengal coast going south
  [22.5,88.5],[21.8,87.8],[21.1,87.0],[20.5,86.5],
  // Odisha / AP / TN east coast
  [19.5,85.5],[18.5,84.5],[17.5,83.5],[17.0,82.5],
  [16.5,82.0],[16.0,81.5],[15.5,80.8],[15.0,80.5],
  [14.5,80.5],[14.0,80.2],[13.5,80.0],[13.0,80.0],
  [12.5,80.0],[12.0,80.2],[11.5,79.8],[11.0,79.5],
  [10.5,79.5],[10.0,79.0],[9.5,78.5],[8.5,77.5],
  // Kanyakumari - southernmost tip
  [8.1,77.5],
  // West coast going north
  [8.5,77.0],[9.0,76.5],[9.5,76.5],[10.0,76.5],[10.5,76.5],
  [11.0,76.0],[11.5,76.0],[12.0,75.5],[12.5,75.5],[13.0,75.0],
  [13.5,75.0],[14.0,74.5],[14.5,74.5],[15.0,74.4],[15.5,74.0],
  [16.0,73.8],[16.5,73.7],[17.0,73.5],[17.5,73.3],[18.0,73.0],
  [18.5,73.0],[19.0,73.0],[19.5,73.0],[20.0,72.8],[20.5,72.5],
  // Gujarat coast
  [21.0,72.5],[21.5,72.2],
  // Saurashtra peninsula tip going west then back
  [22.0,72.6],[22.5,71.5],[22.8,71.0],[23.0,70.3],
  [22.5,70.0],[22.0,69.7],[21.5,69.5],[21.5,70.0],[22.0,70.5],
  [22.5,70.8],[22.5,71.5],[22.0,71.8],[21.5,71.5],[21.2,71.0],
  [21.5,70.2],[22.0,70.0],[22.5,69.0],[22.8,69.5],[23.2,70.0],
  [23.5,70.5],[23.5,71.5],[24.0,71.8],[24.5,72.0],
  // Kutch / Rann of Kutch back to start
  [24.7,71.0],[24.8,70.0],[24.3,69.0],[23.8,68.5],[23.6,68.1]
];

// Andaman & Nicobar Islands (separate polygon)
var ANDAMAN_BORDER = [
  [13.7,93.0],[13.2,93.1],[12.7,93.0],[12.2,92.9],[11.8,92.7],
  [11.5,92.6],[11.2,92.7],[11.0,92.8],[10.7,92.7],[10.5,92.6],
  [10.3,92.7],[10.5,92.9],[10.8,93.0],[11.2,92.9],[11.5,93.0],
  [11.8,93.0],[12.2,93.1],[12.7,93.2],[13.2,93.2],[13.7,93.0]
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

  // projection bounds — uniform scale preserves aspect ratio (no stretch)
  var MIN_LAT = 6.5, MAX_LAT = 37.5, MIN_LNG = 68.0, MAX_LNG = 97.5;
  var pad = 0.08;
  var scaleX = W * (1 - 2 * pad) / (MAX_LNG - MIN_LNG);
  var scaleY = H * (1 - 2 * pad) / (MAX_LAT - MIN_LAT);
  var scale = Math.min(scaleX, scaleY);
  var mapW = (MAX_LNG - MIN_LNG) * scale;
  var mapH = (MAX_LAT - MIN_LAT) * scale;
  var ox = (W - mapW) / 2, oy = (H - mapH) / 2;

  function toXY(lat, lng) {
    return [ox + (lng - MIN_LNG) * scale, H - oy - (lat - MIN_LAT) * scale];
  }

  // Draw India mainland outline
  function drawShape(border) {
    ctx.beginPath();
    var s = toXY(border[0][0], border[0][1]);
    ctx.moveTo(s[0], s[1]);
    for (var i = 1; i < border.length; i++) {
      var pt = toXY(border[i][0], border[i][1]);
      ctx.lineTo(pt[0], pt[1]);
    }
    ctx.closePath();
  }
  var mapFill = hexToRgba(THEME.c1, 0.15);
  var mapStroke = hexToRgba(THEME.c1, 0.5);
  drawShape(INDIA_BORDER);
  ctx.fillStyle = mapFill; ctx.fill();
  ctx.strokeStyle = mapStroke; ctx.lineWidth = 1; ctx.stroke();
  // Draw Andaman & Nicobar Islands
  drawShape(ANDAMAN_BORDER);
  ctx.fillStyle = mapFill; ctx.fill();
  ctx.strokeStyle = mapStroke; ctx.lineWidth = 1; ctx.stroke();

  // If no data, stop here
  if (!locationData || locationData.length === 0) return;

  if (maxVal === undefined || maxVal === 0) {
    maxVal = 1;
    for (var j = 0; j < locationData.length; j++) {
      if (locationData[j][1] > maxVal) maxVal = locationData[j][1];
    }
  }

  var RADIUS_MIN = 8, RADIUS_MAX = 28;

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

    // Outer glow (increased opacity)
    var glowR = r * (k === 0 ? 4 : 3);
    var grad = ctx.createRadialGradient(pos[0], pos[1], 0, pos[0], pos[1], glowR);
    var glowAlpha = dotColor.match(/[\d.]+\)$/);
    var baseAlpha = glowAlpha ? parseFloat(glowAlpha[0]) : 0.85;
    grad.addColorStop(0, dotColor.replace(String(baseAlpha), String(baseAlpha * 0.4)));
    grad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], glowR, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Dot
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Count label (white on colored dot)
    var countSize = Math.max(10, Math.min(16, 9 + r * 0.4));
    if (k === 0) countSize = Math.min(countSize * 1.2, 18);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold " + countSize + "px Inter,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 6;
    ctx.fillText(count, pos[0], pos[1] + 0.5);
    ctx.shadowBlur = 0;

    // City name below dot — top city larger font; dark text on light panel
    var nameFontSize = k === 0 ? 12 : 10;
    ctx.fillStyle = k === 0 ? THEME.slideText || "#1D1D1F" : hexToRgba(THEME.slideText || "#1D1D1F", 0.8);
    ctx.font = (k === 0 ? "700" : "600") + " " + nameFontSize + "px Inter,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(cityName, pos[0], pos[1] + r + 3);
  }
}

// =====================================================================
// ===== SLIDE 6: Top Locations (India Map) =====
// =====================================================================
function renderSlide6() {
  var data = state.processed;
  var exotel = state.exotelKPIs;
  if (!data || data.length === 0) return;
  var clientName = document.getElementById("sidebarProjectName").textContent || "";

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

  // Call locations — only Exotel (C1) has real location data via FromCircle
  var isC1 = clientName === "Client SJ (C1)";
  var callLocations = [];
  if (isC1) {
    callLocations = exotel ? (exotel.topLocations || []) : [];
    if (callLocations.length > 0 && typeof callLocations[0] === 'object' && callLocations[0].name !== undefined) {
      callLocations = callLocations.map(function(l) { return [l.name, l.count]; });
    }
    callLocations = callLocations.sort(function(a, b) { return b[1] - a[1]; }).slice(0, 10);
  }

  // Hide entire slide if no location data at all
  var vp6 = document.getElementById("slide6")?.closest('.slide-viewport');
  if (chatLocations.length === 0 && callLocations.length === 0) {
    if (vp6) vp6.style.display = "none"; return;
  }
  if (vp6) vp6.style.display = "block";

  // Hide/show call locations panel
  var noCallData = !isC1;
  var callPanel = document.querySelector("#slide6 .slide6-panel:nth-child(2)");
  var chatPanel = document.querySelector("#slide6 .slide6-panel:nth-child(1)");
  if (callPanel) callPanel.style.display = noCallData ? "none" : "";

  // Build ranked city list HTML
  function buildRankList(locs) {
    var top5 = locs.slice(0, 5);
    if (!top5.length) return '';
    return '<div class="slide6-rank-list">' +
      top5.map(function(loc, i) {
        return '<div class="slide6-rank-item">' +
          '<span class="slide6-rank-num">' + (i+1) + '</span>' +
          '<span class="slide6-rank-city">' + loc[0] + '</span>' +
          '<span class="slide6-rank-count">' + Number(loc[1]).toLocaleString() + '</span>' +
          '</div>';
      }).join('') +
      '</div>';
  }

  // Inject ranked list into slide6 panels (preserve canvas ID)
  function injectRankList(panel, canvasId, locations) {
    if (!panel) return;
    var label = panel.querySelector('.slide6-map-label');
    var labelHtml = label ? label.outerHTML : '';
    panel.innerHTML = labelHtml +
      '<div class="slide6-map-row">' +
      '<canvas id="' + canvasId + '"></canvas>' +
      '</div>' +
      buildRankList(locations);
  }

  injectRankList(chatPanel, 'mapSlide6Chat', chatLocations);
  if (!noCallData) injectRankList(callPanel, 'mapSlide6Calls', callLocations);

  // Find max for scaling — use per-map max so dots are properly sized
  var chatMax = 1, callMax = 1;
  for (var i = 0; i < chatLocations.length; i++) if (chatLocations[i][1] > chatMax) chatMax = chatLocations[i][1];
  for (var j = 0; j < callLocations.length; j++) if (callLocations[j][1] > callMax) callMax = callLocations[j][1];

  destroyChart("chartSlide6Chat");
  destroyChart("chartSlide6Calls");
  drawIndiaMap("mapSlide6Chat", chatLocations, tc1(0.85), chatMax);
  drawIndiaMap("mapSlide6Calls", callLocations, tc2(0.85), callMax);
}

// =====================================================================
// ===== SLIDE 7: Issue Count =====
// =====================================================================
function renderSlide7() {
  const exotel = state.exotelKPIs;
  if (!state.processed || state.processed.length === 0) return;
  var isFC = document.getElementById("sidebarProjectName").textContent === "Client FC (C15)";
  var callChart = document.querySelector("#slide7 .slide7-chart.right");
  if (callChart) callChart.style.display = isFC ? "none" : "flex";
  var chatPanel = document.querySelector("#slide7 .slide7-chart.left");
  if (chatPanel) { chatPanel.style.right = isFC ? "20px" : ""; chatPanel.style.width = ""; }

  const chatTagCounts = state.chatTagCounts || {};
  const chatTop = Object.entries(chatTagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const callTop = exotel ? (exotel.topIssues || []).map(i => [i.code, i.count, i.avgAHT]) : [];

  function buildHorizBar(canvasId, labels, values, ahtValues, baseColor) {
    destroyChart(canvasId);
    var total = values.reduce(function(a,b){return a+b;},0) || 1;
    function fmtAHT(v) {
      if (!v || v === '00:00:00') return '';
      var p = v.split(':');
      var h = parseInt(p[0],10), m = parseInt(p[1],10), s = parseInt(p[2],10);
      var parts = [];
      if (h > 0) parts.push(h + 'h');
      if (m > 0) parts.push(m + 'm');
      if (s > 0 || parts.length === 0) parts.push(s + 's');
      return parts.join(' ');
    }
    var chart = createChart(canvasId, "bar", labels, [{
      label: "Count",
      data: values,
      backgroundColor: baseColor,
      borderColor: baseColor,
      borderWidth: 0,
      borderRadius: 3,
      datalabels: {
        display: true,
        anchor: 'end', align: 'end', offset: 5,
        color: THEME.slideText || '#1e293b',
        font: { size: 8, weight: '700' },
        formatter: function(v) {
          if (!v) return '';
          return v + ' (' + Math.round(v/total*100) + '%)';
        }
      }
    }], {
      indexAxis: 'y',
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: THEME.chartTick, font: { size: 8 } },
          grid: { color: THEME.chartGrid, lineWidth: 0.5 }
        },
        y: {
          ticks: {
            color: THEME.chartTick, font: { size: 7.5, weight: '600' },
            maxTicksLimit: 10
          },
          grid: { display: false }
        }
      }
    });
    if (chart && ahtValues) {
      function drawAHT() {
        var ctx = chart.ctx;
        var meta = chart.getDatasetMeta(0);
        if (!meta || !meta.data || !meta.data.length) return;
        meta.data.forEach(function(bar, i) {
          var txt = fmtAHT(ahtValues[i]);
          if (!txt) return;
          ctx.save();
          ctx.fillStyle = '#1e293b';
          ctx.font = '700 7px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(txt, (bar.x + bar.base) / 2, bar.y);
          ctx.restore();
        });
      }
      chart.options.animation.onComplete = drawAHT;
    }
  }

  const chatLabels = chatTop.map(e => e[0]);
  const chatValues = chatTop.map(e => e[1]);
  const callLabels = callTop.map(e => e[0]);
  const callValues = callTop.map(e => e[1]);

  // Compute AHT per chat tag from raw data
  var isWC7 = document.getElementById("sidebarProjectName").textContent === "Client WC (C10)";
  function filterWCTags7(tags) {
    if (!isWC7 || tags.length <= 1) return tags;
    return tags.filter(function(t) { return t !== "General Query"; });
  }
  const chatTagDurs = {};
  const chatTagCounts2 = {};
  for (const row of state.rawData) {
    const tag = findCol(row, "Conversation tags", "conversation tags", "Conversation Tags");
    if (!tag || !String(tag).trim()) continue;
    const dur = safeNum(findCol(row, "Time to last close (seconds)", "Time to last close"));
    filterWCTags7(String(tag).split(",").map(t => t.trim()).filter(Boolean)).forEach(t => {
      chatTagDurs[t] = (chatTagDurs[t] || 0) + dur;
      chatTagCounts2[t] = (chatTagCounts2[t] || 0) + 1;
    });
  }
  const chatAht = chatLabels.map(t => {
    var avg = chatTagCounts2[t] ? chatTagDurs[t] / chatTagCounts2[t] : 0;
    return secondsToHMS(Math.round(avg));
  });
  const callAht = callTop.map(e => e[2] || '');

  buildHorizBar("chartSlide7Chat", chatLabels, chatValues, null, tc1(0.75));
  buildHorizBar("chartSlide7Calls", callLabels, callValues, callAht, tc2(0.75));
}

// =====================================================================
// ===== SLIDE 8: Repeat Customer Count =====
// =====================================================================
function renderSlide8() {
  var exotel = state.exotelKPIs;
  var vp = document.getElementById("slide8")?.closest('.slide-viewport');
  var clientName = document.getElementById("sidebarProjectName").textContent || "";
  var isPK = clientName === "Client PK";
  var isJE = clientName === "Client JE (C11)";
  var isWC8 = clientName === "Client WC (C10)";
  if (isPK || isJE || (!exotel && !state.chatRepeatTable)) { if (vp) vp.style.display = "none"; return; }
  if (vp) vp.style.display = "block";

  var callTop = exotel ? (exotel.repeatTable || []).map(function(r) {
    return [r.DispositionCodes, r["Count of Count of From"] || r.count];
  }) : [];
  var chatTop = (!isWC8 && state.chatRepeatTable || []).map(function(r) {
    return [r.DispositionCodes, r["Count of Count of From"] || r.count];
  });
  var totalCallRepeat = callTop.reduce(function(s, e) { return s + e[1]; }, 0);
  var totalChatRepeat = isWC8 ? 0 : chatTop.reduce(function(s, e) { return s + e[1]; }, 0);
  var totalRepeat = totalCallRepeat + totalChatRepeat;
  var totalCompleted = exotel ? exotel.completed : 0;
  var repeatRate = totalCompleted > 0
    ? (totalRepeat / totalCompleted * 100).toFixed(1) + '%' : '—';
  var topIssue = callTop.length > 0 ? callTop[0][0] : (chatTop.length > 0 ? chatTop[0][0] : '—');

  var body = document.querySelector("#slide8 .slide8-body");
  if (body) {
    var html = '<div style="display:flex;gap:16px;width:100%;height:100%">';
    if (chatTop.length > 0) {
      html += '<div class="slide8-chart">' +
        '<div style="font-size:11px;font-weight:700;color:var(--primary);margin-bottom:6px">Chat Repeat Users</div>' +
        '<div style="flex:1;position:relative"><canvas id="chartSlide8Chat"></canvas></div></div>';
    }
    if (callTop.length > 0) {
      html += '<div class="slide8-chart">' +
        '<div style="font-size:11px;font-weight:700;color:' + (THEME.c2 || '#6366f1') + ';margin-bottom:6px">Call Repeat Callers</div>' +
        '<div style="flex:1;position:relative"><canvas id="chartSlide8Calls"></canvas></div></div>';
    }
    html += '<div style="width:180px;display:flex;flex-direction:column;gap:12px;justify-content:center;flex-shrink:0">' +
      '<div class="slide8-sum-stat"><div class="slide8-sum-val" style="color:var(--primary)">' + totalRepeat.toLocaleString() + '</div><div class="slide8-sum-key">Total Repeat Users</div></div>' +
      '<div class="slide8-sum-stat"><div class="slide8-sum-val" style="font-size:14px;line-height:1.35;word-break:break-word">' + topIssue + '</div><div class="slide8-sum-key">Top Repeat Issue</div></div>' +
      '<div class="slide8-sum-stat"><div class="slide8-sum-val" style="color:#e11d48">' + repeatRate + '</div><div class="slide8-sum-key">Repeat Rate</div></div>' +
      '</div></div>';
    body.innerHTML = html;
  }

  destroyChart("chartSlide8Chat");
  destroyChart("chartSlide8Calls");

  function buildChart(canvasId, data, color) {
    if (!data || data.length === 0) return;
    var labels = data.map(function(e) { return e[0]; });
    var values = data.map(function(e) { return e[1]; });
    createChart(canvasId, "bar", labels, [{
      label: "Repeat Users",
      data: values,
      backgroundColor: color,
      borderWidth: 0,
      borderRadius: 4
    }], {
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          anchor: 'end', align: 'end', offset: 4,
          color: THEME.slideText || '#1e293b',
          font: { size: 9, weight: '700' }
        }
      },
      scales: {
        x: { beginAtZero: true, ticks: { color: THEME.chartTick, font: { size: 8 } }, grid: { color: THEME.chartGrid, lineWidth: 0.5 } },
        y: { ticks: { color: THEME.chartTick, font: { size: 8, weight: '600' } }, grid: { display: false } }
      }
    });
  }

  buildChart("chartSlide8Chat", chatTop, tc1(0.75));
  buildChart("chartSlide8Calls", callTop, tc2(0.75));
}

// =====================================================================
// ===== SLIDE 9: Disposition Count & Volume Comparison =====
// =====================================================================
function renderSlide9() {
  const data = state.processed;
  const exotel = state.exotelKPIs;
  if (!data || data.length === 0) return;
  var isFC = document.getElementById("sidebarProjectName").textContent === "Client FC (C15)";
  var callChart = document.querySelector("#slide9 .slide9-chart.right");
  if (callChart) callChart.style.display = isFC ? "none" : "flex";
  var chatPanel = document.querySelector("#slide9 .slide9-chart.left");
  if (chatPanel) { chatPanel.style.right = isFC ? "20px" : ""; chatPanel.style.width = ""; }

  const chatCompleted = data.reduce((s, r) => s + r["Closed"], 0);
  const chatDisposed = data.reduce((s, r) => s + r["Tagged"], 0);
  const chatRate = chatCompleted > 0 ? ((chatDisposed / chatCompleted) * 100).toFixed(1) : "—";

  const callDisposed = exotel && exotel.differenceTable ? (exotel.differenceTable["Tagged"] || 0) : 0;
  const callCompleted = exotel ? exotel.completed : 0;
  const callRate = callCompleted > 0 ? ((callDisposed / callCompleted) * 100).toFixed(1) : "—";

  document.getElementById("s9ChatRate").textContent = `${chatRate}%`;
  document.getElementById("s9ChatRate").style.color = chatDisposed >= chatCompleted / 2 ? "#059669" : "#f59e0b";
  document.getElementById("s9CallRate").textContent = `${callRate}%`;
  document.getElementById("s9CallRate").style.color = callDisposed >= callCompleted / 2 ? "#059669" : "#f59e0b";

  // Inject progress bars
  function injectProgressBar(panelSel, disposed, completed) {
    var panel = document.querySelector(panelSel);
    if (!panel) return;
    var existing = panel.querySelector('.s9-progress-wrap');
    if (!existing) {
      var wrap = document.createElement('div');
      wrap.className = 's9-progress-wrap';
      wrap.innerHTML = '<div class="s9-progress-fill"></div>';
      var header = panel.querySelector('.slide9-header');
      if (header && header.nextSibling) panel.insertBefore(wrap, header.nextSibling);
      else if (header) panel.appendChild(wrap);
    }
    var fill = panel.querySelector('.s9-progress-fill');
    if (fill) {
      var pct = completed > 0 ? Math.min(100, disposed / completed * 100) : 0;
      fill.style.width = pct.toFixed(1) + '%';
      fill.style.background = disposed >= completed / 2
        ? 'linear-gradient(90deg,#10b981,#059669)'
        : 'linear-gradient(90deg,#f59e0b,#ea580c)';
    }
  }
  injectProgressBar("#slide9 .slide9-chart.left", chatDisposed, chatCompleted);
  injectProgressBar("#slide9 .slide9-chart.right", callDisposed, callCompleted);

  document.getElementById("s9ChatInsight").textContent =
    `${chatDisposed.toLocaleString()} out of ${chatCompleted.toLocaleString()} closed chats were tagged (${chatRate}%)`;
  document.getElementById("s9ChatInsight").style.color =
    chatDisposed >= chatCompleted / 2 ? "rgba(16,185,129,0.7)" : "rgba(244,63,94,0.7)";

  document.getElementById("s9CallInsight").textContent =
    `${callDisposed.toLocaleString()} out of ${callCompleted.toLocaleString()} completed calls were disposed (${callRate}%)`;
  document.getElementById("s9CallInsight").style.color =
    callDisposed >= callCompleted / 2 ? "rgba(16,185,129,0.7)" : "rgba(244,63,94,0.7)";

  function buildComparisonBar(canvasId, completedVal, disposedVal, label1, label2, color) {
    destroyChart(canvasId);
    const yMax = Math.ceil(Math.max(completedVal, 1) * 1.2);
    var isChat = label1 === "Closed";
    if (isChat) {
      var notTagged = Math.max(0, completedVal - disposedVal);
      createChart(canvasId, "bar", [label1, label2], [
        { label: "Closed", data: [completedVal, 0], backgroundColor: "rgba(34,197,94,0.75)", borderColor: "#22c55e", borderWidth: 1, borderRadius: 4, barPercentage: 0.7, categoryPercentage: 0.8 },
        { label: "Tagged", data: [0, disposedVal], backgroundColor: color, borderColor: color.replace('0.75','1'), borderWidth: 1, borderRadius: 4, barPercentage: 0.7, categoryPercentage: 0.8 },
        { label: "Not Tagged", data: [0, notTagged], backgroundColor: "rgba(148,163,184,0.4)", borderColor: "rgba(148,163,184,0.6)", borderWidth: 1, borderRadius: 4, barPercentage: 0.7, categoryPercentage: 0.8 }
      ], {
        plugins: {
          legend: { display: true, position: 'bottom', labels: { color: THEME.slideMuted, font: { size: 9, weight: '600' }, boxWidth: 10, padding: 8, usePointStyle: true } },
          datalabels: { display: true, color: THEME.slideText || '#1D1D1F', font: { size: 13, weight: '800' }, anchor: 'end', align: 'end', offset: 4, formatter: function(v) { return v > 0 ? v.toLocaleString() : ''; } }
        },
        scales: {
          x: { stacked: true, ticks: { color: THEME.chartTick || '#555770', font: { size: 11, weight: '700' } }, grid: { display: false } },
          y: { beginAtZero: true, max: yMax, ticks: { color: THEME.chartTick || '#555770', font: { size: 8 } }, grid: { color: THEME.chartGrid || 'rgba(85,87,112,0.08)', lineWidth: 0.5 } }
        }
      });
    } else {
      createChart(canvasId, "bar", [label1, label2], [
        { label: "Volume", data: [completedVal, disposedVal], backgroundColor: ["rgba(34,197,94,0.75)", color], borderColor: ["#22c55e", "rgba(249,115,22,0.75)"], borderWidth: 1, borderRadius: 4, barPercentage: 0.7, categoryPercentage: 0.8 }
      ], {
        plugins: {
          legend: { display: false },
          datalabels: { display: true, anchor: 'end', align: 'end', offset: 4, color: THEME.slideText || '#1D1D1F', font: { size: 14, weight: '800' } }
        },
        scales: {
          x: { ticks: { color: THEME.chartTick || '#555770', font: { size: 11, weight: '700' } }, grid: { display: false } },
          y: { beginAtZero: true, max: yMax, ticks: { color: THEME.chartTick || '#555770', font: { size: 8 } }, grid: { color: THEME.chartGrid || 'rgba(85,87,112,0.08)', lineWidth: 0.5 } }
        }
      });
    }
  }

  buildComparisonBar("chartSlide9Chat", chatCompleted, chatDisposed, "Closed", "Tagged", tc1(0.75));
  buildComparisonBar("chartSlide9Calls", callCompleted, callDisposed, "Completed", "Disposed", tc2(0.75));
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

  // ── KPI cards with red/orange coloring for escalation severity ──
  document.getElementById("s10Kpis").innerHTML =
    `<div class="kpi-card" style="--kpi-color:#f43f5e"><div class="kpi-val">${totalSum.toLocaleString()}</div><div class="kpi-lbl">Total Escalations</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#10b981"><div class="kpi-val">${resolvedSum.toLocaleString()}</div><div class="kpi-lbl">Resolved</div></div>` +
    `<div class="kpi-card" style="--kpi-color:#f59e0b"><div class="kpi-val">${pendingSum.toLocaleString()}</div><div class="kpi-lbl">Pending</div></div>`;

  // ── Inject severity heatmap row + top-issue callout ──
  var body10 = document.querySelector("#slide10 .slide10-body");
  if (body10) {
    // Remove stale callout node
    ['slide10-callout-row'].forEach(function(id){
      var old = body10.querySelector('.'+id); if (old) old.remove();
    });

    // Top issue callout
    var calloutDiv = document.createElement('div');
    calloutDiv.className = 'slide10-callout slide10-callout-row';
    var topIssue = labels.length > 0 ? labels[0] : '—';
    var topTotal = sorted.length > 0 ? (parseInt(sorted[0][1],10)||0) : 0;
    calloutDiv.innerHTML =
      '<span class="slide10-callout-label">🔺 Top Issue:</span>' +
      '<span class="slide10-callout-val">' + topIssue + ' — ' + topTotal.toLocaleString() + ' cases</span>';

    var tableWrap = document.getElementById("s10TableWrap");
    if (tableWrap) {
      body10.insertBefore(calloutDiv, tableWrap);
    }
  }

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
      backgroundColor: "rgba(16,185,129,0.75)",
      borderColor: "#10b981",
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: "Pending",
      data: pendingArr,
      backgroundColor: "rgba(244,63,94,0.75)",
      borderColor: "#f43f5e",
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: "Other",
      data: otherArr,
      backgroundColor: hexToRgba(THEME.c1, 0.12),
      borderColor: hexToRgba(THEME.c1, 0.25),
      borderWidth: 1,
      borderRadius: 2
    }
  ], {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true, position: 'bottom',
        labels: {
          color: THEME.slideMuted || '#64748b', font: { size: 8, weight: '600' },
          boxWidth: 10, padding: 8, usePointStyle: true
        }
      },
      datalabels: { display: false }
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        ticks: { color: THEME.chartTick, font: { size: 8 } },
        grid: { color: THEME.chartGrid, lineWidth: 0.5 }
      },
      y: {
        stacked: true,
        ticks: { color: THEME.chartTick, font: { size: 8, weight: '600' } },
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
  var clientName = document.getElementById("sidebarProjectName").textContent;
  var isSJ = clientName === "Client SJ (C1)";
  var isWC = clientName === "Client WC (C10)";
  var isJE = clientName === "Client JE (C11)";
  var isPK = clientName === "Client PK";
  var callLabel = (isWC || isPK) ? "Ameyo" : (isJE ? "Frejun" : "Exotel");
  var hasCost = (isSJ || isJE) && state.exotelKPIs;

  if (!payData || payData.length === 0) {
    sideEl.innerHTML = '<div style="color:var(--sl-text-muted,#555770);font-size:9px;text-align:center;padding:20px">No rows found in Payment Details sheet. Open Editor → Payment Details tab, enter data, click Save All Sheets, then regenerate.</div>';
    bottomEl.innerHTML = '';
    destroyChart("chartSlide11");
    destroyChart("chartSlide11CallType");
    return;
  }

  let intercomAmt = 0, callAmt = 0, gst = 0;
  let intercomSeats = 0, callSeats = 0, doubletickSeats = 0;

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
    } else if (combined.includes("exotel") || ((isWC || isPK) && combined.includes("ameyo")) || (isJE && combined.includes("frejun"))) {
      callAmt += amtInt;
      if (agents > 0) callSeats = Math.max(callSeats, agents);
    } else if (combined.includes("doubletick") || combined.includes("double")) {
      if (agents > 0) doubletickSeats = Math.max(doubletickSeats, agents);
    }

    gst += tax;
  });

  intercomAmt = Math.round(intercomAmt);
  callAmt = Math.round(callAmt);
  gst = Math.round(gst);
  const totalSubs = intercomAmt + callAmt;

  var fmt = function(v) { return '₹' + Number(v).toLocaleString('en-IN'); };

  // --- Side panel: seats + donut + total call cost ---
  var seatsClass = hasCost ? "s11-seats-row" : "s11-seats-col";
  var seatsHtml =
    '<div class="' + seatsClass + '">' +
      '<div class="s11-seat-card"><div class="s11-seat-val" style="color:var(--kpi-1)">' + intercomSeats.toLocaleString('en-IN') + '</div><div class="s11-seat-lbl">Intercom</div></div>' +
      '<div class="s11-seat-card"><div class="s11-seat-val" style="color:#8b5cf6">' + callSeats.toLocaleString('en-IN') + '</div><div class="s11-seat-lbl">' + callLabel + '</div></div>' +
      '<div class="s11-seat-card"><div class="s11-seat-val" style="color:#f59e0b">' + doubletickSeats.toLocaleString('en-IN') + '</div><div class="s11-seat-lbl">Doubletick</div></div>' +
    '</div>';

  var costHtml = '';
  var totalCallCost = 0;
  var completedCost = 0, missedCost = 0;
  if (hasCost) {
    completedCost = state.exotelKPIs.totalCost || 0;
    missedCost = state.exotelKPIs.missedCost || 0;
    totalCallCost = completedCost + missedCost;
    costHtml =
      '<div style="font-size:10px;font-weight:700;color:var(--sl-label);text-align:center;margin-bottom:4px;flex-shrink:0">Amount Spent by Call Type</div>' +
      '<div class="s11-donut-wrap"><canvas id="chartSlide11CallType"></canvas></div>' +
      '<div class="kpi-card" style="--kpi-color:#06b6d4"><div class="kpi-val">' + fmt(totalCallCost) + '</div><div class="kpi-lbl">Total Call Spent Cost</div></div>';
  }

  sideEl.innerHTML = seatsHtml + costHtml;

  // --- Bottom panel: Amount Spent + GST + Avg Call Cost ---
  var bottomHtml =
    '<div class="kpi-card" style="--kpi-color:var(--kpi-2)"><div class="kpi-val">' + fmt(totalSubs) + '</div><div class="kpi-lbl">Amount Spent (Incl. GST)</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#f59e0b"><div class="kpi-val">' + fmt(gst) + '</div><div class="kpi-lbl">GST</div></div>';

  if (hasCost) {
    var avgCost = state.exotelKPIs.avgCostPerCall || 0;
    bottomHtml += '<div class="kpi-card" style="--kpi-color:#06b6d4"><div class="kpi-val">' + fmt(avgCost) + '</div><div class="kpi-lbl">Avg Call Cost</div></div>';
  }

  bottomEl.innerHTML = bottomHtml;

  // --- Charts ---
  destroyChart("chartSlide11");
  destroyChart("chartSlide11CallType");
  if (intercomAmt === 0 && callAmt === 0) return;

  createChart("chartSlide11", "pie", ["Intercom", callLabel], [
    {
      data: [intercomAmt, callAmt],
      backgroundColor: [tc1(0.75), tc2(0.75)],
      borderColor: [THEME.c1, THEME.c2],
      borderWidth: 2
    }
  ], {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: THEME.chartTick || '#555770', font: { size: 10, weight: '600' },
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

  if (hasCost && totalCallCost > 0) {
    createChart("chartSlide11CallType", "doughnut", ["Completed", "Missed"], [
      {
        data: [completedCost, missedCost],
        backgroundColor: [tc1(0.75), "#f43f5e"],
        borderColor: [THEME.c1, "#f43f5e"],
        borderWidth: 2
      }
    ], {
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: THEME.chartTick || '#555770', font: { size: 9, weight: '600' },
            padding: 8, usePointStyle: true, boxWidth: 10
          }
        },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              return ctx.label + ': ₹' + ctx.raw.toFixed(2);
            }
          }
        },
        datalabels: {
          color: '#fff', font: { size: 9, weight: '700' },
          formatter: function(v) { return '₹' + Number(v).toLocaleString('en-IN'); }
        }
      }
    });
  }
}

// =====================================================================
// ===== SLIDE 12: Product Management / Agent Productivity =====
// =====================================================================
function renderSlide12() {
  const prodData = getTableData("agentProdData");
  const sideEl = document.getElementById("s12Side");

  if (!prodData || prodData.length === 0) {
    sideEl.innerHTML = '<div style="color:var(--sl-text-muted,#555770);font-size:9px;text-align:center;padding:20px">No data in Agent Productivity sheet. Open Editor → Agent Productivity tab, enter data, click Save All Sheets, then regenerate.</div>';
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

  rows.sort(function(a, b) { return b.chats - a.chats; });

  const labels = rows.map(function(r) { return r.name; });
  const chatsArr = rows.map(function(r) { return r.chats; });
  const callsArr = rows.map(function(r) { return r.calls; });
  const whatsappArr = rows.map(function(r) { return r.whatsapp; });

  sideEl.innerHTML =
    '<div class="kpi-card" style="--kpi-color:var(--kpi-2)"><div class="kpi-val">' + totalAgents + '</div><div class="kpi-lbl">Total Agents</div></div>' +
    '<div class="kpi-card" style="--kpi-color:var(--kpi-1)"><div class="kpi-val">' + nonVoiceAgents + '</div><div class="kpi-lbl">Non-Voice Agents (Chats)</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#10b981"><div class="kpi-val">' + inboundAgents + '</div><div class="kpi-lbl">Inbound Agents (Calls)</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#f59e0b"><div class="kpi-val">' + whatsappAgents + '</div><div class="kpi-lbl">WhatsApp Agents</div></div>';

  destroyChart("chartSlide12");
  createChart("chartSlide12", "bar", labels, [
    {
      label: "Chats",
      data: chatsArr,
      backgroundColor: tc1(0.75),
      borderColor: THEME.c1,
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: "Calls",
      data: callsArr,
      backgroundColor: tc2(0.75),
      borderColor: THEME.c2,
      borderWidth: 1,
      borderRadius: 2
    },
    {
      label: "WhatsApp",
      data: whatsappArr,
      backgroundColor: "rgba(245,158,11,0.75)",
      borderColor: "#f59e0b",
      borderWidth: 1,
      borderRadius: 2
    }
  ], {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true, position: 'bottom',
        labels: {
          color: THEME.chartTick || '#555770', font: { size: 8, weight: '600' },
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
        color: THEME.slideText || '#1D1D1F',
        font: { size: 6, weight: '700' },
        formatter: function(v) { return v > 0 ? v : ''; }
      }
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        ticks: { color: THEME.chartTick || '#555770', font: { size: 8 } },
        grid: { color: THEME.chartGrid || 'rgba(85,87,112,0.08)', lineWidth: 0.5 }
      },
      y: {
        stacked: true,
        ticks: { color: THEME.chartTick || '#555770', font: { size: 8, weight: '600' } },
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
    wrap.innerHTML = '<div style="color:var(--sl-text-muted,#555770);font-size:9px;text-align:center;padding:20px">No data in Agent KPI sheet. Open Editor → Agent KPI tab, enter data, click Save All Sheets, then regenerate.</div>';
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
  var total = agents.length;
  var topCount = Math.min(5, Math.ceil(total / 2));
  var bottomCount = Math.min(5, Math.floor(total / 2));
  var topArr = agents.slice(0, topCount);
  var bottomArr = agents.slice(total - bottomCount).reverse();

  var chartOpts = function() {
    return {
      indexAxis: 'y',
      layout: { padding: { top: 10, right: 40, bottom: 8, left: 10 } },
      plugins: {
        legend: { display: false },
        datalabels: {
          anchor: 'end', align: 'end', offset: 2,
          color: THEME.slideText || '#1D1D1F',
          font: { size: 7, weight: '700' },
          formatter: function(v) { return v > 0 ? fmtNum(v) : ''; }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: THEME.chartTick || '#555770', font: { size: 6.5 } },
          grid: { color: THEME.chartGrid || 'rgba(85,87,112,0.08)', lineWidth: 0.5 }
        },
        y: {
          ticks: { color: THEME.chartTick || '#555770', font: { size: 6.5, weight: '600' } },
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

  buildChart("chartSlide13Top", topArr, tc1(0.75));
  buildChart("chartSlide13Bottom", bottomArr, "rgba(244,63,94,0.75)");

  var maxPts = agents.length > 0 ? agents[0].achieved : 1;
  var medals = ['🥇','🥈','🥉'];

  function scoreBadge(pts) {
    var r = maxPts > 0 ? pts / maxPts : 0;
    var cls = r >= 0.75 ? 'green' : r >= 0.5 ? 'yellow' : 'red';
    var barPct = Math.round(r * 100);
    return '<span class="score-badge ' + cls + '">' + fmtNum(pts) + '</span>' +
      '<div class="kpi-bar-wrap" style="width:50px;margin:2px auto 0"><div class="kpi-bar-fill" style="width:' + barPct + '%;background:' + (cls==='green'?'#059669':cls==='yellow'?'#d97706':'#e11d48') + '"></div></div>';
  }

  var html = '<table><thead><tr><th>Rank</th><th>Agent Name</th><th>Attendance</th><th>Quality</th><th>Productivity</th><th>Achieved Points</th></tr></thead><tbody>';
  var rank = 1;
  topArr.forEach(function(a) {
    var medal = rank <= 3 ? medals[rank-1] + ' ' : '';
    html += '<tr class="top-row"><td>' + medal + rank++ + '</td><td>' + a.name + '</td><td>' + a.attendance + '</td><td>' + a.quality + '</td><td>' + a.productivity + '</td><td>' + scoreBadge(a.achieved) + '</td></tr>';
  });
  var bottomRev = bottomArr.slice().reverse();
  bottomRev.forEach(function(a) {
    html += '<tr class="bottom-row"><td>' + rank++ + '</td><td>' + a.name + '</td><td>' + a.attendance + '</td><td>' + a.quality + '</td><td>' + a.productivity + '</td><td>' + scoreBadge(a.achieved) + '</td></tr>';
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
    kpisEl.innerHTML = '<div style="color:var(--sl-text-muted,#555770);font-size:9px;text-align:center;padding:10px">No data in Agent KPI sheet.</div>';
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
    '<div class="kpi-card" style="--kpi-color:var(--kpi-2)"><div class="kpi-val">' + avgAttendance + '%</div><div class="kpi-lbl">Avg Attendance Score</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#10b981"><div class="kpi-val">' + avgQuality + '%</div><div class="kpi-lbl">Avg Quality Score</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#f59e0b"><div class="kpi-val">' + avgCompliance + '%</div><div class="kpi-lbl">Avg Compliance Score</div></div>' +
    '<div class="kpi-card" style="--kpi-color:#f43f5e"><div class="kpi-val">' + fmt(totEscalation) + '</div><div class="kpi-lbl">Audit Escalation</div></div>' +
    '<div class="kpi-card" style="--kpi-color:var(--kpi-1)"><div class="kpi-val">' + fmt(totAchieved) + ' / ' + fmt(totalPossible) + '</div><div class="kpi-lbl">Achieved Points vs Total</div></div>';

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
      borderColor: THEME.c1 || '#4B49AC',
      backgroundColor: "transparent",
      borderWidth: 1.5,
      pointBackgroundColor: qVals.map(function(v) {
        return v >= 80 ? "#10b981" : v >= 60 ? "#f59e0b" : "#f43f5e";
      }),
      pointBorderColor: "#ffffff",
      pointBorderWidth: 1.5,
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
      fill: false,
      datalabels: { display: false }
    }
  ], {
    plugins: {
      legend: {
        display: true, position: 'bottom',
        labels: {
          color: THEME.chartTick || '#555770', font: { size: 7, weight: '600' },
          boxWidth: 10, padding: 6, usePointStyle: true
        }
      },
      datalabels: {
        anchor: 'end', align: 'end', offset: 2,
        color: THEME.slideText || '#1D1D1F',
        font: { size: 6.5, weight: '700' },
        formatter: function(v, ctx) { return ctx.datasetIndex === 0 && v > 0 ? v : ''; }
      }
    },
    scales: {
      y: {
        min: yMin,
        ticks: { color: THEME.chartTick || '#555770', font: { size: 6.5 } },
        grid: { color: THEME.chartGrid || 'rgba(85,87,112,0.08)', lineWidth: 0.5 }
      },
      x: {
        ticks: { color: THEME.chartTick || '#555770', font: { size: 6.5, weight: '600' }, maxRotation: 0 },
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
    backgroundColor: tc1(0.75),
    borderColor: THEME.c1,
    borderWidth: 0,
    borderRadius: 3
  }], {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: 'end', align: 'end', offset: 2,
        color: THEME.slideText || '#1D1D1F',
        font: { size: 7, weight: '700' },
        formatter: function(v) { return v > 0 ? fmt(v) : ''; }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: THEME.chartTick || '#555770', font: { size: 6.5 } },
        grid: { color: THEME.chartGrid || 'rgba(85,87,112,0.08)', lineWidth: 0.5 }
      },
      y: {
        ticks: { color: THEME.chartTick || '#555770', font: { size: 6.5, weight: '600' } },
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

  // Show HTML titles since JS generates custom headers
  document.querySelectorAll('#slide15 .slide15-table-title').forEach(function(el){ el.style.display = 'none'; });

  // Score badge helper
  function makeBadge(pts, maxPts) {
    var r = maxPts > 0 ? pts / maxPts : 0;
    var cls = r >= 0.75 ? 'green' : r >= 0.5 ? 'yellow' : 'red';
    return '<span class="score-badge ' + cls + '">' + fmt(pts) + '</span>';
  }

  // --- TL Stacked Horizontal Bar ---
  // TL cols: 0=TL Name, 1=Head Count, 2=Team Attendance, 3=Preshift Briefing, 4=Team Quality, 5=Shift Adherence, 6=Self Call/Chat, 7=Client Escalation, 8=TL Hygiene, 9=TL Audit, 10=Achieved Points
  var tlLabels = [], tlA = [], tlQ = [], tlB = [], tlS = [], tlAu = [];
  var tlCount = 0, tlScoreSum = 0;
  if (!isEmpty(tlData)) {
    tlData.forEach(function(row) {
      var name = String(row[0] || "").trim();
      if (!name) return;
      tlCount++;
      tlLabels.push(name);
      tlA.push(clean(row[2]));
      tlQ.push(clean(row[4]));
      tlB.push(clean(row[3]));
      tlS.push(clean(row[5]));
      tlAu.push(clean(row[9]));
      tlScoreSum += clean(row[10]);
    });
  }
  var tlAvgScore = tlCount > 0 ? Math.round(tlScoreSum / tlCount) : 0;

  destroyChart("chartSlide15Tl");
  if (tlLabels.length > 0) {
    var tlBarThick = Math.max(30, Math.min(110, Math.floor(190 / tlLabels.length)));
    createChart("chartSlide15Tl", "bar", tlLabels, [
      { label: "Team Attendance", data: tlA, backgroundColor: hexToRgba(THEME.c2, 0.7), borderColor: THEME.c2, borderWidth: 1, borderRadius: 3, barThickness: tlBarThick },
      { label: "Team Quality", data: tlQ, backgroundColor: "rgba(16,185,129,0.7)", borderColor: "#10b981", borderWidth: 1, borderRadius: 3, barThickness: tlBarThick },
      { label: "Preshift Briefing", data: tlB, backgroundColor: "rgba(245,158,11,0.7)", borderColor: "#f59e0b", borderWidth: 1, borderRadius: 3, barThickness: tlBarThick },
      { label: "Shift Adherence", data: tlS, backgroundColor: hexToRgba(THEME.c1, 0.7), borderColor: THEME.c1, borderWidth: 1, borderRadius: 3, barThickness: tlBarThick },
      { label: "TL Audit", data: tlAu, backgroundColor: "rgba(244,63,94,0.7)", borderColor: "#f43f5e", borderWidth: 1, borderRadius: 3, barThickness: tlBarThick }
    ], {
      indexAxis: 'y',
      plugins: {
        legend: { display: true, position: 'bottom', labels: { color: THEME.slideMuted, font: { size: 8, weight: '600' }, boxWidth: 10, padding: 8, usePointStyle: true } },
        datalabels: { anchor: 'center', align: function(ctx) { var v = ctx.dataset.data[ctx.dataIndex]; return v > 8 ? 'center' : 'end'; }, offset: 2, color: '#fff', font: { size: 8, weight: '800' }, formatter: function(v) { return v > 0 ? v + '%' : ''; } }
      },
      scales: {
        x: { stacked: true, beginAtZero: true, ticks: { color: THEME.chartTick, font: { size: 8, weight: '600' } }, grid: { color: THEME.chartGrid, lineWidth: 0.5 } },
        y: { stacked: true, ticks: { color: THEME.chartTick, font: { size: 9, weight: '700' } }, grid: { display: false } }
      }
    });
  }

  // --- QA Stacked Horizontal Bar ---
  // QA cols: 0=QA Name, 1=Manager, 2=Head Count, 3=Audits Count, 4=Audit Score(%), 5=Hygiene Hours, 6=Asset Maintenance(Y/N), 7=Shift Huddles(Y/N), 8=Track Record(Y/N), 9=EOD Reports, 10=Refresher Training/LLR, 11=Total Point
  var qaLabels = [], qaAS = [], qaAM = [], qaSH = [], qaTR = [];
  var qaCount = 0, qaScoreSum = 0;
  var ynVal = function(v) {
    var s = String(v).trim().toUpperCase().replace(/%/g, '');
    if (s === 'Y' || s === 'YES') return 100;
    var n = parseFloat(s);
    if (!isNaN(n)) return Math.round(Math.min(n, 100));
    return 0;
  };

  if (!isEmpty(qaData)) {
    qaData.forEach(function(row) {
      var name = String(row[0] || "").trim();
      if (!name) return;
      qaCount++;
      qaLabels.push(name);
      qaAS.push(clean(row[4]));
      qaAM.push(ynVal(row[6]));
      qaSH.push(ynVal(row[7]));
      qaTR.push(ynVal(row[8]));
      qaScoreSum += clean(row[11]);
    });
  }
  var qaAvgScore = qaCount > 0 ? Math.round(qaScoreSum / qaCount) : 0;

  destroyChart("chartSlide15Qa");
  if (qaLabels.length > 0) {
    var qaBarThick = Math.max(30, Math.min(110, Math.floor(190 / qaLabels.length)));
    createChart("chartSlide15Qa", "bar", qaLabels, [
      { label: "Audit Score", data: qaAS, backgroundColor: "rgba(16,185,129,0.7)", borderColor: "#10b981", borderWidth: 1, borderRadius: 3, barThickness: qaBarThick },
      { label: "Asset Maintenance", data: qaAM, backgroundColor: hexToRgba(THEME.c2, 0.7), borderColor: THEME.c2, borderWidth: 1, borderRadius: 3, barThickness: qaBarThick },
      { label: "Shift Huddles", data: qaSH, backgroundColor: "rgba(245,158,11,0.7)", borderColor: "#f59e0b", borderWidth: 1, borderRadius: 3, barThickness: qaBarThick },
      { label: "Track Record", data: qaTR, backgroundColor: hexToRgba(THEME.c1, 0.7), borderColor: THEME.c1, borderWidth: 1, borderRadius: 3, barThickness: qaBarThick }
    ], {
      indexAxis: 'y',
      plugins: {
        legend: { display: true, position: 'bottom', labels: { color: THEME.slideMuted, font: { size: 8, weight: '600' }, boxWidth: 10, padding: 8, usePointStyle: true } },
        datalabels: { anchor: 'center', align: function(ctx) { var v = ctx.dataset.data[ctx.dataIndex]; return v > 8 ? 'center' : 'end'; }, offset: 2, color: '#fff', font: { size: 8, weight: '800' }, formatter: function(v, ctx) { if (v > 0) { return ctx.datasetIndex === 0 ? v + '%' : v; } return ''; } }
      },
      scales: {
        x: { stacked: true, beginAtZero: true, ticks: { color: THEME.chartTick, font: { size: 8, weight: '600' } }, grid: { color: THEME.chartGrid, lineWidth: 0.5 } },
        y: { stacked: true, ticks: { color: THEME.chartTick, font: { size: 9, weight: '700' } }, grid: { display: false } }
      }
    });
  }

  // --- TL Table with score badges and avg score header ---
  var maxTlPts = 1;
  if (!isEmpty(tlData)) tlData.forEach(function(r){ var p = clean(r[10]); if (p > maxTlPts) maxTlPts = p; });
  var tlHtml = '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 12px;flex-shrink:0;">' +
    '<span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:' + THEME.slideMuted + '">TL Details</span>' +
    '<span style="font-size:13px;font-weight:800;padding:2px 12px;border-radius:12px;background:' + hexToRgba(THEME.c1, 0.12) + ';border:1px solid ' + hexToRgba(THEME.c1, 0.25) + ';color:' + THEME.c1 + '">Avg: ' + fmt(tlAvgScore) + '</span>' +
    '</div>';
  tlHtml += '<table><thead><tr><th>Name</th><th>Head Count</th><th>Self Call/Chat</th><th>Client Escalation</th><th>TL Hygiene</th><th>Score</th></tr></thead><tbody>';
  if (!isEmpty(tlData)) {
    tlData.forEach(function(row) {
      var name = String(row[0] || "").trim();
      if (!name) return;
      var pts = clean(row[10]);
      tlHtml += '<tr><td>' + name + '</td><td>' + clean(row[1]) + '</td><td>' + clean(row[6]) + '</td><td>' + String(row[7] || "").trim() + '</td><td>' + String(row[8] || "").trim() + '</td><td>' + makeBadge(pts, maxTlPts) + '</td></tr>';
    });
  }
  tlHtml += '</tbody></table>';
  document.getElementById("s15TlTable").innerHTML = tlHtml;

  // --- QA Table with score badges and avg score header ---
  var maxQaPts = 1;
  if (!isEmpty(qaData)) qaData.forEach(function(r){ var p = clean(r[11]); if (p > maxQaPts) maxQaPts = p; });
  var qaHtml = '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 12px;flex-shrink:0;">' +
    '<span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:' + THEME.slideMuted + '">QA Details</span>' +
    '<span style="font-size:13px;font-weight:800;padding:2px 12px;border-radius:12px;background:' + hexToRgba(THEME.c2, 0.12) + ';border:1px solid ' + hexToRgba(THEME.c2, 0.25) + ';color:' + THEME.c2 + '">Avg: ' + fmt(qaAvgScore) + '</span>' +
    '</div>';
  qaHtml += '<table><thead><tr><th>Name</th><th>Head Count</th><th>Audits</th><th>Hygiene Hrs</th><th>EOD Reports</th><th>Refresher</th><th>Score</th></tr></thead><tbody>';
  if (!isEmpty(qaData)) {
    qaData.forEach(function(row) {
      var name = String(row[0] || "").trim();
      if (!name) return;
      var pts = clean(row[11]);
      qaHtml += '<tr><td>' + name + '</td><td>' + clean(row[2]) + '</td><td>' + clean(row[3]) + '</td><td>' + clean(row[5]) + '</td><td>' + String(row[9] || "").trim() + '</td><td>' + String(row[10] || "").trim() + '</td><td>' + makeBadge(pts, maxQaPts) + '</td></tr>';
    });
  }
  qaHtml += '</tbody></table>';
  document.getElementById("s15QaTable").innerHTML = qaHtml;
}

// =====================================================================
// ===== SLIDE UTILITIES =====
// =====================================================================
function renderKpiCard(value, label, color) {
  return `<div class="kpi-card" style="--kpi-color:${color}"><div class="kpi-val">${value}</div><div class="kpi-lbl">${label}</div></div>`;
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

  // Apply gradient fills to bar datasets — skip for stacked charts (causes blur/washout)
  var isStacked = options && options.scales && options.scales.x && options.scales.x.stacked;
  const enhancedDatasets = datasets.map(ds => {
    if (!isStacked && (type === 'bar' || type === 'line') && ds.backgroundColor && typeof ds.backgroundColor === 'string' && ds.backgroundColor.startsWith('rgba')) {
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
        borderColor: 'tc2(0.25)',
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

  // ── Patch any dark rgba(255,…) scale/legend colors → theme-aware ──
  (function patchThemeColors(obj) {
    if (!obj || typeof obj !== 'object') return;
    var tick = THEME.chartTick || '#64748b';
    var grid = THEME.chartGrid || 'rgba(0,0,0,0.06)';
    // Patch scales
    if (obj.scales) {
      Object.values(obj.scales).forEach(function(ax) {
        if (ax && ax.ticks && typeof ax.ticks.color === 'string' && /rgba\(255/.test(ax.ticks.color)) ax.ticks.color = tick;
        if (ax && ax.grid && typeof ax.grid.color === 'string' && /rgba\(255/.test(ax.grid.color)) ax.grid.color = grid;
      });
    }
    // Patch legend label color
    if (obj.plugins && obj.plugins.legend && obj.plugins.legend.labels) {
      var ll = obj.plugins.legend.labels;
      if (typeof ll.color === 'string' && /rgba\(255/.test(ll.color)) ll.color = THEME.slideMuted || '#64748b';
    }
    // Patch datalabels color if it's white/rgba-white (except for specific overrides)
    if (obj.plugins && obj.plugins.datalabels) {
      var dl = obj.plugins.datalabels;
      if (typeof dl.color === 'string' && (dl.color === '#fff' || dl.color === '#ffffff')) {
        dl.color = THEME.slideText || '#1e293b';
      }
      if (typeof dl.textShadowColor === 'string' && /rgba\(0,0,0/.test(dl.textShadowColor)) {
        // keep shadow — it helps readability on coloured bars
      }
    }
  })(mergedOpts);

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
// =====================================================================
// ===== EXPORT PDF =====
// =====================================================================
async function exportPDF() {
  var allSlides = document.querySelectorAll('#dashboardSection .slide');
  var slides = [];
  allSlides.forEach(function(s) {
    var vp = s.closest('.slide-viewport');
    if (!vp || vp.style.display !== "none") slides.push(s);
  });
  if (slides.length === 0) {
    addLog("No slides to export. Generate a report first.","error");
    return;
  }
  addLog(`Exporting ${slides.length} slide(s) to PDF...`,"info");

  const { jsPDF } = window.jspdf;
  const pptW = 338.67;
  const pptH = 190.5;
  const pdf = new jsPDF({ orientation: 'l', unit: 'mm', format: [pptW, pptH] });

  // Temporarily remove CSS transforms + absolute position for clean capture
  var slideStyles = [];
  slides.forEach(function(s,i){
    slideStyles[i]={ transform:s.style.transform, position:s.style.position };
    s.style.transform="none"; s.style.position="relative";
  });
  var viewports = document.querySelectorAll('.slide-viewport');
  var vpOverflows = [];
  viewports.forEach(function(v,i){ vpOverflows[i]=v.style.overflow; v.style.overflow="visible"; });

  for (let i = 0; i < slides.length; i++) {
    addLog(`Capturing slide ${i + 1}/${slides.length}...`,"info");
    const el = slides[i];
    try {
      const canvas = await html2canvas(el, {
        scale: 2, useCORS: true, backgroundColor: "#ffffff",
        logging: false, allowTaint: false,
      });
      var img;
      try {
        img = canvas.toDataURL("image/png");
      } catch(e) {
        addLog(`Slide ${i+1}: canvas tainted by cross-origin content, trying JPEG...`,"error");
        img = canvas.toDataURL("image/jpeg", 0.95);
      }
      if (i > 0) pdf.addPage();
      pdf.addImage(img, img.indexOf("jpeg")>0?"JPEG":"PNG", 0, 0, pptW, pptH);
    } catch (err) {
      addLog(`Error capturing slide ${i + 1}: ${err.message}`,"error");
    }
  }

  // Restore styles
  slides.forEach(function(s,i){ s.style.transform=slideStyles[i].transform; s.style.position=slideStyles[i].position; });
  viewports.forEach(function(v,i){ v.style.overflow=vpOverflows[i]; });

  const client = document.getElementById("sidebarProjectName").textContent || "Client";
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
  state.ameyoFile=null; state.ameyoRaw=[]; state.ameyoKPIs=null;
  state.frejunFile=null; state.frejunRaw=[]; state.frejunKPIs=null;
  state.medianCloseTime = null;
  Object.keys(state.charts).forEach(k=>{if(state.charts[k]){state.charts[k].destroy()}});
  state.charts={};

  const keys = Object.keys(localStorage);
  keys.forEach(key => { if (key.startsWith('table_')) localStorage.removeItem(key); });

  updateSidebarProject();
  document.getElementById("monthSelect").value="";
  document.getElementById("weekSelect").value="All";
  document.getElementById("yearSelect").value="2026";
  document.getElementById("dateRange").value="";
  document.getElementById("fileInput").value="";
  document.getElementById("manualFirstResponse").value="";
  document.getElementById("manualAvgResponse").value="";
  document.getElementById("manualHandlingTime").value="";
  document.getElementById("manualHistAvgChats").value="";
  document.getElementById("manualHistAvgCalls").value="";
  const exInput=document.getElementById("exotelFileInput");
  if(exInput)exInput.value="";
  var amInput=document.getElementById("ameyoFileInput");
  if(amInput)amInput.value="";
  var fjInput=document.getElementById("frejunFileInput");
  if(fjInput)fjInput.value="";
  setExotelUploadState("idle","");
  setAmeyoUploadState("idle","");
  setFrejunUploadState("idle","");
  setUploadState("idle","");
  document.getElementById("processBtn").disabled=true;
  document.getElementById("exportPdfBtn").disabled=true;
  document.getElementById("dashboardSection").style.display="none";
  document.getElementById("logSection").style.display="none";
  // Clear client store for current client
  var curName = document.getElementById("sidebarProjectName").textContent;
  if (curName) delete clientStore[curName];
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
      slide.style.transform = `translate(-50%, -50%) scale(${scale})`;
    });
  });
}

window.addEventListener('resize', scaleSlides);

// ===== Global Settings / Nav Switching =====
function showGlobalSettings() {
  var sections = ["globalSettings","config","uploadSection","dataEntrySection","manualSection","actions","logSection","dashboardSection","comparisonSection"];
  sections.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = id === "globalSettings" ? "block" : "none";
  });
  document.getElementById("navGlobalSettings").classList.add("active");
  document.querySelectorAll("[id^=navClient]").forEach(function(n) { n.classList.remove("active"); });
  var compNav = document.getElementById("navComparison");
  if (compNav) compNav.classList.remove("active");
}

function showClientProject() {
  syncGlobalToClient();
  var sections = ["globalSettings","config","uploadSection","dataEntrySection","manualSection","actions","logSection","dashboardSection","comparisonSection"];
  sections.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = (id === "globalSettings" || id === "comparisonSection") ? "none" : "block";
  });
  document.getElementById("navGlobalSettings").classList.remove("active");
  var compNav = document.getElementById("navComparison");
  if (compNav) compNav.classList.remove("active");
}

function saveClientState(clientName) {
  var manual = {};
  ["manualFirstResponse","manualAvgResponse","manualHandlingTime","manualHistAvgChats","manualHistAvgCalls"].forEach(function(id) {
    var el = document.getElementById(id);
    manual[id] = el ? el.value : "";
  });
  var sheetData = {};
  SHEETS.forEach(function(s) { sheetData[s.id] = getTableData(s.id); });
  clientStore[clientName] = {
    processed: state.processed,
    exotelKPIs: state.exotelKPIs,
    ameyoKPIs: state.ameyoKPIs,
    frejunKPIs: state.frejunKPIs,
    medianCloseTime: state.medianCloseTime,
    manualData: manual,
    sheetData: sheetData,
  };
}

function loadClientState(clientName) {
  var data = clientStore[clientName];
  if (!data) {
    state.processed = [];
    state.exotelKPIs = null;
    state.ameyoKPIs = null;
    state.frejunKPIs = null;
    state.medianCloseTime = null;
    return false;
  }
  state.processed = data.processed;
  state.exotelKPIs = data.exotelKPIs;
  state.ameyoKPIs = data.ameyoKPIs;
  state.frejunKPIs = data.frejunKPIs;
  state.medianCloseTime = data.medianCloseTime;
  if (data.manualData) {
    Object.keys(data.manualData).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.value = data.manualData[id] || "";
    });
  }
  return true;
}

function switchClient(navId, name) {
  // Save current client state
  var oldName = document.getElementById("sidebarProjectName").textContent;
  if (oldName && oldName !== name) saveClientState(oldName);

  // Destroy all charts before switching
  Object.keys(state.charts).forEach(function(k){if(state.charts[k]){state.charts[k].destroy();delete state.charts[k]}});

  // Reset upload UI & per-client transient state
  state.file = null; state.exotelFile = null; state.exotelRaw = [];
  state.ameyoFile = null; state.ameyoRaw = [];
  state.frejunFile = null; state.frejunRaw = []; state.frejunKPIs = null;
  state.logs = [];
  var logSec = document.getElementById("logSection"); if(logSec) logSec.style.display = "none";
  var logCon = document.getElementById("logContainer"); if(logCon) logCon.innerHTML = "";
  setUploadState("idle",""); setExotelUploadState("idle",""); setAmeyoUploadState("idle",""); setFrejunUploadState("idle","");
  var fInp = document.getElementById("fileInput"); if(fInp) fInp.value = "";
  var exInp = document.getElementById("exotelFileInput"); if(exInp) exInp.value = "";
  var amInp = document.getElementById("ameyoFileInput"); if(amInp) amInp.value = "";
  var fjInp = document.getElementById("frejunFileInput"); if(fjInp) fjInp.value = "";
  document.getElementById("processBtn").disabled = true;
  document.getElementById("exportPdfBtn").disabled = true;
  // Clear manual entry inputs
  ["manualFirstResponse","manualAvgResponse","manualHandlingTime","manualHistAvgChats","manualHistAvgCalls"].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value = "";
  });

  document.getElementById("sidebarProjectName").textContent = name;
  var h = document.getElementById("headingClientName");
  if (h) h.textContent = "for " + name;
  document.querySelectorAll("[id^=navClient]").forEach(function(n) { n.classList.remove("active"); });
  var compNav = document.getElementById("navComparison");
  if (compNav) compNav.classList.remove("active");
  document.getElementById(navId).classList.add("active");
  applyClientTheme(name);

  // Show/hide call report upload zones based on client
  var isJE = name === "Client JE (C11)";
  var isWC = name === "Client WC (C10)";
  var isPK = name === "Client PK";
  var isFC = name === "Client FC (C15)";
  var exo = document.getElementById("exotelUploadZone");
  var amy = document.getElementById("ameyoUploadZone");
  var fjz = document.getElementById("frejunUploadZone");
  if (exo) exo.style.display = (isJE || isWC || isPK || isFC) ? "none" : "block";
  if (amy) amy.style.display = (isWC || isPK) ? "block" : "none";
  if (fjz) fjz.style.display = isJE ? "block" : "none";

  // Restore saved state for target client
  var hasData = loadClientState(name);

  showClientProject();

  // Hide dashboard if no data; re-render if there is data
  var ds = document.getElementById("dashboardSection");
  if (hasData && state.processed.length > 0) {
    ds.style.display = "block";
    renderSlide1(); renderSlide2(); renderSlide3(); renderSlide4();
    renderSlide5(); renderSlide6(); renderSlide7(); renderSlide8();
    renderSlide9(); renderSlide10(); renderSlide11(); renderSlide12();
    renderSlide13(); renderSlide14(); renderSlide15();
    scaleSlides();
  } else {
    ds.style.display = "none";
  }
}

// Client nav links use inline switchClient() onclick

// =====================================================================
// ===== COMPARISON DASHBOARD =====
// =====================================================================
var COMP_CLIENT_NAMES = ["Client SJ (C1)", "Client WC (C10)", "Client JE (C11)", "Client PK", "Client FC (C15)"];
var COMP_CLIENT_COLORS = { "Client SJ (C1)":"#4B49AC", "Client WC (C10)":"#0F766E", "Client JE (C11)":"#1E40AF", "Client PK":"#6D28D9", "Client FC (C15)":"#BE123C" };
var COMP_CLIENT_SHORT = { "Client SJ (C1)":"SJ", "Client WC (C10)":"WC", "Client JE (C11)":"JE", "Client PK":"PK", "Client FC (C15)":"FC" };
var COMP_CLIENT_LABELS = ["SJ","WC","JE","PK","FC"];

var compCharts = {};

function destroyCompCharts() {
  Object.keys(compCharts).forEach(function(k) {
    if (compCharts[k]) { compCharts[k].destroy(); delete compCharts[k]; }
  });
}

function showComparisonDashboard() {
  // Save current client state before switching
  var oldName = document.getElementById("sidebarProjectName").textContent;
  if (oldName && oldName !== "Comparison Dashboard") saveClientState(oldName);

  var sections = ["globalSettings","config","uploadSection","dataEntrySection","manualSection","actions","logSection","dashboardSection","comparisonSection"];
  sections.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = id === "comparisonSection" ? "block" : "none";
  });
  document.getElementById("navGlobalSettings").classList.remove("active");
  document.querySelectorAll("[id^=navClient]").forEach(function(n) { n.classList.remove("active"); });
  var compNav = document.getElementById("navComparison");
  if (compNav) compNav.classList.add("active");
  var headingEl = document.getElementById("headingClientName");
  if (headingEl) headingEl.textContent = " — Comparison Dashboard";

  // Reset theme to default (not client-specific) for comparison dashboard
  var root = document.documentElement;
  var isDark = root.classList.contains('dark');
  root.style.setProperty('--primary', isDark ? '#3b82f6' : '#1e293b');
  root.style.setProperty('--primary-light', isDark ? '#1e3a5f' : '#e2e8f0');
  root.style.setProperty('--ring', isDark ? '#60a5fa' : '#3b82f6');

  renderComparisonDashboard();
}

function renderComparisonDashboard() {
  if (typeof Chart === 'undefined') {
    var content = document.getElementById("comparisonContent");
    if (content) content.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--muted-fg)"><p style="font-size:1.2rem;font-weight:700">Chart.js not loaded</p><p>Please wait for the page to fully load and try again.</p></div>';
    return;
  }
  if (typeof ChartDataLabels !== 'undefined' && Chart.registry && !Chart.registry.plugins.get('datalabels')) {
    Chart.register(ChartDataLabels);
  }
  destroyCompCharts();
  var content = document.getElementById("comparisonContent");
  if (!content) return;
  var clients = COMP_CLIENT_NAMES;
  var hasAny = false;
  var dataRows = [];
  clients.forEach(function(name) {
    var d = clientStore[name];
    var loaded = d && d.processed && d.processed.length > 0;
    if (loaded) hasAny = true;
    dataRows.push(buildClientData(name, d));
  });

  var hint = document.getElementById("compHint");
  if (hint) hint.classList.toggle("visible", !hasAny);
  var pdfBtn = document.getElementById("exportCompPdfBtn");
  if (pdfBtn) pdfBtn.style.display = hasAny ? "inline-flex" : "none";
  if (!hasAny) {
    content.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--muted-fg)"><p style="font-size:1.2rem;font-weight:700;margin-bottom:0.5rem">No client data loaded</p><p>Switch to each client, upload files, and generate reports before viewing this page.</p></div>';
    return;
  }

  var html = '';
  // Client summary bar
  html += '<div class="comp-client-bar">';
  dataRows.forEach(function(r) {
    html += '<div class="comp-client-card" style="--comp-color:' + COMP_CLIENT_COLORS[r.name] + '">';
    html += '<div class="name" style="color:' + COMP_CLIENT_COLORS[r.name] + '">' + r.short + '</div>';
    if (r.hasData) {
      html += '<div class="stat"><span class="label">Chats</span><span class="value">' + r.chatVolume + '</span></div>';
      html += '<div class="stat"><span class="label">FCR</span><span class="value">' + r.fcr + '</span></div>';
      if (r.callVolume > 0) html += '<div class="stat"><span class="label">Calls</span><span class="value">' + r.callVolume + '</span></div>';
      html += '<div class="stat"><span class="label">Reopen</span><span class="value">' + r.reopenPct + '</span></div>';
    } else {
      html += '<div class="no-data">No data loaded</div>';
    }
    html += '</div>';
  });
  html += '</div>';

  // Category leaders
  html += '<div class="comp-section-title">Category Leaders</div>';
  html += '<div class="comp-leader-grid">';
  var leaders = getCategoryLeaders(dataRows);
  leaders.forEach(function(l) {
    html += '<div class="comp-leader-card">';
    html += '<div class="leader-label">' + l.label + '</div>';
    html += '<div class="leader-value" style="color:' + l.color + '">' + l.value + '</div>';
    html += '<div class="leader-client">🏆 ' + l.client + '</div>';
    html += '</div>';
  });
  html += '</div>';

  // Charts grid
  html += '<div class="comp-section-title">Volume Comparison</div>';
  html += '<div class="comp-chart-grid">';
  html += '<div class="comp-chart-card"><div class="comp-chart-title">Chat Volume</div><div class="comp-chart-container"><canvas id="cmp-chatVol"></canvas></div></div>';
  html += '<div class="comp-chart-card"><div class="comp-chart-title">Inbound Call Volume</div><div class="comp-chart-container"><canvas id="cmp-callVol"></canvas></div></div>';
  html += '</div>';

  html += '<div class="comp-section-title">Quality Metrics</div>';
  html += '<div class="comp-chart-grid">';
  html += '<div class="comp-chart-card"><div class="comp-chart-title">First Contact Rate (%)</div><div class="comp-chart-container"><canvas id="cmp-fcrRate"></canvas></div></div>';
  html += '<div class="comp-chart-card"><div class="comp-chart-title">Reopen Rate (%)</div><div class="comp-chart-container"><canvas id="cmp-reopenRate"></canvas></div></div>';
  html += '</div>';

  html += '<div class="comp-section-title">Call Performance</div>';
  html += '<div class="comp-chart-grid">';
  html += '<div class="comp-chart-card"><div class="comp-chart-title">Answer Rate (%)</div><div class="comp-chart-container"><canvas id="cmp-answerRate"></canvas></div></div>';
  html += '<div class="comp-chart-card"><div class="comp-chart-title">Avg Handling Time (min)</div><div class="comp-chart-container"><canvas id="cmp-aht"></canvas></div></div>';
  html += '</div>';

  // Full comparison table
  html += '<div class="comp-section-title">Master Comparison Table</div>';
  html += '<div class="comp-table-wrap"><table class="comp-table">';
  html += '<thead><tr><th>Metric</th>';
  dataRows.forEach(function(r) {
    html += '<th><span class="client-label" style="background:' + COMP_CLIENT_COLORS[r.name] + '">' + r.short + '</span></th>';
  });
  html += '</tr></thead><tbody>';
  var metrics = buildComparisonTable(dataRows);
  metrics.forEach(function(row) {
    html += '<tr><td><strong>' + row.label + '</strong></td>';
    row.values.forEach(function(v) {
      var cls = v.best ? 'best' : (v.worst ? 'worst' : '');
      html += '<td class="' + cls + '">' + v.text + '</td>';
    });
    html += '</tr>';
  });
  html += '</tbody></table></div>';

  // Insights
  html += '<div class="comp-insights">';
  html += '<div class="comp-section-title">Key Insights</div>';
  var insights = generateInsights(dataRows);
  insights.forEach(function(i) {
    html += '<div class="comp-insight-card ' + i.type + '">';
    html += '<div class="comp-insight-icon">' + i.icon + '</div>';
    html += '<div><strong>' + i.title + '</strong><br><span style="color:var(--muted-fg);font-size:0.8rem">' + i.desc + '</span></div>';
    html += '</div>';
  });
  html += '</div>';

  content.innerHTML = html;
  renderCompCharts(dataRows);
}

function buildClientData(name, d) {
  var r = { name: name, short: COMP_CLIENT_SHORT[name] || name, hasData: false, processed: null, exotel: null, chatVolume: 0, closedChats: 0, reopenedChats: 0, fcr: "—", fcrVal: 0, reopenPct: "—", reopenVal: 0, callVolume: 0, completedCalls: 0, missedCalls: 0, answerRate: "—", answerVal: 0, aht: "—", ahtVal: 0 };
  if (!d || !d.processed || d.processed.length === 0) return r;
  r.hasData = true;
  r.processed = d.processed;
  r.exotel = d.exotelKPIs;
  r.medianClose = d.medianCloseTime || "—";
  // Chat stats
  r.chatVolume = d.processed.reduce(function(s, row) { return s + (row["Conversations"] || 0); }, 0);
  r.closedChats = d.processed.reduce(function(s, row) { return s + (row["Closed"] || 0); }, 0);
  r.reopenedChats = d.processed.reduce(function(s, row) { return s + (row["Reopened"] || 0); }, 0);
  // FCR
  if (r.closedChats > 0) {
    var fcClosed = Math.max(0, r.closedChats - r.reopenedChats);
    r.fcrVal = Math.round((fcClosed / r.closedChats) * 100);
    r.fcr = r.fcrVal + "%";
  }
  // Reopen rate
  if (r.chatVolume > 0) {
    r.reopenVal = Math.round((r.reopenedChats / r.chatVolume) * 100);
    r.reopenPct = r.reopenVal + "%";
  }
  // Call stats
  if (r.exotel) {
    r.callVolume = r.exotel.total || 0;
    r.completedCalls = r.exotel.completed || 0;
    r.missedCalls = r.exotel.missed || 0;
    if (r.callVolume > 0) {
      r.answerVal = Math.round((r.completedCalls / r.callVolume) * 100);
      r.answerRate = r.answerVal + "%";
    }
    r.ahtVal = Math.round((r.exotel.avgAHT || 0) / 60);
    r.aht = r.ahtVal + "m";
    // Also get AHT from manual if available
    if (d.manualData && d.manualData.manualHandlingTime) {
      var manualAHT = parseFloat(d.manualData.manualHandlingTime);
      if (!isNaN(manualAHT)) { r.ahtVal = manualAHT; r.aht = formatSecToMinSec(manualAHT); }
    }
  }
  return r;
}

function getCategoryLeaders(rows) {
  var leaders = [];
  // Highest chat volume
  var best = rows.filter(function(r) { return r.hasData; }).sort(function(a,b) { return b.chatVolume - a.chatVolume; });
  if (best.length) leaders.push({ label: "Highest Volume", value: best[0].chatVolume.toLocaleString(), client: best[0].short, color: COMP_CLIENT_COLORS[best[0].name] });
  // Best FCR
  best = rows.filter(function(r) { return r.hasData && r.fcrVal > 0; }).sort(function(a,b) { return b.fcrVal - a.fcrVal; });
  if (best.length) leaders.push({ label: "Best FCR", value: best[0].fcr, client: best[0].short, color: COMP_CLIENT_COLORS[best[0].name] });
  // Lowest reopen rate
  best = rows.filter(function(r) { return r.hasData; }).sort(function(a,b) { return a.reopenVal - b.reopenVal; });
  if (best.length) leaders.push({ label: "Lowest Reopen", value: best[0].reopenPct, client: best[0].short, color: COMP_CLIENT_COLORS[best[0].name] });
  // Best answer rate
  best = rows.filter(function(r) { return r.hasData && r.answerVal > 0; }).sort(function(a,b) { return b.answerVal - a.answerVal; });
  if (best.length) leaders.push({ label: "Best Answer Rate", value: best[0].answerRate, client: best[0].short, color: COMP_CLIENT_COLORS[best[0].name] });
  // Lowest AHT
  best = rows.filter(function(r) { return r.hasData && r.ahtVal > 0; }).sort(function(a,b) { return a.ahtVal - b.ahtVal; });
  if (best.length) leaders.push({ label: "Fastest Handling", value: best[0].aht, client: best[0].short, color: COMP_CLIENT_COLORS[best[0].name] });
  // Most closed chats
  best = rows.filter(function(r) { return r.hasData; }).sort(function(a,b) { return b.closedChats - a.closedChats; });
  if (best.length) leaders.push({ label: "Most Closed Chats", value: best[0].closedChats.toLocaleString(), client: best[0].short, color: COMP_CLIENT_COLORS[best[0].name] });
  return leaders;
}

function buildComparisonTable(rows) {
  var table = [];
  function addRow(label, extractor, higherBetter) {
    var vals = [];
    var nums = [];
    rows.forEach(function(r, i) {
      var result = extractor(r);
      vals.push(result);
      if (result.num !== null) nums.push({ idx: i, num: result.num });
    });
    if (nums.length > 1) {
      nums.sort(function(a,b) { return higherBetter ? b.num - a.num : a.num - b.num; });
      var bestIdx = nums[0].idx;
      var worstIdx = nums[nums.length - 1].idx;
      vals[bestIdx].best = true;
      vals[worstIdx].worst = true;
    }
    table.push({ label: label, values: vals });
  }
  addRow("Chat Volume", function(r) { return { text: r.hasData ? r.chatVolume.toLocaleString() : "—", num: r.hasData ? r.chatVolume : null }; }, true);
  addRow("Closed Chats", function(r) { return { text: r.hasData ? r.closedChats.toLocaleString() : "—", num: r.hasData ? r.closedChats : null }; }, true);
  addRow("Reopened Chats", function(r) { return { text: r.hasData ? r.reopenedChats.toLocaleString() : "—", num: r.hasData ? r.reopenedChats : null }; }, false);
  addRow("FCR", function(r) { return { text: r.fcr, num: r.hasData ? r.fcrVal : null }; }, true);
  addRow("Reopen Rate", function(r) { return { text: r.reopenPct, num: r.hasData ? r.reopenVal : null }; }, false);
  addRow("Inbound Calls", function(r) { return { text: r.hasData ? r.callVolume.toLocaleString() : "—", num: r.hasData && r.callVolume > 0 ? r.callVolume : null }; }, true);
  addRow("Completed Calls", function(r) { return { text: r.hasData ? r.completedCalls.toLocaleString() : "—", num: r.hasData && r.completedCalls > 0 ? r.completedCalls : null }; }, true);
  addRow("Missed Calls", function(r) { return { text: r.hasData ? r.missedCalls.toLocaleString() : "—", num: r.hasData && r.missedCalls > 0 ? r.missedCalls : null }; }, false);
  addRow("Answer Rate", function(r) { return { text: r.answerRate, num: r.hasData && r.answerVal > 0 ? r.answerVal : null }; }, true);
  addRow("Avg Handling Time", function(r) { return { text: r.aht, num: r.hasData && r.ahtVal > 0 ? r.ahtVal : null }; }, false);
  return table;
}

function generateInsights(rows) {
  var insights = [];
  var loaded = rows.filter(function(r) { return r.hasData; });
  if (loaded.length < 2) return [{ type:"info", icon:"ℹ️", title:"Not enough data", desc:"Load data for at least 2 clients to see comparison insights." }];
  // Top volume
  var byVol = loaded.slice().sort(function(a,b) { return b.chatVolume - a.chatVolume; });
  insights.push({ type:"info", icon:"📊", title:"Volume leader: " + byVol[0].short, desc: byVol[0].short + " handles " + byVol[0].chatVolume.toLocaleString() + " chats — " + (byVol.length > 1 ? Math.round(byVol[0].chatVolume / byVol[1].chatVolume * 100) + "% of " + byVol[1].short + "'s volume" : "the most among all clients") + "." });
  // Best FCR
  var byFcr = loaded.filter(function(r) { return r.fcrVal > 0; }).sort(function(a,b) { return b.fcrVal - a.fcrVal; });
  if (byFcr.length > 1) {
    insights.push({ type:"win", icon:"🏆", title:"Best FCR: " + byFcr[0].short + " (" + byFcr[0].fcr + ")", desc: "Highest first-contact resolution rate. Gap to lowest (" + byFcr[byFcr.length-1].short + "): " + (byFcr[0].fcrVal - byFcr[byFcr.length-1].fcrVal) + " percentage points." });
  }
  // Worst reopen
  var byReopen = loaded.filter(function(r) { return r.reopenVal > 0; }).sort(function(a,b) { return b.reopenVal - a.reopenVal; });
  if (byReopen.length > 1) {
    insights.push({ type: byReopen[0].reopenVal > 50 ? "critical" : "alert", icon: byReopen[0].reopenVal > 50 ? "🚨" : "⚠️", title: "High reopen rate: " + byReopen[0].short + " (" + byReopen[0].reopenPct + ")", desc: byReopen[0].reopenVal + "% of chats were reopened — " + (byReopen[0].reopenVal > 50 ? "critical issue requiring root cause analysis." : "worth investigating compared to the best (" + byReopen[byReopen.length-1].reopenPct + ").") });
  }
  // Best answer rate
  var byAns = loaded.filter(function(r) { return r.answerVal > 0; }).sort(function(a,b) { return b.answerVal - a.answerVal; });
  if (byAns.length > 1) {
    insights.push({ type: byAns[byAns.length-1].answerVal < 50 ? "critical" : "info", icon: byAns[byAns.length-1].answerVal < 50 ? "🚨" : "📞", title: byAns[0].short + " leads in answer rate (" + byAns[0].answerRate + ")", desc: "Gap to lowest (" + byAns[byAns.length-1].short + "): " + (byAns[0].answerVal - byAns[byAns.length-1].answerVal) + " points." });
  }
  return insights;
}

function renderCompCharts(rows) {
  var labels = [];
  var chatData = [], callData = [], fcrData = [], reopenData = [], ansData = [], ahtData = [];
  var colors = [];
  rows.forEach(function(r) {
    labels.push(r.short);
    colors.push(COMP_CLIENT_COLORS[r.name]);
    chatData.push(r.hasData ? r.chatVolume : 0);
    callData.push(r.hasData ? r.callVolume : 0);
    fcrData.push(r.hasData ? r.fcrVal : 0);
    reopenData.push(r.hasData ? r.reopenVal : 0);
    ansData.push(r.hasData && r.answerVal > 0 ? r.answerVal : null);
    ahtData.push(r.hasData && r.ahtVal > 0 ? r.ahtVal : null);
  });

  function compBar(id, data, label, suffix) {
    if (!data.some(function(v) { return v > 0; })) return;
    var el = document.getElementById(id);
    if (!el) return;
    compCharts[id] = new Chart(el, {
      type: 'bar',
      data: { labels: labels, datasets: [{ label: label, data: data, backgroundColor: colors, borderRadius: 6 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          datalabels: {
            display: true, anchor: 'end', align: 'end',
            color: '#1e293b', font: { weight: 'bold', size: 11 },
            formatter: function(v) { return v > 0 ? (suffix ? v + suffix : v.toLocaleString()) : ''; },
            offset: 2
          }
        },
        scales: { y: { beginAtZero: true, ticks: { callback: function(v) { return suffix ? v + suffix : v; } } } }
      }
    });
  }

  function compBarPct(id, data, label) {
    compBar(id, data, label, "%");
  }

  compBar("cmp-chatVol", chatData, "Chat Volume");
  compBar("cmp-callVol", callData, "Call Volume");
  compBarPct("cmp-fcrRate", fcrData, "FCR %");
  compBarPct("cmp-reopenRate", reopenData, "Reopen %");

  // Answer rate — only show for clients with call data
  var ansEl = document.getElementById("cmp-answerRate");
  if (ansEl) {
    var hasCalls = ansData.some(function(v) { return v !== null && v > 0; });
    if (hasCalls) {
      compCharts["cmp-answerRate"] = new Chart(ansEl, {
        type: 'bar',
        data: { labels: labels, datasets: [{ label: "Answer Rate", data: ansData.map(function(v) { return v || 0; }), backgroundColor: colors, borderRadius: 6 }] },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            datalabels: { display: true, anchor: 'end', align: 'end', color: '#1e293b', font: { weight: 'bold', size: 11 }, formatter: function(v) { return v > 0 ? v + '%' : '—'; }, offset: 2 }
          },
          scales: { y: { beginAtZero: true, max: 100, ticks: { callback: function(v) { return v + '%'; } } } }
        }
      });
    }
  }

  var ahtEl = document.getElementById("cmp-aht");
  if (ahtEl) {
    var hasAHT = ahtData.some(function(v) { return v !== null && v > 0; });
    if (hasAHT) {
      compCharts["cmp-aht"] = new Chart(ahtEl, {
        type: 'bar',
        data: { labels: labels, datasets: [{ label: "Avg Handling Time", data: ahtData.map(function(v) { return v || 0; }), backgroundColor: colors, borderRadius: 6 }] },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            datalabels: { display: true, anchor: 'end', align: 'end', color: '#1e293b', font: { weight: 'bold', size: 11 }, formatter: function(v) { return v > 0 ? v + 'm' : '—'; }, offset: 2 }
          },
          scales: { y: { beginAtZero: true, ticks: { callback: function(v) { return v + 'm'; } } } }
        }
      });
    }
  }
}

// =====================================================================
// ===== COMPARISON DASHBOARD PDF EXPORT =====
// =====================================================================
async function exportComparisonPDF() {
  if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
    alert("PDF export libraries not loaded yet. Please wait and try again.");
    return;
  }

  var content = document.getElementById("comparisonContent");
  if (!content || content.children.length === 0) {
    alert("No comparison data to export.");
    return;
  }

  var pdfBtn = document.getElementById("exportCompPdfBtn");
  if (pdfBtn) { pdfBtn.disabled = true; pdfBtn.textContent = "Generating PDF..."; }

  const { jsPDF } = window.jspdf;
  var pageW = 210, pageH = 297, margin = 14;
  var usableW = pageW - margin * 2;
  var pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

  var isDark = document.documentElement.classList.contains('dark');
  var bgColor = isDark ? '#0f172a' : '#ffffff';
  var pageRgb = isDark ? [15, 23, 42] : [255, 255, 255];

  // Fill first page background
  pdf.setFillColor(pageRgb[0], pageRgb[1], pageRgb[2]);
  pdf.rect(0, 0, pageW, pageH, 'F');

  // Hide elements that shouldn't appear in PDF
  var compHint = document.getElementById("compHint");
  if (compHint) compHint.style.display = "none";
  if (pdfBtn) pdfBtn.style.display = "none";

  // Temporarily add background to comparisonContent for a seamless capture
  var origBg = content.style.background;
  content.style.background = bgColor;

  // Capture the entire comparisonContent as one continuous image
  try {
    var canvas = await html2canvas(content, {
      scale: 2, useCORS: true, backgroundColor: bgColor,
      logging: false, allowTaint: false,
      height: content.scrollHeight,
      windowHeight: content.scrollHeight,
    });
  } catch (err) {
    content.style.background = origBg;
    if (compHint) compHint.style.display = "";
    if (pdfBtn) { pdfBtn.style.display = ""; pdfBtn.disabled = false; pdfBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> Download PDF'; }
    console.warn("html2canvas failed:", err);
    return;
  }

  content.style.background = origBg;

  // Split the tall image across PDF pages
  var imgData = canvas.toDataURL("image/png");
  var imgW = canvas.width;
  var imgH = canvas.height;
  var pageContentH = pageH - margin * 2;
  var scaleFactor = usableW / imgW;
  var imgPerPage = pageContentH / scaleFactor;
  var totalPages = Math.ceil(imgH / imgPerPage);

  for (var p = 0; p < totalPages; p++) {
    if (p > 0) {
      pdf.addPage();
      pdf.setFillColor(pageRgb[0], pageRgb[1], pageRgb[2]);
      pdf.rect(0, 0, pageW, pageH, 'F');
    }

    var sy = Math.round(p * imgPerPage);
    var sh = Math.round(Math.min(imgPerPage, imgH - sy));
    if (sh <= 0) break;

    var pageCanvas = document.createElement('canvas');
    pageCanvas.width = imgW;
    pageCanvas.height = sh;
    var ctx = pageCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, sy, imgW, sh, 0, 0, imgW, sh);

    var pageImg = pageCanvas.toDataURL("image/png");
    var renderH = usableW * sh / imgW;
    pdf.addImage(pageImg, "PNG", margin, margin, usableW, renderH);
  }

  // Restore UI elements
  if (compHint) compHint.style.display = "";
  if (pdfBtn) pdfBtn.style.display = "";

  pdf.save("Comparison Dashboard - All Clients.pdf");

  if (pdfBtn) { pdfBtn.disabled = false; pdfBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> Download PDF'; }
}

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
  setupGlobalSync();
  initExcelPasteTracker();
  initChartDataLabels();
  scaleSlides();
  showGlobalSettings();
  document.addEventListener('paste', handleExcelGridPaste);
  document.addEventListener('keydown', handleExcelGridKeydown);
});

// Re-register datalabels after scripts load
setTimeout(initChartDataLabels, 800);
