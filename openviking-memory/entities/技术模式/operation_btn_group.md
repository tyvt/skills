# 操作按钮组统一 emitStateChange 刷新
苏州市房地产监测V3的 OperationBtnGroup 组件新增 emitStateChange，统一提交/审核后的刷新事件，避免逐页重复绑定。

## 问题根因
- OperationBtnGroup 组件成功回调未统一 emit 刷新更新事件
- 页面刷新逻辑分散，需逐页绑定 getDetail

## 修复方案
- OperationBtnGroup/index.vue 新增 emitStateChange() 于提交/审核后触发 refresh+update
- jgxm/detail.vue 等 33 页自动刷新
- 清理 99 个 operation-btn-group 重复绑定避免 getDetail 重复调用

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/056.md
- 涉及文件：supervision/agreement/jgxm/detail.vue、components/OperationBtnGroup/index.vue、mixins/detailMixins.js、components/ZsSubmit/index.vue、scripts/scan-missing-update.py、supervision/agreement/account/detail.vue、supervision/unblock/usemoney/detail.vue、benefit/alert/detail.vue
- 来源会话：30be24cb-105f-4bdc-aa08-3b0e6ab11f36

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_btn_group",
  "source_extraction_id": "44b97381139d40c9b4eb87bf138f6ca4",
  "version": 1,
  "memory_type": "entities"
}
-->