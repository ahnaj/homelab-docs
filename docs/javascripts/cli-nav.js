document.querySelectorAll('[data-cli-nav]').forEach((form) => {
  const terminal = form.closest('.cli-nav');
  const input = form.querySelector('input');
  const output = terminal.querySelector('[data-cli-output]');
  const prompt = terminal.querySelector('[data-cli-prompt]');
  const pages = [...terminal.querySelectorAll('[data-cli-command]')].map((link) => ({
    name: link.dataset.cliCommand, url: new URL(link.href),
  }));
  const normalizeURL = (url) => url.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
  const current = pages.find((page) => normalizeURL(page.url) === normalizeURL(new URL(location.href)));
  const cwd = !current || current === pages[0] ? '/' : `/${current.name}`;
  const storageKey = `homelab-shell:${pages[0]?.url.pathname}`;
  const builtins = ['help', 'ls', 'pwd', 'cd', 'whoami', 'hostname', 'history', 'clear'];
  let history = [], lines = [], previous = '/', historyIndex = 0, draft = '';
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (saved) {
      history = (saved.history || []).filter((s) => typeof s === 'string').slice(-100);
      lines = (saved.lines || []).filter((s) => typeof s === 'string').slice(-120);
      previous = typeof saved.previous === 'string' ? saved.previous : '/';
    }
  } catch { /* Storage is optional, including in private browsing. */ }
  const persist = () => {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ history, lines, previous })); } catch { /* Keep working without storage. */ }
  };
  const write = (text) => {
    lines.push(text);
    lines = lines.slice(-120);
    const line = document.createElement('div');
    line.textContent = text;
    output.append(line);
    while (output.childElementCount > 120) output.firstElementChild.remove();
    output.scrollTop = output.scrollHeight;
    persist();
  };
  const restored = lines;
  lines = [];
  restored.forEach(write);
  if (!restored.length) write('Homelab navigation shell. Type help to get started.');
  prompt.textContent = `guest@homelab:${cwd}$`;
  historyIndex = history.length;
  terminal.hidden = false;

  const resolve = (path) => {
    if (path === '-') return previous;
    if (path === '~') return '/';
    if (path.startsWith('~/')) path = path.slice(1);
    const parts = path.startsWith('/') ? [] : cwd.split('/').filter(Boolean);
    path.split('/').forEach((part) => {
      if (part === '..') parts.pop();
      else if (part && part !== '.') parts.push(part);
    });
    return '/' + parts.join('/');
  };
  const pageAt = (path) => path === '/' ? pages[0] : pages.find((page) => '/' + page.name === path);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const raw = input.value.trim();
    input.value = '';
    draft = '';
    if (!raw) return;
    write(`${prompt.textContent} ${raw}`);
    history.push(raw);
    history = history.slice(-100);
    historyIndex = history.length;
    persist();
    const [command, ...args] = raw.split(/\s+/);
    if (!builtins.includes(command)) { write(`sh: ${command}: command not found. Type help.`); return; }
    if ((['ls', 'cd'].includes(command) && args.length > 1) || (!['ls', 'cd'].includes(command) && args.length)) {
      write(`${command}: unexpected arguments`); return;
    }
    switch (command) {
      case 'help':
        write('ls [path]     List pages (ls / lists all pages)\ncd [path]     Open a page; cd / returns home; cd - goes back\npwd           Show current directory\nwhoami        Show current visitor\nhostname      Show shell host name\nhistory       Show recent commands\nclear         Clear the transcript\n\n↑/↓ recall commands · Tab completes · Ctrl+C cancels · Ctrl+L clears\nPaths support /, ~, . and ..; use cd /hardware from any page.\nThis is a website shell; system commands, pipes and scripts are unavailable.');
        break;
      case 'pwd': write(cwd); break;
      case 'whoami': write('guest'); break;
      case 'hostname': write('homelab'); break;
      case 'history': write(history.map((line, i) => `${String(i + 1).padStart(3)}  ${line}`).join('\n')); break;
      case 'clear': lines = []; output.replaceChildren(); persist(); break;
      case 'ls': {
        const path = resolve(args[0] || '.');
        if (!pageAt(path)) write(`ls: ${args[0]}: No such directory`);
        else if (path === '/') write(pages.map((page) => `${page.name}/`).join('  '));
        else write('(no subdirectories; use ls / to list pages)');
        break;
      }
      case 'cd': {
        const path = resolve(args[0] || '/');
        const page = pageAt(path);
        if (!page) { write(`cd: ${args[0]}: No such directory`); break; }
        if (path !== cwd) {
          previous = cwd;
          persist();
          location.assign(page.url.href);
        }
        break;
      }
    }
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === history.length) draft = input.value;
      historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
      input.value = historyIndex === history.length ? draft : history[historyIndex];
      input.setSelectionRange(input.value.length, input.value.length);
    } else if (event.ctrlKey && ['c', 'l'].includes(event.key.toLowerCase())) {
      if (event.key.toLowerCase() === 'c' && input.selectionStart !== input.selectionEnd) return;
      event.preventDefault();
      if (event.key.toLowerCase() === 'l') { lines = []; output.replaceChildren(); persist(); }
      else { write(`${prompt.textContent} ${input.value}^C`); input.value = ''; draft = ''; historyIndex = history.length; }
    } else if (event.key === 'Tab' && !event.shiftKey && input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
      const text = input.value;
      let candidates = [];
      if (/^\S*$/.test(text)) candidates = builtins.filter((name) => name.startsWith(text));
      else {
        const match = text.match(/^(cd|ls)\s+(\S*)$/);
        if (match) {
          const token = match[2], slash = token.lastIndexOf('/');
          const prefix = token.slice(0, slash + 1), leaf = token.slice(slash + 1);
          if (resolve(prefix || '.') === '/') candidates = pages.filter((page) => page.name.startsWith(leaf)).map((page) => `${match[1]} ${prefix}${page.name}/`);
        }
      }
      // With no match, Tab keeps its normal focus-navigation behavior.
      if (candidates.length) {
        event.preventDefault();
        if (candidates.length === 1) input.value = candidates[0];
        else write(candidates.join('  '));
      }
    }
  });
});
