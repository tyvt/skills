# 接口与数据归一化 · 列表分页与 store（项目专属）

绑定具体项目的组件、路径与业务约定，共 4 条。

## 泰兴小程序（3）

### m085 · 列表页新建流程约定：页面 + pages.json 注册 + 同目录 mock 接口模块三件套

🔴 套路 ｜ 验证于 泰兴 ｜ 距代码最后改动 150 天，属具体实现细节，强烈建议先核对代码

用户对 `pages_*` 类业务子包的开发要求是一个固定三件套，且在提示里明确写出：
1. 在指定子包目录（如 `src/pages_maintain_project`）创建页面 .vue；
2. 在 `src/pages.json` 注册路由（含 `navigationBarTitleText`，标题要与设计图一致，例如设计图为「维修申请」就不要自拟「维修项目详情」）；
3. 在该子包的 mock 接口文件（如 `src/pages_maintain_project/maintainProject.js`）里补 mock 数据与 fetch 方法，供后端未就绪时联调。模式：`getXxxDetailExtra(id, row)` 提供设计稿特有字段，`fetchXxxDetail(id)` 在 mock 列表中查 id 后合并；
4. UI 按设计图 100% 还原（背景、白卡片圆角、标签/正文/强调色、绿色竖条标题、箭头图标等按稿约定）；
5. 列表卡片加 `@tap` 跳到新详情页并带 `?id=`。

注意事项：设计图中未体现交互的行（如维修对象子行）先不绑定跳转，待确认路由与参数后再加。

> 来源依据（摘）：用户诉求 1 原文：「在@src/pages_maintain_project 目录创建维修对象详情页面，@src/pages.json 注册路由，@src/pages_maintain_project/maintainProject.js 模拟接口，按照设计图100%换UI页面…

文件：`src/pages_maintain_project/object-detail.vue`、`src/pages_maintain_project/maintainProject.js`、`src/pages.json`、`src/pages_maintain_project/static/comple.svg`

---

### m144 · 业务逻辑统一收敛到页面目录内的本地 store，页面不直接调接口

🟡 模式 ｜ 验证于 泰兴 ｜ 距代码最后改动 152 天，属具体实现细节，强烈建议先核对代码

泰兴小程序遵循「按业务模块建 store」的约定：业务模块（如维修项目 pages_maintain_project）的业务逻辑、mock 分页接口、真实接口请求方法都放在该页面目录下的本地 store 文件（src/pages_maintain_project/maintainProject.js）里，页面 .vue 只做展示与跳转，不直接关心后端字段。该 store 原在 src/store/maintainProject.js（全局 store 目录），用户明确要求迁到 src/pages_maintain_project 内以 import './maintainProject' 引入，并删除原全局文件、确认全局无 @/store/maintainProject 残留引用。后续同类模块应沿用「模块目录内 store + 页面只消费」的结构，而不是再往 src/store 里堆。

> 来源依据（摘）：会话 7242733d：「store改为@src/pages_maintain_project 放在这个目录里面用」→ 新增 src/pages_maintain_project/maintainProject.js、index.vue 改为 import maintainPro…

文件：`src/pages_maintain_project/maintainProject.js`、`src/pages_maintain_project/index.vue`

---

### undefined · Web 管理后台新增业务模块：mixins 驱动 CRUD，目录名=接口路径，不写 api 文件

🟡 套路 ｜ 验证于 泰兴 ｜ 距代码最后改动 47 天，引用前请核对

场景：在 zhi2-web-admin（Vue3 + Element Plus 管理后台）新增一个业务模块（如机构注销 companyCancel）。本项目约定不新建 src/api/xxx.js 文件，也不在页面里堆 data 变量和方法，而是全部走 mixin。

为什么：src/mixins/form.js 用 computed 统一拼出 addApiFull = `/${moduleName}/${businessName}/add`、editApiFull（/update）、detailApiFull（/detail）；src/mixins/table.js 用 moduleName + businessName 拼列表 `/${moduleName}/${businessName}/page` 和 `/delete`；permsMixins.js 用 `${moduleName}:${businessName}` 拼权限码；approval.js 按 route.meta 取审批接口。listMixins.js 还会按 this.$route.path 缓存搜索参数并自动补 queryParams。

怎么做：页面只需声明 moduleName / businessName / primaryKey / id 等少量字段，再 spread 对应 mixin（列表用 listMixins，详情/表单用 form mixin + detailMixins），模板直接使用 ListTemplate.js 提供的字符串模板结构（zs-search-form + zs-table + zs-pagination + zs-operate-column）。提交/审批按钮交给 operation-btn-group 按 businessName 自动处理，无需手写接口调用。

关键副作用：目录名必须与接口路径一致（接口 /company/companyCancel → src/views/company/companyCancel/），否则 formMode、权限前缀、菜单 component 配置全对不上；这也是用户明确提出的要求——目录和接口匹配，且不要 api 文件。

与已知清单第 120 条（维修项目模块「接口层内聚到模块 JS」）方向相反：那条是小程序端把接口收进模块 JS，本条是 Web 后台刻意不建 api 文件、由 mixin 拼路径，不要混用。

> 来源依据（摘）：用户在 4 轮对话中明确要求「查看项目里面的代码规范，使用 mixins，尽可能少做新的变量和方法定义」，随后又纠正「不要使用api文件，代码目录也要按照 companyCancel，和接口匹配」，删除了 src/api/company/companyCancel.js 与 sr…

文件：`zhi2-web-admin/src/mixins/form.js`、`zhi2-web-admin/src/mixins/table.js`、`zhi2-web-admin/src/mixins/listMixins.js`、`zhi2-web-admin/src/mixins/ListTemplate.js`

---

## 苏州市房地产监测V3（1）

### undefined · [苏房] 下拉/候选数据源的接口选择：不能用 /page（只回第一页），要改 /listAll 并取 res.data

🟡 踩坑 ｜ 验证于 苏房V3 ｜ 距代码最后改动 10 天，引用前请核对

什么情况：流程定义设计页（views/tool/definition/detail.vue）点审批节点、人员类型选「候选组」时，候选角色下拉只显示了一部分角色。根因是 getDataList() 里角色列表调的是 /system/role/page 分页接口，只拿到第一页数据。
为什么：本后台的列表接口分页版 /page 返回结构是 { rows, total }，默认 pageSize 有限；而全量接口 /listAll 返回 { data }。凡是用作「下拉候选 / 穿梭 / 角色或用户选择」的数据源，语义上就需要全量，误用分页接口不会有任何报错，只是静默少数据，非常难被用户定位。
怎么做：把 /system/role/page 换成 /system/role/listAll，并把取值从 res.rows 改为 res.data（与项目内其他 listAll 消费方保持一致）。同类排查点：同一方法里办理人仍走 /system/user/page，若出现「只显示一页用户」同样要换用户全量接口。通用判断法则：分页接口只用于带分页器的列表页；弹窗选择、下拉、树、候选组一律用 listAll/全量接口，改完顺带核对返回字段名是 data 还是 rows。

> 来源依据（摘）：用户诉求原文：「这个地方点审批节点的时候，查询角色接口调的是page，没有全查回来，需要改成/listAll，把角色全查回来」。改动文件 zhi2-web-admin/src/views/tool/definition/detail.vue 的 getDataList()，接口 …

文件：`zhi2-web-admin/src/views/tool/definition/detail.vue`、`zhi2-web-admin/src/api/system/role.js`

---
