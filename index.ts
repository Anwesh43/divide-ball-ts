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

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }
}