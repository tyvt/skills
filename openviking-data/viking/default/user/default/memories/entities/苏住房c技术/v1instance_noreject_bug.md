# v1Instance缺失supportNoReject致noReject静默失效
苏住房C小程序二手房房源核验接口配置noReject:true但因请求实例未开supportNoReject开关而无效，导致业务失败被误报为网络错误。
## 问题现象
- 房源发布·房源核验点击核验后统一弹「网络错误，请稍后再试！」
- 抓包响应外层success:true,code:200,data内嵌业务失败JSON（内层code:500,message:'核验失败...'）
- 页面已有内层code==500跳失败页分支但从未执行
## 根因
- secondVerifyLogVerify接口配置noReject:true，依赖请求实例supportNoReject:true开关
- src/api/v1Instance.js未开supportNoReject，noReject成无效配置
- 拦截器把内层code:500当请求失败，且内层用message而非msg，兜底文案落通用「网络错误」
## 解决方案
- 在v1Instance.js补supportNoReject:true（与V2 api/index.js一致）使noReject生效
- 页面跳失败页时对错误原因encodeURIComponent，避免URL截断
- 排查顺序：外层code是否200→接口是否配noReject→实例是否开supportNoReject→内层错误字段message还是msg
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话df98a5b7（基线77666f8）用户报核验显示网络错误，定位v1Instance.js缺开关，补开关并encodeURIComponent
- 涉及文件：zhi2-mobile-shimin/src/api/v1Instance.js、httpInstance.js、gateway.js、transaction.js、pages_transaction/publishHouse/verification.vue
- 所属项目：苏住房C；来源会话ID：df98a5b7-7af2-4775-8bc5-f19612418dfd；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "v1instance_noreject_bug",
  "source_extraction_id": "a68f950bba1b44e9a14c8d4a241c865f",
  "version": 1,
  "memory_type": "entities"
}
-->