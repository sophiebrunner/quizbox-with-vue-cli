### Quizbox - Final task for my Coding Bootcamp

## About

- Quizbox programmed with the Vue CLI.
- The Quizbox helps students of [Coding Bootcamps Europe](https://github.com/coding-bootcamps-eu) to question whether the topics of the Bootcamp are understood and learned.
- The Quizbox provides questions on the different topics of the Bootcamp, that have to be answered orally by the students.

## Features

# Quizbox Session

- [] To start a Quiz Box session, at least one topic and the number of questions (10, 20 or 30) to be asked must be selected.

# Question Randomness

- [] If more than one topic is selected, an equal number (if possible) of randomly selected questions from all topics should be used.

# Browse Quesions

- [] Besides a quizbox session it is also possible to browse all questions from each category.

## Basic Data

- categories and questions (objects)
  - [] first implemented directly to the repo
  - [] later provided by a backend
- numberOfQuestions for the categories (array.length)

# Components

**1. SelectOption.vue**

- h2 for heading (prop: title)
- p for short description (prop: description)
- option element with for-of-loop for different options (number of questions resp category)

**2. BaseList.vue**

- h3 with heading (prop: title)
- p with number of categories resp questions
- ul with for-of-loop with categories resp questions
- slot for checkbox (for PlayQuizbox.vue) and slot for number of questions (for PlayQuizbox.vue)

**3. BaseButton.vue**

- button with different text options
- will be implemented in PlayQuizbox.vue ("Start Quizbox") and QuizboxSession.vue (session.finished ? "Finish" : "Next")

**4. QuizboxSession.vue**

- h2 for heading (no prop needed)
- p with question count resp info about finished session
- p with question (centered and bold)
- BaseButton.vue with text "Next" resp "Finish" (session.finished ? "Finish" : "Next")

# Views

**1. PlayQuizbox.vue (aka HomeView.vue)**

- h2 with prop title="Play Quizbox"
- p with prop description="Quiz time - test what you know"
- SelectOption.vue with for-of-loop for number of questions
- h3 with prop title="Question areas"
- p with prop numberOfQuestionAreas
- BaseList.vue with checkbox and number of questions
- Basebutton.vue with text "Start Quizbox"

**2. BrowseQuestions.vue (aka AboutView.vue)**

- h2 with prop title="Browse Questions"
- p with prop description="Choose a category with questions"
- SelectOption.vue with for-of-loop for categories
- h3 with prop title="Questions from the chapter"
- p with prop numberOfQuestionsFromChapter
- BaseList.vue with QuestionsFromChapter
