# 双晒类别列表标题垂直居中修复
苏住房C(zhi2-mobile-shimin)小程序中双晒公示页类别卡片标题垂直居中问题已修复。

## 问题根因
- 卡片仅设上内边距 `padding: 32rpx 0 0 32rpx`，内容偏上
- 标题与箭头图标纵向堆叠，标题无法相对卡片高度居中

## 修复方案
- 卡片改为 `flex` 布局，上下内边距对称(`32rpx`)
- 左侧区域固定 `128rpx` 高度(与右侧图标一致)
- 标题在箭头上方空间内通过 `align-items: center` 垂直居中
- 箭头图标绝对定位在左下角，不影响标题居中

## 验证与归属
- 四个类别卡片(物业服务合同、物业服务计划、公共收益收支、维修资金使用)标题上下居中
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_main/publicNotice/index.vue`
- 来源会话ID：0ec624e9-b4c9-406a-8cb8-9a62616cca2e；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "publicnotice_title_center_fix",
  "source_extraction_id": "7566ecdbf0c54726904383a9644f43fe",
  "version": 1,
  "memory_type": "entities"
}
-->