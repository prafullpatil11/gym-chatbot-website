# 💪 AI Gym Trainer Chatbot

An intelligent conversational fitness assistant that helps users plan workouts, calculate BMI, and set fitness goals — powered by **Google Dialogflow ES**, **Google Apps Script (Webhook)**, and integrated into a **web application using HTML, CSS, and JavaScript**.

Deployed and accessible via web interface.

---

## ✨ Overview

AI Gym Trainer Chatbot is a full-stack conversational AI application designed to guide users in their fitness journey.

Instead of manually searching for workout plans or BMI calculators, users can simply interact with the chatbot in natural language to:

* Provide personal fitness data
* Set fitness goals
* Get workout recommendations
* Calculate BMI instantly

The chatbot uses Dialogflow for NLP and a webhook for dynamic calculations, all wrapped inside a responsive web interface.

---

## 🚀 Features

* 💬 **Conversational Chat Interface** (Web-based UI)
* 🧠 **Natural Language Understanding** using Dialogflow ES
* 📊 **BMI Calculation** via Google Apps Script Webhook
* 🎯 **Goal-Based Fitness Planning** (Weight Loss, Gain, Muscle Building)
* 🏋️ **Workout Recommendations** based on selected muscle groups
* 🔁 **Context-Based Multi-step Conversation Flow**
* 🌐 **Frontend Integration** using HTML, CSS, JavaScript
* 🚀 **Deployed Application** (Accessible via browser)

---

## 🏗️ Architecture

User Browser
│
▼
Frontend (HTML + CSS + JavaScript)
│
▼
Dialogflow ES Agent
│  Intent Detection + Entity Extraction
│
▼
Google Apps Script Webhook
│  BMI Calculation + Dynamic Responses
│
▼
Dialogflow Response
│
▼
Frontend Chat UI

---

## 🛠️ Tech Stack

| Layer         | Technology                   |
| ------------- | ---------------------------- |
| Frontend      | HTML, CSS, JavaScript        |
| NLP Engine    | Google Dialogflow ES         |
| Backend Logic | Google Apps Script (Webhook) |
| Deployment    | Vercel                       |
| Integration   | Dialogflow API               |

---

## 📂 Project Structure

```bash
AI-Gym-Trainer/
│── index.html        # Chatbot UI  
│── style.css         # Styling  
│── script.js         # API + chatbot interaction  
│── Code.gs           # Webhook logic (BMI, processing)  
│── intents/          # Dialogflow intents (JSON files)  
│── README.md  
```

---

## 🤖 Chatbot Flow

1. **User Information Collection**
   → Height, Weight, Age, Gender

2. **Goal Selection**
   → Weight Loss / Weight Gain / Muscle Building

3. **Workout Plan Generation**
   → Based on selected muscle groups

4. **BMI Calculation**
   → Handled dynamically via webhook

---

## 💬 Example Inputs

* `170 65 21 male`
* `weight loss`
* `chest and back`
* `calculate bmi`

---

## ⚙️ Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Dialogflow Setup

* Create Dialogflow Agent
* Import intent JSON files
* Enable webhook

### 3. Webhook Setup

* Deploy `Code.gs` as Web App
* Copy Webhook URL
* Add in Dialogflow Fulfillment

### 4. Run Project

Open `index.html` in browser

---

## 🌐 Deployment

This project is deployed using **Vercel** for fast and scalable hosting.

---

## ⚠️ Limitations

* Requires internet connection
* Depends on Dialogflow training data
* Limited to predefined intents

---

## 🔮 Future Improvements

* Voice-enabled chatbot 🎤
* Diet plan recommendations 🍽️
* User progress tracking
* Database integration
* Improved UI/UX

---

## 👨‍💻 Author

* Prafull Patil

---

## 📄 License

Educational Project
