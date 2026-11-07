# CI原生绑定自愈：Node版本与optionalDependencies
CI构建报Cannot find native binding时，根因是Node版本不达标导致npm静默跳过平台optionalDependencies，需升级Node并泛化install.mjs自愈扫描补装。
## 根因
- CI runner的Node v22.3.0不满足engines(^20.19.0 || >=22.12.0)，npm静默跳过rolldown/oxc-parser等平台optionalDependencies
- 运行时缺失@rolldown/binding-*、@oxc-parser/binding-*等原生二进制，报Cannot find native binding
- 逐个单包打补丁脆弱：修好rolldown后更深处的oxc-parser又炸，属同一根因换中招者
## 解决方案
- 治本：CI runner的Node升到≥22.12.0（宿主机/home/gitlab-runner/scripts/nodejs-build.sh），升级后自愈逻辑变空操作
- 泛化：scripts/install.mjs安装后扫描整个node_modules，找出带平台optionalDependencies的host包(rolldown/oxc-parser/rollup/esbuild/lightningcss/@parcel/watcher全覆盖)
- 补装：当前平台binding全缺失的按host声明版本批量点名补装；循环「扫描→补装」最多3轮直至补齐
- 匹配需考虑平台/架构/libc(glibc/musl)，Windows/macOS/Linux的x64+arm64均适用；提供INSTALL_SKIP_BINDING_HEAL=1开关跳过
## 验证与归属
- 验证：node v18.18.0仿真全新安装(检测缺失→批量补装@rolldown/binding-win32-x64-msvc@1.2.16+@oxc-parser/binding-win32-x64-msvc@0.153.0→复扫确认补齐)，node v22.23.2真跑npm run test(exit 0、version.json生成)
- 涉及文件：scripts/install.mjs、scripts/ci-doctor.mjs、zhi2-web-admin/package.json
- 来源会话：session-6534e790-727a-4437-bfd6-314164ee1939；代码基线：d8addc3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ci_binding_heal",
  "source_extraction_id": "5d05348d377f486f9526d8d733266d81",
  "version": 1,
  "memory_type": "entities"
}
-->