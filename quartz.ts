import WeeklyChecklist from "./quartz/components/WeeklyChecklist"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

async function loadSiteLayout() {
  const layout = await loadQuartzLayout()
  const content = (layout.byPageType.content ??= {})
  content.afterBody = [...(content.afterBody ?? layout.defaults.afterBody ?? []), WeeklyChecklist]
  return layout
}

const config = await loadQuartzConfig(undefined, loadSiteLayout)
export default config
export const layout = await loadSiteLayout()
