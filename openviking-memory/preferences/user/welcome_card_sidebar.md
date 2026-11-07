- `HomeUserCard.vue` uses `aspect-ratio:488/220` instead of `min-height:192px` to prevent deformation; background image via `encodeURIComponent('切图 156.svg')` to avoid load failure caused by Chinese space.
- In `homeDataMixin.js`, the broker sidebar fixes the `SIDEBAR_QUICK_FUNCTIONS` config; remove hardcoded `layoutVariant` debug code.
- Files: HomeUserCard.vue, HomeLayoutSidebar.vue, HomeLayoutAdmin.vue, homeLayout.js, index-new.vue, homeDataMixin.js, HomeQuickLinks.vue, portal-home-visual.spec.ts.
- Evidence: src=门户/019.md; session: 2a30e4bd-5103-4309-bf91-2ec90aeb4857

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 来源会话：2a30e4bd-5103-4309-bf91-2ec90aeb4857


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "welcome_card_sidebar",
  "source_extraction_id": "4c0eaf143a1d43828fa16c8c304683aa",
  "version": 1,
  "memory_type": "preferences"
}
-->
