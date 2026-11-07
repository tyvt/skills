# service-expand 后端服务
苏住房防汛C端后端服务之一，承载 Flood 巡检接口。

## 服务信息
- 端口 9610，承载 60 个 Flood 接口 / 7 个 Controller
- 原 profile 为 test（nacos.test.zhi.com），与 zhi2-property(dev/nacos.dev.zhi.com) 不在同一 Nacos，Feign 互不可见
- 2026-11-03 用户决定其与 common-framework 改 dev

## 构建与部署
- 后端分支 `develop/v2.6.2-suzhufang-dev`，单 worktree，3 个子模块有改动：common-flowable、service-expand、zhi2-property
- jar 内嵌 bootstrap 为 test（旧构建态），须将 src/main/resources/bootstrap.yml 改 dev 后仅重建 service-expand 并重打包、重启 9610
- common-framework(9211) 无 jar 内 bootstrap，读外部配置，target/classes 已 dev

## 接口问题
- plan/complexPage 经 Feign 调 zhi2-property 的 notScopePage，环境统一后仍报 404；dev 3 实例直连均 200 含数据，Feign 404 根因截至2026-11-03未定位

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛_service_expand",
  "source_extraction_id": "3d8d79b6eedc4f5aa4dc66cad5b27a65",
  "version": 1,
  "memory_type": "entities"
}
-->