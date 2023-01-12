--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2022-12-08 01:44:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 25832)
-- Name: car_body_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_body_type (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.car_body_type OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 25831)
-- Name: car_body_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_body_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_body_type_id_seq OWNER TO postgres;

--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 225
-- Name: car_body_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_body_type_id_seq OWNED BY public.car_body_type.id;


--
-- TOC entry 224 (class 1259 OID 25821)
-- Name: car_brand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_brand (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.car_brand OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25820)
-- Name: car_brand_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_brand_id_seq OWNER TO postgres;

--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 223
-- Name: car_brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_brand_id_seq OWNED BY public.car_brand.id;


--
-- TOC entry 220 (class 1259 OID 25799)
-- Name: car_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_type (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.car_type OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25798)
-- Name: car_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_type_id_seq OWNER TO postgres;

--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 219
-- Name: car_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_type_id_seq OWNED BY public.car_type.id;


--
-- TOC entry 228 (class 1259 OID 25995)
-- Name: cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cars (
    id integer NOT NULL,
    model character varying NOT NULL,
    car_type_id integer NOT NULL,
    car_brand_id integer NOT NULL,
    year integer NOT NULL,
    transmission character varying NOT NULL,
    fuel_type_id integer NOT NULL,
    body_type_id integer NOT NULL,
    enginevolume numeric NOT NULL,
    horsepower integer NOT NULL,
    fuel_consumption numeric NOT NULL,
    deposit numeric,
    car_count integer NOT NULL,
    price integer,
    CONSTRAINT cars_car_count_check CHECK ((car_count > 0)),
    CONSTRAINT cars_year_check CHECK ((year > 2000))
);


ALTER TABLE public.cars OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 25994)
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cars_id_seq OWNER TO postgres;

--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 227
-- Name: cars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;


--
-- TOC entry 222 (class 1259 OID 25810)
-- Name: fuel_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fuel_type (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.fuel_type OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25809)
-- Name: fuel_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fuel_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fuel_type_id_seq OWNER TO postgres;

--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 221
-- Name: fuel_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fuel_type_id_seq OWNED BY public.fuel_type.id;


--
-- TOC entry 215 (class 1259 OID 25755)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(20)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 25754)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 214
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 229 (class 1259 OID 26042)
-- Name: user_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profile (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    patronymic character varying NOT NULL,
    passport_serial character varying(4) NOT NULL,
    passport_number character varying(6) NOT NULL,
    date_of_birth date NOT NULL
);


ALTER TABLE public.user_profile OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 25761)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25767)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(20),
    email character varying(50),
    password character varying(120)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25766)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3216 (class 2604 OID 25835)
-- Name: car_body_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_body_type ALTER COLUMN id SET DEFAULT nextval('public.car_body_type_id_seq'::regclass);


--
-- TOC entry 3215 (class 2604 OID 25824)
-- Name: car_brand id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_brand ALTER COLUMN id SET DEFAULT nextval('public.car_brand_id_seq'::regclass);


--
-- TOC entry 3213 (class 2604 OID 25802)
-- Name: car_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_type ALTER COLUMN id SET DEFAULT nextval('public.car_type_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 25998)
-- Name: cars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);


--
-- TOC entry 3214 (class 2604 OID 25813)
-- Name: fuel_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuel_type ALTER COLUMN id SET DEFAULT nextval('public.fuel_type_id_seq'::regclass);


--
-- TOC entry 3211 (class 2604 OID 25758)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 25770)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3411 (class 0 OID 25832)
-- Dependencies: 226
-- Data for Name: car_body_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.car_body_type (id, name) FROM stdin;
1	Кроссовер
2	Внедорожник
3	Пикап
4	Хэтчбэк
5	Седан
6	Минивен
7	Родстер
8	Кабриолет
9	Купе
10	Лимузин
\.


--
-- TOC entry 3409 (class 0 OID 25821)
-- Dependencies: 224
-- Data for Name: car_brand; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.car_brand (id, name) FROM stdin;
1	BMW
2	INFINITY
3	TESLA
4	LADA
24	PORSHE
\.


--
-- TOC entry 3405 (class 0 OID 25799)
-- Dependencies: 220
-- Data for Name: car_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.car_type (id, name) FROM stdin;
1	A
2	B
3	C
4	D
5	E
6	F
7	G
8	S
9	M
10	J
\.


--
-- TOC entry 3413 (class 0 OID 25995)
-- Dependencies: 228
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cars (id, model, car_type_id, car_brand_id, year, transmission, fuel_type_id, body_type_id, enginevolume, horsepower, fuel_consumption, deposit, car_count, price) FROM stdin;
15	New car	8	1	2010	Автомат	3	7	4	444	25	5000	5	2500
\.


--
-- TOC entry 3407 (class 0 OID 25810)
-- Dependencies: 222
-- Data for Name: fuel_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fuel_type (id, name) FROM stdin;
1	Бензин
2	Дизель
3	Электро
4	Альтернативный
\.


--
-- TOC entry 3400 (class 0 OID 25755)
-- Dependencies: 215
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	ROLE_USER
2	ROLE_MODERATOR
3	ROLE_ADMIN
\.


--
-- TOC entry 3414 (class 0 OID 26042)
-- Dependencies: 229
-- Data for Name: user_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_profile (id, first_name, last_name, patronymic, passport_serial, passport_number, date_of_birth) FROM stdin;
1	Виктор	Кулаков	Андреевич	1234	123456	2002-04-16
\.


--
-- TOC entry 3401 (class 0 OID 25761)
-- Dependencies: 216
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, role_id) FROM stdin;
1	3
4	3
6	1
7	1
8	1
9	1
1	2
2	1
9	2
\.


--
-- TOC entry 3403 (class 0 OID 25767)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password) FROM stdin;
1	admin	admin@test.ru	$2a$10$bRfGxKnwcvlTgiHDPX1wLeyySbGJhRVNnh4gWP8je54Yx9ESWSyFi
2	username	test1@test.ru	$2a$10$xIhIEDHaNgkKuV2LrnJSSuR3jzlnZnz88eguAf4m2vcD0N1cLAL6e
4	user3	user3@test.ru	$2a$10$sstyr2BC1cTxo6LY3SAvKeHhHCkse2.N/scMgJCBNiJhvJ5Zz0zfC
6	username4	test4@test.ru	$2a$10$uhIHW319vieOPKut7u0xseP7kxFweHcuE2sSP1DtRyZY1hzLMTHX.
7	user22	user22@test.ru	$2a$10$iqcRHcyh/y4JGqY/tbLIT.p2/2uhQGQxjW3CPIcJ1RkSDvhQRds9m
8	user33	user33@test.ru	$2a$10$jLlWRKg11spJNtdN38Ej9ORPOos79m4Mmqw99qJsbHc2vtoNFqys6
9	user333	user333@test.ru	$2a$10$IWx8A.7QaW8ROsFCPuw5H..hnGhBrDHwmY9sMyvbWRKyDN4yKvXsO
\.


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 225
-- Name: car_body_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_body_type_id_seq', 10, true);


--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 223
-- Name: car_brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_brand_id_seq', 26, true);


--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 219
-- Name: car_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_type_id_seq', 10, true);


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 227
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cars_id_seq', 15, true);


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 221
-- Name: fuel_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fuel_type_id_seq', 4, true);


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 214
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 28, true);


--
-- TOC entry 3243 (class 2606 OID 25841)
-- Name: car_body_type car_body_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_body_type
    ADD CONSTRAINT car_body_type_name_key UNIQUE (name);


--
-- TOC entry 3245 (class 2606 OID 25839)
-- Name: car_body_type car_body_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_body_type
    ADD CONSTRAINT car_body_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 25830)
-- Name: car_brand car_brand_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_brand
    ADD CONSTRAINT car_brand_name_key UNIQUE (name);


--
-- TOC entry 3241 (class 2606 OID 25828)
-- Name: car_brand car_brand_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_brand
    ADD CONSTRAINT car_brand_pkey PRIMARY KEY (id);


--
-- TOC entry 3231 (class 2606 OID 25808)
-- Name: car_type car_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_type
    ADD CONSTRAINT car_type_name_key UNIQUE (name);


--
-- TOC entry 3233 (class 2606 OID 25806)
-- Name: car_type car_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_type
    ADD CONSTRAINT car_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3247 (class 2606 OID 26004)
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 25819)
-- Name: fuel_type fuel_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuel_type
    ADD CONSTRAINT fuel_type_name_key UNIQUE (name);


--
-- TOC entry 3237 (class 2606 OID 25817)
-- Name: fuel_type fuel_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuel_type
    ADD CONSTRAINT fuel_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3221 (class 2606 OID 25760)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3249 (class 2606 OID 26048)
-- Name: user_profile user_profile_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_id_key UNIQUE (id);


--
-- TOC entry 3223 (class 2606 OID 25765)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 3225 (class 2606 OID 25776)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3227 (class 2606 OID 25772)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 25774)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3252 (class 2606 OID 26020)
-- Name: cars cars_body_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_body_type_id_fkey FOREIGN KEY (body_type_id) REFERENCES public.car_body_type(id) ON DELETE CASCADE;


--
-- TOC entry 3253 (class 2606 OID 26010)
-- Name: cars cars_car_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_car_brand_id_fkey FOREIGN KEY (car_brand_id) REFERENCES public.car_brand(id) ON DELETE CASCADE;


--
-- TOC entry 3254 (class 2606 OID 26005)
-- Name: cars cars_car_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_car_type_id_fkey FOREIGN KEY (car_type_id) REFERENCES public.car_type(id) ON DELETE CASCADE;


--
-- TOC entry 3255 (class 2606 OID 26015)
-- Name: cars cars_fuel_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_fuel_type_id_fkey FOREIGN KEY (fuel_type_id) REFERENCES public.fuel_type(id) ON DELETE CASCADE;


--
-- TOC entry 3256 (class 2606 OID 26049)
-- Name: user_profile user_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_id_fkey FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3250 (class 2606 OID 25777)
-- Name: user_roles user_roles_roles_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_roles_constraint FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 3251 (class 2606 OID 26025)
-- Name: user_roles user_roles_users_constraint_delete; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_users_constraint_delete FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2022-12-08 01:44:05

--
-- PostgreSQL database dump complete
--

