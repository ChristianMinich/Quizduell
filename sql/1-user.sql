USE QUIZDUELL;

CREATE OR REPLACE TABLE USER (
    USER_ID INTEGER,
    USERNAME VARCHAR(20) NOT NULL,
    PASSWORD VARCHAR (64) NOT NULL CHECK (PASSWORD REGEXP '{8-64}'),
    HIGHSCORE INTEGER NOT NULL,
    AVATAR_ID INTEGER NOT NULL,

    PRIMARY KEY (USER_ID)
);