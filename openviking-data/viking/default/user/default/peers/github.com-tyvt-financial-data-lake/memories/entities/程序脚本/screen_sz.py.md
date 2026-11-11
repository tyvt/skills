# screen_sz.py
深市打新底仓筛选脚本，隶属数据湖选股模块，按《深市打新底仓专用标准.md》7条筛选深市候选股并输出CSV。

## 基础池与筛选逻辑
- ①基础池SQL：深市主板A股+上市满3年+剔ST/退市+剔创业板
- B方案拆两道私设门（净利增速门、股息倍数门），仅留文档7条
- ⑦上市满三年并入①SQL；④三年平均股息率>3.5%前置；③低波仅对④通过者算复权收益
- OCF取数SQL加PIT防未来函数；银行须过独立银行专项门
- 禁用--no-gov；GBK控制台不能输出−(U+2212)

## 验证与效果
- py_compile/AST通过；⑥通过~41~42只
- 2026-11-11新口径重跑：基础池2653→1383；全7条候选246只
- ④改三年平均>3.5%后漏斗1383→26→22→19→19→12→入选9→待确认1
- 最终9只：格力、平安银行、粤高速A、五粮液、招商公路、陕天然气、东莞控股、现代投资、宁波银行，与文档第四节零差异

## 运行与提交
- 用户默认「只改不跑」，授权后才重跑
- 所有改动未提交git；OUT/PEND/FUNNEL/治理否决CSV改绝对路径
- 治理否决表仅含治理通过==False（6行），银行专项不达标单列3行
- 2026-11-11向量化div_agg 13.96s→0.57s（32.5×），加速沪市screen_sh.py

## Relations
- 对齐文档《深市打新底仓专用标准.md》；与screen_sh.py、final_portfolio_v3.py同模块
- 筛选标准细节见实体「数据湖筛选标准」


<!-- MEMORY_FIELDS
{
  "category": "程序脚本",
  "name": "screen_sz.py",
  "source_extraction_id": "7848d905fcac48b59dfcbc73d394060c",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 11,
  "memory_type": "entities"
}
-->