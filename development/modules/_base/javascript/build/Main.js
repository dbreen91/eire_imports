$(document).ready(function(){

	//iniate classes on page ready
	const pageVariables = new PageVariables();
	const pageState = new PageState(pageVariables);
	const pageFunctions = new PageFunctions();
	const deskNav = new DeskNav(pageVariables, pageFunctions);
	const accountForm = new AccountForm();

	class pat{

	constructor(){

	

	}

	setFunc(func){
		this.func = func;
	}



}


class pat2{

	constructor(p){
		p.setFunc(this.func);
	}

	func(){
		console.log('pat');
	}


}

	var p1 = new pat();
	var p2 = new pat2(p1);

	p1.func();

});