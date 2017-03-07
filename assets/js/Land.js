



var landDiv= document.querySelector(".dtw_Land");
var lanLis=landDiv.children[0].children
console.log(landDiv)
function Navigation(){
	
    for(var i =0;i<lanLis.length;i++){   
    	lanLis[i].className="";     	        
       }
}
lisFun();
function lisFun(){
	for(var i=0;i<lanLis.length;i++){
		lanLis[i].onclick=function(){
			Navigation();
			this.className="land";
		}
	}
}