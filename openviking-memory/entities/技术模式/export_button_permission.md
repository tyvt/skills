# 开户申请导出按钮权限控制
淮安物管开户申请列表页无导出权限时仍显示导出按钮，已通过增加 permission 属性隐藏按钮修复。

## 问题根因
- 开户申请列表页导出按钮未配置 permission 字段，zs-button 仅在有时才通过 checkPermission 控制显示，缺失时按钮常显，点击后接口返回无权限提示。

## 解决方案
- 在 pubRegulatoryAccount/index.vue 导出按钮增加 permission: [this.perms.export]，对应标识 benefit:pubRegulatoryAccount:export。
- 与项目其他列表页（如项目管理）权限控制方式一致。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 无导出权限用户不再看到该按钮。
- 涉及文件：pubRegulatoryAccount/index.vue、mixins/listMixins.js（路径 d:\repository\淮安物管\zhi2-web-admin\src\...）。
- 所属项目：淮安物管；来源会话：1e81a46d-d7d6-4b7a-9e41-93e0635341db；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "export_button_permission",
  "source_extraction_id": "786ff81f84094d8eb6aa5023f40dbe21",
  "version": 1,
  "memory_type": "entities"
}
-->