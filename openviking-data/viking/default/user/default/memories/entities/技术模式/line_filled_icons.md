# 线/面双态菜单图标替换方案
顶栏与首页热门应用菜单图标换为 line/filled 两套 SVG sprite 资源，未选中线性、选中面性。

## 背景与原因
- 原 <img> 逐个引入 18 组×2 套=36 请求且无法 CSS 切换选中态。
- SVG sprite 单文件全图标，<use> 按 id 引用，CSS 控制显隐尺寸。
- 线性/面性是两套不同路径，必须分别入库。

## 解决方案
- 资源入库 public/assets/images/menu-icons/ 分 line/ 与 filled/ 目录。
- 脚本 scripts/generate-navbar-menu-icons.mjs 生成 navbarMenuIcons.generated.html 由 Navbar.vue 注入，改图标集后重跑脚本不手改。
- 标题→图标映射放 src/utils/menuPlatformIcons.js，未配置有效 meta.icon 时按菜单标题回退匹配。
- 顶栏未选中取 line/、选中取 filled/；首页热门应用优先后台 meta.picture，无图时回退本地 menu-icons/filled。
- 匹配不上时改映射表关键词，不改图标文件名硬凑。

## 验证与归属
- 验证：会话 session-1b69e852（基线 a86bf95）用户诉求按下载目录换菜单图标。
- 完成 18 组 line/filled 图标替换，注入 SVG sprite，映射表维护。
- 涉及文件：Navbar.vue、navbarMenuIcons.generated.html、menuPlatformIcons.js、home/index.vue、generate 脚本、menu-icons 目录；来源会话：session-1b69e852-fa02-43ca-8384-0d3cec1fde78。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "line_filled_icons",
  "source_extraction_id": "fec19138b36e482986eec549c6e4ea48",
  "version": 1,
  "memory_type": "entities"
}
-->