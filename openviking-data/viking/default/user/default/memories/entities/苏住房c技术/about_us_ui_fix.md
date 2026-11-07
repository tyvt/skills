# 关于我们页面UI紊乱修复
苏住房C「关于我们」页因`ZsImage`内部样式撑满导致logo巨大，已用固定尺寸容器包裹修复。

## 问题根因
- `ZsImage`组件内部设`width:100%;height:100%`撑满父容器
- 页面将`class="logo"`（80×80px）直接写在`ZsImage`上，组件样式优先级高，logo被拉满整屏宽度

## 修复内容
- 参考`cancellationWarning`等页，用固定尺寸容器包裹`ZsImage`
- Logo：80×80px容器；电话/地址图标：16×16px容器（与SVG原始尺寸一致）
- 重新编译后在微信开发者工具预览，「关于我们」logo正常80px，联系信息正常排列

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_main/about/AboutUs.vue`、`components/ZsImage/ZsImage.vue`
- 来源会话ID：cf3f235e-357f-45ef-a9c7-36f63007668f；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "about_us_ui_fix",
  "source_extraction_id": "1d5777e127fe4ad7ad19ecf01a6caf1e",
  "version": 1,
  "memory_type": "entities"
}
-->