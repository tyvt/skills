# 项目专属 · 表格与布局（1/1）

共 3 条，引用前核对所属项目及代码。

### t0028 · 收银台Tab布局紊乱因flex与文字换行

⚪ 事实 ｜ 验证于 泰兴 ｜ 无 git 基线，引用前请自行核对

根因为 `src/staff/pages/cashier/result.vue` 中 `.tab-bar` 误用 `display: flex` 且 `.tab-item__label` 未禁止换行。移除 flex 改为块级撑满，并添加 `white-space: nowrap` 修正布局。

> 依据（摘）：src=泰兴小程序/012.md

文件：`d:/repository/泰兴小程序/src/staff/pages/cashier/result.vue`、`d:/repository/泰兴小程序/src/staff/pages/cashier/index.vue`、`d:/repository/泰兴小程序/src/staff/pages/cashier/payment.vue`
---

### t0050 · processPictureList未拼域名H5加载失败

⚪ 偏好 ｜ 验证于 泰兴 ｜ 无 git 基线，引用前请自行核对

`processPictureList` 返回 `/zhi2/...` 相对路径直接传 `ImageGrid` 致 H5 图片加载失败。`maintain-detail.vue` 参照 `daily.vue` 按平台拼接 `VITE_APP_API_BASE_URL` 或 `IMAGE_BASE` 为完整 URL 后传入。

> 依据（摘）：src=泰兴小程序/022.md

文件：`d:/repository/泰兴小程序/src/pages_facility/maintain-detail.vue`、`d:/repository/泰兴小程序/src/pages_facility/record-detail.vue`、`d:/repository/泰兴小程序/src/components/ImageGrid/ImageGrid.vue`
---

### x2032 · 市民端列表页批量迁移 usePaging + z-paging 的固定套路：getList(pageParams) 取参、ZsEmpty 换 #empty 槽、双列表合并为一个 z-paging 按 Tab 切 query

🔴 模式 ｜ 验证于 苏住房C ｜ 距代码最后改动 124 天，绑定具体实现，务必先核对代码

【什么情况】苏住房C 的 pages_owner 下 26 个列表页混用两套分页实现（老的 useLoadMore + uni-load-more 与新的 usePaging + z-paging），需要统一。【为什么】老实现里页面自己维护 page/pageSize/loading 并用 arguments 透传参数，存在 reload() 未定义、空态样式各写一套的问题；不统一会导致同一分包内空态文案、加载态、下拉刷新行为都不一致。【怎么做】固定迁移规则：(1) useLoadMore → usePaging，钩子返回 { list, pagingRef, queryList, refresh, reset, auto }；(2) 列表取数函数签名改成 getList(pageParams)，从入参取值而不是 arguments；(3) 列表区域包 <z-paging v-model="list" @query="queryList">，z-paging 走 pages.json 的 easycom，空态样式类 paging-empty 放 uni.scss；(4) 删除所有 uni-load-more；(5) ZsEmpty 组件替换为 z-paging 的 #empty 插槽：ZsImage + paging-empty-text，图片路径与文案必须原样保留（如 family 用 images/family-empty.png）；(6) 同时顺带把散落的 reload() 修正为 refresh()（tenant、income、facility、authentication 等）。特例：building/info/index.vue 有两个 useLoadMore，不要挂两个 z-paging，而是单个 z-paging + fetchList 按 active Tab 切 getBuildingList / getManagerList，切 Tab 时调 refresh()。

> 依据（摘）：会话 7024cb11 用户给出完整迁移规则（useLoadMore→usePaging、getList(pageParams)、z-paging 包裹、移除 uni-load-more、ZsEmpty→#empty、building/in…

文件：`zhi2-mobile-shimin/src/hooks/usePaging.js`、`zhi2-mobile-shimin/src/pages_owner/building/info/index.vue`、`zhi2-mobile-shimin/src/pages_owner/company/service/index.vue`
