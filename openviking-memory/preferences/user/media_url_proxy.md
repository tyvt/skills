- Media URL resolution must unify on `VITE_APP_API_PROXY`; do not add special-case branches (e.g. for `/zs-fym`) that switch to `VITE_APP_IMG_PROXY_V1`, as that caused production H5 image load failures
- `src/utils/index.js` `resolveMediaUrl` should drop the `/zs-fym` special branch and use `VITE_APP_API_PROXY` consistently
- `vite.config.ts` local dev proxy must sync to `VITE_APP_API_PROXY`
- Image components (e.g. `swiperImage.vue`) should bind a `:local` prop for local-file handling
- Production `VITE_APP_API_PROXY` value: `https://szfweb.szzfcjj.cn:8887`
- Source evidence: src=苏住房C/075.md; session: bb5ef4f6-787c-49c9-b071-0b62385878d7

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "media_url_proxy",
  "source_extraction_id": "ba71f747db594776be8a6b89cd514edd",
  "version": 1,
  "memory_type": "preferences"
}
-->