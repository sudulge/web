const $settingbutton = document.querySelector("#setting")
const $changebutton = document.querySelector("#change")
const $settinginterface = document.querySelector("#settinginterface")
const $inputname = document.querySelector("#inputname")
const $add = document.querySelector("#add")
const $members = document.querySelector("#members")

const $layoutbuttons = document.querySelector("#display") 

const $content = document.querySelector(".content")
const $videowrapper = document.querySelector(".videowrapper")
const $chatwrapper = document.querySelector(".chatwrapper")


layoutlist = [['인덱스 length랑 맞추려고 넣어놓음 혐그방지'], ['1-1'], ['2-1','2-2', '2-3'], ['3-1', '3-2', '3-3'], ['4-1', '4-2', '4-3', '4-4'], ['5-1'], ['6-1']]


$settingbutton.addEventListener('click', function() {
    if (window.getComputedStyle($settinginterface).visibility == 'visible') {
        $settinginterface.style.visibility = 'hidden'
    } else {
        $settinginterface.style.visibility = 'visible'
    }
})

$changebutton.addEventListener('click', function() {
    reindex()
})


function addstream(name) {
    const stream = document.querySelectorAll(`[name=${name}]`)
    if (stream.length != 0) {
        for (const ele of stream) {
            ele.remove()
        }
        makelayoutbuttons()
        for (let i in $videowrapper.children) {
            $videowrapper.children[i].setAttribute('index', Number(i)+1)
            $chatwrapper.children[i].setAttribute('index', Number(i)+1)
            $videowrapper.children[i].setAttribute('style', `order: ${Number(i)+1};`)
            $chatwrapper.children[i].setAttribute('style', `order: ${Number(i)+1};`)
        }
        return
    }
    let index = $videowrapper.children.length + 1
    let video = document.createElement('iframe')
    video.setAttribute('src', `https://player.twitch.tv/?channel=${name}&parent=sudulge.github.io&mtued=false`)
    video.setAttribute('name', name)
    video.setAttribute('index', index)
    video.setAttribute('style', `order: ${index};`)
    video.setAttribute('frameborder', '0')
    video.setAttribute('allowfullscreen', true)
    let chat = document.createElement('iframe')
    chat.setAttribute('src', `https://www.twitch.tv/embed/${name}/chat?darkpopout&parent=sudulge.github.io`)
    chat.setAttribute('name', name)
    chat.setAttribute('index', index)
    chat.setAttribute('style', `order: ${index};`)
    chat.setAttribute('frameborder', '0')
    $videowrapper.appendChild(video)
    $chatwrapper.appendChild(chat)
    $inputname.value = ''

    makelayoutbuttons()
}

function makelayoutbuttons() {
    while ($layoutbuttons.hasChildNodes()){
        $layoutbuttons.removeChild($layoutbuttons.firstChild)
    }
    for (const layout of layoutlist[$videowrapper.children.length]) {
        let button = document.createElement('button')
        button.setAttribute('class', 'layoutbutton')
        button.setAttribute('id', layout)
        button.textContent = layout
        button.addEventListener('click', function() {
            for (const div of document.querySelectorAll('[layout]')) {
                div.setAttribute('layout', button.id)
            }
        })
        $layoutbuttons.appendChild(button)
    }
    for (const div of document.querySelectorAll('[layout]')) {
        div.setAttribute('layout', layoutlist[$videowrapper.children.length][0])
    }
}


function reindex() {
    Array.from($videowrapper.children).forEach((element, index) => {
        let nowindex = Number(element.getAttribute('index'))
        let nextindex = nowindex + 1
        if (nextindex > $videowrapper.children.length) {
            nextindex = 1
        }
        $videowrapper.children[index].setAttribute('index', nextindex)
        $chatwrapper.children[index].setAttribute('index', nextindex)
        $videowrapper.children[index].style.order = nextindex
        $chatwrapper.children[index].style.order = nextindex
    })
}

for (const member of $members.children) {
    member.style.backgroundImage = `url(image/${member.id}.png)`
    member.addEventListener('click', function() {
        addstream(member.id)
    })
}
