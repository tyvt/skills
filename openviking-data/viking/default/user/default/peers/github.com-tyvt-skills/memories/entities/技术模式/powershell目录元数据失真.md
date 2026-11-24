# PowerShell 目录元数据视图失真
Windows 上 PowerShell 枚举目录得到的文件尺寸可能滞后或失真，需用 Python/Node 实际读取核对。

## 现象
- 同一批 nginx conf，PowerShell 两次 listing 均显示 0 字节，Python os.stat 读出 2002/1789/3161/2525 字节。
- 误判后果：把活站点当成「空壳残渣」，据此清理或收敛会直接破坏线上静态配置。

## 判定与应对
- 决定性实验：同一帧内分别用 Python 与 PowerShell 读同一文件大小，结果矛盾即判定为元数据视图失真。
- 不用 Get-ChildItem 的 Length 判断文件是否为空，以实际 open+read 的内容为准。
- 2026-11-24 在 skills 仓 deploy-env 的 sites-enabled 上复现，涉及门户、苏州市房地产监测V3、苏住房G 等片段。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术模式",
  "name": "powershell目录元数据失真",
  "source_extraction_id": "6cab2f90d651442bad5e9c6673c0b828",
  "version": 1,
  "memory_type": "entities"
}
-->