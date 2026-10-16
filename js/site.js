/* Overview page behavior. Data lives in data.js. */

/* ---------- Hero: the TV that reports what it sees ---------- */
const PROGRAMS = [
  { show: "Evening news",          genre: "Local channel",      a: ["#3E57D6","52%","8%"],  b: ["#7B8CFF","12%","16%"] },
  { show: "Cooking competition",   genre: "Streaming app",      a: ["#C2552E","10%","30%"], b: ["#F2A65A","60%","12%"] },
  { show: "Saturday football",     genre: "Cable box, HDMI 1",  a: ["#2E8B57","30%","40%"], b: ["#9BD17A","64%","6%"] },
  { show: "Animated movie",        genre: "Blu-ray, HDMI 2",    a: ["#B04AD9","58%","20%"], b: ["#FFC95C","14%","10%"] },
  { show: "Political debate",      genre: "Antenna",            a: ["#5A6B8C","8%","10%"],  b: ["#D9DEE8","62%","24%"] },
  { show: "Video game",            genre: "Console, HDMI 3",    a: ["#1FA3A3","44%","28%"], b: ["#E2382B","16%","6%"] }
];

function startTV() {
  const show = document.getElementById("tv-show");
  if (!show) return;
  const flash = document.getElementById("tv-flash");
  const log = document.getElementById("capture-log");
  const count = document.getElementById("log-count");
  const a = document.getElementById("shape-a"), b = document.getElementById("shape-b");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0, n = 0, clock = new Date(2026, 0, 1, 21, 4, 12);

  function addLine(p, animate) {
    clock = new Date(clock.getTime() + 7000 + Math.random() * 9000);
    const t = clock.toTimeString().slice(0, 8);
    const li = document.createElement("li");
    if (animate) li.className = "new";
    li.innerHTML = `<span class="t">${t}</span><span>Matched <b>${p.show}</b></span>`;
    log.prepend(li);
    while (log.children.length > 4) log.lastChild.remove();
    n++; count.textContent = `${n} snapshot${n === 1 ? "" : "s"} matched`;
  }
  function setScene(p) {
    show.innerHTML = `${p.show}<span class="genre">${p.genre}</span>`;
    a.style.background = p.a[0]; a.style.left = p.a[1]; a.style.top = p.a[2];
    b.style.background = p.b[0]; b.style.left = p.b[1]; b.style.top = p.b[2];
  }

  if (reduce) { PROGRAMS.slice(0, 4).forEach(p => addLine(p, false)); return; }
  addLine(PROGRAMS[0], false);
  setInterval(() => {
    i = (i + 1) % PROGRAMS.length;
    setScene(PROGRAMS[i]);
    setTimeout(() => {
      flash.classList.remove("on"); void flash.offsetWidth; flash.classList.add("on");
      addLine(PROGRAMS[i], true);
    }, 900);
  }, 3200);
}

/* ---------- Opt-out grid ---------- */
function buildGrid() {
  const table = document.getElementById("optgrid");
  if (!table || typeof OPT_OUT_RESULTS === "undefined") return;
  const insp = document.getElementById("grid-inspector");
  const btnIn = document.getElementById("mode-in"), btnOut = document.getElementById("mode-out");
  const legendOn = document.getElementById("legend-on");
  if (SAMPLE_DATA) document.getElementById("sample-banner").classList.add("show");
  let mode = "optedOut", selected = null;

  function render() {
    const onClass = mode === "optedIn" ? "on-in" : "on-out";
    legendOn.style.background = mode === "optedIn" ? "var(--glow)" : "var(--led)";
    // group header row
    let html = "<thead><tr><th></th>";
    for (let j = 0; j < SCENARIOS.length; ) {
      const g = SCENARIOS[j].group; let span = 1;
      while (g && j + span < SCENARIOS.length && SCENARIOS[j + span].group === g) span++;
      html += g ? `<th class="grp" colspan="${span}" scope="colgroup">${g}</th>` : "<th></th>";
      j += span;
    }
    html += "<th></th></tr><tr><th></th>";
    SCENARIOS.forEach(s => html += `<th scope="col" title="${s.name}">${s.short}</th>`);
    html += "<th></th></tr></thead><tbody>";
    OPT_OUT_RESULTS.forEach((r, i) => {
      const vals = r[mode], hits = vals.filter(Boolean).length;
      html += `<tr><th scope="row" class="row">${r.os}</th>`;
      vals.forEach((v, j) => {
        const sel = selected && selected[0] === i && selected[1] === j ? " sel" : "";
        html += `<td class="${v ? onClass : ""}${sel}" tabindex="0" data-i="${i}" data-j="${j}" aria-label="${r.os}, ${SCENARIOS[j].name}: ${v ? "ACR traffic observed" : "no ACR traffic"}"></td>`;
      });
      html += `<td class="rate">${hits} / ${vals.length}</td></tr>`;
    });
    table.innerHTML = html + "</tbody>";
  }
  function inspect(i, j) {
    selected = [i, j];
    const r = OPT_OUT_RESULTS[i], v = r[mode][j];
    const state = mode === "optedIn" ? "ACR opted in" : "ACR opted out";
    insp.innerHTML = `<b>${r.os}</b>, ${SCENARIOS[j].name}, ${state}: ${v ? "ACR-attributable traffic observed." : "no ACR-attributable traffic."}${r.note ? " " + r.note : ""}`;
    render();
  }
  table.addEventListener("click", e => { const td = e.target.closest("td[data-i]"); if (td) inspect(+td.dataset.i, +td.dataset.j); });
  table.addEventListener("keydown", e => {
    const td = e.target.closest("td[data-i]");
    if (td && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); inspect(+td.dataset.i, +td.dataset.j); table.querySelector(`td[data-i="${td.dataset.i}"][data-j="${td.dataset.j}"]`).focus(); }
  });
  function setMode(m) {
    mode = m;
    btnIn.setAttribute("aria-pressed", m === "optedIn");
    btnOut.setAttribute("aria-pressed", m === "optedOut");
    if (selected) inspect(selected[0], selected[1]); else render();
  }
  btnIn.addEventListener("click", () => setMode("optedIn"));
  btnOut.addEventListener("click", () => setMode("optedOut"));
  render();
}

document.addEventListener("DOMContentLoaded", () => { startTV(); buildGrid(); });