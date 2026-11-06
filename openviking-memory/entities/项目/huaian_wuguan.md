# 淮安物管前端仓库
淮安物管（淮安智慧物业服务平台）前端主仓库，使用 zhi2-web-admin 作为子模块，工作分支 develop/v2.6.1-huaian。

## 仓库结构
- 主仓库 superproject 为淮安物管，子模块为 zhi2-web-admin
- 子模块改动提交后，父仓库更新 gitlink 指针并推送

## 关联信息
- 子模块提交：9c019cbf2（zhi2-web-admin 分支 develop/v2.6.1-huaian，含 pubRecBankFile 页面迁移）
- 父仓库指针：6c204f7（更新 zhi2-web-admin 子模块指针）
- 业务页面：benefit 模块 pubRecBankFile（银行对账文件，月份范围查询+行内下载，列表走 listMixins 标准 CRUD）

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "huaian_wuguan",
  "source_extraction_id": "e1315906b362439e986a3cd638797ea2",
  "version": 1,
  "memory_type": "entities"
}
-->