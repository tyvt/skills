# 分包不可跨包引用组件需复制本包
微信小程序分包不可跨包引用组件，pages_vote 不能直接 import pages_main 下 FileList。

## 问题根因
- 微信小程序分包不可跨包引用组件
- pages_vote 不能直接 import pages_main 下 FileList

## 解决方案
- 复制 FileList 至 pages_vote/components/FileList/
- 修改 detail.vue 引用路径为 @/pages_vote/components/FileList/FileList.vue
- 按项目惯例与 pages_owner/components/FileList 相同方式处理
- 重新编译后材料区域正常渲染，空列表显示默认空态图

## 验证与归属
- 验证证据：extracted source=cursor session=8542b614-0e61-4726-828c-c9829d260de1
- 涉及文件：pages_vote/elect/detail.vue、pages_vote/decision/components/BackBtn.vue、utils/index.js、components/PageBg/PageBg.vue、pages_owner/house/index.vue、pages_vote/elect/components/DetailTopCard.vue、pages_vote/decision/detail.vue、pages_vote/elect/DecisionResult.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：8542b614-0e61-4726-828c-c9829d260de1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "subpackage_component_copy",
  "source_extraction_id": "de6419ee06b04af68200113dcef4346b",
  "version": 2,
  "memory_type": "entities"
}
-->