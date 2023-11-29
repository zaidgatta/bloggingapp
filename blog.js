import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDSXmjjp6LnHF5LGM01cV72DO3KUf90w8M",
    authDomain: "blog-bec29.firebaseapp.com",
    projectId: "blog-bec29",
    storageBucket: "blog-bec29.appspot.com",
    messagingSenderId: "630512496188",
    appId: "1:630512496188:web:31e7712f9a614a7e245d39",
    measurementId: "G-E07ECLCYSF"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const logoutBtn = document.getElementById('logout')
  const db = getFirestore(app);
  const addBlog = document.getElementById('add-blog')
  const title = document.getElementById('title')
  const description = document.getElementById('description')
  const dataCollectionRef = collection(db, 'test')
  const blogContent = document.getElementById('blog-content')
  const wrapper = document.getElementById('wrapper')
  const homeTab = document.getElementById('home-tab')

  const registerForm = document.getElementById('register-form')
const loginForm = document.getElementById('login-form')

registerForm?.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e)
    const userInfo = {
      fullname: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value
    }
createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
});

onAuthStateChanged(auth, user => {
    if (user) {
      wrapper.style.display = 'none'
      homeTab.style.display = 'block'
      getTodos();
    //   getBlogs()
    } else {
      console.log('User is logged out')
      alert('user logout')
      homeTab.style.display = 'none'
      wrapper.style.display = 'block'
    }
  })

loginForm?.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e)
    const userInfo = {
      email: e.target[0].value,
      password: e.target[1].value
    }
  signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
});

  logoutBtn?.addEventListener('click', () => {
    signOut(auth).then(() => {
      alert ("Sign-out successful.")
      homeTab.style.display = 'none'
      wrapper.style.display = 'block'
}).catch((error) => {
  alert ("An error happened.")
});
})

addBlog.addEventListener('click', async () => {
  if (!title.value) return alert ('please add title')
  if (!description.value) return alert ('please add description')
  try {
    const docRef = await addDoc(dataCollectionRef, {
      title: title.value,
      description: description.value
    });
    console.log("Document written with ID: ",docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})

async function getTodos(){
  const querySnapshot = await getDocs(dataCollectionRef);
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  const todoObj = doc.data()

  const h2 = document.createElement('h2')
  h2.innerText = todoObj.title
  const p = document.createElement('p')
  p.innerText = todoObj.description

  const blogText = document.createElement('div')

  const blogItem = document.createElement('div')

blogText.appendChild(h2)
blogText.appendChild(p)

blogItem.appendChild(blogText)

blogContent.appendChild(blogItem)


});
}

