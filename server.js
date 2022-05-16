class APIService {

    url = "https://"
    emojiEndpoint = "/emoji-list"
    playerEndpoint = "/player-record"


    constructor(serverIP) {
        // TODO: decide if member variables should go here
        this.url += serverIP
    }

    async getEmojis() {

        let url = this.url + this.emojiEndpoint
        let startTime = performance.now()

        try {
            let response = await fetch(url)
            console.table(response)
            let endTime = performance.now()
            console.log(`%c Call to database took ${endTime - startTime} milliseconds`,"color: blue; font-weight:bold;")

            let data = await response.json()
            let allEmojis = data[0].emojis
            console.table(allEmojis)
            return allEmojis

        } catch (error) {
            return error.message
        }
        /*
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                let endTime = performance.now()
                console.log(`%c Call to database took ${endTime - startTime} milliseconds`,"color: blue; font-weight:bold;")

                return data
            });   
        */
    }

    async connect(target, mode, data = '') {

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
                'Content-Type': 'application/json'
            }
        }
        if (hasData && targetKnown) {
            fetch(url, options)
                .then(res => res.json())
                .then(res => console.log(res)); // TODO: return data per default    
        } else if (mode == 'GET' && targetKnown) {
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
    id: "1",
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