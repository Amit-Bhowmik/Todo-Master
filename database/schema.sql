-- schema.sql - MySQL Database Schema for Todo Application
CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

-- User table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,          
  firebase_uid VARCHAR(255) NOT NULL UNIQUE,  
  email VARCHAR(255) NOT NULL,                
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,          
  user_id INT NOT NULL,                       
  task TEXT NOT NULL,                         
  due_date DATE,                              
  status ENUM('completed', 'uncompleted') DEFAULT 'uncompleted', 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE    
);
