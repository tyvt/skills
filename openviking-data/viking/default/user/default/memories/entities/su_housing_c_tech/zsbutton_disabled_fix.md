# ZsButton禁用态绿底全局修复
苏住房C（zhi2-mobile-shimin）已完成全局排查与修复，按钮禁用态背景色不再回退为微信默认绿色（#07c160）。

## 问题原因
- 微信小程序原生行为：`ZsButton` 原把 `type="primary"` 传给原生 `<button>`，微信默认主色为绿色 `#07c160`
- 禁用态 CSS 失效：禁用样式用 `rgba(var(--primary-color-rgb), 0.5)`，小程序不支持，回退为默认绿
- 禁用样式范围过大：`.zs-button[disabled]` 作用于所有按钮，连默认/取消按钮也被加主题色背景

## 修复方案
- 核心改动在 `ZsButton.vue`：不再向原生 button 传 `type` / `plain`，改用 class（`zs-button--primary`、`zs-button--plain`、`is-disabled`）控制样式
- 增加 `hover-class="none"`，去掉微信默认点击态
- 禁用态使用预计算的 `--primary-color-disabled` 变量
- `styles/index.css` 新增 `--primary-color-disabled` 变量；`uni.scss` 重置小程序 disabled 默认透明度避免绿底

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`ZsButton.vue`、`styles/index.css`、`uni.scss`、`zs-button.scss`
- 所属项目：苏住房C；来源会话ID：a82b1c4d-6931-4bc6-bd80-8e4198e22765；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zsbutton_disabled_fix",
  "source_extraction_id": "8367a7fe8ce543c2a6fd6f50bc32f385",
  "version": 1,
  "memory_type": "entities"
}
-->