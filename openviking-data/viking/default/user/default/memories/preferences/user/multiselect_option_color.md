- Multi-select topics (optionType '1') must not hardcode option name color as `color-333` in `ViewOptionsList.vue`; single-select colors dynamically by option name, and the hardcoded value made waiver show dark gray
- Use a template dynamic class via `OPTION_NAME_COLOR` mapping and `optionNameColorClass` function returning the corresponding font color class (e.g. `font-color-ed9e0f`)

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "multiselect_option_color",
  "source_extraction_id": "51c475875d87459b8f21f008402d2f1a",
  "version": 1,
  "memory_type": "preferences"
}
-->