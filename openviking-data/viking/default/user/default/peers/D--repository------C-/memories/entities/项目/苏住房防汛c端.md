# 苏住房防汛C端
一个基于 uni-app Vue3 的 H5 项目，工作目录为 D:\repository\苏住房防汛C端，早期在 master 分支处于 untracked 状态。

## 目标与范围
- 改造目标是从 demo 数据切换到真实后端联调。
- 真实后端端到端测试的写作用域仅限 tests/e2e/remote.spec.ts 与 playwright.config.ts。
- 不修改 flows.spec.ts 和其它源码。
- 页面改造由同事 fe-pages 负责；store 已落地在 src/stores/flood.ts。
- 2026-11-03 task-2 已完成：新增 tests/e2e/remote.spec.ts、修改 playwright.config.ts，5 个场景连续两次 3/3 通过；配置与登录注入细节见技术模式卡 zhi2_flood_e2e。

## 验证场景
- 打开站点进入工作台，点击汛中巡检或汛前/汛后，确认模板检查项至少一个字段可见。
- 在检查页输入关键字搜索并选中物业管理区域。
- 填入数值项 8 后提交，并确认提交成功或工单编号提示。
- 在历史记录看到刚提交记录，并在详情中看到检查项和小区名。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "653d60f418a84a4682e4f52f297c8245",
  "peer_id": "D--repository------C-",
  "version": 2,
  "memory_type": "entities"
}
-->