class Menu {
    constructor(id) {
        this.box = document.querySelector(id)
        // this.ul = document.querySelector("ul")
        this.menuUl = document.querySelector(".menu-ul")
        // this.lis = document.querySelectorAll("li")
        this.lis = document.querySelectorAll(".menu-ul li")
        this.subMenuEles = this.box.querySelectorAll(".sub-menu")

        this.timer1 = null
        this.timer2 = null
        this.init()
    }

    init() {
        console.log("menu")

        this.lis.forEach((item) => {
            item.addEventListener("mouseenter", (e) => {
                let li = e.target
                console.log("mouseenter")

                if (this.timer1 != null) {
                    clearTimeout(this.timer1)
                }
                this.timer1 = setTimeout(() => {
                    this.subMenuEles.forEach((item) => {
                        item.classList.remove("active");
                    });
                    li.children[1].classList.add("active");
                }, 200);
                console.log(item)
            })
        });
        this.lis.forEach((item) => {
            item.addEventListener("mouseleave", (e) => {
                let li = e.target
                console.log("mouseleave")
                if (this.timer2 != null) {
                    clearTimeout(this.timer2);
                }
                // this.timer2 = setTimeout(() => {
                this.subMenuEles.forEach((item) => {
                    item.classList.remove("active");
                });
                JSON.
                // }, 200);
            })
            // item.add
        });
    }
}