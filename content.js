const {
  byExtension: iconSets,
  byFileName: fileNameIconSets,
  folder: folderIconSet,
  unknown: unknownIconSet
} = globalThis.githubFileIconConfig

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
  return fileNameIconSets[fileName] ?? iconSets[extension] ?? unknownIconSet
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
