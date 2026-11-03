- Lift `z-paging` to page root level instead of nesting inside `content-card`; its default `position:fixed` full-screen breaks out of flow and covers title/Tab.
- Put title and summary into the `#top` slot.
- Add `page{height:100%}` and call `updateFixedLayout` in `onShow`.
- Reference fix session: 964238bf-2553-4990-9244-37619f4aadbe

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "z_paging_root",
  "source_extraction_id": "1c38a5170e754f5592e379099b15620b",
  "version": 1,
  "memory_type": "preferences"
}
-->