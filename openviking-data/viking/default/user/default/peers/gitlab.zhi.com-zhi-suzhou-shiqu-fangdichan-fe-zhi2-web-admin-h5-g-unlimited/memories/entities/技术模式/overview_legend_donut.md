
# 购房概览面板图例与饼图布局修复
BuyerOverviewPanel.vue 付款方式结构图例存在文字数字间距过大、饼图偏小、数值百分比重叠问题，最终用内联样式固定像素解决，因该项目原子类生成不全。

## 根因
- 图例容器占满剩余宽度，flex 左打包致「名称+数值+百分比」黏连且右侧留白，或 grid `1fr` 名称列把数值推最右造成大间隙
- 饼图容器 `w-[56%]` 居中饼图，右侧留白造成饼图与图例间大间隙；半径 52-76% 偏小
- 窄化图例区后 `w-20` 名称 + `w-12` 数值 + 百分比超出宽度，导致数值与百分比重叠
- **关键根因**：该项目（zhi2-web-admin）的 UnoCSS/Tailwind 对 `w-[84px]`、`gap-x-3`、`gap-y-5`、`aspect-square`、`h-full` 等原子类生成不全，类未生效导致宽度/间距/尺寸改动"看起来没改好"，文字数字紧贴、饼图被压小

## 修复方案（最终生效版）
- 放弃任意值原子类，改用语内联 `style` 固定像素，确保渲染
- 饼图容器：内联 `style="width:172px;height:172px"`（不用 aspect-square/h-full），radius 提至 66%-94% 放大环形
- 图例每行：色点(10px) + 标签(内联 width:88px) + 数值(内联 width:54px 右对齐) + 百分比(内联 width:54px 右对齐)，列间 margin 12px、行间 row-gap 20px（均内联）
- 「环形+图例」整组用 inline-flex 居中，左右留白对称
- 新增「公积金贷款」项：data.raw.js 的 X9 每月补 payFund 字段（商业贷款约 0.3 倍，最新月 202611=790 人），组件 total/payList/pieOption 加入紫色 #8b5cf6 第四项

## 涉及文件
- zhi2-web-admin/src/views/property/marketMonitor/components/BuyerOverviewPanel.vue
- zhi2-web-admin/src/views/property/marketMonitor/assets/data.raw.js

## 验证与归属
- 验证：本地 Vite dev :8081 HMR 截图确认间距清晰、列对齐、饼图饱满（172px）；改动保留工作区未提交
- 所属项目：门户 zhi2-web-admin；worktree D:\repository\门户\zhi2-web-admin-wt-payfund 分支 feature/marketMonitor-payfund
- 来源会话：2026-11-04 调试会话（含本轮迭代）


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "overview_legend_donut",
  "source_extraction_id": "074d316248104bb7b1d35c56ae13c0f2",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->