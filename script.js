const cards =
document.querySelectorAll(".gallery-card");

const count =
document.getElementById("project-count");

function updateCount(){

    const visible =
    document.querySelectorAll(
    ".gallery-card:not(.hide)"
    ).length;

    count.innerText =
    `Showing ${visible} Projects`;
}

function filterProjects(category){

    cards.forEach(card => {

        if(
            category === "all" ||
            card.classList.contains(category)
        ){
            card.classList.remove("hide");
        }
        else{
            card.classList.add("hide");
        }

    });

    updateCount();
}

updateCount();
fetch("https://api.github.com/users/AMRITHA-LAL/repos")

.then(response => response.json())

.then(repositories => {

    // Hide forks
    repositories = repositories.filter(repo => !repo.fork);

    // Sort newest first
    repositories.sort(
        (a,b)=>
        new Date(b.updated_at)-new Date(a.updated_at)
    );

    document.getElementById("repo-count").innerHTML =
    `Total Repositories: ${repositories.length}`;

    const container =
    document.getElementById("repo-container");

    container.innerHTML="";

    repositories.forEach(repo=>{

        const card=document.createElement("div");

        card.className="project-card";

        card.innerHTML=`

        <h3>${repo.name}</h3>

        <p>
        ${repo.description || "No description available."}
        </p>

        <p>

        <strong>Language:</strong>
        ${repo.language || "Not specified"}

        </p>

        <p>

        ⭐ ${repo.stargazers_count}

        &nbsp;&nbsp;&nbsp;

        🍴 ${repo.forks_count}

        </p>

        <a href="${repo.html_url}"
        target="_blank">

        View Repository

        </a>

        `;

        container.appendChild(card);

    });

});
let currentSlide = 0;


const slides = document.querySelectorAll(".slide");


const titles = [
    "Login Screen",
    "Home Dashboard",
    "Tasks Management",
    "Calendar",
    "AI Assistant Interface",
    "User Profile"
];


function showSlide(index){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });


    slides[index].classList.add("active");


    document.getElementById("slide-title").innerHTML =
    titles[index];

}



function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}



function previousSlide(){

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length-1;
    }

    showSlide(currentSlide);

}



// Automatic slideshow

setInterval(nextSlide,8000);
