# RentalDetailDialog 标签与地址布局
RentalDetailDialog（开业信息公示 → 基本信息）弹窗标签宽度原用 em 计算，因 em 小于中文字形实际宽度（根字号 16px），导致左列值左缘参差；独占整行字段（注册地址、开业信息登记编号）只用自身标签宽度更对不齐。修复后标签宽度改用 px（字数 × 16px），独占整行字段归入第一列共用最长标签定宽，整列取值共用同一条左缘，标签与值间距统一 12px。

## 布局要点
- 标签宽度改用 px 计算（字数 × 16px，即中文字符实际字宽），保证标签盒不窄于文字
- 独占整行的字段（注册地址、开业信息登记编号、经营范围）归入第一列，与该列双列字段共用同一「最长标签」定宽
- 整列（含注册地址、开业信息登记编号、经营范围）取值共用同一条左缘，与第二列一致
- 标签与值间距统一为 12px

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue
- 验证：npx eslint 通过、scripts/vite-build.mjs build 构建成功，本地 nginx 站点（D:/repository/门户/dist，:8092）提供，Playwright 截图确认左列取值全部对齐同一条竖线
- 提交：zhi2-web-admin c20b0443c、父仓门户 ce063b7，均推送至 develop/v2.6.2-portal（2026-11-09）
- 所属项目：门户；来源会话ID：session_bcf22123674b5cdf5bb7fdb1484b1568；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rental_dialog_layout",
  "source_extraction_id": "45aacfbdb7e64610a23fba80b408f929",
  "version": 2,
  "memory_type": "entities"
}
-->