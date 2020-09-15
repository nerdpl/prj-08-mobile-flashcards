# "Mobile Flashcards" App

## Table of Contents

* [Project info](#project_info)
* [List of files](#list_of_files)
* [Installation](#installation)
* [Components](#functions)
* [Additional Functionality](#additional_functionality)

## Project_Info

The subject of the project was to create a React-Native app that lets the user create decks of cards with questions and answers. There are options to create new deck, create new card with question within a deck, and to run a Quiz which will test the user on every card in the deck and show score at the end. 

## List_Of_Files

actions\ : index.js
components\ : AddCard.js , AddDeck.js , Home.js , Quiz.js , ViewDeck.js , ViewQuizResults.js
reducers\ : index.js
utils\ : api.js , colors.js
\ : App.js

\app.json
\package-lock.json
\package.json
\README.md
\yarn.lock

## Installation

"yarn install" to install the project.
"yarn start" to start. 

## Components

- App.js
Renders main App with Navigation Menu.

- AddCard.js
Component renders a form where user can input new card information (question and answer) and add it to the deck.

- AddDeck.js
Renders a form to add new deck.

- Home.js
Home page with a list of created card decks and a tab menu with two options: 'Decks' and 'Add Deck'. After selecting one of the decks, application navigates to the ViewDeck component.

- Quiz.js
Starts the quiz on the selected deck. Shows each card in the deck one by one with the question on it and lets user view the answer, and select 'Correct' or 'Incorrect' button. After the last question it navigates to the ViewQuizResults component with the score.

- ViewDeck.js
Renders a deck view. Shows deck name, number of cards and three buttons: 'Start Quiz' which navigates to Quiz component, 'Add card' which navigates to AddCard component and 'Delete deck'.

- ViewQuizResults.js
Shows number of correct answers and total amount of cards and lets user take the quiz again or return to the Home view.

## Additional_Functionality

- I added Redux for state menagement.
- I added the option to delete deck.