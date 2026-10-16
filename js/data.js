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

/* One row per OS (Roku OS has one row per TV), from Figure 7.
   optedIn / optedOut: share of the 30 runs (0–100) in which the ACR endpoint
   received content-correlated traffic, one value per scenario in the order above.
   A scenario counts as tracked when the opted-in share is 80 or more.
   naOut:    column indexes where the opt-out does not apply (striped).
   verdict:  short opt-out result shown at the end of the opted-out row.
   inNotes / outNotes: optional text per column index (0–9), shown when a
   square is selected. */
const TRACKED_THRESHOLD = 80;

const RESULTS = [
  { os: "Tizen OS", tv: "Samsung", verdict: "Not fully effective",
    optedIn:  [0, 93, 0, 87, 97, 0, 97, 0, 97, 0],
    optedOut: [30, 70, 0, 67, 100, 7, 20, 10, 60, 0],
    inNotes:  { 6: "Tubi had not been studied before.",
                2: "Traffic disappears with a black screen, consistent with video-based ACR." },
    outNotes: { 0: "Seen even though Idle isn't tracked when ACR is on.",
                5: "Seen even though Netflix isn't tracked when ACR is on.",
                7: "Seen even though YouTube isn't tracked when ACR is on." } },

  { os: "webOS", tv: "LG", verdict: "Effective",
    optedIn:  [0, 100, 100, 0, 100, 17, 10, 23, 100, 0],
    optedOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    inNotes:  { 3: "Traffic drops by 97.3% without audio, consistent with audio-based ACR.",
                5: "Below the 30% threshold, so not tracked. The endpoint keeps receiving low-level traffic in untracked scenarios, about 95% less than when tracked.",
                6: "Below the 30% threshold, so not tracked. The endpoint keeps receiving low-level traffic in untracked scenarios, about 95% less than when tracked.",
                7: "Below the 30% threshold, so not tracked. The endpoint keeps receiving low-level traffic in untracked scenarios, about 95% less than when tracked." } },

  { os: "Roku OS", tv: "Roku TV", verdict: "Doesn't cover first-party streaming",
    optedIn:  [0, 100, 94, 100, 100, 0, 0, 0, 0, 0],
    optedOut: [0, 0, 0, 0, 97, 0, 0, 0, 0, 0],
    naOut:    [4],
    inNotes:  { 8: "No ACR traffic over HDMI on Roku OS." },
    outNotes: { 4: "The opt-out does not apply to the first-party streaming service, and Roku TV does not say so.",
                1: "Only 1.7% residual traffic remains after opting out." } },

  { os: "Roku OS", tv: "TCL", verdict: "Doesn't cover first-party streaming",
    optedIn:  [0, 100, 97, 97, 100, 0, 0, 0, 0, 0],
    optedOut: [0, 17, 7, 7, 97, 0, 0, 0, 0, 0],
    naOut:    [4],
    inNotes:  { 8: "No ACR traffic over HDMI on Roku OS." },
    outNotes: { 4: "The opt-out does not apply to the first-party streaming service. TCL discloses this in its settings menu." } },

  { os: "Google TV OS", tv: "Sony", verdict: "Effective",
    optedIn:  [0, 100, 100, 100, 0, 0, 100, 0, 100, 0],
    optedOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    inNotes:  { 2: "Traffic falls by 52.9% with a black screen, consistent with video-based ACR (Samba TV)." } },

  { os: "Fire TV OS", tv: "Amazon", verdict: "Effective",
    optedIn:  [0, 90, 100, 100, 0, 0, 0, 0, 93, 0],
    optedOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },

  { os: "SmartCast OS", tv: "Vizio", verdict: "No observable effect",
    optedIn:  [100, 100, 100, 100, 100, 0, 0, 0, 0, 0],
    optedOut: [100, 100, 100, 100, 100, 0, 0, 0, 0, 0],
    inNotes:  { 0: "The only OS with ACR traffic while idle on the home screen." },
    outNotes: { 0: "Traffic to the Amazon Kinesis endpoint did not disappear or decrease in any opted-out run." } },

  { os: "VIDAA OS", tv: "Supersonic", verdict: "Effective",
    optedIn:  [0, 100, 100, 0, 100, 0, 100, 0, 100, 100],
    optedOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    inNotes:  { 4: "First-party service: VIDAA Channels.",
                9: "VIDAA OS is the only OS with ACR on screen mirroring." } }
];