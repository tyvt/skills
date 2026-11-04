# 无标签表单行 label-width 占位致 checkbox 偏右
苏住房C 市民端实名认证页协议勾选行因 uni-forms 保留 label-width 占位而偏右，改用 label-width="0" 与 flex 行内排布修复。

## 问题现象
- 业主实名认证页 src/pages_my/verification/FormLocal.vue 的协议勾选行未与上方「姓名」「证件号码」左对齐
- 整行 checkbox 明显偏右，协议文字用 position:absolute;left:28px 叠在 checkbox 上易错位或压住点击区

## 根因
- 表单容器设 :label-width="80"，协议行是 uni-forms-item 但无 label，框架仍按 label-width 保留 80px 标签区使内容右推
- 协议文字绝对定位叠层在机型差异下会错位或压住点击区，本身布局不稳

## 解决方案
- 协议行显式加 label-width="0"（Vue 中数字 0 需绑定写法）取消标签占位，使右边缘与上方字段左边缘对齐
- 勾选框与协议文字改 flex 横向排列、gap 控制间距，彻底去掉绝对定位
- 直接复用登录页共享组件 src/components/shared/AgreementCheck.vue，不在页面重画一份
- 手机号/协议等固定无标签行从开始就写 label-width="0"

## 验证与归属
- 所属项目：苏住房C；来源会话：ff73a0da-4c2f-4e0f-ba3a-30d82fa7c7d6；代码基线：4630e8e
- 涉及文件：src/pages_my/verification/FormLocal.vue、src/components/shared/AgreementCheck.vue、src/styles/form2.scss、src/styles/radio.scss

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "label_width_zero",
  "source_extraction_id": "f6816503b931464c9b89b467f68dad1b",
  "version": 1,
  "memory_type": "entities"
}
-->