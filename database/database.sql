

create table users
(
    id              varchar(255)                         not null
        primary key,
    firstName       varchar(255)                         null,
    lastName        varchar(255)                         null,
    phone           varchar(255)                         null,
    adresse         varchar(255)                         null,
    avatar          varchar(255)                         null,
    sexe            varchar(255)                          null,
    login           varchar(255)                         not null,
    password        varchar(255)                         not null,
    email           varchar(255)                         null,
    created_at      timestamp  default CURRENT_TIMESTAMP not null,
    constraint users_login_uindex
        unique (login)
)
    charset = utf8;

create table publications
(
    id               varchar(255)                         not null
        primary key,
    libelle          varchar(255)                         null,
    description      text                                 null,
    created_at       timestamp  default CURRENT_TIMESTAMP not null,
    published_by     varchar(255)                         not null,
    image            varchar(255)                         null,
    constraint annonces_ibfk_3
        foreign key (published_by) references users (id)
)
    charset = utf8;
create index published_by
    on annonces (published_by);

