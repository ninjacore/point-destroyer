class APIService {

    url = "https://"
    emojiEndpoint = "/emoji-list"
    playerEndpoint = "/player-record"


    constructor(serverIP) {
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
    
            emojis.push(emoji)
            

            let emojiObject = {
                id: "1",
                emojis
            }

            await this.connect("emoji","PUT",emojiObject)

            
        } catch (error) {
            console.log(`%c couldn't save emoji. Got ${error}`,"color:red; font-weight:bold;")
            console.table(error)

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
          
                    console.log("retrying in 5 seconds...")
                    setTimeout(()=>{this.connect(target,mode,data)},5000)
                })
        } else if (mode == 'GET' && targetKnown) {
            console.log(`=> GET && targetKown (${target})`)
            console.log(`fetch ${mode} from url ${url}`)


            let fetchPromise
            try {
                fetchPromise = await new Promise((resolve, reject) => {
                    fetch(url)
                    .then(res => res.json())
                    .then(resolve)
                    .catch(reject)
                })
            } catch (error) {
                console.log(`%c couldn't load from ${target}. Got ${error}`,"color:red; font-weight:bold;")
                console.table(error)
                // if we got the Random error, we just try again
                console.log(`%c retrying...`,"color:red; font-weight:bold;")
                return this.connect(target,mode)
            }
            // return promise for actual data
            return fetchPromise
    
        }   
    }
}


// connect to database
const apiDB = new APIService("343505-26.web.fhgr.ch/api/point-destroyer")