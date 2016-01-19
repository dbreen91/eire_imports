class PageFunctions{
	
	constructor(){

	}

	getState(element){

		const currentState = element.attr('data-state');

		return currentState;
	}

	toggleState(element){

		const currentState = this.getState(element);

		if(currentState === 'dormant'){
			this.changeState(element, 'active');
		}else{
			this.changeState(element, 'dormant');
		}

	}

	changeState(element, state){
	
		element.attr('data-state',state);
	
	}

	fixElement(element){

		//TODO

	}

}


