import { QuartzComponent } from "./types"
import styles from "./styles/weeklyChecklist.scss"
// @ts-ignore Quartz bundles inline scripts as strings.
import script from "./scripts/weeklyChecklist.inline"

const WeeklyChecklist: QuartzComponent = ({ fileData }) => {
  if (fileData.slug !== "index") return null

  return (
    <section class="weekly-checklist" aria-labelledby="weekly-checklist-title">
      <header class="weekly-checklist-header">
        <div>
          <h2 id="weekly-checklist-title">이번 주 할 일</h2>
          <p data-week-range></p>
        </div>
        <p data-week-count aria-live="polite"></p>
      </header>

      <form class="weekly-checklist-form">
        <input
          type="text"
          aria-label="새 할 일"
          placeholder="할 일을 적어주세요"
          maxLength={160}
          required
          disabled
        />
        <button type="submit" disabled>
          추가
        </button>
      </form>
      <p data-storage-status role="status">
        할 일은 현재 브라우저에 저장됩니다.
      </p>
      <noscript>할 일 목록을 사용하려면 자바스크립트를 켜주세요.</noscript>

      <p data-open-empty hidden>
        남은 할 일이 없어요.
      </p>
      <ul data-open-tasks aria-label="남은 할 일" hidden></ul>

      <div class="weekly-checklist-history">
        <header class="weekly-checklist-header">
          <h3>완료한 할 일</h3>
          <p data-total-count aria-live="polite"></p>
        </header>
        <p data-completed-empty hidden>
          완료한 일이 여기에 쌓여요.
        </p>
        <ul data-completed-tasks aria-label="완료한 할 일" hidden></ul>
      </div>

      <template>
        <li>
          <label>
            <input type="checkbox" />
            <span></span>
          </label>
          <time hidden></time>
          <button type="button" hidden>
            삭제
          </button>
        </li>
      </template>
    </section>
  )
}

WeeklyChecklist.css = styles
WeeklyChecklist.afterDOMLoaded = script

export default WeeklyChecklist
