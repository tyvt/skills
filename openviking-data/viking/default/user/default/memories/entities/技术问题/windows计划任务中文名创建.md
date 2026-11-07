# Windows 计划任务中文名创建
在部分 Windows 上用 `schtasks /Create` 创建中文计划任务时，需禁用 `/tz` 且 `/tn` 勿加引号。

## 问题与根因
- 部分 Windows 不支持 `/tz`，会直接报「无效参数」
- 系统已是 China Standard Time（UTC+8）时应去掉 `/tz`，`/st 14:00` 即上海本地 14:00
- 任务名含中文时 `/tn` 不能写成 `/tn "红利指数投资信号"`，应写成 `/tn 红利指数投资信号`，否则语法错误

## 修复与验证
- `setup_task.bat` 需按此改写后管理员重跑
- 验证：会话 4a33133f 用户管理员运行仍失败，修复后可创建「红利指数投资信号」周一至周五 14:00

## 涉及文件与归属
- 涉及文件：setup_task.bat、run_push.bat
- 所属项目：投资推送；来源会话ID：4a33133f-ce51-49e2-a37d-804c789adaf3

<!-- MEMORY_FIELDS
{
  "category": "技术问题",
  "name": "Windows计划任务中文名创建",
  "source_extraction_id": "91e12f6207d2496fb8e9c25bcbf6033f",
  "version": 1,
  "memory_type": "entities"
}
-->