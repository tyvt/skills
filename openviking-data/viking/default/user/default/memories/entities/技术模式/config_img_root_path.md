# 后台配置图同源根路径与 nginx 代理
后台下发的配置图统一走同源根路径（`/zhi2-pro/...`），H5 挂子目录部署时必须在 nginx 站点根配 `/zhi2-pro` 代理。
## 现象
- 业主端 H5 菜单图标等后台配置图片在测试环境仍指向生产域名；部署到子目录后图片可能 404。
- 前端按环境变量拼测试域绝对 URL 会与页面站点解耦。
## 根因
- 配置图路径由后端下发（菜单 iconPath 等）。拼成同源根路径 `/zhi2-pro/...` 则图片走当前域名+`/zhi2-pro`，与页面部署子目录无关。
- 代价是 nginx 必须在站点根路径配 `/zhi2-pro` 反代，只挂在 `/testh5/` 下不够，子目录前缀不会自动带过去。
## 解决方案
- 前端统一去掉环境变量拼域名，改成同源根路径（形如 `/zhi2-pro/2025/.../xxx.png`）。
- 部署侧核对三类路径：打包静态资源相对路径、接口走 `/testh5/api/` 与 `/testh7/szf/`、后台配置图走站点根 `/zhi2-pro/`（及 `/zs-fym/`）。
- 自测：打开 `/testh5/` 首页，Network 看菜单图期望 `https://host/zhi2-pro/...` 返回 200，不再出现 `unlimited.c.h5-zhishu.../zhi2-pro/...`。
## 验证与归属
- 验证证据：会话 2f6a0465（基线 69cd251）用户诉求配置图不写死环境变量及子目录部署疑问，结论给出三类资源路径矩阵。
- 涉及文件：zhi2-mobile-shimin/src/utils/index.js、utils/mainStaticPaths.js、store/menu.js、vite.config.ts。
- 判断口径：缺的是 nginx 根路径代理，不是子目录部署本身。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "config_img_root_path",
  "source_extraction_id": "ca1c03debbd649dab1b71cd5d75db317",
  "version": 1,
  "memory_type": "entities"
}
-->