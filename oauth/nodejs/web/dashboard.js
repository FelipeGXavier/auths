export function renderDashboardPage() {
  return `<div class="links">
    <a class="link calendar" href="#">List Events</a>
    <a class="link google" href="#">Google</a>
    <a class="link logout" href="#">Logout</a>
</div>`;
}

export function renderEvents(events) {
  let html = "<ul>";
  if (events.length == 0) {
    html += "<div> Nenhum evento encontrado </div>";
  } else {
    for (const event of events) {
      html += `<li>
      <div>
          <h4>${event.summary}</h4>
          <p>Ínicio: ${event.start}</p>
          <p>Fim: ${event.end}</p>
      </div>
  </li>`;
    }
  }
  html += "</ul>";
  return html;
}
