function getTitle(title: string) {
    const containLinkTitleReg = /#+\s\[.*?\]\(.*?\)/

    const pattOfTitle = /#+\s([^#\n]+)\n*/g // #(此括号不计, 表示注释: 可以有多个 # ) xxxx 格式

    // title 是否是为链接格式, 如: # [xxxx]() , 这在 markdown 中表示一个链接
    // 即: 如果用链接来作为标题, 则只取中括号里面的文本作为导航栏显示的文本
    if (containLinkTitleReg.test(title)) {
        // 取出链接中的文本
        // const textLinkReg = /\[(.*?)\]/g
        const textLinkReg = /\[([^\]]+)\]\([^)]+\)/g // 匹配 [text](link) 这样格式的文本

        // 取出 [text](link) 格式中的 text, 并排除掉此格式, 得到其余文本, 然后拼接, 得到纯文本
        //  [t1](l1) => t1
        // [t1](l1)abc[T2](l2) => t1abcT2
        title = title.replace?.(textLinkReg, '$1')?.replace?.('#', '')
    }

    title = title.replace(pattOfTitle, '$1') // 只得到 xxxx; 即: 在标题格式中 (# xxxx) 得到 xxxx

    return title
}

function trimArrZero(arr) {
    let start = 0
    let end = arr.length - 1

    for (start; start < arr.length; start++) {
        if (arr[start]) {
            break
        }
    }

    for (end; end >= 0; end--) {
        if (arr[end]) {
            break
        }
    }

    return arr.slice(start, end + 1)
}

export function safeScrollTo(element, top: number, left = 0) {
    if (!element) return

    if (typeof element.scrollTo === 'function') {
        const scrollConfig: ScrollToOptions = {
            top,
            left,
            behavior: 'smooth', // smooth: 平滑滚动; auto: 无动画直接跳转
        }
        element.scrollTo(scrollConfig)
    } else {
        if (element === window) {
            document.documentElement.scrollTop = top
            document.documentElement.scrollLeft = left
        } else {
            element.scrollTop = top
            element.scrollLeft = left
        }
    }
}

export function getNavStructure(source) {
    if (!source) {
        return []
    }

    const contentWithoutCode = source
        .replace(/^[^#]+\n/g, '')
        .replace(/(?:[^\n#]+)#+\s([^#\n]+)\n*/g, '') // 匹配行内出现 # 号的情况
        // 匹配如:# a\n -> \n 代表此处匹配的是回车;
        // 即: 此处会删除文章第一个标题, 不作为导航栏中的第一个导航
        // .replace(/^#\s[^#\n]*\n+/, '')
        .replace(/```[^`\n]*\n+[^```]+```\n+/g, '')
        .replace(/`([^`\n]+)`/g, '$1')
        .replace(/\*\*?([^*\n]+)\*\*?/g, '$1')
        .replace(/__?([^_\n]+)__?/g, '$1')
        .trim()

    // const pattOfTitle = /#+\s([^#\n]+)\n*/g
    const pattOfTitle = /#+\s([^\n]+)\n*/g

    const matchResult = contentWithoutCode.match(pattOfTitle)

    if (!matchResult) {
        return []
    }

    const navData = matchResult.map((result, i) => {
        return {
            index: i,
            level: result.match(/^#+/g)[0].length, // 标题级别, 如: h1, h2 对应 1, 2, 以此类推
            text: getTitle(result),
        }
    })

    let maxLevel = 0
    navData.forEach((t) => {
        if (t.level > maxLevel) {
            maxLevel = t.level
        }
    })
    const matchStack: { level: number; arr: number[] }[] = []
    // 此部分重构，原有方法会出现次级标题后再次出现高级标题时，listNo重复的bug
    for (let i = 0; i < navData.length; i++) {
        const t = navData[i]
        const { level } = t
        while (
            matchStack.length &&
            matchStack[matchStack.length - 1].level > level
        ) {
            matchStack.pop()
        }
        if (matchStack.length === 0) {
            const arr = new Array(maxLevel).fill(0)
            arr[level - 1] += 1
            matchStack.push({
                level,
                arr,
            })
            t.listNo = trimArrZero(arr).join('.')
            continue
        }
        const { arr } = matchStack[matchStack.length - 1]
        const newArr = arr.slice()
        newArr[level - 1] += 1
        matchStack.push({
            level,
            arr: newArr,
        })
        t.listNo = trimArrZero(newArr).join('.')
    }

    return navData
}

export function getCurrentHashValue() {
    return decodeURIComponent(window.location.hash.replace(/^#/, ''))
}

export function updateHash(value) {
    let updateHashTimeout: NodeJS.Timeout | null = null

    if (updateHashTimeout) {
        clearTimeout(updateHashTimeout)
    }

    updateHashTimeout = setTimeout(() => {
        window.history.replaceState(
            {},
            '',
            `${window.location.pathname}${window.location.search}#${value}`,
        )
    }, 0)
}
