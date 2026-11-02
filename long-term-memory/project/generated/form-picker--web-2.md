# 项目专属 · 表单与选择器（2/2）

共 14 条，引用前核对所属项目及代码。

### s1098 · szForm.js旧校验空实现致无前端必填校验

⚪ 偏好 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

`suzhou2016/mixins/szForm.js` 的 `checkValidate()` 为空实现，保存时无前端校验且依赖后端报错。`components/fieldAnchor.js` 从 `Sz*` 组件 `v-model` 推导 `data-field` 锚点，`SzContent.getFormData()` 依据 `suzhou2016/validation.js` 的 `CHAPTER_REQUIRED` 分支校验，定位首个未填项并中断保存。

> 依据（摘）：src=苏州市房地产监测V3/077.md

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/request.js`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/contractContent.vue`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/index.vue`
---

### s1285 · 资格证书表单须按设计稿三列对齐

⚪ 踩坑 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

修改`zhi2-web-admin/src/views/company/personnelCertificate/detail.vue`，将证书信息表单调整为14字段、3列栅格布局，新增性别等字段并绑定字典`sys_user_sex`，与列表页`index.vue`设计稿逐格对齐。

> 依据（摘）：src=苏州市房地产监测V3/169.md

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/institution/qualifications/index.vue`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/institution/qualifications/detail.vue`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/zljg/components/PersonnelCertificatePlaceholder.vue`
---

### s1309 · 服务方案按比例收费须校验0-100两位小数

⚪ 模式 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

在 `zhi2-web-admin/src/views/company/companyScheme/detail.vue` 中新增 `isChargeTypeProportion` 判定收费类型。`rules` 改为 computed 实现按比例 0-100 最多2位小数、其他类型大于0的校验，并监听 `form.chargeType` 切换重新校验。

> 依据（摘）：src=苏州市房地产监测V3/183.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyScheme/detail.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/company/companyScheme.js`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue`
---

### s1325 · 用户管理证件号码必填与身份证格式校验

⚪ 模式 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

于 zhi2-web-admin/src/views/system/user/detail.vue 补充 idType、idNumber 字段及必填校验，新建编辑均生效。idType=='01' 时采用 patterns.IDCardNumber 校验格式，输入框配置 v-model.trim 与 maxlength='30' 拦截空值。

> 依据（摘）：src=苏州市房地产监测V3/192.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/system/user/detail.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/detailMixins.js`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/system/user.js`
---

### s1333 · 输入框高度超行高致合同段落文字上下紧贴

⚪ 踩坑 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

根因：`.s16-p` 正文行高约 27px，填空输入框固定 32px 高，行盒被撑高导致上下行文字紧贴输入框边缘。关键修复：在 `zhi2-web-admin/src/views/contract/chapters/suzhou2016/components/SzBlank.vue` 的 `.s16-blank` 添加 `margin: 4px 0`，全局生效于所有走 `SzBlank` 组件的填空。

> 依据（摘）：src=苏州市房地产监测V3/198.md

文件：`zhi2-web-admin/src/views/contract/chapters/suzhou2016/chapter1.vue`、`zhi2-web-admin/src/views/contract/chapters/suzhou2016/styles/sz-contract.scss`、`zhi2-web-admin/src/views/contract/chapters/suzhou2016/components/SzBlank.vue`
---

### s1471 · 经纪机构证书联系电话非必填仅格式校验

⚪ 模式 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

`zhi2-web-admin/src/views/company/personnelCertificate/detail.vue` 中 `phone` 校验移除 `required: true`，仅保留 `patterns.contactPhone` 正则格式校验，实现非必填且留空放行。`staffManagement` 下证书弹窗无联系电话字段故无需改动。

> 依据（摘）：src=苏州市房地产监测V3/322.md

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/personnelCertificate/detail.vue`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue`、`zhi2-web-admin/src/views/company/personnelCertificate/detail.vue`
---

### s1537 · 租赁企业开业前端联调路由与表单实现

⚪ 模式 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

按接口文档实现租赁企业开业联调：主页面 `zhi2-web-admin/src/views/zljg/leaseEntryNetwork/detail.vue`，营业执照等只读、办公信息可编辑（`bizState=0`），附件用 030300+030310 双 `AppendixPackageSection`，接口沿用 `getEntryNetworkDetail` 等。

> 依据（摘）：extracted source=cursor session=662b0e4d-5990-4b51-9c23-9536e0b79e3a

文件：`c:/Users/Administrator/Documents/WXWork/1688857831856144/Cache/File/2026-10/lease_opening_frontend_api_20261011.md`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/company/lease-institution-register-flow.spec.js`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyManagement/components/AgencyEntryNetworkDetail.vue`
---

### x2887 · 填空输入框撑大行盒致合同行距紧贴

⚪ 踩坑 ｜ 验证于 苏州市房地产监测V3-leftover ｜ 无 git 基线，引用前请自行核对

根因为 .s16-p 行高约27px而 SzBlank 输入框固定32px，撑大行盒使上下行文字紧贴。修复于 zhi2-web-admin/src/views/contract/chapters/suzhou2016/components/SzBlank.vue 的 .s16-blank 加 margin: 4px 0，全局合同页面统一生效。

> 依据（摘）：src=苏州市房地产监测V3-leftover/002.md

文件：`zhi2-web-admin/src/views/contract/chapters/suzhou2016/chapter1.vue`、`zhi2-web-admin/src/views/contract/chapters/suzhou2016/styles/sz-contract.scss`、`zhi2-web-admin/src/views/contract/chapters/suzhou2016/components/SzBlank.vue`
---

### x3015 · 资格证书管理页联系电话非必填仅格式校验

⚪ 模式 ｜ 验证于 苏州市房地产监测V3-leftover ｜ 无 git 基线，引用前请自行核对

业务要求联系电话非必填。`zhi2-web-admin/src/views/company/personnelCertificate/detail.vue` 中 `phone` 校验移除 `required: true`，仅保留 `patterns.contactPhone` 正则，留空放行。

> 依据（摘）：src=苏州市房地产监测V3-leftover/122.md

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/personnelCertificate/detail.vue`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue`、`zhi2-web-admin/src/views/company/personnelCertificate/detail.vue`
---

### x3073 · szForm.js 校验空实现致未填项无前端定位

⚪ 偏好 ｜ 验证于 苏州市房地产监测V3-rest ｜ 无 git 基线，引用前请自行核对

根因：`suzhou2016/mixins/szForm.js` 的 `checkValidate()` 空实现致保存无前端校验、`SzContent` 滚动到 `.is-error` 不触发。实现：`Sz*` 组件从 `v-model` 推导字段名渲染 `data-field` 锚点（`components/fieldAnchor.js`），`SzContent.getFormData()` 逐章校验首个未填项高亮滚动中断保存，必填项登记于 `suzhou2016/validation.js` 的 `CHAPTER_REQUIRED` 按分支校验，通道2兜底拦截后端报错。

> 依据（摘）：src=苏州市房地产监测V3-rest/023.md

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/request.js`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/contractContent.vue`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/index.vue`
---

### x3147 · 变更表单值格式化后相同则隐藏原值角标

⚪ 踩坑 ｜ 验证于 苏州市房地产监测V3-rest ｜ 无 git 基线，引用前请自行核对

根因：变更编辑页比较变更前/当前值未统一格式化（如 `/`与空白、数字类型、区划取值），语义相同误显红色「原值」角标。修复：新增 `zhi2-web-admin/src/utils/formChangeTooltip.js` 的 `resolveFormChangeTooltip` 等函数同格式比较；`DeveloperBasicInfoForm.vue` 字典字段双侧格式化、行政区划使用 `pickRegionFieldValue` 对齐详情展示。

> 依据（摘）：src=苏州市房地产监测V3-rest/061.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/toB/companyRecord/detail.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyManagement/components/DeveloperBasicInfoForm.vue`
---

### x3277 · 服务方案按比例收费缺0-100两位小数校验

⚪ 模式 ｜ 验证于 苏州市房地产监测V3-rest ｜ 无 git 基线，引用前请自行核对

未按收费类型差异化校验收费标准，按比例时未限0-100及2位小数。在 zhi2-web-admin/src/views/company/companyScheme/detail.vue 新增 isChargeTypeProportion 判定，rules 改 computed 实现按比例校验并监听 form.chargeType 重校验。

> 依据（摘）：src=苏州市房地产监测V3-rest/141.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyScheme/detail.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/company/companyScheme.js`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue`
---

### x3299 · 用户管理证件号码必填且校验身份证格式

⚪ 模式 ｜ 验证于 苏州市房地产监测V3-rest ｜ 无 git 基线，引用前请自行核对

用户管理新建与编辑缺失证件类型及号码必填校验。`zhi2-web-admin/src/views/system/user/detail.vue` 补充 `idType`、`idNumber` 必填规则，居民身份证（`idType == '01'`）应用 `patterns.IDCardNumber`，输入框采用 `v-model.trim` 与 `maxlength="30"`。

> 依据（摘）：src=苏州市房地产监测V3-rest/153.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/system/user/detail.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/detailMixins.js`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/system/user.js`
---

### x3400 · zhi2-web-admin 门户无仓库级 TypeScript 校验

🔵 事实 ｜ 验证于 门户 ｜ 约定/偏好类，通常长期有效（记录于 2026-10-20）

门户前端 zhi2-web-admin 以 Vue 2 + JS 为主；仓库无 tsconfig、package.json 无 typecheck 脚本。审查/回归 publicPortal 的 .vue 组件不能依赖 tsc；E2E 为 .ts 文件但属 Playwright 侧，与业务 SFC 类型检查分离。可用 eslint 对具体 Vue 文件做静态检查。

> 依据（摘）：会话 a8453950：明确未执行 tsc，PortalDetailHeader/PropertyDetailDialog eslint 通过。

文件：`zhi2-web-admin/package.json`、`zhi2-web-admin/src/views/home/publicPortal/`
