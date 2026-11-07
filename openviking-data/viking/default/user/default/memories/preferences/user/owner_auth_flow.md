- Owner authentication (`property.js` `verifyAndSubmitOwnerByToken`) is split into pre-verify and submit steps with full-process loading handled by the wrapper.
- On pre-verify failure, silently retry once then show prompt; errors are parsed via `resolveOwnerAuthErrorMessage`.
- Pages like `addHouse.vue` must remove duplicate loading/toast and rely on the encapsulated function uniformly.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "owner_auth_flow",
  "source_extraction_id": "4656c42590084da4bf12a8a609364eb0",
  "version": 1,
  "memory_type": "preferences"
}
-->