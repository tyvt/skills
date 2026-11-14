# 机构注册页机构类型卡片空白待静态回退
机构注册页 `/register/add` 的机构类型卡片渲染为空，需先确认页面是否依赖接口列表返回，再决定是否改为静态回退。

## 当前现状
- 生产构建已通过，Nginx 上 `/register/add` 与 `/login` 均返回 HTTP 200
- 首张验收截图显示机构类型卡片仍为空
- 截图过程拦截了后端接口请求，暂无法据此判断卡片数据是否来自接口列表

## 排查与决策
- 下一步先核对页面机构类型数据是否依赖接口列表；若接口不可用再评估静态回退（写死机构类型）方案
- 在确认数据来源前不直接改前端逻辑，避免掩盖真实接口问题

## 归属信息
- 相关路由：`/register/add`（机构注册）、`/login`
- 部署形态：Nginx 静态部署，生产构建产物
- 记录时间：2026-11-14

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_type_fallback",
  "source_extraction_id": "efb134f492bf468bbf43a5faba4943a3",
  "version": 1,
  "memory_type": "entities"
}
-->