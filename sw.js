importScripts('./js/uhtml-ssr.js');

addEventListener('activate', () => clients.claim(), {once: true});

addEventListener('message', ({source, data: pathname}) => {
  // only needed to normalize the URL in GitHub pages
  pathname = pathname.replace(/^\/sw-uhtml-ssr/, '');
  source.postMessage(
    pathname in pages ?
      render(String, pages[pathname]) :
      'Not Found'
  );
});

const {render, html} = uhtml;

const header = () => html`
  <header>
    <h1>uhtml-ssr via Service Worker</h1>
  </header>
`;

const footer = () => html`
  <footer>
    <a href="./about">About</a>
    <a href="./404">Not Found</a>
  </footer>
`;

const pages = {
  ['/']: () => html`
    ${header()}
    <main>
      <p>
        Hello there! Please try one of the footer links 👋
      </p>
    </main>
    ${footer()}
  `,
  ['/about']: () => html`
    ${header()}
    <main>
      <p>
        This demo showcases <code>uhtml-ssr</code> used, as Service Worker
        utility, to generate on the Worker side any HTML content.
      </p>
      <p>
        Such content could be generated dynamically, or statically,
        and it lands on the client right away.
      </p>
    </main>
    ${footer()}
  `
};
