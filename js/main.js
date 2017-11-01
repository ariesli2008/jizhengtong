window.onload = function () {
    //点击弹出详细
    (function () {
        var oBtn_detail = document.getElementsByClassName('btn_detail');
        var list = document.getElementsByClassName('list');
        for(var i=0;i<oBtn_detail.length;i++){
            (function (num) {
                oBtn_detail[num].addEventListener('touchstart',function () {
                    var oDet = list[num].getElementsByClassName('detail_display')[0];

                    var aI = oBtn_detail[num].getElementsByTagName('i')[0];
                    if(oDet.style.display == 'block'){
                        aI.innerHTML =   '&#xe60a';
                        oDet.style.display = 'none'
                    }else{
                        aI.innerHTML =   '&#xe66f';
                        oDet.style.display = 'block'
                    }
                },false)
            })(i)
        }
    })();

    //点击出搜索框
    (function () {
        var oNav=document.getElementsByClassName('nav')[0];
        var oSear=document.getElementsByClassName('search')[0];
        var oSea2=document.getElementsByClassName('search2')[0];
        var oCan=document.getElementsByClassName('cancel')[0];
        var list = document.getElementsByClassName('list');
        oSear.addEventListener('touchstart',function () {
            oNav.style.display='none';
            oSea2.style.display='block';
        });
        oCan.addEventListener('touchstart',function () {
            oNav.style.display='block';
            oSea2.style.display='none';
        });
    })();

    //滑动选择空箱或重箱
    (function () {
        //返回角度
        function GetSlideAngle(dx, dy) {
            return Math.atan2(dy, dx) * 180 / Math.PI;
        }
        //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
        function GetSlideDirection(startX, startY, endX, endY) {
            var dy = startY - endY;
            var dx = endX - startX;
            var result = 0;

            //如果滑动距离太短
            if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return result;
            }

            var angle = GetSlideAngle(dx, dy);
            if(angle >= -45 && angle < 45) {
                result = 4;
            }else if (angle >= 45 && angle < 135) {
                result = 1;
            }else if (angle >= -135 && angle < -45) {
                result = 2;
            }
            else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            }

            return result;
        }

        var oContainer = document.querySelector('#container');
        var oScroll_wrap = oContainer.querySelector('.scroll_wrap ');
        var oHeavy_box = document.querySelector('.heavy_box');
        var oEmpty_box = document.querySelector('.empty_box');

        var dis = {};
        var moveX = 0;
        var listX= 0;
        var reg = /active/g;
        var reg2= /\s+/g;
        oHeavy_box.addEventListener('touchstart',silder,false);
        oEmpty_box.addEventListener('touchstart',silder,false);

        oContainer.addEventListener('touchstart',start,false);
        oContainer.addEventListener('touchmove',move,false);
        oContainer.addEventListener('touchend',end,false);

        function silder() {
            oScroll_wrap.style.transition = '1s';
            if(this == oHeavy_box ){
                oScroll_wrap.style.transform = 'translateX(' + (-15) + 'rem)';
                oHeavy_box.className += ' active';
                oEmpty_box.className = oEmpty_box.className.replace(reg, '').replace(reg2,' ');
            }else{
                oScroll_wrap.style.transform = 'translateX('+(0)+'rem)';
                oEmpty_box.className += ' active';
                oHeavy_box.className = oHeavy_box.className.replace(reg, '').replace(reg2,' ')
            }
        }
        function start(ev) {
            var oEvent = ev || event;
            dis = {
                x:ev.touches[0].pageX,
                y:ev.touches[0].pageY
            };
            listX = oScroll_wrap.getBoundingClientRect().left;
        }
        function move(ev) {
            var oEvent = ev || event;
            var move = {
                x:oEvent.changedTouches[0].pageX ,
                y:oEvent.changedTouches[0].pageY
            };

            var direction = GetSlideDirection(dis.x, dis.y, move.x, move.y);
            if(direction == 3 || direction == 4){
                moveX = Math.floor(move.x - dis.x +listX) ;
                oScroll_wrap.style.transform = 'translateX('+moveX+'px)';
            }
            return false;

        }
        function end(ev) {
            oScroll_wrap.style.transition = '1s';
            var end = {
                x:ev.changedTouches[0].pageX,
                y:ev.changedTouches[0].pageY
            };
            var direction = GetSlideDirection(dis.x, dis.y, end.x, end.y);
            if(direction == 3 ) {
                    oScroll_wrap.style.transform = 'translateX(' + (-15) + 'rem)';
                    oHeavy_box.className += ' active';
                    oEmpty_box.className = oEmpty_box.className.replace(reg, '').replace(reg2, ' ');
            }
            if(direction == 4 ){
                oScroll_wrap.style.transform = 'translateX('+(0)+'rem)';
                oEmpty_box.className += ' active';
                oHeavy_box.className = oHeavy_box.className.replace(reg, '').replace(reg2,' ');
            }


        }
    })();

    //点击价格排序
    (function () {
        var oPrice =  document.getElementById('triangle_price');
        var triangle = oPrice.getElementsByClassName('triangle')[0];
        function sort() {
            if(triangle.className == 'triangle' ){
                triangle.className = 'triangle_up';
            }else{
                triangle.className = 'triangle';
            }
        }
        oPrice.addEventListener('touchstart',sort,false);
    })();

};
