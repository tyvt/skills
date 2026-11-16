# 苏住房防汛C端移动查询H5
苏住房防汛C端的信息查询移动端 H5 页面，当前在做数智页面的像素级还原与 e2e 视觉验收。

## 页面结构
- 区域 chips 参考稿为「全市数据」+ 5 个区 + more_horiz 图标。
- 参考 DOM 常量 REF_SEC0 位于 ref-assets.ts 第 5 行，本身即「全市数据」+ more_horiz 的完整参考结构。
- 关键数据卡（专业化等新标签）不在 API_STAT_LABELS 中，属纯静态内容，无需 mock。

## 数据与接口
- 需 mock 的是 sec2/3/5 的 11 个 API 标签值。
- 区域 chips 由动态函数 regionChipsHtml() 生成，activeChip 默认值应为「全市数据」。
- 「满意度占比」参考稿显示 97.2%（带 % 后缀），当前 fmtVal 的数字渲染路径会丢掉 %。
- getRegionList 的解包方式决定 mock 数据形状。

## 测试与构建
- e2e spec 在 openMine 的 goto 之前注册 5 个接口 mock。
- 长任务构建需可观测：优先 watchdog 脚本，脚本缺失时用 run_in_background + 定期 job_output，gate 要求时走编排器 op:「full」并带进度日志。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "项目",
  "name": "苏住房防汛C端移动查询H5",
  "source_extraction_id": "c63c75c141ce4e568af1757b73666f53",
  "version": 1,
  "memory_type": "entities"
}
-->