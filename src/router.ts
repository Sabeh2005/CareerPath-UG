import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
  await import('urlpattern-polyfill');
}

import { Router } from '@thepassle/app-tools/router.js';
import { lazy } from '@thepassle/app-tools/router/plugins/lazy.js';

const baseURL: string = (import.meta as any).env.BASE_URL;

export const router = new Router({
  routes: [
    {
      path: resolveRouterPath(),
      title: 'Home',
      render: () => html`<app-home></app-home>`,
    },
    {
      path: resolveRouterPath('quiz'),
      title: 'Career Quiz',
      plugins: [lazy(() => import('./pages/app-quiz.js'))],
      render: () => html`<app-quiz></app-quiz>`,
    },
    {
      path: resolveRouterPath('mapper'),
      title: 'Subject Mapper',
      plugins: [lazy(() => import('./pages/app-mapper.js'))],
      render: () => html`<app-mapper></app-mapper>`,
    },
    {
      path: resolveRouterPath('results'),
      title: 'Results',
      plugins: [lazy(() => import('./pages/app-results.js'))],
      render: () => html`<app-results></app-results>`,
    },
  ],
});

export function resolveRouterPath(unresolvedPath?: string) {
  let resolvedPath = baseURL;
  if (unresolvedPath) {
    resolvedPath += unresolvedPath;
  }
  return resolvedPath;
}
