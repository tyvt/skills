# 禅道附件缓存系统
zentao-analyzer skill 的 zentao_file.py 已改造为统一落 D 盘、内容留存、本地优先的附件缓存下载器。

## Description
- 脚本路径：D:\repository\skills\zentao-analyzer\zentao_file.py
- 统一落盘：D:\禅道附件\<类型>\<id>\（非 Windows 落 ~/禅道附件，环境变量 ZENTAO_ATTACH_ROOT 可覆盖）
- 类型映射：bug→bug、task→task、story/requirement→story（合并）、其余→_other\<type|unknown>\<id>
- 每对象目录一份 _index.json 记录 sha1/size/title，重复拉取先查本地，size+sha1 命中直接 CACHE_HIT 不发 HTTP

## 关键设计
- sha1 默认校验（--fast 退化为仅 size）
- _index.json 原子写（临时文件 + os.replace），读-改-写合并，损坏自动备份重建；下载走 .part 再替换
- 权限失败明确 ERR 非 0，绝不回落项目目录
- title 缺失时按文件头 magic 自动补扩展名（.png/.gif/.jpg 等）
- 支持 --sync-object 批量同步与 --titles id:title 映射

## 调用契约
- stdout 单行输出 OK / CACHE_HIT / ERR <绝对路径>，路径可直接喂 analyze_image
- 旧形态 zentao_file.py <fileID> <output_path> 仍兼容

## Relations
- 来源方案文档：D:\repository\skills\.plan\zentao-attach-cache-20261114.md
- 属于 github.com-tyvt-skills 维护的 D:\repository\skills 技能仓
- 实现于 2026-11-14 提交 5907e345 并推送 origin/main

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "zentao_attach_cache",
  "source_extraction_id": "15f82a7df8694d949e4c11f439d93e4b",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->