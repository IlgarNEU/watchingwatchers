# Watching the Watchers: project website

## Files
- index.html: overview (hero, how ACR works, research questions, method, findings, takeaways)
- paper.html, authors.html, coverage.html: inner pages
- styles.css: all styling. Colors are defined once at the top under :root
- js/data.js: the only script you need to edit (scenario names and opt-out grid results)
- js/site.js: page behavior (animated TV, interactive grid); no edits needed
- images/: testbed.jpg for the Method section; images/logos/ for press outlet icons
- paper.pdf: add the paper here

## To finish
1. Search the .html files for "[" and replace each placeholder.
2. In js/data.js, enter real per-scenario results for each OS, then set SAMPLE_DATA = false.
   The grid currently shows placeholder values shaped to match the abstract.
3. Preview: open index.html, or run `python3 -m http.server` here and visit http://localhost:8000.
4. Deploy by uploading the folder, the same way as the first site.
