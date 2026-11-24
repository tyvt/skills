# Summary
2026-11-24 同帧对比 Python 与 PowerShell 读取同一批 conf 文件：Python 读到 2002/1789/3161/2525 字节真实内容，PowerShell 全部读到 0 字节，确认是 PowerShell 目录元数据视图失真，「10 个 0 字节空壳」为假象。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 我的本地前端部署到数据库能做一个看板吗，现在很多项目的部署有问题，agent找不到正确的地址，或者反复改代理，有没有什么好办法
...
**assistant [peer=github.com-tyvt-skills]**: 收录完成，但发现**异常**：9 个 conf 与注册表端口冲突，其中 6 个（门户、门户H5、苏住房G 等）在我 20 分钟前列目录时还是 0 字节，现在却有内容能解析出 listen——期间有别的进程写了这些文件。先核实：
**assistant [peer=github.com-tyvt-skills]**: 冲突模式很可疑——冲突端口恰好是 portal/fdc 的注册端口段。两个 listing 结果矛盾，直接验证全量文件尺寸与 ingest 代码的实际落盘内容：
**assistant [peer=github.com-tyvt-skills]**: 两次 listing 均显示这批文件为 0 字节，但 ingest 却解析出了内容（且苏州市房地产监测V3 抢占了 8098——正是看板预定端口）。做个决定性对比实验：同一帧内用 Python 与 PowerShell 各读一次文件大小：
**assistant [peer=github.com-tyvt-skills]**: **关键发现**：Python 与 PowerShell 同帧读同一批文件，Python 看到真实内容（2002/1789/3161/2525 字节），PowerShell 看到全 0——PowerShell 的目录元数据视图对这些文件失真。真实情况是：**这批 conf 都有内容且都是活站点**（占着 8090-8104 各端口），「10 个 0 字节空壳」是假象。这正好验证了审核员「先收录再收敛」的排序要求——ingest 已正确识别 9 个端口冲突待人工。

看板端口 8098 被苏州市房地产监测V3 占用，API 将按计划自动落到 8099。写收敛脚本（冲突感知版）：

<!-- MEMORY_FIELDS
{
  "event_name": "PowerShell文件尺寸读取失真确认",
  "goal": "确认读取失真",
  "summary": "2026-11-24 同帧对比 Python 与 PowerShell 读取同一批 conf 文件：Python 读到 2002/1789/3161/2525 字节真实内容，PowerShell 全部读到 0 字节，确认是 PowerShell 目录元数据视图失真，「10 个 0 字节空壳」为假象。",
  "ranges": "0,80-87",
  "source_extraction_id": "6cab2f90d651442bad5e9c6673c0b828",
  "version": 1,
  "memory_type": "events"
}
-->