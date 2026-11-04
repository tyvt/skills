- When building step bars, avoid root container `items-center` that shrinks flex children; add `w-full` to step bar, set `.step` to `flex:1` and draw connectors with `::after`, and add `white-space:nowrap` to labels.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "step_bar_layout",
  "source_extraction_id": "3bb0712c3896440ab28175df8082cca0",
  "version": 1,
  "memory_type": "preferences"
}
-->