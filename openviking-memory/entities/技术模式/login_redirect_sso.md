# 菜单登录后路径跳转与 SSO 绑定
门户菜单配了登录后内部路径却跳登录页，需登录成功按 redirect 回跳，客户环境还需后台绑定 SSO 应用。

## 现象
- 「开发企业管理」菜单配的是登录后内部路径，每次点都跳登录页；其它功能菜单跳转正常
- 客户环境地址 http://58.210.252.230:9001/，数据库与本地不匹配

## 根因与修复
- 代码侧：登录成功未消费 URL 上 redirect 参数；修复为按 redirect 回跳目标页（提交 139beac67 fix(login): 登录成功后支持回跳 redirect 目标页），回跳地址做站内路径白名单校验不接受外链
- 环境侧：客户环境后台未把「开发企业管理」绑定 SSO 应用，配置不落地、发版不生效

## 排查要点
- 对照正常菜单确认差别只在 redirect 是否被消费；前端改完仍复现多半是后台配置没落地
- 排查前先分清客户环境数据库与本地不匹配，不拿本地数据直接对比线上
- 提交按子模块先行、父仓更新 gitlink 指针顺序，两层都推 origin

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/login.vue；zhi2-web-admin/src/router/index.js
- 所属项目：门户；来源会话ID：session-0f337fae-83cb-4b81-8e91-267f33567c7e；代码基线：65275e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_redirect_sso",
  "source_extraction_id": "b52d446d4244401c9fcc19d40ef516e9",
  "version": 1,
  "memory_type": "entities"
}
-->