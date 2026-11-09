# 现售/预售转现售保存后停留编辑态缺陷修复
苏州市房地产监测V3（zhi2-web-admin）中 CashsaleDetail.vue 新增保存成功后页面停留在编辑态，导致按钮仍显示「保存」而非「编辑」。

## 根因
- CashsaleDetail.vue 覆写的 addCallback 在首次保存成功后手工 $router.push 到 formMode=edit，页面停留在编辑态
- OperationBtnGroup 在非 view 态显示「保存」、view 态显示「编辑」，保存后按钮仍是「保存」
- 框架默认（detailMixins.js:134）、同模块 permitExtend/detail.vue 及本页 editCallback 均为 changeFormState('view', id)，唯独新增态不一致

## 修复方案
- addCallback 改为 this.changeFormState('view', newId)，删除手工拼路径
- 影响现售备案申请与预售转现售申请两个共用页面
- 新增 docs/frontend/common-errors.md E-043 台账条目（含此前误按 #6298 修复导致被激活的说明）

## 验证与归属
- 验证：eslint 0 error；npm run build 两次成功；nginx 8098 部署 / 返回 200；构建 gitHash 22fa66c69，产物 CashsaleDetail-BdME1ZZ8.js 含 changeFormState("view",e)
- 涉及文件：CashsaleDetail.vue、docs/frontend/common-errors.md
- 提交：子模块 zhi2-web-admin f4add75b5→22fa66c69（分支 fix/bug-6275-cashsale-save-view）；父仓库 3f8e0cb（develop/v3.0.0）
- 禅道 #6275：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=lichandan、zt_action id 89254（中文 UTF-8 校验正常）

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "cashsale_save_fix",
  "source_extraction_id": "ac22f454ec3b4a418a81d0c5bfd5b004",
  "version": 1,
  "memory_type": "entities"
}
-->