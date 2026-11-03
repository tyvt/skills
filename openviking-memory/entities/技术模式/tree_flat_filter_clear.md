# 树状平铺双模式切换需清理专属筛选字段
楼盘/项目列表页树状与平铺模式共用queryParams时，切换模式须清理对方专属筛选字段以防残留。

## 问题根因
- 列表页同时支持树状（左侧行政区域树）与平铺，共用同一套queryParams
- 平铺模式按region/subdistrict/community/address/日期筛选后切回树状，树重置但列表仍显示旧筛选
- syncListParentDeptFilter只清parentDeptId，平铺专属字段（region、subdistrict、community、address、startDate、endDate）仍留queryParams
- handleTreeReady设置新parentDeptId后getList()带旧条件查询

## 解决方案
- 切换模式同步函数按模式清理对方专属字段：切回树状时clearFlatModeQueryParams遍历平铺专属字段置undefined
- 再由树就绪回调handleTreeReady按默认节点刷新列表
- 通用套路：同一列表组件多模式复用时，queryParams必须在模式切换时做模式专属字段清理，不能只清模式主键

## 验证与归属
- 验证证据：会话47d34879根因是切换展示模式时列表筛选条件没和树同步，修复为syncListParentDeptFilter切回树状清除flatOnlyFields后由handleTreeReady刷新
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue
- 所属项目：产品2.0；来源会话ID：47d34879-47c4-4fc8-beb8-6a3e1375d999；代码基线：645607c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_flat_filter_clear",
  "source_extraction_id": "ad869c7e1cac472293a790f179a77c52",
  "version": 1,
  "memory_type": "entities"
}
-->