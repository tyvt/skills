# UnifiedLogin引导卡白色环绕光带
在门户 UnifiedLogin 引导卡上实现沿边框跑动的白色光带，采用 conic-gradient 加双层 mask 抠出 1px 环。

## 实现要点
- 使用 `.guide-card::before`：`inset: -1px` + `padding: 1px` + `border-radius: inherit`
- 背景为 `conic-gradient(from var(--guide-ring-angle), …)`，亮弧约 200°–350°（峰值约 305°），其余透明
- 用 `mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)` 且 `mask-composite: exclude`（或 `-webkit-mask-composite: xor`）抠出仅 1px 环线

## 动效与边界
- 卡片本体保留弱常驻边 `rgba(255,255,255,0.16)`，避免光带转到背面时轮廓消失；动效专用外发光 box-shadow 应去掉以免脏边
- 用 `@property --guide-ring-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }` 注册角度并在 `@keyframes` 里改该变量实现线性旋转
- 骨架屏占位卡保持静态弱边、不参与动画

## 验证证据
- 会话实现并做像素帧差验证：动画暂停时两帧差 0px，运行为 1068px 且变化集中在卡片上缘环线区域
- hover 将周期从 3.6s 缩至 2s 并提亮 border

## 涉及文件与归属
- 涉及 zhi2-web-admin/src/views/home/UnifiedLogin.vue、UnifiedLoginSkeleton.vue
- 所属项目：门户；来源会话 session_d1e620fe90b6ddbb66e074177230a456；代码基线 dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_login_light_band",
  "source_extraction_id": "cd662961a7984e81aae67c596fea893b",
  "version": 2,
  "memory_type": "entities"
}
-->