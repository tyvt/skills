# 防汛页面字号统一16px
2026-11-06 将所有防汛页面字体由 14px 统一改为 16px（行高 24px）。

## 改动范围
- 卡片标题：card-h3 / .card h3 → 16px
- 表单字段标签：field-block-label / .field-block label → 16px
- 选项主标签：choice-b / .choice-label b / mid-bold / .card > b → 16px
- 通用字段标签：.field-label / .upload-label（汛情、救援、巡检等页）→ 16px
- 巡检项目页：.pc-item-sub-label、.sc-sec-label、.ab-item-label、.ov-field-label → 16px
- 整改页：.rf-label、.rf-field-label → 16px
- 记录筛选页：.flt-label → 16px
- 详情页：.dt-item-name、.dt-kv-k、.dt-rsit-k → 16px
- 启动页：.sc-info-k → 16px
- 房屋列表：.housing-card-title → 16px

## 未改动
- 区块大标题：section-title 18px、sec-name 17px
- 输入框内容 14px
- 辅助说明与状态小字

## 流程与验证
- worktree：D:\repository\苏住房防汛C端-wt-font16，分支 feature/font-label-16px，提交 89f8c85，fast-forward 合 dev 并删 worktree
- 构建：npm run build:h5 成功，产物 CSS 确认 card-h3、field-block-label、.field-label 均为 16px
- 部署：本地 nginx 8095，线上拉取 CSS 校验通过；推送 origin/dev 含 89f8c85（含并行 2e2f231）
- 未跑 ref8443 像素比对 E2E（字号放大后该像素门禁不再等价）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "flood_font_16px",
  "source_extraction_id": "465f6d6427d94561ad40bb43fadcf170",
  "version": 1,
  "memory_type": "entities"
}
-->