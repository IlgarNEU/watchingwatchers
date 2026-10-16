/* ==========================================================
   Results shown in the two grids on the overview page.
   Source: Section 6 of the paper (Figure 7).
   ========================================================== */

/* The ten scenarios, in column order (Table 3). */
const SCENARIOS = [
  { name: "Idle",                            short: "Idle" },
  { name: "Antenna: Channel",                short: "Channel",         group: "Antenna" },
  { name: "Antenna: Black screen + audio",   short: "Black + audio",   group: "Antenna" },
  { name: "Antenna: Dynamic + no audio",     short: "Video, no audio", group: "Antenna" },
  { name: "First-party streaming",           short: "First-party" },
  { name: "Third-party streaming: Netflix",  short: "Netflix",         group: "Third-party streaming" },
  { name: "Third-party streaming: Tubi TV",  short: "Tubi TV",         group: "Third-party streaming" },
  { name: "Third-party streaming: YouTube",  short: "YouTube",         group: "Third-party streaming" },
  { name: "HDMI",                            short: "HDMI" },
  { name: "Screen mirroring",                short: "Mirroring" }
];

/* One row per OS (Roku OS has one row per TV).
   optedIn:  1 = ACR-attributable traffic, 0 = none, null = not stated in
             the text yet (shown as "?"; fill in from Figure 7).
   optedOut: number of the 30 opted-out measurements with traffic
             consistent with ACR (0 = none),
             "41/60"-style text when the paper reports sub-scenarios together,
             "na" when the opt-out does not apply to that scenario,
             null = not stated yet.
   verdict:  short opt-out result shown at the end of the row.
   notes:    optional text per column index (0–9), shown when a square
             is selected. inNotes for the opted-in grid, outNotes for opted-out. */
const RESULTS = [
  { os: "Tizen OS", tv: "Samsung", verdict: "Not fully effective",
    optedIn:  [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    optedOut: [9, "41/60", 0, "41/60", 30, 2, 6, 3, 18, 0],
    inNotes:  { 6: "Tracked in 29 of 30 measurements. Tubi had not been studied before.",
                2: "Traffic disappears with a black screen, consistent with video-based ACR." },
    outNotes: { 1: "The paper reports Channel and Dynamic + no audio together.",
                3: "The paper reports Channel and Dynamic + no audio together.",
                0: "Seen even though Idle shows no ACR traffic when opted in." } },

  { os: "webOS", tv: "LG", verdict: "Effective",
    optedIn:  [0, 1, 1, 0, 1, 0, 0, 0, null, 0],
    optedOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    inNotes:  { 3: "Traffic drops by 97.3% without audio, consistent with audio-based ACR." } },

  { os: "Roku OS", tv: "Roku TV", verdict: "Doesn't cover first-party streaming",
    optedIn:  [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    optedOut: [0, 0, 0, 0, "na", 0, 0, 0, 0, 0],
    inNotes:  { 8: "Roku OS is the only OS with no ACR traffic over HDMI." },
    outNotes: { 4: "The opt-out does not apply to the first-party streaming service, and Roku TV does not say so.",
                1: "Only 1.7% residual traffic remains after opting out." } },

  { os: "Roku OS", tv: "TCL", verdict: "Doesn't cover first-party streaming",
    optedIn:  [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    optedOut: [0, "9/90", "9/90", "9/90", "na", 0, 0, 0, 0, 0],
    inNotes:  { 8: "Roku OS is the only OS with no ACR traffic over HDMI." },
    outNotes: { 1: "The paper reports the three antenna sub-scenarios together.", 2: "The paper reports the three antenna sub-scenarios together.", 3: "The paper reports the three antenna sub-scenarios together.",
                4: "The opt-out does not apply to the first-party streaming service. TCL discloses this in its settings menu." } },

  { os: "SmartCast OS", tv: "Vizio", verdict: "No observable effect",
    optedIn:  [1, 1, 1, 1, 1, 0, 0, 0, null, 0],
    optedOut: [30, 30, 30, 30, 30, null, null, null, null, null],
    inNotes:  { 0: "The only OS with ACR traffic while idle on the home screen (100% of measurements)." },
    outNotes: { 0: "Traffic to the Amazon Kinesis endpoint did not disappear or decrease in any opted-out measurement." } },

  { os: "Google TV OS", tv: "Sony", verdict: "Effective",
    optedIn:  [0, 1, null, null, 0, 0, 1, 0, null, 0],
    optedOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    inNotes:  { 2: "Traffic drops by 52.9% with a black screen, consistent with video-based ACR (Samba TV)." } },

  { os: "Fire TV OS", tv: "Amazon", verdict: "Effective",
    optedIn:  [0, 1, 1, 1, 0, 0, 0, 0, null, 0],
    optedOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },

  { os: "VIDAA OS", tv: "Supersonic", verdict: "Effective",
    optedIn:  [0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    optedOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    inNotes:  { 4: "First-party service: VIDAA Channels.",
                9: "VIDAA OS is the only OS with ACR on screen mirroring." } }
];