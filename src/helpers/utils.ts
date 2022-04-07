import { randomUUID } from 'crypto';
import * as MarkDownIt from 'markdown-it';
import hljs from 'highlight.js';

const md = new MarkDownIt({
  highlight: function (str: any, lang: any) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(str, {
            language: lang,
            ignoreIllegals: true,
          }).value
        }</code></pre>`;
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  },
});

export enum Code {
  AUTH = 80403,
  ARGS = 80501,
  REMOTE = 80502,
  DEFAULT = 80999,
  DONE = 0,
}

export const Utils = {
  unique(arr: string[]) {
    const res = new Map();
    return arr.filter((id) => !res.has(id) && res.set(id, 1));
  },

  randomUUID(count = 32) {
    return randomUUID()
      .replace(/-/g, '')
      .substring(0, count > 32 ? 32 : count);
  },
  checkNullObj(obj: any) {
    return Object.keys(obj).length === 0;
  },
  renderMd(desp: string) {
    return md.render(desp);
  },
};
