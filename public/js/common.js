if(document.getElementById('focus')){
	document.getElementById('focus').focus();
}

function show(el){
	document.querySelector(el).style.display = "block";
}
function hide(el){
	document.querySelector(el).style.display = "none";
}
function addFocus(el, focus){
	var focus = focus || 'focus';
	var element = document.querySelector(el);
	element.className += ' ' + focus;
}
function removeFocus(el, focus){
	var focus = focus || 'focus';
	var element = document.querySelector(el);
	var ele = element.className.split(" ");
	var classname = [];
	ele.forEach(function(v){
		if(v !== focus){
			classname.push(v);
		}
	});
	element.className = classname.join(" ");
}