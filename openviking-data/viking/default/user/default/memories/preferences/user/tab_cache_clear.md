- In useBoundProjects.js, when the bound community list API returns empty, call userStore.clearProjectInfo() to clear the cached community info and keep projectList as a module-level singleton.
- In tabBar.js, add onTabPageShow() that on each of the five tab pages' onShow uniformly requests the bound community list and clears the empty cache.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "tab_cache_clear",
  "source_extraction_id": "3cc773466ea64436bc5bf0e2a554a53c",
  "version": 1,
  "memory_type": "preferences"
}
-->