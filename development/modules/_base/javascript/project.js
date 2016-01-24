"use strict";

class PageVariables {

	constructor() {
		//Set up the common variables used by the various classes
		this.doc = $(document);
		this.window = $(window);
		this.mobNavVisible = false;
		//Page breakpoints as defined by Bootrap
		this.breakPoints = {
			'mobile': 554,
			'tablet': 768,
			'desktop': 992
		};
	}

	setMobNavVisible(isVisible) {

		this.mobNavVisible = isVisible;
	}

	getMobNavVisible() {

		return this.mobNavVisible;
	}
}
//TODO----------------------------------
class MobNav {

	constructor(pageVariables, pageFunctions) {

		this.mobNav = $('#mob-nav');
		this.mobNavBtn = $('#mob-nav-btn');
		this.doc = pageVariables.doc;
		this.pageFunctions = pageFunctions;

		this.init();
	}

	init() {

		this.addUIEvents();
	}

	changeMobNavState() {

		this.pageFunctions.toggleState(this.mobNav);
	}

	hideMobNavEvent() {

		this.pageFunctions.changeState(this.mobNav, 'dormant');
	}

	addUIEvents() {

		this.mobNavBtn.click((function () {
			this.changeMobNavState();
		}).bind(this));

		this.doc.click((function (event) {
			if (!$(event.target).closest(this.mobNav).length && !$(event.target).closest(this.mobNavBtn).length) {
				this.hideMobNavEvent();
			}
		}).bind(this));
	}
}
class AccountForm {

	constructor() {

		this.accountFormsDesk = $('.account-form--desk');
		//only select the desktop versions of each form and their respective form swicth links
		this.loginFormDesk = this.accountFormsDesk.find('.account-form__login');
		this.registerFormDesk = this.accountFormsDesk.find('.account-form__register');
		this.switchLinkDesk = this.accountFormsDesk.find('.account-form__switch');
		//mobile TODO
		this.accountFormsMob = '';
		this.loginFormMob = '';
		this.RegisterFormMob = '';

		this.init();
	}

	init() {

		this.addUIEvents();
	}

	switchFormDesk() {
		//Switch between the login form and the registration form
		if (this.loginFormDesk.is(':visible')) {
			this.loginFormDesk.hide();
			this.registerFormDesk.show();
		} else {
			this.registerFormDesk.hide();
			this.loginFormDesk.show();
		}
	}

	addUIEvents() {
		//Add click events to the desktop form switch links
		this.switchLinkDesk.click((function () {
			this.switchFormDesk();
		}).bind(this));
	}

}
class DeskNav {

	constructor(pageVariables, pageFunctions) {
		//Set up class variables
		this.doc = pageVariables.doc;
		this.pageFunctions = pageFunctions;
		this.navItemName = '.desk-nav__item';
		this.navItems = $(this.navItemName);
		this.navItemHeadings = $('.desk-nav__item__heading');

		//Initialize methods
		this.init();
	}

	init() {
		//Add click events
		this.addUIEvents();
	}

	changeDropdownStateEvent(event) {

		//Find the nav item element
		const navItem = $(event.target).closest(this.navItemName),
		     
		//Get the current state of the nav item before the hideDropdown event is called. This is to ensure that
		//when a navitem is clicked any open dropdowns other then the one belonging to the navItem being clicked are closed
		currentState = this.pageFunctions.getState(navItem);
		//Close all open dropdowns
		this.hideDropdownsEvent();
		//Check the state of the nav item and change it accordingly
		if (currentState === 'dormant') {
			this.pageFunctions.changeState(navItem, 'active');
		}
	}

	//Close all open dropdowns
	hideDropdownsEvent() {

		this.pageFunctions.changeState(this.navItems, 'dormant');
	}

	addUIEvents() {
		//Add click event to the nav items which changes their state
		this.navItemHeadings.on('click', (function (event) {
			this.changeDropdownStateEvent(event);
		}).bind(this));

		//Add click event to the page which closes any open drop downs if the click
		//is outside of the dropdowns
		this.doc.click((function (event) {
			if (!$(event.target).closest(this.navItemName).length) {
				this.hideDropdownsEvent();
			}
		}).bind(this));
	}

}

class PageFunctions {

	constructor() {}

	getState(element) {

		const currentState = element.attr('data-state');

		return currentState;
	}

	toggleState(element) {

		const currentState = this.getState(element);

		console.log(currentState);
		console.log(currentState === 'dormant');
		console.log(currentState == 'dormant');

		if (currentState == 'dormant') {
			console.log('heere');
			this.changeState(element, 'active');
		} else {
			console.log('heerddde');
			this.changeState(element, 'dormant');
		}
	}

	changeState(element, state) {

		element.attr('data-state', state);
	}

	fixElement(element) {

		//TODO

	}

}

class PageState {

	constructor(pageVariables) {

		this.window = pageVariables.window;
		this.pageWidth = this.window.width();
		this.breakPoints = pageVariables.breakPoints;

		this.update();
	}

	update() {
		//Update page state variables at .5 milsecond intervals
		setInterval((function () {
			//Update page width to the current page width
			this.pageWidth = this.window.width();
		}).bind(this), 500);
	}
	//The following level of abstractions may seem a little over kill but its the only
	//way I felt comfortable doing it. Perhaps I may move the isBelow ect functions into
	//the pageFunctions class as utility methods i.e isBelowBreakpoint would become
	//checkIfBelow(max, value);
	isBelowBreakpoint(breakPoint) {

		if (this.pageWidth <= breakPoint) {
			return true;
		} else {
			return false;
		}
	}

	isAboveBreakpoint(breakPoint) {
		if (this.pageWidth >= breakPoint) {
			return true;
		} else {
			return false;
		}
	}

	isBetweenBreakpoints(breakPointLower, breakPointUpper) {

		if (this.pageWidth > breakPointLower && this.pageWidth < breakPointUpper) {
			return true;
		} else {
			return false;
		}
	}
	// passes the breakpoints into the functions above to check the device based on screen width
	isMobile() {

		return this.isBelowBreakpoint(this.breakPoints.mobile);
	}

	isTablet() {

		return this.isBetweenBreakpoints(this.breakPoints.mobile, this.breakPoints.desktop);
	}

	isDesktop() {

		return this.isAboveBreakpoint(this.breakPoints.desktop);
	}

	isMobNavShowing() {

		const mobNavVisibile = this.pageVariables.getMobNavVisible();

		return mobNavVisibile;
	}

}
$(document).ready(function () {

	//iniate classes on page ready
	const pageVariables = new PageVariables();
	const pageState = new PageState(pageVariables);
	const pageFunctions = new PageFunctions();
	const deskNav = new DeskNav(pageVariables, pageFunctions);
	const accountForm = new AccountForm();
	const mobNav = new MobNav(pageVariables, pageFunctions);
});
