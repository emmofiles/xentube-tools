String.implement({
	flipText: function(backwards, upsideDown) {
		
		var convertedTxt = "";

		for (var c = (this.length-1); c >=0; c--) {
			var p = null;
			var g = (backwards) ? c : (-1*(c-this.length+1));
			var s = this.charAt(g);
			if (upsideDown) {
				p = (flipTable[s.toLowerCase()] || flipTableFlipped[s] || s.toLowerCase());
			}
			else {
				p = s;
			}
			
			convertedTxt += p;
			
		}

		return convertedTxt;
	}
});

window.addEvent('domready', function () {
	
	var original = $('originalText');
	
	var converted = $('convertedText');
	var back = $('backwards');
	var upside = $('upsideDown');
	
	var lastOriginalV = "";
	
	var justChange = function() {
		lastOriginalV = original.value;
		$('charCount').set('text', lastOriginalV.length);
		var converts = lastOriginalV.flipText(back.checked, upside.checked);
		converted.value = converts;
	}
	
	var checkChange = function() {
		if (original.value != lastOriginalV) {
			justChange();
		}
	};

	original.addEvent('keyup', function(e) {
		checkChange();
	});
	
	checkChange.periodical(500);
	
	back.addEvent('click', function(e) {
		justChange();
	});
	
	upside.addEvent('click', function(e) {
		justChange();
	});
	
	converted.addEvent('focus', function(e) {
		this.select();
	});
	converted.addEvent('mouseup', function(e) {
		e.preventDefault();//prevents bug in webkit, effecting Safari and Chrome, which deselects selected textarea on mouseup
	});
	
	checkChange();
});