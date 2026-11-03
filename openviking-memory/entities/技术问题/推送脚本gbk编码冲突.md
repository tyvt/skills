# 推送脚本 GBK 编码冲突
在中文 Windows 默认 GBK 控制台直接运行 `push.py` 时，报告打印含 `✗` 等字符会触发编码错误导致进程在推送前失败。

## 问题与影响
- 中文 Windows 默认 GBK 控制台无法显示 `✗` 等 Unicode 符号，运行 push.py 触发编码错误
- 进程在正式推送前即失败，用户收不到微信推送

## 规避方式
- 补发或排障用 `python push.py --quiet` 跳过控制台打印、仅走微信推送
- 定时任务 `run_push.bat` 将 stdout 重定向到 `logs/push.log`，通常不受此影响

## 验证与归属
- 验证证据：会话 2f2e0718 用户未收到推送，--quiet 后微信返回成功并说明 GBK 无法显示 ✗
- 涉及文件：push.py、run_push.bat、logs/push.log
- 所属项目：投资推送；来源会话ID：2f2e0718-b2a8-41ff-a8e8-c3a997260734

<!-- MEMORY_FIELDS
{
  "category": "技术问题",
  "name": "推送脚本GBK编码冲突",
  "source_extraction_id": "91e12f6207d2496fb8e9c25bcbf6033f",
  "version": 1,
  "memory_type": "entities"
}
-->