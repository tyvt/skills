# 基本信息变更详情硬编码致经纪机构跳转错误修复
companyChangeManage/index.vue 中基本信息变更（busCode `jbxxbg`）硬编码映射至开发企业详情，致经纪机构查看跳错。

## 问题根因
- `companyChangeManage/index.vue` 中基本信息变更（busCode `jbxxbg`）硬编码映射至开发企业详情
- 经纪机构查看时跳转错误

## 修复方案
- 新增 `BASIC_CHANGE_TARGET_BY_ORGAN_TYPE` 按 `organType` 区分跳转目标
- `navigateToChangeDetail` 优先据此解析跳转

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/281.md
- 涉及文件：companyChangeManage/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a1630d-6f7a-70c5-a400-7645f4be3469；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_nav_fix",
  "source_extraction_id": "c8b2ccc826f04b5795a9822e8b7419bd",
  "version": 1,
  "memory_type": "entities"
}
-->