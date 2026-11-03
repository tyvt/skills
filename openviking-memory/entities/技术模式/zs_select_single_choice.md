# 页面级选择弹窗单选契约对齐
维保模块页面级选人弹窗 userDialog 对齐公共 zs-select-dialog 的单选交互契约，统一选择类弹窗语义。

## 现象与问题
- 维保 zsAssign 的 userDialog 原先单选靠「点姓名链接」直选、无确定按钮，与公共 zs-select-dialog 交互不一致
- 同一系统存在两套选择语义，需统一

## 解决方案
- 去掉 zs-select-column 的 v-if="!single"，单选多选都显示勾选列
- 单选复用 zs-select-dialog 的 handleSelectionChange：勾第二行清空后只保留最后一行
- zs-dialog 根节点挂 :class="{'single-choice': single}"，靠全局 element-ui scss 隐藏表头全选框并呈现单选外观（视觉单选、语义仍是 checkbox）
- 底部加取消/确定，未选提示「请至少选择一条数据」，确定触发 singleSubmit/multipleSubmit，姓名列改普通 text 不再用链接触发

## 关键约束
- 迁移页面级弹窗时按此清单对齐，不要自造第三套交互

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/maintenance/components/userDialog.vue、zsAssign.vue、zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue；所属项目：园区物管2.0；来源会话：8ea8b56f-3f64-42d9-9271-30e2972792d5；代码基线：036.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_select_single_choice",
  "source_extraction_id": "02ecf26ada894602a6a08e759af6c433",
  "version": 1,
  "memory_type": "entities"
}
-->