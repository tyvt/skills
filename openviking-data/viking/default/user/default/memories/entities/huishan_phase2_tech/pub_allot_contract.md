# Fund Allotment No-Contract Frontend
Huishan Phase 2G zhi2-web-admin Zentao task 2393 implemented no-contract fund allotment applications and multiple withdrawals against one contract.

## Requirements and Changes
- Zentao task 2393: "Frontend [Huishan Property Management] Fund Allotment Supports No-Contract Application and Multiple Contract Withdrawals".
- Branch: `develop/v2.6.2-huishan`; project: Huishan Phase 2G / zhi2-web-admin.
- Reference: Suzhufang G task 2104 commits `dbd161219+7b937cd63` (`pubAllotNotice/detail.vue`, `index.vue`, `pubExpenditureContract/detail.vue`) were ported by three-way `git merge-file`.
- Huishan-specific behavior retained: `cancelPubAllotNotice` uses an inline request call, witness text uses `labelAbove`, and the list "Current Status" column wording uses `fixed=right`.

## Key Capabilities
- Has-contract branch; no-contract cap = pending application amount - `contractReservedAmount`.
- Backend field validation: `haveWithdrawAmount`, `remainWithdrawAmount`, `remainExcludeSelf`.
- Selection dialog filters zero remaining values with `filterZeroRemain` and shows the remaining available application amount in the `remainApplyAmount` column.

## Validation and Deployment
- ESLint reported 0 errors for the three files when run from the zhi2-web-admin cwd with the parent `node_modules\.bin\eslint.cmd`; running from the parent cwd caused 16 alias false positives.
- `npm run build` succeeded; the nginx 8119 site (`惠山二期G.conf`, root=`惠山二期G/dist`) was deployed and MD5-checked.
- Submodule commit `b7b998803` was pushed; parent gitlink `aa09f0d` was pushed.

## Writeback and Status
- Zentao writeback was zt_action 92182 comment (task type, product=",10,", task status unchanged, marked frontend complete pending backend integration).
- Real page end-to-end integration was not executed because it depended on the Huishan backend release.
- On 2026-11-13, a database check confirmed the Huishan Dameng `T_JG_ALLOT_NOTICE` table lacked `HAVE_WITHDRAW_AMOUNT` and `CONTRACT_FLAG` columns, while the Suzhufang test database had them, proving task 2393 server-side work was not implemented; integration was therefore impossible (see Bug 6559).
- On 2026-11-13, Bug 6559 frontend work was fixed and committed: Huishan `6fc3bb94d` (`develop/v2.6.2-huishan`) and Suzhufang `4a32dc38f` (`develop/v2.6.2-suzhufang`), both changing only detail.vue (adding noticeAmount and getDetail fallback); Zentao 6559 was set resolved/fixed (zt_action 92984) and reassigned to fuxiachao; visual page verification was not stable because of a login captcha race, so the note recommended joint verification before closing.
- Source session: 2026-11-12; code baseline: `develop/v2.6.2-huishan`.


<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "pub_allot_contract",
  "source_extraction_id": "e3712e5dae714c35b6d3f4d5e0113e49",
  "version": 4,
  "memory_type": "entities"
}
-->