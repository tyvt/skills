# 登录页左侧图片展示不全修复
苏州市房地产监测V3 管理端与门户登录页因 `ResizeObserver` 正反馈导致图片区域涨到接近全屏，已修复。

## 根因
- `ResizeObserver` 监听登录盒后每次加大 `minHeight`
- 右侧 `.login-container` 被 `height: 100%` 拉高，`scrollHeight` 跟着变大，再次算出更大宽高，形成正反馈

## 修复方案
- 去掉对登录盒/表单的 `ResizeObserver`
- 不再用 `scrollHeight` 量表单，只用各登录模式固定 `min-height`（500/520/560）与图片宽高比计算
- 增加视口上限：单栏宽约 ≤ 42% 屏宽，盒高约 ≤ 78% 屏高
- 窗口尺寸变化仅用 `resize` 事件重新算一次，避免自激

## 涉及文件与归属
- 涉及文件：`zhi2-web-admin/src/views/login.vue`、门户 `login.vue`
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_image_fix",
  "source_extraction_id": "e1e0f290fc1e43a8b372bd273c07a27c",
  "version": 1,
  "memory_type": "entities"
}
-->