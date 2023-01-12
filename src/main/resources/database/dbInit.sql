-- users
create table roles (
   id  serial not null primary key,
   name varchar(20)
);

create table user_roles (
    user_id bigint not null,
    role_id int not null,
    primary key (user_id, role_id)
);

create table users (
   id  bigserial not null primary key,
   username varchar(20) unique,
   email varchar(50) unique,
   password varchar(120)
);

alter table user_roles
    add constraint user_roles_roles_constraint
        foreign key (role_id)
            references roles;

alter table user_roles
    add constraint user_roles_users_constraint
        foreign key (user_id)
            references users;

alter table user_roles
    DROP CONSTRAINT user_roles_users_constraint,
    ADD CONSTRAINT constraint_name FOREIGN KEY (user_id)
        REFERENCES user_roles (user_id) ON DELETE CASCADE;


--Обязательные роли для работы приложения
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

--cars
create table car_type(
     id serial not null primary key ,
     name varchar not null unique
);

insert into car_type(name) values ('A');
insert into car_type(name) values ('B');
insert into car_type(name) values ('C');
insert into car_type(name) values ('D');
insert into car_type(name) values ('E');
insert into car_type(name) values ('F');
insert into car_type(name) values ('G');
insert into car_type(name) values ('S');
insert into car_type(name) values ('M');
insert into car_type(name) values ('J');

create table fuel_type(
      id serial not null primary key ,
      name varchar not null unique
);

insert into fuel_type(name) values ('Бензин');
insert into fuel_type(name) values ('Дизель');
insert into fuel_type(name) values ('Электро');
insert into fuel_type(name) values ('Альтернативный');

create table car_brand(
      id serial not null primary key,
      name varchar not null unique
);

insert into car_brand(name) values ('BMW');
insert into car_brand(name) values ('INFINITY');
insert into car_brand(name) values ('TESLA');
insert into car_brand(name) values ('LADA');

create table car_body_type(
      id serial not null primary key ,
      name varchar not null unique
);

insert into car_body_type(name) values ('Кроссовер');
insert into car_body_type(name) values ('Внедорожник');
insert into car_body_type(name) values ('Пикап');
insert into car_body_type(name) values ('Хэтчбэк');
insert into car_body_type(name) values ('Седан');
insert into car_body_type(name) values ('Минивен');
insert into car_body_type(name) values ('Родстер');
insert into car_body_type(name) values ('Кабриолет');
insert into car_body_type(name) values ('Купе');
insert into car_body_type(name) values ('Лимузин');

create table cars (
    id  serial not null primary key,
    model varchar not null ,
    car_type_id int not null references car_type(id),
    car_brand_id int not null references car_brand(id),
    year int not null ,
    transmission varchar not null ,
    fuel_type_id int not null references fuel_type(id),
    body_type_id int not null references car_body_type(id),
    engine_volume double precision not null,
    horsepower int not null ,
    fuel_consumption double precision not null,
    deposit int not null ,
    car_count int not null
);

alter table cars
    add column price int;

create table user_profile(
    id int not null unique references users(id) on delete cascade,
    first_name varchar not null,
    last_name varchar not null,
    patronymic varchar not null,
    passport_serial varchar(4) not null,
    passport_number varchar(6) not null,
    date_of_birth date not null
);

ALTER DATABASE car_rental_final SET datestyle TO "ISO, MDY";

create table rent_requests(
    id bigserial primary key,
    user_id bigint not null references users(id) on delete cascade ,
    car_id int not null references cars(id) on delete cascade,
    start_date date not null,
    end_date date not null,
    phone_number varchar not null,
    price int not null,
    status varchar not null
);

create table rent_service(
    id bigserial  primary key,
    user_id bigint references users(id),
    car_id int references cars(id),
    moderator_id bigint references users(id),
    start_date date not null,
    end_date date not null,
    total_price int not null,
    status varchar not null
);
