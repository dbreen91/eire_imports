//TODO----------------------------------
class MobNav{

	constructor(pageVariables, pageFunctions){

		this.mobNav = $('#mob-nav');
		this.mobNavBtn = $('#mob-nav-btn');
		this.doc = pageVariables.doc;
		this.pageFunctions = pageFunctions;
		
		this.init();

	}

	init(){

		this.addUIEvents();

	}

	changeMobNavState(){
		//Open or close the mobile menu
		this.pageFunctions.toggleState(this.mobNav);

	}

	hideMobNavEvent(){
		//Close the mobile menu
		this.pageFunctions.changeState(this.mobNav, 'dormant');

	}


	addUIEvents(){

		//open or close the mobile menu when the menu button is clicked
		this.mobNavBtn.click(function(){
			this.changeMobNavState();
		}.bind(this));

		//If a click is detected that is outside of the menu button or the mobile menu, close the menu
		this.doc.click(function(event){
			if(!$(event.target).closest(this.mobNav).length && !$(event.target).closest(this.mobNavBtn).length){
				this.hideMobNavEvent();
			}
		}.bind(this));
	}
}