# Navbar 按设计稿落地 88px 与溢出滚动
苏州市房地产监测V3 依据设计稿实现 Navbar：顶栏高 88px，底色 `#005ad8`，菜单项双行布局，溢出横向滚动。

## 设计规范
- 顶栏高 88px，底色 `#005ad8` 并沿用 `navbar-bg.png`
- 菜单项采用 24px 图标 + 14px 文字双行布局

## 交互行为
- 菜单溢出时横向滚动并显示 `>` 箭头
- 激活态为白描边高亮底

## 涉及文件
- `src/layout/components/Navbar.vue`、`src/layout/index.vue`、`src/layout/components/AppMain.vue`
- `src/styles/variables.css`、`src/styles/index.scss`
- `scripts/tmp-navbar-shot.mjs`、`e2e/tmp-navbar-shot.spec.js`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/022.md
- 来源会话ID：01a170e6-55df-7048-964a-22b25f3f34c4
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "Navbar设计稿落地",
  "source_extraction_id": "ef9a64654ba84fd09a291f342583ee4a",
  "version": 1,
  "memory_type": "entities"
}
-->