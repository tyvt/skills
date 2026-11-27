---
audit_status: valid
last_checked: 2026-11-27T07:51:07+08:00
verdict_note: rangeTable.vue、housePosition.js-18「隆舜园」分隔符处理、prop-'position' 均命中源码，bug 锚点与根因属实。
---
# 禅道 Bug 6677
惠山二期G（zhi2-web-admin）房屋清单弹窗「房屋坐落」缺少分隔符的前端缺陷，2026-11-25 已复现、修复计划通过评审并获确认，代码待实现。

## Description
- 禅道链接 bugID=6677，附件截图 fileID 23085，画面为「物业管理区域详情 / 楼幢信息变更」中的房屋清单弹窗。
- 现象：房屋坐落显示 `隆舜园31单元101`，项目名、楼幢、单元、房号之间没有任何分隔符。
- 复现入口：物业管理 → 物业管理区域信息 → 搜索「隆舜园」→ 查看详情 → 「房屋套数」(12) 链接打开房屋清单弹窗；dev 环境为 8120 端口。
- 截图证据：`$env:TEMP\zentao-6677\reproduce.png`（登录页图形算术验证码 2026-11-25 为 `9/9=1`）。

## 根因分析
- 抓包确认后端返回 `position: "隆舜园31单元101"`，字段本身不含分隔符，前端直接渲染该字段。
- 命中组件 `property/complex/components/rangeTable.vue`：弹窗列（项目名称/权利人数/业主认证数）与截图完全一致，房屋坐落列取 `prop: 'position'`。
- 前端已定位 5 处地址拼接位置，文件与行号见交接文档第 6 节；修复需在这些位置统一补分隔符。

## 修复进度
- 2026-11-25 修复计划评审 PASS 87/100（plan_path 形式两次未被评审方读到，改为直接传 plan 文本后通过），用户已确认，approved_sha256 已回填计划 frontmatter。
- 生产代码未改动；build 基线因 watchdog 脚本参数问题未跑起来，改由下一跳换形态重跑。
- 交接文档 `HANDOFF-CHAIN-bug6677-房屋坐落分隔符-hop1-20261125-0948.md`（9 节，含 chain_id/hop/maxHops、未完成清单、验证状态、已知坑），下一跳 hop1/10，排程 id `schedule-971f721b-15ae-49bf-98bd-069b3618f161`。
- 约束：未在用户确认实机验证图前，不提交代码、不回写禅道。

## 关联
- 归属项目见「惠山二期G zhi2-web-admin」实体；产品2.0 曾有类似房屋坐落拼接记忆，本项目已按当前代码重新验证。

<!-- MEMORY_FIELDS
{
  "category": "缺陷",
  "name": "zentao_bug_6677",
  "source_extraction_ids": [
    "44e4caebbbd240e0a7d70d3b86e58a78",
    "ee98a21adb254ae989eac1c46f219118"
  ],
  "version": 1,
  "memory_type": "entities"
}
-->