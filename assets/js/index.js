window.onload=function(){
	slider()
    leftSwipe(".dtw_cate_left");
   
    
}
    //1、可以滑动  （touch  Y   改造setTransform）
    //2、往下滑动如果超出一定距离，不能滑动
    //3、往上滑动如果超出一定距离，不能滑动
    //4、当滑动大于最大定位区间，定位回去
    //5、当滑动小于最小定位区间，定位回去
    //6、点击ul的时候，改变当前li的样式（now）
    //7、点击的时候，被点击的li滑动到最顶端，如果滑动到最顶端超出定位区间，保持原位
function leftSwipe(str){
    //获取事件源和相关元素
    var parentBox = document.querySelector(str);
    var childBox = parentBox.querySelector("ul");
    var w = parentBox.offsetWidth;
    var W = childBox.offsetWidth;
    //缓冲距离
    var distance = 100;
    //最大定位距离
    var maxPositon = 0;
    //最小定位距离
    var minPosition = w-W;
    //最大滑动距离
    var maxSwipe = maxPositon+distance;
    //最小滑动距离
    var minSwipe = minPosition-distance;
    //还需要滑动相关变量
    var start = 0;//记录开始滑动的位置
    var move = 0;//记录滑动时的位置
    var isMove = false;//记录是否滑动
    var moveX = 0;//记录滑动的距离
    var currX = 0;//记录当前的位置


    //1、可以滑动  （touch  Y   改造setTransform）
    childBox.addEventListener("   ", function(){
        start = event.touches[0].pageX;
    });
    childBox.addEventListener("touchmove",function(){
        isMove = true;
        move = event.touches[0].pageX;
        moveX = move - start;
        if(moveX+currX<maxSwipe&&moveX+currX>minSwipe){
            chinasofti.removeTransition(childBox);
            chinasofti.setTransform(childBox, currX+moveX,"X")
        }
        
    });
    childBox.addEventListener("touchend",function(){
        if(isMove){
            if(moveX+currX>maxPositon){
                currX = maxPositon;
            }else if(moveX+currX<minPosition){
                currX = minPosition
            }else{
                currX = moveX + currX;
            }
        }
        chinasofti.addTransition(childBox);
        chinasofti.setTransform(childBox,currX,"X");
        start = 0;//记录开始滑动的位置
        move = 0;//记录滑动时的位置
        isMove = false;//记录是否滑动
        moveX = 0;//记录滑动的距离
        
    })
    
    //7、点击的时候，被点击的li滑动到最顶端，如果滑动到最顶端超出定位区间，保持原位
    chinasofti.tap(childBox,function(){
        var currLi = event.target.parentNode;
        var liArr = childBox.children;
        //6、点击ul的时候，改变当前li的样式（now）
        for(var i = 0;i<liArr.length;i++){
            liArr[i].index = i;
            liArr[i].className="";
        }
        currLi.className = "now";
        if(-currLi.index*currLi.offsetHeight>minPosition){
            currX = -currLi.index*currLi.offsetHeight;
        }else{
            currX = minPosition;
        }
            chinasofti.addTransition(childBox);
            chinasofti.setTransform(childBox,currX,"X");

    })


}

//轮播图
function slider(){
    //需求分析
    //1、自动轮播 (定时器 过渡)
    //2、小圆点随着图片滚动(监听图片显示的索引，然后设置当前样式now)
    //3、图片能滑动(touch)
    //4、滑动不超过一定距离 吸附回去 (过渡)
    //5、滑动超过一定距离 滚动到下一张(过渡)
    
    //0、获取事件源和相关元素
    var box = document.querySelector(".banner");
    var imgUl = box.children[0];    
    var imgLis = imgUl.children;
    var dotDiv = box.children[1];    
    var dotLis = dotDiv.children[0].children;
    var width = box.offsetWidth;
    var num = 1;
    console.log(dotLis)
    //1、自动轮播 (定时器 过渡)
    clearInterval(box.timer);
    box.timer = setInterval(function(){
        num++;
        chinasofti.addTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width);

    }, 5000)
    
    chinasofti.addTransitionEnd(imgUl, function(){
        if(num>imgLis.length-2){
            num = 1;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width);
        }else if(num==0){
            num = imgLis.length-2;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width);
        }
        
        light();
        
    })
    //2、小圆点随着图片滚动(监听图片显示的索引，然后设置当前样式now)
    function light(){
        for(var i =0;i<dotLis.length;i++){
            dotLis[i].className = "";                        
        }
        dotLis[num-1].className = "now";
        
        
    }   
    
    
    
    //4、滑动不超过一定距离 吸附回去 (过渡)
    //5、滑动超过一定距离 滚动到下一张(过渡)
    var startX = 0 ;
    var moveX = 0 ;
    var endX = 0;
    var isMove = false;
    var distance = 0;
    imgUl.addEventListener("touchstart", function(e){
        clearInterval(box.timer);
        startX = e.touches[0].clientX;
    })
    imgUl.addEventListener("touchmove", function(e){
        moveX = e.touches[0].clientX;
        isMove = true;
        //3、图片能滑动(touch)
        distance = moveX - startX;
        chinasofti.removeTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width+distance);
        // if(distance>0){
        //     //distance>0,右滑，就是要看上一张
        //     setTransform(imgUl,-num*width+distance);
        // }else{
        //     //distance<0,左滑，就是要看下一张
        //     setTransform(imgUl,-num*width+distance);
        // }
        
    })
    imgUl.addEventListener("touchend", function(e){
        endX = moveX;
        if(isMove){
            if(Math.abs(distance)>width/3){
              if(distance>0){
                    num--;
              }else{
                    num++;
              }
                chinasofti.addTransition(imgUl);
                chinasofti.setTransform(imgUl,-num*width);

            }else{
                chinasofti.addTransition(imgUl);
                chinasofti.setTransform(imgUl,-num*width);
            }
        }
        clearInterval(box.timer);
        box.timer = setInterval(function(){
        num++;
        chinasofti.addTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width);

        }, 5000)
        startX = 0 ;
        moveX = 0 ;
        endX = 0;
        isMove = false;
        distance = 0;
    });
    
}


var NaDiv= document.querySelector(".dtw_cate_left");
var NaLis=NaDiv.getElementsByTagName("li");
function Navigation(){
	
    for(var i =0;i<NaLis.length;i++){   
    	NaLis[i].className="";     	        
       }
}
lisFun();
function lisFun(){
	for(var i=0;i<NaLis.length;i++){
		NaLis[i].onclick=function(){
			Navigation();
			this.className="active";
		}
	}
}



