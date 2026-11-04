# Cursor报npm任务检测无法分析package.json是IDE误报
苏住房C小程序项目在 Cursor 中提示「npm 任务检测: 无法分析文件 .../zhi2-mobile-shimin/package.json」，实为 IDE 误报而非 monorepo 配置损坏。

## 问题现象
- Cursor 弹「npm 任务检测: 无法分析文件 package.json」，看起来像 npm workspaces 配错
- 实际终端 npm run dev / build 完全正常

## 根因
- package.json 本身正常：JSON 合法、UTF-8 无 BOM、npm pkg get scripts 能读全脚本、node_modules 在仓库根（workspaces 结构）
- 真正原因：Cursor 内置 npm 任务检测的 openTextDocument 在启动竞态 / 多 package.json 的 monorepo / 路径含中文（苏住房C）/ 依赖分析类扩展冲突时失败，被统一报成「无法分析文件」

## 解决方案
- 先确认文件没问题（JSON.parse + npm pkg get scripts），再判定为 IDE 误报，不要动 package.json
- 处理顺序：Developer: Reload Window → 在编辑器打开并保存一次该文件 → 临时禁用依赖分析类扩展 → 仍要消提示则设 "task.autoDetect": "off"（会隐藏 NPM Scripts 面板）
- 顺带发现：子目录 .npmrc 的 shamefully-hoist=true 是 pnpm 专用项，npm workspaces 下被忽略并产生告警，应收到根 .npmrc 并去掉 pnpm 专有项

## 验证与归属
- 验证：会话 0cb5d788 Cursor 报无法分析 zhi2-mobile-shimin/package.json；确认 JSON 合法、UTF-8 无 BOM、npm pkg get scripts 正常、node_modules 在仓库根，判定为误报并给三级处理
- 涉及文件：zhi2-mobile-shimin/package.json、package.json（仓库根）、zhi2-mobile-shimin/.npmrc
- 所属项目：苏住房C；来源会话ID：0cb5d788-fca6-42d1-a6c7-7f13c139c57c；代码基线：ce9e460

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "cursor_npm_false_alarm",
  "source_extraction_id": "f077e1fff63b403981d63766777c8762",
  "version": 1,
  "memory_type": "entities"
}
-->