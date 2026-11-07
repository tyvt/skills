# Summary
2026-11-03 停止旧进程后，助理开始用 Maven 重建 service-expand-server 模块（mvn -q -pl service-expand/service-expand-server -am -DskipTests package，加 -Dfile.encoding=UTF-8），以将 dev profile 打入 jar 替代原 test。
# 2026-11-03 (Tuesday) ChatLog:
**user [peer=D--repository------C-]**: ...2. 用 Maven 只重建受影响的模块并 reload。命令在 D:\repository\苏住房后端 下执行，例如：
   mvn -q -pl service-expand/service-expand-server -am -DskipTests package
   （common-framework 同理：-pl common-framework/common-framework-server -am）
   若 -am 触发大量依赖重建太慢，可先确认依赖已在本地 ....
...
**assistant [peer=D--repository------C-]**: Old service-expand (14220) is stopped. Now rebuild service-expand.

<!-- MEMORY_FIELDS
{
  "event_name": "service-expand重新构建",
  "goal": "打包dev环境新jar",
  "summary": "2026-11-03 停止旧进程后，助理开始用 Maven 重建 service-expand-server 模块（mvn -q -pl service-expand/service-expand-server -am -DskipTests package，加 -Dfile.encoding=UTF-8），以将 dev profile 打入 jar 替代原 test。",
  "ranges": "12-13,56",
  "source_extraction_id": "f885d6022a954753864f34ddda767516",
  "version": 1,
  "memory_type": "events"
}
-->