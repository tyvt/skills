# Cursor Siliconflow Key Error
Cursor reports `Model name is not valid` when the saved OpenAI API Key is not enabled and Base URL is not overridden for SiliconFlow.

## Symptom
- Cursor throws `Model name is not valid` because requests do not route through the SiliconFlow key.
- Saving the Key in settings does not equal enabling it; the Key switch remains OFF.

## Root Cause
- OpenAI API Key toggle is OFF and Override OpenAI Base URL is left unchanged, so traffic bypasses SiliconFlow.
- The model name validation fails since the endpoint expects SiliconFlow-hosted models.

## Fix
- Turn the Key switch to ON.
- Set Base URL to `https://api.siliconflow.cn/v1`.
- Confirm the model name matches a SiliconFlow-available model.

## Verification
- Source: d-repository/001.md.
- Related files include Cursor settings.json, ide_state.json, and update-cursor-settings SKILL.md.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "cursor_siliconflow_error",
  "source_extraction_id": "9c284e58ed614ab5ae1e20683f747416",
  "version": 1,
  "memory_type": "entities"
}
-->