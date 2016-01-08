class AccountForm{

	constructor(){

		this.accountFormsDesk = $('.account-form--desk');
		//only select the desktop versions of each form and their respective form swicth links
		this.loginFormDesk = this.accountFormsDesk.find('.account-form__login');
		this.registerFormDesk = this.accountFormsDesk.find('.account-form__register');
		this.switchLinkDesk= this.accountFormsDesk.find('.account-form__switch');
		//mobile TODO
		this.accountFormsMob = '';
		this.loginFormMob = '';
		this.RegisterFormMob = ''; 

		this.init();

	}

	init(){

		this.addUIEvents();

	}

	switchFormDesk(){
		//Switch between the login form and the registration form
		if(this.loginFormDesk.is(':visible')){
			this.loginFormDesk.hide();
			this.registerFormDesk.show();
		}else{
			this.registerFormDesk.hide();
			this.loginFormDesk.show();
		}

	}

	addUIEvents(){
		//Add click events to the desktop form switch links
		this.switchLinkDesk.click((function(){
			this.switchFormDesk();
		}).bind(this));
		
	}

}