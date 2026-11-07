# ref8443同级标签字号间距统一
苏住房防汛C端 H5（ref8443）将防汛相关页面中同一级别的标签字号与间距统一，消除 card-h3 与字段标签的视觉不一致。

## 问题根因
- 同级子标签 `card-h3`（现场照片、图片凭证）使用 16px，而 `field-block-label`/`mid-bold`（备注、小区地面／道路积水深度、树木倾倒数量等）使用 14px，视觉级别相同但字号不同
- 备注 label→文本框间距 14px，普通字段 label→控件 5px，同级间距不一致
- `.hint` 存在负 margin（-4px），`.upload-head` 有 margin-bottom:6px，导致头→提示间距混乱

## 修复方案
- `src/styles/ref8443.css` 中 `.card-h3` 与重复的 `.card h3`（L84）字号 16px → 14px，与字段标签一致；求援页「现场照片」随之 14px
- 将汛前/汛中/汛后的「现场照片/图片凭证」「备注」「险情说明」各块包进 `.field-block`，实现 label→内容 5px、块间距 14px 全局一致
- `.hint` 去掉负 margin，`.upload-head` 去掉 margin-bottom 改由 field-block gap 提供
- Ref8443Inspection.vue 内 scoped `.card-h3`（L301）同步改 14px + 系统字体

## 排查范围与归属
- 排查其余防汛页面：求援页 Ref8443Rescue（现场照片→14px ✓）、详情页 Ref8443Detail（分区标题道路路基等保留 16px 作为更高一级卡片大标题，字段行一致）
- 验证：测试环境 8095 实测三页 card-h3/备注/字段标签均为 14px，label→内容 5px、head→hint/hint→picker 5px 统一
- 提交 `1a421ea`，合并 `dev` 为 `d30681b`；dist 覆盖部署 nginx 8095；会话时间 2026-11-06

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_label_unify",
  "source_extraction_id": "a1e928a7dc6c49f8ae6be8faa548d092",
  "version": 1,
  "memory_type": "entities"
}
-->