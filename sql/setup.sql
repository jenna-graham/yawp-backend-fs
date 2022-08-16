-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS yawp_users;


CREATE TABLE yawp_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name VARCHAR NOT NULL,
    email VARCHAR,
    password_hash VARCHAR NOT NULL
);

INSERT INTO yawp_users (user_name, email, password_hash) VALUES
('cutie123', 'test@cutie.com', '123456'),
('rex123', 'test@rex.com', 'get1234' );


