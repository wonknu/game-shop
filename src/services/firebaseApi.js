import * as firebase from 'firebase'
console.log(process.env)
const fireBaseconfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET
}

export const app = firebase.initializeApp(fireBaseconfig)
export const auth = firebase.auth()
export const db = firebase.database()
export const storage = firebase.storage()

export const add = (data) => {
  return new Promise((resolve) => {
    db
      .ref(`games/${data.game}`)
      .set({price: data.price, seller: data.seller}, function (err) {
		    if(err) {
		    	resolve({error: err})
		    	return
		    }
		    let formatedValue = {}
		    formatedValue[data.game] = {price: data.price, seller: data.seller}
		    resolve(formatedValue)
			})
  })
}

export const get = () => {
  return new Promise((resolve) => {
    var ref = db.ref(`games`)

		ref.on("value", function(snapshot) {
			resolve(snapshot.val())
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
			resolve({'error': 1})
		});
  })
}

export const listenItems = (callBack) => {
  db.ref('games').on("value", function(dataSnapshot) {
	  callBack(dataSnapshot.val())
	})
}

