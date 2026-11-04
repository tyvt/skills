# 门户 GetInfo terminalType 为 null 时推断 B 端选 developer 首页
门户企业账号登录后首页误走 admin 工作台，因 GetInfo 返回 terminalType null 且未推断端别，修复后在落库前用 inferTerminalType 按 roleKey 前缀判 B 端并写入 store，再按板块权限选 developer 皮肤。

## 问题根因
- 后端 GetInfo 可能返回 terminalType: null，resolveHomeLayoutVariant 未推断端别直接将非 B 或缺省映射 admin，导致开发企业账号（roleKey kfqy_gly）误显 admin 工作台
- 已有门户条目强调 bizSectionCodes 只管是否 B 端企业首页、不参与 broker/developer 皮肤，但不能在 terminalType 未就绪时跳过 B 端推断

## 修复方案
- terminalUser.js + store/modules/user.js：GetInfo 落库前调用 inferTerminalType(user, roles)，按 roleKey 前缀（如 kfqy_）判 B 端，写入 store 的 terminalType（示例 B）
- homeLayout.js：resolveHomeLayoutVariant 确认 B 端后，结合 listPerms / 板块权限（如仅 portal:bizSection:commodityHouseTrade）落到 developer 而非 admin
- portalLayout.js、homeDataMixin.js 同步涉及

## 验证与归属
- 验收：构造 terminalType=null + kfqy_gly + 商品房板块权限，刷新首页应出现 developer 布局与统计条；与「仅超管显示侧栏」「layoutVariant 调试 return」类问题分开排查
- 验证证据：会话 a3593973，dev 企业登录 terminalType null、listPerms 含 portal:bizSection:commodityHouseTrade、roleKey kfqy_gly 应显示 developer 非 admin；结论 GetInfo 用 inferTerminalType、kfqy_gly 匹配 B 端前缀、resolveHomeLayoutVariant 仅商品房板块 → developer，CRITICAL 0 PASS
- 涉及文件：zhi2-web-admin/src/utils/terminalUser.js、zhi2-web-admin/src/views/home/config/homeLayout.js、zhi2-web-admin/src/store/modules/user.js、zhi2-web-admin/src/utils/portalLayout.js、zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- 所属项目：门户；来源会话：a3593973-ff8d-4958-89a1-8e4f3753ae90；代码基线：ac6513b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_terminaltype_null",
  "source_extraction_id": "c5ddad6824164d7095ceeab2e97eb65d",
  "version": 1,
  "memory_type": "entities"
}
-->