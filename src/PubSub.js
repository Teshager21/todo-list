class PubSub{
    constructor(){
        this.events={};
    }
publish(eventName,fn){
 if(!this.events[eventName]){
      this.events[eventName]=[];
 }
 this.events[eventName].push(fn);
}
subscribe(eventName,data){
 const event=this.events[eventName];
 if(event){
    event.map(fun=>fun.call(null,data))
 }

}
    
}

const subscriptions= new PubSub();
// const sing=(lyrics)=>{
//   console.log(`lalalala ${lyrics} lalalala`);
// }
// const publisher=()=>{
// subscriptions.publish('change',sing)
// }

// const subscriber=()=>{
//     console.log('subscribing....')
//     subscriptions.subscribe('change','mylove')
// }

// publisher();
// subscriber();



export default subscriptions;