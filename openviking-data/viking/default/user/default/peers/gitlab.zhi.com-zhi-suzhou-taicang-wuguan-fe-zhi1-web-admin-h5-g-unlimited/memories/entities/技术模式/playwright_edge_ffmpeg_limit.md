# Playwright 录屏缺少 FFmpeg 可执行文件
Playwright 在本机已能启动 Edge，但因缺少其要求的 FFmpeg 可执行文件而无法创建录屏页，页面与 API 均未访问。

## 现象
- Playwright 已能正常启动 Edge 浏览器。
- 无法创建录屏页，原因是本机缺少 Playwright 要求的 FFmpeg 可执行文件。
- 受该问题阻塞，被测页面和 API 都还没有实际访问。

## 处理与解决
- 系统已有 FFmpeg 8.0.1（位于 D 盘），缺少的是 Playwright 期望的缓存副本。
- 将现有 FFmpeg 二进制复制到 Playwright 的缓存位置，并只在本次进程中补上依赖目录 PATH；不下载或替换系统程序。
- 属于本机环境缺失依赖，而非被测项目的配置问题。

## 归属
- 出现在 2026-11-15 的 Playwright E2E 录屏相关会话中。
- 与既有 Playwright 录屏限制类记忆（Firefox 不生成视频、整页截图视口外空白）同属录屏链路问题。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "playwright_edge_ffmpeg_limit",
  "source_extraction_id": "16e8c5ae57424fe199bf94794d31ffc3",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-taicang-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->