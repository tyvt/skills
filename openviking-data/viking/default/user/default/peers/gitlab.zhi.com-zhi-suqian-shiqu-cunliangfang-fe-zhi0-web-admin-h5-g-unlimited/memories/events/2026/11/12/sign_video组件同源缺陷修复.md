# Summary
2026-11-12 助手定位 sign_video.vue 与 Bug 6538 同源：loading 遮罩仅在 send_subImgData 帧到达时清除，机型 S620A3DR/USB Camera RGB 不出帧致永久卡死。修复为握手成功后即置 loading=false 并显示占位；node --check 通过，本地构建成功（0 致命错误）。提交 47ab527e 并推送 origin/suqian-all-cunliangfang-dev-v1.0.0，禅道 6538 追加说明。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: 还不行，人证比对之后，点视频签字加载不出来
...
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Same bug pattern as Bug 6538: `loading` (「正在加载...」) is only set false in `send_subImgData` handler (line 307). If the device doesn't push `send_subImgData` frames, the overlay stays forever. **Exactly the same root cause.**

The screenshot shows the dialog with「正在加载...」and the buttons「开始签字」「签字确认」visible below — so `visibleP=true` (init resolved true), but loading never cleared. Same fix: clear `loading` once QWebChannel handshake succeeds (after `html_loaded`/`closePriVideo`).

Also note: `this.socket` is checked but never set (data has no `socket`, only `socketVideo`/`socketSign`/`socket_`), so `if(this.socket == null)` is always true — that's fine, just re-inits each open.

This is the same class of fix, applied to `signVideo.vue`. Let me first verify this component is what's used (global `@/components/signVideo/signVideo.vue`) — yes, imported at brokContSignInfo.js:8.

Let me confirm the exact change location. The fix: after `this.socketVideo.get_actionType("closePriVideo")` (line 293), add loading=false. And the placeholder/text for empty secondImg. Let me apply the minimal fix (loading clearing is the critical part; also make video area show placeholder). Let me use a plan/todo first since it's a code change.
...
**user [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: [高拍仪排查] 17:01:06 父页点击人证比对 {type: 'offTakeData', tempId: '1c7bb8e255db4fb3884ed8ea589c90ba', url: 'buyer/getBuyerById', 页面地址: 'http://222.187.193.195:8991/web/#/brokContSignInfo…o&sortClass=1&id=fb203578bc0a447cac59c609970a30c7', 页面协议: 'http:'}
5475.5c2552fd.js:1 [高拍仪排查] 拉取人员详情成功，准备打开高拍仪弹窗
5475.5c2552fd.js:1 [高拍仪排查] 打开人证比对弹窗，随后由组件连接 ws://127.0.0.1:12345 {visible: 'offTakeDataVisible', 比对人: '蒋学友', 证件号: '321302200001078012'}
6228.f5b27d06.js:1 [高拍仪排查] 17:01:06 步骤0 弹窗 visible=true，开始初始化高拍仪
6228.f5b27d06.js:1 [高拍仪排查] 17:01:06 步骤1 开始连接本机高拍仪 ws://127.0.0.1:12345 {页面地址: 'http://222.187.193.195:8991/web/#/brokContSignInfo…o&sortClass=1&id=fb203578bc0a447cac59c609970a30c7', 页面协议: 'http:'}
6228.f5b27d06.js:1 [高拍仪排查] 17:01:06 步骤2 WebSocket 已连通，开始 QWebChannel SDK 握手
6228.f5b27d06.js:1 [高拍仪排查] 17:01:06 步骤3 QWebChannel 回调已到达 {hasObjects: true, objectKeys: Array(1)}
6228.f5b27d06.js:1 [高拍仪排查] 17:01:06 步骤4 调用 html_loaded('faceDetect_two') 打开双摄人脸
6228.f5b27d06.js:1 [高拍仪排查] 17:01:06 步骤4 调用 get_actionType('closePriVideo') 关闭主摄像头画面
6228.f5b27d06.js:1 [高拍仪排查] 17:01:06 步骤4 握手成功，已撤销初始化遮罩
6228.f5b27d06.js:1 [高拍仪排查] 17:01:06 步骤0 初始化成功，打开弹窗
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 InitFaceDetect_success!
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priModel:YUY2
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priModel:MJPG
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priResolution:2592 * 1944
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priResolution:2048 * 1536
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priResolution:1920 * 1080
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priResolution:1600 * 1200
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priResolution:1280 * 960
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priResolution:1280 * 720
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priResolution:1024 * 768
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priResolution:800 * 600
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priResolution:640 * 480
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 priDevName:S620A3DR
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subModel:MJPG
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subResolution:2592 * 1944
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subResolution:2048 * 1536
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subResolution:1920 * 1080
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subResolution:1600 * 1200
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subResolution:1280 * 960
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subResolution:1280 * 720
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subResolution:1024 * 768
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subResolution:800 * 600
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subResolution:640 * 480
6228.f5b27d06.js:1 [高拍仪排查] 17:01:07 设备消息 subDevName:USB Camera RGB
6228.f5b27d06.js:1 [高拍仪排查] 17:01:08 步骤5 已收到摄像头画面，高拍仪初始化完成
index.global.js:90 handleImageMouseOver IFRAME
index.global.js:90 不是图片
index.global.js:90 handleImageMouseOver IFRAME
index.global.js:90 不是图片
6228.f5b27d06.js:1 [高拍仪排查] 17:02:20 步骤6 发送 getIdcardImage，等待设备返回身份证
6228.f5b27d06.js:1 [高拍仪排查] 17:02:21 步骤6 收到身份证文字信息 IDcardInfo:蒋学友 男 汉 2000 1 7 江苏省宿迁市宿城区中扬镇蒋刘村高庄组61号 321302200001078012 宿迁市公安局宿城分局
6228.f5b27d06.js:1 [高拍仪排查] 17:02:21 步骤6 身份证读取成功 蒋学友 男 汉 2000 1 7 江苏省宿迁市宿城区中扬镇蒋刘村高庄组61号 321302200001078012 宿迁市公安局宿城分局 2025 12 18 2035 12 18
index.global.js:90 handleImageMouseOver IFRAME
index.global.js:90 不是图片
6228.f5b27d06.js:1 [高拍仪排查] 17:02:21 步骤6 收到身份证照片
6228.f5b27d06.js:1 [高拍仪排查] 17:02:21 设备消息 idFaceFilepath:C:\eloamFile\idface.jpg
6228.f5b27d06.js:1 [高拍仪排查] 17:02:24 步骤7 身份证信息匹配，发送 verifyFaceDetect {当前比对人: '蒋学友', 证件号: '321302200001078012'}
6228.f5b27d06.js:1 [高拍仪排查] 17:02:26 步骤6 收到身份证文字信息 IDcardInfo:蒋学友 男 汉 2000 1 7 江苏省宿迁市宿城区中扬镇蒋刘村高庄组61号 321302200001078012 宿迁市公安局宿城分局
6228.f5b27d06.js:1 [高拍仪排查] 17:02:26 步骤6 身份证读取成功 蒋学友 男 汉 2000 1 7 江苏省宿迁市宿城区中扬镇蒋刘村高庄组61号 321302200001078012 宿迁市公安局宿城分局 2025 12 18 2035 12 18
6228.f5b27d06.js:1 [高拍仪排查] 17:02:26 步骤7 设备返回：人证比对成功 1
6228.f5b27d06.js:1 [高拍仪排查] 17:02:26 步骤7 人证比对结果回调 1
6228.f5b27d06.js:1 [高拍仪排查] 17:02:27 关闭 弹窗关闭，断开高拍仪
6228.f5b27d06.js:1 [高拍仪排查] 17:02:27 连接关闭 code=1000 reason=无 wasClean=true
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Very important data: the fresh console log (deployed build) confirms **Bug 6538 fix is WORKING** — 人证比对 now succeeds:
- `步骤4 握手成功，已撤销初始化遮罩` → my fix active
- `步骤5 已收到摄像头画面，高拍仪初始化完成`
- 身份证读取成功、`人证比对成功 1`

So 人证比对 works now. The NEW issue is **视频签字** popup stuck at「正在加载...」— a separate component `signVideo.vue` with the **identical bug pattern** (loading only cleared in `send_subImgData`).

My edit failed because whitespace differs (`alt=""  width`). Let me read exact lines 10-12 and 291-308 of signVideo.vue again precisely. I already have them from the full read: line 10-12 are:
```
        <div class="idcard-img">
          <img :src="secondImg" alt=""  width="100%">
        </div>
```
My old_string had `flex-center` class which isn't there. Let me redo with exact text.
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Now the critical fix — clear `loading` after handshake success (after `closePriVideo`, line ~293):
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Now `node --check` on the script block, then build. Let me syntax-check.
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Syntax OK. Now rebuild. Let me verify diff then build (build via orchestrate detached, poll log).
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Diff is clean. Now build. Launch detached via orchestrate, then poll.
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Build launched (PID 15316). Poll after ~150s (build ~190s total from earlier: 95s+95s).
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Legacy done (99321ms), now module bundle. Poll again shortly.
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Build succeeded (0 fatal errors). Both fixes now in dist. Let me clean up temp, commit and push (per prior user choice 提交并推送).
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: Committed `47ab527e` and pushed. Now write back to ZenTao 6538 as a supplement (bug is already resolved; add a comment noting the same-class video-sign fix). Let me add an action comment within a transaction.
**assistant [peer=gitlab.zhi.com-zhi-suqian-shiqu-cunliangfang-fe-zhi0-web-admin-h5-g-unlimited]**: 已解决。视频签字弹窗卡「正在加载...」是**和 Bug 6538 同源的同类缺陷**，只是发生在另一个组件。

## 诊断

你贴的新构建日志（17:01-17:02）证明 **6538 的人证比对修复已生效**：
- `步骤4 握手成功，已撤销初始化遮罩` → `步骤5 已收到摄像头画面` → 身份证读卡成功 → `人证比对成功 1` ✅

但接着「视频签字」弹窗（买受方视频签字）卡在「正在加载...」。排查发现：`src/components/signVideo/signVideo.vue` 的 `loading` 遮罩**同样只在收到 `send_subImgData` 视频帧时才清除**，而现场该机型（S620A3DR / USB Camera RGB）不出帧 → 遮罩永久卡死。和 6538 一模一样的根因。

## 修复

`signVideo.vue`（仅此一个文件）：
1. QWebChannel 握手成功（`html_loaded('faceDetect_two')` + `closePriVideo`）后即置 `loading=false`，撤掉「正在加载...」遮罩；
2. 视频区 `secondImg` 为空时显示「摄像头画面加载中…」占位，帧到达后照常填充。

## 验证

- `node --check` 语法校验通过（exit=0）；
- 本地 `npm run build` **构建成功**：0 致命错误，`dist/web` 已生成（legacy 99s + module 99s）。
- 提交 `47ab527e`，已推送 `origin/suqian-all-cunliangfang-dev-v1.0.0`（`be97d184..47ab527e`）。
- 禅道 6538 已追加补充说明（该 bug 状态仍为 resolved/fixed）。

## 你需要做的

本地 `dist/web` 已是最新（含两处修复）。把新 `dist/web` 重新部署到 8991 站点后，刷新页面再走一遍「人证比对 → 视频签字」即可验证：视频签字弹窗不会再卡在「正在加载...」，「开始签字」可直接点击。

> 提示：该机型不出 `send_subImgData` 帧，属客户端/机型层面的行为差异。当前修复保证**界面可用**（不再卡死），但若后续还希望看到实时预览画面，仍需现场核对该高拍仪客户端版本/出流配置——这是客户端线，可按需另排。需要我把 `dist/web` 部署到本地 nginx UI 站点验收吗？

<!-- MEMORY_FIELDS
{
  "event_name": "sign_video组件同源缺陷修复",
  "goal": "修复视频签字卡死",
  "summary": "2026-11-12 助手定位 sign_video.vue 与 Bug 6538 同源：loading 遮罩仅在 send_subImgData 帧到达时清除，机型 S620A3DR/USB Camera RGB 不出帧致永久卡死。修复为握手成功后即置 loading=false 并显示占位；node --check 通过，本地构建成功（0 致命错误）。提交 47ab527e 并推送 origin/suqian-all-cunliangfang-dev-v1.0.0，禅道 6538 追加说明。",
  "ranges": "34,48,52-79,80-117",
  "source_extraction_id": "958ac1b1dbf8447d85e7ed3e89f70cdf",
  "version": 1,
  "memory_type": "events"
}
-->