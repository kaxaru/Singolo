(function(){
    // 1 Header
    let sections = ['home', 'services', 'portfolio', 'about', 'contact']
    let header = document.getElementsByTagName('header')[0]
    document.querySelector('nav').addEventListener("click", function(e){
        if (e.target.nodeName === "A") {
            e.preventDefault()
            e.currentTarget.querySelector('.active').classList.remove('active')
            e.target.classList.add('active')
            let anchor = e.target.getAttribute('href')
            let sectionsOffset = []
            let offsetY = 0
            for (let i = 0; i < sections.length; i++ ) {
                if(`#${sections[i]}` != anchor)
                    sectionsOffset.push(`#${sections[i]}`)
                else
                    break
            }

            sectionsOffset.map(s => {
                offsetY += document.querySelector(s).offsetHeight
            })

            window.scrollTo({
                top: offsetY,
                behavior:  'smooth'
            })
        }
    })
    // 2 Slider

    let slider = (setting) => {
        let configure = {};
        configure.setting = setting;
        configure.dom = {
            "main": document.querySelector(configure.setting.main),
            "wrap": document.querySelector(configure.setting.wrap),
            "children": document.querySelector(configure.setting.wrap).children,
            "prev": document.querySelector(configure.setting.prev),
            "next": document.querySelector(configure.setting.next)
        }

        configure.addSetting = {
            "position": 0,
            "max_position": document.querySelector(configure.setting.wrap).children.length
        }

        configure.nextSlide = () => {
            ++configure.addSetting.position;
            if(configure.addSetting.position >= configure.addSetting.max_position) {
                    configure.addSetting.position = 0
            }

            configure.dom.wrap.style["transform"] = `translateX(-${configure.addSetting.position}00%)`
        }

        configure.prevSlide = () => {
            --configure.addSetting.position;
            if(configure.addSetting.position < 0) {
                configure.addSetting.position = configure.addSetting.max_position - 1
            }

            configure.dom.wrap.style["transform"] = `translateX(-${configure.addSetting.position}00%)`
        }


        if(configure.dom.prev !== null) {
            configure.dom.prev.addEventListener('click', () => {
                configure.prevSlide();
            })
        }

        if(configure.dom.next !== null) {
            configure.dom.next.addEventListener('click', () => {
                configure.nextSlide();
            })
        }
    }

    // 3 Slider: activate phones
    document.querySelector('.phone-slider__wrapper').addEventListener("click", function(e){
        let elem = e.target;
        if (elem.nodeName == "DIV" && (elem.classList.contains('vertical__wrapper') || elem.classList.contains('horisontal__wrapper')) && elem.parentElement.classList.contains('phone')) {
            let parent = elem.parentElement
            let invisiblePhone = parent.querySelector('.phone-invisible')
            let visiblePhone = parent.querySelector('.phone-visible')
            invisiblePhone.classList.remove('phone-invisible')
            invisiblePhone.classList.add('phone-visible')
            visiblePhone.classList.remove('phone-visible')
            visiblePhone.classList.add('phone-invisible')
        }
    })

    slider({
        "main": "section.phone",
        "wrap": ".phone-slider__wrapper",
        "prev": ".prev",
        "next": ".next"
    })

    // 4 switch tabs
    let portfolioTriggers = document.querySelector('.portfolio-triggers')
    portfolioTriggers.addEventListener("click", function(e){
        let startIndex = 1;
        let endIndex = 12;
        generateElementGallery = function(start, end) {
            let numberOfElement = end - start + 1;
            let arrayNumOfGalleryPic = Array.from({length: numberOfElement}, (k, n) => n).map(el => el + startIndex ).sort(() => Math.random() - 0.5)
            let elementOfGallery = []
            arrayNumOfGalleryPic.map(el => {
                elementOfGallery.push(`<div class='item'><img src='./assets/pics/portfolio/gallery${el}.png' alt=''></div>`)
            })
            return elementOfGallery.join("")
            
        }
        let parent = e.target.parentElement 
        if(parent.classList.contains('portfolio-triggers')) {
            parent.querySelector('.active').classList.remove('active')
            e.target.classList.add('active')
            /*switch(e.target.textContent) {
                case "All":
                    break;
                case "Web Design":
                    endIndex = 6;
                    break;
                case "Graphic Design":
                    startIndex = 7
                    break;
                case "Artwork":
                    startIndex = 2;
                    endIndex = 9
                    break;
            }*/

            document.querySelector('.portfolio-gallery').innerHTML = generateElementGallery(startIndex, endIndex)
        }      
    })

    // 5 behaviour with pics
    let portfolioGallery = document.querySelector('.portfolio-gallery')
    portfolioGallery.addEventListener("click", function(e) {
        if (e.target.nodeName == "IMG") {
            let searchImgWithBorder = portfolioGallery.querySelector('.border')
            searchImgWithBorder !== null ? searchImgWithBorder.classList.remove('border') : null
            e.target.classList.add('border')
        }
    })

    // 6 submit form

    let form = document.querySelector('#quote-form')
    let submit = form.querySelector('input[type = "submit"]')
    let modal = document.querySelector('.dimmer.modals');
 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let subject = e.currentTarget.querySelector('input[name = subject]');
        let desc = e.currentTarget.querySelector('textarea[name =comment]');
        let content = modal.querySelector('.content')
        content.innerHTML = '';
        subject = subject.value == '' ? 'Без темы' : subject.value 
        desc = desc.value == '' ? 'Без описания' : desc.value 

        let templateMail = ` <span>Письмо отправлено</span> <span class='subject'>${subject}</span> <span class='desc'>${desc}</span>`
        content.innerHTML = templateMail

       document.body.classList.add('dimmed')
       modal.classList.remove('hidden')
       modal.classList.add('visible')
       modal.style = "display: flex !important"
       let childNode = modal.children[0]
       childNode.classList.remove('hidden')
       childNode.classList.add('visible')
       childNode.classList.add('active')
    })

    let modalButton = modal.querySelector('.ok.button')
    modalButton.addEventListener('click', (e) => {
        document.body.classList.remove('dimmed')
        modal.classList.remove('visible')
        modal.classList.add('hidden')
        let childNode = modal.children[0]
        childNode.classList.remove('visible')
        childNode.classList.remove('active')
        childNode.classList.add('hidden')
        modal.style = "display: 0"
        form.reset()
        let content = modal.querySelector('.content')
        content.innerHTML = '';
    })


})()