-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS yawp_users CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;


CREATE TABLE yawp_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name VARCHAR NOT NULL,
    email VARCHAR,
    password_hash VARCHAR NOT NULL
);

CREATE TABLE restaurants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL
);

INSERT INTO yawp_users (user_name, email, password_hash) VALUES
('cutie123', 'test@cutie.com', '123456'),
('rex123', 'test@rex2.com', 'get1234' );

INSERT INTO restaurants (name) VALUES 
('Luc Lac'),
('Thai Peakock'),
('Joes Burgers'),
('Arco Iris');

