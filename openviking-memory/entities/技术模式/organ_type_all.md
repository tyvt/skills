# organ_type_all 全量回显字典
为解决已停用字典项导致历史数据回显空白，后端新增全量字典 organ_type_all 专供回显，新增/编辑仍用原 organ_type。

## 问题背景
- 字典项被停用后，列表/详情历史数据状态列显示空白或原始码值，因前端只拿到启用项
- 根因是字典存在但业务停用部分项，不同于 #796（编码静默降级）和 #1061（未配置显原始值）

## 解决方案
- 后端新建纯回显全量字典 organ_type_all，内容与原字典同步但不剔除停用项
- 回显链路（列表 type="dict"/dict-url、详情 DetailTemplate type:'dict' options、dictLabel 转换）统一切到全量字典编码
- 新增/编辑表单下拉数据源保持原 organ_type 编码，不改
- 全局修复用 grep 找 organ_type 硬编码，逐处判定回显或候选，不整仓替换
- 前端靠显式 dict-url 区分两条链路，不用 formMode 分流

## 验证与归属
- 会话 455456f0（基线 b0f2039）用户诉求：新增 organ_type_all，回显用新字典，新增编辑用原字典
- 结论 19 处改动并剔除 3 处不在全量路由 JSON 与 constantRoutes 的条目
- 涉及文件：zhi2-web-admin/src/utils/dict.js、system/user/detail.vue、companyRegister 下 detail.vue/dialog.vue/index.vue
- 所属项目：苏住房G；来源会话ID：455456f0-90b2-47a3-b49f-b114ac5d4dbb；代码基线：b0f2039

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "organ_type_all",
  "source_extraction_id": "5eb3d574981745b1b7d0d7203f70f57b",
  "version": 1,
  "memory_type": "entities"
}
-->