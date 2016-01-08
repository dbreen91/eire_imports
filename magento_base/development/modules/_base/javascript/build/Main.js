$(document).ready(function(){

	const pageVariables = new pageVariables();
	const pageState = new PageState(pageVariables);
	const pageFunctions = new PageFunctions();
	const deskNav = new DeskNav(pageState, pageFunctions);
	const accountForm = new AccountForm();

});