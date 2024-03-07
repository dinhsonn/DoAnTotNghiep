PGDMP  (    #                |            doan_tn    16.0    16.0 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17257    doan_tn    DATABASE        CREATE DATABASE doan_tn WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Vietnamese_Vietnam.1258';
    DROP DATABASE doan_tn;
                postgres    false            �            1259    17258    about    TABLE       CREATE TABLE public.about (
    id bigint NOT NULL,
    content character varying(255) NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    status integer NOT NULL,
    title character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone
);
    DROP TABLE public.about;
       public         heap    postgres    false            �            1259    17263    about_id_seq    SEQUENCE     u   CREATE SEQUENCE public.about_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.about_id_seq;
       public          postgres    false    215            �           0    0    about_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.about_id_seq OWNED BY public.about.id;
          public          postgres    false    216            �            1259    17264    admin    TABLE     $  CREATE TABLE public.admin (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    password character varying(255) NOT NULL,
    roles character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone,
    username character varying(255) NOT NULL
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    17269    admin_id_seq    SEQUENCE     u   CREATE SEQUENCE public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public          postgres    false    217            �           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public          postgres    false    218            �            1259    17270    banners    TABLE     �  CREATE TABLE public.banners (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    image character varying(255) NOT NULL,
    link character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    sort integer NOT NULL,
    status integer NOT NULL,
    type character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone
);
    DROP TABLE public.banners;
       public         heap    postgres    false            �            1259    17275    banners_id_seq    SEQUENCE     w   CREATE SEQUENCE public.banners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.banners_id_seq;
       public          postgres    false    219            �           0    0    banners_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;
          public          postgres    false    220            �            1259    17276    brands    TABLE     1  CREATE TABLE public.brands (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    image character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    sort_order integer NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone
);
    DROP TABLE public.brands;
       public         heap    postgres    false            �            1259    17281    brands_id_seq    SEQUENCE     v   CREATE SEQUENCE public.brands_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.brands_id_seq;
       public          postgres    false    221            �           0    0    brands_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;
          public          postgres    false    222            �            1259    17282    carts    TABLE     6  CREATE TABLE public.carts (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    price double precision NOT NULL,
    qty integer NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone,
    product_id bigint NOT NULL,
    user_id bigint NOT NULL
);
    DROP TABLE public.carts;
       public         heap    postgres    false            �            1259    17285    carts_id_seq    SEQUENCE     u   CREATE SEQUENCE public.carts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.carts_id_seq;
       public          postgres    false    223            �           0    0    carts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;
          public          postgres    false    224            �            1259    17286 	   checkouts    TABLE     X  CREATE TABLE public.checkouts (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    payment_method character varying(255) NOT NULL,
    status integer NOT NULL,
    total_amount double precision NOT NULL,
    updated_at timestamp(6) without time zone,
    cart_id bigint NOT NULL,
    user_id bigint NOT NULL
);
    DROP TABLE public.checkouts;
       public         heap    postgres    false            �            1259    17289    checkouts_id_seq    SEQUENCE     y   CREATE SEQUENCE public.checkouts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.checkouts_id_seq;
       public          postgres    false    225            �           0    0    checkouts_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.checkouts_id_seq OWNED BY public.checkouts.id;
          public          postgres    false    226            �            1259    17290    contacts    TABLE     )  CREATE TABLE public.contacts (
    id bigint NOT NULL,
    content character varying(255) NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    status integer NOT NULL,
    title character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone,
    user_id bigint
);
    DROP TABLE public.contacts;
       public         heap    postgres    false            �            1259    17295    contacts_id_seq    SEQUENCE     x   CREATE SEQUENCE public.contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.contacts_id_seq;
       public          postgres    false    227            �           0    0    contacts_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;
          public          postgres    false    228            �            1259    17296    posts    TABLE     �  CREATE TABLE public.posts (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    detail character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    status integer NOT NULL,
    title character varying(255) NOT NULL,
    topic_id bigint NOT NULL,
    type character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    17301    posts_id_seq    SEQUENCE     u   CREATE SEQUENCE public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          postgres    false    229            �           0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          postgres    false    230            �            1259    17302    product_categories    TABLE     (  CREATE TABLE public.product_categories (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    name character varying(255) NOT NULL,
    parent_id bigint,
    sort_order integer NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone
);
 &   DROP TABLE public.product_categories;
       public         heap    postgres    false            �            1259    17305    product_categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.product_categories_id_seq;
       public          postgres    false    231            �           0    0    product_categories_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.product_categories_id_seq OWNED BY public.product_categories.id;
          public          postgres    false    232            �            1259    17306    product_images    TABLE     �  CREATE TABLE public.product_images (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    image character varying(255) NOT NULL,
    link character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    sort_order integer NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone,
    product_id bigint NOT NULL
);
 "   DROP TABLE public.product_images;
       public         heap    postgres    false            �            1259    17311    product_images_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.product_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.product_images_id_seq;
       public          postgres    false    233            �           0    0    product_images_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images.id;
          public          postgres    false    234            �            1259    17312    product_option_value    TABLE       CREATE TABLE public.product_option_value (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone,
    value character varying(255) NOT NULL,
    product_option_id bigint NOT NULL,
    product_id bigint NOT NULL
);
 (   DROP TABLE public.product_option_value;
       public         heap    postgres    false            �            1259    17315    product_option_value_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_option_value_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.product_option_value_id_seq;
       public          postgres    false    235            �           0    0    product_option_value_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.product_option_value_id_seq OWNED BY public.product_option_value.id;
          public          postgres    false    236            �            1259    17316    product_options    TABLE       CREATE TABLE public.product_options (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    name character varying(255) NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone,
    product_id bigint NOT NULL
);
 #   DROP TABLE public.product_options;
       public         heap    postgres    false            �            1259    17319    product_options_id_seq    SEQUENCE        CREATE SEQUENCE public.product_options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.product_options_id_seq;
       public          postgres    false    237            �           0    0    product_options_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.product_options_id_seq OWNED BY public.product_options.id;
          public          postgres    false    238            �            1259    17320    product_sale    TABLE     �  CREATE TABLE public.product_sale (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    created_by bigint,
    date_end timestamp(6) without time zone NOT NULL,
    date_start timestamp(6) without time zone NOT NULL,
    quantity_sold integer NOT NULL,
    sale_price double precision NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone,
    updated_by integer,
    product_id bigint NOT NULL
);
     DROP TABLE public.product_sale;
       public         heap    postgres    false            �            1259    17323    product_sale_id_seq    SEQUENCE     |   CREATE SEQUENCE public.product_sale_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.product_sale_id_seq;
       public          postgres    false    239            �           0    0    product_sale_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.product_sale_id_seq OWNED BY public.product_sale.id;
          public          postgres    false    240            �            1259    17324    products    TABLE       CREATE TABLE public.products (
    id bigint NOT NULL,
    brand_id bigint NOT NULL,
    category_id bigint NOT NULL,
    content character varying(255) NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    description character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    price double precision NOT NULL,
    specifications character varying(255) NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone,
    warranty character varying(255) NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    17329    products_id_seq    SEQUENCE     x   CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    241            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    242            �            1259    17330 	   shippings    TABLE     k  CREATE TABLE public.shippings (
    id bigint NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    shipping_method character varying(255) NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone,
    checkout_id bigint NOT NULL
);
    DROP TABLE public.shippings;
       public         heap    postgres    false            �            1259    17335    shippings_id_seq    SEQUENCE     y   CREATE SEQUENCE public.shippings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.shippings_id_seq;
       public          postgres    false    243            �           0    0    shippings_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.shippings_id_seq OWNED BY public.shippings.id;
          public          postgres    false    244            �            1259    17336    sliders    TABLE     �  CREATE TABLE public.sliders (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    created_by integer,
    image character varying(255) NOT NULL,
    link character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "position" integer NOT NULL,
    sort_order integer NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone,
    updated_by integer
);
    DROP TABLE public.sliders;
       public         heap    postgres    false            �            1259    17341    sliders_id_seq    SEQUENCE     w   CREATE SEQUENCE public.sliders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.sliders_id_seq;
       public          postgres    false    245            �           0    0    sliders_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.sliders_id_seq OWNED BY public.sliders.id;
          public          postgres    false    246            �            1259    17342    topics    TABLE     F  CREATE TABLE public.topics (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    name character varying(255) NOT NULL,
    parent_id bigint,
    slug character varying(255) NOT NULL,
    sort_order integer NOT NULL,
    status integer NOT NULL,
    updated_at timestamp(6) without time zone
);
    DROP TABLE public.topics;
       public         heap    postgres    false            �            1259    17347    topics_id_seq    SEQUENCE     v   CREATE SEQUENCE public.topics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.topics_id_seq;
       public          postgres    false    247            �           0    0    topics_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;
          public          postgres    false    248            �            1259    17477    users    TABLE     0  CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    sex character varying(255) NOT NULL,
    birthday character varying(255) NOT NULL,
    roles integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone,
    status integer NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    17476    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    250            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    249            �           2604    17348    about id    DEFAULT     d   ALTER TABLE ONLY public.about ALTER COLUMN id SET DEFAULT nextval('public.about_id_seq'::regclass);
 7   ALTER TABLE public.about ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    17349    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    17350 
   banners id    DEFAULT     h   ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);
 9   ALTER TABLE public.banners ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    17351 	   brands id    DEFAULT     f   ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);
 8   ALTER TABLE public.brands ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            �           2604    17352    carts id    DEFAULT     d   ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);
 7   ALTER TABLE public.carts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            �           2604    17353    checkouts id    DEFAULT     l   ALTER TABLE ONLY public.checkouts ALTER COLUMN id SET DEFAULT nextval('public.checkouts_id_seq'::regclass);
 ;   ALTER TABLE public.checkouts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225            �           2604    17354    contacts id    DEFAULT     j   ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);
 :   ALTER TABLE public.contacts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    17355    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    17356    product_categories id    DEFAULT     ~   ALTER TABLE ONLY public.product_categories ALTER COLUMN id SET DEFAULT nextval('public.product_categories_id_seq'::regclass);
 D   ALTER TABLE public.product_categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    17357    product_images id    DEFAULT     v   ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);
 @   ALTER TABLE public.product_images ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            �           2604    17358    product_option_value id    DEFAULT     �   ALTER TABLE ONLY public.product_option_value ALTER COLUMN id SET DEFAULT nextval('public.product_option_value_id_seq'::regclass);
 F   ALTER TABLE public.product_option_value ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235            �           2604    17359    product_options id    DEFAULT     x   ALTER TABLE ONLY public.product_options ALTER COLUMN id SET DEFAULT nextval('public.product_options_id_seq'::regclass);
 A   ALTER TABLE public.product_options ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237            �           2604    17360    product_sale id    DEFAULT     r   ALTER TABLE ONLY public.product_sale ALTER COLUMN id SET DEFAULT nextval('public.product_sale_id_seq'::regclass);
 >   ALTER TABLE public.product_sale ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239            �           2604    17361    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241            �           2604    17362    shippings id    DEFAULT     l   ALTER TABLE ONLY public.shippings ALTER COLUMN id SET DEFAULT nextval('public.shippings_id_seq'::regclass);
 ;   ALTER TABLE public.shippings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243            �           2604    17363 
   sliders id    DEFAULT     h   ALTER TABLE ONLY public.sliders ALTER COLUMN id SET DEFAULT nextval('public.sliders_id_seq'::regclass);
 9   ALTER TABLE public.sliders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245            �           2604    17364 	   topics id    DEFAULT     f   ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);
 8   ALTER TABLE public.topics ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247            �           2604    17485    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    249    250            u          0    17258    about 
   TABLE DATA           S   COPY public.about (id, content, created_at, status, title, updated_at) FROM stdin;
    public          postgres    false    215   ��       w          0    17264    admin 
   TABLE DATA           V   COPY public.admin (id, created_at, password, roles, updated_at, username) FROM stdin;
    public          postgres    false    217   ��       y          0    17270    banners 
   TABLE DATA           d   COPY public.banners (id, created_at, image, link, name, sort, status, type, updated_at) FROM stdin;
    public          postgres    false    219   լ       {          0    17276    brands 
   TABLE DATA           ]   COPY public.brands (id, created_at, image, name, sort_order, status, updated_at) FROM stdin;
    public          postgres    false    221   �       }          0    17282    carts 
   TABLE DATA           d   COPY public.carts (id, created_at, price, qty, status, updated_at, product_id, user_id) FROM stdin;
    public          postgres    false    223   �                 0    17286 	   checkouts 
   TABLE DATA           w   COPY public.checkouts (id, created_at, payment_method, status, total_amount, updated_at, cart_id, user_id) FROM stdin;
    public          postgres    false    225   ,�       �          0    17290    contacts 
   TABLE DATA           _   COPY public.contacts (id, content, created_at, status, title, updated_at, user_id) FROM stdin;
    public          postgres    false    227   I�       �          0    17296    posts 
   TABLE DATA           u   COPY public.posts (id, created_at, detail, image, name, slug, status, title, topic_id, type, updated_at) FROM stdin;
    public          postgres    false    229   f�       �          0    17302    product_categories 
   TABLE DATA           m   COPY public.product_categories (id, created_at, name, parent_id, sort_order, status, updated_at) FROM stdin;
    public          postgres    false    231   ��       �          0    17306    product_images 
   TABLE DATA           w   COPY public.product_images (id, created_at, image, link, name, sort_order, status, updated_at, product_id) FROM stdin;
    public          postgres    false    233   ��       �          0    17312    product_option_value 
   TABLE DATA           p   COPY public.product_option_value (id, created_at, updated_at, value, product_option_id, product_id) FROM stdin;
    public          postgres    false    235   ��       �          0    17316    product_options 
   TABLE DATA           _   COPY public.product_options (id, created_at, name, status, updated_at, product_id) FROM stdin;
    public          postgres    false    237   ڭ       �          0    17320    product_sale 
   TABLE DATA           �   COPY public.product_sale (id, created_at, created_by, date_end, date_start, quantity_sold, sale_price, status, updated_at, updated_by, product_id) FROM stdin;
    public          postgres    false    239   ��       �          0    17324    products 
   TABLE DATA           �   COPY public.products (id, brand_id, category_id, content, created_at, description, name, price, specifications, status, updated_at, warranty) FROM stdin;
    public          postgres    false    241   �       �          0    17330 	   shippings 
   TABLE DATA           t   COPY public.shippings (id, address, city, created_at, shipping_method, status, updated_at, checkout_id) FROM stdin;
    public          postgres    false    243   e�       �          0    17336    sliders 
   TABLE DATA           �   COPY public.sliders (id, created_at, created_by, image, link, name, "position", sort_order, status, updated_at, updated_by) FROM stdin;
    public          postgres    false    245   ��       �          0    17342    topics 
   TABLE DATA           g   COPY public.topics (id, created_at, name, parent_id, slug, sort_order, status, updated_at) FROM stdin;
    public          postgres    false    247   ��       �          0    17477    users 
   TABLE DATA           �   COPY public.users (id, name, email, phone, username, password, address, sex, birthday, roles, created_at, updated_at, status) FROM stdin;
    public          postgres    false    250   ��       �           0    0    about_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.about_id_seq', 1, false);
          public          postgres    false    216            �           0    0    admin_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.admin_id_seq', 1, false);
          public          postgres    false    218            �           0    0    banners_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.banners_id_seq', 1, true);
          public          postgres    false    220            �           0    0    brands_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.brands_id_seq', 1, false);
          public          postgres    false    222            �           0    0    carts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.carts_id_seq', 1, false);
          public          postgres    false    224            �           0    0    checkouts_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.checkouts_id_seq', 1, false);
          public          postgres    false    226            �           0    0    contacts_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.contacts_id_seq', 1, false);
          public          postgres    false    228            �           0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 1, false);
          public          postgres    false    230            �           0    0    product_categories_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.product_categories_id_seq', 1, false);
          public          postgres    false    232            �           0    0    product_images_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.product_images_id_seq', 1, false);
          public          postgres    false    234            �           0    0    product_option_value_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.product_option_value_id_seq', 1, false);
          public          postgres    false    236            �           0    0    product_options_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.product_options_id_seq', 1, false);
          public          postgres    false    238            �           0    0    product_sale_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.product_sale_id_seq', 1, false);
          public          postgres    false    240            �           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 1, false);
          public          postgres    false    242            �           0    0    shippings_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.shippings_id_seq', 1, false);
          public          postgres    false    244            �           0    0    sliders_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.sliders_id_seq', 1, false);
          public          postgres    false    246            �           0    0    topics_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.topics_id_seq', 1, false);
          public          postgres    false    248            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 17, true);
          public          postgres    false    249            �           2606    17366    about about_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.about
    ADD CONSTRAINT about_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.about DROP CONSTRAINT about_pkey;
       public            postgres    false    215            �           2606    17368    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    217            �           2606    17370    banners banners_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.banners DROP CONSTRAINT banners_pkey;
       public            postgres    false    219            �           2606    17372    brands brands_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.brands DROP CONSTRAINT brands_pkey;
       public            postgres    false    221            �           2606    17374    carts carts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            postgres    false    223            �           2606    17376    checkouts checkouts_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.checkouts
    ADD CONSTRAINT checkouts_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.checkouts DROP CONSTRAINT checkouts_pkey;
       public            postgres    false    225            �           2606    17378    contacts contacts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.contacts DROP CONSTRAINT contacts_pkey;
       public            postgres    false    227            �           2606    17380    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    229            �           2606    17382 *   product_categories product_categories_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.product_categories DROP CONSTRAINT product_categories_pkey;
       public            postgres    false    231            �           2606    17384 "   product_images product_images_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.product_images DROP CONSTRAINT product_images_pkey;
       public            postgres    false    233            �           2606    17386 .   product_option_value product_option_value_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.product_option_value
    ADD CONSTRAINT product_option_value_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.product_option_value DROP CONSTRAINT product_option_value_pkey;
       public            postgres    false    235            �           2606    17388 $   product_options product_options_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.product_options
    ADD CONSTRAINT product_options_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.product_options DROP CONSTRAINT product_options_pkey;
       public            postgres    false    237            �           2606    17390    product_sale product_sale_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.product_sale
    ADD CONSTRAINT product_sale_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.product_sale DROP CONSTRAINT product_sale_pkey;
       public            postgres    false    239            �           2606    17392    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    241            �           2606    17394    shippings shippings_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.shippings
    ADD CONSTRAINT shippings_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.shippings DROP CONSTRAINT shippings_pkey;
       public            postgres    false    243            �           2606    17396    sliders sliders_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.sliders
    ADD CONSTRAINT sliders_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.sliders DROP CONSTRAINT sliders_pkey;
       public            postgres    false    245            �           2606    17398    topics topics_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.topics DROP CONSTRAINT topics_pkey;
       public            postgres    false    247            �           2606    17487    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    250            �           2606    17399 (   product_sale fk1ky19xldgu9kigmtj9mtercn5    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_sale
    ADD CONSTRAINT fk1ky19xldgu9kigmtj9mtercn5 FOREIGN KEY (product_id) REFERENCES public.products(id);
 R   ALTER TABLE ONLY public.product_sale DROP CONSTRAINT fk1ky19xldgu9kigmtj9mtercn5;
       public          postgres    false    239    4818    241            �           2606    17499 %   checkouts fk4cffsff8atevplv45x3yagq34    FK CONSTRAINT     �   ALTER TABLE ONLY public.checkouts
    ADD CONSTRAINT fk4cffsff8atevplv45x3yagq34 FOREIGN KEY (user_id) REFERENCES public.users(id);
 O   ALTER TABLE ONLY public.checkouts DROP CONSTRAINT fk4cffsff8atevplv45x3yagq34;
       public          postgres    false    225    250    4826            �           2606    17404 %   checkouts fk86fuskbtwaroxm1cvjosp38rd    FK CONSTRAINT     �   ALTER TABLE ONLY public.checkouts
    ADD CONSTRAINT fk86fuskbtwaroxm1cvjosp38rd FOREIGN KEY (cart_id) REFERENCES public.carts(id);
 O   ALTER TABLE ONLY public.checkouts DROP CONSTRAINT fk86fuskbtwaroxm1cvjosp38rd;
       public          postgres    false    4800    225    223            �           2606    17409 0   product_option_value fk875bweyy5vpy61ul8b5hcmexx    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_option_value
    ADD CONSTRAINT fk875bweyy5vpy61ul8b5hcmexx FOREIGN KEY (product_id) REFERENCES public.products(id);
 Z   ALTER TABLE ONLY public.product_option_value DROP CONSTRAINT fk875bweyy5vpy61ul8b5hcmexx;
       public          postgres    false    235    4818    241            �           2606    17414 +   product_options fk8vv4f8fru80wxocwgxwsrow61    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_options
    ADD CONSTRAINT fk8vv4f8fru80wxocwgxwsrow61 FOREIGN KEY (product_id) REFERENCES public.products(id);
 U   ALTER TABLE ONLY public.product_options DROP CONSTRAINT fk8vv4f8fru80wxocwgxwsrow61;
       public          postgres    false    237    241    4818            �           2606    17494 !   carts fkb5o626f86h46m4s7ms6ginnop    FK CONSTRAINT     �   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fkb5o626f86h46m4s7ms6ginnop FOREIGN KEY (user_id) REFERENCES public.users(id);
 K   ALTER TABLE ONLY public.carts DROP CONSTRAINT fkb5o626f86h46m4s7ms6ginnop;
       public          postgres    false    223    4826    250            �           2606    17419 0   product_option_value fkcrdjs0y3f85e7wy07v8ae5yl4    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_option_value
    ADD CONSTRAINT fkcrdjs0y3f85e7wy07v8ae5yl4 FOREIGN KEY (product_option_id) REFERENCES public.product_options(id);
 Z   ALTER TABLE ONLY public.product_option_value DROP CONSTRAINT fkcrdjs0y3f85e7wy07v8ae5yl4;
       public          postgres    false    237    235    4814            �           2606    17424 %   shippings fkdy6f8owj1oqlpsg53ywuhno89    FK CONSTRAINT     �   ALTER TABLE ONLY public.shippings
    ADD CONSTRAINT fkdy6f8owj1oqlpsg53ywuhno89 FOREIGN KEY (checkout_id) REFERENCES public.checkouts(id);
 O   ALTER TABLE ONLY public.shippings DROP CONSTRAINT fkdy6f8owj1oqlpsg53ywuhno89;
       public          postgres    false    4802    225    243            �           2606    17429 !   carts fkmd2ap4oxo3wvgkf4fnaye532i    FK CONSTRAINT     �   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fkmd2ap4oxo3wvgkf4fnaye532i FOREIGN KEY (product_id) REFERENCES public.products(id);
 K   ALTER TABLE ONLY public.carts DROP CONSTRAINT fkmd2ap4oxo3wvgkf4fnaye532i;
       public          postgres    false    223    241    4818            �           2606    17504 $   contacts fkna8bddygr3l3kq1imghgcskt8    FK CONSTRAINT     �   ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT fkna8bddygr3l3kq1imghgcskt8 FOREIGN KEY (user_id) REFERENCES public.users(id);
 N   ALTER TABLE ONLY public.contacts DROP CONSTRAINT fkna8bddygr3l3kq1imghgcskt8;
       public          postgres    false    227    4826    250            �           2606    17434 )   product_images fkqnq71xsohugpqwf3c9gxmsuy    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT fkqnq71xsohugpqwf3c9gxmsuy FOREIGN KEY (product_id) REFERENCES public.products(id);
 S   ALTER TABLE ONLY public.product_images DROP CONSTRAINT fkqnq71xsohugpqwf3c9gxmsuy;
       public          postgres    false    233    4818    241            u      x������ � �      w      x������ � �      y      x������ � �      {      x������ � �      }      x������ � �            x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   A   x�3�4²�2N##]c]3C#+ �4L).�,K)K�442�,N)�Ŧ�,��+F��� �?�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     