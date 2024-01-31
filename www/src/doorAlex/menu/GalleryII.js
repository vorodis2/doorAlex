export class GalleryII extends DGallery {
    constructor(dCont, x, y, fun, par) {
        super(dCont, x, y, fun);
        this.par = par;
        this.param = par.param;
        this.type = "GalleryII";
        var self = this

     /*   this.boolButton = [0, 0]
        this.otstup1=this.param.otstup
        this.downBtn = function(s, p, p1) {
    
            self.fun(s, p, p1);
        }

        this.funOver=function(e){
            self.fun('funOver',e.object,e)            
        }*/


        this.createZamen = function() {
            var r = new BoxII(this.content, 0, 0, this.downBtn, this);
            r.whPic = this.whPic;
            r._widthPic = this._widthPic;
            r._heightPic = this._heightPic;
            return r
        } 
    }
}



export class BoxII extends DBox {
    constructor(dCont, x, y, fun, par) {
        super(dCont, x, y, fun);
        this.par = par
        this.param = par.param
        var self = this;
        this.uuid = Math.random()
        this.label.fontSize = dcmParam.fontSize


        this.label1 = new DLabel(this, 0, 0, " ")
        this.label1.fontSize = dcmParam.fontSizeLitte
 
        this.label2 = new DLabel(this, 0, 0, " ")
        this.label2.fontSize = dcmParam.fontSizeLitte
        this.label2.textAlign='right'
       

       

        this.dragInfo = function() {
            this.label.text=this.object.name;
            this.label1.text=this.object.title;
            this.label2.text=this.object.array.length+" шт."
            this.image.link=this.object.icon;
            this.label.visible=true;
        }
       


        this.startLoad = function(_obj) {
            this.object = _obj;
            this.dragInfo()
            this.draw()
            self.funLoad();
        }

        var ss;
        this.draw = function() {
            this.image.width = this._height - 2;
            this.image.height = this._height - 2;

            this.image.x = 1
            this.image.y = 1

            this.label.x = this._height + 2
            this.label.y = 1;

            this.label1.x = this._height + 2
            this.label1.y = 1+1+dcmParam.fontSize;
            this.label1.width=this._width-this.label1.x-2

            this.label2.width=this._width-2
           // this.dCb.x = this._width
        }


        this.tweenA=undefined
        this.animat = function() {            
            
            if(this.tweenA==undefined){
                this.tweenA=new TWEEN.Tween(this)
            }
            this.alpha=0.7
            this.tweenA.to({alpha:1},200).start()
            
        }





      /*  if (dcmParam.mobile == false) {
            this.panel.div.removeEventListener("mousedown", this.mouseDown)
        } else {
            this.panel.div.removeEventListener("touchstart", this.mouseDown)
        }



    

        this.mouseDown = function (e) {  
                 
        };

        if(dcmParam.mobile==false){
            this.panel.div.addEventListener("mousedown", this.mouseDown);
        }else{
            this.panel.div.addEventListener("touchstart", this.mouseDown)
        }
        if (dcmParam.mobile == false) {
            this.panel.div.addEventListener("mousedown", this.mouseDown)
        } else {
            this.panel.div.addEventListener("touchstart", this.mouseDown)
        }*/
    }
}