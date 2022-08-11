String.implement({
	pyramidText: function(uBackwards, uUpsideDown, lBackwards, lUpsideDown, uInvert, lInvert) {
		
		var convertedTxt = "";
		var convertedPyr = "";
		var convertedHTML = "";
		var doConvertedHTML = $('cConvertedHTML').hasClass('show') ? true : false;
		
		backwards = uBackwards;
		upsideDown = uUpsideDown;
		invert = uInvert;
			
		for (var r=0; r < 2; r++) {
			convertedTxt = "";
			for (var c = (this.length-1); c >=0; c--) {
				var p = null;
				var didConvertedHTML = false;
				var g = (backwards) ? c : (-1*(c-this.length+1));
				var s = this.charAt(g);
				if (doConvertedHTML) {
					var cHTMLLen = convertedHTML.length;
					var cHTMLLast = (cHTMLLen >= 1) ? convertedHTML.charAt(cHTMLLen-1) : "";
					if (s == " " && (cHTMLLast == " " || convertedHTML.substring(cHTMLLen-6) == "&nbsp;")) {
						convertedHTML += "&nbsp;";
						didConvertedHTML = true;
					}
				}
				if (upsideDown) {
					p = (flipTable[s] || flipTableFlipped[s] || flipTable[s.toLowerCase()] || flipTableFlipped[s.toLowerCase()] || s);
				}
				else {
					p = s;
				}
				
				convertedTxt += p;
				
				if (doConvertedHTML  && !didConvertedHTML) {
					convertedHTML += (flipTableHTML[p] || HTMLTable[p] || p);
					didConvertedHTML = true;
					if (invert == 0) {
						convertedHTMLPyr += convertedHTML+"<br>";
					}
				}
				
				if (invert == 0) {
					convertedPyr += convertedTxt+"\n";
				}
			}
			
			if (invert == 1) {
				var cLen = convertedTxt.length;
				for (var c=0; c<cLen; c++) {
					convertedPyr += convertedTxt.substr(0,cLen-c)+"\n";
				}
			}
			
			backwards = lBackwards;
			upsideDown = lUpsideDown;
			invert = lInvert;
		}

		return Array(convertedPyr, convertedHTML);
	}
});

window.addEvent('domready', function () {
	
	var original = $('originalText');
	original.focus();

	$('submitConvert').setStyle('display', 'none');
	$('share').setStyle('display', 'block');
	
	var converted = $('convertedText');
	var convertedHTML = $('convertedHTML');
	var invert = $('invert');
	var uBack = $('upperBackwards');
	var uUpside = $('upperUpsideDown');
	var lBack = $('lowerBackwards');
	var lUpside = $('lowerUpsideDown');
	
	var lastOriginalV = original.value;
	
	var justChange = function() {
		lastOriginalV = original.value;
		if (invert.checked) {
			uInvert = 1;
			lInvert = 0;
		}
		else {
			uInvert = 0;
			lInvert = 1;
		}
		var converts = lastOriginalV.pyramidText(uBack.checked, uUpside.checked, lBack.checked, lUpside.checked, uInvert, lInvert);
		converted.value = converts[0];
		convertedHTML.value = converts[1];
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
	
	$('bookmark').addEvent('click', function(e) {
		var url = "http://www.upsidedowntext.com/";
		var urlTitle = "UpsideDownText.com - Flip your Text!";

		if (window.external && (!document.createTextNode || (typeof(window.external.AddFavorite)=='unknown'))) {
			window.external.AddFavorite(url, urlTitle);//IE
		}
		else if (window.sidebar) {
			window.sidebar.addPanel(urlTitle, url, "");//Firefox
		}
		else if (window.opera && window.print) {
			return true;//Opera
		}
		else {
			alert("Please use the bookmark/favorite button on your brower to bookmark UpsideDownText.com");
		}
		return false;
	});
	
	invert.addEvent('click', function(e) {
		justChange();
	});
	uBack.addEvent('click', function(e) {
		justChange();
	});
	uUpside.addEvent('click', function(e) {
		justChange();
	});
	
	lBack.addEvent('click', function(e) {
		justChange();
	});
	lUpside.addEvent('click', function(e) {
		justChange();
	});
	
	converted.addEvent('focus', function(e) {
		this.select();
	});
	converted.addEvent('mouseup', function(e) {
		e.preventDefault();//prevents bug in webkit, effecting Safari and Chrome, which deselects selected textarea on mouseup
	});
	
	convertedHTML.addEvent('focus', function(e) {
		this.select();
	});
	convertedHTML.addEvent('mouseup', function(e) {
		e.preventDefault();
	});
	
	$('viewHTML').addEvent('click', function(e) {
		this.set('class', 'dontshow');
		$('cConvertedHTML').set('class', 'show');
		justChange();
		return false;
	});
});