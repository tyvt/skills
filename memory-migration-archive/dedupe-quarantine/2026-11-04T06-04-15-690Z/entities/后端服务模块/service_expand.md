# service-expand
后端服务模块，位于 expand_service 的 Flood 目录，为前端安全防汛页面提供接口。
## Description
- Java 包名为 com.zhishu.flood，隶属 expand_service 模块
- 采用目录式打包，依赖存于 target/lib，主启动包为 service-expand-server.jar（306MB fat jar）
- bootstrap.yml 位于 classes 目录下
## Structure
- 包含 7 个 Controller，覆盖 cause、common、event、inspection、plan、rescue 六个业务域
- 接口路径前缀为 /v2.0/safety/flood/*
- inspection 为前端最核心业务域，含 /page、/{id}、/template、/last、/save、/update、/delete、/submit、/approval、/summary 接口
## Configuration
- 端口 9610，应用名 service-expand；src/main/resources/bootstrap.yml 于 2026-11-03 由助理改为 active:dev（原 test），但 jar 内 BOOT-INF/classes/bootstrap.yml 仍嵌 test，需 Maven 重建打入 dev；common-framework 同理

<!-- MEMORY_FIELDS
{
  "category": "后端服务模块",
  "name": "service_expand",
  "source_extraction_id": "f885d6022a954753864f34ddda767516",
  "version": 2,
  "memory_type": "entities"
}
-->