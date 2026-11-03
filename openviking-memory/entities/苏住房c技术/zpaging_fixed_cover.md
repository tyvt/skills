# z-paging默认fixed全屏铺开致导航栏遮挡与sticky失效
苏住房C的uni-app列表页因z-paging默认fixed:true全屏固定定位，导致列表遮挡自定义导航栏且筛选栏sticky不吸顶。

## 问题现象
- pages_transaction/newHouse、stockHouse等列表页出现列表盖住顶部「新房」标题栏
- 筛选栏position:sticky完全不吸顶，因列表在独立滚动容器滚动，不在同一滚动上下文

## 根因
- z-paging的fixed默认true，组件按top:0+height:100%全屏固定定位，从页面0点铺开压住导航栏
- 列表自身内部滚动，筛选栏相对页面视口永远不会触发sticky

## 解决方案
- 对齐已正常的二手房页stockHouse/index.vue：给z-paging显式:fixed="false"
- 页面根容器改flex纵向布局+height:100vh；列表区flex:1且带min-height:0仅内部滚动
- 结构变为「搜索框→快捷入口→筛选栏（固定顶部）→列表独立滚动」
- 同类子页（最新楼盘/在售楼盘）共用模板需同步改，避免一半吸顶一半不吸顶

## 验证与归属
- 来源会话3346e472（2026-07-02，基线653505a）确认修复方案
- 涉及文件：pages_transaction/newHouse/index.vue、stockHouse/index.vue、pages/commonNew/conditionScreening.vue
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zpaging_fixed_cover",
  "source_extraction_id": "39b4e56e7fd44001bc1b6da652c64178",
  "version": 1,
  "memory_type": "entities"
}
-->