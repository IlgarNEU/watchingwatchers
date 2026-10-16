/* Overview page behavior. Data lives in data.js. */

/* ---------- Hero: the TV that reports what it sees ---------- */
const PROGRAMS = [
  { show: "Evening news",        genre: "Antenna",            a: ["#3E57D6","52%","8%"],  b: ["#7B8CFF","12%","16%"] },
  { show: "Cooking competition", genre: "Streaming app",      a: ["#C2552E","10%","30%"], b: ["#F2A65A","60%","12%"] },
  { show: "Saturday football",   genre: "Cable box, HDMI 1",  a: ["#2E8B57","30%","40%"], b: ["#9BD17A","64%","6%"] },
  { show: "Animated movie",      genre: "Blu-ray, HDMI 2",    a: ["#B04AD9","58%","20%"], b: ["#FFC95C","14%","10%"] },
  { show: "Political debate",    genre: "Antenna",            a: ["#5A6B8C","8%","10%"],  b: ["#D9DEE8","62%","24%"] },
  { show: "Video game",          genre: "Console, HDMI 3",    a: ["#1FA3A3","44%","28%"], b: ["#E2382B","16%","6%"] }
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
    const li = document.createElement("li");
    if (animate) li.className = "new";
    li.innerHTML = `<span class="t">${clock.toTimeString().slice(0, 8)}</span><span>Matched <b>${p.show}</b></span>`;
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

/* ---------- Result grids ----------
   Any <table class="optgrid" data-mode="optedIn|optedOut"> is filled in.
   Each square shows the share of 30 runs (Figure 7). */
function cellInfo(mode, v, na) {
  const runs = Math.round(v * 30 / 100);
  const share = `${v}% of runs (${runs} of 30)`;
  if (mode === "optedIn") {
    const tracked = v >= TRACKED_THRESHOLD;
    return { cls: v ? "on-in" : "", text: v ? `${v}` : "", alpha: v ? 0.25 + 0.75 * v / 100 : 0,
             desc: v ? `content-correlated traffic in ${share}, so ${tracked ? "tracked" : "not tracked"}` : "no content-correlated traffic, so not tracked" };
  }
  return { cls: (v ? "on-out" : "") + (na ? " na" : ""), text: v ? `${v}` : "", alpha: v ? 0.25 + 0.75 * v / 100 : 0,
           desc: (v ? `traffic consistent with ACR in ${share}` : "no traffic consistent with ACR") + (na ? "; the opt-out does not apply here" : "") };
}

function buildGrid(table) {
  const mode = table.dataset.mode;
  const insp = document.getElementById(table.dataset.inspector);
  let selected = null;

  function render() {
    let html = `<colgroup><col style="width:150px">${SCENARIOS.map(() => "<col>").join("")}<col style="width:${mode === "optedIn" ? 80 : 160}px"></colgroup>`;
    html += "<thead><tr><th></th>";
    for (let j = 0; j < SCENARIOS.length; ) {
      const g = SCENARIOS[j].group; let span = 1;
      while (g && j + span < SCENARIOS.length && SCENARIOS[j + span].group === g) span++;
      html += g ? `<th class="grp" colspan="${span}" scope="colgroup">${g}</th>` : "<th></th>";
      j += span;
    }
    html += "<th></th></tr><tr><th></th>";
    SCENARIOS.forEach(s => html += `<th scope="col" title="${s.name}">${s.short}</th>`);
    html += `<th class="end">${mode === "optedIn" ? "Tracked" : "Opt-out"}</th></tr></thead><tbody>`;
    RESULTS.forEach((r, i) => {
      html += `<tr><th scope="row" class="row">${r.os}<span>${r.tv}</span></th>`;
      r[mode].forEach((v, j) => {
        const na = mode === "optedOut" && (r.naOut || []).includes(j);
        const c = cellInfo(mode, v, na);
        const sel = selected && selected[0] === i && selected[1] === j ? " sel" : "";
        const style = c.alpha ? ` style="--a:${c.alpha.toFixed(2)}"` : "";
        html += `<td class="${c.cls}${sel}"${style} tabindex="0" data-i="${i}" data-j="${j}" aria-label="${r.os} (${r.tv}), ${SCENARIOS[j].name}: ${c.desc}">${c.text}</td>`;
      });
      if (mode === "optedIn") {
        html += `<td class="rate">${r.optedIn.filter(v => v >= TRACKED_THRESHOLD).length} of ${r.optedIn.length}</td></tr>`;
      } else {
        html += `<td class="rate verdict${r.verdict !== "Effective" ? " bad" : ""}">${r.verdict}</td></tr>`;
      }
    });
    table.innerHTML = html + "</tbody>";
  }
  function inspect(i, j) {
    selected = [i, j];
    const r = RESULTS[i];
    const na = mode === "optedOut" && (r.naOut || []).includes(j);
    const c = cellInfo(mode, r[mode][j], na);
    const notes = (mode === "optedIn" ? r.inNotes : r.outNotes) || {};
    const state = mode === "optedIn" ? "ACR opted in" : "ACR opted out";
    insp.innerHTML = `<b>${r.os} (${r.tv})</b>, ${SCENARIOS[j].name}, ${state}: ${c.desc}.${notes[j] ? " " + notes[j] : ""}`;
    render();
  }
  table.addEventListener("click", e => { const td = e.target.closest("td[data-i]"); if (td) inspect(+td.dataset.i, +td.dataset.j); });
  table.addEventListener("keydown", e => {
    const td = e.target.closest("td[data-i]");
    if (td && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault(); const { i, j } = td.dataset; inspect(+i, +j);
      table.querySelector(`td[data-i="${i}"][data-j="${j}"]`).focus();
    }
  });
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  startTV();
  if (typeof RESULTS !== "undefined") document.querySelectorAll("table.optgrid").forEach(buildGrid);
});