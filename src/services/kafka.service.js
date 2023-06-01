class KafkaService {
   url = 'https://node-producer-reactions-service-kafka-i2k3.cloud.okteto.net/';
   url2 = 'https://node-producer-comments-service-kafka-i2k3.cloud.okteto.net/'

   reactionPush = async (data) => {
       await fetch(this.url + 'reaction?userId=' + data.userId + '&objectId=' + data.objectId + '&reactionId=' + data.reactionId  , {
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

   commentPush = async (data) => {
       await fetch(this.url2 + 'comments?userId=' + data.userId + '&objectId=' + data.objectId + '&comment=' + data.comment  , {
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

const KafkaServiceInstance = new KafkaService();
export default KafkaServiceInstance;