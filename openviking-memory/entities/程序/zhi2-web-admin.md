# zhi2-web-admin
门户 npm workspaces 单仓的子模块前端项目。

## Description
- 父仓为 zhi2-web-admin-h5-g-unlimited，构成 monorepo 单仓结构
- 依赖提升到仓库根目录 node_modules，子模块目录无完整 node_modules
- vite 属 devDependencies，禁用 --omit=dev/--production 安装否则缺失

## Relations
- 与父仓 zhi2-web-admin-h5-g-unlimited 为 workspaces 关系
- 构建脚本会改写 public/version.json，该文件为构建副产物需还原（见偏好）


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "zhi2-web-admin",
  "source_extraction_id": "43f2cc7dac1c4815b0f027438374ab0a",
  "version": 1,
  "memory_type": "entities"
}
-->