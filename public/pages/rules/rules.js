export function createRules() {
  const ruleSection = document.createElement('section');
  ruleSection.dataset.sectionName = 'rule';

  const container = document.createElement('div');
  container.classList.add('rules_container');

  for (let i = 0; i < 8; i++) {
    const a = document.createElement('a');
    a.textContent = 'Правило ' + i.toString();
    a.classList.add('rule');
    a.classList.add('r' + i.toString());
    container.appendChild(a);
  }

  ruleSection.appendChild(container);
  application.appendChild(ruleSection);
}
