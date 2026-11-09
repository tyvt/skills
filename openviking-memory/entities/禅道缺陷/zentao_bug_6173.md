# 禅道 Bug 6173
苏州市房地产监测V3 价格备案申请维护户室时页面抖动缺陷，根因为 SingleSelect.vue 自定义定位与 Element UI Popper.js 双定位机制冲突。

## 根因
- 旧修复（提交 a2f07fde0）仅在自定义 inline style 层加 1px 去抖，但 SingleSelect.vue 五个定时器 [0,32,80,160,320]ms 仍无条件调用 select.updatePopper()
- 叠加 window resize/scroll 监听与 getMaxLayerZIndex() 全表 getComputedStyle 强制同步布局，造成主线程 jank
- 自定义 position:fixed 写入与 Element UI Popper.js 每次 updatePopper() 写回 transform/top/left 互相覆盖，两套定位反复打架
- GIF 逐帧核对显示下拉最终位置稳定（23 帧底部边缘恒为 859px），证实是重排/闪动而非翻位错误

## 修复
- 对齐同目录 MultiSelect.vue，把下拉定位交回 Element UI / Popper.js 单一数据源
- 删除自定义 fixed 定位、定时器链、updatePopper() 调用与 scroll/resize 监听
- 仅在展开时用一次 rAF 补宽度与层级，值不变不写
- 教训：与第三方 popper 并存时去抖只挡自写 style 无效，必须消除第二套定位机制
- 文件 zhi2-web-admin/src/components/zs-select/SingleSelect.vue 由 169 行精简到 112 行（35 增 / 92 删）

## 验证与状态
- 单文件 eslint 退出码 0；npm run build 退出码 0；dist 含 queuePopperStyle 且无旧逻辑；nginx 8098 站点返回新代码
- worktree 分支 fix/bug-6173-select-jitter 合并回 develop/v3.0.0；并行任务 #6285 已推送远程，修复 cherry-pick 叠加其基线：子模块 f5b858bd0、父仓库 d140832
- 清理 worktree 误清空主工作区 node_modules，已用 npm install --offline 恢复，未影响源码
- 2026-11-04 由 tiany 标记解决，2026-11-09 被 lichandan 以「此现象仍存在」重开；同日后完成重开修复：对齐 MultiSelect 删除自定义 fixed 定位、定时器链、updatePopper() 调用与 scroll/resize 监听，仅展开时一次 rAF 补宽度与层级；提交子模块 f5b858bd0、父仓库 d140832 至 origin/develop/v3.0.0，nginx 8098 验证新 chunk HTTP 200；禅道 DBX 事务化回写 resolved/fixed/trunk，新增 zt_action 89291

<!-- MEMORY_FIELDS
{
  "category": "禅道缺陷",
  "name": "zentao_bug_6173",
  "source_extraction_id": "2d9610a6e14742ef900371b50ae9f06d",
  "version": 2,
  "memory_type": "entities"
}
-->