
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

            this.ta=new DTextArea(dCont, 600)
            this.ta.fontSize=8
            this.ta.width=333
            this.ta.textAlign='left'

            this.zDinMenuScene=new ZDinMenuScene(this, glafBig.sceneSB,function(s,p,p1){
                
                trace("===",s,p,p1)
                
                if(s=='save'){
                    trace("=====",p.scene.ambient)
                    let sa=JSON.stringify(p)
                    self.ta.text=sa;
                }
                
            })
            dCont.add(this.zDinMenuScene.dCont)

            this.zDinMenuScene.setObj(glafBig.oSp);
            this.zDinMenuScene.active=true/**/
            

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



