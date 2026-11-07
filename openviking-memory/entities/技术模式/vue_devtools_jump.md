# VueDevTools Source Jump Needs Editor Config
Vue DevTools jump-to-source requires an editor launch command configured in the dev environment.
## Root Cause
- Vue DevTools "Open in editor" needs `launch-editor` middleware with an editor start command configured
- Without the config, clicking the component panel button cannot jump to source
## Setup
- Write the editor launch command into the project dev config
- Run `npm run dev`, then click "Open in editor" in the component panel
## Verification
- Verified: src=惠山G/001.md
- Files: zhi1-web-admin/vite.config.js, src/main.js, index.html, package.json, node_modules/launch-editor/package.json, node_modules/vite/package.json, node_modules/vite/dist/node/chunks/dep-NjL7WTE1.js
- Project: 惠山G (zhi1-web-admin); Source session: c500dd33-22a6-40cf-9da0-977a1fb237b1; Code baseline: none

## 验证与归属
- 所属项目：惠山G
- 验证证据：extracted source=cursor project=惠山G
- 来源会话：c500dd33-22a6-40cf-9da0-977a1fb237b1


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_devtools_jump",
  "source_extraction_id": "c54ea1fc0b874b5fb77122b39e78f660",
  "version": 2,
  "memory_type": "entities"
}
-->
