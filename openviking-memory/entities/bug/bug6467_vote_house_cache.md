# 禅道Bug6467表决户室卡顿修复
惠山二期G 项目禅道 Bug #6467：表决选择户室列表视图惰性扁平化去卡顿，2026-11-11 提交修复但测试反馈未生效，已定位缓存问题。

## 提交与推送
- 子模块 zhi2-web-admin 分支 develop/v2.6.2-huishan 提交 c74390e3a（fix(autonomy): 表决选择户室列表视图惰性扁平化去卡顿(#6467)），仅改 decisionRangeBuildingSelectMixins.js
- 父仓库 惠山二期G 分支 develop/v2.6.2-huishan 提交 d6df0b5（chore(submodule): 更新指向 c74390e3a）
- 双仓库均推送，本地=远端 SHA：子模块 c74390e3a02be80f2dfcff4876b00a57ba6e7a57，父仓库 d6df0b571c8435f39a2bb269491ab3e59d4a7f2b
- 禅道 Bug #6467 前轮已置已解决（action 91037）；临时目录 .tmp-bug6467/ 未提交

## 测试反馈与定位
- 2026-11-11 测试反馈未修复：点击楼幢筛选右侧房屋数据无变化
- 根因：户室列表被做成所有楼幢一份缓存，点楼幢不换数据
- 决定：改为仅展示当前选中楼幢房屋，按楼幢缓存，避免全量重算

## 归属
- 所属项目：惠山二期G（含 zhi2-web-admin 子模块）
- 涉及文件：decisionRangeBuildingSelectMixins.js


<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "bug6467_vote_house_cache",
  "source_extraction_id": "9267aef47c9249b899e8ede3cc002af0",
  "version": 1,
  "memory_type": "entities"
}
-->