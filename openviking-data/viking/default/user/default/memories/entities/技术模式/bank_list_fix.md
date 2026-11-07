# 银行管理列表页样式修复
根据三张截图标注完成修复，涉及全局样式与三个银行管理列表页。

## 修复内容
- 管理银行、银行网点：在 index.scss 为固定操作列用 ::after 伪元素补 1px 底边，强制末行固定列保留 border-bottom
- 联行号列表（unionBank/index.vue）：设置 selectable:false 去掉多选列，operationButtons 仅保留「新增」移除顶部批量删除，行内删除保留
- 联行号列表 index.scss：list-card 左内边距由 8px 改 0 消除左侧多余竖条留白
- 银行网点列表（sysBankBranch/index.vue）：移除 stripe 取消斑马线，「银行代码」改普通文本去掉蓝色链接（网点名称仍可点击）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：index.scss、unionBank/index.vue、sysBankBranch/index.vue
- 来源会话：e57a5985-4ed9-4121-a10c-c0665c930b19；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_list_fix",
  "source_extraction_id": "1361bd3813744042a98313dc80ef9a52",
  "version": 1,
  "memory_type": "entities"
}
-->