# Summary
On 2026-11-25, the user reported a Vite build failure on develop/v2.6.2-suzhufang where src/views/maintenance/fundScreen/index.vue imported @/views/property/bigscreen/components/StatsPanel.vue and ScreenChart.vue, but the untracked bigscreen directory caused ENOENT on fresh CI checkout.
# 2026-11-25 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: error during build:
[vite:load-fallback] Could not load /home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-web-admin-h5-g-unlimited/zhi2-web-admin/src/views/property/bigscreen/components/StatsPanel.vue (imported by src/views/maintenance/fundScreen/index.vue): ENOENT: no such file or directory, open '/home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-web-admin-h5-g-unlimited/zhi2-web-admin/src/views/property/bigscreen/components/StatsPanel.vue'
    at async open (node:internal/fs/promises:639:25)
    at async Object.readFile (node:internal/fs/promises:1252:14)
    at async Object.load (file:///home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-web-admin-h5-g-unlimited/node_modules/vite/dist/node/chunks/dep-CB_7IfJ-.js:65091:25)
    at async PluginDriver.hookFirstAndGetPlugin (file:///home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-web-admin-h5-g-unlimited/node_modules/rollup/dist/es/shared/node-entry.js:22908:28)
    at async file:///home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-web-admin-h5-g-unlimited/node_modules/rollup/dist/es/shared/node-entry.js:21894:33
    at async Queue.work (file:///home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-web-admin-h5-g-unlimited/node_modules/rollup/dist/es/shared/node-entry.js:23136:32)
这个迁移维修资金的功能说了单独切分支啊，怎么放在-suzhufang分支了？

<!-- MEMORY_FIELDS
{
  "event_name": "stats_panel_enoent",
  "goal": "Diagnose build failure",
  "summary": "On 2026-11-25, the user reported a Vite build failure on develop/v2.6.2-suzhufang where src/views/maintenance/fundScreen/index.vue imported @/views/property/bigscreen/components/StatsPanel.vue and ScreenChart.vue, but the untracked bigscreen directory caused ENOENT on fresh CI checkout.",
  "ranges": "0-6",
  "source_extraction_id": "700205d96d9a42d49b5dc9d4de7ab6b5",
  "version": 1,
  "memory_type": "events"
}
-->