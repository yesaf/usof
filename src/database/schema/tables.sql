USE usof;

CREATE TABLE IF NOT EXISTS users
(
    account_id      INT UNSIGNED        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(255)        NOT NULL DEFAULT '',
    email           VARCHAR(255) UNIQUE NOT NULL,
    login           VARCHAR(255) UNIQUE NOT NULL,
    role            ENUM ('user', 'admin')       DEFAULT 'user',
    rating          INT                 NOT NULL DEFAULT 0,
    profile_picture BLOB,
    password        VARCHAR(255)        NOT NULL,
    create_time     TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
) Engine = InnoDB
  CHARSET = utf8;

CREATE TABLE IF NOT EXISTS posts
(
    post_id      INT UNSIGNED                NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id    INT UNSIGNED                NOT NULL,
    title        VARCHAR(255)                NOT NULL,
    content      TEXT                        NOT NULL,
    status       ENUM ('active', 'inactive') NOT NULL,
    publish_date TIMESTAMP                   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (account_id)
) Engine = InnoDB
  CHARSET = utf8;

CREATE TABLE IF NOT EXISTS categories
(
    category_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
) Engine = InnoDB
  CHARSET = utf8;

CREATE TABLE IF NOT EXISTS categories_posts
(
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id     INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (post_id),
    FOREIGN KEY (category_id) REFERENCES categories (category_id)
) Engine = InnoDB
  CHARSET = utf8;

CREATE TABLE IF NOT EXISTS comments
(
    comment_id   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    parent_id    INT UNSIGNED,
    top_id       INT UNSIGNED,
    post_id      INT UNSIGNED NOT NULL,
    author_id    INT UNSIGNED NOT NULL,
    content      TEXT         NOT NULL,
    publish_date TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts (post_id),
    FOREIGN KEY (author_id) REFERENCES users (account_id)
) Engine = InnoDB
  CHARSET = utf8;

CREATE TABLE IF NOT EXISTS likes
(
    like_id     INT UNSIGNED             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM ('post', 'comment') NOT NULL,
    entity_id   INT UNSIGNED             NOT NULL,
    author_id   INT UNSIGNED             NOT NULL,
    type        ENUM ('like', 'dislike') NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (account_id)
) Engine = InnoDB
  CHARSET = utf8;
