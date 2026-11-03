# 导航栏组织类型展示依赖accountTypeName
zhi2-web-admin 顶栏 Navbar 在 nickName 后追加组织类型时判断解析后的 accountTypeName 而非 getInfo 里的 accountType 原值。

## 问题根因
- 常见链路用 sys_account_type_all 把编码转中文，仅当 accountTypeName 非空才渲染「姓名（组织类型）」，否则只显示 nickName
- 园区场景 accountType: "B" 等值不在字典（多为 1/2/4）内导致字典匹配失败，用户误以为接口已加字段但前端没显示

## 修复方案
- 优先级①：接口直接返回 accountTypeName
- 优先级②：依次尝试 sys_account_type_all、sys_account_type
- 优先级③：仍无匹配时用 deptName 作兜底展示
- 要显示真实组织类型语义需后端补 accountTypeName 或确认 B 对应字典类型

## 验证与归属
- 验证证据：accountType "B" 不在 sys_account_type_all，accountTypeName 为空，导航栏仅显示「卢司」；修复后预期「卢司（严严物业）」
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue、zhi2-web-admin/src/store/modules/user.js、zhi2-web-admin/src/store/getters.js、zhi2-web-admin/src/views/system/user/detail.vue
- 所属项目：园区公共收益；来源会话：51ce30f1-9974-4744-a846-7c5a5c12cf6d；代码基线：bd275b5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_account_typename",
  "source_extraction_id": "7450b259a3f74eb1a01721b1303c3886",
  "version": 1,
  "memory_type": "entities"
}
-->