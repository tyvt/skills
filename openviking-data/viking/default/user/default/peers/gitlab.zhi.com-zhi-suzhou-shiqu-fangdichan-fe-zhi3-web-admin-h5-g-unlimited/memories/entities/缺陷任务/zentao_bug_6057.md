# 禅道Bug 6057 楼幢维护缺楼幢类型
价格备案页「楼幢备案均价/本次批次备案均价」显示暂无数据，根因为上游楼幢维护缺楼幢类型维护入口。

## 根因
- 李贵勇备注(85521)：价格备案均价需按楼幢类型统计，但系统「楼幢维护」去掉了「楼幢类型」属性维护，需加回
- 朱楠2026-11-03备注(85859)：「楼幢维护的楼幢类型现需要加上」
- 代码定位：projectManagement/buildinginfo/detail.vue（楼幢维护详情页，带同步/变更/流程查看按钮）form.buildingType已在data声明，但模板无编辑下拉与查看展示
- 字典错用BUILDING_TYPE(大写，仅99/2/4三项)；DB核实T_BUILDING.BUILDING_TYPE与T_SA_PRICE_BUILDING.BUILD_TYPE实际取值1/2/3/4/22，对应完整building_type字典(低层/多层/小高层/高层/多联别墅)

## 修复方案
- detail.vue编辑态新增楼幢类型下拉(prop=buildingType，复用buildTypeOptions)
- 查看态DetailTemplate新增楼幢类型tag展示
- 补充buildingType必填校验
- 字典由BUILDING_TYPE修正为building_type
- 提交223f51924，rebase到2d0c51f03后fast-forward合并develop/v3.0.0

## 验证与交付
- ESLint该文件0 error(仅存量el-form-item提示)
- vue-template-compiler：template 0 error/0 tip；script ESM parse OK
- 未验证：主工作区有他人未提交改动(343删除e2e/样式等+staged index.scss)，未能跑完整npm run build，需联调环境回归

## 禅道回写
- DBX事务回写：status=resolved, resolution=fixed, resolvedBuild=trunk, resolvedBy=tiany, assignedTo=zhunan(提交人)
- action id 85978(861字符备注，含根因/修复/验证)，product=70

## 并行任务安全
- 独立worktree zhi2-wt-bug6057(分支bug6057-building-type)开发，未触碰并行任务bug6076/bug6079 worktree与主工作区他人WIP
- 因主工作区有他人staged index.scss，改用rebase+ff-only合并，只并入detail.vue一处变更
- worktree与临时分支、临时目录已清理

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6057",
  "source_extraction_id": "b13d7e7837cc4d8789d579add4301091",
  "version": 1,
  "memory_type": "entities"
}
-->