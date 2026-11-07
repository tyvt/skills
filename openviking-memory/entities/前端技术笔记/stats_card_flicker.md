# 表格加载后统计卡片闪烁
列表页表格数据加载完成后，页面上半部分统计卡片会「闪烁」一下。

## 现象
- 表格渲染后页面总高度增加，右侧滚动条出现，.app-main 可用宽度缩小约 15px
- 上半部分 width:20% 布局的统计卡片随之变化，视觉上出现闪烁

## 根因
- 卡片样式写 transition:all 0.3s，宽度这一布局属性也参与过渡动画，5 张卡片同时做 300ms 宽度过渡

## 解决方案
- 把 transition:all 收窄为只过渡 hover 需要的属性（transform、box-shadow），禁止布局属性参与过渡——通用套路，统计卡片/卡片组写 transition:all 都有此隐患
- 给 zs-table 传 :tableTr="queryParams.pageSize" 预留行高，减少表格加载前后高度突变、降低滚动条出现概率
- 若仍有轻微抖动，可在全局布局加 scrollbar-gutter:stable 兜底滚动条占位

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 2fc8efe8（2026-05-21）用户报「表格加载完后页面上半部分会闪烁」；结论定位为滚动条出现使 .app-main 宽度缩 ~15px + width:20% 卡片 + transition:all 0.3s 触发布局过渡；改动为收窄 transition 属性并给 zs-table 加 :tableTr 预留 10 行高度
- 涉及文件：zhi2-web-admin/src/views/benefit/alert/index.vue、src/components/zs-table/zs-table.vue、src/mixins/listMixins.js
- 所属项目：园区物管2.0；代码基线：5a288f142 之后的 fc994977f；来源会话ID：2fc8efe8-20f3-454c-8e49-fdfcaf343a87

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "stats_card_flicker",
  "source_extraction_id": "5b26d684e1994d57a0497c243d77061a",
  "version": 1,
  "memory_type": "entities"
}
-->