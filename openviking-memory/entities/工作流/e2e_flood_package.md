# 测试人员用 E2E 独立 npm 包目录规范
防汛等测试用例需内聚为独立目录、不依赖前端代码、统一用 data-testid 定位元素。

## 背景与目的
- 测试人员不是前端开发者，需要能单独跑、看懂、改用例，而非先读懂 Vue 源码
- 用例散落前端仓库会绑死开发环境；靠 CSS 类名或文本定位元素，页面改样式就全红
- 加 `testid` 把定位契约从视觉层独立出来

## 目录结构
- 仓库根新建 `e2e-flood/` 独立目录（如 `D:\repository\苏住房G\e2e-flood\`），未改动前端任何文件
- 包含 package.json（name=e2e-flood、private、playwright ^1.63.0）、README.md、.env.example、.gitignore
- run-all.cjs 批量入口、lib/flood-lib.cjs 公共库、cases/*.cjs 用例、e2e-fixtures/ 固定附件（如 plan.pdf）

## 关键规范
- 每个 `.cjs` 用 `node --check` 过语法，README 写清怎么跑
- 元素定位统一走 `data-testid`，优先给公共组件加 testid 一次生效，再改写所有脚本选择器重跑回归
- 公共库设为只读契约，禁止修改本文件，新增能力走新文件
- 用例自包含：不引用前端源码路径、不依赖前端构建产物，只打部署后的站点

## 验证与归属
- 验证：会话 session-41beb375-55a3-4b4f-8f11-d8ecdaa2daa6（基线 6156653）交付清单含上述文件且 `node --check` 通过
- 涉及文件：e2e-flood/package.json、run-all.cjs、lib/flood-lib.cjs、README.md 等
- 来源会话ID：session-41beb375-55a3-4b4f-8f11-d8ecdaa2daa6；代码基线：6156653


<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "e2e_flood_package",
  "source_extraction_id": "e19e710c9628480f994e16c17d092217",
  "version": 1,
  "memory_type": "entities"
}
-->