# 侧边栏收起导致系统标题裁切修复
产品2.0 的 develop/v2.6.2 分支点击侧栏收起按钮时系统标题与顶部菜单被裁切消失，根因为标题区误用随收起变化的 `--sidebar-width` 变量。

## 分支排查
- develop/v2.6.1 无问题：`.navbar-left` 与 `.top-nav-container` 使用固定 276px，收起不影响标题
- develop/v2.6.2 有问题：commit 790f35205（bug1594）改为 `var(--sidebar-width)`，收起时变量变 0px 导致标题被裁切
- 结论：问题仅 2.6.2 引入，2.6.1 无需修复也无需合并

## 修复方案
- `variables.scss` 新增常量 `--sidebar-expanded-width: 288px`，不随收起状态变化
- `Navbar.vue` 标题区与顶部菜单改用 `--sidebar-expanded-width`，侧栏仍用 `--sidebar-width` 控制收起
- 修复后侧栏正常收起/展开，系统标题与顶部菜单保持原位不再消失或左移；修改尚未提交

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue、Sidebar/index.vue、layout/index.vue、TagsView/index.vue、variables.scss
- 来源会话ID：d115a3e1-0619-44d4-8a93-3c964fe93a54

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sidebar_title_decouple",
  "source_extraction_id": "607720159db4425097b0ade4f7035cb6",
  "version": 1,
  "memory_type": "entities"
}
-->