---
audit_status: valid
last_checked: 2026-11-28T02:32:12+08:00
verdict_note: 插件目录 C-\Users\Administrator\.dsh\profiles\web\node_modules\@xbzbing\dsh-git-panel 及 locale/de.json 实机存在，描述属实。
---
# @xbzbing/dsh-git-panel
A DSH (DeepSeek Harness) plugin installed at C:\Users\Administrator\.dsh\profiles\web\node_modules\@xbzbing\dsh-git-panel.

## Description
- DSH plugin providing git panel functionality for the web profile
- Located in node_modules of the web profile under .dsh

## Key Facts
- package.json exports map includes subpath `./locale/de.json`
- Locale file `locale/de.json` exists on disk as of 2026-11-09
- On 2026-11-09 a metadata load error ERR_PACKAGE_PATH_NOT_EXPORTED was reported for this subpath
- Assistant suspected stale DSH host process module cache loaded before package update at 14:31:35

## Relations
- Used by DSH host plugin metadata loader that imports locale subpaths
- Part of the web profile environment of user deepseek-harness-default-workspace

<!-- MEMORY_FIELDS
{
  "category": "plugin",
  "name": "dsh_git_panel",
  "source_extraction_id": "7670a2c7a66142e191d3b0e7ad226ab9",
  "version": 1,
  "memory_type": "entities"
}
-->