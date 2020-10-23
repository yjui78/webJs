class Slider {
    constructor(id) {
        this.box = document.querySelector(id)
        this.picBox = this.box.querySelector("ul")
        this.indexBox = this.box.querySelector(".index-box")
        this.sliderWidth = this.box.clinetWidth
        this.index = 1
        // this.init()
    }
    init() {

        console.log("slider")
        this.initPoint()
        this.copyPic()
    }

    initPoint() {
        const num = this.picBox.children.length;
        let frg = document.createDocumentFragment();
        for (let i = 0; i < num; i++) {
            let li = document.createElement("li")
            li.setAttribute("data-index", i + 1)
            if (i == 0) {
                li.className = "active"
            }
            frg.appendChild(li)

        }
        this.indexBox.children[0].style.width = num * 10 * 2 + "px";
        this.indexBox.children[0].appendChild(frg)

        this.indexBox.children[0].addEventListener("click", (e) => {
            let pointIndex = (e.target).getAttribute("data-index")
            this.index = pointIndex
            console.log(this.index)
        })
    }


    copyPic() {
        const first = this.picBox.firstElementChild.cloneNode(true)
        const last = this.picBox.lastElementChild.cloneNode(true)
        this.picBox.appendChild(first)
        this.picBox.insertBefore(last, this.picBox.firstElementChild)

        this.picBox.style.width = this.skiderWidth * this.picBox.children.length + "px"
        this.picBox.style.left = -1 * this.sliderWidth + "px"
    }
}