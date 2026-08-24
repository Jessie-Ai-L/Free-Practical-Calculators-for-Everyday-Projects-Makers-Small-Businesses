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
