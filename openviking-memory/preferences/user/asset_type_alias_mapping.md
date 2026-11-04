- In zhi2-web-admin/src/views/benefit/statisticsMap/operatingAssets.vue, add alias-compatible mapping for asset types because mapHouseType/mapVenueType key mismatch caused asset misalignment.
- Added aliases: poker maps to 棋牌室, property maps to 物业用房, food maps to 生鲜柜.
- Affected files: src/views/benefit/statisticsMap/operatingAssets.vue, src/constant/map.js, src/views/benefit/statisticsMap/mock.js, src/api/benefit/pubAssetLease.js, src/views/benefit/statisticsMap/mockApi.js.
- Source cursor session: 60c21339-ecb3-44a0-9019-c7bfbc324ce4.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "asset_type_alias_mapping",
  "source_extraction_id": "e430f49a552a4095b922c92baa03f3e4",
  "version": 1,
  "memory_type": "preferences"
}
-->