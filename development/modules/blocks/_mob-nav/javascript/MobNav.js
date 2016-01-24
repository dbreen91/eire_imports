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

		this.pageFunctions.toggleState(this.mobNav);

	}

	hideMobNavEvent(){

		this.pageFunctions.changeState(this.mobNav, 'dormant');

	}


	addUIEvents(){

		this.mobNavBtn.click(function(){
			this.changeMobNavState();
		}.bind(this));

		this.doc.click(function(event){
			if(!$(event.target).closest(this.mobNav).length && !$(event.target).closest(this.mobNavBtn).length){
				this.hideMobNavEvent();
			}
		}.bind(this));
	}
}