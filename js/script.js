async function loadResume() {
    try {
        const response = await fetch('data/resume.json');
        const data = await response.json();
        populateResume(data);
    } catch (error) {
        console.error('Error loading resume data:', error);
    }
}

function populateResume(data) {
    document.getElementById('name').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    document.getElementById('about-content').textContent = data.about;

    const experienceList = document.getElementById('experience-list');
    data.experience.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('experience-item');
        jobElement.innerHTML = `
            <h3>${job.position}</h3>
            <p>${job.company}, ${job.location}</p>
            <p>${job.startDate} - ${job.endDate}</p>
            <ul>
                ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        `;
        experienceList.appendChild(jobElement);
    });

    const educationList = document.getElementById('education-list');
    data.education.forEach(edu => {
        const eduElement = document.createElement('div');
        eduElement.classList.add('education-item');
        eduElement.innerHTML = `
            <h3>${edu.degree}</h3>
            <p>${edu.institution}, ${edu.location}</p>
            <p>${edu.graduationDate}</p>
        `;
        educationList.appendChild(eduElement);
    });

    const skillsList = document.getElementById('skills-list');
    data.skills.forEach(skill => {
        const skillElement = document.createElement('li');
        skillElement.textContent = skill;
        skillsList.appendChild(skillElement);
    });

    const contactSection = document.getElementById('contact');
    contactSection.innerHTML = `
        <a href="mailto:${data.email}"><i class="fas fa-envelope"></i> Email</a>
        <a href="${data.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
        <a href="${data.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
    `;
}

document.addEventListener('DOMContentLoaded', loadResume);