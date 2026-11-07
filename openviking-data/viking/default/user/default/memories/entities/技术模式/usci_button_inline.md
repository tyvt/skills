# 统一社会信用代码按钮与输入框同行
苏州市房地产监测V3 中 Step1BasicInfo.vue 将统一社会信用代码按钮与输入框设置为同行显示。

## 实现要点
- Step1BasicInfo.vue 将按钮包入 .action-buttons
- .input-with-actions 设 flex-wrap: nowrap，输入框 flex: 1 1 19ch、按钮组 flex-shrink: 0
- register-layout.spec.js 调整 minUsciWidth 为 180 并新增同行 Y 坐标断言

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/248.md
- 涉及文件：Step1BasicInfo.vue、register-layout.spec.js、Step1CompanyInfo.vue、institutionRegister/index.vue、index.scss、playwright.config.js、package.json
- 所属项目：苏州市房地产监测V3；来源会话：01447af2-d905-4a03-a903-55e9e5594222；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "usci_button_inline",
  "source_extraction_id": "010b16fd09244983972d9f0e9cb07a8e",
  "version": 1,
  "memory_type": "entities"
}
-->