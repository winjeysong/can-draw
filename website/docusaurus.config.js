const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? '/' : '/can-draw/';

module.exports = {
  title: 'Can Draw',
  tagline: 'Draw canvas conveniently.',
  url: 'https://winjeysong.github.io',
  baseUrl,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'winjeysong', // Usually your GitHub org/user name.
  projectName: 'can-draw', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Can Draw',
      logo: {
        alt: 'Can Draw',
        src: 'img/docusaurus.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/winjeysong/can-draw',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Style Guide',
      //         to: 'docs/',
      //       },
      //       {
      //         label: 'Second Doc',
      //         to: 'docs/doc2/',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //       {
      //         label: 'Twitter',
      //         href: 'https://twitter.com/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'More',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: 'blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/winjeysong/can-draw',
      //       },
      //     ],
      //   },
      // ],
      copyright: `
<div>Copyright © ${new Date().getFullYear()} Winjey Song.</div>
<div style='display: flex;align-items: center;justify-content: center'>
  Built with &nbsp;
  <a href='https://github.com/facebook/docusaurus' target='_blank' style='display: inline-flex'><img src='/img/docusaurus.svg' height='20' alt='Docusaurus' /></a>.
</div>
`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/winjeysong/can-draw/website/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/winjeysong/can-draw/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
