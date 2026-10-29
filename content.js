const iconSets = {
  '.json': {
    light: 'icons/json/json.svg',
    dark: 'icons/json/json_dark.svg'
  },
  '.md': {
    light: 'icons/markdown/markdown.svg',
    dark: 'icons/markdown/markdown_dark.svg'
  },
  '.html': {
    light: 'icons/html/html.svg',
    dark: 'icons/html/html_dark.svg'
  },
  '.css': {
    light: 'icons/css/css.svg',
    dark: 'icons/css/css_dark.svg'
  },
  '.js': {
    light: 'icons/javaScript/javaScript.svg',
    dark: 'icons/javaScript/javaScript_dark.svg'
  },
  '.ts': {
    light: 'icons/typeScript/typeScript.svg',
    dark: 'icons/typeScript/typeScript_dark.svg'
  },
  '.jsx': {
    light: 'icons/jsx/jsx.svg',
    dark: 'icons/jsx/jsx_dark.svg'
  },
  '.tsx': {
    light: 'icons/tsx/tsx.svg',
    dark: 'icons/tsx/tsx_dark.svg'
  }
}

function addIcons() {
  const fileLinks = document.querySelectorAll('a[aria-label$="(File)"]')

  for (const link of fileLinks) {
    const fileName = link.textContent.trim().toLowerCase()
    const extension = Object.keys(iconSets).find(value => fileName.endsWith(value))

    if (!extension) continue

    const directoryColumn = link.closest('.react-directory-filename-column')
    const defaultIcon = directoryColumn?.querySelector(':scope > svg')
    defaultIcon?.classList.add('jb-default-icon-hidden')

    if (link.querySelector('.jb-icon-pair')) continue

    const iconPair = document.createElement('span')
    iconPair.className = 'jb-icon-pair'
    iconPair.setAttribute('aria-hidden', 'true')

    for (const [theme, path] of Object.entries(iconSets[extension])) {
      const image = document.createElement('img')
      image.className = 'jb-icon jb-icon-' + theme
      image.src = browser.runtime.getURL(path)
      image.alt = ''
      iconPair.append(image)
    }

    link.prepend(iconPair)
  }
}

addIcons()

const observer = new MutationObserver(() => addIcons())
observer.observe(document.body, {
  childList: true,
  subtree: true
})
