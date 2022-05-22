class APIService {

    url = "https://"
    emojiEndpoint = "/emoji-list"
    playerEndpoint = "/player-record"


    constructor(serverIP) {
        // TODO: decide if member variables should go here
        this.url += serverIP
    }

    async delayCall(millisecondsToWait) {
        await new Promise(res => setTimeout(res, millisecondsToWait))
    } 

    async getEmojis() {

        let url = this.url + this.emojiEndpoint

        let emojiPromise
        try {
            emojiPromise = await new Promise((resolve, reject) => {
                fetch(url)
                .then(res => res.json())
                .then(resolve)
                .catch(reject)
            })
        } catch (error) {
            console.log(`%c couldn't load emojis. Got ${error}`,"color:red; font-weight:bold;")
            console.table(error)
            // if we got the Random error, we just try again
            return this.getEmojis()
        }

        // once we got the data we need to extrapolate it
        let activeEmojis = emojiPromise[0].emojis
        return activeEmojis

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
            console.log(`%c couldn't save emoji. Got ${error}`,"color:red; font-weight:bold;")
            console.table(error)
            // TODO: handle error

            // try again
            setTimeout(this.saveEmoji(emoji),5000);
        }

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
            console.log(`=> hasData && targetKnown (${target})`)
            console.log(`fetch ${mode} from url ${url}`)
            fetch(url, options)
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(error => {
                    console.log(`%c couldn't ${mode} ${target}. Got ${error}`,"color:red; font-weight:bold;")
                    console.table(error)
                    // TODO: handle error
                    console.log("retrying in 5 seconds...")
                    setTimeout(()=>{this.connect(target,mode,data)},5000)
                })
        } else if (mode == 'GET' && targetKnown) {
            console.log(`=> GET && targetKown (${target})`)
            console.log(`fetch ${mode} from url ${url}`)
            fetch(url)
                .then(res => {
                    console.log(`res is ${res} aka...`)
                    console.table(res)
                    return res.json()
                })
                .then(data => {
                    console.log(`got data ${typeof data}:`,data)
                    return data
                })
                .catch(error => {
                    console.log(`%c couldn't ${mode} ${target}. Got ${error}`,"color:red; font-weight:bold;")
                    console.table(error)
                    // TODO: handle error
                    console.log("retrying in 5 seconds...")
                    setTimeout(()=>{this.connect(target,mode)},5000)
                })
        }   
    }
}


// connect to database
const apiDB = new APIService("343505-26.web.fhgr.ch/api/point-destroyer")




// TODO: delete once ready to publish
// to reset emoji object
let someEmojis = {
    id: "1",
    emojis: [
        "🏳️‍⚧️",
        "🐯",
        "🤡",
        "🐤",
        "🍄",
        "🦄",
        "👹",
        "👻",
        "🩸",
        "🎩",
        "🐹",
        "🌈",
        "🦑",
        "👽",
        "🇯🇵",
        "💀"
    ]
}
// let emojidata = apiDB.connect("emoji","PUT",someEmojis)
// console.log("emojidata:",emojidata)
//apiDB.connect("player","GET")
// apiDB.connect("emoji","GET")

/*
apiDB.connect("player","GET")

apiDB.connect("dieter","PUT",someEmojis)
*/

// apiDB.connect("emoji","PUT",someEmojis)
//apiDB.connect("emoji","GET")


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