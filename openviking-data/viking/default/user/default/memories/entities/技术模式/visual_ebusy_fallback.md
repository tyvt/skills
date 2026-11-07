# 视觉用例 EBUSY 起不来时改用直接测量
门户视觉回归用例因 Node spawnSync 返回 EBUSY 跑不起来时，改用同视口同 DPR 直接测量与独立复算，并如实标注用例未执行。

## Description
- 现象：参考图预处理阶段 Node 子进程返回 EBUSY（spawnSync python EBUSY），prepareOriginalReferences() 抛错退出，整条视觉用例无从执行。
- 根因：门户视觉回归用 python 脚本预处理参考图（裁切/归一化）后 pixelmatch 比对；Windows 上 spawnSync 管道捕获子进程输出可能返回 EBUSY，参考图未生成。
- 涉及文件：zhi2-web-admin/tests/e2e/public-portal-visual.spec.ts；zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.ts

## Solution
- 先把「用例跑不了」与「改动导致不通过」分开：把改动 stash 掉复跑一次，同样起不来即环境/存量问题。
- 环境跑不了时不跳过验收：同视口同 DPR 用浏览器直接量关键几何值（表单卡 138–310、结果卡 340–512→间距 30px、卡高 172px、字号 40px），按用例同款归一化 + pixelmatch 独立复算（本批 96.796%，门槛 95%）。
- 汇报如实写「视觉用例本体本次未能执行——本机 Node 管道子进程返回 EBUSY，数值来自同视口同 DPR 的直接测量与独立复算」，不把独立复算说成用例通过。
- 确认临时采集脚本已删除、不留在仓库，ESLint 仍要过。

## Verification
- 验证证据：会话 1ce12622-a06c-4fc8-b997-bae5eac68429 结论说明「视觉用例本体本次未能执行——spawnSync python EBUSY，prepareOriginalReferences() 直接失败，与本次改动无关；上述数值来自同视口同 DPR 的直接测量与独立复算。eslint 通过。」
- 来源会话ID：1ce12622-a06c-4fc8-b997-bae5eac68429；代码基线：2785dd9；所属项目：门户

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "visual_ebusy_fallback",
  "source_extraction_id": "3c0ea417a4ea45d19c63c496e33ea242",
  "version": 1,
  "memory_type": "entities"
}
-->