# 顶栏 LOGO 优先级链
登录页与登录后顶栏的 LOGO 统一走「后台配置 sysLogo 覆盖内置静态图、defaultLogo 兜底」的同一优先级链。

## 现象与需求
- 同一前端有公开页（登录/注册）与管理端顶栏两类页面，用户要求内置 logo 与后台配置两者都覆盖、优先用平台配置地址
- 登录前后 logo 必须一致，否则体验割裂

## 解决方案
- Navbar.vue 不再静态 import 图片，改为从 store 读 state.app.platformConfig.sysLogo，用 computed logo 输出，模板保持 :src="logo"
- 保留 defaultLogo 常量兜底：平台配置未返回 sysLogo 时仍能显示，并作为公开页回退
- 删除 data() 里冗余的 logo 字段，切换账号/刷新 platformConfig 后 logo 随 computed 自动更新，不再缓存进 data
- sysLogo 可能是相对路径，需走 resolveServerAssetUrl 统一拼域名，禁止直接 :src 相对路径
- 注册/未登录页顶栏品牌信息（系统名称+LOGO）统一从 platformConfig 读，且与 Navbar 共用同一条优先级链

## 验证与归属
- 验证证据：会话 acfae044 最终结论确认 Navbar.vue 已改从 store 读取 logo 并保留 defaultLogo 兜底
- 涉及文件：src/layout/components/Navbar.vue
- 所属项目：产品2.0；来源会话ID：acfae044-ec7d-4f5e-bb61-36dc593a35da；代码基线：bd398ef

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "navbar_logo_chain",
  "source_extraction_id": "1feff99c09f5411780734b6be1b7bdaf",
  "version": 1,
  "memory_type": "entities"
}
-->