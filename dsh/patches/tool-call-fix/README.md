# DSH 工具调用修复的持久化保护

修复原件保存在 `%USERPROFILE%\.dsh\patches\tool-call-fix`，不在 npm / pnpm 安装目录中。这里保存补丁定义、恢复程序、原文件快照、恢复备份、安装与撤销脚本和测试。

## 自动生效方式

安装器在当前用户的 `NODE_OPTIONS` 中追加 `--import=file:///.../.dsh/patches/tool-call-fix/bootstrap.mjs`，保留原有选项。启动保护只识别 `@deepseek-ai/dsh/lib/bin.js`；其他 Node 应用、npm、业务开发服务器和工具子进程不执行补丁检查。

每次受保护的 DSH 启动会在主程序运行前：

1. 根据本次启动入口解析实际依赖，支持 NVM 路径变化。
2. 检查所有补丁锚点。三个补丁均已存在时不重写模块。
3. 如果安装包恢复了原实现且锚点仍兼容，按原文件 SHA-256 备份后恢复补丁并校验写入结果。
4. 如果上游实现变化、锚点缺失或重复，停止启动并明确提示兼容性检查；不会猜测并覆盖新代码。官方已修复但实现不同也需要人工复核后撤下本地补丁。

最后一次检查结果记录在 `last-startup.json`。该记录对应最近一次 CLI 启动，不能当作当前 GUI 进程的运行时诊断。

当前用户环境配置适用于继承更新后环境的新进程。已打开的终端和当前 DSH 的环境不会自动变化；在旧终端可使用归档目录中的 `start-dsh.cmd web` 启动，它会显式加载保护。正常启动前应先退出原来的 DSH，避免占用相同端口。

## 安装与验证

从本目录执行：

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
node --test .\persistence.test.mjs
.\start-dsh.cmd --version
```

`ExecutionPolicy Bypass` 只作用于该次脚本进程，不修改系统执行策略。安装与重复执行均保留已有用户 `NODE_OPTIONS`。安装前的值记录于 `environment-backup.json`。

测试在临时的模拟安装树中覆盖模块原文，验证启动前恢复、幂等性、不兼容版本不修改任一模块、普通 Node 程序不受影响，以及只读检查不写入。不会为了测试而覆盖真实运行的 DSH。

## 撤销启动保护

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\uninstall.ps1
```

撤销脚本只移除本次追加的 import 选项，保留其他 Node 选项、修复文件及备份，也不会主动还原正在运行的安装包。已运行进程保留其原有环境。

## 边界

这是本机受控补丁保护，不是上游官方修复。新版本不匹配时会要求复核，不能保证任意未来版本都能自动套用。若启动器自行清空 NODE_OPTIONS、换 Windows 用户或手动删除用户补丁目录，自动保护不会生效；使用 `start-dsh.cmd` 可显式加载。
