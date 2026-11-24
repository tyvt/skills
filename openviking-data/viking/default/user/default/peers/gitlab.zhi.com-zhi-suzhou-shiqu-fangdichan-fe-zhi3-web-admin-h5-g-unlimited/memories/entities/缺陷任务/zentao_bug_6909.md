# 禅道Bug 6909 项目证书附件缩略图「加载失败」
房产管理系统项目证书管理新增证书上传附件，上传成功却回显「加载失败」、保存后图片正常的回归缺陷；2026-11-24 定位为 2026-11-23 MinIO 鉴权改造引入，hop4 补齐 nginx 反代与前端票据透传两处修复点，当日完成修复交付。

## 现象与范围
- 路径：项目管理 → 项目证书管理 → 建设工程规划许可证，新增证书上传附件；前端在 src/views/projectManagement/certificate/planLic/，外层 StandaloneAppendixField、缩略图 AppendixFileThumbnail
- POST /file/file/upload 返回 200 成功，缩略图 GET /file/file/preview 返回 404 并显示「加载失败」（Element UI el-image 默认失败文案）；保存后图片正常显示
- 2026-11-24 本地实机复现，重新打开表单回显缩略图同样 404

## 根因
- FilePreviewServiceImpl 要求预览已在 T_APPENDIX/T_ATTACHMENT 登记，未登记一律 404；登录态新增上传只写 MinIO 不落表（11-24 无登记行），匿名链路因落表才能走通
- 回归来源 2026-11-23「MinIO越权问题修复」（嫌疑提交 30e91add8），FilePreviewServiceImpl 位于 origin/dev c5d2eedf；ImageUpload 注释已提示主 preview 通道按登记校验会 404
- 登录态 FileVo 原无预览票据字段，票据只在匿名上传签发；handleUploadSuccess 只取 res.data?.fileSite || res.data?.url
- hop4 新证：nginx 8098 把 upload 反代到远程 58.210.252.230:9002（sites-available/苏州市房地产监测V3.conf），已改回本地 8080 并 reload；证书页 v-model 只存路径字符串，回写丢弃 previewTicket，缩略图仍走未登记 preview

## 排查证据
- 后端本地克隆停在 11-20，fetch 后才见 11-23 上线的 preview 端点；证据链为禅道截图 D:\禅道附件\bug\6909\file24058_*.png、前端代码链、T_APPENDIX 取数（11-24 零新增）
- 网关侧日志无上传异常；Nacos common-gateway.yml 白名单 /file/file/** 明文放行，字段不是加密层丢弃；直连 9211 与 8080 都带回 previewTicket，仅经 8098 丢失
- jar 字符串计数 0 与源码对不上，改用 class 字节码核对，源码与 11:29 jar 均含签发方法；本地 Nacos 实例 192.168.1.129:9211，验证码 session/Redis key 需一致
- 客测环境 58.210.252.230:9002，账号 zsbase/ZS001Aa!，2026-11-24 登录并导航到项目管理 → 项目证书管理；编排器 op:"full" 派只读探索两次失败，转主控 path 窄 grep（≤2 次）

## 修复与交付
- 计划 2026-11-24 过审并经用户确认（_review.json 曾被别的流程写成非 entries 格式，备份后改回）：映射键统一 fileSite，范围只覆盖上传后、保存前回显，刷新与已保存附件仍走登记预览
- 缩略图改走 GET /file/file/previewByTicket（前端源码本有「有 ticket 就走 previewByTicket」分支）；后端 FileVo 加 previewTicket、upload 用 IdUtil.fastUUID()+Redis TTL 600s 签发、previewByTicket 免登记出流并放行 _s.jpg 派生缩略图；前端 StandaloneAppendixField 补 4 处票据透传，eslint 无新增问题
- 2026-11-24 本地 8098 重新上传后缩略图正常、previewByTicket 返回 200；构建通过（12:21 dist 含改动），version.json.gitHash=1aa3ab67e
- 提交与回写：后端 dev 61e3dc4a、前端 develop/v3.0.0 1aa3ab67e、父仓 gitlink 1f56ab8；禅道置 resolved/fixed 并指回 zhunan，评论附图 fileID 24106
- 遗留：previewByTicket 仍不在网关白名单，登录态图片靠 URL 上的 token 通过，客户环境需部署后端 dev 才生效；两个 Java 启动日志被进程占用未能删除；交接文档在 D:\plan\苏州市房地产监测V3\（hop2 排程 2026-11-24 11:25，schedule-108b62ef）

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6909",
  "source_extraction_id": "37c4bb039e3b40f9ab8a141a0a3ea983",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 4,
  "memory_type": "entities"
}
-->