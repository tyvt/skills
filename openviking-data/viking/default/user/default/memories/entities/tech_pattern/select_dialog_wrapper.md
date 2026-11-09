# SelectDialog Functional Wrapper
Public selection dialog component at @/components/zs-select-dialog/zs-select-dialog-func.vue used to replace hand-rolled zs-dialog + zs-table + zs-pagination + keyword-search popups.

## Props
- `visible`: bind with `:visible.sync`; close via synced var or `update:visible` event.
- `url`: data page API, e.g., `/presale/versionManagement/page`.
- `rowKey`: row key field, e.g., `versionNo`.
- `method`: HTTP method, e.g., `post`.
- `singleChoice`: boolean for single vs multi selection; `title`: dialog title; `columns` slot: table columns such as index / versionNo / versionName.

## Emitted Events
- `setData`: emitted by `handlePick` (line 738: `this.$emit('setData', this.singleChoice ? this.selection[0] : this.selection)`) carrying the selected row(s).

## Behavior
- Does NOT close the dialog after emitting `setData`; the consumer must close it (parent handler sets `:visible.sync` var false, or wrapper re-emits `update:visible` false).
- Auto-injects `bizState` (e.g., `2`); no manual passing needed.
- Reference `detail.vue` uses `@setData="pickProject"` where `pickProject` sets the bound flag false to close.

## Wrapper Pattern
- Forward SelectDialog via `$attrs`/`$listeners` to keep the parent `@set` / `:visible.sync` contract unchanged.
- Re-emit `setData` as `set`; in the `setData` handler also emit `update:visible` false so the dialog closes after selection.
- Reason: the original hand-rolled dialog self-closed via `close()`, but the parent `setContractData` does not close the dialog.

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "select_dialog_wrapper",
  "source_extraction_id": "ef5736cf1d484315a431a1188e09c110",
  "version": 1,
  "memory_type": "entities"
}
-->