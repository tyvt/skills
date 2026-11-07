# 苏住房C按钮禁用态变绿
苏住房C 按钮 disabled 时背景变微信绿而非主题色，根因为 ZsButton 传 type=primary 且禁用色用了小程序不支持的 rgba(var(...)) 或变量在禁用分支失效。

## 问题现象与根因
- 全站大量按钮 disabled 背景为微信绿 #07c160，不是主题色 #1354be
- 根因一：ZsButton 把 type="primary" 传给原生 button，微信 primary 默认绿，样式没压住就露绿底
- 根因二：禁用背景写 rgba(var(--primary-color-rgb),0.5)，小程序不支持该嵌套写法或变量在自定义组件边界未取到值，声明被丢弃回退绿底
- 根因三：.zs-button[disabled] 选择器权重过大，连默认/取消按钮也被刷主题色背景
- 具体案例：pages_vote/elect/needToKnow 按钮倒计时禁用期间变绿，因 AgreementPage useCountDown(5) 使 ZsButton :disabled，原生 UA 规则压过半透明背景

## 解决方案
- 不再向原生 button 传 type/plain，改由 class（zs-button--primary/zs-button--plain/is-disabled）承担样式
- 加 hover-class="none" 去掉微信默认点击态；禁用色改用预计算纯色变量 --primary-color-disabled（禁运行时拼 rgba）
- 禁用态用与启用态同等强度声明（明确 background-color + 必要 !important、必要时用字面色值而非依赖 --primary-color-rgb 变量），在授权弹窗等跨组件边界场景复核 CSS 变量是否取到值
- 配套：styles/index.css 定义变量、uni.scss 重置 disabled 默认透明度、zs-button.scss 补取消/重置灰底 #f0f0f0、App.vue 同步设置
- 验收：主按钮禁用=半透明主题蓝、plain=半透明主题色边框文字、默认/取消=灰底

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 a82b1c4d「很多按钮禁用状态下的背景色是绿色，全局排查修复」；会话 2a7e26fd「pages_vote/elect/needToKnow 按钮禁用背景色为什么是绿色」
- 涉及文件：src/components/ZsButton/ZsButton.vue、src/styles/zs-button.scss、src/styles/index.css、src/uni.scss、src/App.vue、src/pages_main/login/index.vue、src/pages_vote/decision/needToKnow.vue、src/pages_vote/elect/needToKnow.vue、src/components/shared/AgreementPage.vue
- 所属项目：苏住房C；来源会话ID：a82b1c4d-6931-4bc6-bd80-8e4198e22765, 2a7e26fd-2145-4c85-840c-3ea11b150b32；代码基线：4d6dba9, b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "button_disabled_green",
  "source_extraction_id": "26d7a6fd99de463182bdf8dc2795cc18",
  "version": 2,
  "memory_type": "entities"
}
-->