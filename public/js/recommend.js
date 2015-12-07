var curr = 0;
var interval;
function slider(){
	var nodelist = document.querySelectorAll('#con-slide a');
	nodelist = Array.prototype.slice.call(nodelist);
	var length = nodelist.length;
	var tab_content = document.querySelectorAll('.recommend-slide-list');
	var tablist = document.querySelectorAll('.recommend-slide-select span');
	var i = length;
	while (i--){
		tab_content[i].style.display = 'none';
		tablist[i].className = '';
	}
	nodelist.forEach(function(element, index){
		element.onfocus = function(){
			clearInterval(interval);
			var i = length;
			while (i--){
				tab_content[i].style.display = 'none';
				tablist[i].className = '';
			}
			if(this.getAttribute('video') !== null){
				console.log(1);
				tab_content[index].className += ' focus';
			}
			tab_content[index].style.display = 'block';
			tablist[index].className = 'focus';
			curr = index;

			this.onkeydown = function(e){
				e = e || window.event;
				if(e.keyCode === 37 && index === 0){
					lunbo();
					tablist[0].className = 'active';
				}else if(e.keyCode === 39 && index === length - 1){
					lunbo();
					tablist[index].className = 'active';
				}else if(e.keyCode === 38 || e.keyCode === 40){
					lunbo();
					tablist[index].className = 'active';
				}
			}
		};
		element.onblur = function(){
			if(this.getAttribute('video') !== null){
				var reg = new RegExp("\\sfocus", "g");
				///\sfocus/g
				tab_content[index].className = tab_content[index].className.replace(reg, "");
			}
		};
	});
	tab_content[0].style.display = 'block';
	tablist[0].className = 'active';
}
function lunbo(){
	interval = setInterval(function(){
		var nodelist = document.querySelectorAll('#con-slide a');
		var length = nodelist.length;
		if(curr >= length-1){
			curr = 0;
		}else{
			curr++;
		}
		var index = curr;
		var tab_content = document.querySelectorAll('.recommend-slide-list');
		var tablist = document.querySelectorAll('.recommend-slide-select span');
		var length = nodelist.length;
		var i = length;

		while (i--){
			tab_content[i].style.display = 'none';
			tablist[i].className = '';
		}
		tab_content[index].style.display = 'block';
		tablist[index].className = 'active';
	}, 3000);
}
lunbo();
slider();