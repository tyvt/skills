# 接口路径与权限字符分离修复
修复苏州市房地产监测V3中 permitCancel/permitExtend 权限字符与接口路径拼接不一致问题。

## 问题根因
- 接口路径 businessName='permit/cancel'/'permit/extend' → /presale/permit/cancel/...
- 权限字符需与菜单 component 一致 → permitCancel/permitExtend（如 presale:permitCancel:edit）
- 原 moduleName+businessName 拼接得 presale:permit/cancel:edit，与后端菜单权限不一致

## 修复方案
- 沿用 permsMixins，增加 businessNameForPerms 隔离：列表页配 'permitCancel'/'permitExtend'；详情页 permission-business-name="permitCancel"/"permitExtend"
- 自定义按钮 CANCEL_PERMS/EXTEND_PERMS 改为 presale:permitCancel:*/presale:permitExtend:*

## 验证与归属
- 涉及文件：permsMixins.js、ListTemplate.js、OperationBtnGroup/index.vue、permitCancel/index.vue、permitExtend/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：c63e86e5-4a61-4d1b-8029-c50c77de9272；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "perms_businessname_isolation",
  "source_extraction_id": "6f58039a3564482e961b58f9f1b314ce",
  "version": 1,
  "memory_type": "entities"
}
-->