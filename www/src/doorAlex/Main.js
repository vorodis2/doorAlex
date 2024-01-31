

import {Glaf } from './Glaf.js';

///Ночало))
export class Main{
 	constructor(fun) {
		this.type="Main";	 
	    var self=this;

		//создание сцены
  		this.init = function () {	   
			this.glaf=new Glaf(this);
			this.tick(); 	
			fun("init");
		};		
		
		//тикает 60 раз или  боллле, можно затопит
		this.tick = function () {				
			TWEEN.update();		
			if (self.glaf) {
				self.glaf.update();
			}	
			requestAnimationFrame( self.tick );		
		}

		this.ww=100;
		this.hh=100;
		//Маштабим окна 		
  		this.sizeWindow = function(w,h){
  			if(w){
  				this.ww=w;
				this.hh=h;
  			}
  			if (this.glaf) { 
  				this.glaf.sizeWindow(this.ww, this.hh)
  			}			
  		}
		this.init();								
  	}
}
