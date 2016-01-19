class DeskNav{

	constructor(pageVariables,pageFunctions){
		//Set up class variables
		this.doc = pageVariables.doc;
		this.pageFunctions = pageFunctions;
		pageFunctions.hideDropdownsEvent = this.hideDropdownsEvent;
		this.navItemName = '.desk-nav__item';
		this.navItems = $(this.navItemName);
		this.navItemHeadings = $('.desk-nav__item__heading');

		//Initialize methods
		this.init();
	}

	init(){
		//Add click events
		this.addUIEvents();
	}

	changeDropdownStateEvent(event){

				//Find the nav item element 
				const navItem = $(event.target).closest(this.navItemName),
				//Get the current state of the nav item
				currentState = navItem.attr('data-state');
				//Close all open dropdowns
				this.hideDropdownsEvent();

				//Check the state of the nav item and change it accordingly
				if(currentState === 'dormant'){
					this.pageFunctions.changeState(navItem,'active');
				}
	}	

	//Close all open dropdowns
	hideDropdownsEvent(){

			this.pageFunctions.changeState(this.navItems, 'dormant');
		
	}

	addUIEvents(){
		//Add click event to the nav items which changes their state
		this.navItemHeadings.on('click',function(event){
			this.changeDropdownStateEvent(event);
		
		}.bind(this));

		//Add click event to the page which closes any open drop downs if the click
		//is outside of the dropdowns
		this.doc.click(function(event) {
			if (!$(event.target).closest(this.navItemName).length){
				this.hideDropdownsEvent();
			}
		}.bind(this));

	}



}