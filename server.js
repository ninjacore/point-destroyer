class APIService{

    url = "https://"
    emojiEndpoint = "/emoji-list"
    playerEndpoint = "/player-record"


    constructor(serverIP){
        // TODO: decide if member variables should go here
        this.url += serverIP
    }

    connect(target,mode,data = ''){

        let hasData, targetKnown = true

        let s = data // JSON.stringify(data)
        console.log(`s = ${s} \n s is ${s.length} long`)
        console.table([s])
        s ? hasData = true : hasData = false
        console.log(`hasData = ${hasData}`)

        let url = this.url
        
        switch (target) {
            case 'player':
                url += this.playerEndpoint                
                break;

            case 'emoji':
                url += this.emojiEndpoint
                break;
        
            default:
                console.log("target unkwown.")
                targetKnown = false
                break;
        }

        let options = {
            method: mode,
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        }
        if(hasData && targetKnown){
            fetch(url, options)
            .then(res => res.json())
            .then(res => console.log(res)); // TODO: return data per default    
        }else if(mode == 'GET' && targetKnown){
            fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                return data
            }); // TODO: return data per default    
        }

    }
}

let someEmojis = {
    id : "1",
    emojis: [
        "🦑",
        "🦄",
        "👽"
    ]
}

const apiDB = new APIService("343505-26.web.fhgr.ch/api/point-destroyer")

/*
apiDB.connect("emoji","PUT",someEmojis)

apiDB.connect("player","GET")

apiDB.connect("dieter","PUT",someEmojis)
*/


/**
 * 
 * let emojis = {
    id : "1",
    emojis: [
        "🦑",
        "🦄"
    ]
}

let player = {
    id: "1",
    playername: "zero",
    initialMessage: "setup",
    ownedMessage: "",
    initialPlaytime: "2022-05-03T00:12:00.000Z",
    fasterTime: null,
    emoji: "🍿"
}

*/