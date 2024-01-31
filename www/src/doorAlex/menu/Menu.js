
import { GLeft }        from './GLeft.js';
import { Param }        from './Param.js';
import { MenuDebbug }   from './MenuDebbug.js';
///Основная ветка менюх
export class Menu {
    constructor(par, fun) {
        this.type = "Menu";
        var self = this;
        this.par = par;
        this.fun = fun;

        window.dcmParam = new DCM();

        this.contHTML = document.createElement('div');
        this.contHTML.style.position = 'fixed';
        this.contHTML.style.top = '0px';
        this.contHTML.style.left = '0px';
        
        this.dC = new DCont(this.contHTML);
        this.dCont = new DCont(this.dC);
        document.body.appendChild(this.contHTML); 
        
        //включаем общии настройки меню ну и подпровлем на свое усмотрении
        this.param = new Param().param; 
        this.param.wh=32;                           //Высота компонентов
        this.param.wh1=64;                          //Высота компонентов
        this.param.wh2=20;  
        this.param.fontSize=16;
        this.param.fontSizeLitte=12;
        this.param.otstup=5
        this.param.borderRadius=4
        this.param.color= "#05828e"//'#FF0000'//оновная поалитра 
        this.param.color1="#202c31"//'#00FF00'//оновная поалитра 
        this.param.colorActive="#bdbdbd"//'#0000FF'//
        this.param.fontFamily = 'Open Sans'//'Roboto Mono Thin'//"Montserrat"//"PT Mono";           
        this.param.sizeBase=(this.param.wh1+this.param.otstup)*3+this.param.otstup*2
        for(var s in this.param){
            if(dcmParam[s]!=undefined){
                dcmParam[s]=this.param[s]
            }
        }
        document.body.style.backgroundColor = this.param.color1

        ///


       
        this.array = []
        this.init = function() {
            this.array[this.array.length] = this.gLeft = new GLeft(this, function(s,p,p1){
                fun(s,p,p1);
            })

           /* if(window.DDebug!=undefined){//подключена либа, дебаг
                this.array[this.array.length] = this.menuDebbug = new MenuDebbug(this, function(s,p,p1){
                    fun(s,p,p1);
                })

            }*/

        }


        //тикер
        this.update = function() {
           
        }


        //Драгер окон
        var w, h, s;
        this.sizeWindow = function(_w, _h, _s) {
            if (_w) {
                w = _w;
                h = _h;
                s = _s;
            }
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].sizeWindow) this.array[i].sizeWindow(w, h, s)
            }            
        }

        this.init();



    }
}