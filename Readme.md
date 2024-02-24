## Welcome to FLINQ!

![FlinQ-Banner-png](https://github.com/ItsRoy69/FLinQ/assets/109765650/f1758b46-4f1c-443a-ab3c-2e46e0437af3)

This project provides a one-stop platform for women facing gender inequality to access safe, empowering resources and connect with diverse professionals, both anonymously and in one-on-one settings.

#### Key Features:

* **Connect with experts:** Choose between anonymous or one-on-one chat with professionals for guidance in healthcare, education, and career development.
* **Skill and career development:** Access opportunities like Google STEP and Women Techmakers, along with skill-building events and workshops.
* **Reliable health information:** Combat stigma and get reliable information from healthcare professionals.
* **Chatbot:** Get instant answers to questions about beauty, health, fitness through our friendly and informative chatbot.
* **Emergency alerts:** Stay safe with an alert system that empowers you in critical situations.
* **Community building:** Share experiences and connect with other women through a dedicated feed page.
* **Job opportunities:** Find your dream career with curated postings on the FlinQ jobs page.
* **Local resources:** Easily locate nearby pharmacies, education institutes, and other essential services through the interactive map.

By dismantling barriers and fostering connections, FlinQ aims to create a safer and more empowered world for all women, offering both anonymity and the opportunity for deeper engagement.

### User Workflow:

![FlinQ-user-workflow-1](https://github.com/ItsRoy69/FLinQ/assets/109765650/da10a450-0486-4a18-8d75-17e9690eb64d)

![FlinQ-user-workflow-2](https://github.com/ItsRoy69/FLinQ/assets/109765650/19496cbd-d095-467a-a677-f3afdf5d49a1)


### Folder Workflow:

```FlinQ/
├── chatbot/
├── client/
│   ├── public/
│   │   ├── icons/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── alert/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   ├── event/
│   │   │   ├── feed/
│   │   │   ├── jobs/
│   │   │   ├── navbar/
│   │   │   └── profile/
│   │   ├── constants/
│   │   │   ├── alert/
│   │   │   ├── feed-selector/
│   │   │   ├── home_navbar/
│   │   │   └── navbar/
│   │   │   └── search/
│   │   ├── contexts/
│   │   ├── data/
│   │   ├── pages/
│   │   │   ├── chat/
│   │   │   │   ├── anonymous/
│   │   │   │   ├── bot/
│   │   │   │   └── community/
│   │   │   ├── error/
│   │   │   ├── events/
│   │   │   ├── feed/
│   │   │   ├── home/
│   │   │   ├── jobs/
│   │   │   ├── map/
│   │   │   ├── profile/
│   │   │   └── user/
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middleware/
│   ├── services/
│   └── package.json
└── README.md
```

## TECHSTACK


<div align="center">

![React JS](https://img.shields.io/badge/React.js-black?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%23404d59.svg?style=for-the-badge&logo=TailwindCSS&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?style=for-the-badge&logo=Vercel&logoColor=#00C7B7)
![Onrender](https://img.shields.io/badge/Onrender-%23000000.svg?style=for-the-badge&logo=render&logoColor=#00C7B7)
![Firebase](https://img.shields.io/badge/Firebase-%6DA55F?style=for-the-badge&logo=Firebase&logoColor=#00C7B7)
![Socket.IO](https://img.shields.io/badge/socket.io-%23000000.svg?style=for-the-badge&logo=socket.io&logoColor=#0000FF)
![Python](https://img.shields.io/badge/python-38863B?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/flask-742f49?style=for-the-badge&logo=flask&logoColor=fff)
![Vertex AI](https://img.shields.io/badge/Vertex%20AI-%2343A047?style=for-the-badge&logo=google-cloud&logoColor=white)
![PaLM](https://img.shields.io/badge/PaLM-orange?style=for-the-badge&logo=google&logoColor=white)
![Google Auth](https://img.shields.io/badge/Google%20Auth-%234285F4?style=for-the-badge&logo=google&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-%23333333?style=for-the-badge&logo=auth0&logoColor=fff)

</div>


## INSTALLATION

Clone this repository to your local machine.

```bash
git clone https://github.com/ItsRoy69/Google-Solution
```

- ### Chatbot Installation

  1. Navigate to the project directory.
     
    ```bash
    cd FlinQ
    cd chatbot
    ```
    

  2. Create a virtual environment:
     
    ```bash
    python -m venv venv
    ```
    
  3. Activate the virtual environment:

     **Windows:**

     ```bash
     venv\Scripts\Activate.ps1
     ```

     **MacOS/ Linux:**

     ```bash
     source venv/bin/activate
     ```

  4. Install dependencies:

     ```bash
     pip install -r requirements.txt
     ```

  5. Run the chatbot:

     _Make sure you have a GCP account with Vertex AI enabled._

    ```bash
    python chat-flask.py
    ```
  
- ### Client Installation

  1. Navigate to the project directory.

    ```bash
    cd FlinQ
    cd client
    ```

  2. Install dependencies.

    ```bash
    npm install
    ```

- ### Server Installation

  1. Navigate to the project directory.

    ```bash
    cd FlinQ
    cd server
    ```

  2. Install dependencies.

    ```bash
    npm install
    ```

  3. Start the server:

    ```bash
    nodemon start
    ```


### Running the App

Start the frontend application.

```bash
npm run dev
```

* NOTE:

  Rename `env.example` in the **client** folder to `.env` and fill it with the required values. Refer to the `.env.example` file for guidance.

_**Don't let gender inequality hold you back. Take control, join the growing network of women and professionals on FlinQ and rewrite your story.**_
