# 苏住房C 手机号只读展示用原生 input 与脱敏分离
苏住房C 市民端手机号只读展示须换原生 input + 全局 .form-plain-input，模板脱敏值与业务完整值分离。

## 问题根因
- uni-easyinput 在小程序端是独立组件、样式隔离，页面里对内部 input 的样式覆盖进不去
- 仅在组件层打补丁会反复失败，须换原生控件或走全局类

## 修复做法
- 换原生 <input disabled>，禁用态样式沉到全局 src/styles/form.scss 新增 .form-plain-input（#999999、透明背景、高度对齐）
- 展示与业务分离：模板显示 maskedPhone（脱敏值），form.phone 仍保存完整号码，发码/校验逻辑不动
- 脱敏规则改到公共 formatter（blurPhone/securePhone）中间四位，13812345678 → 138****5678，改一处全部生效
- 删掉页面里 phoneInputStyles 等 uni-easyinput 覆盖死样式

## 排查与归属
- 同类「某控件改不动」先判断是否 uni_modules 组件，再决定换原生控件还是走全局类
- 所属项目：苏住房C；来源会话：82d303e8-ae20-4dc6-8259-63c006b5fcb0；代码基线：9cdf7b8
- 涉及文件：src/pages_my/setting/cancellationForm.vue、phone.vue、src/styles/form.scss、src/utils/formatter.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufangc_phone_input",
  "source_extraction_id": "a59756a24d99485f998a670e9881d6cd",
  "version": 1,
  "memory_type": "entities"
}
-->