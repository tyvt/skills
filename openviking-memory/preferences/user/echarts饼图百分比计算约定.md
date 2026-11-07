- 业主投票详情页（mfap_MfapOwnerVoteDetail.js、mtpl_MtplOwnerVoteDetail.js）饼图百分比应使用自定义 formatPiePercent(value, total, digits=2) 四舍五入保留两位小数，替代依赖 data.percent，避免 ECharts 默认截断导致 69.56% 之类显示误差
- 修改涉及 tooltip.formatter、label.formatter、label.normal.formatter，去掉 data.percent 依赖
- 涉及文件：EstateManagement-Park/src/main/webapp/mfap/js/mfap_MfapOwnerVoteDetail.js、EstateManagement-Park/src/main/webapp/mtpl/js/mtpl_MtplOwnerVoteDetail.js；所属项目：0
- 来源会话：e4d03a1c-d0d5-4abe-adb4-7410fadeb65a

## 验证与归属
- 验证证据：extracted source=cursor project=0


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "echarts饼图百分比计算约定",
  "source_extraction_id": "363730d997e0453ab7e8b82151b53e66",
  "version": 1,
  "memory_type": "preferences"
}
-->
