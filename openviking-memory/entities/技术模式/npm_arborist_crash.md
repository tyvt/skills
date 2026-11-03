# npm子目录安装依赖崩溃(arborist缺陷)
CI 上在 workspace 子目录执行 npm install 崩溃，根因是 npm 10.8.1 自带 arborist 7.5.3 的 file: 依赖空 target 缺陷。

## 问题根因
- CI（gitlab-runner 16.9.0，Linux shell executor）子目录执行 npm install 直接崩：Cannot set properties of null (setting 'dev')，exit 1；改到仓库根目录执行安装即通过（added 888 packages，exit 0）
- 根因在 npm 10.8.1 自带 arborist 7.5.3 的 calc-dep-flags.js:34 无守卫 node.target，workspace 成员含 file: 依赖时 target 为 null 赋 dev 属性直接抛 TypeError
- 触发条件锁死为两条同时成立：workspace 成员含 file: 依赖，且在子目录里执行 npm install
- arborist 8.0.0 已修（if (node.target == null) return），对应 npm ≥ 10.9.2

## 解决方案
- 绕法：把安装拉到仓库根目录执行（install-dependencies 脚本改成根目录跑 npm install -f），子目录单独 install 不再使用
- 根治：把 CI 的 npm 版本钉到 ≥ 10.9.2，排期改 nodejs-build.sh 的 Node/npm 版本
- 交付须如实说明这是「绕开」而非「根治」，根治项（升级 CI npm）单列为待办，不要用「构建绿了」掩盖版本缺陷
- 验证证据链：BEFORE 子目录 npm@10.8.1 install 必现报错 exit 1；AFTER 根目录 npm@10.8.1 install -f --ignore-scripts 成功（--ignore-scripts 为绕开本地 Windows 沙箱禁止执行下载 exe 的 EFTYPE，与 CI Linux 无关，核心结论是「建树不再崩」；added 888 packages exit 0）

## 验证与归属
- 验证：根因 arborist 7.5.3 calc-dep-flags.js:34 无守卫 node.target.dev，8.0.0 已加 if (node.target == null) return；触发条件 workspace 成员含 file: 依赖 + 子目录 npm install
- 证据来源：会话 d023d1a8（基线 4517ee2）用户贴出 gitlab-runner 16.9.0 的 CI 日志（检出 4f66fec7、ref develop/v2.6.1-jiangyin、递归初始化子模块 zhi2-web-admin 后构建失败）、诉求 3「先闭环，然后提交推送代码」
- 涉及文件：package.json；所属项目：江阴公共收益（zhi2-web-admin 子模块）；来源会话：d023d1a8-6f33-4a10-bf34-117c953af3f2；代码基线：4517ee2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "npm_arborist_crash",
  "source_extraction_id": "72e6d9f6bfc04519b4929a1ff2767368",
  "version": 1,
  "memory_type": "entities"
}
-->