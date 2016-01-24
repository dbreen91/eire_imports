class PageFunctions{
	
	constructor(){

	}

	getState(element){

		const currentState = element.attr('data-state');

		return currentState;
	}

	toggleState(element){

		const currentState = this.getState(element);

		console.log(currentState)
		console.log(currentState === 'dormant');
		console.log(currentState == 'dormant');

		if(currentState == 'dormant'){
			console.log('heere');
			this.changeState(element, 'active');
		}else{
			console.log('heerddde');
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


