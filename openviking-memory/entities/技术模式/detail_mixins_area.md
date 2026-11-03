# detailMixins 内含 form+area 避免重复引入
产品2.0 中 detail 模板页只需 mixins:[detailMixins]，因 detailMixins 已内部 mixins:[form, area]，页面再引 area 会重复合并同名选项。

## 冗余点
- 页面级 mixins 写成 [detailMixins, area] 重复引入 area
- data 里重复声明 originForm（form mixin 已声明）
- contentInfo 末尾挂恒真 .filter(visible)（无 visible 字段的数组 filter 恒全保留）
- watch form.region 加不必要 deep:true；仅单点使用的方法单独定义

## 清理原则
- 只删冗余不改行为，删前确认字段不是对 mixin 默认值的覆盖
- currentRegionCode/currentSubdistrictCode 覆盖 area 默认 regionCode/subdistrictCode，是对齐关键不能删
- 深度 watch 仅用于对象内部属性变更；合并多次 getDicts、精简 form 未用字段需先对照接口与提交字段

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/building/project/detail.vue、mixins/detailMixins.js、area.js、form.js
- 所属项目：产品2.0；来源会话：61def959-83e3-4215-8e69-6489f5d1ff6f；代码基线：645607c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_mixins_area",
  "source_extraction_id": "4c0f6b4a207146ac99f3be82996d2ef1",
  "version": 1,
  "memory_type": "entities"
}
-->