# 顶栏标题区误用 --sidebar-width 致收起侧栏被裁切
Web 后台侧栏收起后顶栏标题被裁切，根因是标题区宽度误用了随收起变 0 的 --sidebar-width 变量。

## 问题根因
- 2.6.2 某次 commit（790f35205，bug1594）把顶栏标题区/顶部菜单容器宽度从固定值改成 var(--sidebar-width)
- 侧栏收起时 --sidebar-width 变为 0px，导致不随侧栏收起变化的顶栏占位也被压缩为 0
- 2.6.1 分支用固定 276px 无此问题，问题只在 2.6.2 引入

## 解决方案
- 在 variables.scss 新增常量 --sidebar-expanded-width（如 288px），不随收起状态变化
- Navbar 的标题区和顶部菜单用 --sidebar-expanded-width，侧栏自身继续用 --sidebar-width 控制收起
- 通用原则：同一个 CSS 变量只表达一种布局语义，收起态变量不能被不随动收缩的区域引用

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：2.6.1 固定 276px 无问题；2.6.2 改 var(--sidebar-width) 致标题裁切；修复为新增 --sidebar-expanded-width: 288px
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue、zhi2-web-admin/src/styles/variables.scss
- 所属项目：产品2.0
- 来源会话ID：d115a3e1-0619-44d4-8a93-3c964fe93a54
- 代码基线：50767de（zhi2-web-admin，develop/v2.6.1 与 develop/v2.6.2 双分支对比）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_width_bug",
  "source_extraction_id": "e3897fa6cf07484a96b884627556c453",
  "version": 1,
  "memory_type": "entities"
}
-->