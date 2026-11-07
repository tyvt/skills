# 添加巡检记录页面修复
泰兴小程序员工端「添加巡检记录」页面（src/staff/pages_facility/record/add.vue）修复完成。

## 改动摘要
- 单页布局：移除 currentStep 两步流程；页面自上而下为设施设备信息 → 程序选择 → 步骤列表 → 5 个表单字段（始终可见）
- 提交逻辑：底部改为固定「提交」按钮（<PageButton text="提交" @click="onSubmitRecord" />）；提交前新增程序必选校验，未选程序时提示「请选择巡检程序」；保留原有字段校验与 API 提交逻辑
- 样式对齐设计稿：频次/日期/年检结果行 ZsPicker 加 hideArrow 并补 uni-icons type="right"；联系电话 placeholder 改为 请输入${typeLabel}人联系电话；巡检结果保留独立白卡片 + ZsTextarea maxlength=999（含 0/999 字数统计）

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/pages_facility/record/add.vue
- 所属项目：泰兴小程序；来源会话ID：57b07baa-330f-4a45-baab-c2722d1ae8db
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_page_fix",
  "source_extraction_id": "6f0c4d0ce25a43908258dc2fb65fa244",
  "version": 1,
  "memory_type": "entities"
}
-->