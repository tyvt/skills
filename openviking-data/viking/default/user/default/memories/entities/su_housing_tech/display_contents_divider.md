---
audit_status: valid
last_checked: 2026-11-26T08:33:21+08:00
verdict_note: 苏住房C form.scss 中 -deep(.img-code .uni-forms-item__content){display-contents!important} 与 -deep(.img-code .container){border-bottom-1px solid #f2f2f2} 均在，ImgCode/index.vue 存在。底部分隔线移至 container、宿主 display-contents 的描述与代码一致。
---
# ImgCode display:contents divider fix
In the WeChat mini-program, the ImgCode component host with display:contents cannot fill width and loses its bottom divider, so the divider style must move to the container.

## Problem Cause
- ImgCode host using display:contents fails to fill and drops the bottom divider

## Solution
- Keep display:contents under .img-code in form.scss
- Move bottom divider style to .img-code .container
- Restore .container naming in ImgCode/index.vue
- Remove temporary style from login/index.vue

## Involved Files
- src/pages_main/login/index.vue
- src/components/ImgCode/index.vue
- src/styles/form.scss
- src/components/VerifyCode/index.vue
- src/pages_transaction/publishHouse/verification.vue
- src/pages_my/setting/phone.vue
- src/pages_my/setting/cancellationForm.vue
- src/pages_transaction/publishHouse/ImgCode/index.vue

## Verification
- Project: SuHousingC (zhi2-mobile-shimin)
- Source session: f888dab8-e1a9-417b-9761-339cbc03bf70

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：f888dab8-e1a9-417b-9761-339cbc03bf70

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "display_contents_divider",
  "source_extraction_id": "22a74bef41a84490857d2c3b5457400d",
  "version": 1,
  "memory_type": "entities"
}
-->