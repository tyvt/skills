# ref8443像素对齐总览
苏住房防汛C端 H5（8095）对比参考站8443的像素门（REF8443_MAX_DIFF_RATIO=0）对齐工作，2026-11-06进行。

## 差异比例（修复后）
- 历史-汛前 ~7.2%
- 历史-求援筛选 ~8.3%（原~10%）
- 汛前检查 ~8.3%
- 汛中巡检 ~25.9%（原~40%）
- 求援工单 ~32.9%（原~35%）

## 剩余与下一步
- 剩余~7%–33%源于 uni-app 将 input/textarea/button 包成 uni-*，与8443原生在控件外观、行盒有差
- 建议按页 DOM 注入：求援联系人/电话/textarea→原生；汛前 counter/toggle/上传；历史 uni-text→span/p/h2

## 验证
- 验证：npm run test → nginx 8095 → npm run test:e2e:ref8443:gate
- worktree 苏住房防汛C端-wt-full8443 已移除

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_parity_overview",
  "source_extraction_id": "88ae84c0b79f44a4bf63ac09d0173b11",
  "version": 1,
  "memory_type": "entities"
}
-->