# 苏住房防汛C端移动查询H5
苏住房防汛C端移动查询 H5 前端项目，使用 Git 在 dev 分支上开发、同步与推送。

## 仓库与分支
- 开发分支为 dev，远端 dev 持续有他人提交（2026-11-15 远端比本地多 1 个提交），提交前需先同步再推送。
- 仓库含子模块，提交推送前需核对仓库与子模块状态。

## 关键文件
- home/index.vue：首页文件，2026-11-15 同步远端时与远端更新发生冲突，需手动合并并同时保留远端新内容与骨架屏改动。
- .env.test：本地测试环境配置文件，不应包含在提交中。
- 动态页面骨架屏改造相关文件为本轮改动范围，提交时只暂存这些明确文件，其余工作区改动保持隔离。

## 进展
- 2026-11-15 用户要求提交并推送骨架屏改造相关代码；同步过程因未暂存改动被拒后改用明确文件清单暂存，冲突仅出现在 home/index.vue。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "project",
  "name": "suzhufang_h5",
  "source_extraction_id": "eb5febd086e0448dbab864243fc6799f",
  "version": 1,
  "memory_type": "entities"
}
-->