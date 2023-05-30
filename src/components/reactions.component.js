import React, { Component } from "react";
import KafkaService from "../services/kafka.service";

function saveLike(e, status) {

    let data = {
        id: 0,
        status: status
    };

    console.log(JSON.stringify(data));

    KafkaService.reaction("i-love-adsoftsito");
    e.preventDefault();
}

export default class ReactionsLike extends Component {
    
   

render(){
    return (
        <select className="styleofButtom" defaultValue={"default"}>
            <option style={{ display: "none" }} value="default" >Me gusta</option>
            <option className="styleoflike" value="like" >👍 Me gusta</option>
            <option className="styleofLoved" value="love" onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1)

                }
                } >💖 Me encanta
                
            </option>
            <option className="styleofFun" value="fun" >😂 Me divierte</option>
            <option className="styleofSad" value="sad" >😭 Me entristece</option>
            <option className="styleofAngry" value="angry" >😡 Me enoja</option>
        </select>
    )
}
}

