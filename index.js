var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f'];	//box背景色
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#616161'];	//body背景色

var style = document.createElement('style');
var boxs = document.getElementsByClassName('item');
style.innerHTML = boxBg.reduce(function (acc, cur, index) {
    return acc += `.wrapper .inner .item:nth-child(${index}) div{
        background:url('./images/${index}.png') no-repeat center center;
        background-color:${cur};
    }`
}, '');
document.head.appendChild(style);

// document.body.onmousemove = function (e) {
//     document.querySelector('.wrapper').style.perspectiveOrigin = e.pageX + 'px ' + e.pageY + 'px';
// }
[].slice.apply(boxs).forEach(function (item, index) {
    // 
    item.onmouseenter = function (e) {
        var style = this.getBoundingClientRect();
        var point1 = {
            x: style.left + style.width / 2,
            y: style.top + style.height / 2
        };
        var point2 = {
            x: e.clientX,
            y: e.clientY
        }
        var result = calcDeg(point1, point2);
        if (result === 0) {
            this.classList.add('top');
        } else if (result === 1) {
            this.classList.add('right');
        } else if (result === 2) {
            this.classList.add('bottom');
        } else {
            this.classList.add('left');
        }
        document.body.style.backgroundColor = bodyBg[Math.ceil(Math.random() * bodyBg.length)];
    }
    item.onmouseleave = function (e) {
        this.setAttribute('class', 'item')
        document.body.style.backgroundColor = bodyBg[Math.ceil(Math.random() * bodyBg.length)];
    }
})

/**
 * 计算两个点的角度，返回一个数值,top为0,right为1,bottom为2,left为3
 * @param {Object} point1 每个盒子的中心点
 * @param {Object} point2 鼠标进入盒子的点
 */
function calcDeg(point1, point2) {
    var x1 = point1.x,
        y1 = point1.y,
        x2 = point2.x,
        y2 = point2.y;
    var deg = Math.ceil(Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180);
    deg = (Math.round((deg + 180) / 90) + 3) % 4;
    return deg;
}

// 注目礼:实质就是让包裹层rotate x方向移动的时候，rotatey() y轴方向移动的时候，rotatex()
document.body.onmousemove = function (e) {
    var xCur = e.clientX;
    var yCur = e.clientY;
    var clientX = window.innerWidth;
    var clientY = window.innerHeight;
    var perX = Math.round(((xCur / clientX) - 0.5) * 20);
    var perY = Math.round(((yCur / clientY) - 0.5) * 20);
    console.log(perX, perY);
    // console.log(document.getElementsByClassName('inner')[0].style)
    document.getElementsByClassName('inner')[0].style.transform = `rotatex(${-perY}deg) rotatey(${perX}deg)`
} 