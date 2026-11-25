# Zentao Bug 6955 Home Data Not Displaying
Zentao bug 6955 "API returns data but it does not display; broke after removing mock data" concerns the Suzhou Housing flood-control C-end mobile H5 home page (http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6955).

## Root Cause and Fix (hop1, done)
- Root cause: loadRegions() implementation was not called, so activeDeptId stayed empty and Stats returned early.
- Fix passed plan_review with human confirmation; build:h5 succeeded; deploy panel ports dev=8161, test=8162.

## Verification (hop2, 2026-11-25)
- hop1 screenshot bug6955-home-20261125-162830.png was invalid: handoff claimed it showed numbers such as 10842, but it actually showed "—" and 0% for key navigation, public revenue and report/repair, meaning it was taken before data loaded (the original bug symptom).
- Rebuilt with build:h5 (exit 0) per deploy panel and reloaded nginx (dist_root D:/repository/苏住房防汛C端/dist, new bundle hash index-ClSJB59_.js).
- Live login verification on 8161 showed real numbers (professional property residential communities 5,326, area 66,149.68, property service enterprises 2,478), confirming the fix works; hop1 screenshot was pre-load.
- New full-page screenshot bug6955-home-fixed-20261125-165200.png was presented inline for user confirmation.

## Open Repair-Module Alignment
- User feedback: the C-end report/repair (报事报修) module is still wrong; align it with the Suzhou Housing G-end homepage "马上办".
- G-end reference RepairPanel.vue: titled "马上办", with current-month/history/trend tabs, 4 top metrics, and a repair/report work-order ratio ring chart.
- C-end currently shows a "current month count" tab with all metrics at 0; title and metric definitions need alignment.
- P0 hard handoff triggered at 1.01M cost; hop3 scheduled to continue alignment, re-screenshot, commit/push, bug 6955 write-back and cleanup.

<!-- MEMORY_FIELDS
{
  "category": "tech_issue",
  "name": "zentao_bug_6955",
  "source_extraction_id": "7e5c4613b0c9484fb7829e00575ef500",
  "version": 1,
  "memory_type": "entities"
}
-->