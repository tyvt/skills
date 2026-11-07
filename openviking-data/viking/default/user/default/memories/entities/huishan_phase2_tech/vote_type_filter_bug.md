# 表决类型过滤仅排除选举并放开维修资金
惠山二期H5业主决策表决类型过滤原错误排除维修资金，修正为仅排除选举类型。

## 问题根因
- app.js 的 isSuZhuFang 恒为true，原苏住房分支排除类型0（维修资金使用）
- 导致维修资金使用表决无法显示，调整非苏住房分支不会生效

## 解决方案
- 统一仅排除类型2（选举独立入口），放开含0在内的其余类型
- 字典加载失败时回退到0、1、3、4

## 验证与归属
- 验证：extracted source=workbuddy session=ecf5b419-1deb-41ae-99d8-e72824553d97
- 涉及文件：src/store/app.js、src/store/vote.js、decision/detail.vue、src/pages_owner/decision/index.vue、src/pages_owner/elect/index.vue、src/pages-suggest/list.vue 等；移除未使用的 appStore import，eslint 校验通过
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：ecf5b419-1deb-41ae-99d8-e72824553d97；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "vote_type_filter_bug",
  "source_extraction_id": "0a2d84477c6e4d33ab1ebb4f3244c34d",
  "version": 2,
  "memory_type": "entities"
}
-->