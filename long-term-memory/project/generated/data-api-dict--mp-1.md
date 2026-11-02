# 项目专属 · 接口与数据归一化 · 字典与状态映射（1/1）

共 3 条，引用前核对所属项目及代码。

### m117 · 字典 remark 字段不可直接 JSON.parse，需安全解析

🔴 踩坑 ｜ 验证于 泰兴 ｜ 距代码最后改动 103 天，属具体实现细节，强烈建议先核对代码

后端字典（如 facility_recommend）的 remark 字段并不保证是合法 JSON：可能为空、纯文本（如 type_1）、已是对象，或格式错误。在小程序里对 el.remark 直接 JSON.parse 会抛 `Unexpected token f in JSON at position 3`（`123false`、`1.0f`、`type_1` 这类值都会失败），并且异常发生在 Array.map 回调里，会导致整个字典映射中断、页面无数据。

可复用套路：封装 parseRemark(remark) 安全解析器——空/undefined → {}；typeof 已是 object → 直接返回；字符串能 JSON.parse → 用解析结果；解析失败 → 视为纯图标名，返回 { icon: raw }。取值时做回退：id 优先取 remark.facilityDefinitionId，否则用字典 value（dictValue）。

注意：即使 remark 看起来像 JSON 也要 try/catch，不要用 /^\{/ 之类正则预判（`{foo:1}` 这类非 JSON 对象字面量会被误判）。同时在数据侧建议后台把 remark 配成 {"facilityDefinitionId":123,"icon":"type_1"}，或把 facilityDefinitionId 配在 dictValue、remark 只放图标名。

> 依据（摘）：用户在微信开发者工具报 `index.js? [sm]:1 Uncaught (in promise) SyntaxError: Unexpected token f in JSON at position 3 ... at Array.m…

文件：`d:/repository/泰兴小程序/src/pages_facility/index.vue`、`d:/repository/泰兴小程序/src/pages_facility/facility.vue`、`d:\repository\泰兴小程序\src\pages_facility\index.vue`
---

### t0039 · procedure_frequency字典转频次显示

⚪ 踩坑 ｜ 验证于 泰兴 ｜ 无 git 基线，引用前请自行核对

页面加载调用 `getDict('procedure_frequency')` 获取字典，`frequencyText` 计算属性经 `getDictLabel` 转换 `procedureFrequency`（兼容 `frequency`），未匹配回退原始值，无值显 `--`。

> 依据（摘）：src=泰兴小程序/018.md

文件：`d:/repository/泰兴小程序/src/pages_facility/maintain-detail.vue`、`d:/repository/泰兴小程序/src/pages_facility/record-detail.vue`、`d:/repository/泰兴小程序/src/pages_facility/detail.vue`
---

### t0045 · 字典remark未校验致JSON.parse崩溃

⚪ 偏好 ｜ 验证于 泰兴 ｜ 无 git 基线，引用前请自行核对

src/pages_facility/index.vue 的 initDict 直接 JSON.parse(el.remark) 因 facility_recommend 字典部分 remark 非合法 JSON 而抛错中断 map。新增 parseRemark 安全解析（空值/对象/合法JSON/纯文本转 {icon}），id 回退取 remark.facilityDefinitionId 或字典 value，图标参照 facility.vue 直接 import SVG 用 image 展示。

> 依据（摘）：src=泰兴小程序/021.md

文件：`d:/repository/泰兴小程序/src/pages_facility/index.vue`、`d:/repository/泰兴小程序/src/api/maintenance.js`、`d:/repository/泰兴小程序/src/api/common.js`
