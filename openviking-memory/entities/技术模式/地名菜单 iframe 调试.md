# 地名菜单 iframe 调试
在 苏州市房地产监测V3 项目中，通过 iframe 加载的地名菜单出现加载异常；已排除四种常见原因。

## 已排除的原因
- URL 格式无效
- admin token 无效
- X-Frame-Options 拦截（nginx 9996 无此 header）
- localStorage 跨域拦截

## 后续步骤
- 仍需检查 F12 Console、iframe src 和 Network 状态码以定位根本原因。

## 验证与文件
- 验证证据: src=苏州市房地产监测V3/057.md
- 涉及文件: src/views/IframePage/index.vue; src/utils/placeDmsp.js; src/views/placeApproval/index.vue; src/views/InnerLink/index.vue; src/layout/index.vue; src/utils/auth.js; .pi-tmp-iframe-probe.mjs; .pi-tmp-xorigin.mjs
- 所属项目: 苏州市房地产监测V3; session: 01a166fb-f5cc-764e-99b7-41f862b396d5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "iframe_place_menu_debug",
  "source_extraction_id": "286d4a02568d45098deccb6676a841bb",
  "version": 1,
  "memory_type": "entities"
}
-->