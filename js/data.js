/* ==========================================================
   Edit this file to put your real results on the overview page.
   ========================================================== */

/* While true, a yellow "sample data" notice shows above the grid.
   Set to false once the numbers below are your real results. */
const SAMPLE_DATA = true;

/* The ten scenarios, in the same order as the columns in each row below
   (Table 3 in the paper).
   name:  shown in the inspector when a square is selected
   short: column header in the grid
   group: optional; neighbouring columns with the same group get a shared header */
const SCENARIOS = [
  { name: "Idle",                            short: "Idle" },
  { name: "Antenna: Channel",                short: "Channel",           group: "Antenna" },
  { name: "Antenna: Black screen + audio",   short: "Black + audio",     group: "Antenna" },
  { name: "Antenna: Dynamic + no audio",     short: "Video, no audio",   group: "Antenna" },
  { name: "First-party streaming",           short: "First-party" },
  { name: "Third-party streaming: Netflix",  short: "Netflix",           group: "Third-party streaming" },
  { name: "Third-party streaming: Tubi TV",  short: "Tubi TV",           group: "Third-party streaming" },
  { name: "Third-party streaming: YouTube",  short: "YouTube",           group: "Third-party streaming" },
  { name: "HDMI",                            short: "HDMI" },
  { name: "Screen mirroring",                short: "Mirroring" }
];

/* One entry per operating system.
   optedIn / optedOut: ten values, one per scenario, in the order above.
     1 = ACR-attributable traffic observed, 0 = none.
   note: optional text shown in the inspector for that OS.
   The values below are PLACEHOLDERS shaped to match the abstract;
   replace them with your measured results. */
const OPT_OUT_RESULTS = [
  { os: "Samsung Tizen",   optedIn: [1,1,1,1,1,1,1,1,1,1], optedOut: [1,1,0,1,1,0,1,1,0,1], note: "[Endpoint(s) observed]" },
  { os: "Vizio SmartCast", optedIn: [1,1,1,1,1,1,1,1,1,1], optedOut: [1,1,1,1,1,1,1,1,1,1], note: "Content-correlated endpoint hosted on Amazon Kinesis." },
  { os: "[OS 3]",          optedIn: [1,1,1,0,1,1,1,0,1,1], optedOut: [0,1,0,0,0,1,0,0,0,0], note: "" },
  { os: "[OS 4]",          optedIn: [1,1,0,1,1,1,0,1,1,1], optedOut: [0,0,0,1,0,0,0,0,0,0], note: "" },
  { os: "[OS 5]",          optedIn: [1,1,1,1,1,0,1,1,1,1], optedOut: [0,0,0,0,0,0,0,0,0,0], note: "" },
  { os: "[OS 6]",          optedIn: [1,0,1,1,1,1,1,1,0,1], optedOut: [0,0,0,0,0,0,0,0,0,0], note: "" },
  { os: "[OS 7]",          optedIn: [1,1,1,1,0,1,1,1,1,0], optedOut: [0,0,0,0,0,0,0,0,0,0], note: "" },
  { os: "[OS 8]",          optedIn: [1,1,1,1,1,1,0,1,1,1], optedOut: [0,0,0,0,0,0,0,0,0,0], note: "" }
];