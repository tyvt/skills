# 园区公共收益仓库仅含前端与2.0接口对照
园区公共收益仓库 d:\repository\园区公共收益 仅含 zhi2-web-admin 前端，contractGuard 等 2.0 接口需查独立 BE 或 V0 对照。

## 事实描述
- 全盘搜索无 Java/MyBatis 后端，前端调用的 /maintenance/contractGuard 属于 2.0 独立后端（GitLab BE 或网关 Swagger），经 env 中 VITE_APP_PROXY_ADDRESS 代理访问
- 代理当前指向 http://unlimited.g.h5.admin.web.v2.product.unlimited.unlimited.test.zhi.com/
- 联调 usccBName 模糊查询、已付金额/付款比例等逻辑时，旧实现可参考 d:\repository\园区V0\EstateManagement-Park\...\mtpl\ 下 MtplContractGuard* 与 Mapper.xml
- 模块与 URL 与 2.0 不是同一套，只能作字段与 SQL 思路对照，不能直接当现网契约

## 验证与归属
- 验证：会话 9a44f1a5 工作区 Java 搜索无结果，发现园区 V0 mtpl 合同守护实现与 2.0 接口分离
- 涉及文件：maintenance/contractGuard/index.vue、detail.vue
- 所属项目：园区公共收益；来源会话：9a44f1a5-9f37-49c4-994c-c50b9acce0c6；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "repo_frontend_only",
  "source_extraction_id": "1551a7b6b5db49d7baf731e97076f08f",
  "version": 2,
  "memory_type": "entities"
}
-->