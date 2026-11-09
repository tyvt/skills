# Summary
User deepseek-harness-default-workspace reported a plugin metadata error for @xbzbing/dsh-git-panel: Node ERR_PACKAGE_PATH_NOT_EXPORTED for subpath './locale/de.json' not defined by exports in package.json (C:\Users\Administrator\.dsh\profiles\web\node_modules\@xbzbing\dsh-git-panel\package.json). On 2026-11-09 assistant investigated and found package.json does export the subpath and the file exists; suspected stale DSH host process module cache loaded before package update at 14:31:35 same day, causing transient error.
# 2026-11-09 (Monday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: @xbzbing/dsh-git-panel

包元信息错误：Plugin metadata for @xbzbing/dsh-git-panel: Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './locale/de.json' is not defined by "exports" in C:\Users\Administrator\.dsh\profiles\web\node_modules\@xbzbing\dsh-git-panel\package.json imported from C:\Users\Administrator\.dsh\profiles\web\node_modules\@xbzbing\dsh-git-panel\package.json
**assistant [peer=deepseek-harness-default-workspace]**: I'll start by investigating this package metadata error. Let me look at the plugin's package.json and the actual file structure.
...
**assistant [peer=deepseek-harness-default-workspace]**: The package.json DOES export `./locale/de.json`, and the file exists. So why does Node report it's not exported? Let me check what's actually resolving the import — likely a stale/duplicate copy or a symlink, and check who's importing it.
...
**assistant [peer=deepseek-harness-default-workspace]**: The working dir isn't inside that node_modules, so resolution fails normally. The error is thrown by the DSH host that loads the plugin. The message says `./locale/de.json` "is not defined by exports" — but it clearly IS. This suggests the profile loads from a different node_modules copy, OR the exports map Node sees differs. Let me search where the actual error originates and check all copies of this package.
...
**assistant [peer=deepseek-harness-default-workspace]**: Only one copy, modified at 14:31:35 — just seconds before the error at 14:31:58. Something modified package.json right before the error. Let me compare with the npm registry/git source and check for a `.orig`/backup or recent changes. Let me also check the actual mtime/contents of locale files and whether exports in the file differ from what Node cached.
...
**assistant [peer=deepseek-harness-default-workspace]**: No BOM, files all fresh from 14:31:35. Now let me reproduce the exact error by simulating what the host does — importing `./locale/de.json` via ESM from within the package. Also check how the host loads locale (maybe it hardcodes subpaths that don't match).
...
**assistant [peer=deepseek-harness-default-workspace]**: Both resolve fine *now*. So the error is transient/stale — likely node's resolution was against an **older package.json** without the `./locale/de.json` export, and the plugin was just updated at 14:31:35. The running DSH host process loaded the plugin metadata **before** the update, or its module cache holds the old exports map.

Let me check the cordis.patch.yml and how the host consumes locale, plus whether the host process needs a restart. Let me look at the host lib to see the exact import that fails.
...
**assistant [peer=deepseek-harness-default-workspace]**: That grepped minified bundle output — bad move. Let me be precise: grep only for the JSON import specifier strings in lib JS files, filtering to short lines.
...
**assistant [peer=deepseek-harness-default-workspace]**: No literal `locale/*.json` in lib JS. So the host loads locale files itself based on some manifest. The error text "Plugin metadata for @xbzbing/dsh-git-panel: ... imported from ...package.json" is DSH's plugin metadata loader. It builds the export subpath from a locale list. Let me check the DSH core plugin loader code to understand exactly how it constructs `./locale/de.json`.

<!-- MEMORY_FIELDS
{
  "event_name": "git_panel_error",
  "goal": "Report plugin metadata error",
  "summary": "User deepseek-harness-default-workspace reported a plugin metadata error for @xbzbing/dsh-git-panel: Node ERR_PACKAGE_PATH_NOT_EXPORTED for subpath './locale/de.json' not defined by exports in package.json (C:\\Users\\Administrator\\.dsh\\profiles\\web\\node_modules\\@xbzbing\\dsh-git-panel\\package.json). On 2026-11-09 assistant investigated and found package.json does export the subpath and the file exists; suspected stale DSH host process module cache loaded before package update at 14:31:35 same day, causing transient error.",
  "ranges": "0-2,3,5,7,9,11,13,15,17",
  "source_extraction_id": "7670a2c7a66142e191d3b0e7ad226ab9",
  "version": 1,
  "memory_type": "events"
}
-->