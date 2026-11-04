
# SplashAty.kt 启动页倒计时控制
苏住房 Android 端启动页停留时长由 `SplashAty.kt` 中 `CountDownTimer(2000, 1000)` 控制，在 `policy` 接口成功返回后触发倒计时。

## 实现要点
- 启动页停留由 `SplashAty.kt` 中的 `CountDownTimer(2000, 1000)` 控制，倒计时在 `policy` 接口成功后、由 `registerObserve()` 内 `onDataChange` 调用 `countDownTimer.start()` 开始
- 构造函数首参数 `2000` 为总时长（毫秒），即 2 秒；修改该值可调停留时长（如 `3000` 表示 3 秒）
- 次参数 `1000` 为回调间隔（毫秒），`onTick` 为空实现，对观感几乎无影响，可保持或按需调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房android（原记录参考 苏住房android/001.md）
- 涉及文件：d:/repository/苏住房android/app/src/main/java/com/cc/suzhufang/splash/SplashAty.kt、d:/repository/苏住房android/app/src/main/res/values/styles.xml、splash_windows_background.xml、com.alibaba.fastjson.JS
- 所属项目：苏住房android；代码基线：none
- 来源会话：929fbbcd-1f68-4070-84f2-878ad45a3def


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "splashaty_countdown_timer",
  "source_extraction_id": "27973cb3c8f54cdea08b416110f05a98",
  "version": 2,
  "memory_type": "entities"
}
-->