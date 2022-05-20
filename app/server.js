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
        
        // TODO: delete after testing
        let startTime = performance.now()

        try {
            let response = await fetch(url)
            console.table(response)

            // TODO: delete after testing
            let endTime = performance.now()
            console.log(`%c Call to database took ${endTime - startTime} milliseconds`,"color: blue; font-weight:bold;")

            let data = await response.json()
            console.log("await response.json() = ",data)

            let allEmojis = data[0].emojis

            return allEmojis

        } catch (error) {
            return error.message
        }
    }

    async saveEmoji(emoji){

        try {
            console.log(`%c let currentEmojis = this.getEmojis() ....`,'color:white; font-weight:bold')
            let emojis = await this.getEmojis()

            // TODO: delete after testing
            console.table(emojis)
            console.log(typeof emojis)
    
            emojis.push(emoji)
            
            // TODO: delete after testing
            console.log(`adding this emoji: ${emoji}`)
            console.table(emojis)

            let emojiObject = {
                id: "1",
                emojis
            }

            await this.connect("emoji","PUT",emojiObject)

            
        } catch (error) {
            return error.message
        }

  

        // TODO: PUSH call
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

// TODO: delete once ready to publish
// to reset emoji object
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

// apiDB.connect("emoji","PUT",someEmojis)
apiDB.connect("emoji","GET")


let somePlayer = {
    emoji: "🦑",
    fasterTime: null,
    id: "1",
    initialMessage: "I am THE ONE!",
    initialPlaytime: "99364.5",
    ownedMessage: "",
    playername: "Bilbo"
}
// apiDB.connect("player","PUT",somePlayer)
apiDB.connect("player","GET")

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