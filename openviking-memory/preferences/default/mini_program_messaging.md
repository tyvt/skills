---
audit_status: invalid
last_checked: 2026-11-26T02:33:32+08:00
verdict_note: 纯通用技术偏好，无具体文件/接口/行号可核对，无代码证据支撑，二态口径下无法证明有效
---
- For reliable cross-end messaging in WeChat mini-program, prefer backend relay (H5 writes state, mini-program `onShow` reads) over `wx.miniProgram.postMessage` + `web-view @message`, which only triggers in specific lifecycles and can miss events.

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "mini_program_messaging",
  "source_extraction_id": "2bcf1d30c3a547de9ea1ba2aa3fb1c87",
  "version": 1,
  "memory_type": "preferences"
}
-->