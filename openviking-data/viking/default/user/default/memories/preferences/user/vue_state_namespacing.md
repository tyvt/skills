- When the `user` Vuex module is not namespaced, avoid `mapState('user', ['terminalType'])` (reads undefined); use `mapState({ terminalType: state => state.user.terminalType })` instead.
- Control `loadSelectOptions` via a `shouldLoadSelectOptions` watcher that clears `projectOptions`/`agencyOptions` and keeps only a lightweight guard inside `loadSelectOptions`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "vue_state_namespacing",
  "source_extraction_id": "e200e187630443f8843d3946fdef9396",
  "version": 1,
  "memory_type": "preferences"
}
-->