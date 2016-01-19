"use strict";

class PageVariables{

	constructor(){
		//Set up the common variables used by the various classes
		this.doc =  $(document);
		this.window = $(window);
		this.mobNavVisible = false;
		//Page breakpoints as defined by Bootrap
		this.breakPoints = {
								'mobile':554,
								'tablet': 768,
								'desktop': 992
							 };

	}

	setMobNavVisible(isVisible){

		this.mobNavVisible = isVisible;

	}

	getMobNavVisible(){

		return this.mobNavVisible;
	}
}