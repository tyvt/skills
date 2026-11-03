# 菜单详情路由缺斜杠修复
企业 admin 详情路由 path 拼错缺斜杠致新增路由匹配失败，已规范 path 格式。

## 问题根因
- 路由注册将详情 path 拼为 `companyAdmin:/tableid`，冒号前缺斜杠
- 新增 `/add` 跳转匹配失败报未授权

## 解决方案
- permission.js 规范为 `/:tableid`
- ruoyi.js 按规范 path 解析校验可路由性
- E2E test:e2e:company-admin-add 通过，本地需清 sessionStorage 中 routers 或改 e2e/.env.e2e 的 E2E_BASE_URL 连 8082

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/034.md
- 涉及文件：utils/ruoyi.js、company/companyAdmin/index.vue、e2e/company/company-admin-routes-probe.spec.js、mixins/detailMixins.js、company/companyAdmin/developer/index.vue、mixins/listMixins.js、permission.js、company/companyManagement/components/AgencyEntryNetworkDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：d698b1b1-35a3-4409-8b54-ec6572857a14；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_path_slash",
  "source_extraction_id": "5bcae300dd0246af886a92e41c877c5b",
  "version": 1,
  "memory_type": "entities"
}
-->