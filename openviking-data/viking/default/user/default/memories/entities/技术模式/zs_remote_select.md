# zs-remote-select 远程选择组件
苏住房G 项目新增 zs-remote-select 组件，支持远程搜索与下拉触底加载。

## 功能特性
- 远程搜索 + 下拉触底加载下一页（pageSize=20、total/末页判定）
- 请求序号丢弃 stale 响应、滚动监听随开合绑定/解绑
- 已选值兜底、15s 短超时 + 非阻断轻提示

## 改动背景
- 修复流程配置保存超时：原 detail.vue 调用不传 pageNum/pageSize 导致全量查询超百秒
- 配套修改 `Process/common/XForm.vue` 等 14 个文件

## 项目归属
- 所属项目：苏住房G（zhi2-web-admin）
- 涉及文件：`src/components/zs-remote-select/index.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_remote_select",
  "source_extraction_id": "e91c8e43776c4b0f8697c0204225dc28",
  "version": 1,
  "memory_type": "entities"
}
-->