# 首页v2区域筛选上下文上提
苏住房G首页v2将区域筛选从各卡片内部上提为全页统一上下文，用同一parentDeptId扇出到五个区块接口，避免重复渲染与不同步。

## 背景与动机
- 首页v2原本仅「关键数据导航」「检查数据导航」两张卡片各带区域条，领导要求所有卡片统一按区域生效
- 区域条放卡片内部＝每张卡片各持一份选中态，重复渲染且易不同步；各卡片是独立请求的兄弟组件，无共享上下文

## 解法
- 区域条上提到index-v2.vue顶部home-v2__region容器，统一用portalParentDeptId作为选中值
- 切换区域时父级统一触发刷新，把同一parentDeptId传给关键数据、检查数据、公共收益、报事报修、学习园地五个区块
- 待办、消息明确不参与区域筛选，继续走原逻辑不改动
- 删除KeyDataNav.vue/CheckDataNav.vue内卡片区域条，RegionTabs作为唯一区域选择器组件复用，避免两条区域条打架

## 验证与归属
- 来源会话3716ba06（基线315702f）：用户诉求「首页所有卡片统一生效区域筛选」；最终结论顶部增home-v2__region+RegionTabs
- 涉及文件：zhi2-web-admin/src/views/home/index-v2.vue、v2/components/RegionTabs.vue、KeyDataNav.vue、CheckDataNav.vue
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_context_lift",
  "source_extraction_id": "52723b29124e479cbd6d860437d400c6",
  "version": 1,
  "memory_type": "entities"
}
-->