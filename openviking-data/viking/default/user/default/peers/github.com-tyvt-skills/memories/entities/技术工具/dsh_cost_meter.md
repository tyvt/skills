# dsh cost-meter 插件
DSH 的 token 成本监控插件，对每步未命中/输出/成本发出软提醒，代码在 D:\repository\skills\dsh\cost-meter，运行时经 ~/.dsh/cost-meter 符号链接加载。

## 机制与配置
- index.js:20 声明 `export const inject = ['tools']`；此前缺失导致 "cannot get property 'tools' without inject" 启动报错，修复提交 99a0e514，selftest 通过。
- 默认阈值：stepReminderThreshold=120、askUserLongWaitMs=300000、perStepUncachedBudget=10000。
- 只有每步未命中与每步输出守卫，没有每步 cacheRead/上下文增长守卫。
- 仓库内 dsh/cost-meter/cordis.patch.yml 有未提交改动，新增 stepReminderThreshold 与 askUserLongWaitMs 的 bundle 配置。

## 部署
- ~/.dsh/cost-meter 是指向仓库的符号链接（junction），盘上文件即最新代码。
- 插件改动需重启 DSH Web 才生效，运行进程持有启动时加载的旧 JS。

## 实测
- 2026-11-16 在 45 步的 session 71218986 中 stepGuardHit=0、askWaitHit=0；45 步低于 120 阈值，步提醒按设计不会触发，累计 153k 成本提醒曾触发。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术工具",
  "name": "dsh_cost_meter",
  "source_extraction_id": "32c920e17f2d469aa04dfc739405acc7",
  "version": 1,
  "memory_type": "entities"
}
-->