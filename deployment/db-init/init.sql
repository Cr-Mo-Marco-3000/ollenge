create database IF NOT EXISTS `ollenge` collate utf8mb4_general_ci;
create user 'ollenge'@'%' identified by 'ollenge1010';
grant all privileges on *.* to ollenge@'%';
flush privileges;
