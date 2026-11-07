# 禅道Bug 6023 楼幢同步失败
房产管理系统zhi2-web-admin中楼幢详情页同步按钮报错"未查询到有效楼幢信息"的缺陷任务。

## 根因
- 原接口GET /building/syncCoManagement/syncHouseAndObligee依赖T_BUILDING_V.EXTERNAL_ID等不唯一字段匹配
- dev库实测T_BUILDING_V.EXTERNAL_ID全25条为NULL，提取表BUILDING_CODE与主表31条中23条不一致

## 修复方案
- 后端sjw于2026-11-02 17:28备注更换接口为/building/building/extractBuildingBySurveying，入参buildingId、projectId
- 前端detail.vue已改接口并加syncLoading，提交c245b393a推送develop/v3.0.0

## 验证与交付
- 项目zhi2-web-admin（父仓库+子模块）；关联worktree szfc-v3-wt-prefund-new（预售资金，未改动）
- ESLint 2 error/14 warning（第36–37行缩进为存量），npm run build exit 0
- 产物detail-F3uAnebS.js含新接口，旧接口syncHouseAndObligee全量0残留
- 2026-11-03二次构建：产物buildinginfo-CEgTPcFp.js（截图页projectManagement/buildinginfo/detail.vue）含新接口，旧extractBuilding全量产物0处残留
- 子模块c245b393a→父仓库4bc3b78均推develop/v3.0.0；nginx 8098部署HTTP 200
- 未验证：网关401未真实联调；截图楼幢B3205060000000016不在dev库（客户测试环境）
- 2026-11-02 18:06事务化回写禅道：status=resolved,resolution=fixed,resolvedBuild=trunk,resolvedBy=tiany,assignedTo=zhunan；action id 85534（extra=fixed,read=0），备注含根因/修复/验证/提交号/未验证项

## 页面核对与结论
- 截图对应projectManagement/buildinginfo/detail.vue（菜单「楼幢维护」「项目备案申请」，页签「楼幢维护」「测绘成果变更」「户室查询」，同步按钮「同步」icon=el-icon-refresh）
- building/building/detail.vue同为楼幢详情页，按钮「同步房屋信息」，与截图页projectManagement/buildinginfo/detail.vue均有同步按钮，均应指向新接口
- 旧接口extractBuilding位于buildinginfo/detail.vue第750行，由api/lpgl/buildinginfo.js历史定义非手写
- 2026-11-03更正：上一轮对building/building/detail.vue的改动同样正确（该页同为楼幢详情页、有同步按钮），两页均已指向新接口；此前「误改」判定系误判

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6023",
  "source_extraction_id": "d77c04df49d84bfbbc511a543a86e139",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 5,
  "memory_type": "entities"
}
-->