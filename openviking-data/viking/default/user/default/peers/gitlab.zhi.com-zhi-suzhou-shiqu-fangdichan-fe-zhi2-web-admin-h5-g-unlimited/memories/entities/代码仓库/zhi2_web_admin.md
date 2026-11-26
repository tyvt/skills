# zhi2-web-admin
苏州房产门户的前端 Vue 子模块，承载市场监测等页面开发。

## 仓库关系
- 是「门户」父仓库（D:\repository\门户）的 git submodule
- 开发与提交分支为 develop/v2.6.2-portal，父仓库使用同分支
- 提交需自底向上：先提交并推送子模块，再更新父仓库 gitlink 并提交推送

## 构建
- 构建脚本 scripts/vite-build.mjs 将产物输出到父仓库根目录 D:\repository\门户\dist，而非 zhi2-web-admin/dist
- public/version.json 为自动生成的构建产物，通常不纳入提交

## 在建功能
- marketMonitor（市场监测）是 develop/v2.6.2-portal 分支上正在开发的功能集

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "代码仓库",
  "name": "zhi2_web_admin",
  "source_extraction_id": "f4780b5eeaf8412499c98ed938be38bd",
  "version": 1,
  "memory_type": "entities"
}
-->