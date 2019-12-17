!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("config")},function(e,t){e.exports=require("joi")},function(e,t){e.exports=require("bcryptjs")},function(e,t){e.exports=require("lodash")},function(e,t,n){const s=n(7),r=n(2);e.exports=function(e,t,n){const o=e.header("x-auth-token");if(!o)return t.status(401).send("Access denied. No token provided.");try{const t=s.verify(o,r.get("jwtPrivateKey"));e.user=t,n()}catch(e){t.status(400).send("Invalid token")}}},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,n){const s=n(0),r=n(3),o=n(2),i=n(7),a=new s.Schema({email:{type:String,unique:!0,minlength:5,maxlength:63,required:!0},registrationDate:{type:Date,default:Date.now},password:{type:String,required:!0,minlength:7,maxlength:1024}});a.methods.generateAuthToken=function(){return i.sign({_id:this._id},o.get("jwtPrivateKey"))};const d=s.model("User",a);t.User=d,t.validate=function(e){const t={email:r.string().min(5).max(63).required().email(),date:r.date(),password:r.string().min(7).max(255).required()};return r.validate(e,t)}},function(e,t,n){e.exports=n(10)},function(e,t,n){const s=n(2),r=n(0),o=n(11),i=n(12),a=n(13),d=n(15),u=n(6),c=n(1),l=c();s.get("jwtPrivateKey")||(console.log("FATAL ERROR: jwtPrivateKey is not defined"),process.exit(1)),r.connect("mongodb://localhost/to_do_list",{useUnifiedTopology:!0,useCreateIndex:!0,useNewUrlParser:!0}).then(()=>console.log("connected")).catch(e=>console.error("could not connect",e)),l.use(c.json()),l.use(o()),l.use("/api/users",i),l.use("/api/lists",u,a),l.use("/api/auth",d);const f=process.env.PORT||3e3;l.listen(f,()=>console.log(`listening on port ${f}...`))},function(e,t){e.exports=require("cors")},function(e,t,n){const s=n(4),r=n(5),o=n(6),{User:i,validate:a}=n(8),d=(n(0),n(1).Router());d.post("/",async(e,t)=>{const{error:n}=a(e.body);if(n)return t.status(400).send(n.details[0].message);let o=await i.findOne({email:e.body.email});if(o)return t.status(400).send("User already registered.");o=new i(r.pick(e.body,["email","password"]));const d=await s.genSalt(10);o.password=await s.hash(o.password,d),await o.save();const u=o.generateAuthToken();t.send(u)}),d.get("/me",o,async(e,t)=>{const n=await i.findById(e.user._id);t.send(r.pick(n,["_id","email"]))}),e.exports=d},function(e,t,n){n(0);const{List:s,validate:r}=n(14),o=n(1).Router();o.post("/",async(e,t)=>{const{error:n}=r(e.body);if(n)return t.status(400).send(n.details[0].message);let o=new s({});o.name=e.body.name,o.userId=e.user._id,o.items=e.body.items,o=await o.save(),t.send(o)}),o.get("/",async(e,t)=>{const n=await s.find({userId:e.user._id});t.send(n)}),o.get("/:id",async(e,t)=>{const n=await s.findById(e.params.id);if(n.userId!==e.user._id)return t.status(404).send("The list with the given user ID was not found.");t.send(n)}),o.delete("/:id",async(e,t)=>{const n=await s.findByIdAndRemove(e.params.id);if(n.userId!==e.user._id)return t.status(404).send("The list with the given ID was not found.");t.send(n)}),o.put("/:id",async(e,t)=>{let n=await s.findById(e.params.id);n.userId!==e.user._id&&t.status(404).send("The list with the given ID was not found");const{error:o}=r(e.body);if(o)return t.status(400).send(o.details[0].message);n.name=e.body.name,n.items=e.body.items;try{n=await n.save()}catch(e){t.status(404).send("The list with the given ID was not found")}t.send(n)}),e.exports=o},function(e,t,n){const s=n(0),r=n(3),o=new s.Schema({name:{type:String,maxlength:63,default:" "},userId:{type:String},items:[{name:String,done:{type:Boolean,default:!1}}]}),i=s.model("List",o);t.List=i,t.validate=function(e){const t={name:r.string().max(63),items:r.array().optional()};return r.validate(e,t)}},function(e,t,n){const s=n(4),r=n(3),{User:o}=(n(5),n(8)),i=(n(0),n(1).Router());i.post("/",async(e,t)=>{const{error:n}=function(e){const t={email:r.string().min(5).max(63).required().email(),password:r.string().min(7).max(255).required()};return r.validate(e,t)}(e.body);if(n)return t.status(400).send("Invalid email or passwword.");let i=await o.findOne({email:e.body.email});if(!i)return t.status(400).send("Invalid email or passwword.");if(!await s.compare(e.body.password,i.password))return t.status(400).send("Invalid email or passwword.");const a=i.generateAuthToken();t.send(a)}),e.exports=i}]);