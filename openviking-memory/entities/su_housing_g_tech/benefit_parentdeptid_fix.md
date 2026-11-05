# 公共收益树状模式 parentDeptId 过滤无效修复
苏住房G(zhi2-web-admin) G端用户或管理员登录进入公共收益经营管理和共有资产时，树状模式下列表无数据，已修复。

## 问题根因
- 树状模式下列表请求携带 parentDeptId，而 benefit 模块的 /page 接口对该参数过滤无效
- 平铺模式会清掉 parentDeptId，因此有数据

## 修复内容
- 新增 benefitRegionTreeMixin.js：加载 /system/dept/areaCodeTree 并合并到部门树，按节点类型（市/区/街道/社区）映射为 region/subdistrict/community，请求时移除 parentDeptId 改用行政区划参数过滤
- 扩展 utils.js：增加社区节点类型 2 的编码解析（resolveNodeContext / mergeAreaCodes）
- 12 个 benefit 列表页（资产部位、经营用房、车位明细、租赁相关等）接入 mixin，引入 benefitRegionTreeMixin 并添加 @tree-read

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/mixins/benefitRegionTreeMixin.js、zhi2-web-admin/src/views/system/regionBankAuth/utils.js、zhi2-web-admin/src/views/property/complex/components/regionTree.vue、RegionTreeLayout.vue
- 来源会话ID：0896a2bb-b6bd-43c6-a442-bdd1c922b2d4

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "benefit_parentdeptid_fix",
  "source_extraction_id": "f6f0729ae96445aa9abdeb6bd96896bb",
  "version": 1,
  "memory_type": "entities"
}
-->