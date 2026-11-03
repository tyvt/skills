# 子模块 .gitignore 收录边界：E2E/预览产物不入库，本地 AI 记忆要入库
子模块工作区中 report.html、preview PNG、E2E 产物等每次运行变动污染 git status，需按产物/源码脚本/记忆文档三分类书写 ignore 规则。
## 问题根因
- report.html、public/version.json、preview 下 PNG 与 report*.json、E2E 的 actual.png/diff.png/report.json/probe* 每跑一次就变
- 图省事整目录 ignore 会把脚本、HTML 模板、记忆文档一起排除
## 解决方案
- 上述产物加入子模块 .gitignore，已入库的用 git rm --cached 停止跟踪并保留磁盘文件，与 ignore 改动同 commit
- 明确 .workbuddy/memory 等本地 AI/Workbuddy 会话记忆必须可跟踪，规则写具体产物目录+具体文件名
- preview/verify.mjs 等模板脚本保持可提交
- 改完用 git check-ignore -v 逐条验证：产物命中、脚本与记忆未命中再提交
- 与「提交时显式排除 env/.env」不同：本条讲 ignore 规则本身按三分类书写避免目录级一刀切
## 验证与归属
- 验证证据：会话 dce1075f，用户要求分析子模块不需跟踪文件并明确本地 AI 记忆可跟踪，执行后验证脚本与记忆未 ignore
- 涉及文件：zhi2-web-admin/.gitignore、zhi2-web-admin/preview/verify.mjs、zhi2-web-admin/tests/e2e/home-v2.spec.mjs
- 所属项目：苏住房G；来源会话ID：dce1075f-dcad-4d5b-978b-b09c8f0c73ab；代码基线：3192070

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_gitignore",
  "source_extraction_id": "6309376b0dde46f082e58b77a70f3936",
  "version": 1,
  "memory_type": "entities"
}
-->