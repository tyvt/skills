- Project coordinate convention: `xcoor` stores latitude and `ycoor` stores longitude.
- Map components must bind `:lat="form.xcoor"` and `:lng="form.ycoor"`.
- Remove invalid `:xcoor`/`:ycoor` props from BaseProjectForm.vue, changeDetail.vue and other location/dialog components.
- Uniformly add `:address`, `:lat`, `:lng` pass-through params to those components.
- Applies to the Xinghua property management (兴化物管) zhi1-web-admin project.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "map_coordinate_binding",
  "source_extraction_id": "dfed095b4ba749ebb4b9c32e8aad66f8",
  "version": 1,
  "memory_type": "preferences"
}
-->