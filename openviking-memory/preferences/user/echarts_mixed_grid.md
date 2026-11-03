- In trend mixed chart, change `grid.right` from `66` to `46` to expand plot area rightward and reduce whitespace.
- Unit "万元" is aligned to top of Y-axis by `syncTrendMixedUnitGraphics` in `finished` per grid rectangle.
- If it sticks to edge, adjust `grid.right` back to `50~54`.
- Verified from cursor session 3fb2025f-5558-4b3c-b155-b057ddc32224; related files: fundPanorama/index.vue, package.json.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "echarts_mixed_grid",
  "source_extraction_id": "df5493c7835e4a3caf5149b96826070c",
  "version": 1,
  "memory_type": "preferences"
}
-->