# 人脸识别副摄像头打不开修复
cunliangfang 项目（fe-zhi0-web-admin-h5-g）人证比对与视频签字页重启后副摄像头无画面、视频签字一直加载，根因为副视频流从未被打开。

## 现象
- 人证比对页（peoIdcardValida.vue）副头无画面，视频签字页（signVideo.vue）副画面空白且 loading 卡死。
- 厂商 SDK 示例 `indexDouble.html` 第二个摄像头同样无画面，须手动点「打开副视频」才有图，证明是设备/客户端环境问题而非 Vue 业务代码本身。

## 根因
- `html_loaded("faceDetect_two")` 仅初始化控件，不会自动打开副摄像头视频流。
- 让副头出图须调 `dialog.devChanged("subDev_:<副头设备名>")`（即「打开副视频」按钮触发），之后才推送 `send_subImgData` 帧。
- 原 Vue 代码只调 `html_loaded` + `closePriVideo`，从未调 `devChanged("subDev_:...")`，故该机器客户端副头不推帧。

## 修复方案
- 在 `sendPrintInfo` 监听设备回 `subDevName:USB Camera RGB` 后主动调 `devChanged("subDev_:" + 副头设备名)` 打开副视频流（对齐官方示例）。
- `peoIdcardValida.vue` 与 `signVideo.vue` 均加 `subVideoOpened` 标志防重复打开，在 init/handleClose 重置。
- 提交 3965a593 已推送，`npm run build` 0 致命错误，禅道 6538 已追加根因说明。

## 验证与归属
- 验证证据：extracted source=gitlab project=fe-zhi0-web-admin-h5-g
- 涉及文件：peoIdcardValida.vue、signVideo.vue
- 所属项目：fe-zhi0-web-admin-h5-g（cunliangfang）；来源会话：2026-11-12 调试；代码基线：commit 3965a593
- 部署注意：修复改的是打开副视频流逻辑，须重新部署到 8991 站点复测；若仍无画面则判定高拍仪客户端/driver 问题需厂商排查。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "face_detect_sub_camera_open",
  "source_extraction_id": "2f39866d0c624cfba28d6e0557e1f291",
  "version": 1,
  "memory_type": "entities"
}
-->