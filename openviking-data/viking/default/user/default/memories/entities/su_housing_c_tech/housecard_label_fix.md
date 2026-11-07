# 苏找房推荐房源类型标识缺失修复
苏住房C 推荐列表房源图片底部缺少「新房/二手房」标志的问题已修复，根因为 `houseCard.vue` 未实现传入的 `show-type-prefix` 属性。

## 问题根因
- `Project_Suzhufang.vue` 已传入 `show-type-prefix`，但 `houseCard.vue` 未实现该属性
- 导致推荐图片底部不显示类型标识

## 修复要点
- `houseCard.vue` 新增 `showTypePrefix` 属性
- 新增 `addressText` 计算属性，开启时在区域名前显示类型标识
- 合并重复的 `data()` 定义，顺带修复图标资源被覆盖问题

## 效果与验证
- 推荐列表显示 `新房 | 高新区`、`二手房 | 吴中区` 等与设计一致
- 刷新页面即可看到效果

## 涉及文件
- `src/pages_tab/components/Project_Suzhufang.vue`
- `src/components/commonNew/houseCard.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：3c2a5b09-905e-403b-807e-7f2d390cd0a7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "housecard_label_fix",
  "source_extraction_id": "8af34dd423d746b8b76e046dd6ee35eb",
  "version": 1,
  "memory_type": "entities"
}
-->