# 首页板块菜单项分支padding漂移
门户首页 HomeBizSection 组件因 step-grid 分支与默认分支菜单项 padding 不一致，导致跨板块菜单高度差约8px。

## Description
- 现象：商品房与面积管理两板块菜单项高度不一致，用户报「菜单高度不一致」。
- 根因：菜单项有两套渲染分支，step-grid 分支 padding 为 12px/10px，默认分支为 18px/12px，改一处不同步另一处。
- 本批实测两板块菜单项盒高分别为 93px 与 85px，差约8px。

## Solution
- 统一各分支菜单项 padding 到同一组值，本批将 step-grid 改为 `18px 4px 12px`。
- 补 e2e 断言锁死跨板块一致性：商品房 vs 面积管理菜单项高度差 ≤1px。
- 用「带修复/不带修复(stash)两条路径结果一致」判定存量问题；存量红点为 `.home-nav-menu .home-nav-item` 断言要求 `isHomeSuperAdmin`，e2e 环境为 false，与本次改动无关。

## Verification
- 来源会话ID：session-76cd9c3e-5100-45f7-b730-fdea8d1a6d85；代码基线：65275e9。
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeBizSection.vue、zhi2-web-admin/tests/e2e/portal-home-visual.spec.ts。
- 修复位置：HomeBizSection.vue 第210行附近统一为 18px 4px 12px。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "biz_section_padding",
  "source_extraction_id": "96758bb922ef469fa059939f20317c82",
  "version": 1,
  "memory_type": "entities"
}
-->