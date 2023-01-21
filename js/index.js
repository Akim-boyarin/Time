class Time {
    #timeNode = null;
    #time = '';
    #color = "rgb(100, 100, 100)";

    constructor(timeSelector) {
        this.#timeNode = document.querySelector(timeSelector);
        if (this.#timeNode === null) return;

        this.#run();
    }

    #getTime() {
        this.#time = (new Date()).toLocaleTimeString();
    }
    #renderTime() {
        this.#timeNode.textContent = this.#time;
    }
    #setTime() {
        this.#getTime();
        this.#renderTime();
    }
    #getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    #changeColorPart(colorPart) {
        const RANGE = 5;
        let newColorPart = this.#getRandomNum(colorPart - RANGE, colorPart + RANGE);
        
        if (newColorPart <= 0) newColorPart = 0;
        if (newColorPart >= 255) newColorPart = 255;

        return newColorPart;
    }
    #parseColor() {
        let leftBracket = "(";
        let rightBracket = ")";

        let leftBracketIndex = this.#color.indexOf(leftBracket);
        let rightBracketIndex = this.#color.lastIndexOf(rightBracket);

        let colorNumsString = this.#color.slice(leftBracketIndex + 1, rightBracketIndex);
        let colorPartsString = colorNumsString.split(", ");
        let colorParts = colorPartsString.map(stringValue => +stringValue);

        return colorParts;
    }
    #changeColor() {
        let colorParts = this.#parseColor();
        colorParts = colorParts.map(colorPart => {
            let newColorPart = this.#changeColorPart(colorPart);

            return newColorPart;
        });
        
        this.#color = `rgb(${colorParts.join(", ")})`;
    }
    #paintTime() {
        this.#timeNode.style.color = this.#color;
        this.#timeNode.style.borderColor = this.#color;
    }
    #setColor() {
        this.#changeColor();
        this.#paintTime();
    }
    #run() {
        let timeRange = 1000;
        let paintRange = 1200;

        let setTime = this.#setTime.bind(this);
        let setColor = this.#setColor.bind(this);

        setInterval(setTime, timeRange);
        setInterval(setColor, paintRange);
    }
}

let time = new Time(".clock");