
# Optional Router Path for Select Dialog Auxiliary Links
The park-benefit (园区公共收益) benefit module select dialogs use getRouterPathByFilePathOptional to silently skip auxiliary links when the user lacks menu permission, avoiding repeated authorization errors.

## Symptom
- Select-dialog options show auxiliary links such as "前往开户" (open account) / "签署协议" (sign agreement) resolved via getRouterPathByFilePath; with no menu permission each call pops "没有授权相关菜单" (no authorized menu).
- B-terminal showPropertyProjectDialog calls getRouterPathByFilePath to parse no-permission menu routes and the thrown error blocks the whole area-selection dialog.
- Multiple links pop duplicate identical errors while the area selection itself should stay usable.

## Root Cause
- getRouterPathByFilePath raises an error directly when the menu is missing, not distinguishing "silent skip when no permission" from "area selection still usable".

## Fix
- Added getRouterPathByFilePathOptional in ruoyi.js that returns null instead of throwing.
- pubUseMoneyApply/detail.vue adds extraLinks only when the resolved route exists.
- Auxiliary links should all go through getRouterPathByFilePathOptional; render link when permitted, silently skip otherwise. assetLeaseApply and pubBankReceiptApply need the same batch check.

## Verification and Attribution
- Verified: without 监管账户开户/监管协议签署 menu, getRouterPathByFilePath popped two identical auth errors; after switching to Optional the dialog selects area normally.
- Files: ruoyi.js, assetLeaseApply/detail.vue, pubUseMoneyApply/detail.vue, pubUseMoneyApply2/detail.vue, pubBankReceiptApply/detail.vue, zs-select-dialog-func.vue, regulatoryAccountPanel.vue.
- Project: 园区公共收益; source sessions: 82837732-6269-4a38-bb56-614e39f5bbeb, 5922f357-1df8-46c0-8045-f0e84afd364d; code baseline: 36a9a7e.


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "optional_router_path",
  "source_extraction_id": "5ce0a0c981c640988963387d2655a557",
  "version": 2,
  "memory_type": "entities"
}
-->