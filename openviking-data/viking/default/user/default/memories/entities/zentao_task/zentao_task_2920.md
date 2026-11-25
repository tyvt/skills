# 禅道任务 2920
禅道任务 2920：苏住房报事报修工单提交与处置支持防伪水印，业主端「我要报修/我要报事」强制拍照并叠加水印，覆盖 sfb、H5(main2.1)、mp 三端；2026-11-25 完成新样式实机验证、新增缩略图回显水印需求并改码，已多次 P0 硬交接，尚未提交/回写。

## 需求要点
- 任务编号 2920，链接 http://zentao-biz.zhi.com/index.php?m=task&f=view&id=2920；标题【苏住房】报事报修工单提交和处置需支持水印；关联需求 1552
- 业主端「我要报修」「我要报事」强制拍照并叠加防伪水印；工单提交端与处置端都要支持
- chain_id=禅道2920水印三端；水印内容为「yyyy-MM-dd HH:mm:ss 时间 + 详细地址」；定位失败显示“定位失败”但时间水印必须生成；未授权弹窗引导
- 完成判定：实机截图→用户确认→提交推送→回写禅道 2920（附图）→产物清零

## 代码与样式
- 覆盖三分支：苏服办 sfb、H5 main2.1、小程序 mp；三端共用同一水印函数
- 样式已审核：watermark.js 去掉底部黑条，灰字（#B0B0B0、字号 30、加粗+轻阴影）直接叠加在图片底部画面内；并按实际图片区域底边定位文字，避免落入等比居中的上下黑边
- 新需求（用户 2026-11-25 确认）：缩略图也要显示带水印图、需改代码；根因 uni-file-picker.vue:406 选文件时组件自塞本地 blob 项进内部 this.files（缩略图渲染源），:412 才 emit select，setValue:321-327 的 v-model 更新使缩略图显示原图，水印只合成到上传服务端的文件
- 改法已落盘：ZsUploader.vue 4 处改动——加 ref、nextTick 后按 uuid+index 精确改内部 files 项 url 为服务端水印图 URL 并 $forceUpdate，仅 cameraWatermark=true 生效；uuid 来自 utils.js:89 get_file_data
- 计划 session-02d8719d5709.md（approved/human_confirmed，sha256=72309a92…），2 轮审核 PASS（0 P0，84→82）；改前基线 build 与改后 H5 build 均 EXIT=0

## 验证记录
- H5 早期实机（2026-11-25）：「现场拍照」红字提示在、上传计数 1/9、capture="camera" 强制相机；旧画布水印 19:33:11（定位失败）/19:35:08（定位成功）
- 旧样式曾把合成水印图放进上传响应，表单第 3 张缩略图显示水印（竖版图底部黑条），裁切放大展示
- 新样式实机验证成功：定位成功灰字「时间 2026-11-25 19:59:42 / 位置 江苏省苏州市姑苏区验证路100号」、定位失败灰字「时间 2026-11-25 20:00:11 / 位置 定位失败」，均压在 test-photo2.png 浅蓝底画面上、带轻阴影、无黑边
- 曾误用 test-photo.png（落地页截图 136KB）致画布证据无效，换 test-photo2.png 重做后画布 69KB
- 证据图在 $TEMP/zentao-2920/：watermark-success-20261125-200002.png、watermark-fail-20261125-200023.png（750×1334 RGBA、自检五项通过）；早期图 H5-watermark-20261125-193404.png、watermark-fail-20261125-193404.png、watermark-success-20261125-193508.png、H5-upload-watermark-20261125-193803.png、watermark-zoom-20261125-194200.png

## 交接与状态
- 环境：CDP 53449 + 静态服务 18765 存活可复用；session zs2920cdp3 附着 t2 报修页
- 交接链：hop2 文档 HANDOFF-CHAIN-禅道2920水印三端-hop2-20251125-1956.md（9 节、6 项未完成，schedule-d2d6f340，19:55:35）；hop3 文档 HANDOFF-CHAIN-禅道2920水印三端-hop3-20251125-2059.md（9 节）
- 已排 hop4：schedule-37de3c5a…，20:59:45 投递，target=new
- 未完成（移交 hop4）：部署新 dist 到 18765 → agent-browser 实机验缩略图（成功/失败/多图/失败降级）→ 截图入会话+用户确认 → mp 提交推送+三端同步构建 → 禅道 2920 回写附图 → 产物清零
- maxHops=10 与 2026-11-23 P0「交接链路禁止设最大跳数」冲突，按用户指示以交接文档为准；hop<10 且未完成项非空需续接

<!-- MEMORY_FIELDS
{
  "category": "zentao_task",
  "name": "zentao_task_2920",
  "source_extraction_id": "937b0cc2508f4478aba37490f6bd8f5b",
  "version": 3,
  "memory_type": "entities"
}
-->