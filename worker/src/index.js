// worker/src/index.js

import { indexHtml, planMd } from '../assets.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      return new Response(indexHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    if (url.pathname === '/plan') {
      return new Response(planMd, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};
