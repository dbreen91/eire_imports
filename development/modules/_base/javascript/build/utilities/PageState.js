class PageState {

	constructor(pageVariables){

		this.window = pageVariables.window;
		this.pageWidth = this.window.width();
		this.breakPoints = pageVariables.breakPoints;


		this.update();

	}

	update(){
		//Update page state variables at .5 milsecond intervals 
		setInterval(function(){
			//Update page width to the current page width
			this.pageWidth = this.window.width();

		}.bind(this), 500);

		
	}
	//The following level of abstractions may seem a little over kill but its the only
	//way I felt comfortable doing it. Perhaps I may move the isBelow ect functions into
	//the pageFunctions class as utility methods i.e isBelowBreakpoint would become 
	//checkIfBelow(max, value);
	isBelowBreakpoint(breakPoint){

		if(this.pageWidth <= breakPoint){
			return true;
		}else{
			return false;
		}

	}

	isAboveBreakpoint(breakPoint){
		if(this.pageWidth >= breakPoint){
			return true;
		}else{
			return false;
		}
	}

	isBetweenBreakpoints(breakPointLower, breakPointUpper){

		if(this.pageWidth > breakPointLower && this.pageWidth < breakPointUpper){
			return true;
		}else{
			return false;
		}

	}
	// passes the breakpoints into the functions above to check the device based on screen width
	isMobile(){

		return this.isBelowBreakpoint(this.breakPoints.mobile);
		
	}

	isTablet(){

		return this.isBetweenBreakpoints(this.breakPoints.mobile,this.breakPoints.desktop);

	}

	isDesktop(){

		return this.isAboveBreakpoint(this.breakPoints.desktop);

	}

	isMobNavShowing(){

		const mobNavVisibile = this.pageVariables.getMobNavVisible();

		return mobNavVisibile;
	}

	setHideDropdownEvent(dropDownEvent){

		this.setHideDropdownEvent = dropDownEvent;

	}


}