- In z-paging lists, bind `v-model="list"` so the list renders; without it the list stays empty and does not render.
- Use `view` tags uniformly instead of mixing `div`/`view`.
- Replace hardcoded colors (e.g. `#007A39`) with theme variables `var(--primary-color)` and `rgba(var(--primary-color-rgb),0.1)` for Tab active state and summary background.
- Reference fix session: 518350aa-c9b8-4693-b776-97fb2bd8ddb3

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "z_paging_binding",
  "source_extraction_id": "1c38a5170e754f5592e379099b15620b",
  "version": 1,
  "memory_type": "preferences"
}
-->