
class KafkaService {
    url = 'https://itzelrios-service-i2k3.cloud.okteto.net/';
   
    reaction = async (name) => {
     await fetch(this.url + 'like?name=' + name, {
        method: 'GET',
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        },  
     })  
        .then((response) => console.log(response.json()))
        .then((data) => {
          console.log(data);
        })  
        .catch((err) => {
           console.log(err.message);
        }); 
    }
  
  }
  KafkaService= new KafkaService();
  export default KafkaService;
  