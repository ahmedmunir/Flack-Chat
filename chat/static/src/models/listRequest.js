export default class listRequest {
    constructor(query) {
        this.query = query;
    }


    //function to request data from server depending on the value of list requested (people online or channels available)
    async getResult() {
        let data = new FormData();
        data.append('list', this.query);
        await fetch(`${location.protocol}//${location.hostname}:${location.port}/chat`, {
            method :'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {

            this.results = data;
        })
    }

}