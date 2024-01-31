

import { MVisi3D } from '../visi3D/MVisi3D.js';     //вьювер3д
import { SceneSB } from '../visi3D/SceneSB.js'      //для в3д
import { Menu } from './menu/Menu.js';              //менюхи
import { Door } from './door/Door.js';              //менюхи
//разруливает
export class Glaf {
    constructor(par) {
        this.type = "Glaf";
        var self = this;
        this.par = par;
        window.glafBig=this
        

        this.init=function(){

            this.contHTML = document.createElement('div');
            this.contHTML.style.position = 'fixed';
            this.contHTML.style.top = '0px';
            this.contHTML.style.left = '0px';
            this._activeObject=null
            document.body.appendChild(this.contHTML); 

            var oSp = JSON.parse('{"scene":{"ambient":{"works":true,"active":true,"color":"#ffffff","intensity":0.71},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#ffffff","bias":0.001,"intensity":0.06,"radius":1,"bAlphaForCoating":false,"fixation":true,"rotationX":0.67,"rotationZ":1.89,"distance":144.99,"cubWidth":1000,"cubHeight":1000,"distanceUpdateShadow":6.26},"sky":{"works":true,"active":false,"color":"#ee295c","link":"null","radius":522},"mirror":{"works":true,"xz":"reflect","link":"date/scenes3d/2/18-maps.jpg","exposure":8.33,"gamma":9.39,"link1":"null","exposure1":-1,"gamma1":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":45,"far":45000,"minZum":0,"maxZum":20000,"zume":763,"powerZum":19,"minRotationX":1.5,"maxRotationX":0,"debug":false,"isDragPan":true,"alphaAd":true,"rotationX":1,"rotationZ":-0.91,"globZ":0},"effect":{"works":true,"active":false,"edgeStrength":3,"edgeGlow":0.96,"pulsePeriod":4.11,"linkTextur":"null","visibleEdgeColor":"#ff5062","hiddenEdgeColor":"#190a05","edgeThickness":5},"fog":{"works":true,"active":false,"color":"#00ae9c","near":0,"far":2246}},"three":{"uuid":"136621be-1b7c9d69","key":null,"id":null,"name":"name37","tId":0,"b":[0,0,0],"n":[0,0,0],"s":[0,0,0],"array":[]}}');
            this.oSp=oSp
            var alpha = oSp.scene.visi3D.alphaAd
            alpha = false;
            var mobile = false;

            //порезаный от пикси вювер        
            this.visi3D = new MVisi3D(this.contHTML, null, mobile, true, true, true, alpha);
            this.visi3D.yes3d = true;
            this.content3d = new THREE.Object3D();
            this.visi3D.groupObject.add(this.content3d);
            this.content3d.rotation.x=-Math.PI/2;
            window.visi3D = this.visi3D
            visi3D.position3d.boolMouseRight = false;
            


            //настроки
            this.sceneSB = new SceneSB(this.visi3D); 
            for (var i = 0; i < this.sceneSB.array.length; i++) {
                if (oSp.scene[this.sceneSB.array[i].name] === undefined) {
                    oSp.scene[this.sceneSB.array[i].name] = {};
                }
                this.sceneSB.array[i].setBasa(oSp.scene[this.sceneSB.array[i].name]);
            }
            visi3D.utility.debug=false; 
            visi3D.zume=5


            //ветка менюхи
            this.menu = new Menu(this, function(s, p, p1) {
                if(s=="openArray"){

                    visi3D.arrOut = p
                }
                if(s=="openId"){
                    self.door.openId(p)
                }
            });
            visi3D.renderer.setClearColor(this.menu.param.color, 0);//подпровляем цвет под фон


            this.door = new Door(this, function(s, p, p1) {
                if(s=="openArray"){
                    
                    visi3D.arrOut = p
                }
                if(s=="upServerModel"){
                    self.menu.gLeft.addObj(p)
                }

                if(s=="downGroup"){
                    self.menu.gLeft.downGroup(p)
                }
                if(s=="overGroup"){
                    self.menu.gLeft.overGroup(p)
                }
            });


        }

        this.init()
        if(getURLParameters('id')!=null)this.door.openId(getURLParameters('id'));


        //тикает 60/сек
        this.update = function() {
            this.menu.update();
            this.visi3D.upDate();                    
        }


        //расчет окна
        var w, h;
        this.sizeWindow = function(_w, _h) {
            if (_w) {
                w = _w;
                h = _h;             
            }            
            this.visi3D.sizeWindow(0,0,w,h)
            this.menu.sizeWindow(w, h);
        }


        //парсим строку браузера
        function getURLParameters(paramName){
            var sURL = window.document.URL.toString();
            var arrParams = sURL.split("/");                        
            if (sURL.indexOf("?") > 0) {
                var arrParams = sURL.split("?");
                var arrURLParams = arrParams[1].split("&");
                var arrParamNames = new Array(arrURLParams.length);
                var arrParamValues = new Array(arrURLParams.length);

                arrParams = sURL.split("?");
                arrURLParams = arrParams[1].split("&");
                arrParamNames = new Array(arrURLParams.length);
                arrParamValues = new Array(arrURLParams.length);


                var i = 0;
                for (i = 0; i < arrURLParams.length; i++) {

                    var sParam =  arrURLParams[i].split("=");
                    arrParamNames[i] = sParam[0];
                    if (sParam[1] != "")
                        arrParamValues[i] = unescape(sParam[1]);
                    else
                        arrParamValues[i] = null;
                }

                for (i=0; i<arrURLParams.length; i++) {
                    if (arrParamNames[i] == paramName) {

                        return arrParamValues[i];
                    }
                }
                return null;
            }
        }

    }
}


