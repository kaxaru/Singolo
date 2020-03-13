(function(){
    // 1 Header
    document.querySelector('nav').addEventListener("click", function(e){
        if (e.target.nodeName === "A") {
            e.currentTarget.querySelector('.active').classList.remove('active')
            e.target.classList.add('active')
        }
    })

    

    // 3 Slider: activate phones
    document.querySelector('.phone-slider').addEventListener("click", function(e){
        let elem = e.target;
        if (elem.nodeName == "IMG" && elem.parentElement.classList.contains('phone')) {
            elem.parentElement.querySelector('.invisible').classList.remove('invisible')
            elem.classList.add('invisible')
        }
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
            switch(e.target.textContent) {
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
            }

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


})()