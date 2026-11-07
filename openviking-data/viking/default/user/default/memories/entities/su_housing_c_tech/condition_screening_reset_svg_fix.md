
# 筛选弹窗reset.svg加载失败修复
苏住房C小程序（zhi2-mobile-shimin）中conditionScreening.vue引用images/szf/reset.svg因分包路径解析错误导致500，已复制文件到分包目录修复。

## 问题根因
- conditionScreening.vue中`<ZsImage class="img" src="images/szf/reset.svg" />`
- ZsImage通过resolveStaticUrl解析路径，`images/szf/`资源默认归属pages_transaction分包，实际请求`/pages_transaction/static/images/szf/reset.svg`
- 该文件只存在于主包`src/static/images/szf/reset.svg`，分包目录只有`reset.png`，无`reset.svg`，加载报500

## 修复方式
- 已将`reset.svg`复制到分包目录：`src/pages_transaction/static/images/szf/reset.svg`
- 重新编译后筛选弹窗重置图标应正常显示

## 补充说明
- 项目里`images/szf/`资源按分包拆分存放（见`utils/index.js`中的相关逻辑）

## 涉及文件
- d:/repository/苏住房C/zhi2-mobile-shimin/src/components/commonNew/conditionScreening.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsImage/ZsImage.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/index.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：ffbc909f-a8cb-4166-8285-a0ac8381920f
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "condition_screening_reset_svg_fix",
  "source_extraction_id": "e4499bd152024ddfb3f1405d312e4576",
  "version": 1,
  "memory_type": "entities"
}
-->