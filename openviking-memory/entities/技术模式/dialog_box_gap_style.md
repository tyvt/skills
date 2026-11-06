# 新增合同弹窗左右栏间距收紧
苏州市房地产监测V3 的 zhi2-web-admin 调整「新增合同」弹窗左右栏空白样式。
## 改动内容
- 原左侧 margin-right:24px 与右侧 padding-left:20px 叠加约 44px
- 改为 dialog-box 使用 gap:16px（与详情页常用区块间距一致），去掉左侧 margin-right 和右侧 padding-left
- 若仍觉宽可把 gap 调成 12px
## 涉及文件与归属
- 涉及路径：d:\repository\苏州市房地产监测V3\zhi2-web-admin 等相关视图与配置
- 所属项目：苏州市房地产监测V3；来源会话ID：aa2afcf7-1398-4cdf-93b4-30183eff923a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_box_gap_style",
  "source_extraction_id": "f5ca0326c543440ba2dbc7a77ff0f348",
  "version": 1,
  "memory_type": "entities"
}
-->