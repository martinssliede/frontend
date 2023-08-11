import axios from 'axios';

const form = document.querySelector<HTMLFormElement>(".js-form");
const posts = document.querySelector(".js-posts");
const submitButton = document.querySelector<HTMLButtonElement>(".js-submit");

type DataToSend = {[key: string]: unknown};
type Post = {
    author: string
    id: number
    title: string 
}

const addPostsHTML = (post: Post) => {
    const postHTML = `
        <div>
        <h1>${post.title}</h1>
        <p>${post.author}</p>
        </div>
        <br><br>
        `;
}

axios.get("http://localhost:3004/posts").then((res) => {
    console.log(res.data);
    res.data.forEach((post: Post) => {
        addPostsHTML(post)
    });    
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    const formData = new FormData(form);

    const finalData: DataToSend = {};

    for (const pair of formData.entries()) {
        finalData[pair[0]] = pair[1];
    }
    
    axios.post("http://localhost:3004/posts", finalData).then((res) => {
        const post: Post = res.data;
        res.data.forEach((post: Post) => {
            addPostsHTML(post)
        });   
    });
    form.reset();
    submitButton.disabled = false;
})