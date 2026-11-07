# APK 崩溃三查模式
专家考评 APK 在无源码仅 DEX 场景下，闪退 Top3 均为缺失防护而非逻辑错误，可用 DEX 常量缺失作为证据。

## 三类根因
- Gson 全链路无 try/catch（GsonUtils/AccountStoragePreference/OkHttpCallback），任何格式异常直接崩。
- MainApplication.initSdk 无条件调 registerDefaultNetworkCallback（API 24+），整个 dex 不存在 `SDK_INT` 字符串 → API 21–23 设备启动即崩。
- Fragment 网络回调直接改 View（ReportFragment$9/$10.onResponse），全 dex 无 `isAdded` 字符串 → 已 detach Fragment 触发 NPE 或 after onSaveInstanceState。
- PdfLoaderActivity 用 WebView `file://` loadUrl 加载本地文件，无判空无 try/catch。

## 判定与修复
- 查 DEX 字符串表 `SDK_INT`、`isAdded` 是否存在——常量缺失本身就是证据（编译器会写进常量池）。
- 所有 Gson 解析包 try/catch；API 级别受限调用加 `if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N)` 守卫。
- Fragment 网络回调先判 `isAdded()` 并避免在 onSaveInstanceState 后改 View；WebView loadUrl 前判 intent extra 非空并 try/catch。
- 无工具时用 Python 写 AXML/DEX 提取脚本（axml.py/dexstr.py/dexparse.py/risk.py/query.py）复跑。

## 验证与归属
- 验证：会话 039c9e4c（基线 fd5072d）结论首行即闪退 Top3 证据为 DEX 指令级调用 + 逐方法 try/catch 判定。
- APK 画像：7.26 MB、包名 com.zhishusz.zsevaph、versionName 1.0/code 10、minSdk21/targetSdk28、14 Activity、无 native、v1+v2 签名。
- 涉及文件：D:/android-work/apk-static-report.md、dexstr.py、dexparse.py、risk.py；来源会话：039c9e4c、d30f0407；代码基线：fd5072d。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "apk_crash_checks",
  "source_extraction_id": "324bcc3c77904f009d1e12d70ec4e463",
  "version": 1,
  "memory_type": "entities"
}
-->