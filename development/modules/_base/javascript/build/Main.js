$(document).ready(function(){

	//iniate classes on page ready
	const pageVariables = new PageVariables();
	const pageState = new PageState(pageVariables);
	const pageFunctions = new PageFunctions();
	const deskNav = new DeskNav(pageVariables, pageFunctions);
	const accountForm = new AccountForm();

	
});