
import { marked } from 'marked';

/**
 * Parses the PLAN.md file content into a structured JSON object.
 * This is much cleaner than generating HTML on the server.
 */
function parsePlanToJson(markdownContent) {
    const tokens = marked.lexer(markdownContent);
    const phases = [];
    let currentPhase = null;
    let currentWeek = null;

    for (const token of tokens) {
        if (token.type === 'heading' && token.depth === 2 && token.text.startsWith('📋 PHASE')) {
            if (currentPhase) {
                phases.push(currentPhase);
            }
            currentPhase = {
                title: token.text.replace('📋 ', '').trim(),
                weeks: [],
            };
        } else if (token.type === 'heading' && token.depth === 3 && token.text.startsWith('Week')) {
            if (currentPhase) {
                currentWeek = { title: token.text, tasks: [] };
                currentPhase.weeks.push(currentWeek);
            }
        } else if (token.type === 'list' && currentWeek) {
            for (const item of token.items) {
                currentWeek.tasks.push({
                    text: item.text.replace(/<input[^>]*>\s*/, ''),
                    completed: item.checked || false,
                });
            }
        }
    }
    if (currentPhase) {
        phases.push(currentPhase);
    }

    // We will now transform the weeks into a flat task list for each phase
    return phases.map(phase => ({
        title: phase.title,
        tasks: phase.weeks.flatMap(week => week.tasks)
    }));
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        const planMd = env.PLAN_MD;
        const indexHtml = env.INDEX_HTML;
        const dashboardJs = env.DASHBOARD_JS;

        if (url.pathname === '/') {
            // 1. Parse the Markdown into a clean JSON object
            const planData = parsePlanToJson(planMd);

            // 2. Inject the JSON data directly into a script tag
            const finalHtml = indexHtml.replace(
                '<!--PLAN_DATA-->',
                `<script>window.PLAN_DATA = ${JSON.stringify(planData)};</script>`
            );

            return new Response(finalHtml, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
            });
        }

        if (url.pathname === '/dashboard.js') {
            return new Response(dashboardJs, {
                headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
            });
        }

        return new Response('Not Found', { status: 404 });
    },
};
