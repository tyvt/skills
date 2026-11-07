# 苏州市区苏服办承租方统一信用代码校验报错溯源
苏州市区苏服办项目中「承租方选择统一社会信用代码校验不通过」报错文案的归属与修复说明。

## 报错归属
- 在 `d:/repository` 全库搜索「统一社会信用代码校验」「信用代码校验」等完整文案无命中，说明该报错多半来自网关/业务后端
- 苏服办 H5/本地前端无此文案，苏服办仅展示接口返回的 `reason`，无承租方信用代码表单

## 已落地修复
- 监测V3 录入弹窗的 USCI 校验与去 `/g` 已改动
- 苏服办对 `idno` 做规范化已改动

## 后续处理建议
- 若仍报错，需在录入端改承租方单位信用代码
- 或让后端查该合同在库里的 USCC 字段

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市区苏服办
- 涉及文件：src/pages/leaseContract/index.vue、src/utils/formatter.js、src/utils/index.js、src/pages.json、src/pages/personalContract/index.vue
- 所属项目：苏州市区苏服办；来源会话：83c5ae1c-7561-4a5b-8517-f3df88b58247；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sfb_lessee_usci",
  "source_extraction_id": "dc7cbd4bf8c349e8846e97ab3e6ab13d",
  "version": 1,
  "memory_type": "entities"
}
-->