const w : number = window.innerWidth
const h : number = window.innerHeight 
const parts : number = 2 
const scGap : number = 0.02 / parts 
const sizeFactor : number = 15.2
const backColor : string = "#BDBDBD"
const delay : number = 20 
const colors : Array<string> = [
    "#B71C1C",
    "#00C853",
    "#304FFE",
    "#BF360C",
    "#6200EA"
]
const strokeFactor : number = 90 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }
}

class DrawingUtil {

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawDivideBall(context : CanvasRenderingContext2D, scale : number) {
        const sc1 : number = ScaleUtil.divideScale(scale, 0, parts)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, parts)
        const r : number = Math.min(w, h) / (sizeFactor * 2)
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 3; j++) {
            const y : number = (h / 2) + (w / 2 - h / 2) * (j % 2)
            context.save()
            context.rotate((Math.PI / 2) * j)
            DrawingUtil.drawCircle(context, 0, y * sc2, r * sc1)
            context.restore()
        }
        context.restore()
    }

    static drawDBNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor
        context.strokeStyle = colors[i]
        DrawingUtil.drawDivideBall(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}