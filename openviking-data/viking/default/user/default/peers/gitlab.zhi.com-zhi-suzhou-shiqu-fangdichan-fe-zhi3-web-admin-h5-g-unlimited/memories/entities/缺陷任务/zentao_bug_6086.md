# 禅道Bug 6086 价格备案参数维护起始时间控件类型错误
房产管理系统价格备案参数维护详情页「起始时间」用了日期区间选择控件，但业务上应为单个日期选择器。

## 根因
- 价格备案参数维护详情页（presale/priceRecordParam）「起始时间」用 zs-date-picker + type="datetime"，弹层呈日期+时间/区间样式
- 业务上起始时间只是单个日期，控件类型用错；截图左侧菜单「价格备案参数维护」、按钮「同步」区均在该详情页
- 改动文件 src/views/commercialHousingSales/priceFiling/priceParameters/detail.vue，与截图界面元素一致
- 数据库实测 T_SA_PRICE_RECORD_PARAM.BEGIN_DATE 为 datetime 且时间恒为 00:00:00

## 修复方案
- 起始时间：type="datetime" → type="date"，value-format → yyyy-MM-dd（单个日期选择器）
- detailCallback：回填时把后端 datetime 字符串（如 2026-10-14 00:00:00）截断为 yyyy-MM-dd，保证编辑态正确显示
- beforeSaveHook：提交时补齐 00:00:00，保持后端 datetime 契约不变
- 终止时间（endDate）为 disabled、由后端写入，本 bug 未涉及，保持原样未改

## 验证与交付
- ESLint：0 error（11 条为存量 el-form-item/el-select 告警，非新增）
- npm run build 成功（version 2.6.1，buildTime 2026/11/3 13:22:39，gitHash 52045369c）
- 子模块 zhi2-web-admin b5bcd6b1e（52045369c..b5bcd6b1e，develop/v3.0.0）已推送
- 父仓库 gitlink 5eadef1（27465c3..5eadef1，develop/v3.0.0）已推送
- nginx 8098 站点 root 即 D:/repository/苏州市房地产监测V3/dist，/version.json 已返回新构建，修复已上线
- 禅道回写 resolved/fixed/resolvedBuild=trunk，resolvedBy=tiany，assignedTo=zhunan（回原提交人），已插入 resolved action，事务内已复核提交
- 仅暂存本次改动文件；工作区既有 docs/flowable/version.json 等未提交改动未夹带

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6086",
  "source_extraction_id": "b2be05806f46444183f213ff3394ad03",
  "version": 1,
  "memory_type": "entities"
}
-->