


import { GLTFLoader } from '../../three/GLTFLoader.js';              //менюхи
///Основная ветка менюх
export class Door {
    constructor(par, fun) {
        this.type = "Door";
        var self = this;
        this.par = par;
        this.fun = fun;

        this.id=null
        this.metods=new Metods(this)





        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.array=[]
   
        this.down = function(e) {
            let group=self.getGroup(e.target)            
            if(group){
                self.fun('downGroup', group);
                self.fun("openArray",group.array);
            }
        }
        this.over = function(e) {
            let group=self.getGroup(e.target)            
            if(group){
                self.fun('overGroup', group)
            }    
        }
        this.out = function(e) {
            
        }

        this.getGroup = function(c3d){
            if(!c3d)return null;

            for(let s in self.objC3d){
                for (var i = 0; i < self.objC3d[s].array.length; i++) {
                    if(self.objC3d[s].array[i].uuid==c3d.uuid){
                        return self.objC3d[s]
                    }
                }
            }
            if(c3d.parent){
                return this.getGroup(c3d.parent)
            }

            return null;
        }



        this.init = function() {
            this.loader=new GLTFLoader()  

            visi3D.addEvent('down',this.down)
            visi3D.addEvent('over',this.over)
            visi3D.addEvent('out',this.out)
        }

        this.openId = function(id) {            
            this.id=id;
            var s="resources/model/"+id+"/model.gltf";//тут может быть кучи вариантов организации урлов
            this.loader.load( s, function ( object ) {                   
                self.openC3d(object.scene)          
            })

        }

        this.objC3d = {}
        this.clear = function() {

            if(this.c3d!=undefined){
                visi3D.removeChildMouse(this.c3d)
                this.c3d.parent.remove(this.c3d)  

            }
            this.objC3d = {}           
        }
        this.c3d=undefined
        this.openC3d = function(c3d) {
            this.clear()
            this.c3d=c3d; 

            this.parsingGeom(c3d)           
            

            setTimeout(function() {//запрос на сервак, хз может и не тут, но впихнул
                for(var s in self.objC3d){
                    self.objC3d[s].title="Всякая красивая хрень от сервака, в плане бла бла "+Math.round(Math.random()*100)
                    self.objC3d[s].name=self.objC3d[s].key+"="+Math.round(Math.random()*100)
                    self.objC3d[s].icon="not.png";
                }    
                self.startC3d()

            }, 100);            
        }

        this.startC3d = function() {
            visi3D.addChildMouse(this.c3d)
            this.content3d.add(this.c3d);
            this.metods.upRect()
            self.fun("upServerModel",self.objC3d)
            visi3D.intRend=1;
        }


        this.parsingGeom = function(o) {
            if(o.name){
                let arr=o.name.split("_")
                if(arr.length>=2){                    
                    if(this.objC3d[arr[0]]==undefined){
                        this.objC3d[arr[0]]={key:arr[0], array:[], name:"", title:"" }
                    }
                    this.objC3d[arr[0]].array.push(o)
                }                
            }
            for (var i = 0; i < o.children.length; i++) {
                this.parsingGeom(o.children[i])
            }

        }


        this.init();


    }
}

export class Metods {
    constructor(par) {
        this.type = "Metods";
        var self = this;
        this.par = par;
     
        this.upRect=function(){  
            visi3D.utility.focus.targetObject=this.par.content3d;
            visi3D.render()
            visi3D.utility.focus.targetObject=null
        }


    }
}
