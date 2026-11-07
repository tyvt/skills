# 预售详情附件busCode不可靠修复
预售许可详情页因 busCode 获取不可靠导致附件面板缺失，已通过路由链解析与显式传参修复。

## 问题根因
- detail 监听在 busCode 未就绪时调 getList()，受理等详情子路由 meta.busCode 常空
- 仅 AnnexUpload 自取路由码不足，致附件面板挂载失败

## 解决方案
- permitConstants.js 新增 resolvePermitAppendixBusCode 按路由链、同级列表、企业申请菜单顺序解析
- detail.vue 显式传 appendixBusCode 给 PermitAppendixPanel
- 面板需 busId 与 bus 齐备才挂载并校验 busCode 非空

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/034.md
- 涉及文件：presale/permit/components/detail.vue、PermitPlanPanel.vue、PermitAppendixPanel.vue、utils/ruoyi.js、permit/accept/detail.vue、permit/plan/detail.vue、store/modules/permission.js、e2e/fixtures/presale-permit-menu-config.js
- 所属项目：苏州市房地产监测V3；来源会话：e5947e2b-177c-437d-beee-e32448d7d98d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_appendix_buscode",
  "source_extraction_id": "5bcae300dd0246af886a92e41c877c5b",
  "version": 1,
  "memory_type": "entities"
}
-->