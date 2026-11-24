# 禅道 Bug 6932
苏住房G（zhi2-web-admin）物业标准化评价「录入分值」弹窗现场图片上传位置问题，2026-11-24 完成代码改动与构建验证，实机验证与禅道回写交接给下一跳。

## 问题信息
- 类型为 codeimprovement（非 bug），禅道单地址 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6932；zt_action 无评论。
- 现象：物业标准化评价 check 评分「录入分值」弹窗中，所有评分项共用底部一个「现场图片」上传入口，而校验对每个未满分评分项提示「缺少现场图片的上传」。
- 需求：每个未满分评分项各自需要现场图片上传；缺陷截图下载到 D:\禅道附件\bug\6932\ 作为证据。

## 根因与改动
- 原实现把图片存在项目级 scoreProject.images，上传组件位于全部评分项之后。
- 改动文件 src/views/evaluation/stdEvaluation/checkRecord/detail.vue：现场图片上传移入每个评分项循环内，新增 isItemImageRequired 判定，移除原 isProjectImageRequired 相关残留。
- 按 item.row.images 初始化（而非 item.images），避免误用共享字段清空历史图片；展示侧原本已按 content.images 逐行渲染，无需改动。
- 提交校验 validateItems 会跳过「不涉及」行，因此按项要求图片不会阻塞提交；全目录 grep 无共享 images 残留引用。

## 验证与状态
- ESLint 0 error（曾有 isProjectImageRequired 删除后的悬空逗号，已修复）；改动前基线构建与改动后构建均 exit 0。
- 前端实机验证未执行（需本地 nginx 8101 验证码登录 + 测试网关切换），因此提交与禅道回写均未做（验证门未过禁止回写）。
- 交接文档 D:\plan\苏住房G\HANDOFF-CHAIN-禅道6932录入分值现场图片-hop1-20261124-1459.md；下一跳 hop2 排程投递时刻 2026-11-24 14:59:52。
- 工作区存在无关预存脏文件（flood 相关页面 + _review.json），本会话未改动。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "zentao_bug",
  "name": "zentao_bug_6932",
  "source_extraction_id": "5da7744185e4469c8abe8ffd55095b1c",
  "version": 1,
  "memory_type": "entities"
}
-->