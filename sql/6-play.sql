USE quizduell;

CREATE OR REPLACE TABLE PLAY (
    USER_ID INTEGER,
    GAME_ID INTEGER,

    PRIMARY KEY (USER_ID, GAME_ID)
);