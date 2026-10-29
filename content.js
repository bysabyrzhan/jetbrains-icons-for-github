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
  },
  '.txt': {
    light: 'icons/text/text.svg',
    dark: 'icons/text/text_dark.svg'
  },
  '.svg': {
    light: 'icons/image/image.svg',
    dark: 'icons/image/image_dark.svg'
  }
}

const fileNameIconSets = {
  '.gitignore': {
    light: 'icons/ignored/ignored.svg',
    dark: 'icons/ignored/ignored_dark.svg'
  },
  '.editorconfig': {
    light: 'icons/editorConfig/editorConfig.svg',
    dark: 'icons/editorConfig/editorConfig_dark.svg'
  }
}

const folderIconSet = {
  light: 'icons/folder@14x14/folder@14x14.svg',
  dark: 'icons/folder@14x14/folder@14x14_dark.svg'
}

function createIconPair(iconSet, isTreeItem = false) {
  const iconPair = document.createElement('span')
  iconPair.className = isTreeItem ? 'jb-icon-pair jb-icon-pair-tree' : 'jb-icon-pair'
  iconPair.setAttribute('aria-hidden', 'true')

  for (const [theme, path] of Object.entries(iconSet)) {
    const image = document.createElement('img')
    image.className = 'jb-icon jb-icon-' + theme
    image.src = browser.runtime.getURL(path)
    image.alt = ''
    iconPair.append(image)
  }

  return iconPair
}

function getIconSet(fileName, isDirectory) {
  if (isDirectory) return folderIconSet

  const extension = Object.keys(iconSets).find(value => fileName.endsWith(value))
  return fileNameIconSets[fileName] ?? iconSets[extension]
}

function addRepositoryListIcons() {
  const fileLinks = document.querySelectorAll(
    'a[aria-label$="(File)"], a[aria-label$="(Directory)"], a[aria-label="Parent directory"]'
  )

  for (const link of fileLinks) {
    const ariaLabel = link.getAttribute('aria-label')
    const isParentDirectory = ariaLabel === 'Parent directory'
    const isDirectory = isParentDirectory || ariaLabel.endsWith('(Directory)')
    const fileName = link.textContent.trim().toLowerCase()
    const iconSet = getIconSet(fileName, isDirectory)

    if (!iconSet) continue

    const directoryColumn = link.closest('.react-directory-filename-column')
    const defaultIcon = directoryColumn?.querySelector(':scope > svg') ?? link.querySelector('svg')
    defaultIcon?.classList.add('jb-default-icon-hidden')

    if (link.querySelector('.jb-icon-pair')) continue

    const iconPair = createIconPair(iconSet)
    const parentDirectoryContent = isParentDirectory ? link.querySelector('div') : null

    if (parentDirectoryContent) {
      parentDirectoryContent.prepend(iconPair)
    } else {
      link.prepend(iconPair)
    }
  }
}

function addSidebarTreeIcons() {
  const treeItems = document.querySelectorAll('li[role="treeitem"]')

  for (const treeItem of treeItems) {
    const text = treeItem.querySelector('[class*="TreeView-item-content-text"]')
    const visual = treeItem.querySelector('[class*="TreeView-item-visual"]')

    if (!text || !visual) continue

    const fileName = text.textContent.trim().toLowerCase()
    const isDirectory = treeItem.hasAttribute('aria-expanded')
    const iconSet = getIconSet(fileName, isDirectory)

    if (!iconSet || visual.querySelector('.jb-icon-pair')) continue

    visual.replaceChildren(createIconPair(iconSet, true))
  }
}

function addIcons() {
  addRepositoryListIcons()
  addSidebarTreeIcons()
}

addIcons()

const observer = new MutationObserver(() => addIcons())
observer.observe(document.body, {
  childList: true,
  subtree: true
})
