//弹出视频
(function() {
    var playbtn = document.querySelector('#section1 .play'),
        dialog = document.querySelector('.dialog'),
        movie = document.querySelector('.movie'),
        shadow = document.querySelector('.shadow'),
        closeBtn = document.querySelector('.closeBtn'),
        moveInner = movie.innerHTML;

    playbtn.onclick = function() {
        dialog.style.display = shadow.style.display = 'block';
        movie.innerHTML = moveInner;
    };

    closeBtn.onclick = function() {
        dialog.style.display = shadow.style.display = 'none';
        movie.innerHTML = '';
    };
})();

//选项卡
(function() {
    function tab(btn, content) {
        var btns = btn.children;
        var cons = content.children;

        for (var i = 0; i < btns.length; i++) {
            btns[i].index = i;
            btns[i].onclick = function() {
                for (var i = 0; i < btns.length; i++) {
                    btns[i].classList.remove('active'); //classList class的集合
                    cons[i].classList.remove('active'); //classList class的集合
                }

                this.classList.add('active');
                cons[this.index].classList.add('active');
            }
        }
    }

    var tabBtns = document.querySelectorAll('.tabBtn');
    var tabContents = document.querySelectorAll('.tabContent');
    for (var i = 0; i < tabContents.length; i++) {
        tab(tabBtns[i], tabContents[i]);
    }
})();

//轮播图
(function() {
    function carousel(id) {
        var wrap = document.querySelector(id + ' .wrap'),
            ul = document.querySelector(id + ' ul'),
            prev = document.querySelector(id + ' .prev'),
            next = document.querySelector(id + ' .next'),
            circles = document.querySelectorAll(id + ' .circle span'),
            boxWidth = wrap.offsetWidth;

        var canClick = true; //是否可以进行下次点击
        var timer = null;

        ul.innerHTML += ul.innerHTML; //复制一份
        var len = ul.children.length;
        ul.style.width = len * boxWidth + 'px';
        ul.style.transform = 'translateX(0px)';

        var cn = 0; //当前索引值
        var ln = 0; //上一个选中的圆点的索引

        next.onclick = function() {
            if (!canClick) {
                //这个条件成立，说明现在图片正在走
                return;
            }

            cn++;
            move();
        }

        prev.onclick = function() {
            if (!canClick) {
                //这个条件成立，说明现在图片正在走
                return;
            }

            //把ul拉到中间
            if (cn == 0) {
                cn = len / 2;
                ul.style.transition = null;
                ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
            }

            /* 让定时器里的代码再下一次事件循环里执行 */
            setTimeout(function() {
                cn--;
                move();
            }, 13);
        }

        //圆点点击
        for (var i = 0; i < circles.length; i++) {
            circles[i].index = i;
            circles[i].onclick = function() {
                if (!canClick) {
                    //这个条件成立，说明现在图片正在走
                    return;
                }

                cn = this.index;
                move();
            }
        }

        function move() {
            canClick = false;

            ul.style.transition = '.3s';
            ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';

            /*
                同步圆点
                cn：0 1 2 3 4 5 6 7
                hn: 0 1 2 3 0 1 2 3
                cn%(length/2)
             */

            var hn = cn % (len / 2); //圆点对应的索引值 
            circles[ln].className = '';
            circles[hn].className = 'active';

            ln = hn;
        }

        ul.addEventListener('transitionend', function() {
            if (cn == len / 2) {
                cn = 0;

                ul.style.transition = null;
                ul.style.transform = 'translateX(0)';
            }

            canClick = true;
        });

        timer = setInterval(next.onclick, 3000);
    }

    carousel('#section3');
    carousel('#section5');
})();

//新增场景选项卡
(function() {
    var section4 = document.querySelector('#section4'),
        lis = document.querySelectorAll('#section4 li'),
        bottom = document.querySelector('.bottom');

    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('active');
            }
            this.classList.add('active');

            section4.style.background = 'url(images/section4_big_0' + (this.index + 1) + '.png) no-repeat center top';
            bottom.style.background = 'url(images/section4_big_0' + (this.index + 1) + '_bottom.png) no-repeat center top';
        }
    }
})();

//手风琴
(function() {
    var lis = document.querySelectorAll('#section7 li');

    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('active');
            }
            this.classList.add('active');
        }
    }
})();



(function() {
    var ul = document.querySelector('#section8 ul'),
        lis = ul.children,
        prev = document.querySelector('#section8 .prev'),
        next = document.querySelector('#section8 .next'),
        spans = document.querySelectorAll('#section8 .circle span'),
        cn = 0,
        ln = 0;

    next.onclick = function() {
        cn++;
        cn %= lis.length; //永远在0 ~ length-1之间循环

        ul.appendChild(lis[0]);

        spans[ln].className = '';
        spans[cn].className = 'active';

        ln = cn;
    }

    prev.onclick = function() {
        cn--;
        if (cn < 0) {
            cn = lis.length - 1;
        }

        ul.insertBefore(lis[lis.length - 1], lis[0]);

        spans[ln].className = '';
        spans[cn].className = 'active';

        ln = cn;
    }

})()