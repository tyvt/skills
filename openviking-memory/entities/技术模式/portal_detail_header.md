# 门户首页叠层弹窗统一灰底标题栏
首页 publicPortal 所有叠层详情弹窗头部统一接入 PortalDetailHeader.vue，禁止各组件仿写 zs-dialog 或保留多套 header 样式。

## 样式规范
- 视觉由 PortalDialogHost 引入的 portal.scss 定义
- 背景 #f0f2f5、底边 1px solid #f0f0f0、标题加粗、关闭钮 #979797
- E2E 断言头高约 57px
- 标题左对齐：标题灰底、高 57px，样式由 PortalDetailHeader.vue 组件自带；关闭按钮绝对定位右上角不占标题行宽

## 改造范围
- PropertyDetailDialog、RentalDetailDialog 等需去掉旧头并补头底分割线
- 删除单页仅针对预售许可（is-permit）的重复居中样式，避免双处维护；所有使用 portal-detail-header 的 Rental/Property 类弹窗一次生效
- 首页“更多”菜单弹窗与公告弹窗也改用公共 PortalDetailHeader（来源会话 bcf22123674b5cdf5bb7fdb1484b1568）

## 审查与 ESLint 跟进
- 统一弹窗头部改动整体可合并（Warning）：在 `PortalDialogHost` 下样式选择器正确，无安全/类型高危问题
- 注意 `PortalDetailHeader` 依赖全局 `portal.scss`、`title` 在非法 `type` 时可能为 `undefined`，新文件提交前需 `git add`
- 后台 ESLint 任务：先前对门户三个组件的 lint 因 `RentalDetailDialog.vue` 两处 `vue/html-closing-bracket-newline` 失败（exit 1）
- 已将 `<section>` 与 `v-for` 的 `div` 闭合括号改到属性同一行，三个组件 ESLint 现已通过
- 来源会话：a8453950-74d6-4a0a-9b84-7e8797aa1443

## 验证与归属
- 验证证据：会话 13ba8b85 用户要求弹窗头部用公共写法并排查所有首页弹窗；会话 b0657f58 统一 PortalDetailHeader 样式；会话 bcf22123674b5cdf5bb7fdb1484b1568 将标题改为左对齐、灰底、高 57px，首页“更多”菜单弹窗与公告弹窗改用公共 header
- 涉及文件：PortalDetailHeader.vue、portal.scss、PropertyDetailDialog.vue、RentalDetailDialog.vue、PortalDialogHost.vue（均在 zhi2-web-admin/src/views/home/publicPortal 下）
- 所属项目：门户；来源会话ID：13ba8b85-74b6-4803-94c3-9d075b44558c、b0657f58-c3a5-4ffd-a3ba-7e97031b4770、session_bcf22123674b5cdf5bb7fdb1484b1568；代码基线：e1f8e0b、dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_detail_header",
  "source_extraction_id": "d5bccc2cb1b14765bf4b4dd60f7526a1",
  "version": 4,
  "memory_type": "entities"
}
-->