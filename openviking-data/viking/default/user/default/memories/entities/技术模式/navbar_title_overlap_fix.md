# 导航栏标题与菜单重叠修复
产品2.0 项目修复导航栏标题与顶部菜单重叠问题。

## 问题根因
- `Navbar.vue` 使用了 `--sidebar-expanded-width` 变量，但该变量只写在未加载的 `variables.scss` 中
- 实际生效的 `variables.css` 未定义该变量，导致标题区宽度和菜单左内边距失效，长标题与顶部第一个菜单重叠

## 主要改动
- 在 `variables.css` 中补充 `--sidebar-expanded-width: 288px`，并将 `--sidebar-width` 统一为 `288px`
- 在 `Navbar.vue` 中为相关样式增加 `288px` 的 fallback

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 刷新页面后标题在 288px 内省略显示，顶部菜单从标题右侧开始排列
- 涉及文件：`Navbar.vue`、`variables.scss`、`variables.css`
- 所属项目：产品2.0；来源会话：3c5a02bd-dab4-4af1-8656-5c6fc9ed5b9d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_title_overlap_fix",
  "source_extraction_id": "fa995b7b3e044e24b63c316e5a13d398",
  "version": 1,
  "memory_type": "entities"
}
-->