# Spring Boot 启动检测正则别写死类名
批量启动后端服务时，脚本因正则要求 Started .+Application in 而 zhi2 系列日志打 Started application in 误报 TIMEOUT，应以端口 LISTEN 为准。

## 问题根因
- 批量启动 12 个后端服务时，脚本报告多个模块启动超时（TIMEOUT），但实际服务都是好的
- zhi2-maintenance 实测 17.5s、zhi2-benefit 18.5s，都在 20 秒内
- 检测正则太严：脚本按 Started .+Application in 匹配（强制要求类名），而 zhi2 系列日志打的是 Started application in（无类名），匹配不上就判超时

## 解决方案
- 判定服务是否起来以「端口 LISTEN」为准（netstat -ano | findstr :9605），日志正则只作辅助
- 若一定要用日志，把正则放宽到 Started .* in（允许类名缺失），或按服务族分别配置
- 报告里区分「真超时」与「检测未命中」，不要把检测器的 bug 写成服务慢
- 批量启动统一用「端口 LISTEN + 等待窗口」双条件，避免假结论
- 端口表固定：8080 common-gateway、9211 common-framework、9603 data-property、9604 zhi2-property、9605 zhi2-maintenance、9606 zhi2-autonomy、9608 zhi2-evaluation、9610 service-expand、9616 zhi2-credit、9700 common-flowable、9701 zhi2-external、9803 zhi2-benefit

## 验证与归属
- 验证：会话 2010156f（基线 02900b8）最终结论 12/12 全部在跑，误报因正则错，端口探测为准
- 涉及文件：zhi2-maintenance ; zhi2-benefit ; common-gateway
- 来源会话ID：2010156f-5fb3-49c1-859a-daa3a63a94f2；代码基线：02900b8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "springboot_start_regex",
  "source_extraction_id": "67f0bec8f7804bb8904f00a630a74b4e",
  "version": 1,
  "memory_type": "entities"
}
-->