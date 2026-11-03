# SplashAty.kt 启动页倒计时控制
苏住房 Android 端启动页停留时长由 `SplashAty.kt` 中 `CountDownTimer(2000, 1000)` 控制，`policy` 接口成功返回后触发倒计时。

## 实现要点
- 启动页停留由 `SplashAty.kt` 中的 `CountDownTimer(2000, 1000)` 控制
- `policy` 接口成功返回后触发倒计时
- 调整构造函数首参数 `2000` 可修改停留毫秒数

## 验证与归属
- 验证证据：苏住房android/001.md
- 涉及文件：d:/repository/苏住房android/app/src/main/res/values/styles.xml
- 所属项目：苏住房android；代码基线：none
- 来源会话：929fbbcd-1f68-4070-84f2-878ad45a3def

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "splashaty_countdown_timer",
  "source_extraction_id": "1996c7eca0524bb598e2f900361ba007",
  "version": 1,
  "memory_type": "entities"
}
-->