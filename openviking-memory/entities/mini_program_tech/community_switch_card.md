# Community Switch Card
home.vue adds community-card between carousel and menu; shows switch entry when houseList.length > 1, calls syncPortalHouseSelection to update houseId/project and write snapshot.
## Behavior
- community-card inserted between swiper and menu grid in home.vue
- Visible only when portalUser.houseList.length > 1
- Selection calls syncPortalHouseSelection to update houseId/project and persist snapshot
## Constraints
- Menu grid and bottom tab bar remain unchanged
- Community name sourced from getActiveHouseFromPortalUser
## Attribution
- Source session: afb09671-9f86-4f6b-bab5-1a2b4c3931ef; code baseline: none
- Files: home.vue, externalWebview.vue, portal-user.js

<!-- MEMORY_FIELDS
{
  "category": "mini_program_tech",
  "name": "community_switch_card",
  "source_extraction_id": "2682297093f14d8fbda8251389becd32",
  "version": 1,
  "memory_type": "entities"
}
-->