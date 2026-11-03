- Prefers house interface to chain refreshPortalProfile rather than only calling devRefreshPortalHouseIfEmpty in develop
- Accepts extractPropertyPageRows and isPropertyApiSuccess supporting res.data as array to avoid parse failure
- Uses mergeCtUserIdentityHouseIntoPortalUser calling property/ctUserIdentity/pageByToken to chain house data into portal user

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "house_data_chain",
  "source_extraction_id": "71711547f6984c3c811af6b30fdf76a0",
  "version": 1,
  "memory_type": "preferences"
}
-->