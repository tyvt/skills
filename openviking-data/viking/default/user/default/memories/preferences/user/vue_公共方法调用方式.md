---
audit_status: valid
last_checked: 2026-11-27T15:13:23+08:00
verdict_note: 通用编码规范偏好（禁止 this.xxx 调用原型方法），无具体文件指向，无矛盾代码证据
---
- 禁止通过 this.xxx 或 $xxx 调用挂在 Vue 原型上的方法，避免隐式全局依赖，跨模块复用与静态检查不友好。
- 凡是可抽成公共方法的逻辑，一律用显式 import 引入函数再调用，不通过 this 或 $ 前缀访问原型方法。
- 抽公共方法时，将调用方需要差异化的部分（如服务名）做成入参。

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->