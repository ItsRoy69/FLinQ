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

cd client:

client
![Alt text](image.png)

### Installation

1. Clone this repository to your local machine.

```bash
git clone https://github.com/ItsRoy69/Google-Solution
```

2. Navigate to the project directory.

```bash
cd Google-Solution
cd client
```

3. Install dependencies.

```bash
npm install
```

### Running the App

Start the frontend application.

```bash
npm run dev
```

Few Instructions:

- Naming format of folders should be in "smallcase"

- Used tailwind for consistent styling, if any component has styling which are not needed in other files/pages then use the "name.css" to include the css property tehre, other styles which are same in all componenets should be included and modified inside "index.css"

- Naming format of jsx files should be in "PascalCase"

## CHATBOT
- To run the chatbot, first create a virtual environment (if you don't already have one).
  
  - ### Creating Virtual Environment
    
    - Use this command in powershell: ` python -m venv venv` and if it does not work, you may use this command: `python -m virtualenv venv`.
      
- Then, activate the virtual environment.
  
  - ### Activating the virtual environment
    
    - Use `venv/Scripts/Activate.ps1` to activate the virtual environment.
      
- After that, you will have to install the packages that are required to run the python files. The packages are listed in the `requirements.txt` file.
  
    - ### Installing the packages
      
      - Use `pip install -r requirements.txt` to install the packages.
     
    - ### Creating venv + Installing packages in one go

      - Use `python -m venv venv && venv/bin/pip install -r requirements.txt` . 
        
- To run the `chat.py` file, use the command: `python chat.py`
  
- To run the `chat-flask.py` file, use the command: `python chat-flask.py`
  
- You will need a GCP (Google Cloud Platform) account to run both the `chat.py` and `chat-flask.py` files.
  
  - After creating the GCP account, enable the **Vertex AI API**.
    
  - Then, to use the API, you will need to authenticate the request. You may do that by setting **ADC(Application Default Credentials)**.
    
    - Docs to refer to set ADC: [ADC using Google Cloud CLI](https://cloud.google.com/docs/authentication/gcloud#gcloud-credentials) , [ADC using Service Account Key](https://cloud.google.com/kubernetes-engine/docs/tutorials/authenticating-to-cloud-platform)
      
  - If you are using *service account key* for authentication:
    
    - Add the role: **Vertex AI User** to your service account by going to the **IAM** tab on your GCP Console.
      
    - Add your service account key as an environment. You may use the variable *GOOGLE_APPLICATION_CREDENTIALS* to name your environment.
      
    - **Remember to only provide the path to your service account key file in the environment, and not the content, since only the location of the key is expected.**
      
- Once you run the `chat-flask.py` file, you may test if the REST API is working properly either by using `curl` or by using any other API testing platform. Since the API only accepts `POST` requests, clicking on the localhost link will result in a *405 Method Error*.

### Deployed link for the Chatbot: 

[Chatbot link](https://googlesolchatbot.onrender.com/chat)

_Don't let gender inequality hold you back. Take control, join the growing network of women and professionals on FlinQ and rewrite your story._
