

import { GalleryII } from './GalleryII.js';


export class GLeft {
    constructor(par, fun) {
        this.type = "GLeft";
        var self = this;
        this.par = par;
        this.fun = fun;
        this.param = this.par.param;

        this._activeObject = null

        this.dCont = new DCont(this.par.dCont);
        this.array = [];

        this._index = -1;
        this._id = -1;
      
        this.width=this.param.sizeBase
        this.height=this.param.sizeBase*2

        this.init = function() { 
            this.panel=new DPanel(this.dCont, this.param.otstup, this.param.otstup)
            this.panel.width=this.width;
            this.panel.height=this.height;
            let yy=this.param.otstup;
            let aId=[17,18,19]
            let ww=(this.width-this.param.otstup)/aId.length-this.param.otstup
            for (var i = 0; i < aId.length; i++) {

                let button=new DButton(
                    this.panel, 
                    this.param.otstup+(this.param.otstup+ww)*i, 
                    yy, 
                    aId[i], 
                    function(){
                        self.fun("openId", this.id)
                    }
                )
                button.id=aId[i]
                button.width=ww
            }
            
            
            yy+=this.param.otstup+32;

            this.gallery = new GalleryII(this.panel, this.param.otstup, yy,function(s,p,p1){
                let a=this.array[this.index].object.array
                self.fun("openArray",a);

            },this);

            this.gallery.kolII=1
            
            this.gallery.otstup= this.param.otstup;
            this.gallery.width=this.width-this.param.otstup*2;
            
            this.gallery.heightPic=this.param.wh1; 
            this.gallery.widthPic=this.gallery.width-this.param.otstup*2;


            this.gallery.height=this.height-yy-this.param.otstup;
        }

        this.array=[]
        this.object
        this.addObj = function(obj) { 
            this.object=obj;
            this.array=[]
            for (var s in this.object) {
                this.array.push(this.object[s])
            }

            this.gallery.start(this.array);



        }

        this.downGroup = function(group) { 
            for (var i = 0; i < this.gallery.array.length; i++) {
                if(this.gallery.array[i].object.key==group.key){
                    this.gallery.index=i
                    return
                }
            }
        }
        this.overGroup = function(group) { 
            for (var i = 0; i < this.gallery.array.length; i++) {
                if(this.gallery.array[i].object.key==group.key){
                    this.gallery.array[i].animat()
                    return
                }
            }
        }


        var w, h;
        this.sizeWin = function(_w, _h) {
            if (_w) {
                w = _w;
                h = _h;
            }

            for (var i = 0; i < self.array.length; i++) {
                self.array[i].sizeWin(
                    w - (self.param.otstup * 3 + self.param.wh),
                    h - (self.param.otstup * 2)
                )
            }
        }

        this.init();
    }

    set index(value) {
        if (this._index != value) {
            this._index = value;
            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) this.array[i].active = true
                else this.array[i].active = false
            }
            this.dragSS()
        }
    }
    get index() { return this._index; }


    set activeObject(value) {

        if (this._activeObject != value) {
            this._activeObject = value;

            for (var i = 0; i < this.array.length; i++) {
                this.array[i].activeObject = value;
            }
        }
    }
    get activeObject() {
        return this._activeObject;
    }
}