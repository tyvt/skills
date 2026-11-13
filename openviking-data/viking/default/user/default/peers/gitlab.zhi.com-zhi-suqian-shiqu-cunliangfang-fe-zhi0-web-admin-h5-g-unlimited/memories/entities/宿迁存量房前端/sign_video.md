# sign_video 视频签字高拍仪组件
宿迁存量房 FE 项目中负责「买受方视频签字」弹窗高拍仪视频预览的 Vue 组件。

## 位置与归属
- 组件路径：src/components/signVideo/signVideo.vue
- 使用方：brokContSignInfo.vue（买受方视频签字弹窗，约 1036-1050 行引用 signVideo 组件）
- 所属项目：宿迁存量房（gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited）

## 功能与协议
- 通过 WebSocket ws://127.0.0.1:12345 与本机高拍仪客户端通信，使用 QWebChannel SDK 握手
- 调用 html_loaded('faceDetect_two') 打开双摄人脸，get_actionType('closePriVideo') 关闭主摄像头
- 视频帧经 send_subImgData 推送，填充 secondImg 预览区；this.socket 实际未赋值（数据无 socket 字段），每次打开重初始化

## 已知缺陷与修复
- 与禅道 Bug 6538 同源同类缺陷：loading 遮罩（「正在加载...」）仅在收到 send_subImgData 视频帧时清除；现场机型 S620A3DR / USB Camera RGB 不出帧导致界面永久卡死
- 该机型设备实际可用，只是不出视频流，故界面卡死但功能可点
- 修复（提交 47ab527e，2026-11-12）：QWebChannel 握手成功（html_loaded + closePriVideo）后即置 loading=false 撤掉遮罩；secondImg 为空时显示「摄像头画面加载中…」占位
- 同项目 peoIdcardValida.vue 有相同根因，已于 be97d184 修复

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited",
  "category": "宿迁存量房前端",
  "name": "sign_video",
  "source_extraction_id": "958ac1b1dbf8447d85e7ed3e89f70cdf",
  "version": 1,
  "memory_type": "entities"
}
-->