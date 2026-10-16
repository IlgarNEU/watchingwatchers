/* ==========================================================
   Edit this file to put your real results on the overview page.
   ========================================================== */

/* While true, a yellow "sample data" notice shows above the grid.
   Set to false once the numbers below are your real results. */
const SAMPLE_DATA = true;

/* Short names for the ten scenarios, in the same order as the list
   on the page. Shown as column headers (S1…S10) and in the inspector. */
const SCENARIOS = [
  "[Scenario 1]", "[Scenario 2]", "[Scenario 3]", "[Scenario 4]", "[Scenario 5]",
  "[Scenario 6]", "[Scenario 7]", "[Scenario 8]", "[Scenario 9]", "[Scenario 10]"
];

/* One entry per operating system.
   optedIn / optedOut: ten values, one per scenario.
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
