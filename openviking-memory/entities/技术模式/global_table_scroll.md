# 全局表格滚动条常显与列宽防省略
惠山二期G 项目全局表格组件调整滚动条常显并加宽固定列防省略的前端模式。

## 修改要点
- 全局表格横向/纵向滚动条改为默认显示，无需悬停才出现
- 序号等固定宽度列按表头文案加宽，避免文字被省略
- 报事工单详情内容字段改用 textarea 支持换行展示

## 验证与归属
- 验证证据：src=惠山二期G/006.md
- 涉及文件：components/zs-table/zs-table.vue、styles/index.scss、styles/element-ui.scss、autonomy/election/supervisory/decision/index.vue、autonomy/election/supervisory/decision/detail.vue、autonomy/election/components/apply/index.vue、autonomy/election/components/vote/index.vue、mixins/ListTemplate.js
- 所属项目：惠山二期G；来源会话：01a166e6-1e6a-764e-99b7-41ec777453c4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_table_scroll",
  "source_extraction_id": "3b024a03f1f641b08ea6be6c3dd919ff",
  "version": 1,
  "memory_type": "entities"
}
-->