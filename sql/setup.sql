-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS yawp_users CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

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

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT,
    restaurant_id BIGINT,
    post VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES yawp_users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

INSERT INTO yawp_users (user_name, email, password_hash) VALUES
('cutie123', 'test@cutie.com', '123456'),
('rex123', 'test@rex2.com', 'get1234' );

INSERT INTO restaurants (name) VALUES 
('Luc Lac'),
('Thai Peakock'),
('Joes Burgers'),
('Arco Iris');

INSERT INTO reviews (user_id, restaurant_id, post) VALUES
(1,1, 'Amazing place to get a drink and vibe with friends'),
(1,2, 'Love the Basil Salmon, its the best!'),
(2,1, 'Best pho in town!'),
(2,3, 'I could eat these fries everyday all day!'), 
(1,4, 'The last meal before I die will come from Arco Iris, I will never be the same after eating the Arroz Con Pollo'),
(2,4, 'Arroz Con Pollo for life! 10 out of 10!')

