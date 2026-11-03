# vite_public绝对路径
产品2.0 的 Vite 项目中 public 目录资源必须用 / 绝对路径引用，写 public/ 前缀会导致构建报模块解析错误。

## 问题现象
- Vite 构建报错，UnifiedLogin.vue 里图片写成 public/assets/images/...。
- dev 下也解析不到资源。

## 根因
- Vite 中 public 目录原样拷贝按根路径服务，引用必须用以 / 开头的绝对路径。
- 带 public/ 前缀的路径被 Rollup 当成模块导入解析文件系统路径，构建失败。

## 解决方案
- 模板/CSS 里所有 public/ 前缀替换为根绝对路径（如 /assets/...）。
- 与项目内其他页面（StatisticsDialog.vue）及同文件 CSS 引用 banner_1.png 既有写法一致。
- 排查构建失败若报错指向 public/ 路径的 import 解析，先查这类路径写法。

## 验证与涉及
- 验证证据：会话 e9d3b12e 编译失败根因确认为 UnifiedLogin.vue 13 处 public/assets/ 写法，全部替换为 /assets/ 后构建成功（exit code 0，耗时约 3 分 20 秒）。
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue
- 所属项目：产品2.0
- 来源会话ID：e9d3b12e-b9f2-4d0b-97e0-bd14f38d344c
- 代码基线：62d5fb9（2026-09-02）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_public绝对路径",
  "source_extraction_id": "647993624cef4e3d9a4df769152b268d",
  "version": 1,
  "memory_type": "entities"
}
-->