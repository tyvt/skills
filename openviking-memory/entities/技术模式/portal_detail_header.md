# 门户首页叠层弹窗统一灰底标题栏
首页 publicPortal 所有叠层详情弹窗头部统一接入 PortalDetailHeader.vue，禁止各组件仿写 zs-dialog 或保留多套 header 样式。

## 样式规范
- 视觉由 PortalDialogHost 引入的 portal.scss 定义
- 背景 #f0f2f5、底边 1px solid #f0f0f0、标题加粗、关闭钮 #979797
- E2E 断言头高约 57px
- 标题水平居中：标题 h2 从 inline-block 改为 display: block; width: 100%; text-align: center；关闭按钮绝对定位右上角不占标题行宽

## 改造范围
- PropertyDetailDialog、RentalDetailDialog 等需去掉旧头并补头底分割线
- 删除单页仅针对预售许可（is-permit）的重复居中样式，避免双处维护；所有使用 portal-detail-header 的 Rental/Property 类弹窗一次生效

## 验证与归属
- 验证证据：会话 13ba8b85 用户要求弹窗头部用公共写法并排查所有首页弹窗；会话 b0657f58 将标题 h2 从 inline-block 改为 display:block; width:100%; text-align:center，PropertyDetailDialog 删除 is-permit 重复居中样式
- 涉及文件：PortalDetailHeader.vue、portal.scss、PropertyDetailDialog.vue、RentalDetailDialog.vue、PortalDialogHost.vue（均在 zhi2-web-admin/src/views/home/publicPortal 下）
- 所属项目：门户；来源会话ID：13ba8b85-74b6-4803-94c3-9d075b44558c、b0657f58-c3a5-4ffd-a3ba-7e97031b4770；代码基线：e1f8e0b、dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_detail_header",
  "source_extraction_id": "be485c2942c740ec95fed36871b1ab0f",
  "version": 2,
  "memory_type": "entities"
}
-->