# 门户 publicPortal 详情弹窗统一 Header/Footer 与标签列宽
首页开业信息公示等 publicPortal 弹窗抽公共 PortalDetailHeader/Footer，统一标签列宽与间距。
## 做法要点
- 抽 PortalDetailHeader（标题左对齐、灰底、高 57px）与 PortalDetailFooter（按钮居右、80×40、距右 40px）。
- 字段区长地址等独占一行；标签列宽按该列最长标签定宽，标签与值间距统一 12px。
- 样式收敛在 portal.scss，去掉与公共组件重复的标题栏规则，修正正文 padding 重复叠加。
- 改 DOM 后同步 public-portal-interactions.spec.ts 回归。
## 验证与归属
- 会话 session_bcf22123：用户要求地址单独一行、标签值间距过大、首页弹窗排查 header/footer。
- 交付 RentalDetailDialog 改布局、新增 PortalDetailHeader/Footer、portal.scss 去重、更多/公告弹窗改用公共 header；e2e 与 build 通过。
- 涉及文件：RentalDetailDialog.vue、PortalDetailHeader.vue、PortalDetailFooter.vue、portal.scss、public-portal-interactions.spec.ts。
- 所属项目：门户；代码基线：dfee5a6；来源会话ID：session_bcf22123674b5cdf5bb7fdb1484b1568。

<!-- MEMORY_FIELDS
{
  "category": "门户技术",
  "name": "portal_detail_header_pattern",
  "source_extraction_id": "08a22315a92147d78d710883711e5733",
  "version": 1,
  "memory_type": "entities"
}
-->