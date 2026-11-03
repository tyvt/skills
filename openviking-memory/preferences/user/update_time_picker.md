- Constrains the update-time date picker selectable range to two natural years forward from today via getUpdateTimeSelectableBounds in companyListQuery.js.
- isUpdateTimeDayDisabled allows selection from the second day within anchor ±2 years; the old fixed `day < anchor` start logic was abandoned.
- validateUpdateTimeRange clears _updateTimePickAnchor when range validation fails.


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "update_time_picker",
  "source_extraction_id": "7072da725d544d60a6ec2ce79757e096",
  "version": 1,
  "memory_type": "preferences"
}
-->