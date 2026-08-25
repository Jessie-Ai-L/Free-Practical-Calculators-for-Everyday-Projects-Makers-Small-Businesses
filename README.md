# MakerEstimate Production V3

Adds Candle Batch Calculator and updates internal links plus sitemap.

Upload the CONTENTS of this folder to your GitHub repository root.

New URL:
https://makerestimate.com/candle/candle-batch-calculator/


## Candle Batch Calculator clarification
`Finished Fill Weight per Candle` means wax + fragrance combined per candle, before waste allowance.

Default validation case:
- 8 oz finished fill weight
- 12 candles
- 8% fragrance load, based on wax weight
- 5% waste allowance

Expected:
- Wax to Prepare: 93.33 oz
- Fragrance Oil: 7.47 oz
- Total Batch Weight: 100.8 oz
- Waste Allowance: 4.44 oz

## V4: Candle Burn Time Calculator
New URL:
https://makerestimate.com/candle/candle-burn-time-calculator/

Validation cases:
1. Burn Test: start 16 oz, end 15 oz, 4 hours, usable wax 8 oz
   - burn rate 0.25 oz/hr
   - estimated burn time 32 hours
   - 8 four-hour sessions
2. Burn Test: start 500 g, end 460 g, 4 hours, usable wax 300 g
   - burn rate 10 g/hr
   - estimated burn time 30 hours
3. Quick Estimate: usable wax 12 oz, burn rate 0.30 oz/hr
   - estimated burn time 40 hours

## Validation fix
Fixed the Test Duration field so values such as 4 hours are valid.
The previous combination `min=.01` + `step=.25` made browsers treat 4 as a step mismatch.
Forms now use the calculator's own validation messages.

## V5: Candle Pricing Calculator
URL:
https://makerestimate.com/candle/candle-pricing-calculator/

Validation cases:
1. Cost $6.50, margin 55%, fee 0%, fixed $0, shipping $0
   Expected retail: $14.44
   Profit: $7.94
   Effective margin: 55%
2. Cost $10, margin 50%, fee 10%, fixed $0, shipping $0
   Price = $25.00
   Percentage fee = $2.50
   Profit = $12.50
3. Cost $8, margin 40%, fee 8%, fixed $0.30, shipping $2
   Price = $19.81 (rounded)

## Complete V5 synchronization
Homepage, Candle category, All Calculators, and sitemap are synchronized with:
- Candle Burn Time Calculator
- Candle Pricing Calculator

## V6: Candle Jar Fill Calculator
URL:
https://makerestimate.com/candle/candle-jar-fill-calculator/

Default validation:
8 fl oz jar, 90% fill, density 0.90 g/ml, 8% fragrance, 12 jars.
Expected approximately:
- Wax per jar: 6.76 oz
- Fragrance per jar: 0.54 oz
- Finished per jar: 7.30 oz
- Total wax: 81.14 oz
- Total fragrance: 6.49 oz
- Total batch: 87.63 oz

Sitemap should now contain 22 URLs.


V7: Added Candle Wick Size Calculator at /candle/candle-wick-size-calculator/, plus homepage, calculators, candle category and sitemap links. Recommendations are burn-test starting ranges, not guarantees.


## V9 QA / stabilization release
No new calculator was added in this release.

Changes:
- Site-wide footer spacing and responsive layout fix.
- Automated QA scan for page titles, meta descriptions, H1s, canonicals, internal links and sitemap targets.
- Legacy DayKit normalization.
- See `QA-REPORT.md` for the scan summary.


## V9.1 definitive footer fix
The V9 footer patch targeted `li` elements, but several calculator pages use direct `<a>` elements inside each footer column.
V9.1 fixes the actual HTML structure with a direct-child anchor CSS rule and adds `?v=9.1` to the shared stylesheet URL to avoid stale browser/CDN CSS.


## V9.2 unified footer
All HTML pages now use the exact same footer markup, not just CSS overrides.
This removes the structural difference between older direct-anchor footers and newer UL/LI footers.
The shared stylesheet is cache-busted as `style.css?v=9.2`.


## V11 Candle Fragrance Calculator SEO Upgrade
- Expanded Candle Fragrance Calculator into a full SEO utility page.
- Added oz/g support, multiple-batch scaling, reset and copy.
- Added formulas, 16 oz worked example, reference table, fragrance-load explanation, FAQs and related calculators.
- URL and canonical remain unchanged.


## V11.1 Fragrance calculator function fix
The upgraded HTML reused the same `calculator.js` URL as the older version, so browser/CDN cache could serve stale JavaScript that no longer matched the new field IDs. V11.1 cache-busts the script as `calculator.js?v=11.1` and listens to both input and change events.


## V13 Quilt Backing Calculator
- Added /quilting/quilt-backing-calculator/
- Compares vertical and horizontal layouts.
- Supports inches/cm, 42/44/108 presets, Auto layout, reset and copy.
- Added sitemap entry and internal discovery cards where supported.


## V14 Quilt Border Calculator
- Added /quilting/quilt-border-calculator/
- Supports 1–4 sequential borders, inches/cm, WOF presets, butted/mitered corners, reset and copy.
- Added discovery links and sitemap entry.


## V15 Baby Quilt Size Calculator
- Added /quilting/baby-quilt-size-calculator/
- Interactive use presets, inches/cm conversion, backing and batting estimates, reset and copy.
- Added FAQ schema, sitemap entry, All Calculators and Quilting discovery links.
