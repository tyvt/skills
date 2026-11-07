# G端树状/平铺双模式列表与区划树mixin
苏住房G 公共收益与共有资产 12 个 benefit 列表页在树状模式下因 parentDeptId 对业务接口无效而空白，需抽 mixin 改用区划参数过滤。

## 问题根因
- 树状模式沿用部门树交互，节点点击后把 nodeId 作为 parentDeptId 传给业务 /page 接口，但 benefit 系列接口对该参数过滤无效
- 平铺模式清掉 parentDeptId 故有数据；根因是部门树 ID 非业务表分区维度，不同于 key 类型/懒加载/参数名大小写问题

## 解决方案
- 抽 benefitRegionTreeMixin：加载 /system/dept/areaCodeTree 合并部门树，按节点层级（市/区/街道/社区）映射 region/subdistrict/community 三参数，请求前显式 delete parentDeptId
- 页面侧机械替换：引入 mixin、模板加 @tree-ready 事件、原 getQueryParams 改名为 getPageQueryParams 交 mixin 合并、删掉本地 nodeClick
- 扩展 system/regionBankAuth/utils.js 支持社区节点类型 2

## 防御性修复
- regionTree 接口失败时也要 emit('tree-ready')，否则列表永不加载
- RegionTreeLayout 在树为空时清空 parentDeptId 并主动 getList

## 通用原则与归属
- 同源复制骨架页面（nodeClick/getQueryParams 各有一份副本）问题应一次性抽 mixin 批量接入，不逐页打补丁以免漏改复发
- 重命名钩子而非覆盖 getQueryParams，保留各页独有搜索字段与树节点参数共存
- 验收按模式看 Network 参数（树状下应出现 region/subdistrict/community 不再有 parentDeptId），非只看页面有无数据
- 涉及文件：benefitRegionTreeMixin.js、system/regionBankAuth/utils.js、regionTree.vue、RegionTreeLayout.vue；所属项目苏住房G；来源会话 0896a2bb；代码基线 a700def

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_tree_mixin",
  "source_extraction_id": "6e32ae4fe2bb45ddb2751974b1edf7b2",
  "version": 1,
  "memory_type": "entities"
}
-->