# 预售方案填空式布局修复
苏州市房地产监测V3 预售方案 Tab 填空式布局改造已完成，修复价格管理（备案）Tab 重叠问题。

## 问题原因
- `zs-input` 默认带清除按钮，在 40px 窄框里会和 placeholder、相邻「月」「日」文字叠在一起
- 行高（约 27px）小于输入框高度（28px），换行时上下行挤在一起
- 「其它均价」三个字段挤在同一行，换行后更容易遮挡

## 修复内容
- 月/日输入框：去掉 placeholder，关闭 `clearable`（后面已有「月」「日」文字）
- 全局叙事输入框：隐藏清除图标，统一 `padding`，控件间距改为 `2px 4px`
- 行高：`narrative-line` 调整为 `32px`，文字与控件 `vertical-align: middle`
- 其它均价：拆成 3 行独立展示，避免一行内互相遮挡
- 数字框：`sm` 宽度略增至 64px，容纳价格数字

## 验证与归属
- 涉及文件：`src/views/presale/permit/components/PresalePlanFillForm.vue`、`PermitPlanPanel.vue`
- 所属项目：苏州市房地产监测V3；来源会话：2e82688a-7c17-45fc-82e8-25c79990e1a7；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3",
  "name": "presale_tab_fix",
  "source_extraction_id": "512a39ba2e844a0aac60c3d59941b745",
  "version": 1,
  "memory_type": "entities"
}
-->