# 图表渲染（项目专属）

绑定具体项目的组件、路径与业务约定，共 1 条。

## 泰兴小程序（1）

### m001 · echarts 定制裁剪包缺 series.line 导致折线图静默空白

🟢 踩坑 ｜ 验证于 泰兴 ｜ 距代码最后改动（2026-09-12）仅 1 天，大概率仍然有效

工单趋势图（折线）在小程序里整块空白，但柱状图/饼图/仪表盘正常。根因不在页面代码，而在图表库：项目内三份 echarts.min.js 副本（src/staff/pages/components/echarts-uniapp/、pages_benefit、pages_owner/decision）是同一个 624KB 定制裁剪包（基于 echarts 5.2.1），grep 注册标记发现 series.bar / series.pie / series.gauge 都在，唯独 series.line 不存在，于是 type:'line' 被 echarts 静默跳过（零报错），legend 无系列、yAxis 停在默认 [0,1]、zrender 里只有 xAxis 元素，全部级联空白。

诊断套路（值得复用）：通过运行时调试桥直接读运行中的 chart 实例——setOption 前后 getModel().getSeries() 是否为空、yAxis 数据范围是否仍是 [0,1]、zrender 元素树里有哪些元素；三者一起看能立刻区分「数据/配置问题」与「图表库没注册该 series」。拿不准时先在同一个 canvas 上叠加一个柱状图做对照实验。

修复与约束：改用官方 echarts 5.2.1 完整版（1MB，setCanvasCreator 兼容），旧定制包备份到 .workbuddy/backups/。echarts 5.4.1 已验证不可用于小程序（zrender 5.4 的环境检测在开发者工具里不走 wxa 分支，init 直接抛错），不要升级。放弃 5.4.1 而选 5.2.1 是硬性结论。

遗留风险：pages_benefit 与 pages_owner/decision 两份副本同样缺 line 系列，若那些页面画折线也会空白；但 pages_owner 分包已 1.65MB，换成 1MB 官方包会超 2MB 分包上限，需要做含 line 的按需定制包，改动前先评估分包体积。

配套习惯：改图表库后要重建干净包并用 grep 核对 series.line 存在、调试探针/构建标记（如 C0911）残留为 0；重建后开发者工具登录态会掉，需要重新登录。

> 来源依据（摘）：「setOption 前后 getModel().getSeries() 恒为空，yAxis 数据范围停在默认值 [0,1]，zrender 元素树里只有 xAxis 的元素」「唯独 series.line 完全不存在」「echarts 5.4.1 已验证不可用于小程序（zren…

文件：`src/staff/pages/components/echarts-uniapp/echarts.min.js`、`src/staff/pages/components/echarts-uniapp/echarts-uniapp.vue`、`src/staff/pages/statistics/index.vue`、`src/staff/api/statistics.js`

---
