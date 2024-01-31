
import { ZDinMenuScene} from './ZDinMenuScene.js';

export class MenuDebbug  {
    constructor(par, fun) {         
        this.type="MenuDebbug";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont(this.par.dCont);


        this.init=function(){
            
            window.dDebug = this.dDebug = new DDebug(this.dCont,0,0,"doorAlex_2",this.param);
            let dCont=dDebug.getDDcont()



           /* this.zDinMenuScene=new ZDinMenuScene(this, glafBig.sceneSB,function(s,p,p1){
              
            })
            dCont.add(this.zDinMenuScene.dCont)

            this.zDinMenuScene.setObj(glafBig.oSp);
            this.zDinMenuScene.active=true*/
            

        }




        this.init()


        var w, h, s;
        this.sizeWindow = function(_w, _h, _s) {
            if (_w) {
                w = _w;
                h = _h;
                s = _s;
            }
            window.dDebug.sizeWindow(w, h, 1)
            
        }

    }



}



