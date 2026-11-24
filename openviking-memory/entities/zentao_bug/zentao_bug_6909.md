# 禅道 Bug 6909
苏州市房地产监测V3 登录态上传图片后缩略图 preview 404 的缺陷，2026-11-24 完成实机验证、提交推送并回写禅道 resolved/fixed。

## 问题与根因
- 登录态 upload 不落 T_APPENDIX 附件表 → preview 404；匿名链路能走通是因为匿名上传会落表
- 原方案 A：后端 upload 出参签发 previewTicket、前端零改动
- 关键发现：previewByTicket（FileController:61-73）校验票据后仍调 writePreview → isRegisteredPath 登记校验（FilePreviewServiceImpl:143），未登记一律 404，只签票据修不掉 bug
- 增补两点：票据通道豁免登记校验 + 票据绑定校验支持 `_s.jpg` 派生缩略图（bug6909 是「上传→保存前」窗口，path 为 fileThumbnailSite）

## 代码改动（4 处，JDK21 编译 EXIT=0，已提交）
- FileVo.java：新增 `previewTicket` 字段
- FileController.java：upload 签发票据（IdUtil.fastUUID() + Redis TTL 600s，先例 AppendixServiceImpl:587）；previewByTicket 改调 writeTicketPreview；新增 issuePreviewTicket；类中已注入 redisService
- FilePreviewService.java：接口新增 writeTicketPreview
- FilePreviewServiceImpl.java：实现票据免登记出流 + isTicketBoundPath 放行 `_s.jpg` 派生缩略图

## 构建环境
- common-utils 目标 Java 21，需 temurin21（JDK17 报「无效的标记: --release」）
- inputFiles.lst 含中文路径历史文件编码损坏 → 删除该模块 stale maven-status 后重试；JDK17 失败那次又写入损坏状态，再清一次
- 基线编译与改动后编译均通过（EXIT=0）

## 验证与交付
- 用户选择本地起后端验证：nacos 可达、8080/9211 空闲、nginx 8098 upstream 现成、JDK21/UTF-8 启动先例已记录
- 本地 8098 重新上传后缩略图不再显示「加载失败」，previewByTicket 返回 200，截图证据 zentao-6909\bug6909-thumbnail-ok.png
- 构建通过，version.json.gitHash=1aa3ab67e；禅道置 resolved/fixed 并指回 zhunan，评论附图 fileID 24106
- 后端 dev 提交 61e3dc4a（登录态上传签发短时效预览票据）；前端 develop/v3.0.0 提交 1aa3ab67e，父仓 gitlink 1f56ab8
- previewByTicket 仍不在网关白名单，登录态图片靠 URL 上的 token 通过；客户环境需部署后端 dev 后才生效
- 两个 Java 启动日志被进程占用未能删除，其余临时产物已清理
- 交接文档 D:\plan\苏州市房地产监测V3\HANDOFF-CHAIN-bug6909-cert-upload-thumbnail-hop2-20261124-1120.md

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6909",
  "source_extraction_id": "37c4bb039e3b40f9ab8a141a0a3ea983",
  "version": 2,
  "memory_type": "entities"
}
-->