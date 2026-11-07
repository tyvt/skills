# service-expand 防汛接口服务
苏住房防汛 C 端（防汛巡检）的后端微服务，承载 Flood 全部接口，依赖 zhi2-property 的 Feign 接口。

## Description
- 服务名 service-expand，端口 9610，属苏住房物业系统多模块后端项目
- 承载 Flood 全部 60 个 HTTP 接口，覆盖 7 个 Controller
- 联调确认含真实数据：事件 2 条、检查单 9 条、抢险 3 条、隐患 30 条（2026-11-03）

## Profile 与环境
- 原 profile 为 test，注册到 nacos.test.zhi.com，与 zhi2-property（dev / nacos.dev.zhi.com）不在同一 Nacos，Feign 互不可见
- 2026-11-03 用户决定改 dev；助理已改 src bootstrap.yml 为 dev，停旧 PID14220，重建中，目标注册本机 192.168.1.129
- jar 内嵌 bootstrap 为 test（旧构建态），须将 src/main/resources/bootstrap.yml 改 dev 后仅重建 service-expand 并重打包、重启 9610；common-framework(9211) 无 jar 内 bootstrap，读外部配置，target/classes 已 dev

## 关键接口问题
- plan/complexPage 经 Feign 调用 zhi2-property 的 remoteComplexService.notScopePage()，环境统一后仍报 404
- dev 环境 3 个 zhi2-property 实例（192.168.1.129 / 172.10.1.1 / 192.168.1.116）直连均返回 200 且含数据
- Feign 404 根因截至 2026-11-03 会话结束仍未定位，疑与请求头或实例路由有关

## 关键接口
- 防汛接口统一前缀 /v2.0/safety/flood/
- inspection：GET /page、GET /{inspectionId}、GET /template?eventId=&inspectionStage=、POST /save(flood:inspection:add)、POST /submit
- rescue：GET /page、GET /{rescueId}、POST /save(flood:rescue:add)、POST /submit
- common：complex/region/subdistrict/community 选项接口
- 巡检保存须 eventId(预警ID,必填)与 subject；前端 demo 表单字段与后端 DTO（patrolPersonNum/checkDate/items[]）差异较大

## Relations
- 依赖 zhi2-property（9604）的 Feign 接口 zhi2-property-api（ComplexApiImpl 实现 notScopePage）
- 与 common-framework（9211）同为防汛 C 端后端依赖

<!-- MEMORY_FIELDS
{
  "category": "服务",
  "name": "service_expand",
  "source_extraction_id": "91232a73d3b84a5d8ed339289d974362",
  "version": 4,
  "memory_type": "entities"
}
-->