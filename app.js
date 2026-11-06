(() => {
  const STORAGE_KEY = "kiroween-spellbook-v1";
  const form = document.getElementById("spell-form");
  const input = document.getElementById("spell-input");
  const list = document.getElementById("spell-list");
  const empty = document.getElementById("empty");
  const countEl = document.getElementById("count");
  const clearBtn = document.getElementById("clear-cast");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  /** @type {{ id: string, title: string, done: boolean, created: number }[]} */
  let spells = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(spells));
  }

  function uid() {
    return `spell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function render() {
    list.innerHTML = "";
    const active = spells.filter((s) => !s.done);
    const done = spells.filter((s) => s.done);
    const ordered = [...active, ...done];

    countEl.textContent = String(active.length);
    empty.classList.toggle("hidden", ordered.length > 0);

    for (const spell of ordered) {
      const li = document.createElement("li");
      li.className = "spell" + (spell.done ? " done" : "");
      li.dataset.id = spell.id;

      const check = document.createElement("button");
      check.type = "button";
      check.className = "spell-check";
      check.setAttribute("aria-label", spell.done ? "Mark incomplete" : "Cast spell");
      check.textContent = spell.done ? "✓" : "";
      check.addEventListener("click", () => toggleSpell(spell.id));

      const title = document.createElement("span");
      title.className = "spell-title";
      title.textContent = spell.title;

      const actions = document.createElement("div");
      actions.className = "spell-actions";
      const del = document.createElement("button");
      del.type = "button";
      del.setAttribute("aria-label", "Delete spell");
      del.textContent = "✕";
      del.addEventListener("click", () => removeSpell(spell.id));
      actions.appendChild(del);

      li.append(check, title, actions);
      list.appendChild(li);
    }
  }

  function addSpell(title) {
    const trimmed = title.trim();
    if (!trimmed) return;
    spells.unshift({
      id: uid(),
      title: trimmed,
      done: false,
      created: Date.now(),
    });
    save();
    render();
  }

  function toggleSpell(id) {
    const spell = spells.find((s) => s.id === id);
    if (!spell) return;

    if (!spell.done) {
      const row = list.querySelector(`[data-id="${CSS.escape(id)}"]`);
      if (row && !reduceMotion) {
        row.classList.add("casting");
        window.setTimeout(() => {
          spell.done = true;
          save();
          render();
        }, 820);
        return;
      }
      spell.done = true;
    } else {
      spell.done = false;
    }
    save();
    render();
  }

  function removeSpell(id) {
    spells = spells.filter((s) => s.id !== id);
    save();
    render();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addSpell(input.value);
    input.value = "";
    input.focus();
  });

  clearBtn.addEventListener("click", () => {
    spells = spells.filter((s) => !s.done);
    save();
    render();
  });

  // Ghost cursor trail
  if (!reduceMotion && !coarsePointer) {
    let last = 0;
    document.addEventListener("pointermove", (e) => {
      const now = performance.now();
      if (now - last < 28) return;
      last = now;
      const orb = document.createElement("span");
      orb.className = "ghost-orb";
      orb.style.left = `${e.clientX}px`;
      orb.style.top = `${e.clientY}px`;
      document.body.appendChild(orb);
      window.setTimeout(() => orb.remove(), 700);
    });
  }

  render();
})();
