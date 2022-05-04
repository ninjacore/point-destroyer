class APIService{

    url = "https://"
    emojiEndpoint = "/emoji-list"
    playerEndpoint = "/player-record"


    constructor(serverIP){
        // TODO: decide if member variables should go here
        this.url += serverIP
    }

    connect(target,mode,data){

        let url = this.url

        switch (target) {
            case 'player':
                url += this.playerEndpoint                
                break;

            case 'emoji':
                url += this.emojiEndpoint
                break;
        
            default:
                console.log("mode unkwown.")
                break;
        }

        let options = {
            method: mode,
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        }

        fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res)); // TODO: return data per default

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

apiDB.connect("emoji","PUT",someEmojis)


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

let data = emojis


fetch(url+emojiEndpoint, options)
.then(res => res.json())
.then(res => console.log(res));

 * 
 */



// up to 500 loads per month. so be careful with reloading the page
/*fetch(url+emojiEndpoint)
.then(response => response.json())
.then(data => {
    console.log(data)
})*/


/*fetch("https://reddit3.p.rapidapi.com/subreddit?url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fwholesomememes%2F&filter=hot", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "reddit3.p.rapidapi.com",
		"x-rapidapi-key": "b2f8c303b8msh2cff217b37e5046p17b161jsn1ccb241b3d3f"
	}
})*/
    /*let posts = data.posts
    console.table(posts)
    console.log(posts)
    console.log(Object.values(posts))
    for(let i = 0; i < posts.length; i++){
        let post = posts[i]

        document.getElementById("container")
        .innerHTML += `<div class="post">
            <h3>${post.title}</h3>
            <a href="${post.permalink}">
            <img src="${post.url}" alt="${post.title}">
            </a>
            <p>by ${post.author}</p>
        </div>`;
    }*/


