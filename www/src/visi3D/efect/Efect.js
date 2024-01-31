/***
Код свободный, и может быть использован в разных проектах как разработчиком так и другими программистами. Если юзаете диписуйте себя в шапку и мои контакты не удоляйте)))
Разработчик и владелец данного кода Сидоров Евгений vorodis2.
The code is free and can be used in different projects by both the developer and other programmers. If you use write yourself in a hat and do not delete my contacts)))
Developer and owner of this code Sidorov Evgeniy vorodis2.
contacts:
site: vorodis2
mail: vorodis2@gmail.com
skype: vorodis2
phone: +380951026557 
website: vorodis2.com
*/


//import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';


import { RenderPass } from './RenderPass.js';	
import {EffectComposer} from './EffectComposer.js';
import {OutlinePass} from './OutlinePass.js';
import {OutputPass} from './OutputPass.js';
import {ShaderPass} from './ShaderPass.js';


import { FXAAShader } from './shaders/FXAAShader.js';
export default class Efect  {
  	constructor(par) { 
  		this._width =100
  		this._height =100

  		this.par=par

  		let composer, effectFXAA, outlinePass;



		composer = new EffectComposer( this.par.renderer );

		const renderPass = new RenderPass( this.par.scene, this.par.camera );
		composer.addPass( renderPass );

		outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), this.par.scene, this.par.camera );
		composer.addPass( outlinePass );

		

		const outputPass = new OutputPass();
		composer.addPass( outputPass );

		effectFXAA = new ShaderPass( FXAAShader );
		effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
		composer.addPass( effectFXAA );



		/*let selectedObjects = [];

		this.setValue = function (arr) {
			selectedObjects.length=0;
			if(arr && arr.length){
				trace(arr)
				for
				selectedObjects.push(arr[i])
			}
			trace(selectedObjects, arr)
			outlinePass.selectedObjects = selectedObjects;
		}*/

		this.setValue= function(_param){  			
  			if(Array.isArray(_param)==true){
				outlinePass.selectedObjects = _param;
				return;
			}
			if(_param==null&&_param==undefined){
				outlinePass.selectedObjects = [];
				return;
			}
			outlinePass.selectedObjects = [_param];  		
  		}

		



  		this.sizeWindow = function (_width, _height) {

			this._width = _width;
			this._height = _height;	
			composer.setSize( _width, _height );		
			effectFXAA.uniforms[ 'resolution' ].value.set( 1 / _width, 1 / _height );
		}

  		this.render=function(){
  			composer.render();
  			return true
  		}  	
  		



  	}



}

