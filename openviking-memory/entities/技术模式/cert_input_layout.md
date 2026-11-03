# 小程序年-字-号组合输入框排版约定
苏住房C不动产权证号输入区反复排版错乱，最终约定放弃flex-wrap改固定两行结构。

## 问题现象
- 证号输入区（苏+年份+苏州市不动产权第+编号+号）先用flex-wrap致「号」字被挤到下一行
- 调小字号改placeholder后反馈「还是很大」，再改「排版又乱了」，开发者工具模拟器宽度与真机不一致易漏判

## 根因
- flex-wrap换行点按剩余宽度动态算，字号或机型宽变化就漂移
- placeholder字号不跟随输入文字，必须靠placeholder-class给原生input单独下发，改容器字号无效

## 解决方案
- 此类「固定文案+输入框」证号控件一律显式两行：第一行「苏+年份输入框」，第二行「苏州市不动产权第+编号输入框+号」同排不折行
- 字号统一rpx（示例placeholder 22rpx）并通过placeholder-class指定，不指望容器透传
- 改完必须重新编译真机查看

## 验证与归属
- 会话98b2613a用户四轮反馈（UI错乱→字号小→没生效→排版乱），结论根因flex-wrap，改固定两行布局
- 涉及文件：pages_owner/house/verify.vue、pages_transaction/publishHouse/verification.vue、styles/form2.scss、pages_transaction/stockHouseSign/apply.vue
- 所属项目：苏住房C；来源会话ID：98b2613a-ff87-4511-9692-3d6fb3b49725；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_input_layout",
  "source_extraction_id": "789f39094ad64ddc97500806c533c5b4",
  "version": 1,
  "memory_type": "entities"
}
-->