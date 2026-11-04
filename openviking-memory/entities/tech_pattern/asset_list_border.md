# Asset Change List Unified Container Border
Asset change lists lacked the `list-card` container, causing tables to have no outer border; global `list-card` provides border, radius, and container constraints.

## Context
- Operating house change list missing `list-card` wrapper, no outer border.
- Asset part and parking spot change lists already have the container.
- Parking spot list additionally missing `v-loading`.
- Tree node 32px height is provided by shared `RegionTreeLayout`.

## Solution
- Use unified `list-card` container for all asset change lists to get outer border.
- Add `v-loading` to parking spot change list.
- Rely on `RegionTreeLayout` for tree node height consistency.

## Affected Files
- `zhi2-web-admin/src/views/benefit/pubParkingRate/index.vue`
- `zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue`
- `zhi2-web-admin/src/styles/index.scss`
- `zhi2-web-admin/src/views/benefit/parkingManage/index.vue`
- `zhi2-web-admin/src/views/benefit/pubRegAccountChange/index.vue`
- `zhi2-web-admin/src/views/benefit/pubHouseDetailChange/index.vue`
- `zhi2-web-admin/src/views/benefit/pubHousePartChange/index.vue`
- `zhi2-web-admin/src/views/benefit/pubParkingSpaceDetailChange/index.vue`

## Source
- Extracted from cursor session 97b1025a-9dba-4821-8e14-0be39a728d87.

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "asset_list_border",
  "source_extraction_id": "8b3bb81b3dec481da722ad672320236c",
  "version": 1,
  "memory_type": "entities"
}
-->