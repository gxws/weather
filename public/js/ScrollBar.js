var $customScroll = function(container, content, btn){
	window.scrollParams = {
		barTop: 0
	};

	if(container && content) {
		container = document.querySelector(container);
		content = document.querySelector(content);
		btn = document.querySelector(btn);
		//界面初始化
		var hContainer = container.clientHeight, hContent = content.clientHeight, hScale = hContainer / hContent, hBar = hScale * hContainer;
		if (hScale < 1) {
			document.querySelector('#Scroll').style.display = "block";
			//如果高度超出
			btn.style.height = hBar + 'px';
			var maxTop = hContainer - hBar;
			var overTop = hContent - hContainer;
			var funScroll = function() {
				var shouldY = scrollParams.barTop;
				if (shouldY < 0) {
					shouldY = 0;
				} else if (shouldY > maxTop) {
					shouldY = maxTop;
				}
				btn.style.top = shouldY + 'px';
				scrollParams.barTop = shouldY;

				content.style.top = (overTop * shouldY / maxTop) * -1 + 'px';
			};

			document.onkeydown = function(e){
				e = event || window.event;
				if(e.keyCode === 38 || e.keyCode === 33){
					scrollParams.barTop -= 30;
					funScroll();
				}
				if(e.keyCode === 40 || e.keyCode === 34){
					scrollParams.barTop += 30;
					funScroll();
				}
			}
		}
	}
}