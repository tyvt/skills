# 接口与数据归一化 · 字典与状态映射（项目专属）

绑定具体项目的组件、路径与业务约定，共 5 条。

## 泰兴小程序（3）

### m117 · 字典 remark 字段不可直接 JSON.parse，需安全解析

🔴 踩坑 ｜ 验证于 泰兴 ｜ 距代码最后改动 103 天，属具体实现细节，强烈建议先核对代码

后端字典（如 facility_recommend）的 remark 字段并不保证是合法 JSON：可能为空、纯文本（如 type_1）、已是对象，或格式错误。在小程序里对 el.remark 直接 JSON.parse 会抛 `Unexpected token f in JSON at position 3`（`123false`、`1.0f`、`type_1` 这类值都会失败），并且异常发生在 Array.map 回调里，会导致整个字典映射中断、页面无数据。

可复用套路：封装 parseRemark(remark) 安全解析器——空/undefined → {}；typeof 已是 object → 直接返回；字符串能 JSON.parse → 用解析结果；解析失败 → 视为纯图标名，返回 { icon: raw }。取值时做回退：id 优先取 remark.facilityDefinitionId，否则用字典 value（dictValue）。

注意：即使 remark 看起来像 JSON 也要 try/catch，不要用 /^\{/ 之类正则预判（`{foo:1}` 这类非 JSON 对象字面量会被误判）。同时在数据侧建议后台把 remark 配成 {"facilityDefinitionId":123,"icon":"type_1"}，或把 facilityDefinitionId 配在 dictValue、remark 只放图标名。

> 来源依据（摘）：用户在微信开发者工具报 `index.js? [sm]:1 Uncaught (in promise) SyntaxError: Unexpected token f in JSON at position 3 ... at Array.map`，定位到 `// 原代码 cons…

文件：`d:/repository/泰兴小程序/src/pages_facility/index.vue`、`d:/repository/泰兴小程序/src/pages_facility/facility.vue`

---

### undefined · Web 后台列表列渲染约定：业务状态列走公共 ListTemplate + 字典列配置，禁止自造列组件/自定义插槽，也不许在列表组件里改写 tableData

🔵 偏好 ｜ 验证于 泰兴 ｜ 约定/偏好类，通常长期有效（记录于 2026-10-16）

【什么情况】zhi2-web-admin 里从业人员/机构/分支机构列表的需求方（用户）连续 5 轮反复纠正同一件事：业务状态列被写成了自定义 slot，甚至新建了 personnel-business-status-column.vue、branch-business-status-column.vue 两个专用列组件，还有人在列表组件里直接遍历改写 tableData 补状态文案。【为什么】这个后台的表格是 zs-table + zs-table-column（封装 el-table）+ ListTemplate mixin 的公共体系，列的取值/字典翻译/标签颜色都应在列配置层声明，业务字段一旦漏进 zs-table-column 通用组件或另立专用列组件，就会破坏复用、并在 HMR 下触发渲染期 undefined。【怎么做】①业务状态列只在列表页用统一的列配置 + personnelStatus.js / branchStatus.js 这类状态字典工具产出 options，走公共字典列（dict-tag）渲染；②zs-table-column 里不放任何业务字段；③不要为一个业务新建「XX-business-status-column」组件；④列表组件不处理 tableData，字段映射放在 ListTemplate/字典配置里。用户原话：「业务状态参考公共写法，不要写自定义插槽，全局排查修复类似的问题」「不需要直接处理 tableData 吧?」。与已知清单差异：已知清单全是小程序端组件/样式约定，无 Web 端表格列配置这一层。

> 来源依据（摘）：用户诉求 1「业务状态参考公共写法，不要写自定义插槽，全局排查修复类似的问题」；诉求 2「不要把业务字段放在这个组件里面」；诉求 3「personnel-business-status-column / branch-business-status-column 不需要这种组件吧…

文件：`zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelList.vue`、`zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue`、`zhi2-web-admin/src/utils/personnelStatus.js`、`zhi2-web-admin/src/utils/branchStatus.js`

---

### undefined · 苏州后台新功能开发约定：目录按业务域、逻辑优先 mixins、API 写在页面内、E2E 走真实接口

🔵 偏好 ｜ 验证于 泰兴 ｜ 约定/偏好类，通常长期有效（记录于 2026-09-10）

用户对 zhi2-web-admin（Vue3 + Element Plus）新增业务模块的明确要求：1) 目录按业务域归位，如委托代售放 src/views/presale/entrustSale/（index.vue、detail.vue、components/），不要按旧菜单名塞进 commercialHousingSales/；改目录后必须同步后端菜单 component（presale/entrustSale/index、presale/entrustSale/detail）与 E2E 里的 filePath。2) 能用 mixins（table.js、subTableMixins、DetailSubTableTemplate）复用的逻辑就不要单独重写；模板无法覆盖、需要额外定义变量或函数时，先与用户确认再动手。3) 用户允许把 API 直接写在 vue 页面里，不要为单个页面单独抽 api 文件。4) 字段字典要按用户给的编码取值（如销售方式 presale_entrust_sale_sale_mode）。5) 验收必须是真实接口跑的端到端流程：开发企业增删改查 + 提交、主管部门审批，子表有增删改查也要串进流程，禁止 mock，并生成录屏。

> 来源依据（摘）：会话 5291afa5：用户「代码风格要符合框架规范，能用mixins的就不要单独写逻辑。如果模板代码不能满足你需要额外定义的变量和函数，先和我确认。API直接写在vue页面里面」「生产e2e测试用例…只需要真实接口跑的流程，不需要mock」「销售方式字典 presale_ent…

文件：`zhi2-web-admin/src/views/presale/entrustSale/index.vue`、`zhi2-web-admin/src/views/presale/entrustSale/detail.vue`、`zhi2-web-admin/src/views/presale/entrustSale/components/EntrustBuildingTable.vue`、`zhi2-web-admin/src/views/presale/entrustSale/components/EntrustSaleAddAppendix.vue`

---

## 苏州市房地产监测V3（2）

### undefined · [苏房] 业务状态展示没有 StatusTag 公共组件：统一走 dict-tag + options[].listClass 字典配色

🟡 模式 ｜ 验证于 苏房V3 ｜ 距代码最后改动 38 天，引用前请核对

本后台（zhi2-web-admin）里不存在 StatusTag / BizStatus / BusinessStatus / StatusBadge 组件，也没有 components/common 目录。新增或改造「业务状态」展示时，不要凭经验去翻一个不存在的统一 Tag 组件，也不要在页面里自己写 el-tag 配色，正确做法是：
1）状态配色数据化：在模块 *Constants.js 里定义 BIZ_STATE_OPTIONS = [{ dictValue:'0', dictLabel:'待提交', listClass:'warning' }, { dictValue:'1', dictLabel:'审核中', listClass:'primary' }, { dictValue:'2', dictLabel:'已备案', listClass:'success' }]，颜色只由 listClass（warning/primary/success/info）决定；
2）列表用 zs-table-column 的 { type:'tag', prop:'displayBizState' }，内部自动调用 dict-tag 渲染，且 prop='bizState' 有特殊分支，展示态字段建议单独给 displayBizState；
3）详情只读区用 detail-template 的 type:'tag' / 'dict' 字段，同样落到 dict-tag；
4）详情页头部是「OperationBtnGroup（只控制按钮，不渲染状态 Tag）+ HeadTitle（纯文本 key-value 摘要）」的组合，不要指望 OperationBtnGroup 顺带输出状态标签；FormStatus.vue 只是「制单信息」抽屉里的数据状态表单，不是页面级状态组件。分支机构这类特例的状态派生集中在 utils/branchStatus.js。动手前先读 src/components/README.md（§5.15 dict-tag、§5.10 detail-template、§5.11 OperationBtnGroup）确认现有能力。

> 来源依据（摘）：会话在 zhi2-web-admin 全仓搜索 StatusTag/BizStatus/StatusBadge/components/common 均无命中，确认业务状态统一由 dict-tag 读字典 options[].listClass 上色；zs-table-column…

文件：`zhi2-web-admin/src/components/dict-tag/dict-tag.vue`、`zhi2-web-admin/src/components/detail-template/detail-template.vue`、`zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue`、`zhi2-web-admin/src/components/OperationBtnGroup/index.vue`

---

### undefined · [苏房] 合同章节里【】印文单选项要迁成字典下拉：mixin 加 loadDictOptions 批量拉字典，并核对历史值 == dictValue

🟢 套路 ｜ 验证于 苏房V3 ｜ 距代码最后改动（2026-10-25）3 天，大概率仍有效

什么情况：苏州2016 版合同各章节（chapters/suzhou2016/）里大量【出让】【划拨】【现房】【预售商品房】这类「印文单选」，原先都是硬编码的 sz-choice 选项。用户给出完整字段→字典编码对照表（wq_land_use_certificate、land_use_rights_type、project_verification_land_purpose、wq_contract_house_type、wq_contract_sale_type、wq_sale_certificate、wq_land_certificate、wq_conform_options、wq_area_type、delivery_type、wq_applicable_options、wq_loans_options、wq_interest_type、wq_inspector_method、wq_acceptance_duration、wq_delivery_label、wq_tripartite_type、wq_selection_method、wq_contract_effective、wq_ownership_type、wq_service_mode、wq_support_options、wq_yes_or_no），要求全部改为字典驱动。
为什么：硬编码选项会随政策/口径变化漂移，且无法与后台字典统一维护；只有固定金额类印文（如【2%】【100元】）才应保留原样。
怎么做：在公共 mixin mixins/szForm.js 新增 loadDictOptions(mapping) 方法，内部批量 getDicts 并把结果转成 { value, label } 选项数组，各 chapterN.vue 只声明「字段→字典编码」映射，模板由 sz-choice 换成 sz-select。三处配套约定：①现房/预售商品房、销售/预售两组要按合同类型自动选中且 disabled 不可编辑（现售由路由 /cash 区分）；②销售依据证书原多选要收敛成单选（预售默认选中商品房预售许可证）；③上线前必须确认字典 dictValue 与历史数据存量值（如 existing/presale）完全一致，否则要做数据迁移，否则老合同回填会全部落空。

> 来源依据（摘）：用户给出 20+ 条「第X条【选项A】【选项B】 -> 字典编码」的对照清单；结论：公共 mixin 新增 loadDictOptions(mapping) 批量 getDicts 转 {value,label}，chapter2~9 + annex + supplement 全…

文件：`zhi2-web-admin/src/views/contract/chapters/suzhou2016/mixins/szForm.js`、`zhi2-web-admin/src/views/contract/chapters/suzhou2016/chapter2.vue`、`zhi2-web-admin/src/views/contract/chapters/cash/chapter2.vue`、`zhi2-web-admin/src/views/contract/chapters/suzhou2016/chapter6.vue`

---
