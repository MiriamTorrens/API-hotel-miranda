# MySQL tables:

## 🛏 Rooms:

room_id INT AUTO_INCREMENT PRIMARY KEY,

room_number SMALLINT NOT NULL,

bed_type ENUM('single_bed', 'double_bed', 'double_superior', 'suite') NOT NULL,

description VARCHAR(255),

offer BOOLEAN,

price SMALLINT NOT NULL,

discount SMALLINT,

cancellation VARCHAR(255),

amenities VARCHAR(255) NOT NULL

## 👯 Contact:

contact_id: INT AUTO_INCREMENT PRIMARY KEY,contact_name: VARCHAR(255),

contact_name VARCHAR(255) NOT NULL

contact_email VARCHAR(255) NOT NULL,

contact_phone VARCHAR(255) NOT NULL,

contact_date DATE NOT NULL,

subject VARCHAR(255) NOT NULL,

comment TEXT NOT NULL,

viewed BOOLEAN NOT NULL DEFAULT FALSE,

archived BOOLEAN NOT NULL DEFAULT FALSE,

## ✍️ Bookings:

booking_id INT AUTO_INCREMENT PRIMARY KEY,

guest_name VARCHAR(255) NOT NULL,

order_date DATE NOT NULL,

checkin DATE NOT NULL,

checkout DATE NOT NULL,

special_request VARCHAR(255),

room_id INT,

status ENUM('checkin', 'checkout', 'in_progress'),

FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE SET NULL

## 🖼 Rooms images:

room_id INT NOT NULL,

FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE,

url_image VARCHAR(255) NOT NULL

## 🏨 Users:

user_id INT AUTO_INCREMENT PRIMARY KEY,

user_name VARCHAR(255) NOT NULL,

user_email VARCHAR(255) NOT NULL,

user_phone VARCHAR(255) NOT NULL,

start_date DATE NOT NULL,

occupation ENUM('manager', 'reception', 'room_service'),

status BOOLEAN NOT NULL DEFAULT TRUE,

photo VARCHAR(255),

password VARCHAR(255) NOT NULL
