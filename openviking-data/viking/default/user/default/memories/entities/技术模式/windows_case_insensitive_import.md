# Windows 大小写不敏感掩盖 import 路径大小写错误
本地 Windows 构建通过、提交后 Linux CI 构建因 import 路径大小写与实际文件名不一致而必挂，此类问题本地任何检查都发现不了。

## 问题现象
- 本地 Windows 构建通过，GitLab Runner（Linux）构建报 Rollup "Could not resolve ./components/unitTable.vue"

## 根因分析
- Windows 文件系统不区分大小写，import 写 `./components/unitTable.vue` 而实际文件名是 `UnitTable.vue` 也能解析
- Linux 区分大小写，Rollup 精确匹配文件名直接解析失败

## 解决方案
- import 路径必须与磁盘上真实文件名逐字符一致（含扩展名大小写）
- 团队约定：新建组件文件统一 PascalCase 命名（UnitTable.vue），import 时也写 PascalCase
- Windows 开发后可用 `git config core.ignorecase false` + `git ls-files | sort` 或脚本比对 import 路径与 git 索引实际大小写全仓扫描再提交
- 遇「本地构建过、CI 挂在 resolve import」报错，第一嫌疑就是大小写不一致

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 77670b3d CI 报 Could not resolve "./components/unitTable.vue"，本地能构建；根因 Windows 大小写不敏感，修复为与实际文件名 UnitTable.vue 一致后本地 build exit 0
- 涉及文件：zhi2-web-admin/src/views/projectManagement/buildinginfo/detail.vue
- 所属项目：产品2.0；来源会话：77670b3d-757c-4c9b-81a1-088b6d675376；代码基线：50767de~54577f2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "windows_case_insensitive_import",
  "source_extraction_id": "5bc1c57573344e21b65d5779775495df",
  "version": 1,
  "memory_type": "entities"
}
-->