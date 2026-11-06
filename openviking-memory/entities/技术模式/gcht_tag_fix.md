# 工程合同备案详情是否分包合同标签修复
苏州市房地产监测V3 中修复工程合同备案详情页「是否分包合同」在查看模式显示原始值 0 的问题。

## 问题根因
- DetailTemplate 的 type: 'tag' 依赖 dict-tag，需传入 options 才能按字典转译
- 页面已 getDicts('sys_yes_no') 得到 wherherOptions，但 contentInfo 里未挂上该选项

## 解决方案
- 在「是否分包合同」项增加 options: this.wherherOptions
- 刷新后该字段显示为「是/否」（以 sys_yes_no 配置为准），不再显示原始 0/1

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/supervision/progress/gcht/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：d49568e5-a843-4c12-a1f4-5c724b9f21e1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gcht_tag_fix",
  "source_extraction_id": "425f461fe83a492381b48de12e92b436",
  "version": 1,
  "memory_type": "entities"
}
-->