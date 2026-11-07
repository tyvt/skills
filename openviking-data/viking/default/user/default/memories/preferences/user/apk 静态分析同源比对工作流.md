- 拿到 APK 与同名仓库源码时，禁止默认「APK 就是该仓库产物」，必须先证伪是否为同一应用。
- 四路交叉比对：包名 + versionName/versionCode、minSdk/targetSdk、Activity/Service/Receiver 数量、DEX 类名与接口串。
- 用 git 反查：`git log --all -S <特征串>`（如 zsevaph/ExpertReview/Sudoku）在仓库全部提交中 0 命中即证明不同应用。
- 顺手记录 APK 画像：体积/条目数、是否含 lib/assets、签名方案、largeHeap/usesCleartextTraffic、权限声明与实际使用反差。
- 注意仓库 apply 加固（如 360protect.gradle）不代表 APK 有加固特征，勿把「仓库加壳」当成「APK 有壳」。
- 无 jadx/aapt 时用 Python 自写 AXML/DEX 解析脚本产出清单，脚本留在固定目录（如 D:\android-work\）以便复跑。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "APK 静态分析同源比对工作流",
  "source_extraction_id": "324bcc3c77904f009d1e12d70ec4e463",
  "version": 1,
  "memory_type": "preferences"
}
-->