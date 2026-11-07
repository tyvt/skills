# Tab组列表接口传参结构不统一导致条件丢失
苏住房C找房Tab组内各列表接口method与参数形态不同，错误套用嵌套t会静默丢弃筛选条件。

## 问题现象
- 苏找房「推荐」列表与APP排序/内容不一致，怀疑查询条件不一致
- 给listRecommend发`{pageNo,pageSize,t:{xcoordinate,ycoordinate}}`时GET序列化嵌套对象失败，坐标条件静默丢失
- 对listRecommend使用POST会直接500

## 根因
- listRecommend为GET、参数扁平(pageNo,pageSize,xcoordinate,ycoordinate)
- pageByKeyWord(新房)与houseInfoDisplayList(二手房)为POST、条件塞在嵌套对象t中
- 开发按兄弟Tab结构类推，把坐标包成嵌套t发给GET接口，后端按无坐标返回

## 解决方案
- 接入列表接口前先到api层确认实际method与参数形态，不按兄弟Tab类推
- GET接口一律扁平传参，仅POST接口需要嵌套条件
- 排查「与APP不一致」优先对比请求参数结构，而非先怀疑UI或排序逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话65d67b1c用户诉求推荐房屋排列与APP一致，结论改回扁平传参后与线上一致
- 涉及文件：Project_Suzhufang.vue、Home_Suzhufang.vue、buyHouse/index.vue
- 所属项目：苏住房C；来源会话ID：65d67b1c-b2d4-4547-b8ef-f723249dbd4e；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "tab_list_param",
  "source_extraction_id": "c721bf307ccf4950b939d5355989b4a1",
  "version": 1,
  "memory_type": "entities"
}
-->