# 整改API封装死代码与参数位置bug
rectificationApi全仓库无人import是死代码；confirm/close参数放body而后端@RequestParam会报1105。

## 死代码判定与处理
- rectificationApi（stdEvaluation.js:145-161）9个方法全仓库无人import，唯一命中是定义处→死代码；页面实际走listMixins/detailMixins通用封装
- 判断api封装是否在用：grep全仓库找import它的文件（不是找方法名字符串命中），命中0处标死代码
- 死代码要么删、要么接线，不要留着误导；报告单列「死代码清单」而非当功能缺口

## 参数位置错误（1105）
- rectificationApi.confirm/close把参数放body，后端签名@RequestParam→按现状接线直接报1105 rectificationNoticeId不能为空
- Spring的@RequestParam只从query string取值，放body等于没传；报错文案是「参数不能为空」而非「位置错了」，指错方向
- 接@RequestParam接口参数必须放query：api.confirm(url,{rectificationNoticeId})走query序列化或显式拼query string
- 报错1105「xxx不能为空」时除查字段名还要查参数该放body还是query

## 入口缺失真相
- reply无独立入口但反馈功能不缺失——详情页编辑问题项后保存走update，同样置「已解决」
- 真正无入口的是confirm/close/supervise

## 验证与归属
- 来源会话 d38c482b-a854-4693-99d7-ccd429f31165（基线05caac8）最终结论
- 涉及文件 zhi2-web-admin/src/api/evaluation/stdEvaluation.js、e2e/std-evaluation/lib/std-eval-lib.cjs、docs/std-evaluation/api-map-check.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "std_rectify_bug",
  "source_extraction_id": "3de88f366cf7424d88a42c9766d22bcd",
  "version": 1,
  "memory_type": "entities"
}
-->