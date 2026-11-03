# Windows 后台进程 exit 1 语义
Windows 上被终止的 dev server 也会以裸 exit 1 结束，判定失败必须看日志而非退出码。

## 现象与根因
- 前台 dev server（8082）后台任务显示 exit 1，易被当成启动失败
- 实际日志显示 HMR 正常工作到 14:56，是任务被终止（interrupt/kill）后退出，非启动失败
- Windows 上强制结束进程以裸 exit 1 结束（无信号标记），与真正命令失败退出码无法区分
- 同日志含 14:36–14:39 防汛文件 HMR 变更（rescue/plan/event/eventChange/inspection detail），证进程当时存活

## 判定规则
- 固定顺序：先看日志尾部（成功编译/监听地址/HMR）→ 再看退出码
- 日志有正常监听/编译且最后停在某时间点 → 判为「被终止」，交付记录写「exit 1 是终止语义，不是启动失败」
- 日志出现端口占用/依赖缺失/编译错误 → 真失败
- 交付记录两件事分行写，口径不混；收尾前复用 dev server 按原命令重启，不因 exit 1 改配置

## 验证与归属
- 来源会话 session-42ca405e-529e-4af3-98b5-81e2b92083de（基线 6156653）最终结论附注
- 涉及文件：zhi2-web-admin/vite.config.js、docs/flood/delivery-2026-10-29.md


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "windows_exit1_semantics",
  "source_extraction_id": "f53177084e504b838182c24425977ff7",
  "version": 1,
  "memory_type": "entities"
}
-->