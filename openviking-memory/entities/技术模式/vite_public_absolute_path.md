# 产品2.0 Vite public 目录资源绝对路径约定
Vite 构建中 public 目录资源必须用以 / 开头的绝对路径引用，带 public/ 前缀会导致模块解析构建失败。

## 问题根因
- zhi2-web-admin 中 UnifiedLogin.vue 图片写成 public/assets/images/... 致 Vite 构建报错。
- public 目录是「原样拷贝、按根路径服务」的特殊目录，引用须用 / 开头绝对路径（如 /assets/...）。
- 带 public/ 前缀的路径被 Rollup 当成模块导入解析文件系统路径，构建直接失败（dev 下也解析不到）。

## 解决方案
- 把模板/CSS 里所有 public/ 前缀替换为根绝对路径（该文件一次性替换 13 处）。
- 与项目内其他页面（如 StatisticsDialog.vue）及同文件 CSS 引用 banner_1.png 既有写法保持一致。
- 排查构建失败若报错指向 public/ 路径 import 解析，先查这类路径写法再怀疑依赖。

## 验证与归属
- 验证证据：会话 e9d3b12e 确认 UnifiedLogin.vue 13 处 public/assets/ 全部替换为 /assets/ 后构建成功（exit 0，约 3 分 20 秒）。
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue。
- 所属项目：产品2.0；来源会话ID：e9d3b12e-b9f2-4d0b-97e0-bd14f38d344c；代码基线：62d5fb9（2026-09-02）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_public_absolute_path",
  "source_extraction_id": "d5c590fa365f4509a81c129f2975f534",
  "version": 1,
  "memory_type": "entities"
}
-->