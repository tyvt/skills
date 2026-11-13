# peoIdcardValida 人证比对高拍仪组件
宿迁存量房 FE 项目中负责人证比对弹窗高拍仪初始化的 Vue 组件。

## 位置与归属
- 模块路径：src/views/stokeRoomOnlineSignSys/contMa/brokContSign/brokContSignInfo/ 下的 peoIdcardValida.vue
- 全局共用组件：src/components/peoIdcardValida/peoIdcardValida.vue（逻辑相同）
- 所属项目：宿迁存量房（gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited）

## 功能与协议
- 通过 WebSocket ws://127.0.0.1:12345 与本机高拍仪客户端通信，使用 QWebChannel SDK 握手
- 调用 html_loaded('faceDetect_two') 打开双摄人脸，get_actionType('closePriVideo') 关闭主摄像头
- 设备消息经 sendPrintInfo 返回；视频帧经 send_subImgData 推送，填充 secondImg 预览

## 已知缺陷与修复
- 禅道 Bug 6538：高拍仪初始化失败，实际为 loading 遮罩仅在收到 send_subImgData 帧时清除，该机型（S620A3DR）不出帧导致界面卡死
- 身份证读取与人证比对走 sendPrintInfo，不依赖视频帧，设备实际可用
- 修复：init() 握手成功后即置 loading=false，视频区空时显示占位；提交 be97d184 至 suqian-all-cunliangfang-dev-v1.0.0（2026-11-12）
- 2026-11-12 17:01-17:02 用户贴出控制台日志，确认本修复已生效：步骤4 握手成功撤销遮罩、步骤5 收到摄像头画面、身份证读取成功、人证比对成功 1
- 同源同类缺陷另见于 sign_video.vue（买受方视频签字弹窗），该组件于 47ab527e 修复；两处修复均已推送 origin/suqian-all-cunliangfang-dev-v1.0.0

<!-- MEMORY_FIELDS
{
  "category": "宿迁存量房前端",
  "name": "peoIdcard_valida",
  "source_extraction_id": "958ac1b1dbf8447d85e7ed3e89f70cdf",
  "peer_id": "gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->