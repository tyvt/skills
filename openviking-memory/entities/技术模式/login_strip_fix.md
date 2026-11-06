# 登录框左侧装饰图底部白条修复
苏州市房地产监测V3 的 login.vue 修复了登录框左侧装饰图与表单高度不一致导致的底部白条问题。

## 问题根因
- 侧栏宽度固定为 520px，表单区 min-height 约 500px
- 装饰图偏宽时按宽度等比缩放高度小于 500px，配合 object-fit: contain 在图片下方露出白底

## 修改内容
- 布局计算：按侧栏宽度 ≥ 表单最小高度 × 图片宽高比计算宽度（受 maxPanelW/maxHBox 限制），使高度与图片比例一致
- 展示方式：默认 contain + left top；仅当视口高度压到低于图片自然高度时加 login-bg__side-image--cover 用 cover 铺满
- 侧栏容器：使用 flex + min-height: 0 让图片铺满左侧列高度

## 涉及文件与归属
- 涉及文件：src/views/login.vue
- 所属项目：苏州市房地产监测V3；来源会话：09c6ceb2-361f-43b0-9c69-57ac6c7fa6aa
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_strip_fix",
  "source_extraction_id": "4b2de2a5bed3429c8dadec66071ab087",
  "version": 1,
  "memory_type": "entities"
}
-->