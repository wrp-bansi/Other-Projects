/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: activity_logs
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `activity_logs` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `activity_type` enum(
  'login',
  'logout',
  'create_order',
  'update_order_status',
  'update_password'
  ) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `details` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`log_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 920 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: admins
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(80) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `role` varchar(56) NOT NULL,
  `is_super_admin` enum('yes', 'no') NOT NULL DEFAULT 'no',
  `x_api_key` varchar(50) DEFAULT NULL,
  `token` varchar(500) DEFAULT NULL,
  `token_expire_at` datetime DEFAULT NULL,
  `token_generated_at` datetime DEFAULT NULL,
  `account_status` enum('Active', 'Banned') NOT NULL DEFAULT 'Active' COMMENT '1: Active, 2: Banned',
  `email_updated_at` datetime DEFAULT NULL,
  `password_updated_at` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `banned_reason` text DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email_id` (`email`),
  KEY `role` (`role`, `token_expire_at`),
  KEY `mobile` (`mobile`)
) ENGINE = InnoDB AUTO_INCREMENT = 41 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: brands
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `brands` (
  `brand_id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `logo_url` text DEFAULT NULL,
  `status` enum('Active', 'InActive') NOT NULL DEFAULT 'Active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`brand_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categories
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `parent_category_id` int(11) DEFAULT NULL,
  `category_image` varchar(255) DEFAULT NULL,
  `category_status` enum('Active', 'InActive') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`category_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 86 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: contacts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `contacts` (
  `contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`contact_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: coupons
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `coupons` (
  `coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_code` varchar(50) NOT NULL,
  `discount_type` enum('Percentage', 'Fixed') NOT NULL DEFAULT 'Percentage',
  `discount_amount` float NOT NULL,
  `expiry_date` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'default value = true(1),false(0\r\n)',
  `usage_count` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`coupon_id`),
  UNIQUE KEY `coupon_code` (`coupon_code`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: currencies
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `currencies` (
  `currency_id` int(11) NOT NULL AUTO_INCREMENT,
  `currency_code` varchar(255) NOT NULL,
  `currency_name` varchar(255) NOT NULL,
  `symbol` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `exchangeRate` float NOT NULL,
  `decimalPlaces` int(11) NOT NULL DEFAULT 2,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`currency_id`),
  UNIQUE KEY `currency_code` (`currency_code`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: dashboard
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `dashboard` (
  `dashboard_id` int(11) NOT NULL AUTO_INCREMENT,
  `today_register` int(11) DEFAULT 0,
  `total_register` int(11) DEFAULT 0,
  `today_active_users` int(11) DEFAULT 0,
  `last_week_active_users` int(11) DEFAULT 0,
  `last_month_active_users` int(11) DEFAULT 0,
  `total_products` int(11) DEFAULT 0,
  `total_categories` int(11) DEFAULT 0,
  `total_sub_categories` int(11) DEFAULT 0,
  `today_order` int(11) DEFAULT 0,
  `total_order` int(11) DEFAULT 0,
  `this_week_order` int(11) DEFAULT 0,
  `total_wishlist` int(11) DEFAULT 0,
  `total_vendors` int(11) DEFAULT 0,
  `pending_vendor_approvals` int(11) DEFAULT 0,
  `total_revenue` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`dashboard_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: email_templates
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `email_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `type` enum(
  'contact',
  'enquiry',
  'forgotpassword',
  'registration',
  'order'
  ) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `body_html` text NOT NULL,
  `body_text` text DEFAULT NULL,
  `status` enum('Active', 'inActive') NOT NULL DEFAULT 'Active',
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `slug_2` (`slug`)
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: enquiries
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `enquiries` (
  `enquiry_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `enquirer_name` varchar(255) NOT NULL,
  `enquirer_email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('Pending', 'Resolved', 'Closed') NOT NULL DEFAULT 'Pending',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`enquiry_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `enquiries_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: hero_slider
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `hero_slider` (
  `hero_slider_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `banner_title` varchar(255) NOT NULL,
  `banner_description` varchar(255) DEFAULT NULL,
  `banner_button_text` varchar(255) DEFAULT NULL,
  `banner_button_link` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`hero_slider_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: notifications
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `notifications` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: order_items
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` float NOT NULL,
  `subtotal` float NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`order_item_id`),
  KEY `orderId` (`order_id`),
  KEY `fk_order_item_product` (`product_id`),
  CONSTRAINT `fk_order_item_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 368 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: orders
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `order_amount` float NOT NULL,
  `order_status` enum(
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled'
  ) NOT NULL DEFAULT 'Pending',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `billing_name` varchar(256) DEFAULT NULL,
  `billing_address` text NOT NULL,
  `billing_email` varchar(255) NOT NULL,
  `billing_mobile_number` varchar(20) NOT NULL,
  `shipping_name` varchar(256) DEFAULT NULL,
  `shipping_address` text NOT NULL,
  `shipping_email` varchar(255) NOT NULL,
  `shipping_mobile_number` varchar(20) NOT NULL,
  `coupon_code` varchar(50) DEFAULT NULL,
  `delivery_date` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_customerId` (`customer_id`),
  CONSTRAINT `fk_orders_customerId` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 158 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: otps
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `otps` (
  `otp_id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` varchar(100) NOT NULL,
  `mobile` varchar(10) DEFAULT NULL COMMENT 'Null if user register',
  `otp` int(6) NOT NULL,
  `generated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `expired_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`otp_id`),
  KEY `user_id` (`device_id`),
  KEY `mobile` (`mobile`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: payment_gateways
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `payment_gateways` (
  `payment_gateway_id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_gateway_name` varchar(255) NOT NULL,
  `payment_gateway_url` varchar(255) NOT NULL,
  `payment_gateway_image` varchar(255) DEFAULT NULL,
  `payment_gateway_mode` varchar(255) NOT NULL,
  `key_id` varchar(255) NOT NULL,
  `key_secret` varchar(255) NOT NULL,
  `merchant_id` varchar(255) NOT NULL,
  `merchant_key` varchar(255) NOT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `other` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `status` enum('Active', 'InActive') NOT NULL DEFAULT 'Active',
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`payment_gateway_id`),
  UNIQUE KEY `payment_gateway_name` (`payment_gateway_name`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: permission
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `permission` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `parent` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`permission_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 137 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: post_category
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `post_category` (
  `post_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `parent_id` int(11) DEFAULT 0,
  `category_image` varchar(255) DEFAULT NULL,
  `category_status` enum('Active', 'InActive') NOT NULL DEFAULT 'Active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `meta_title` varchar(255) NOT NULL,
  `meta_description` text NOT NULL,
  `meta_keywords` text NOT NULL,
  PRIMARY KEY (`post_category_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 52 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: post_types
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `post_types` (
  `post_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`post_type_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: posts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `post_category_id` int(11) NOT NULL,
  `post_type_id` int(11) NOT NULL,
  `post_image` varchar(255) DEFAULT NULL,
  `post_status` enum('draft', 'published', 'archived') DEFAULT 'draft',
  `publication_date` datetime NOT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_keywords` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_post_category` (`post_category_id`),
  KEY `fk_post_type` (`post_type_id`),
  CONSTRAINT `fk_post_type` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`post_type_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: products
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `regular_price` float DEFAULT NULL,
  `sale_price` float DEFAULT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `SKU` varchar(255) DEFAULT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `product_image` text DEFAULT NULL,
  `product_status` enum('Active', 'InActive') DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `optional_notes` text DEFAULT NULL,
  `owner_id` int(11) NOT NULL,
  `type` enum('admin', 'vendor') NOT NULL DEFAULT 'vendor',
  `average_rating` float DEFAULT NULL,
  `is_enquiry` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `total_quantity_sold` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `fk_brandId` (`brand_id`),
  CONSTRAINT `fk_brandId` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 253 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: request_payments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `request_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `status` enum('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
  `message` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_vendor_id` (`vendor_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: reviews
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` float NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`review_id`),
  KEY `fk_product_id_new` (`product_id`),
  KEY `fk_reviews_user_id_new` (`user_id`),
  CONSTRAINT `fk_product_id_new` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `fk_reviews_user_id_new` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 25 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: role
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `permission` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`role_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 52 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: settings
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `settings` (
  `setting_id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_editable` tinyint(1) NOT NULL DEFAULT 1,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `field_type` enum('input', 'select') NOT NULL DEFAULT 'input',
  `field_options` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`setting_id`),
  UNIQUE KEY `key` (`key`)
) ENGINE = InnoDB AUTO_INCREMENT = 42 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ticket_chats
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ticket_chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'read',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 62 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tickets
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `requested_by` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'open',
  `attachment` varchar(255) DEFAULT NULL,
  `priority` enum('low', 'medium', 'high') NOT NULL DEFAULT 'low',
  `comments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: transactions
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `payment_gateway_id` int(11) NOT NULL,
  `transaction_amount` float NOT NULL,
  `transaction_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`transaction_details`)),
  `transaction_status` enum('Pending', 'Success', 'Failed', 'Cancelled') NOT NULL DEFAULT 'Pending',
  `transaction_date` datetime NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`transaction_id`),
  KEY `payment_gateway_id` (`payment_gateway_id`),
  KEY `fk_users` (`customer_id`),
  KEY `fk_orders` (`order_id`),
  CONSTRAINT `fk_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `fk_users` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`payment_gateway_id`) REFERENCES `payment_gateways` (`payment_gateway_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 97 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_devices
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_devices` (
  `user_device_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `device_id` varchar(100) DEFAULT NULL,
  `device_name` varchar(50) DEFAULT NULL,
  `device_type` int(1) NOT NULL DEFAULT 0 COMMENT '0:Android , 1:ios',
  `is_active` int(1) NOT NULL DEFAULT 0 COMMENT '0 : Active, 1 : InActive',
  `firebase_token` varchar(256) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_device_id`),
  KEY `user_id` (`user_id`, `device_id`),
  KEY `device_type` (`device_type`)
) ENGINE = InnoDB AUTO_INCREMENT = 71 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_notifications
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `redirect_type` varchar(255) NOT NULL,
  `reference_id` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'unread',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 256 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_roles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(256) DEFAULT NULL,
  `last_name` varchar(256) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email_verified` int(11) DEFAULT 0,
  `mpin` varchar(255) DEFAULT NULL,
  `register_at_ip` varchar(20) DEFAULT NULL,
  `email_verification_code` int(11) DEFAULT 0,
  `email_expiry_at` datetime DEFAULT NULL,
  `social_logins` int(11) DEFAULT NULL COMMENT 'facebook:1,\r\ngoogle:2,\r\ntwitter:3,\r\ninstagram:4',
  `token` varchar(500) DEFAULT NULL,
  `token_generated_at` datetime DEFAULT NULL,
  `token_expire_at` datetime DEFAULT NULL,
  `x_api_key` varchar(50) DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `email_updated_at` varchar(256) NOT NULL,
  `password_updated_at` varchar(256) NOT NULL,
  `user_status` enum('Active', 'Banned', 'Unverified') NOT NULL DEFAULT 'Active',
  `banned_reason` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `role_id` int(11) NOT NULL,
  `wallet_balance` decimal(10, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 75 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: vendor_company_details
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `vendor_company_details` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_name` varchar(256) NOT NULL,
  `company_address` text NOT NULL,
  `company_email` varchar(80) NOT NULL,
  `company_phone_number` varchar(20) NOT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `vendor_commission` float NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `vendor_company_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: wallet_history
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `wallet_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `order_id` int(11) NOT NULL,
  `type` enum('Credit', 'Debit') NOT NULL,
  `previous_amount` float NOT NULL,
  `current_amount` float NOT NULL,
  `status` enum('Completed', 'Cancelled') NOT NULL DEFAULT 'Completed',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_vendor_id_new` (`vendor_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 67 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: wish_lists
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `wish_lists` (
  `wishlist_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `added_date` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`wishlist_id`),
  KEY `fk_user_id` (`user_id`),
  KEY `fk_product_id` (`product_id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 284 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: activity_logs
# ------------------------------------------------------------

INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    457,
    36,
    'admins',
    'login',
    '2024-05-20 18:15:49',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-20 18:15:49',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    458,
    36,
    'admins',
    'login',
    '2024-05-21 10:17:35',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-21 10:17:38',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    459,
    48,
    'users',
    'login',
    '2024-05-21 10:36:11',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-21 10:36:11',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    460,
    36,
    'admins',
    'login',
    '2024-05-21 11:13:13',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-21 11:13:14',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    461,
    48,
    'users',
    'login',
    '2024-05-21 11:47:46',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-21 11:47:47',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    462,
    1,
    'users',
    'login',
    '2024-05-21 12:49:20',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 12:49:20',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    463,
    48,
    'users',
    'login',
    '2024-05-21 12:50:16',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-21 12:50:16',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    464,
    1,
    'users',
    'login',
    '2024-05-21 13:10:10',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 13:10:11',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    465,
    1,
    'users',
    'login',
    '2024-05-21 13:13:07',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 13:13:07',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    466,
    48,
    'users',
    'login',
    '2024-05-21 14:36:56',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-21 14:36:57',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    467,
    36,
    'admins',
    'login',
    '2024-05-21 15:23:44',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-21 15:23:45',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    468,
    48,
    'users',
    'login',
    '2024-05-21 15:45:39',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-21 15:45:40',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    469,
    1,
    'users',
    'login',
    '2024-05-21 15:46:46',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 15:46:46',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    470,
    1,
    'users',
    'login',
    '2024-05-21 16:12:33',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 16:12:34',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    471,
    4,
    'users',
    'login',
    '2024-05-21 16:17:55',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 16:17:56',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    472,
    4,
    'users',
    'login',
    '2024-05-21 16:26:06',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 16:26:07',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    473,
    4,
    'users',
    'login',
    '2024-05-21 16:28:56',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 16:28:57',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    474,
    4,
    'users',
    'login',
    '2024-05-21 16:30:28',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 16:30:28',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    475,
    4,
    'users',
    'login',
    '2024-05-21 16:36:31',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 16:36:32',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    476,
    38,
    'admins',
    'login',
    '2024-05-21 16:43:44',
    '{\"email\":\"john@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 16:43:45',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    477,
    38,
    'admins',
    'login',
    '2024-05-21 16:48:53',
    '{\"email\":\"john@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-21 16:48:54',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    478,
    36,
    'admins',
    'login',
    '2024-05-21 16:53:59',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-21 16:54:00',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    479,
    36,
    'admins',
    'login',
    '2024-05-22 10:07:21',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-22 10:07:23',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    480,
    36,
    'admins',
    'login',
    '2024-05-22 10:44:26',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-22 10:44:26',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    481,
    48,
    'users',
    'login',
    '2024-05-22 11:25:44',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-22 11:25:44',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    482,
    4,
    'users',
    'login',
    '2024-05-22 12:11:43',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-22 12:11:44',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    483,
    38,
    'admins',
    'login',
    '2024-05-22 12:13:03',
    '{\"email\":\"john@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-22 12:13:04',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    484,
    48,
    'users',
    'login',
    '2024-05-22 12:14:21',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-22 12:14:21',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    485,
    38,
    'admins',
    'login',
    '2024-05-22 12:36:18',
    '{\"email\":\"john@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-22 12:36:19',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    486,
    36,
    'admins',
    'login',
    '2024-05-22 12:37:11',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-22 12:37:12',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    487,
    36,
    'admins',
    'login',
    '2024-05-22 14:56:12',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-22 14:56:14',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    488,
    36,
    'admins',
    'login',
    '2024-05-22 15:23:11',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-22 15:23:13',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    489,
    48,
    'users',
    'login',
    '2024-05-22 15:32:38',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-22 15:32:39',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    490,
    48,
    'users',
    'login',
    '2024-05-22 15:57:52',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-22 15:57:53',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    491,
    48,
    'users',
    'login',
    '2024-05-22 16:00:38',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-22 16:00:38',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    492,
    1,
    'users',
    'login',
    '2024-05-22 16:10:01',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-22 16:10:02',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    493,
    4,
    'users',
    'login',
    '2024-05-22 16:12:48',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-22 16:12:49',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    494,
    4,
    'users',
    'login',
    '2024-05-22 16:52:24',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-22 16:52:25',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    495,
    48,
    'users',
    'login',
    '2024-05-22 17:09:55',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-22 17:09:56',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    496,
    36,
    'admins',
    'login',
    '2024-05-22 17:58:48',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-22 17:58:50',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    497,
    4,
    'users',
    'login',
    '2024-05-22 18:14:40',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-22 18:14:41',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    498,
    1,
    'users',
    'login',
    '2024-05-22 18:31:40',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-22 18:31:41',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    499,
    36,
    'admins',
    'login',
    '2024-05-23 10:09:28',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-23 10:09:32',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    500,
    48,
    'users',
    'login',
    '2024-05-23 10:11:22',
    '{\"email\":\"johnvendor.doe@example.com\",\"ip\":\"::1\"}',
    '2024-05-23 10:11:22',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    501,
    36,
    'admins',
    'login',
    '2024-05-23 12:25:06',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-23 12:25:08',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    502,
    36,
    'admins',
    'login',
    '2024-05-23 15:13:11',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-23 15:13:13',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    503,
    36,
    'admins',
    'login',
    '2024-05-23 17:21:17',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-23 17:21:18',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    504,
    36,
    'admins',
    'login',
    '2024-05-23 17:23:15',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-23 17:23:16',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    505,
    36,
    'admins',
    'login',
    '2024-05-23 17:24:31',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-23 17:24:31',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    506,
    36,
    'admins',
    'login',
    '2024-05-23 17:25:22',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-23 17:25:23',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    507,
    1,
    'users',
    'login',
    '2024-05-23 17:26:04',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-23 17:26:04',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    508,
    1,
    'users',
    'login',
    '2024-05-23 17:28:44',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-23 17:28:45',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    509,
    36,
    'admins',
    'login',
    '2024-05-23 17:29:09',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-23 17:29:09',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    510,
    36,
    'admins',
    'login',
    '2024-05-23 17:33:09',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-23 17:33:10',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    511,
    1,
    'users',
    'login',
    '2024-05-23 18:09:50',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-23 18:09:51',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    512,
    4,
    'orders',
    'create_order',
    '2024-05-23 18:11:03',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-05-23 18:11:03',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    513,
    4,
    'orders',
    'create_order',
    '2024-05-23 18:13:05',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-05-23 18:13:06',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    514,
    4,
    'orders',
    'create_order',
    '2024-05-23 18:14:53',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-05-23 18:14:54',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    515,
    1,
    'users',
    'login',
    '2024-05-24 10:08:32',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 10:08:34',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    516,
    36,
    'admins',
    'login',
    '2024-05-24 10:16:13',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 10:16:14',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    517,
    1,
    'users',
    'login',
    '2024-05-24 10:57:56',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 10:57:57',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    518,
    1,
    'users',
    'login',
    '2024-05-24 11:03:27',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 11:03:29',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    519,
    1,
    'users',
    'login',
    '2024-05-24 11:10:01',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 11:10:01',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    520,
    36,
    'admins',
    'login',
    '2024-05-24 11:24:27',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 11:24:28',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    521,
    1,
    'users',
    'login',
    '2024-05-24 11:31:19',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 11:31:20',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    522,
    1,
    'users',
    'login',
    '2024-05-24 11:35:58',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 11:35:59',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    523,
    1,
    'users',
    'login',
    '2024-05-24 11:40:51',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 11:40:52',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    524,
    36,
    'admins',
    'login',
    '2024-05-24 11:49:51',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 11:49:52',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    525,
    1,
    'users',
    'login',
    '2024-05-24 12:02:06',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:02:07',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    526,
    1,
    'users',
    'login',
    '2024-05-24 12:03:39',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:03:40',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    527,
    36,
    'admins',
    'login',
    '2024-05-24 12:11:42',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:11:43',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    528,
    1,
    'users',
    'login',
    '2024-05-24 12:14:19',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:14:19',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    529,
    1,
    'users',
    'login',
    '2024-05-24 12:24:08',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:24:08',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    530,
    1,
    'users',
    'login',
    '2024-05-24 12:32:28',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:32:29',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    531,
    36,
    'admins',
    'login',
    '2024-05-24 12:35:18',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:35:18',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    532,
    1,
    'users',
    'login',
    '2024-05-24 12:37:05',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:37:06',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    533,
    36,
    'admins',
    'login',
    '2024-05-24 12:48:28',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:48:28',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    534,
    1,
    'users',
    'login',
    '2024-05-24 12:54:57',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 12:54:58',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    535,
    36,
    'admins',
    'login',
    '2024-05-24 13:04:25',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 13:04:25',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    536,
    1,
    'users',
    'login',
    '2024-05-24 13:13:01',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 13:13:02',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    537,
    36,
    'admins',
    'login',
    '2024-05-24 15:25:22',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 15:25:23',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    538,
    1,
    'users',
    'login',
    '2024-05-24 15:27:39',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-24 15:27:39',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    539,
    36,
    'admins',
    'login',
    '2024-05-24 16:41:01',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 16:41:05',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    540,
    55,
    'users',
    'update_password',
    '2024-05-24 16:48:35',
    '{}',
    '2024-05-24 16:48:36',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    541,
    54,
    'users',
    'update_password',
    '2024-05-24 16:48:52',
    '{}',
    '2024-05-24 16:48:53',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    542,
    54,
    'users',
    'login',
    '2024-05-24 17:00:45',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-24 17:00:50',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    543,
    36,
    'admins',
    'login',
    '2024-05-24 17:30:35',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-24 17:30:37',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    544,
    4,
    'orders',
    'create_order',
    '2024-05-24 18:01:28',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-05-24 18:01:29',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    545,
    4,
    'orders',
    'create_order',
    '2024-05-24 18:04:01',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-05-24 18:04:01',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    546,
    36,
    'admins',
    'login',
    '2024-05-25 09:55:03',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-25 09:55:04',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    547,
    4,
    'orders',
    'create_order',
    '2024-05-25 09:55:14',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-05-25 09:55:14',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    548,
    4,
    'orders',
    'create_order',
    '2024-05-25 10:13:17',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-05-25 10:13:18',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    549,
    36,
    'admins',
    'login',
    '2024-05-25 16:49:32',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-25 16:49:35',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    550,
    36,
    'admins',
    'login',
    '2024-05-25 17:03:02',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-25 17:03:02',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    551,
    36,
    'admins',
    'login',
    '2024-05-27 10:11:44',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-27 10:11:47',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    552,
    1,
    'users',
    'login',
    '2024-05-27 10:53:29',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-27 10:53:29',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    553,
    54,
    'users',
    'login',
    '2024-05-27 11:01:33',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-27 11:01:34',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    554,
    54,
    'users',
    'login',
    '2024-05-27 11:06:11',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-27 11:06:12',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    555,
    1,
    'users',
    'login',
    '2024-05-27 11:36:06',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-27 11:36:07',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    556,
    36,
    'admins',
    'login',
    '2024-05-27 11:38:40',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-27 11:38:40',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    557,
    36,
    'admins',
    'login',
    '2024-05-27 17:08:51',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-27 17:08:53',
    NULL
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    558,
    54,
    'users',
    'login',
    '2024-05-28 10:12:45',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-28 10:12:46',
    '2024-05-28 10:12:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    559,
    36,
    'admins',
    'login',
    '2024-05-28 10:23:21',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-28 10:23:22',
    '2024-05-28 10:23:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    560,
    54,
    'users',
    'login',
    '2024-05-28 10:27:12',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-28 10:27:13',
    '2024-05-28 10:27:13'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    561,
    36,
    'admins',
    'login',
    '2024-05-28 10:31:15',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-28 10:31:16',
    '2024-05-28 10:31:16'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    562,
    1,
    'users',
    'login',
    '2024-05-28 10:36:01',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 10:36:02',
    '2024-05-28 10:36:02'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    563,
    1,
    'users',
    'login',
    '2024-05-28 10:40:31',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 10:40:31',
    '2024-05-28 10:40:31'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    564,
    54,
    'users',
    'login',
    '2024-05-28 10:43:03',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-28 10:43:05',
    '2024-05-28 10:43:05'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    565,
    1,
    'users',
    'login',
    '2024-05-28 10:55:27',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 10:55:27',
    '2024-05-28 10:55:27'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    566,
    36,
    'admins',
    'login',
    '2024-05-28 11:02:07',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-28 11:02:09',
    '2024-05-28 11:02:09'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    567,
    36,
    'admins',
    'login',
    '2024-05-28 11:09:59',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-28 11:09:59',
    '2024-05-28 11:09:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    568,
    1,
    'users',
    'login',
    '2024-05-28 11:18:20',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 11:18:20',
    '2024-05-28 11:18:20'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    569,
    1,
    'users',
    'login',
    '2024-05-28 11:51:36',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 11:51:36',
    '2024-05-28 11:51:36'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    570,
    1,
    'users',
    'login',
    '2024-05-28 11:52:23',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 11:52:23',
    '2024-05-28 11:52:23'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    571,
    54,
    'users',
    'login',
    '2024-05-28 11:53:25',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-28 11:53:25',
    '2024-05-28 11:53:25'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    572,
    1,
    'users',
    'login',
    '2024-05-28 12:14:04',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 12:14:04',
    '2024-05-28 12:14:04'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    573,
    1,
    'users',
    'login',
    '2024-05-28 12:20:48',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 12:20:49',
    '2024-05-28 12:20:49'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    574,
    1,
    'users',
    'login',
    '2024-05-28 12:29:46',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 12:29:46',
    '2024-05-28 12:29:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    575,
    54,
    'users',
    'login',
    '2024-05-28 12:33:52',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-28 12:33:53',
    '2024-05-28 12:33:53'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    576,
    1,
    'users',
    'login',
    '2024-05-28 12:37:37',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 12:37:38',
    '2024-05-28 12:37:38'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    577,
    36,
    'admins',
    'login',
    '2024-05-28 13:08:15',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-28 13:08:16',
    '2024-05-28 13:08:16'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    578,
    54,
    'users',
    'login',
    '2024-05-28 14:34:17',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-28 14:34:19',
    '2024-05-28 14:34:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    579,
    36,
    'admins',
    'login',
    '2024-05-28 14:38:15',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-28 14:38:16',
    '2024-05-28 14:38:16'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    580,
    54,
    'users',
    'login',
    '2024-05-28 14:40:59',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-28 14:41:00',
    '2024-05-28 14:41:00'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    581,
    1,
    'users',
    'login',
    '2024-05-28 15:03:18',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-28 15:03:19',
    '2024-05-28 15:03:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    582,
    36,
    'admins',
    'login',
    '2024-05-28 15:23:24',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-28 15:23:24',
    '2024-05-28 15:23:24'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    583,
    106,
    'orders',
    'update_order_status',
    '2024-05-28 18:38:14',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-28 18:39:22',
    '2024-05-28 18:39:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    584,
    1,
    'users',
    'login',
    '2024-05-29 09:53:29',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-29 09:53:30',
    '2024-05-29 09:53:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    585,
    106,
    'orders',
    'update_order_status',
    '2024-05-29 10:02:16',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-29 10:03:23',
    '2024-05-29 10:03:23'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    586,
    106,
    'orders',
    'update_order_status',
    '2024-05-29 10:09:07',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-29 10:10:14',
    '2024-05-29 10:10:14'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    587,
    106,
    'orders',
    'update_order_status',
    '2024-05-29 10:30:30',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-29 10:31:35',
    '2024-05-29 10:31:35'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    588,
    36,
    'admins',
    'login',
    '2024-05-29 10:35:26',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-29 10:35:26',
    '2024-05-29 10:35:26'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    589,
    106,
    'orders',
    'update_order_status',
    '2024-05-29 10:46:28',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-29 10:46:34',
    '2024-05-29 10:46:34'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    590,
    1,
    'users',
    'login',
    '2024-05-29 11:03:46',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-29 11:03:47',
    '2024-05-29 11:03:47'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    591,
    106,
    'orders',
    'update_order_status',
    '2024-05-29 12:23:13',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-29 12:23:18',
    '2024-05-29 12:23:18'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    592,
    114,
    'orders',
    'update_order_status',
    '2024-05-29 12:26:37',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-29 12:27:44',
    '2024-05-29 12:27:44'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    593,
    4,
    'orders',
    'update_order_status',
    '2024-05-29 13:03:28',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\"}',
    '2024-05-29 13:04:34',
    '2024-05-29 13:04:34'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    594,
    4,
    'orders',
    'update_order_status',
    '2024-05-29 13:09:22',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\"}',
    '2024-05-29 13:09:27',
    '2024-05-29 13:09:27'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    595,
    114,
    'orders',
    'update_order_status',
    '2024-05-29 15:05:20',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-29 15:05:28',
    '2024-05-29 15:05:28'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    596,
    4,
    'orders',
    'update_order_status',
    '2024-05-29 15:07:16',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\"}',
    '2024-05-29 15:07:21',
    '2024-05-29 15:07:21'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    597,
    36,
    'admins',
    'login',
    '2024-05-29 15:41:38',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-29 15:41:39',
    '2024-05-29 15:41:39'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    598,
    1,
    'users',
    'login',
    '2024-05-29 15:59:56',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-29 15:59:57',
    '2024-05-29 15:59:57'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    599,
    1,
    'orders',
    'create_order',
    '2024-05-29 16:38:47',
    '{\"billingName\":\"hello \",\"billingAddress\":\"900 florida\",\"billingEmail\":\"deo@gmail.com\",\"billingMobileNumber\":\"2489916514\",\"shippingName\":\"hello \",\"shippingAddress\":\"900 florida\",\"shippingEmail\":\"deo@gmail.com\",\"shippingMobileNumber\":\"2489916514\"}',
    '2024-05-29 16:38:48',
    '2024-05-29 16:38:48'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    600,
    4,
    'orders',
    'update_order_status',
    '2024-05-29 16:40:10',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\"}',
    '2024-05-29 16:40:15',
    '2024-05-29 16:40:15'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    601,
    1,
    'orders',
    'create_order',
    '2024-05-29 17:02:03',
    '{\"billingName\":\"hello \",\"billingAddress\":\"900 florida\",\"billingEmail\":\"deo@gmail.com\",\"billingMobileNumber\":\"2489916514\",\"shippingName\":\"hello \",\"shippingAddress\":\"900 florida\",\"shippingEmail\":\"deo@gmail.com\",\"shippingMobileNumber\":\"2489916514\"}',
    '2024-05-29 17:02:05',
    '2024-05-29 17:02:05'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    602,
    1,
    'orders',
    'create_order',
    '2024-05-29 17:03:22',
    '{\"billingName\":\"hello \",\"billingAddress\":\"900 florida\",\"billingEmail\":\"deo@gmail.com\",\"billingMobileNumber\":\"2489916514\",\"shippingName\":\"vishal\",\"shippingAddress\":\"900 florida\",\"shippingEmail\":\"deo@gmail.com\",\"shippingMobileNumber\":\"2489916514\"}',
    '2024-05-29 17:03:22',
    '2024-05-29 17:03:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    603,
    1,
    'orders',
    'create_order',
    '2024-05-29 17:18:41',
    '{\"billingName\":\"hello \",\"billingAddress\":\"900 florida\",\"billingEmail\":\"deo@gmail.com\",\"billingMobileNumber\":\"2489916514\",\"shippingName\":\"hello \",\"shippingAddress\":\"900 florida\",\"shippingEmail\":\"deo@gmail.com\",\"shippingMobileNumber\":\"2489916514\"}',
    '2024-05-29 17:18:42',
    '2024-05-29 17:18:42'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    604,
    4,
    'orders',
    'update_order_status',
    '2024-05-29 17:22:49',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\"}',
    '2024-05-29 17:23:04',
    '2024-05-29 17:23:04'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    605,
    4,
    'orders',
    'update_order_status',
    '2024-05-29 17:29:24',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\"}',
    '2024-05-29 17:29:30',
    '2024-05-29 17:29:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    606,
    4,
    'orders',
    'update_order_status',
    '2024-05-29 17:41:09',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"mochel\"}',
    '2024-05-29 17:41:18',
    '2024-05-29 17:41:18'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    607,
    1,
    'users',
    'login',
    '2024-05-29 18:02:14',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-29 18:02:14',
    '2024-05-29 18:02:14'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    608,
    36,
    'admins',
    'login',
    '2024-05-29 18:20:51',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-29 18:20:52',
    '2024-05-29 18:20:52'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    609,
    4,
    'orders',
    'update_order_status',
    '2024-05-29 18:21:01',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"mochel\"}',
    '2024-05-29 18:21:06',
    '2024-05-29 18:21:06'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    610,
    118,
    'orders',
    'update_order_status',
    '2024-05-29 18:23:54',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"mochel\"}',
    '2024-05-29 18:23:59',
    '2024-05-29 18:23:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    611,
    118,
    'orders',
    'update_order_status',
    '2024-05-29 18:26:52',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"mochel\"}',
    '2024-05-29 18:26:57',
    '2024-05-29 18:26:57'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    612,
    36,
    'admins',
    'login',
    '2024-05-30 10:55:20',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 10:55:22',
    '2024-05-30 10:55:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    613,
    54,
    'users',
    'login',
    '2024-05-30 10:57:05',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-30 10:57:05',
    '2024-05-30 10:57:05'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    614,
    36,
    'admins',
    'login',
    '2024-05-30 10:58:26',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 10:58:26',
    '2024-05-30 10:58:26'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    615,
    54,
    'users',
    'login',
    '2024-05-30 11:20:22',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-30 11:20:22',
    '2024-05-30 11:20:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    616,
    1,
    'users',
    'login',
    '2024-05-30 11:20:49',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 11:20:49',
    '2024-05-30 11:20:49'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    617,
    54,
    'users',
    'login',
    '2024-05-30 12:03:38',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-30 12:03:39',
    '2024-05-30 12:03:39'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    618,
    1,
    'users',
    'login',
    '2024-05-30 12:21:27',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 12:21:27',
    '2024-05-30 12:21:27'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    619,
    36,
    'admins',
    'login',
    '2024-05-30 12:31:30',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 12:31:31',
    '2024-05-30 12:31:31'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    620,
    1,
    'users',
    'login',
    '2024-05-30 12:59:49',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 12:59:52',
    '2024-05-30 12:59:52'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    621,
    54,
    'users',
    'login',
    '2024-05-30 15:24:11',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-30 15:24:12',
    '2024-05-30 15:24:12'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    622,
    1,
    'users',
    'login',
    '2024-05-30 15:25:28',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 15:25:30',
    '2024-05-30 15:25:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    623,
    1,
    'users',
    'login',
    '2024-05-30 15:31:28',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 15:31:28',
    '2024-05-30 15:31:28'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    624,
    36,
    'admins',
    'login',
    '2024-05-30 15:39:11',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 15:39:13',
    '2024-05-30 15:39:13'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    625,
    1,
    'users',
    'login',
    '2024-05-30 15:41:49',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 15:41:50',
    '2024-05-30 15:41:50'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    626,
    36,
    'admins',
    'login',
    '2024-05-30 15:44:52',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 15:44:53',
    '2024-05-30 15:44:53'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    627,
    1,
    'users',
    'login',
    '2024-05-30 16:09:08',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 16:09:09',
    '2024-05-30 16:09:09'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    628,
    1,
    'users',
    'login',
    '2024-05-30 16:32:24',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 16:32:24',
    '2024-05-30 16:32:24'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    629,
    36,
    'admins',
    'login',
    '2024-05-30 16:32:28',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 16:32:28',
    '2024-05-30 16:32:28'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    630,
    36,
    'admins',
    'login',
    '2024-05-30 16:32:35',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 16:32:35',
    '2024-05-30 16:32:35'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    631,
    36,
    'admins',
    'login',
    '2024-05-30 16:42:05',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 16:42:06',
    '2024-05-30 16:42:06'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    632,
    1,
    'users',
    'login',
    '2024-05-30 16:45:11',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 16:45:11',
    '2024-05-30 16:45:11'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    633,
    36,
    'admins',
    'login',
    '2024-05-30 16:59:30',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 16:59:31',
    '2024-05-30 16:59:31'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    634,
    36,
    'admins',
    'login',
    '2024-05-30 17:20:14',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 17:20:16',
    '2024-05-30 17:20:16'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    635,
    4,
    'users',
    'login',
    '2024-05-30 17:22:37',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 17:22:38',
    '2024-05-30 17:22:38'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    636,
    36,
    'admins',
    'login',
    '2024-05-30 17:30:49',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 17:30:51',
    '2024-05-30 17:30:51'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    637,
    36,
    'admins',
    'login',
    '2024-05-30 17:41:20',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 17:41:21',
    '2024-05-30 17:41:21'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    638,
    4,
    'users',
    'login',
    '2024-05-30 17:53:31',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 17:53:32',
    '2024-05-30 17:53:32'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    639,
    36,
    'admins',
    'login',
    '2024-05-30 17:56:51',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 17:56:53',
    '2024-05-30 17:56:53'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    640,
    4,
    'users',
    'login',
    '2024-05-30 17:59:41',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 17:59:43',
    '2024-05-30 17:59:43'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    641,
    1,
    'users',
    'login',
    '2024-05-30 18:05:17',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 18:05:18',
    '2024-05-30 18:05:18'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    642,
    36,
    'admins',
    'login',
    '2024-05-30 18:17:29',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 18:17:30',
    '2024-05-30 18:17:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    643,
    1,
    'users',
    'login',
    '2024-05-30 18:19:01',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 18:19:02',
    '2024-05-30 18:19:02'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    644,
    36,
    'admins',
    'login',
    '2024-05-30 18:21:29',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 18:21:29',
    '2024-05-30 18:21:29'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    645,
    1,
    'users',
    'login',
    '2024-05-30 18:22:43',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-30 18:22:43',
    '2024-05-30 18:22:43'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    646,
    36,
    'admins',
    'login',
    '2024-05-30 18:25:00',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-30 18:25:01',
    '2024-05-30 18:25:01'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    647,
    36,
    'admins',
    'login',
    '2024-05-31 09:46:37',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-31 09:46:43',
    '2024-05-31 09:46:43'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    648,
    1,
    'users',
    'login',
    '2024-05-31 10:21:16',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-31 10:21:17',
    '2024-05-31 10:21:17'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    649,
    36,
    'admins',
    'login',
    '2024-05-31 10:38:27',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-05-31 10:38:28',
    '2024-05-31 10:38:28'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    650,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 10:51:57',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 10:52:03',
    '2024-05-31 10:52:03'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    651,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 10:54:26',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 10:54:31',
    '2024-05-31 10:54:31'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    652,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 10:57:40',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 10:57:45',
    '2024-05-31 10:57:45'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    653,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 10:59:50',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 10:59:54',
    '2024-05-31 10:59:54'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    654,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:01:37',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:01:41',
    '2024-05-31 11:01:41'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    655,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:06:40',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:06:47',
    '2024-05-31 11:06:47'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    656,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:09:14',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:09:19',
    '2024-05-31 11:09:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    657,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:13:13',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:13:18',
    '2024-05-31 11:13:18'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    658,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:15:03',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:15:07',
    '2024-05-31 11:15:07'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    659,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:18:04',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:18:15',
    '2024-05-31 11:18:15'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    660,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:19:56',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:20:01',
    '2024-05-31 11:20:01'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    661,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:26:06',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:26:15',
    '2024-05-31 11:26:15'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    662,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:30:16',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:30:22',
    '2024-05-31 11:30:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    663,
    114,
    'orders',
    'update_order_status',
    '2024-05-31 11:39:41',
    '{\"orderStatus\":\"Delivered\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-05-31 11:39:47',
    '2024-05-31 11:39:47'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    664,
    1,
    'users',
    'login',
    '2024-05-31 12:05:27',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-31 12:05:29',
    '2024-05-31 12:05:29'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    665,
    54,
    'users',
    'login',
    '2024-05-31 12:07:46',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-31 12:07:46',
    '2024-05-31 12:07:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    666,
    1,
    'users',
    'login',
    '2024-05-31 14:47:30',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-05-31 14:47:31',
    '2024-05-31 14:47:31'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    667,
    54,
    'users',
    'login',
    '2024-05-31 14:49:58',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-31 14:49:59',
    '2024-05-31 14:49:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    668,
    54,
    'users',
    'login',
    '2024-05-31 14:51:14',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-05-31 14:51:16',
    '2024-05-31 14:51:16'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    669,
    1,
    'users',
    'login',
    '2024-06-01 09:57:35',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-01 09:57:36',
    '2024-06-01 09:57:36'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    670,
    54,
    'users',
    'login',
    '2024-06-01 09:58:25',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-01 09:58:25',
    '2024-06-01 09:58:25'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    671,
    54,
    'users',
    'login',
    '2024-06-01 09:58:29',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-01 09:58:30',
    '2024-06-01 09:58:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    672,
    1,
    'users',
    'login',
    '2024-06-01 09:59:08',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-01 09:59:08',
    '2024-06-01 09:59:08'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    673,
    54,
    'users',
    'login',
    '2024-06-01 10:30:35',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-01 10:30:35',
    '2024-06-01 10:30:35'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    674,
    1,
    'users',
    'login',
    '2024-06-01 10:58:15',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-01 10:58:15',
    '2024-06-01 10:58:15'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    675,
    36,
    'admins',
    'login',
    '2024-06-01 11:39:41',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-01 11:39:41',
    '2024-06-01 11:39:41'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    676,
    1,
    'users',
    'login',
    '2024-06-01 11:44:04',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-01 11:44:04',
    '2024-06-01 11:44:04'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    677,
    54,
    'users',
    'login',
    '2024-06-01 11:51:58',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-01 11:51:59',
    '2024-06-01 11:51:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    678,
    36,
    'admins',
    'login',
    '2024-06-01 12:45:45',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-01 12:45:46',
    '2024-06-01 12:45:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    679,
    54,
    'users',
    'login',
    '2024-06-03 15:55:22',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-03 15:55:24',
    '2024-06-03 15:55:24'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    680,
    54,
    'users',
    'login',
    '2024-06-04 10:08:40',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-04 10:08:41',
    '2024-06-04 10:08:41'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    681,
    54,
    'users',
    'login',
    '2024-06-04 11:47:39',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-04 11:47:40',
    '2024-06-04 11:47:40'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    682,
    54,
    'users',
    'login',
    '2024-06-04 11:49:44',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-04 11:49:44',
    '2024-06-04 11:49:44'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    683,
    36,
    'admins',
    'login',
    '2024-06-04 18:34:53',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-04 18:34:54',
    '2024-06-04 18:34:54'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    684,
    36,
    'admins',
    'login',
    '2024-06-05 09:56:35',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-05 09:56:37',
    '2024-06-05 09:56:37'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    685,
    36,
    'admins',
    'login',
    '2024-06-05 09:56:43',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-05 09:56:43',
    '2024-06-05 09:56:43'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    686,
    1,
    'users',
    'login',
    '2024-06-05 09:58:58',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-05 09:58:59',
    '2024-06-05 09:58:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    687,
    1,
    'users',
    'login',
    '2024-06-05 09:59:43',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-05 09:59:43',
    '2024-06-05 09:59:43'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    688,
    36,
    'admins',
    'login',
    '2024-06-05 10:07:56',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-05 10:07:56',
    '2024-06-05 10:07:56'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    689,
    1,
    'users',
    'login',
    '2024-06-05 10:13:53',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-05 10:13:53',
    '2024-06-05 10:13:53'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    690,
    1,
    'users',
    'login',
    '2024-06-05 10:18:37',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-05 10:18:37',
    '2024-06-05 10:18:37'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    691,
    36,
    'admins',
    'login',
    '2024-06-05 11:02:55',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-05 11:02:55',
    '2024-06-05 11:02:55'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    692,
    36,
    'admins',
    'login',
    '2024-06-05 11:07:36',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-05 11:07:36',
    '2024-06-05 11:07:36'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    693,
    1,
    'users',
    'login',
    '2024-06-05 11:18:13',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-05 11:18:13',
    '2024-06-05 11:18:13'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    694,
    4,
    'users',
    'login',
    '2024-06-05 13:34:59',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-05 13:35:00',
    '2024-06-05 13:35:00'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    695,
    36,
    'admins',
    'login',
    '2024-06-05 13:35:46',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-05 13:35:46',
    '2024-06-05 13:35:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    696,
    36,
    'admins',
    'login',
    '2024-06-05 15:39:16',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-05 15:39:17',
    '2024-06-05 15:39:17'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    697,
    39,
    'admins',
    'login',
    '2024-06-05 15:40:19',
    '{\"email\":\"michael@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-05 15:40:19',
    '2024-06-05 15:40:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    698,
    4,
    'users',
    'login',
    '2024-06-05 15:43:14',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-05 15:43:15',
    '2024-06-05 15:43:15'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    699,
    54,
    'users',
    'login',
    '2024-06-05 15:43:53',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-05 15:43:54',
    '2024-06-05 15:43:54'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    700,
    1,
    'users',
    'login',
    '2024-06-05 16:18:59',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-05 16:19:01',
    '2024-06-05 16:19:01'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    701,
    1,
    'users',
    'login',
    '2024-06-06 10:07:06',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 10:07:08',
    '2024-06-06 10:07:08'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    702,
    39,
    'admins',
    'login',
    '2024-06-06 10:11:40',
    '{\"email\":\"michael@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 10:11:40',
    '2024-06-06 10:11:40'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    703,
    36,
    'admins',
    'login',
    '2024-06-06 10:13:22',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-06 10:13:23',
    '2024-06-06 10:13:23'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    704,
    54,
    'users',
    'login',
    '2024-06-06 10:15:40',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-06 10:15:40',
    '2024-06-06 10:15:40'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    705,
    54,
    'users',
    'login',
    '2024-06-06 10:34:22',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-06 10:34:22',
    '2024-06-06 10:34:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    706,
    54,
    'users',
    'login',
    '2024-06-06 10:52:12',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-06 10:52:12',
    '2024-06-06 10:52:12'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    707,
    4,
    'users',
    'login',
    '2024-06-06 10:55:25',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 10:55:25',
    '2024-06-06 10:55:25'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    708,
    1,
    'users',
    'login',
    '2024-06-06 11:14:55',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 11:14:55',
    '2024-06-06 11:14:55'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    709,
    36,
    'admins',
    'login',
    '2024-06-06 11:17:04',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-06 11:17:05',
    '2024-06-06 11:17:05'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    710,
    1,
    'users',
    'login',
    '2024-06-06 12:12:21',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 12:12:21',
    '2024-06-06 12:12:21'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    711,
    4,
    'users',
    'login',
    '2024-06-06 14:09:45',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 14:09:46',
    '2024-06-06 14:09:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    712,
    1,
    'users',
    'login',
    '2024-06-06 14:10:46',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 14:10:47',
    '2024-06-06 14:10:47'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    713,
    1,
    'users',
    'login',
    '2024-06-06 14:14:38',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 14:14:38',
    '2024-06-06 14:14:38'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    714,
    1,
    'users',
    'login',
    '2024-06-06 14:15:30',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 14:15:30',
    '2024-06-06 14:15:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    715,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:06:09',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:06:10',
    '2024-06-06 15:06:10'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    716,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:08:07',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:08:07',
    '2024-06-06 15:08:07'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    717,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:12:19',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:12:20',
    '2024-06-06 15:12:20'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    718,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:20:40',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:20:41',
    '2024-06-06 15:20:41'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    719,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:22:14',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:22:15',
    '2024-06-06 15:22:15'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    720,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:28:54',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:28:54',
    '2024-06-06 15:28:54'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    721,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:30:26',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:30:26',
    '2024-06-06 15:30:26'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    722,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:40:55',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:40:55',
    '2024-06-06 15:40:55'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    723,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:47:02',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:47:02',
    '2024-06-06 15:47:02'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    724,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:48:21',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:48:22',
    '2024-06-06 15:48:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    725,
    4,
    'orders',
    'create_order',
    '2024-06-06 15:56:33',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 15:56:34',
    '2024-06-06 15:56:34'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    726,
    1,
    'users',
    'login',
    '2024-06-06 16:22:30',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 16:22:31',
    '2024-06-06 16:22:31'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    727,
    4,
    'users',
    'login',
    '2024-06-06 16:38:42',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 16:38:43',
    '2024-06-06 16:38:43'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    728,
    4,
    'users',
    'login',
    '2024-06-06 17:04:05',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 17:04:05',
    '2024-06-06 17:04:05'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    729,
    1,
    'users',
    'login',
    '2024-06-06 17:04:42',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-06 17:04:42',
    '2024-06-06 17:04:42'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    730,
    4,
    'orders',
    'create_order',
    '2024-06-06 17:25:24',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 17:25:25',
    '2024-06-06 17:25:25'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    731,
    4,
    'orders',
    'create_order',
    '2024-06-06 17:28:29',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 17:28:30',
    '2024-06-06 17:28:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    732,
    4,
    'orders',
    'create_order',
    '2024-06-06 17:42:44',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 17:42:45',
    '2024-06-06 17:42:45'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    733,
    4,
    'orders',
    'create_order',
    '2024-06-06 17:44:59',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 17:44:59',
    '2024-06-06 17:44:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    734,
    4,
    'orders',
    'create_order',
    '2024-06-06 17:48:19',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 17:48:20',
    '2024-06-06 17:48:20'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    735,
    4,
    'orders',
    'create_order',
    '2024-06-06 18:00:28',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 18:00:30',
    '2024-06-06 18:00:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    736,
    4,
    'orders',
    'create_order',
    '2024-06-06 18:01:59',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 18:01:59',
    '2024-06-06 18:01:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    737,
    4,
    'orders',
    'create_order',
    '2024-06-06 18:14:28',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 18:14:29',
    '2024-06-06 18:14:29'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    738,
    4,
    'orders',
    'create_order',
    '2024-06-06 18:17:14',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-06 18:17:14',
    '2024-06-06 18:17:14'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    739,
    1,
    'users',
    'login',
    '2024-06-07 09:45:06',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-07 09:45:07',
    '2024-06-07 09:45:07'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    740,
    36,
    'admins',
    'login',
    '2024-06-07 09:55:19',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-07 09:55:21',
    '2024-06-07 09:55:21'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    741,
    1,
    'users',
    'login',
    '2024-06-07 09:55:47',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-07 09:55:47',
    '2024-06-07 09:55:47'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    742,
    36,
    'admins',
    'login',
    '2024-06-07 10:53:09',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-07 10:53:09',
    '2024-06-07 10:53:09'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    743,
    4,
    'orders',
    'create_order',
    '2024-06-07 11:05:27',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-07 11:05:27',
    '2024-06-07 11:05:27'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    744,
    4,
    'orders',
    'create_order',
    '2024-06-07 11:06:29',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-07 11:06:29',
    '2024-06-07 11:06:29'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    745,
    4,
    'orders',
    'create_order',
    '2024-06-07 11:11:31',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-07 11:11:31',
    '2024-06-07 11:11:31'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    746,
    4,
    'orders',
    'create_order',
    '2024-06-07 11:11:52',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-07 11:11:52',
    '2024-06-07 11:11:52'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    747,
    4,
    'orders',
    'create_order',
    '2024-06-07 15:01:38',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-07 15:01:39',
    '2024-06-07 15:01:39'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    748,
    4,
    'orders',
    'create_order',
    '2024-06-07 15:04:59',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-07 15:04:59',
    '2024-06-07 15:04:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    749,
    4,
    'orders',
    'create_order',
    '2024-06-07 15:06:00',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-07 15:06:01',
    '2024-06-07 15:06:01'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    750,
    1,
    'users',
    'login',
    '2024-06-07 15:09:01',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-07 15:09:01',
    '2024-06-07 15:09:01'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    751,
    114,
    'orders',
    'update_order_status',
    '2024-06-07 15:20:15',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-07 15:20:16',
    '2024-06-07 15:20:16'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    752,
    114,
    'orders',
    'update_order_status',
    '2024-06-07 15:32:46',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-07 15:32:48',
    '2024-06-07 15:32:48'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    753,
    146,
    'orders',
    'update_order_status',
    '2024-06-07 15:48:17',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-07 15:48:19',
    '2024-06-07 15:48:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    754,
    146,
    'orders',
    'update_order_status',
    '2024-06-07 15:49:11',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-07 15:49:11',
    '2024-06-07 15:49:11'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    755,
    146,
    'orders',
    'update_order_status',
    '2024-06-07 15:53:08',
    '{\"orderStatus\":\"Cancelled\",\"email\":\"user2@gmail.com\",\"username\":\"mochel\"}',
    '2024-06-07 15:53:08',
    '2024-06-07 15:53:08'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    756,
    36,
    'admins',
    'login',
    '2024-06-07 15:54:46',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-07 15:54:50',
    '2024-06-07 15:54:50'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    757,
    146,
    'orders',
    'update_order_status',
    '2024-06-07 15:55:10',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"mochel\"}',
    '2024-06-07 15:55:11',
    '2024-06-07 15:55:11'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    758,
    4,
    'orders',
    'create_order',
    '2024-06-07 16:12:37',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-07 16:12:38',
    '2024-06-07 16:12:38'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    759,
    4,
    'orders',
    'create_order',
    '2024-06-07 16:15:46',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-07 16:15:46',
    '2024-06-07 16:15:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    760,
    146,
    'orders',
    'update_order_status',
    '2024-06-07 16:17:34',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"mochel\"}',
    '2024-06-07 16:17:34',
    '2024-06-07 16:17:34'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    761,
    146,
    'orders',
    'update_order_status',
    '2024-06-07 16:18:06',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"mochel\"}',
    '2024-06-07 16:18:06',
    '2024-06-07 16:18:06'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    762,
    1,
    'users',
    'login',
    '2024-06-07 16:35:22',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-07 16:35:22',
    '2024-06-07 16:35:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    763,
    1,
    'users',
    'login',
    '2024-06-07 16:46:59',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-07 16:47:00',
    '2024-06-07 16:47:00'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    764,
    54,
    'users',
    'login',
    '2024-06-07 16:47:45',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-07 16:47:46',
    '2024-06-07 16:47:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    765,
    1,
    'users',
    'login',
    '2024-06-07 17:34:09',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-07 17:34:10',
    '2024-06-07 17:34:10'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    766,
    1,
    'users',
    'login',
    '2024-06-07 17:46:41',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-07 17:46:42',
    '2024-06-07 17:46:42'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    767,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 09:43:55',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 09:43:56',
    '2024-06-08 09:43:56'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    768,
    1,
    'users',
    'login',
    '2024-06-08 09:49:18',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 09:49:19',
    '2024-06-08 09:49:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    769,
    1,
    'users',
    'login',
    '2024-06-08 10:17:31',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 10:17:32',
    '2024-06-08 10:17:32'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    770,
    4,
    'users',
    'login',
    '2024-06-08 10:32:17',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 10:32:18',
    '2024-06-08 10:32:18'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    771,
    1,
    'users',
    'login',
    '2024-06-08 10:44:41',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 10:44:42',
    '2024-06-08 10:44:42'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    772,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 11:25:34',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 11:25:35',
    '2024-06-08 11:25:35'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    773,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 11:29:02',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 11:29:02',
    '2024-06-08 11:29:02'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    774,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 11:35:06',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 11:35:06',
    '2024-06-08 11:35:06'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    775,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 11:41:30',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 11:41:30',
    '2024-06-08 11:41:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    776,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 11:50:58',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 11:50:58',
    '2024-06-08 11:50:58'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    777,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 12:02:34',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 12:02:35',
    '2024-06-08 12:02:35'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    778,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 12:11:52',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 12:11:54',
    '2024-06-08 12:11:54'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    779,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 12:31:16',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 12:31:17',
    '2024-06-08 12:31:17'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    780,
    146,
    'orders',
    'update_order_status',
    '2024-06-08 12:39:28',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 12:39:28',
    '2024-06-08 12:39:28'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    781,
    58,
    'users',
    'login',
    '2024-06-08 14:23:07',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 14:23:08',
    '2024-06-08 14:23:08'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    782,
    1,
    'users',
    'login',
    '2024-06-08 14:56:21',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 14:56:23',
    '2024-06-08 14:56:23'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    783,
    1,
    'users',
    'login',
    '2024-06-08 14:58:43',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 14:58:44',
    '2024-06-08 14:58:44'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    784,
    59,
    'users',
    'login',
    '2024-06-08 15:01:25',
    '{\"email\":\"gor@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 15:01:26',
    '2024-06-08 15:01:26'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    785,
    1,
    'users',
    'login',
    '2024-06-08 15:02:18',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 15:02:19',
    '2024-06-08 15:02:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    786,
    1,
    'users',
    'login',
    '2024-06-08 15:03:23',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 15:03:24',
    '2024-06-08 15:03:24'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    787,
    123,
    'orders',
    'update_order_status',
    '2024-06-08 15:28:14',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 15:28:15',
    '2024-06-08 15:28:15'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    788,
    123,
    'orders',
    'update_order_status',
    '2024-06-08 15:38:30',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 15:38:31',
    '2024-06-08 15:38:31'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    789,
    1,
    'users',
    'login',
    '2024-06-08 15:45:44',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 15:45:45',
    '2024-06-08 15:45:45'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    790,
    123,
    'orders',
    'update_order_status',
    '2024-06-08 15:48:34',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 15:48:35',
    '2024-06-08 15:48:35'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    791,
    119,
    'orders',
    'update_order_status',
    '2024-06-08 15:54:26',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 15:54:27',
    '2024-06-08 15:54:27'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    792,
    120,
    'orders',
    'update_order_status',
    '2024-06-08 15:56:02',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 15:56:03',
    '2024-06-08 15:56:03'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    793,
    112,
    'orders',
    'update_order_status',
    '2024-06-08 16:07:31',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 16:07:32',
    '2024-06-08 16:07:32'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    794,
    1,
    'users',
    'login',
    '2024-06-08 16:11:49',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 16:11:49',
    '2024-06-08 16:11:49'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    795,
    112,
    'orders',
    'update_order_status',
    '2024-06-08 16:13:22',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 16:13:22',
    '2024-06-08 16:13:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    796,
    112,
    'orders',
    'update_order_status',
    '2024-06-08 16:19:32',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 16:19:33',
    '2024-06-08 16:19:33'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    797,
    36,
    'admins',
    'login',
    '2024-06-08 16:36:08',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-08 16:36:10',
    '2024-06-08 16:36:10'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    798,
    36,
    'admins',
    'login',
    '2024-06-08 16:44:51',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-08 16:44:52',
    '2024-06-08 16:44:52'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    799,
    112,
    'orders',
    'update_order_status',
    '2024-06-08 17:12:51',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 17:12:52',
    '2024-06-08 17:12:52'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    800,
    112,
    'orders',
    'update_order_status',
    '2024-06-08 17:44:52',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 17:44:53',
    '2024-06-08 17:44:53'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    801,
    148,
    'orders',
    'update_order_status',
    '2024-06-08 17:48:26',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 17:48:26',
    '2024-06-08 17:48:26'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    802,
    148,
    'orders',
    'update_order_status',
    '2024-06-08 17:54:10',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 17:54:11',
    '2024-06-08 17:54:11'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    803,
    148,
    'orders',
    'update_order_status',
    '2024-06-08 17:56:16',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 17:56:17',
    '2024-06-08 17:56:17'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    804,
    148,
    'orders',
    'update_order_status',
    '2024-06-08 17:56:44',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 17:56:45',
    '2024-06-08 17:56:45'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    805,
    148,
    'orders',
    'update_order_status',
    '2024-06-08 17:57:16',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-08 17:57:16',
    '2024-06-08 17:57:16'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    806,
    1,
    'users',
    'login',
    '2024-06-08 18:09:31',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-08 18:09:32',
    '2024-06-08 18:09:32'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    807,
    1,
    'users',
    'login',
    '2024-06-10 09:48:54',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-10 09:48:56',
    '2024-06-10 09:48:56'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    808,
    1,
    'users',
    'login',
    '2024-06-10 09:55:08',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-10 09:55:09',
    '2024-06-10 09:55:09'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    809,
    54,
    'users',
    'login',
    '2024-06-10 09:55:25',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-10 09:55:25',
    '2024-06-10 09:55:25'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    810,
    148,
    'orders',
    'update_order_status',
    '2024-06-10 10:45:01',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-10 10:45:02',
    '2024-06-10 10:45:02'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    811,
    148,
    'orders',
    'update_order_status',
    '2024-06-10 10:45:52',
    '{\"orderStatus\":\"Processing\",\"email\":\"user2@gmail.com\",\"username\":\"David1\"}',
    '2024-06-10 10:45:52',
    '2024-06-10 10:45:52'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    812,
    36,
    'admins',
    'login',
    '2024-06-10 12:02:26',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-10 12:02:26',
    '2024-06-10 12:02:26'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    813,
    36,
    'admins',
    'login',
    '2024-06-10 14:17:12',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-10 14:17:13',
    '2024-06-10 14:17:13'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    814,
    36,
    'admins',
    'login',
    '2024-06-10 17:17:57',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-10 17:17:59',
    '2024-06-10 17:17:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    815,
    36,
    'admins',
    'login',
    '2024-06-11 09:42:22',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-11 09:42:24',
    '2024-06-11 09:42:24'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    816,
    36,
    'admins',
    'login',
    '2024-06-11 09:43:12',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-11 09:43:12',
    '2024-06-11 09:43:12'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    817,
    1,
    'users',
    'login',
    '2024-06-11 11:21:57',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 11:21:59',
    '2024-06-11 11:21:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    818,
    36,
    'admins',
    'login',
    '2024-06-11 11:29:13',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-11 11:29:14',
    '2024-06-11 11:29:14'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    819,
    1,
    'users',
    'login',
    '2024-06-11 11:37:48',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 11:37:52',
    '2024-06-11 11:37:52'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    820,
    54,
    'users',
    'login',
    '2024-06-11 11:41:10',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-11 11:41:11',
    '2024-06-11 11:41:11'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    821,
    58,
    'users',
    'login',
    '2024-06-11 12:10:45',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 12:10:46',
    '2024-06-11 12:10:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    822,
    59,
    'users',
    'login',
    '2024-06-11 12:10:58',
    '{\"email\":\"gor@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 12:10:58',
    '2024-06-11 12:10:58'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    823,
    54,
    'users',
    'login',
    '2024-06-11 12:50:23',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-11 12:50:23',
    '2024-06-11 12:50:23'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    824,
    36,
    'admins',
    'login',
    '2024-06-11 14:47:28',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-11 14:47:29',
    '2024-06-11 14:47:29'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    825,
    59,
    'users',
    'login',
    '2024-06-11 14:53:18',
    '{\"email\":\"gor@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 14:53:19',
    '2024-06-11 14:53:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    826,
    4,
    'users',
    'login',
    '2024-06-11 15:15:51',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 15:15:52',
    '2024-06-11 15:15:52'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    827,
    1,
    'users',
    'login',
    '2024-06-11 15:34:10',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 15:34:11',
    '2024-06-11 15:34:11'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    828,
    1,
    'users',
    'login',
    '2024-06-11 15:47:37',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 15:47:38',
    '2024-06-11 15:47:38'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    829,
    36,
    'admins',
    'login',
    '2024-06-11 15:48:43',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-11 15:48:44',
    '2024-06-11 15:48:44'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    830,
    36,
    'admins',
    'login',
    '2024-06-11 15:50:35',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-11 15:50:36',
    '2024-06-11 15:50:36'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    831,
    59,
    'users',
    'login',
    '2024-06-11 16:39:11',
    '{\"email\":\"gor@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 16:39:12',
    '2024-06-11 16:39:12'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    832,
    36,
    'admins',
    'login',
    '2024-06-11 16:40:28',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-11 16:40:29',
    '2024-06-11 16:40:29'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    833,
    1,
    'users',
    'login',
    '2024-06-11 17:07:46',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-11 17:07:46',
    '2024-06-11 17:07:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    834,
    36,
    'admins',
    'login',
    '2024-06-11 17:10:32',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-11 17:10:32',
    '2024-06-11 17:10:32'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    835,
    36,
    'admins',
    'login',
    '2024-06-11 17:27:39',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-11 17:27:41',
    '2024-06-11 17:27:41'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    836,
    36,
    'admins',
    'login',
    '2024-06-12 10:02:07',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-12 10:02:09',
    '2024-06-12 10:02:09'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    837,
    1,
    'users',
    'login',
    '2024-06-12 10:14:44',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 10:14:45',
    '2024-06-12 10:14:45'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    838,
    58,
    'users',
    'login',
    '2024-06-12 10:24:19',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 10:24:20',
    '2024-06-12 10:24:20'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    839,
    36,
    'admins',
    'login',
    '2024-06-12 11:07:09',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-12 11:07:10',
    '2024-06-12 11:07:10'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    840,
    58,
    'users',
    'login',
    '2024-06-12 11:15:23',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 11:15:24',
    '2024-06-12 11:15:24'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    841,
    1,
    'users',
    'login',
    '2024-06-12 12:22:34',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 12:22:37',
    '2024-06-12 12:22:37'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    842,
    36,
    'admins',
    'login',
    '2024-06-12 12:33:58',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-12 12:33:59',
    '2024-06-12 12:33:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    843,
    54,
    'users',
    'login',
    '2024-06-12 12:50:51',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-12 12:50:52',
    '2024-06-12 12:50:52'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    844,
    1,
    'users',
    'login',
    '2024-06-12 14:20:35',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 14:20:36',
    '2024-06-12 14:20:36'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    845,
    58,
    'users',
    'login',
    '2024-06-12 14:24:48',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 14:24:48',
    '2024-06-12 14:24:48'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    846,
    1,
    'users',
    'login',
    '2024-06-12 14:30:47',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 14:30:47',
    '2024-06-12 14:30:47'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    847,
    36,
    'admins',
    'login',
    '2024-06-12 14:40:06',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-12 14:40:07',
    '2024-06-12 14:40:07'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    848,
    1,
    'users',
    'login',
    '2024-06-12 14:42:42',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 14:42:42',
    '2024-06-12 14:42:42'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    849,
    1,
    'users',
    'login',
    '2024-06-12 14:49:22',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 14:49:23',
    '2024-06-12 14:49:23'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    850,
    58,
    'users',
    'login',
    '2024-06-12 14:53:37',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 14:53:38',
    '2024-06-12 14:53:38'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    851,
    36,
    'admins',
    'login',
    '2024-06-12 14:58:38',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-12 14:58:38',
    '2024-06-12 14:58:38'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    852,
    58,
    'users',
    'login',
    '2024-06-12 15:17:07',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 15:17:08',
    '2024-06-12 15:17:08'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    853,
    36,
    'admins',
    'login',
    '2024-06-12 15:21:25',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-12 15:21:26',
    '2024-06-12 15:21:26'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    854,
    58,
    'users',
    'login',
    '2024-06-12 15:24:47',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 15:24:49',
    '2024-06-12 15:24:49'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    855,
    36,
    'admins',
    'login',
    '2024-06-12 16:00:23',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-12 16:00:24',
    '2024-06-12 16:00:24'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    856,
    54,
    'users',
    'login',
    '2024-06-12 16:35:39',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-12 16:35:39',
    '2024-06-12 16:35:39'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    857,
    1,
    'users',
    'login',
    '2024-06-12 16:35:53',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 16:35:53',
    '2024-06-12 16:35:53'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    858,
    54,
    'users',
    'login',
    '2024-06-12 16:36:07',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-12 16:36:07',
    '2024-06-12 16:36:07'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    859,
    54,
    'users',
    'login',
    '2024-06-12 16:41:50',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-12 16:41:51',
    '2024-06-12 16:41:51'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    860,
    63,
    'users',
    'login',
    '2024-06-12 16:50:30',
    '{\"email\":\"deojordan@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 16:50:30',
    '2024-06-12 16:50:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    861,
    54,
    'users',
    'login',
    '2024-06-12 16:53:29',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-12 16:53:29',
    '2024-06-12 16:53:29'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    862,
    54,
    'users',
    'login',
    '2024-06-12 16:53:37',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-12 16:53:37',
    '2024-06-12 16:53:37'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    863,
    63,
    'users',
    'login',
    '2024-06-12 16:56:19',
    '{\"email\":\"deojordan@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 16:56:19',
    '2024-06-12 16:56:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    864,
    63,
    'users',
    'login',
    '2024-06-12 17:20:33',
    '{\"email\":\"deojordan@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-12 17:20:35',
    '2024-06-12 17:20:35'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    865,
    54,
    'users',
    'login',
    '2024-06-12 17:28:26',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-12 17:28:29',
    '2024-06-12 17:28:29'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    866,
    36,
    'admins',
    'login',
    '2024-06-12 18:15:09',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-12 18:15:10',
    '2024-06-12 18:15:10'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    867,
    36,
    'admins',
    'login',
    '2024-06-12 18:18:39',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-12 18:18:39',
    '2024-06-12 18:18:39'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    868,
    36,
    'admins',
    'login',
    '2024-06-13 09:45:12',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-13 09:45:15',
    '2024-06-13 09:45:15'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    869,
    36,
    'admins',
    'login',
    '2024-06-13 09:53:22',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-13 09:53:23',
    '2024-06-13 09:53:23'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    870,
    58,
    'users',
    'login',
    '2024-06-13 10:20:38',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-13 10:20:39',
    '2024-06-13 10:20:39'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    873,
    1,
    'users',
    'login',
    '2024-06-13 13:14:23',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-13 13:14:25',
    '2024-06-13 13:14:25'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    874,
    63,
    'users',
    'login',
    '2024-06-13 15:34:45',
    '{\"email\":\"deojordan@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-13 15:34:46',
    '2024-06-13 15:34:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    875,
    54,
    'users',
    'login',
    '2024-06-13 15:34:56',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-13 15:34:56',
    '2024-06-13 15:34:56'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    876,
    58,
    'users',
    'login',
    '2024-06-13 15:43:21',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-13 15:43:25',
    '2024-06-13 15:43:25'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    877,
    63,
    'users',
    'login',
    '2024-06-13 15:54:36',
    '{\"email\":\"deojordan@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-13 15:54:37',
    '2024-06-13 15:54:37'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    878,
    54,
    'users',
    'login',
    '2024-06-13 16:13:56',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-13 16:13:57',
    '2024-06-13 16:13:57'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    879,
    54,
    'users',
    'login',
    '2024-06-13 16:20:49',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-13 16:20:50',
    '2024-06-13 16:20:50'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    880,
    58,
    'users',
    'login',
    '2024-06-13 16:21:09',
    '{\"email\":\"gore@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-13 16:21:09',
    '2024-06-13 16:21:09'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    881,
    4,
    'users',
    'login',
    '2024-06-13 16:52:11',
    '{\"email\":\"user2@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-13 16:52:12',
    '2024-06-13 16:52:12'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    882,
    1,
    'users',
    'login',
    '2024-06-13 16:54:31',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-13 16:54:33',
    '2024-06-13 16:54:33'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    883,
    54,
    'users',
    'login',
    '2024-06-13 17:49:58',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-13 17:49:59',
    '2024-06-13 17:49:59'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    884,
    1,
    'users',
    'login',
    '2024-06-13 18:22:52',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-13 18:22:56',
    '2024-06-13 18:22:56'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    885,
    1,
    'users',
    'login',
    '2024-06-14 09:54:09',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 09:54:11',
    '2024-06-14 09:54:11'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    886,
    1,
    'users',
    'login',
    '2024-06-14 10:01:05',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 10:01:06',
    '2024-06-14 10:01:06'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    887,
    1,
    'users',
    'login',
    '2024-06-14 10:02:30',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 10:02:30',
    '2024-06-14 10:02:30'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    888,
    1,
    'users',
    'login',
    '2024-06-14 10:07:06',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 10:07:06',
    '2024-06-14 10:07:06'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    889,
    36,
    'admins',
    'login',
    '2024-06-14 10:09:45',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-14 10:09:45',
    '2024-06-14 10:09:45'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    890,
    54,
    'users',
    'login',
    '2024-06-14 10:16:14',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-14 10:16:15',
    '2024-06-14 10:16:15'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    891,
    4,
    'orders',
    'create_order',
    '2024-06-14 10:17:55',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-14 10:17:55',
    '2024-06-14 10:17:55'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    892,
    4,
    'orders',
    'create_order',
    '2024-06-14 10:18:08',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-14 10:18:08',
    '2024-06-14 10:18:08'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    893,
    4,
    'orders',
    'create_order',
    '2024-06-14 10:18:34',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-14 10:18:34',
    '2024-06-14 10:18:34'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    894,
    4,
    'orders',
    'create_order',
    '2024-06-14 10:38:19',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-14 10:38:19',
    '2024-06-14 10:38:19'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    895,
    4,
    'orders',
    'create_order',
    '2024-06-14 10:51:21',
    '{\"billingName\":\"John Doe\",\"billingAddress\":\"123 Main St\",\"billingEmail\":\"john.doe@example.com\",\"billingMobileNumber\":\"1234567890\",\"shippingName\":\"John Doe\",\"shippingAddress\":\"123 Main St\",\"shippingEmail\":\"john.doe@example.com\",\"shippingMobileNumber\":\"1234567890\"}',
    '2024-06-14 10:51:23',
    '2024-06-14 10:51:23'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    896,
    1,
    'users',
    'login',
    '2024-06-14 10:55:38',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 10:55:39',
    '2024-06-14 10:55:39'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    897,
    36,
    'admins',
    'login',
    '2024-06-14 11:25:30',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-14 11:25:31',
    '2024-06-14 11:25:31'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    898,
    1,
    'users',
    'login',
    '2024-06-14 11:42:04',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 11:42:04',
    '2024-06-14 11:42:04'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    899,
    1,
    'users',
    'login',
    '2024-06-14 12:01:48',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 12:01:49',
    '2024-06-14 12:01:49'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    900,
    36,
    'admins',
    'login',
    '2024-06-14 12:03:37',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-14 12:03:39',
    '2024-06-14 12:03:39'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    901,
    1,
    'users',
    'login',
    '2024-06-14 12:05:56',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 12:05:56',
    '2024-06-14 12:05:56'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    902,
    54,
    'users',
    'login',
    '2024-06-14 12:47:23',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-14 12:47:24',
    '2024-06-14 12:47:24'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    903,
    54,
    'orders',
    'create_order',
    '2024-06-14 13:00:57',
    '{\"billingName\":\"hello \",\"billingAddress\":\"900 florida\",\"billingEmail\":\"deo@gmail.com\",\"billingMobileNumber\":\"2489916514\",\"shippingName\":\"vishal\",\"shippingAddress\":\"900 florida\",\"shippingEmail\":\"deo@gmail.com\",\"shippingMobileNumber\":\"2489916514\"}',
    '2024-06-14 13:00:58',
    '2024-06-14 13:00:58'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    904,
    54,
    'orders',
    'create_order',
    '2024-06-14 13:06:46',
    '{\"billingName\":\"Supper admin\",\"billingAddress\":\"900 florida\",\"billingEmail\":\"deo@gmail.com\",\"billingMobileNumber\":\"2489916514\",\"shippingName\":\"hello \",\"shippingAddress\":\"900 florida\",\"shippingEmail\":\"deo@gmail.com\",\"shippingMobileNumber\":\"2489916514\"}',
    '2024-06-14 13:06:46',
    '2024-06-14 13:06:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    905,
    54,
    'orders',
    'create_order',
    '2024-06-14 13:08:15',
    '{\"billingName\":\"hello \",\"billingAddress\":\"900 florida\",\"billingEmail\":\"deo@gmail.com\",\"billingMobileNumber\":\"2489916514\",\"shippingName\":\"hello \",\"shippingAddress\":\"900 florida\",\"shippingEmail\":\"deo@gmail.com\",\"shippingMobileNumber\":\"2489916514\"}',
    '2024-06-14 13:08:16',
    '2024-06-14 13:08:16'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    906,
    1,
    'users',
    'login',
    '2024-06-14 13:39:13',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 13:39:14',
    '2024-06-14 13:39:14'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    907,
    63,
    'users',
    'login',
    '2024-06-14 14:00:45',
    '{\"email\":\"deojordan@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 14:00:46',
    '2024-06-14 14:00:46'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    908,
    36,
    'admins',
    'login',
    '2024-06-14 14:38:41',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-14 14:38:42',
    '2024-06-14 14:38:42'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    909,
    54,
    'users',
    'login',
    '2024-06-14 14:52:16',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-14 14:52:17',
    '2024-06-14 14:52:17'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    910,
    1,
    'users',
    'login',
    '2024-06-14 14:53:22',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 14:53:22',
    '2024-06-14 14:53:22'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    911,
    63,
    'users',
    'login',
    '2024-06-14 14:53:43',
    '{\"email\":\"deojordan@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 14:53:43',
    '2024-06-14 14:53:43'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    912,
    54,
    'users',
    'login',
    '2024-06-14 15:11:25',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-14 15:11:25',
    '2024-06-14 15:11:25'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    913,
    54,
    'users',
    'login',
    '2024-06-14 15:13:44',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-14 15:13:44',
    '2024-06-14 15:13:44'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    914,
    63,
    'users',
    'login',
    '2024-06-14 15:20:47',
    '{\"email\":\"deojordan@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 15:20:47',
    '2024-06-14 15:20:47'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    915,
    54,
    'users',
    'login',
    '2024-06-14 15:23:41',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-14 15:23:41',
    '2024-06-14 15:23:41'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    916,
    63,
    'users',
    'login',
    '2024-06-14 15:24:25',
    '{\"email\":\"deojordan@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 15:24:25',
    '2024-06-14 15:24:25'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    917,
    1,
    'users',
    'login',
    '2024-06-14 16:44:48',
    '{\"email\":\"email@gmail.com\",\"ip\":\"::1\"}',
    '2024-06-14 16:44:49',
    '2024-06-14 16:44:49'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    918,
    54,
    'users',
    'login',
    '2024-06-14 17:03:03',
    '{\"email\":\"admin@themesbrand.com\",\"ip\":\"::1\"}',
    '2024-06-14 17:03:04',
    '2024-06-14 17:03:04'
  );
INSERT INTO
  `activity_logs` (
    `log_id`,
    `user_id`,
    `table_name`,
    `activity_type`,
    `timestamp`,
    `details`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    919,
    36,
    'admins',
    'login',
    '2024-06-14 17:50:09',
    '{\"email\":\"abc@auth.com\",\"ip\":\"::1\"}',
    '2024-06-14 17:50:09',
    '2024-06-14 17:50:09'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: admins
# ------------------------------------------------------------

INSERT INTO
  `admins` (
    `admin_id`,
    `email`,
    `password`,
    `first_name`,
    `mobile`,
    `last_name`,
    `role`,
    `is_super_admin`,
    `x_api_key`,
    `token`,
    `token_expire_at`,
    `token_generated_at`,
    `account_status`,
    `email_updated_at`,
    `password_updated_at`,
    `last_login_at`,
    `created_at`,
    `updated_at`,
    `banned_reason`
  )
VALUES
  (
    36,
    'abc@auth.com',
    '$2a$10$tHbhF6QHg5p3JkjclMbHfu2jAYYRpAVoy1MaqvJpRIiFkkBhWonRm',
    'Admin',
    '1234567890',
    'User',
    '1',
    'yes',
    '4525jN7qBXjK',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjozNiwiaXNTdXBlckFkbWluIjoieWVzIiwieEFwaUtleSI6IjQ1MjVqTjdxQlhqSyIsInBlcm1pc3Npb25zIjp7fSwiaWF0IjoxNzE4MzY3NjA5LCJleHAiOjE3MTgzODU2MDl9.rp91hb1cIo0HhYDRZ7DQI1l6Q00jnaZgVtwgoipBZZ4',
    '2024-06-14 22:50:09',
    '2024-06-14 17:50:09',
    'Active',
    NULL,
    NULL,
    '2024-06-14 17:50:09',
    '2024-05-09 17:22:50',
    '2024-06-14 17:50:09',
    NULL
  );
INSERT INTO
  `admins` (
    `admin_id`,
    `email`,
    `password`,
    `first_name`,
    `mobile`,
    `last_name`,
    `role`,
    `is_super_admin`,
    `x_api_key`,
    `token`,
    `token_expire_at`,
    `token_generated_at`,
    `account_status`,
    `email_updated_at`,
    `password_updated_at`,
    `last_login_at`,
    `created_at`,
    `updated_at`,
    `banned_reason`
  )
VALUES
  (
    37,
    'deo@gmail.com',
    '$2a$10$Qr4tVSTCbKO1UupJKrIQyO5dHAy8SjlDzh0qI8gKyzZgkPGvIHMju',
    'John',
    '2489916514',
    'deo',
    '46',
    'no',
    NULL,
    NULL,
    NULL,
    NULL,
    'Active',
    NULL,
    NULL,
    NULL,
    '2024-05-09 18:34:38',
    '2024-05-10 10:50:35',
    ''
  );
INSERT INTO
  `admins` (
    `admin_id`,
    `email`,
    `password`,
    `first_name`,
    `mobile`,
    `last_name`,
    `role`,
    `is_super_admin`,
    `x_api_key`,
    `token`,
    `token_expire_at`,
    `token_generated_at`,
    `account_status`,
    `email_updated_at`,
    `password_updated_at`,
    `last_login_at`,
    `created_at`,
    `updated_at`,
    `banned_reason`
  )
VALUES
  (
    38,
    'john@gmail.com',
    '$2a$10$pW5B6oav3QPdRvTYZ5FdhOh6KpowdkMItv.XsrqQK82tbqwNAHv62',
    'john',
    '1234567891',
    'Michael',
    '5',
    'no',
    'ha68SG1mF8hf',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjozOCwiaXNTdXBlckFkbWluIjoibm8iLCJ4QXBpS2V5IjoiaGE2OFNHMW1GOGhmIiwicGVybWlzc2lvbnMiOnsiUEVSTUlTU0lPTiI6WyJDUkVBVEUiXSwiUk9MRSI6WyJVUERBVEUiXX0sImlhdCI6MTcxNjM2MTU3OCwiZXhwIjoxNzE2Mzc5NTc4fQ.y-22wT1ULciFhaW4h1QttRFxroUs3dw8S1g4C5AB278',
    '2024-05-22 17:36:18',
    '2024-05-22 12:36:18',
    'Active',
    '2024-05-10 12:51:08',
    '2024-05-10 12:51:08',
    '2024-05-22 12:36:18',
    '2024-05-10 10:57:47',
    '2024-05-22 12:36:18',
    NULL
  );
INSERT INTO
  `admins` (
    `admin_id`,
    `email`,
    `password`,
    `first_name`,
    `mobile`,
    `last_name`,
    `role`,
    `is_super_admin`,
    `x_api_key`,
    `token`,
    `token_expire_at`,
    `token_generated_at`,
    `account_status`,
    `email_updated_at`,
    `password_updated_at`,
    `last_login_at`,
    `created_at`,
    `updated_at`,
    `banned_reason`
  )
VALUES
  (
    39,
    'michael@gmail.com',
    '$2a$10$OaszlpoHGp5NX/VJ9OJnCeQ1CVQNPfj6h7gpR7iHrPGj4QjDTaWxe',
    'michael',
    '8888888888',
    'jordan',
    '47',
    'no',
    'Qvhv8rmSSI2E',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjozOSwiaXNTdXBlckFkbWluIjoibm8iLCJ4QXBpS2V5IjoiUXZodjhybVNTSTJFIiwicGVybWlzc2lvbnMiOnsiQURNSU4iOlsiQ1JFQVRFIiwiVVBEQVRFIiwiR0VUIl0sIlBPU1RfVFlQRVMiOlsiR0VUIiwiREVMRVRFIiwiVVBEQVRFIl0sIlNFVFRJTkciOlsiR0VUIiwiQ1JFQVRFIl0sIlBFUk1JU1NJT04iOlsiR0VUIiwiREVMRVRFIl0sIlJPTEUiOlsiR0VUIiwiVVBEQVRFIl0sIlBBWU1FTlRHQVRFV0FZIjpbIkNSRUFURSIsIlVQREFURSJdLCJUUkFOU0FDVElPTiI6WyJDUkVBVEUiXSwiVVNFUiI6WyJHRVQiLCJDUkVBVEUiLCJVUERBVEUiLCJERUxFVEUiXSwiQ09VUE9OIjpbIkdFVCJ',
    '2024-06-06 15:11:40',
    '2024-06-06 10:11:40',
    'Active',
    NULL,
    NULL,
    '2024-06-06 10:11:40',
    '2024-05-10 15:14:29',
    '2024-06-13 12:57:18',
    ''
  );
INSERT INTO
  `admins` (
    `admin_id`,
    `email`,
    `password`,
    `first_name`,
    `mobile`,
    `last_name`,
    `role`,
    `is_super_admin`,
    `x_api_key`,
    `token`,
    `token_expire_at`,
    `token_generated_at`,
    `account_status`,
    `email_updated_at`,
    `password_updated_at`,
    `last_login_at`,
    `created_at`,
    `updated_at`,
    `banned_reason`
  )
VALUES
  (
    40,
    'main@auth.com',
    '$2a$10$KdP9HKQGHRNQQlOWka2npeWOqhPYUjfLo2kLi8HAWl637ETc0JK32',
    'main',
    '1234567890',
    'admin',
    '6',
    'no',
    NULL,
    NULL,
    NULL,
    NULL,
    'Active',
    NULL,
    NULL,
    NULL,
    '2024-05-18 14:54:02',
    '2024-06-13 12:57:20',
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: brands
# ------------------------------------------------------------

INSERT INTO
  `brands` (
    `brand_id`,
    `brand_name`,
    `description`,
    `logo_url`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    'boat',
    'This is an new brand description.',
    'uploads\\temp\\1717059466703.png',
    'Active',
    '2024-05-25 16:14:59',
    '2024-05-30 14:27:56'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categories
# ------------------------------------------------------------

INSERT INTO
  `categories` (
    `category_id`,
    `category_name`,
    `description`,
    `parent_category_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'clothes',
    'child of shopice1',
    0,
    '\\uploads\\categories\\1717073747584.jpeg',
    'InActive',
    '2024-03-28 15:33:09',
    '2024-05-30 18:26:44'
  );
INSERT INTO
  `categories` (
    `category_id`,
    `category_name`,
    `description`,
    `parent_category_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    'electonics',
    'Description of child category',
    0,
    '\\uploads\\categories\\1717073747589.jpeg',
    'Active',
    '2024-03-28 16:35:35',
    '2024-05-30 18:27:07'
  );
INSERT INTO
  `categories` (
    `category_id`,
    `category_name`,
    `description`,
    `parent_category_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    'foods',
    'Description of child category',
    0,
    '\\uploads\\categories\\1717073747643.jpeg',
    'Active',
    '2024-04-02 09:59:51',
    '2024-05-30 18:27:38'
  );
INSERT INTO
  `categories` (
    `category_id`,
    `category_name`,
    `description`,
    `parent_category_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    'Home decore',
    'Description of child category',
    21,
    '\\uploads\\categories\\1717073747646.jpeg',
    'Active',
    '2024-04-02 10:00:19',
    '2024-05-30 18:27:56'
  );
INSERT INTO
  `categories` (
    `category_id`,
    `category_name`,
    `description`,
    `parent_category_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    'child wres',
    'Description of child category',
    1,
    '\\uploads\\categories\\1717073747652.jpeg',
    'Active',
    '2024-04-02 14:24:58',
    '2024-05-30 18:28:12'
  );
INSERT INTO
  `categories` (
    `category_id`,
    `category_name`,
    `description`,
    `parent_category_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    'mobile',
    'Description of child category',
    0,
    '\\uploads\\categories\\1717073928881.jpeg',
    'Active',
    '2024-04-02 16:20:25',
    '2024-05-30 18:29:33'
  );
INSERT INTO
  `categories` (
    `category_id`,
    `category_name`,
    `description`,
    `parent_category_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    'shopice',
    'Description of child category',
    0,
    '\\uploads\\categories\\1717073928884.jpeg',
    'Active',
    '2024-04-02 16:21:24',
    '2024-05-30 18:29:56'
  );
INSERT INTO
  `categories` (
    `category_id`,
    `category_name`,
    `description`,
    `parent_category_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    30,
    'Furniture',
    'Description of child category',
    9,
    '\\uploads\\categories\\1717073928886.jpeg',
    'Active',
    '2024-04-03 12:58:12',
    '2024-06-13 10:55:04'
  );
INSERT INTO
  `categories` (
    `category_id`,
    `category_name`,
    `description`,
    `parent_category_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    31,
    'samsung',
    'Description of child category',
    20,
    '\\uploads\\categories\\1717073928939.jpeg',
    'Active',
    '2024-04-03 12:58:24',
    '2024-05-30 18:30:40'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: contacts
# ------------------------------------------------------------

INSERT INTO
  `contacts` (
    `contact_id`,
    `first_name`,
    `last_name`,
    `email`,
    `mobile`,
    `subject`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    'john',
    'deris',
    'd@gmail.com',
    '9888888851',
    'for clothes',
    'give details for cotten clothes',
    '2024-05-28 16:47:03',
    '2024-05-28 16:47:03'
  );
INSERT INTO
  `contacts` (
    `contact_id`,
    `first_name`,
    `last_name`,
    `email`,
    `mobile`,
    `subject`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    'john',
    'deris',
    'd@gmail.com',
    '9888888851',
    'for clothes',
    'give details for cotten clothes',
    '2024-05-28 16:51:09',
    '2024-05-28 16:51:09'
  );
INSERT INTO
  `contacts` (
    `contact_id`,
    `first_name`,
    `last_name`,
    `email`,
    `mobile`,
    `subject`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    'john',
    'deris',
    'd@gmail.com',
    '9888888851',
    'for clothes',
    'give details for cotten clothes',
    '2024-05-28 17:59:55',
    '2024-05-28 17:59:55'
  );
INSERT INTO
  `contacts` (
    `contact_id`,
    `first_name`,
    `last_name`,
    `email`,
    `mobile`,
    `subject`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    'john',
    'deris',
    'd@gmail.com',
    '9888888851',
    'for clothes',
    'give details for cotten clothes',
    '2024-05-28 18:02:43',
    '2024-05-28 18:02:43'
  );
INSERT INTO
  `contacts` (
    `contact_id`,
    `first_name`,
    `last_name`,
    `email`,
    `mobile`,
    `subject`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    'john',
    'deris',
    'd@gmail.com',
    '9888888851',
    'for clothes',
    'give details for cotten clothes',
    '2024-05-28 18:04:34',
    '2024-05-28 18:04:34'
  );
INSERT INTO
  `contacts` (
    `contact_id`,
    `first_name`,
    `last_name`,
    `email`,
    `mobile`,
    `subject`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    'john',
    'deris',
    'd@gmail.com',
    '9888888851',
    'for clothes',
    'give details for cotten clothes',
    '2024-05-28 18:08:09',
    '2024-05-28 18:08:09'
  );
INSERT INTO
  `contacts` (
    `contact_id`,
    `first_name`,
    `last_name`,
    `email`,
    `mobile`,
    `subject`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    'john',
    'deris',
    'd@gmail.com',
    '9888888851',
    'for clothes',
    'give details for cotten clothes',
    '2024-05-28 18:22:45',
    '2024-05-28 18:22:45'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: coupons
# ------------------------------------------------------------

INSERT INTO
  `coupons` (
    `coupon_id`,
    `coupon_code`,
    `discount_type`,
    `discount_amount`,
    `expiry_date`,
    `is_active`,
    `usage_count`,
    `description`
  )
VALUES
  (
    4,
    'BRIDGE15',
    'Percentage',
    15,
    '2024-06-23 00:00:00',
    1,
    15,
    'Get Flat 15% off'
  );
INSERT INTO
  `coupons` (
    `coupon_id`,
    `coupon_code`,
    `discount_type`,
    `discount_amount`,
    `expiry_date`,
    `is_active`,
    `usage_count`,
    `description`
  )
VALUES
  (
    5,
    'BRIDGE200',
    'Fixed',
    200,
    '2024-05-18 00:00:00',
    0,
    15,
    'Flat 200 $ off'
  );
INSERT INTO
  `coupons` (
    `coupon_id`,
    `coupon_code`,
    `discount_type`,
    `discount_amount`,
    `expiry_date`,
    `is_active`,
    `usage_count`,
    `description`
  )
VALUES
  (
    6,
    'BRIDGE5',
    'Percentage',
    5,
    '2024-05-25 00:00:00',
    1,
    25,
    'Flat 5% off'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: currencies
# ------------------------------------------------------------

INSERT INTO
  `currencies` (
    `currency_id`,
    `currency_code`,
    `currency_name`,
    `symbol`,
    `country`,
    `exchangeRate`,
    `decimalPlaces`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'USD',
    'US Dollar',
    '$',
    'United States',
    1,
    2,
    '2024-06-10 11:31:23',
    NULL
  );
INSERT INTO
  `currencies` (
    `currency_id`,
    `currency_code`,
    `currency_name`,
    `symbol`,
    `country`,
    `exchangeRate`,
    `decimalPlaces`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    'INR',
    'Rupees',
    '₹',
    'India',
    0.012,
    2,
    '2024-06-10 17:11:15',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: dashboard
# ------------------------------------------------------------

INSERT INTO
  `dashboard` (
    `dashboard_id`,
    `today_register`,
    `total_register`,
    `today_active_users`,
    `last_week_active_users`,
    `last_month_active_users`,
    `total_products`,
    `total_categories`,
    `total_sub_categories`,
    `today_order`,
    `total_order`,
    `this_week_order`,
    `total_wishlist`,
    `total_vendors`,
    `pending_vendor_approvals`,
    `total_revenue`
  )
VALUES
  (1, 0, 12, 2, 5, 5, 11, 9, 4, 4, 57, 14, 4, 7, 3, 8836);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: email_templates
# ------------------------------------------------------------

INSERT INTO
  `email_templates` (
    `id`,
    `template_name`,
    `slug`,
    `type`,
    `subject`,
    `body_html`,
    `body_text`,
    `status`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    'Thank You For Your Order',
    'thank-you-for-your-order',
    'order',
    'Thank You For Your Order',
    '<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Thank You For Your Order</title>\n    <style>\n        :root {\n            --background-color: #f9f9f9;\n            --text-color: #333333;\n            --header-background-color: #007bff;\n            --header-text-color: #ffffff;\n            --table-header-color: #f2f2f2;\n            --footer-background-color: #f8f8f8;\n\n            --container-max-width: 600px;\n            --container-padding: 20px;\n            --container-border-radius: 10px;\n            --container-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n            --container-overflow: hidden;\n        }\n\n        body {\n            margin: 0;\n            padding: 0;\n            background-color: var(--background-color);\n            color: var(--text-color);\n            font-size: 16px;\n        }\n\n        .container {\n            max-width: var(--container-max-width);\n            margin: auto;\n            padding: var(--container-padding);\n            border-radius: var(--container-border-radius);\n            box-shadow: var(--container-box-shadow);\n            overflow: var(--container-overflow);\n            background-color: var(--background-color);\n        }\n\n        .header-bg {\n            background-color: var(--header-background-color);\n            color: var(--header-text-color);\n            padding: var(--container-padding);\n            text-align: center;\n            border-top-left-radius: var(--container-border-radius);\n            border-top-right-radius: var(--container-border-radius);\n        }\n\n        .content-bg {\n            padding: var(--container-padding);\n        }\n\n        .section {\n            margin-bottom: 30px;\n        }\n\n        table {\n            width: 100%;\n            border-collapse: collapse;\n            margin-top: 20px;\n        }\n\n        th,\n        td {\n            padding: 12px;\n            border: 1px solid #ddd;\n            text-align: left;\n        }\n\n        th {\n            background-color: var(--table-header-color);\n        }\n\n        .footer {\n            background-color: var(--footer-bg-color);\n            padding: var(--container-padding);\n            text-align: center;\n            border-bottom-left-radius: var(--container-border-radius);\n            border-bottom-right-radius: var(--container-border-radius);\n        }\n\n        @media screen and (max-width: 600px) {\n            body {\n                font-size: 14px;\n            }\n\n            .container {\n                padding: 10px;\n                box-shadow: none;\n            }\n\n            .header-bg,\n            .footer-bg {\n                padding: 15px;\n            }\n\n            .content-bg {\n                padding: 15px;\n            }\n\n            th,\n            td {\n                padding: 10px;\n            }\n\n            .section {\n                margin-bottom: 20px;\n            }\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"header-bg\">\n            <h1>Thank You For Your Order</h1>\n        </div>\n        <div class=\"content-bg\">\n            <div class=\"section order-details\">\n                <h2>Order Details</h2>\n                <table>\n                    <tr>\n                        <th>Order No:</th>\n                        <td>{orderId}</td>\n                    </tr>\n                    <tr>\n                        <th>Order Date:</th>\n                        <td>{orderDate}</td>\n                    </tr>\n                </table>\n            </div>\n            <div class=\"section products\">\n                <h2>Products</h2>\n                <table>\n                    <thead>\n                        <tr>\n                            <th>Product ID</th>\n                            <th>Quantity</th>\n                            <th>Unit Price</th>\n                            <th>Subtotal</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        {orderItems}\n                    </tbody>\n                </table>\n            </div>\n            <div class=\"section order-summary\">\n                <h2>Order Summary</h2>\n                <table>\n                    <tr>\n                        <th>Shipping Address</th>\n                        <td>{shippingAddress}</td>\n                    </tr>\n                    <tr>\n                        <th>Billing Address</th>\n                        <td>{billingAddress}</td>\n                    </tr>\n                    <tr>\n                        <th>Total</th>\n                        <td>{orderAmount}</td>\n                    </tr>\n                </table>\n            </div>\n        </div>\n        <div class=\"footer\">\n            <p>If you need further assistance, please don\'t hesitate to contact us.</p>\n            <p>Best regards,</p>\n            <p>Team</p>\n        </div>\n    </div>\n</body>\n</html>',
    'Thank You For Your Order\nOrder No: {orderId}\nOrder Date: {orderDate}\n\nProducts:\n{orderItems}\n\nOrder Summary:\nShipping Address: {shippingAddress}\nBilling Address: {billingAddress}\nTotal: {orderAmount}\n\nIf you need further assistance, please don\'t hesitate to contact us.\nBest regards,\nTeam',
    'Active',
    'Template for thanking customers for their orders, including order details, product information, and order summary.',
    '2024-05-14 17:47:33',
    '2024-05-29 11:57:54'
  );
INSERT INTO
  `email_templates` (
    `id`,
    `template_name`,
    `slug`,
    `type`,
    `subject`,
    `body_html`,
    `body_text`,
    `status`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    'Shipping Confirmation',
    'shipping-confirmation',
    'order',
    'Your Order Has Been Shipped!',
    '<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Shipping Confirmation</title>\n    <style>\n        :root {\n            /* Color variables */\n            --background-color: #f9f9f9;\n            --text-color: #333333;\n            --heading-color: #333333;\n            --table-header-color: #f2f2f2;\n            --header-background-color: #007bff;\n            --header-text-color: #ffffff;\n            --footer-background-color: #f8f8f8;\n\n            /* Font variables */\n            --font-size: 16px;\n\n            /* Container variables */\n            --container-max-width: 600px;\n            --container-padding: 20px;\n            --container-border-radius: 10px;\n        }\n\n        body {\n            margin: 0;\n            padding: 0;\n            background-color: var(--background-color);\n            color: var(--text-color);\n        }\n\n        .container {\n            width: 100%;\n            max-width: var(--container-max-width);\n            margin: auto;\n            padding: var(--container-padding);\n            border-radius: var(--container-border-radius);\n            background-color: var(--background-color);\n            box-sizing: border-box;\n        }\n\n        .header {\n            background-color: var(--header-background-color);\n            color: var(--header-text-color);\n            padding: var(--container-padding);\n            text-align: center;\n            border-top-left-radius: var(--container-border-radius);\n            border-top-right-radius: var (--container-border-radius);\n        }\n\n        .content {\n            padding: var(--container-padding);\n        }\n\n        .section {\n            margin-bottom: 30px;\n        }\n\n        table {\n            width: 100%;\n            border-collapse: collapse;\n            margin-top: 20px;\n        }\n\n        th,\n        td {\n            padding: 10px;\n            border-bottom: 1px solid #ddd;\n            text-align: left;\n        }\n\n        th {\n            background-color: var(--table-header-color);\n        }\n\n        .footer {\n            background-color: var(--footer-background-color);\n            padding: var(--container-padding);\n            text-align: center;\n            border-bottom-left-radius: var(--container-border-radius);\n            border-bottom-right-radius: var(--container-border-radius);\n        }\n\n        @media screen and (max-width: 600px) {\n            .container {\n                padding: 10px;\n            }\n\n            .header,\n            .footer {\n                padding: 15px;\n            }\n\n            .content {\n                padding: 15px;\n            }\n\n            th,\n            td {\n                padding: 8px;\n            }\n\n            .section {\n                margin-bottom: 20px;\n            }\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"header\">\n            <h2>Shipping Confirmation</h2>\n        </div>\n        <div class=\"content\">\n            <p><strong>Hey {username},</strong></p>\n            <p>We’re super excited for you to get your hands on your new purchase, and we know you’ll love it as much as we do. So, we wanted to drop you a quick note to let you know that your order <strong>{orderId}</strong> is on its way!</p>\n            <p>Here’s a quick reminder of what you ordered:</p>\n            <div class=\"section\">\n                <table>\n                    <thead>\n                        <tr>\n                            <th>Product ID</th>\n                            <th>Quantity</th>\n                            <th>Unit Price</th>\n                            <th>Subtotal</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        {orderItems}\n                    </tbody>\n                </table>\n            </div>\n            <p>And to confirm, it’s being shipped to:</p>\n            <p><strong>{shippingAddress}</strong></p><br>\n            <div>\n                <p>If you need further assistance, please contact us at <a href=\"mailto:support@example.com\"><b>support@example.com</b></a> or call us at <b>123-456-7890</b>.</p>\n            </div>\n        </div>\n        <div class=\"footer\">\n            <p>Thanks again for your support, and enjoy your new purchase!</p>\n            <p><strong>Best wishes,</strong></p>\n            <p>Team</p>\n        </div>\n    </div>\n</body>\n</html>',
    'Hey {username},\n\nWe’re super excited for you to get your hands on your new purchase, and we know you’ll love it as much as we do. So, we wanted to drop you a quick note to let you know that your order {orderId} is on its way!\n\nHere’s a quick reminder of what you ordered:\n\n{orderItems}\n\nAnd to confirm, it’s being shipped to:\n\n{shippingAddress}\n\nIf you need further assistance, please contact us at support@example.com or call us at 123-456-7890.\n\nThanks again for your support, and enjoy your new purchase!\n\nBest wishes,\nTeam',
    'Active',
    'Template for confirming the shipment of an order, including product details and shipping address.',
    '2024-05-14 17:49:01',
    '2024-05-29 12:08:28'
  );
INSERT INTO
  `email_templates` (
    `id`,
    `template_name`,
    `slug`,
    `type`,
    `subject`,
    `body_html`,
    `body_text`,
    `status`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    'Order Status Change Notification',
    'order-status-change-notification',
    'order',
    'Update on Your Order Status',
    '<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Order Status Change Notification</title>\n    <style>\n        :root {\n            --background-color: #f9f9f9;\n            --text-color: #333333;\n            --header-background-color: #007bff;\n            --header-text-color: #ffffff;\n            --table-header-color: #f2f2f2;\n            --footer-background-color: #f8f8f8;\n\n            --container-max-width: 600px;\n            --container-padding: 20px;\n            --container-border-radius: 10px;\n            --container-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n            --container-overflow: hidden;\n        }\n\n        body {\n            margin: 0;\n            padding: 0;\n            background-color: var(--background-color);\n            color: var(--text-color);\n            font-size: 16px;\n        }\n\n        .container {\n            max-width: var(--container-max-width);\n            margin: auto;\n            padding: var(--container-padding);\n            border-radius: var(--container-border-radius);\n            box-shadow: var(--container-box-shadow);\n            overflow: var(--container-overflow);\n            background-color: var(--background-color);\n        }\n\n        .header-bg {\n            background-color: var(--header-background-color);\n            color: var (--header-text-color);\n            padding: var(--container-padding);\n            text-align: center;\n            border-top-left-radius: var(--container-border-radius);\n            border-top-right-radius: var(--container-border-radius);\n        }\n\n        .content-bg {\n            padding: var(--container-padding);\n        }\n\n        .footer-bg {\n            background-color: var(--footer-background-color);\n            padding: var(--container-padding);\n            text-align: center;\n        }\n\n        .padding-20 {\n            padding: 20px;\n        }\n\n        .text-center {\n            text-align: center;\n        }\n\n        .button {\n            display: inline-block;\n            padding: 10px 20px;\n            background-color: var(--header-background-color);\n            color: var(--header-text-color);\n            text-decoration: none;\n            border-radius: 5px;\n            transition: background-color 0.3s ease;\n        }\n\n        .button:hover {\n            background-color: #0056b3;\n        }\n\n        .order-table {\n            width: 100%;\n            border-collapse: collapse;\n            margin-top: 20px;\n        }\n\n        .order-table th,\n        .order-table td {\n            padding: 12px;\n            border: 1px solid #ddd;\n            text-align: left;\n        }\n\n        .order-table th {\n            background-color: var(--table-header-color);\n        }\n\n        @media screen and (max-width: 600px) {\n            .container {\n                padding: 10px;\n            }\n\n            .padding-20 {\n                padding: 10px;\n            }\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"header-bg text-center padding-20\">\n            <h2>Update on Your Order Status</h2>\n        </div>\n        <div class=\"content-bg padding-20\">\n            <p>Hello <strong>{username}</strong>,</p>\n            <p>We hope this email finds you well.</p>\n            <p>We wanted to update you on the status of your recent order No: <strong>{orderId}</strong>, which you placed on <strong>{orderDate}</strong>.</p>\n            <h3>Order Summary:</h3>\n            <table class=\"order-table\">\n                <thead>\n                    <tr>\n                        <th>Product ID</th>\n                        <th>Quantity</th>\n                        <th>Unit Price</th>\n                        <th>Subtotal</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    {orderItems}\n                </tbody>\n            </table>\n            <p>Current Status: <strong>{orderStatus}</strong></p>\n            <p>If you have any questions or concerns regarding this update, please feel free to contact our customer support team at <a href=\"mailto:support@example.com\"><b>support@example.com</b></a> or call us at <b>123-456-7890</b>.</p>\n            <p>We\'re here to assist you every step of the way.</p>\n            <p>Best regards,</p>\n            <p>Team</p>\n        </div>\n        <div class=\"footer-bg text-center padding-20\">\n            <p>If you need further assistance, please don\'t hesitate to contact us.</p>\n            <a href=\"mailto:support@example.com\" class=\"button\">Contact Support</a>\n        </div>\n    </div>\n</body>\n</html>',
    'Hello {username},\n\nWe hope this email finds you well.\n\nWe wanted to update you on the status of your recent order No: {orderId}, which you placed on {orderDate}.\n\nOrder Summary:\n{orderItems}\n\nCurrent Status: {orderStatus}\n\nIf you have any questions or concerns regarding this update, please feel free to contact our customer support team at support@example.com or call us at 123-456-7890.\n\nWe\'re here to assist you every step of the way.\n\nBest regards,\nTeam',
    'inActive',
    'Template for notifying customers about a change in the status of their order.',
    '2024-05-14 17:50:27',
    '2024-05-29 12:04:47'
  );
INSERT INTO
  `email_templates` (
    `id`,
    `template_name`,
    `slug`,
    `type`,
    `subject`,
    `body_html`,
    `body_text`,
    `status`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    'Delivery Confirmation',
    'delivery-confirmation',
    'order',
    'Your Order Has Been Delivered',
    '<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Delivery Confirmation</title>\n    <style>\n        :root {\n            /* Color variables */\n            --background-color: #f9f9f9;\n            --text-color: #333333;\n            --header-bg-color: #007bff;\n            --header-text-color: #ffffff;\n            --content-bg-color: #ffffff;\n            --footer-bg-color: #f8f8f8;\n            --table-header-color: #f2f2f2;\n            --button-bg-color: #007bff;\n            --button-text-color: #ffffff;\n            --button-hover-color: #0056b3;\n\n            /* Other variables */\n            --container-max-width: 600px;\n            --container-padding: 20px;\n            --border-radius: 10px;\n            --box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n        }\n\n        body {\n            margin: 0;\n            padding: 0;\n            font-size: 16px;\n            background-color: var(--background-color);\n            color: var(--text-color);\n        }\n\n        .container {\n            max-width: var(--container-max-width);\n            margin: auto;\n            border-radius: var(--border-radius);\n            box-shadow: var(--box-shadow);\n            background-color: var(--content-bg-color);\n        }\n\n        .header {\n            background-color: var(--header-bg-color);\n            color: var(--header-text-color);\n            padding: var(--container-padding);\n            text-align: center;\n            border-top-left-radius: var(--border-radius);\n            border-top-right-radius: var(--border-radius);\n        }\n\n        .content {\n            padding: var(--container-padding);\n        }\n\n        .footer {\n            background-color: var(--footer-bg-color);\n            padding: var(--container-padding);\n            text-align: center;\n            border-bottom-left-radius: var(--border-radius);\n            border-bottom-right-radius: var(--border-radius);\n        }\n\n        .button {\n            display: inline-block;\n            padding: 10px 20px;\n            background-color: var(--button-bg-color);\n            color: var(--button-text-color);\n            text-decoration: none;\n            border-radius: 5px;\n            transition: background-color 0.3s ease;\n        }\n\n        .button:hover {\n            background-color: var(--button-hover-color);\n        }\n\n        .order-table {\n            width: 100%;\n            border-collapse: collapse;\n            margin-top: 20px;\n        }\n\n        .order-table th,\n        .order-table td {\n            padding: 10px;\n            border: 1px solid #dddddd;\n            text-align: left;\n        }\n\n        .order-table th {\n            background-color: var(--table-header-color);\n        }\n\n        .thank-you {\n            margin-top: 30px;\n            font-style: italic;\n            text-align: center;\n            font-weight: 600;\n            font-size: 20px;\n        }\n\n        @media screen and (max-width: 600px) {\n            .container {\n                border-radius: 0;\n            }\n\n            .header,\n            .footer {\n                padding: 15px;\n            }\n\n            .content {\n                padding: 15px;\n            }\n\n            .order-table th,\n            .order-table td {\n                padding: 8px;\n            }\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"header\">\n            <h2>Delivery Confirmation</h2>\n        </div>\n        <div class=\"content\">\n            <p>Hello <strong>{username}</strong>,</p>\n            <p>We are pleased to inform you that your order has been successfully delivered.</p>\n            <h3>Delivery Details:</h3>\n            <table class=\"order-table\">\n                <thead>\n                    <tr>\n                        <th>Product ID</th>\n                        <th>Quantity</th>\n                        <th>Unit Price</th>\n                        <th>Total</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    {orderItems}\n                </tbody>\n            </table>\n            <p class=\"thank-you\">Thank you for choosing our services!</p>\n        </div>\n        <div class=\"footer\">\n            <p>If you need further assistance, please don\'t hesitate to contact us.</p>\n            <p>Best regards,</p>\n            <p>Team</p>\n            <div>\n                <a href=\"mailto:support@example.com\" class=\"button\">Contact Support</a>\n            </div>\n        </div>\n    </div>\n</body>\n</html>',
    'Hello {username},\n\nWe are pleased to inform you that your order has been successfully delivered.\n\nDelivery Details:\n{orderItems}\n\nThank you for choosing our services!\n\nIf you need further assistance, please don\'t hesitate to contact us.\n\nBest regards,\nTeam',
    'Active',
    'Template for confirming successful delivery of an order.',
    '2024-05-15 14:51:08',
    '2024-05-29 12:07:38'
  );
INSERT INTO
  `email_templates` (
    `id`,
    `template_name`,
    `slug`,
    `type`,
    `subject`,
    `body_html`,
    `body_text`,
    `status`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    14,
    'Contact Us Form Submission',
    'contact-us-form-submission',
    'contact',
    'New Message from Contact Us Form',
    '<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Contact Us Form Submission</title>\n    <style>\n        :root {\n            --background-color: #f9f9f9;\n            --text-color: #333333;\n            --header-bg-color: #007bff;\n            --header-text-color: #ffffff;\n            --container-bg-color: #ffffff;\n            --details-bg-color: #f1f1f1;\n            --container-max-width: 600px;\n            --container-padding: 20px;\n            --border-radius: 8px;\n            --box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);\n        }\n\n        body {\n            background-color: var(--background-color);\n            color: var(--text-color);\n            line-height: 1.6;\n            margin: 0;\n            padding: 0\n        }\n\n        .container {\n            max-width: var(--container-max-width);\n            margin: 20px auto;\n            padding: var(--container-padding);\n            background-color: var(--container-bg-color);\n            border-radius: var(--border-radius);\n            box-shadow: var(--box-shadow);\n            border: 1px solid #ddd;\n        }\n\n        .header {\n            background-color: var(--header-bg-color);\n            color: var(--header-text-color);\n            padding: 15px;\n            text-align: center;\n            border-radius: var(--border-radius) var(--border-radius) 0 0;\n        }\n\n        .header h2 {\n            margin: 0;\n            font-size: 24px;\n        }\n\n        .content {\n            padding: var(--container-padding);\n        }\n\n        .content p {\n            margin: 10px 0;\n        }\n\n        .details {\n            background-color: var(--details-bg-color);\n            padding: 15px;\n            border-radius: var(--border-radius);\n            margin: 20px 0;\n        }\n\n        .details p {\n            margin: 8px 0;\n            line-height: 1.5;\n        }\n\n        .details p strong {\n            color: var(--text-color);\n        }\n\n        .footer {\n            margin-top: 20px;\n            text-align: center;\n            font-size: 12px;\n            color: #777;\n            padding: 10px;\n            border-top: 1px solid #ddd;\n        }\n\n        @media (max-width: 768px) {\n            .container {\n                margin: 10px;\n                padding: 15px;\n            }\n\n            .header h2 {\n                font-size: 20px;\n            }\n\n            .content {\n                padding: 15px;\n            }\n\n            .details {\n                padding: 10px;\n            }\n\n            .footer {\n                padding: 8px;\n            }\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"header\">\n            <h2>Contact Us Form Submission</h2>\n        </div>\n        <div class=\"content\">\n            <p>You have received a new message from the contact us form:</p>\n            <div class=\"details\">\n                <p><strong>First Name:</strong> {firstName}</p>\n                <p><strong>Last Name:</strong> {lastName}</p>\n                <p><strong>Email:</strong> {email}</p>\n                <p><strong>Mobile:</strong> {mobile}</p>\n                <p><strong>Subject:</strong> {subject}</p>\n                <p><strong>Message:</strong></p>\n                <p>{message}</p>\n            </div>\n            <p>Thank you for getting in touch with us. We appreciate you contacting us. One of our colleagues will get back in touch with you soon! Have a great day!</p>\n        </div>\n        <div class=\"footer\">\n            <p>This email was generated automatically. Please do not reply to this email.</p>\n        </div>\n    </div>\n</body>\n</html>',
    'You have received a new message from the contact us form:\n\nFirst Name: {firstName}\nLast Name: {lastName}\nEmail: {email}\nMobile: {mobile}\nSubject: {subject}\nMessage:\n{message}\n\nThank you for getting in touch with us. We appreciate you contacting us. One of our colleagues will get back in touch with you soon! Have a great day!\n\nThis email was generated automatically. Please do not reply to this email.',
    'Active',
    'Template for contact us form submissions.',
    '2024-05-28 17:52:38',
    '2024-06-11 14:42:08'
  );
INSERT INTO
  `email_templates` (
    `id`,
    `template_name`,
    `slug`,
    `type`,
    `subject`,
    `body_html`,
    `body_text`,
    `status`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    'Product Enquiry Template',
    'product-enquiry-template',
    'enquiry',
    'New Product Enquiry',
    '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Product Enquiry</title>\r\n    <style>\r\n        :root {\r\n            --primary-color: #007bff;\r\n            --secondary-color: #ffffff;\r\n            --body-background-color: #f9f9f9;\r\n            --font-color: #333333;\r\n            --font-size: 16px;\r\n            --container-max-width: 600px;\r\n            --container-padding: 20px;\r\n            --container-border-radius: 10px;\r\n            --box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);\r\n        }\r\n\r\n        body {\r\n            background-color: var(--body-background-color);\r\n            margin: 0;\r\n            padding: 0;\r\n            font-size: var(--font-size);\r\n        }\r\n\r\n        .container {\r\n            max-width: var(--container-max-width);\r\n            margin: 20px auto;\r\n            padding: var(--container-padding);\r\n            background-color: var(--secondary-color);\r\n            border-radius: var(--container-border-radius);\r\n            box-shadow: var(--box-shadow);\r\n            border: 1px solid #ddd;\r\n        }\r\n\r\n        .header {\r\n            background-color: var(--primary-color);\r\n            color: var(--secondary-color);\r\n            padding: 15px;\r\n            text-align: center;\r\n            border-radius: var(--container-border-radius) var(--container-border-radius) 0 0;\r\n        }\r\n\r\n        .header h2 {\r\n            margin: 0;\r\n            font-size: 24px;\r\n        }\r\n\r\n        .content {\r\n            padding: var(--container-padding);\r\n        }\r\n\r\n        .details {\r\n            background-color: #f1f1f1;\r\n            padding: 15px;\r\n            border-radius: var(--container-border-radius);\r\n            margin-bottom: 20px;\r\n        }\r\n\r\n        .details p {\r\n            margin: 10px 0;\r\n            line-height: 1.5;\r\n        }\r\n\r\n        .details p strong {\r\n            color: var(--font-color);\r\n        }\r\n\r\n        .footer {\r\n            margin-top: 20px;\r\n            text-align: center;\r\n            font-size: 12px;\r\n            color: #777;\r\n            padding: 10px;\r\n            border-top: 1px solid #ddd;\r\n        }\r\n\r\n        @media (max-width: 600px) {\r\n            .container {\r\n                padding: 10px;\r\n                box-shadow: none;\r\n                border: none;\r\n            }\r\n\r\n            .header, .content, .details, .footer {\r\n                padding: 10px;\r\n            }\r\n\r\n            .header h2 {\r\n                font-size: 20px;\r\n            }\r\n\r\n            .details p {\r\n                margin: 5px 0;\r\n                font-size: 14px;\r\n            }\r\n\r\n            .footer {\r\n                font-size: 10px;\r\n            }\r\n        }\r\n    </style>\r\n</head>\r\n<body>\r\n    <div class=\"container\">\r\n        <div class=\"header\">\r\n            <h2>Product Enquiry</h2>\r\n        </div>\r\n        <div class=\"content\">\r\n            <p>You have received a new enquiry for the following product:</p>\r\n            <div class=\"details\">\r\n                <p><strong>Product Name:</strong> {productName}</p>\r\n                <p><strong>Product ID:</strong> {productId}</p>\r\n                <p><strong>Enquiry Date:</strong> {enquiryDate}</p>\r\n                <p><strong>User Name:</strong> {enquirerName}</p>\r\n                <p><strong>User Email:</strong> {enquirerEmail}</p>\r\n                <p><strong>Enquiry:</strong></p>\r\n                <p>{message}</p>\r\n            </div>\r\n            <p>Please take necessary actions to respond to this enquiry.</p>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <p>This email was generated automatically. Please do not reply to this email.</p>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>',
    'You have received a new enquiry for the following product:\n\nProduct Name: {productName}\nProduct ID: {productId}\nProduct Description: {productDescription}\nEnquiry Date: {enquiryDate}\nUser Name: {enquirerName}\nUser Email: {enquirerEmail}\nVendor Name: {vendorName}\nEnquiry: {message}\n\nPlease take necessary actions to respond to this enquiry.\n\nThis email was generated automatically. Please do not reply to this email.',
    'Active',
    'Template for product enquiry emails',
    '2024-06-11 14:47:47',
    '2024-06-11 14:56:06'
  );
INSERT INTO
  `email_templates` (
    `id`,
    `template_name`,
    `slug`,
    `type`,
    `subject`,
    `body_html`,
    `body_text`,
    `status`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    'Vendor Registration Verification',
    'vendor-registration-verification',
    'registration',
    'Vendor Registration Verification Email',
    '<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Vendor Registration Verification</title><style>/* Reset styles */body, h1, h2, h3, h4, h5, h6, p, ul, ol, li, figure, figcaption, blockquote, dl, dd, dt {margin: 0;padding: 0;}:root {--primary-color: #007bff;--secondary-color: #ffffff;--body-background-color: #f8f9fa;--text-color: #333333;--btn-background-color: #0056b3;--btn-hover-background-color: #004080;--footer-text-color: #666666;--link-color: #007bff;--link-hover-color: #0056b3;--container-max-width: 600px;--container-padding: 30px;--container-border-radius: 10px;--box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);}body {line-height: 1.6;background-color: var(--body-background-color);padding: 20px;margin: 0;}.container {max-width: var(--container-max-width);margin: auto;background: var(--secondary-color);padding: var(--container-padding);border-radius: var(--container-border-radius);box-shadow: var(--box-shadow);}.header {background-color: var(--primary-color);color: var(--secondary-color);text-align: center;padding: 20px;border-radius: var(--container-border-radius) var(--container-border-radius) 0 0;}.header h2 {font-size: 28px;margin: 0;}.content {padding: 20px 0;}.content p {color: var(--text-color);font-size: 18px;line-height: 1.8;margin-bottom: 15px;}.btn {display: inline-block;background-color: var(--btn-background-color);color: var(--secondary-color);text-decoration: none;padding: 12px 24px;border-radius: 5px;transition: background-color 0.3s;font-size: 18px;align-items: center;justify-content: center;text-align: center;}.btn:hover {background-color: var(--btn-hover-background-color);}.footer {margin-top: 30px;font-size: 14px;color: var(--footer-text-color);text-align: center;}.footer a {color: var(--link-color);text-decoration: none;}.footer a:hover {color: var(--link-hover-color);}@media (max-width: 600px) {.container {padding: 20px;}.header {border-radius: var(--container-border-radius) var(--container-border-radius) 0 0;}.btn {padding: 10px 20px;font-size: 16px;}}</style></head><body><div class=\"container\"><div class=\"header\"><h2>Welcome to Code Bridge!</h2></div><div class=\"content\"><p>Dear {Vendor Name},</p><p>Thank you for registering with us. To complete your registration, please click the button below to verify your account:</p><p><a href=\"{VERIFY_ACCOUNT_URL}\" class=\"btn\">Verify Account</a></p><p>If you have any questions, feel free to <a href=\"mailto:support@yourcompany.com\">contact us</a>.</p></div><div class=\"footer\"><p>Best regards,<br>Code Bridge Team<br>Need help? <a href=\"mailto:support@yourcompany.com\">Contact Support</a></p></div></div></body></html>',
    'Dear {Vendor Name},\n\nThank you for registering with us. To complete your registration, please click the button below to verify your account:\n\n{VERIFY_ACCOUNT_URL}\n\nIf you have any questions, feel free to contact us at support@yourcompany.com.\n\nBest regards,\nCode Bridge Team',
    'Active',
    'Template for vendor registration verification email',
    '2024-06-14 12:05:27',
    '2024-06-14 12:05:27'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: enquiries
# ------------------------------------------------------------

INSERT INTO
  `enquiries` (
    `enquiry_id`,
    `product_id`,
    `user_id`,
    `subject`,
    `enquirer_name`,
    `enquirer_email`,
    `message`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    163,
    59,
    'Product Enquiry',
    'John Doe',
    'johndoe@example.com',
    'I would like to inquire about the availability of this product.',
    'Pending',
    '2024-06-11 12:56:26',
    NULL
  );
INSERT INTO
  `enquiries` (
    `enquiry_id`,
    `product_id`,
    `user_id`,
    `subject`,
    `enquirer_name`,
    `enquirer_email`,
    `message`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    163,
    59,
    'Product Enquiry',
    'John Doe',
    'johndoe@example.com',
    'I would like to inquire about the availability of this product.',
    'Pending',
    '2024-06-11 13:00:21',
    NULL
  );
INSERT INTO
  `enquiries` (
    `enquiry_id`,
    `product_id`,
    `user_id`,
    `subject`,
    `enquirer_name`,
    `enquirer_email`,
    `message`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    163,
    59,
    'Product Enquiry',
    'John Doe',
    'johndoe@example.com',
    'I would like to inquire about the availability of this product.',
    'Pending',
    '2024-06-11 13:04:41',
    NULL
  );
INSERT INTO
  `enquiries` (
    `enquiry_id`,
    `product_id`,
    `user_id`,
    `subject`,
    `enquirer_name`,
    `enquirer_email`,
    `message`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    163,
    59,
    'Product Enquiry',
    'John Doe',
    'johndoe@example.com',
    'I would like to inquire about the availability of this product.',
    'Pending',
    '2024-06-11 14:53:30',
    NULL
  );
INSERT INTO
  `enquiries` (
    `enquiry_id`,
    `product_id`,
    `user_id`,
    `subject`,
    `enquirer_name`,
    `enquirer_email`,
    `message`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    185,
    59,
    'Product Enquiry',
    'John Doe',
    'johndoe@example.com',
    'I would like to inquire about the availability of this product.',
    'Pending',
    '2024-06-11 14:56:19',
    NULL
  );
INSERT INTO
  `enquiries` (
    `enquiry_id`,
    `product_id`,
    `user_id`,
    `subject`,
    `enquirer_name`,
    `enquirer_email`,
    `message`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    163,
    54,
    'test',
    'michael test',
    'michael123@gmail.com',
    'test message',
    'Pending',
    '2024-06-14 12:58:55',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: hero_slider
# ------------------------------------------------------------

INSERT INTO
  `hero_slider` (
    `hero_slider_id`,
    `image_url`,
    `banner_title`,
    `banner_description`,
    `banner_button_text`,
    `banner_button_link`,
    `order`,
    `is_active`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    'uploads\\temp\\1717132464009.jpg',
    'THE WOLMART ONLINE STORE',
    'UP TO 30 % OFF',
    'SHOP NOW',
    'https://d-themes.com/wordpress/wolmart/demo-25/shop/',
    1,
    1,
    '2024-05-24 17:37:59',
    '2024-05-31 10:45:36'
  );
INSERT INTO
  `hero_slider` (
    `hero_slider_id`,
    `image_url`,
    `banner_title`,
    `banner_description`,
    `banner_button_text`,
    `banner_button_link`,
    `order`,
    `is_active`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    'uploads\\temp\\1717132607795.jpg',
    'BUILD YOUR LOOK EXPLORETHE BEST',
    'UP TO 40 % OFF',
    'SHOP NOW',
    'https://d-themes.com/wordpress/wolmart/demo-18/',
    2,
    1,
    '2024-05-24 17:39:26',
    '2024-05-31 10:47:34'
  );
INSERT INTO
  `hero_slider` (
    `hero_slider_id`,
    `image_url`,
    `banner_title`,
    `banner_description`,
    `banner_button_text`,
    `banner_button_link`,
    `order`,
    `is_active`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    'uploads\\temp\\1717132464054.png',
    'THE WOMEN ONLINE STORE',
    'SESSION FASHION COLLECTION',
    'DISCOVER NOW',
    'https://d-themes.com/wordpress/wolmart/demo-10/',
    3,
    1,
    '2024-05-24 17:40:48',
    '2024-06-13 12:55:30'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: notifications
# ------------------------------------------------------------

INSERT INTO
  `notifications` (
    `notification_id`,
    `user_id`,
    `title`,
    `image`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    NULL,
    'hello',
    '',
    'myy',
    '2024-05-11 10:08:06',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: order_items
# ------------------------------------------------------------

INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    163,
    1,
    98,
    98,
    '2024-05-16 17:56:57',
    '2024-05-24 15:53:19'
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (241, 104, 163, 1, 98, 98, '2024-05-16 18:01:28', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (242, 105, 163, 1, 98, 98, '2024-05-16 18:15:23', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (243, 106, 163, 1, 98, 98, '2024-05-16 18:19:43', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (244, 107, 163, 1, 98, 98, '2024-05-16 18:24:46', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (247, 110, 163, 1, 98, 98, '2024-05-23 18:14:53', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (248, 66, 185, 1, 50, 50, '2024-05-23 18:30:12', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (259, 112, 163, 2, 98, 196, '2024-05-24 18:33:07', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (261, 113, 163, 2, 98, 196, '2024-05-25 10:08:34', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (265, 114, 163, 2, 98, 196, '2024-05-25 10:16:39', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (266, 114, 185, 1, 50, 50, '2024-05-25 10:16:39', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    267,
    115,
    224,
    3,
    1000,
    3000,
    '2024-05-29 16:38:47',
    '2024-05-30 11:32:15'
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    268,
    116,
    222,
    3,
    1000,
    3000,
    '2024-05-29 17:02:03',
    '2024-05-30 11:32:46'
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    269,
    117,
    222,
    3,
    1000,
    3000,
    '2024-05-29 17:03:22',
    '2024-05-30 11:31:28'
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    270,
    118,
    235,
    1,
    1000,
    1000,
    '2024-05-29 17:18:41',
    '2024-06-06 11:18:56'
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (271, 119, 163, 1, 98, 98, '2024-06-06 15:06:09', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (272, 119, 185, 2, 50, 100, '2024-06-06 15:06:09', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    273,
    119,
    207,
    1,
    15000,
    15000,
    '2024-06-06 15:06:09',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (274, 120, 163, 1, 98, 98, '2024-06-06 15:08:07', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (275, 120, 185, 2, 50, 100, '2024-06-06 15:08:07', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    276,
    120,
    207,
    1,
    15000,
    15000,
    '2024-06-06 15:08:07',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (277, 121, 163, 1, 98, 98, '2024-06-06 15:12:19', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (278, 121, 185, 2, 50, 100, '2024-06-06 15:12:19', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    279,
    121,
    207,
    1,
    15000,
    15000,
    '2024-06-06 15:12:19',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (280, 122, 163, 1, 98, 98, '2024-06-06 15:20:40', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (281, 122, 185, 2, 50, 100, '2024-06-06 15:20:40', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    282,
    122,
    235,
    1,
    1000,
    1000,
    '2024-06-06 15:20:40',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (283, 123, 163, 1, 98, 98, '2024-06-06 15:22:13', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (284, 123, 185, 2, 50, 100, '2024-06-06 15:22:13', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    285,
    123,
    235,
    1,
    1000,
    1000,
    '2024-06-06 15:22:13',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (286, 124, 163, 1, 98, 98, '2024-06-06 15:28:53', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (287, 124, 185, 2, 50, 100, '2024-06-06 15:28:53', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    288,
    124,
    235,
    1,
    1000,
    1000,
    '2024-06-06 15:28:53',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (289, 125, 163, 1, 98, 98, '2024-06-06 15:30:26', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    290,
    125,
    235,
    1,
    1000,
    1000,
    '2024-06-06 15:30:26',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (291, 125, 185, 2, 50, 100, '2024-06-06 15:30:26', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (295, 127, 185, 2, 50, 100, '2024-06-06 15:47:01', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    296,
    127,
    235,
    1,
    1000,
    1000,
    '2024-06-06 15:47:01',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (297, 128, 185, 2, 50, 100, '2024-06-06 15:48:21', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    298,
    128,
    235,
    1,
    1000,
    1000,
    '2024-06-06 15:48:21',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (299, 129, 185, 2, 50, 100, '2024-06-06 15:56:33', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    300,
    129,
    235,
    1,
    1000,
    1000,
    '2024-06-06 15:56:33',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (301, 130, 185, 2, 50, 100, '2024-06-06 17:25:24', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    302,
    130,
    235,
    1,
    1000,
    1000,
    '2024-06-06 17:25:24',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (303, 131, 185, 2, 50, 100, '2024-06-06 17:28:29', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    304,
    131,
    235,
    1,
    1000,
    1000,
    '2024-06-06 17:28:29',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (305, 133, 185, 2, 50, 100, '2024-06-06 17:42:44', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    306,
    133,
    235,
    1,
    1000,
    1000,
    '2024-06-06 17:42:44',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (307, 134, 185, 2, 50, 100, '2024-06-06 17:44:59', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    308,
    134,
    235,
    1,
    1000,
    1000,
    '2024-06-06 17:44:59',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (309, 135, 185, 2, 50, 100, '2024-06-06 17:48:19', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    310,
    135,
    235,
    1,
    1000,
    1000,
    '2024-06-06 17:48:19',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (311, 136, 185, 2, 50, 100, '2024-06-06 18:00:28', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    312,
    136,
    235,
    1,
    1000,
    1000,
    '2024-06-06 18:00:28',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (313, 137, 185, 2, 50, 100, '2024-06-06 18:01:58', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    314,
    137,
    235,
    1,
    1000,
    1000,
    '2024-06-06 18:01:58',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (315, 138, 185, 2, 50, 100, '2024-06-06 18:14:28', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    316,
    138,
    235,
    1,
    1000,
    1000,
    '2024-06-06 18:14:28',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (317, 139, 185, 2, 50, 100, '2024-06-06 18:17:14', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    318,
    139,
    235,
    1,
    1000,
    1000,
    '2024-06-06 18:17:14',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (319, 140, 185, 2, 50, 100, '2024-06-07 11:05:27', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    320,
    140,
    235,
    1,
    1000,
    1000,
    '2024-06-07 11:05:27',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (321, 141, 185, 2, 50, 100, '2024-06-07 11:06:29', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    322,
    141,
    235,
    1,
    1000,
    1000,
    '2024-06-07 11:06:29',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (323, 142, 185, 2, 50, 100, '2024-06-07 11:11:31', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    324,
    142,
    235,
    1,
    1000,
    1000,
    '2024-06-07 11:11:31',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (325, 143, 185, 2, 50, 100, '2024-06-07 11:11:51', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    326,
    143,
    235,
    1,
    1000,
    1000,
    '2024-06-07 11:11:51',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (327, 144, 185, 2, 50, 100, '2024-06-07 15:01:38', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    328,
    144,
    235,
    1,
    1000,
    1000,
    '2024-06-07 15:01:38',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (329, 145, 185, 2, 50, 100, '2024-06-07 15:04:58', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    330,
    145,
    235,
    1,
    1000,
    1000,
    '2024-06-07 15:04:58',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (331, 146, 185, 2, 50, 100, '2024-06-07 15:06:00', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    332,
    146,
    235,
    1,
    1000,
    1000,
    '2024-06-07 15:06:00',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (335, 148, 185, 2, 50, 100, '2024-06-07 16:15:45', NULL);
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    336,
    148,
    236,
    1,
    1000,
    1000,
    '2024-06-06 16:15:45',
    '2024-06-12 11:32:40'
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    337,
    149,
    235,
    1,
    1000,
    1000,
    '2024-06-13 12:10:10',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    338,
    150,
    235,
    1,
    1000,
    1000,
    '2024-06-14 10:17:55',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    343,
    152,
    235,
    2,
    1000,
    2000,
    '2024-06-14 10:24:40',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    344,
    152,
    239,
    1,
    19.99,
    19.99,
    '2024-06-14 10:24:40',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    347,
    151,
    235,
    2,
    1000,
    2000,
    '2024-06-14 10:36:13',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    348,
    151,
    239,
    1,
    19.99,
    19.99,
    '2024-06-14 10:36:13',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    354,
    153,
    235,
    2,
    1000,
    2000,
    '2024-06-14 10:49:18',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    355,
    153,
    239,
    1,
    19.99,
    19.99,
    '2024-06-14 10:49:18',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    356,
    126,
    235,
    2,
    1000,
    2000,
    '2024-06-14 10:50:15',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    357,
    126,
    239,
    1,
    19.99,
    19.99,
    '2024-06-14 10:50:15',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    360,
    154,
    235,
    2,
    1000,
    2000,
    '2024-06-14 10:51:57',
    NULL
  );
INSERT INTO
  `order_items` (
    `order_item_id`,
    `order_id`,
    `product_id`,
    `quantity`,
    `unit_price`,
    `subtotal`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    361,
    154,
    239,
    1,
    19.99,
    19.99,
    '2024-06-14 10:51:57',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: orders
# ------------------------------------------------------------

INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    1,
    1,
    '2024-04-10 14:57:32',
    100,
    'Delivered',
    '2024-04-10 14:57:32',
    '2024-05-31 11:41:16',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '2024-05-06 11:41:14'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    2,
    4,
    '2024-04-11 07:10:08',
    294,
    'Cancelled',
    '2024-04-11 07:10:08',
    '2024-05-09 14:29:40',
    'ghevariya',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    'ttttt',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    3,
    4,
    '2024-04-11 11:11:14',
    294,
    'Processing',
    '2024-04-11 11:11:14',
    '2024-05-09 14:28:21',
    'ghevariya',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    'ttttt',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    4,
    1,
    '2024-04-11 11:11:43',
    294,
    'Cancelled',
    '2024-04-11 11:11:43',
    '2024-05-31 18:22:22',
    'Updated Billing Name',
    '456 Updated Main St',
    'updated_email@example.com',
    '123-456-7890',
    'Updated Shipping Name',
    '456 Updated Main St',
    'updated_shipping@example.com',
    '123-456-7890',
    NULL,
    '2024-05-31 18:22:22'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    6,
    1,
    '2024-04-11 14:39:33',
    40,
    'Cancelled',
    '2024-04-11 14:39:33',
    '2024-05-09 14:28:59',
    'John Doe',
    '123 Main St',
    'john@example.com',
    '1234567890',
    'Jane Doe',
    '456 Elm St',
    'jane@example.com',
    '9876543210',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    7,
    1,
    '2024-04-11 14:40:45',
    40,
    'Delivered',
    '2024-04-11 14:40:45',
    '2024-05-31 11:41:05',
    'John Doe',
    '123 Main St',
    'john@example.com',
    '1234567890',
    'Jane Doe',
    '456 Elm St',
    'jane@example.com',
    '9876543210',
    NULL,
    '2024-05-31 11:41:01'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    11,
    4,
    '2024-04-11 16:00:43',
    490,
    'Shipped',
    '2024-04-11 16:00:43',
    '2024-05-09 14:27:31',
    'John Doe',
    '123 Main St',
    'john@example.com',
    '123-456-7890',
    'bansi',
    '123 Main St',
    'bansi@example.com',
    '123-456-7890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    19,
    4,
    '2024-04-12 14:11:47',
    50,
    'Processing',
    '2024-04-12 14:11:47',
    '2024-05-09 14:28:47',
    'John Doe',
    '123 Main St',
    'john@example.com',
    '123-456-7890',
    'bansi',
    '123 Main St',
    'bansi@example.com',
    '123-456-7890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    66,
    4,
    '2024-04-27 11:16:47',
    254,
    'Pending',
    '2024-04-27 11:16:47',
    '2024-04-27 11:16:47',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    104,
    4,
    '2024-05-16 18:01:27',
    1,
    'Pending',
    '2024-05-16 18:01:27',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE200',
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    105,
    4,
    '2024-05-16 18:15:22',
    1,
    'Pending',
    '2024-05-16 18:15:22',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE200',
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    106,
    4,
    '2024-05-16 18:19:43',
    1,
    'Cancelled',
    '2024-05-16 18:19:43',
    '2024-05-18 10:35:51',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE200',
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    107,
    4,
    '2024-05-16 18:24:46',
    1,
    'Cancelled',
    '2024-05-16 18:24:46',
    '2024-05-17 16:43:56',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE200',
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    108,
    4,
    '2024-05-23 18:11:03',
    98,
    'Pending',
    '2024-05-23 18:11:03',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE',
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    109,
    4,
    '2024-05-23 18:13:05',
    98,
    'Pending',
    '2024-05-23 18:13:05',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE',
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    110,
    4,
    '2024-05-23 18:14:53',
    98,
    'Pending',
    '2024-05-23 18:14:53',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE',
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    112,
    4,
    '2024-05-24 18:04:01',
    196,
    'Processing',
    '2024-05-24 18:04:01',
    '2024-06-08 16:04:00',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-08 16:04:00'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    113,
    4,
    '2024-05-25 09:55:14',
    196,
    'Pending',
    '2024-05-25 09:55:14',
    '2024-05-25 10:08:34',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    114,
    54,
    '2024-05-25 10:13:17',
    246,
    'Delivered',
    '2024-05-25 10:13:17',
    '2024-06-08 10:35:39',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-08 10:35:39'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    115,
    1,
    '2024-05-29 16:38:46',
    3000,
    'Pending',
    '2024-05-29 16:38:46',
    NULL,
    'hello ',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    'hello ',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    116,
    1,
    '2024-05-29 17:02:03',
    3000,
    'Pending',
    '2024-05-29 17:02:03',
    NULL,
    'hello ',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    'hello ',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    117,
    1,
    '2024-05-29 17:03:22',
    3000,
    'Delivered',
    '2024-06-29 17:03:22',
    '2024-06-01 10:18:17',
    'hello ',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    'vishal',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    NULL,
    '2024-06-01 10:18:17'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    118,
    1,
    '2024-05-29 17:18:41',
    1000,
    'Cancelled',
    '2024-05-06 17:18:41',
    '2024-06-01 10:17:57',
    'hello ',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    'hello ',
    '900 florida',
    'deo@gmail.com',
    '2489916514',
    NULL,
    '2024-06-01 10:17:57'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    119,
    4,
    '2024-06-06 15:06:09',
    15198,
    'Processing',
    '2024-06-06 15:06:09',
    '2024-06-08 15:54:24',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-08 15:54:24'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    120,
    4,
    '2024-06-06 15:08:06',
    15198,
    'Processing',
    '2024-06-06 15:08:06',
    '2024-06-08 15:55:59',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-08 15:55:59'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    121,
    4,
    '2024-06-06 15:12:19',
    15198,
    'Pending',
    '2024-06-06 15:12:19',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    122,
    4,
    '2024-06-06 15:20:39',
    1198,
    'Pending',
    '2024-06-06 15:20:39',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    123,
    4,
    '2024-06-06 15:22:13',
    1198,
    'Processing',
    '2024-06-06 15:22:13',
    '2024-06-08 15:21:43',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-08 15:21:43'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    124,
    4,
    '2024-06-06 15:28:53',
    1198,
    'Pending',
    '2024-06-06 15:28:53',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    125,
    4,
    '2024-06-06 15:30:26',
    1198,
    'Pending',
    '2024-06-06 15:30:26',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    126,
    4,
    '2024-06-06 15:40:54',
    2019.99,
    'Pending',
    '2024-06-06 15:40:54',
    '2024-06-14 10:50:15',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-14 10:50:15'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    127,
    4,
    '2024-06-06 15:47:01',
    1100,
    'Pending',
    '2024-06-06 15:47:01',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    128,
    4,
    '2024-06-06 15:48:21',
    1100,
    'Pending',
    '2024-06-06 15:48:21',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    129,
    4,
    '2024-06-06 15:56:33',
    1100,
    'Pending',
    '2024-06-06 15:56:33',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    130,
    4,
    '2024-06-06 17:25:24',
    1100,
    'Pending',
    '2024-06-06 17:25:24',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    131,
    4,
    '2024-06-06 17:28:29',
    1100,
    'Pending',
    '2024-06-06 17:28:29',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    132,
    4,
    '2024-06-06 17:39:50',
    1100,
    'Pending',
    '2024-06-06 17:39:50',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    133,
    4,
    '2024-06-06 17:42:44',
    1100,
    'Pending',
    '2024-06-06 17:42:44',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    134,
    4,
    '2024-06-06 17:44:59',
    1100,
    'Pending',
    '2024-06-06 17:44:59',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    135,
    4,
    '2024-06-06 17:48:19',
    1100,
    'Pending',
    '2024-06-06 17:48:19',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    136,
    4,
    '2024-06-06 18:00:28',
    1100,
    'Pending',
    '2024-06-06 18:00:28',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    137,
    4,
    '2024-06-06 18:01:58',
    1100,
    'Pending',
    '2024-06-06 18:01:58',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    138,
    4,
    '2024-06-06 18:14:28',
    1100,
    'Pending',
    '2024-06-06 18:14:28',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    139,
    4,
    '2024-06-06 18:17:14',
    1100,
    'Pending',
    '2024-06-06 18:17:14',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    140,
    4,
    '2024-06-07 11:05:26',
    1100,
    'Pending',
    '2024-06-07 11:05:26',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    141,
    4,
    '2024-06-07 11:06:29',
    1100,
    'Pending',
    '2024-06-07 11:06:29',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    142,
    4,
    '2024-06-07 11:11:31',
    1100,
    'Pending',
    '2024-06-07 11:11:31',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    143,
    4,
    '2024-06-07 11:11:51',
    1100,
    'Pending',
    '2024-06-07 11:11:51',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    144,
    4,
    '2024-06-07 15:01:37',
    1100,
    'Pending',
    '2024-06-07 15:01:37',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    145,
    4,
    '2024-06-07 15:04:58',
    1100,
    'Pending',
    '2024-06-07 15:04:58',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    146,
    4,
    '2024-06-07 15:06:00',
    1100,
    'Processing',
    '2024-06-07 15:06:00',
    '2024-06-07 15:55:03',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-07 15:55:03'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    148,
    4,
    '2024-06-07 16:15:45',
    935,
    'Processing',
    '2024-06-07 16:15:45',
    '2024-06-13 12:13:40',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE15',
    '2024-06-13 12:13:40'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    149,
    4,
    '2024-06-13 12:10:10',
    850,
    'Pending',
    '2024-06-13 12:10:10',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE15',
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    150,
    4,
    '2024-06-14 10:17:55',
    850,
    'Pending',
    '2024-06-14 10:17:55',
    NULL,
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'BRIDGE15',
    NULL
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    151,
    4,
    '2024-06-14 10:18:07',
    2019.99,
    'Pending',
    '2024-06-14 10:18:07',
    '2024-06-14 10:36:13',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-14 10:36:13'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    152,
    4,
    '2024-06-14 10:18:32',
    2019.99,
    'Pending',
    '2024-06-14 10:18:32',
    '2024-06-14 10:24:41',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-14 10:24:41'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    153,
    4,
    '2024-06-14 10:38:18',
    2019.99,
    'Pending',
    '2024-06-14 10:38:18',
    '2024-06-14 10:45:44',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-14 10:45:44'
  );
INSERT INTO
  `orders` (
    `order_id`,
    `customer_id`,
    `order_date`,
    `order_amount`,
    `order_status`,
    `created_at`,
    `updated_at`,
    `billing_name`,
    `billing_address`,
    `billing_email`,
    `billing_mobile_number`,
    `shipping_name`,
    `shipping_address`,
    `shipping_email`,
    `shipping_mobile_number`,
    `coupon_code`,
    `delivery_date`
  )
VALUES
  (
    154,
    4,
    '2024-06-14 10:51:21',
    2019.99,
    'Pending',
    '2024-06-14 10:51:21',
    '2024-06-14 10:51:57',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    'John Doe',
    '123 Main St',
    'john.doe@example.com',
    '1234567890',
    NULL,
    '2024-06-14 10:51:57'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: otps
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: payment_gateways
# ------------------------------------------------------------

INSERT INTO
  `payment_gateways` (
    `payment_gateway_id`,
    `payment_gateway_name`,
    `payment_gateway_url`,
    `payment_gateway_image`,
    `payment_gateway_mode`,
    `key_id`,
    `key_secret`,
    `merchant_id`,
    `merchant_key`,
    `client_id`,
    `client_secret`,
    `other`,
    `created_at`,
    `updated_at`,
    `status`,
    `slug`
  )
VALUES
  (
    1,
    'Razorpay',
    'https://stripe.com',
    NULL,
    'live',
    'your_key_id',
    'your_key_secret',
    'your_merchant_id',
    'your_merchant_key',
    'your_client_id',
    'your_client_secret',
    'any_additional_detail',
    '2024-04-18 15:20:39',
    '2024-05-10 12:22:28',
    'InActive',
    'Razorpay'
  );
INSERT INTO
  `payment_gateways` (
    `payment_gateway_id`,
    `payment_gateway_name`,
    `payment_gateway_url`,
    `payment_gateway_image`,
    `payment_gateway_mode`,
    `key_id`,
    `key_secret`,
    `merchant_id`,
    `merchant_key`,
    `client_id`,
    `client_secret`,
    `other`,
    `created_at`,
    `updated_at`,
    `status`,
    `slug`
  )
VALUES
  (
    2,
    'PayuMoney',
    '',
    NULL,
    '',
    'rzp_test_Jdg73VaLq0DRCL',
    '2AYxbLJ2nTSv7FT5sL0nSpWP',
    '',
    '',
    NULL,
    NULL,
    NULL,
    '2024-04-19 11:37:01',
    '2024-05-10 12:21:15',
    'Active',
    'PayuMoney'
  );
INSERT INTO
  `payment_gateways` (
    `payment_gateway_id`,
    `payment_gateway_name`,
    `payment_gateway_url`,
    `payment_gateway_image`,
    `payment_gateway_mode`,
    `key_id`,
    `key_secret`,
    `merchant_id`,
    `merchant_key`,
    `client_id`,
    `client_secret`,
    `other`,
    `created_at`,
    `updated_at`,
    `status`,
    `slug`
  )
VALUES
  (
    3,
    'Paytm',
    'https://stripe.com',
    '',
    'live',
    'your_key_id',
    'your_key_secret',
    'your_merchant_id',
    'your_merchant_key',
    'your_client_id',
    'your_client_secret',
    'any_additional_details',
    '2024-05-06 14:37:43',
    '2024-05-10 12:21:24',
    'Active',
    'Paytm'
  );
INSERT INTO
  `payment_gateways` (
    `payment_gateway_id`,
    `payment_gateway_name`,
    `payment_gateway_url`,
    `payment_gateway_image`,
    `payment_gateway_mode`,
    `key_id`,
    `key_secret`,
    `merchant_id`,
    `merchant_key`,
    `client_id`,
    `client_secret`,
    `other`,
    `created_at`,
    `updated_at`,
    `status`,
    `slug`
  )
VALUES
  (
    4,
    'Paypal',
    'https://stripe.com',
    '',
    'live',
    'your_key_id',
    'your_key_secret',
    'your_merchant_id',
    'your_merchant_key',
    'your_client_id',
    'your_client_secret',
    'any_additional_details',
    '2024-05-06 14:41:20',
    '2024-05-10 12:21:31',
    'Active',
    'Paypal'
  );
INSERT INTO
  `payment_gateways` (
    `payment_gateway_id`,
    `payment_gateway_name`,
    `payment_gateway_url`,
    `payment_gateway_image`,
    `payment_gateway_mode`,
    `key_id`,
    `key_secret`,
    `merchant_id`,
    `merchant_key`,
    `client_id`,
    `client_secret`,
    `other`,
    `created_at`,
    `updated_at`,
    `status`,
    `slug`
  )
VALUES
  (
    5,
    'Strip',
    '',
    NULL,
    '',
    '',
    '',
    '',
    '',
    NULL,
    NULL,
    NULL,
    '2024-05-06 15:59:54',
    '2024-05-10 12:21:40',
    'Active',
    'Strip'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: permission
# ------------------------------------------------------------

INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'admin',
    0,
    '2024-04-20 11:56:57',
    '2024-05-13 12:59:42'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (2, 'create', 1, '2024-04-20 11:57:30', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    'update',
    1,
    '2024-04-20 12:00:45',
    '2024-05-10 13:02:18'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    'delete',
    1,
    '2024-04-20 12:05:59',
    '2024-05-10 13:02:28'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    'permission',
    0,
    '2024-04-20 12:09:41',
    '2024-04-20 12:10:01'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (6, 'get', 5, '2024-04-20 12:10:16', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    'create',
    5,
    '2024-04-20 12:11:17',
    '2024-05-13 12:59:56'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (8, 'update', 5, '2024-04-20 12:11:53', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (9, 'delete', 5, '2024-04-20 12:12:13', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    'role',
    0,
    '2024-04-20 12:34:45',
    '2024-05-13 13:00:05'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (11, 'get', 10, '2024-04-20 12:35:01', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (12, 'create', 10, '2024-04-20 12:35:13', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (13, 'update', 10, '2024-04-20 12:35:28', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (14, 'delete', 10, '2024-04-20 12:35:47', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (15, 'order', 0, '2024-04-20 12:41:12', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (16, 'get', 15, '2024-04-20 12:41:32', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (17, 'create', 15, '2024-04-20 12:41:49', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (18, 'update', 15, '2024-04-20 12:42:07', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (19, 'delete', 15, '2024-04-20 12:42:22', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (20, 'backup', 0, '2024-04-20 12:46:56', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (21, 'get', 20, '2024-04-20 12:47:10', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (22, 'post', 0, '2024-04-20 12:49:19', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (23, 'get', 22, '2024-04-20 12:49:32', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (24, 'create', 22, '2024-04-20 12:50:52', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    25,
    'update',
    22,
    '2024-04-20 12:51:17',
    '2024-05-13 13:00:13'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (26, 'delete', 22, '2024-04-20 12:51:30', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (27, 'post category', 0, '2024-05-10 13:05:28', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (28, 'get', 27, '2024-04-20 12:56:50', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (29, 'create', 27, '2024-04-20 12:57:07', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (30, 'update', 27, '2024-04-20 12:57:36', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (31, 'delete', 27, '2024-04-20 12:57:52', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    32,
    'posttypes',
    0,
    '2024-04-20 13:01:05',
    '2024-05-13 13:00:22'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (33, 'get', 32, '2024-04-20 13:01:22', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (34, 'create', 32, '2024-04-20 13:01:38', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (35, 'update', 32, '2024-04-20 13:01:57', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (36, 'delete', 32, '2024-04-20 13:02:16', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (37, 'setting', 0, '2024-04-20 13:04:56', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (38, 'get', 37, '2024-04-20 13:05:47', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (39, 'create', 37, '2024-04-20 13:06:01', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (40, 'update', 37, '2024-04-20 13:06:20', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (41, 'delete', 37, '2024-04-20 13:06:34', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    42,
    'payment gateway',
    0,
    '2024-04-20 14:15:54',
    '2024-05-13 13:01:53'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (43, 'get', 42, '2024-04-20 14:17:47', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (44, 'create', 42, '2024-04-20 14:18:02', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (45, 'update', 42, '2024-04-20 14:18:19', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (46, 'delete', 42, '2024-04-20 14:18:36', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (47, 'transaction', 0, '2024-04-20 14:21:57', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    48,
    'create',
    47,
    '2024-04-20 14:23:02',
    '2024-04-20 14:25:13'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    49,
    'get',
    47,
    '2024-04-20 14:23:22',
    '2024-05-10 14:06:48'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (50, 'category', 0, '2024-04-20 14:28:24', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (51, 'get', 50, '2024-04-20 14:29:19', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (52, 'create', 50, '2024-05-10 14:07:50', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (53, 'update', 50, '2024-05-10 14:07:50', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (54, 'delete', 50, '2024-04-20 14:30:15', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (55, 'products', 0, '2024-04-20 14:34:27', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (56, 'get', 55, '2024-04-20 14:34:42', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (57, 'create', 55, '2024-04-20 14:35:00', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (58, 'update', 55, '2024-04-20 14:35:15', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (59, 'delete', 55, '2024-04-20 14:35:31', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (60, 'reports', 0, '2024-05-10 14:08:50', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (61, 'get', 60, '2024-04-20 14:40:51', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    62,
    'product report',
    0,
    '2024-04-20 14:41:53',
    '2024-05-13 13:02:06'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (63, 'get', 62, '2024-04-20 14:42:30', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    64,
    'user report',
    0,
    '2024-04-20 14:43:03',
    '2024-05-13 13:02:13'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (65, 'get', 64, '2024-04-20 14:47:14', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (66, 'email', 0, '2024-04-20 16:04:51', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    67,
    'send email',
    66,
    '2024-04-20 16:06:32',
    '2024-05-13 13:02:18'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (68, 'notification', 0, '2024-05-10 14:10:41', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (69, 'get', 68, '2024-04-20 16:10:35', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (70, 'create', 68, '2024-04-20 16:10:48', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (71, 'delete', 68, '2024-04-20 16:11:02', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    72,
    'send sms',
    68,
    '2024-04-20 16:13:05',
    '2024-05-13 13:02:25'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (73, 'upload', 0, '2024-04-20 16:15:52', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (74, 'images', 73, '2024-04-20 16:21:54', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (75, 'documnets', 73, '2024-04-20 16:22:14', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (76, 'move', 73, '2024-04-20 16:22:31', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (77, 'csvtojson', 73, '2024-04-20 16:22:52', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (78, 'users', 0, '2024-04-20 16:25:23', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (79, 'get', 78, '2024-04-23 14:28:05', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (80, 'create', 78, '2024-04-23 14:28:29', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (81, 'update', 78, '2024-04-23 14:28:46', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (82, 'delete', 78, '2024-04-23 14:29:06', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (83, 'coupon', 0, '2024-04-23 14:29:37', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (84, 'get', 83, '2024-04-23 14:30:19', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (85, 'create', 83, '2024-04-23 14:31:05', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (86, 'update', 83, '2024-04-23 14:31:33', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (87, 'delete', 83, '2024-04-23 14:32:00', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    88,
    'order report',
    0,
    '2024-04-23 16:45:03',
    '2024-05-13 13:02:36'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (89, 'get', 88, '2024-04-23 16:45:38', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (94, 'get', 1, '2024-05-10 13:02:55', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    95,
    'email templates',
    0,
    '2024-05-14 16:19:35',
    NULL
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (96, 'get', 95, '2024-05-14 16:20:12', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (97, 'create', 95, '2024-05-14 16:20:44', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (98, 'update', 95, '2024-05-14 16:21:00', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (99, 'delete', 95, '2024-05-14 16:21:14', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    100,
    'user notification',
    0,
    '2024-05-16 10:46:19',
    NULL
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (101, 'get', 100, '2024-05-16 10:46:41', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (102, 'create', 100, '2024-05-16 10:46:41', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (103, 'update', 100, '2024-05-16 10:47:08', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (104, 'delete', 100, '2024-05-16 10:47:08', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (105, 'tickets', 0, '2024-05-17 10:52:08', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (106, 'get', 105, '2024-05-17 10:53:20', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (107, 'create', 105, '2024-05-17 10:53:20', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (108, 'update', 105, '2024-05-17 10:53:51', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (109, 'delete', 105, '2024-05-17 10:53:51', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    110,
    'ticket chats',
    0,
    '2024-05-17 14:36:38',
    '2024-05-17 14:51:37'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (111, 'get', 110, '2024-05-17 14:38:29', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (112, 'create', 110, '2024-05-17 14:38:57', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (113, 'update', 110, '2024-05-17 14:38:57', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (114, 'delete', 110, '2024-05-17 14:39:16', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (115, 'user role', 0, '2024-05-21 11:11:01', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (116, 'get', 115, '2024-05-21 11:11:28', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (117, 'create', 115, '2024-05-21 11:11:28', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (118, 'update', 115, '2024-05-21 11:12:14', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (119, 'delete', 115, '2024-05-21 11:12:14', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (120, 'hero slider', 0, '2024-05-22 10:38:40', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (121, 'get', 120, '2024-05-22 10:39:05', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (122, 'create', 120, '2024-05-22 10:39:05', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (123, 'update', 120, '2024-05-22 10:39:30', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (124, 'delete', 120, '2024-05-22 10:39:30', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (125, 'contact', 0, '2024-05-28 16:13:31', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (126, 'get', 125, '2024-05-28 16:15:18', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (127, 'delete', 125, '2024-05-28 16:15:18', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (128, 'vendor', 0, '2024-06-08 16:37:16', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (129, 'get', 128, '2024-06-08 16:37:46', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (130, 'delete', 128, '2024-06-08 16:37:46', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    131,
    'commission report',
    0,
    '2024-06-10 15:14:20',
    '2024-06-11 15:43:56'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (132, 'get', 131, '2024-06-10 15:14:34', NULL);
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    133,
    'product enquiries',
    0,
    '2024-06-11 15:40:29',
    '2024-06-11 15:43:48'
  );
INSERT INTO
  `permission` (
    `permission_id`,
    `name`,
    `parent`,
    `created_at`,
    `updated_at`
  )
VALUES
  (134, 'get', 133, '2024-06-11 15:40:48', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: post_category
# ------------------------------------------------------------

INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    9,
    'new blog of child of parent 1',
    'new-blog-of-child-of-parent-1',
    1,
    NULL,
    'Active',
    '2024-05-02 12:34:42',
    '2024-05-15 17:51:35',
    'Your Meta Title',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    10,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-09 16:05:16',
    '2024-05-20 18:26:30',
    'Minas Gerais',
    'Minas Gerais',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    11,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-09 16:05:16',
    '2024-05-15 17:49:49',
    'Minas Gerais',
    'Minas Gerais',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    12,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-09 16:05:16',
    '2024-05-15 17:49:52',
    'Minas Gerais',
    'Minas Gerais',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    16,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:24:31',
    NULL,
    'dfgdfgdfg',
    'Your Meta Description',
    'dsfdsfdsfdsf'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    17,
    'dfg',
    'dfg',
    0,
    NULL,
    'Active',
    '2024-05-18 15:24:38',
    NULL,
    'fdgfdg',
    'dfgdg',
    'dfgdg'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    18,
    'dfgdfg',
    'dfgdfg',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:24:49',
    NULL,
    'dfgdfg',
    'dfgdg',
    'dfgdg'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    19,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:25:03',
    NULL,
    'dsfdsfdsfdsf',
    'rtrtrt',
    'Minas Gerais'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    20,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:25:13',
    NULL,
    'Your Meta Title',
    'tttttttt',
    'dfgdg'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    21,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:25:24',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    22,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:25:45',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    23,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:25:57',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    24,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:26:15',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'dsfdsfdsfsf'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    25,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:26:31',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    26,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:26:45',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    27,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:26:57',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    28,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:27:13',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    29,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:27:25',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    30,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:27:36',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    31,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:27:49',
    NULL,
    'Minas Gerais',
    'tttttttt',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    32,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:27:57',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    33,
    'mac',
    'mac',
    0,
    NULL,
    'Active',
    '2024-05-18 15:28:15',
    NULL,
    'Minas Gerais',
    'Minas Gerais',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    34,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:28:50',
    NULL,
    'dfgdfgdfg',
    'dfgdg',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    35,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:29:01',
    NULL,
    'dsfdsfdsfdsf',
    'Minas Gerais',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    36,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:29:09',
    NULL,
    'Minas Gerais',
    'Your Meta Description',
    'Minas Gerais'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    37,
    'mac',
    'mac',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:29:18',
    NULL,
    'Your Meta Title',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    38,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:29:29',
    NULL,
    'dfgdfgdfg',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    39,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:29:38',
    NULL,
    'dsfdsfdsfdsf',
    'Your Meta Description',
    'dsfdsfdsfdsf'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    40,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:29:47',
    NULL,
    'tttttt',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    41,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'Active',
    '2024-05-18 15:29:57',
    NULL,
    'Your Meta Title',
    'Minas Gerais',
    'Minas Gerais'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    42,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:30:05',
    NULL,
    'tttttt',
    'tttttttt',
    'dsfdsfdsfdsf'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    43,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:30:13',
    NULL,
    'dfgdfgdfg',
    'Your Meta Description',
    'dsfdsfdsfdsf'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    44,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:30:34',
    NULL,
    'dsfdsfdsfdsf',
    'Your Meta Description',
    'Minas Gerais'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    45,
    'wrpTirth',
    'wrptirth',
    0,
    NULL,
    'InActive',
    '2024-05-18 15:30:42',
    NULL,
    'tttttt',
    'Your Meta Description',
    'dfgdg'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    46,
    'About Us',
    'about-us',
    0,
    NULL,
    'Active',
    '2024-05-27 12:22:05',
    NULL,
    'about us',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    47,
    'Company detail',
    'company-detail',
    46,
    NULL,
    'Active',
    '2024-05-27 12:52:23',
    NULL,
    'wrp solustion',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    48,
    'Contact us',
    'contact-us',
    0,
    NULL,
    'Active',
    '2024-05-28 14:24:40',
    '2024-05-28 14:24:40',
    'wrp solustion',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );
INSERT INTO
  `post_category` (
    `post_category_id`,
    `name`,
    `slug`,
    `parent_id`,
    `category_image`,
    `category_status`,
    `created_at`,
    `updated_at`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`
  )
VALUES
  (
    49,
    'terms&policy',
    'termsandpolicy',
    0,
    NULL,
    'Active',
    '2024-05-28 14:25:50',
    '2024-05-28 14:25:50',
    'wrp solustion',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: post_types
# ------------------------------------------------------------

INSERT INTO
  `post_types` (
    `post_type_id`,
    `name`,
    `slug`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'now',
    'now',
    '2024-04-16 09:32:25',
    '2024-04-16 09:32:25'
  );
INSERT INTO
  `post_types` (
    `post_type_id`,
    `name`,
    `slug`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    'new type',
    'new-type',
    '2024-04-17 10:49:55',
    '2024-04-17 10:49:55'
  );
INSERT INTO
  `post_types` (
    `post_type_id`,
    `name`,
    `slug`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    'new_BLOG',
    'new_blog',
    '2024-05-13 17:48:39',
    NULL
  );
INSERT INTO
  `post_types` (
    `post_type_id`,
    `name`,
    `slug`,
    `created_at`,
    `updated_at`
  )
VALUES
  (11, 'pages', 'pages', '2024-05-27 11:38:58', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: posts
# ------------------------------------------------------------

INSERT INTO
  `posts` (
    `post_id`,
    `title`,
    `content`,
    `post_category_id`,
    `post_type_id`,
    `post_image`,
    `post_status`,
    `publication_date`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`,
    `created_at`,
    `updated_at`,
    `slug`
  )
VALUES
  (
    10,
    'new blog ',
    'super all like still',
    1,
    1,
    NULL,
    'draft',
    '2024-05-02 15:10:46',
    'Your Meta Title',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3',
    '2024-05-02 15:10:46',
    '2024-05-02 15:10:46',
    'new-blog'
  );
INSERT INTO
  `posts` (
    `post_id`,
    `title`,
    `content`,
    `post_category_id`,
    `post_type_id`,
    `post_image`,
    `post_status`,
    `publication_date`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`,
    `created_at`,
    `updated_at`,
    `slug`
  )
VALUES
  (
    15,
    'second blog',
    'super all like still',
    1,
    1,
    NULL,
    'archived',
    '2024-05-02 15:12:58',
    'Your Meta Title',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3',
    '2024-05-02 15:12:58',
    '2024-05-02 15:12:58',
    'second-blog'
  );
INSERT INTO
  `posts` (
    `post_id`,
    `title`,
    `content`,
    `post_category_id`,
    `post_type_id`,
    `post_image`,
    `post_status`,
    `publication_date`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`,
    `created_at`,
    `updated_at`,
    `slug`
  )
VALUES
  (
    16,
    'Updated Title',
    'Updated Content',
    1,
    1,
    'hh',
    'published',
    '2024-05-02 15:13:27',
    'Updated Meta Title',
    'Updated Meta Description',
    'Updated Keywords',
    '2024-05-02 15:13:27',
    '2024-05-02 15:13:27',
    'updated-title'
  );
INSERT INTO
  `posts` (
    `post_id`,
    `title`,
    `content`,
    `post_category_id`,
    `post_type_id`,
    `post_image`,
    `post_status`,
    `publication_date`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`,
    `created_at`,
    `updated_at`,
    `slug`
  )
VALUES
  (
    18,
    'About us',
    'Content of the page, describing the purpose, history, or information about the organization',
    46,
    11,
    NULL,
    'published',
    '2024-05-27 12:23:26',
    'Your Meta Title',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3',
    '2024-05-27 12:23:26',
    NULL,
    'about-us'
  );
INSERT INTO
  `posts` (
    `post_id`,
    `title`,
    `content`,
    `post_category_id`,
    `post_type_id`,
    `post_image`,
    `post_status`,
    `publication_date`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`,
    `created_at`,
    `updated_at`,
    `slug`
  )
VALUES
  (
    19,
    'Contact us',
    'Content of the page, describing the purpose, history, or information about the organization',
    48,
    11,
    NULL,
    'published',
    '2024-05-28 14:25:08',
    'Your Meta Title',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3',
    '2024-05-28 14:25:08',
    '2024-05-28 15:42:34',
    'contact-us'
  );
INSERT INTO
  `posts` (
    `post_id`,
    `title`,
    `content`,
    `post_category_id`,
    `post_type_id`,
    `post_image`,
    `post_status`,
    `publication_date`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`,
    `created_at`,
    `updated_at`,
    `slug`
  )
VALUES
  (
    20,
    'Terms & condition',
    'Content of the page, describing the purpose, history, or information about the organization',
    49,
    11,
    NULL,
    'published',
    '2024-05-28 14:26:19',
    'Your Meta Title',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3',
    '2024-05-28 14:26:19',
    '2024-05-28 15:26:50',
    'terms-and-condition'
  );
INSERT INTO
  `posts` (
    `post_id`,
    `title`,
    `content`,
    `post_category_id`,
    `post_type_id`,
    `post_image`,
    `post_status`,
    `publication_date`,
    `meta_title`,
    `meta_description`,
    `meta_keywords`,
    `created_at`,
    `updated_at`,
    `slug`
  )
VALUES
  (
    21,
    'Privacy & Policy ',
    'Content of the page, describing the purpose, history, or information about the organization',
    50,
    11,
    NULL,
    'published',
    '2024-05-28 15:42:11',
    'Your Meta Title',
    'Your Meta Description',
    'Keyword1, Keyword2, Keyword3',
    '2024-05-28 15:42:11',
    '2024-05-28 15:42:11',
    'privacy-and-policy'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: products
# ------------------------------------------------------------

INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    163,
    'fan',
    'fdgdfg',
    NULL,
    NULL,
    98,
    73,
    5,
    4,
    'kjkjk',
    NULL,
    '\\uploads\\products\\1717073271332.jpeg',
    'Active',
    980,
    90890,
    90808,
    89089,
    '',
    1,
    'vendor',
    4.8,
    1,
    '2024-04-10 18:07:28',
    '2024-06-14 10:59:43',
    5
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    185,
    't shirts',
    'fdgdfg',
    NULL,
    NULL,
    50,
    4,
    16,
    NULL,
    'kjkjk',
    NULL,
    '\\uploads\\products\\1717073271343.jpeg',
    'Active',
    980,
    90890,
    90808,
    89089,
    '',
    1,
    'vendor',
    3.33333,
    0,
    '2024-05-11 17:40:33',
    '2024-06-14 13:44:58',
    9
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    207,
    'jeans',
    'This is calender',
    NULL,
    NULL,
    15000,
    79,
    16,
    NULL,
    'dfg',
    'tertertertert',
    '\\uploads\\products\\1717073271453.jpeg',
    'Active',
    0,
    20,
    78,
    563,
    'No Notes',
    1,
    'vendor',
    5,
    0,
    '2024-05-21 17:36:48',
    '2024-06-14 13:44:56',
    11
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    221,
    'AC',
    'aaaa',
    NULL,
    NULL,
    98,
    99,
    5,
    NULL,
    'kjkjk',
    NULL,
    '\\uploads\\products\\1717073271465.jpeg',
    'Active',
    980,
    90890,
    90808,
    89089,
    '',
    1,
    'vendor',
    3.5,
    0,
    '2024-04-10 18:07:28',
    '2024-06-14 13:44:56',
    5
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    222,
    'photoframe',
    'photoframe',
    NULL,
    NULL,
    50,
    900,
    30,
    NULL,
    'photoframe',
    NULL,
    '\\uploads\\products\\1717073271513.jpeg',
    'Active',
    NULL,
    90890,
    90808,
    89089,
    '',
    1,
    'vendor',
    3.42857,
    0,
    '2024-05-24 11:24:57',
    '2024-06-14 11:00:04',
    1
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    223,
    'fastfood',
    'fastfood',
    NULL,
    NULL,
    100,
    90,
    8,
    4,
    '112',
    NULL,
    '\\uploads\\products\\1717073507831.jpeg',
    'Active',
    89,
    90,
    908,
    89,
    '',
    1,
    'vendor',
    3.22222,
    0,
    '2024-05-24 11:26:16',
    '2024-06-14 13:41:17',
    0
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    224,
    'Luxury Chair',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed adipis arcu cursus vitae congue mauris. Sagittis id consectetur puradipis. Vel pretium lectus quam id leo in vitae turpis massa.',
    NULL,
    NULL,
    88,
    78,
    9,
    4,
    'MS46891395',
    NULL,
    '\\uploads\\products\\1718280121805.jpg,\\uploads\\products\\1718280121809.jpg',
    'Active',
    89,
    90,
    908,
    89,
    'Fringilla urna porttitor rhoncus dolor purus. Luctus venenatis lectus magna fringilla. Diam maecenas ultricies mi eget mauris. Nibh tellus molestie nunc non dit massa. Ultrices eros in cursus turpis massa tincidunt. Ante in nibh mauris cursus mattis. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique.',
    63,
    'vendor',
    3.4,
    0,
    '2024-05-24 11:27:11',
    '2024-06-14 11:00:14',
    10
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    235,
    'Bluetooth',
    'Bluetooth technology allows devices to communicate with each other without cables or wires. Bluetooth relies on short-range radio frequency, and any device that incorporates the technology can communicate as long as it is within the required distance.',
    NULL,
    NULL,
    1000,
    93,
    5,
    4,
    '112',
    '',
    NULL,
    'Active',
    20,
    100,
    100,
    100,
    'not avilable ',
    61,
    'admin',
    NULL,
    0,
    '2024-05-30 16:08:37',
    '2024-06-14 10:51:57',
    9
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    236,
    'laptop',
    'This is a sample product.',
    NULL,
    NULL,
    19.99,
    101,
    20,
    NULL,
    'SP12345',
    NULL,
    '\\uploads\\products\\1717073507858.jpeg',
    'Active',
    1.2,
    10,
    5,
    2,
    'Some optional notes about the product.',
    58,
    'vendor',
    NULL,
    0,
    '2024-05-30 16:09:21',
    '2024-06-14 13:44:58',
    8
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    239,
    'Phone',
    'This is a sample product.',
    NULL,
    NULL,
    19.99,
    95,
    20,
    NULL,
    'SP12345',
    NULL,
    '\\uploads\\products\\1717073507858.jpeg',
    'InActive',
    1.2,
    10,
    5,
    2,
    'Some optional notes about the product.',
    58,
    'vendor',
    NULL,
    0,
    '2024-05-30 16:09:21',
    '2024-06-14 17:07:47',
    8
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    251,
    'Intel',
    'wall wallpaper',
    NULL,
    NULL,
    88,
    10,
    30,
    4,
    'MBO',
    NULL,
    'uploads/products/1718356764410.jpg',
    'Active',
    193,
    164,
    3,
    6,
    'Glass front (Panda Glass), plastic frame, plastic back',
    63,
    'vendor',
    NULL,
    0,
    '2024-06-14 14:49:48',
    '2024-06-14 17:07:38',
    0
  );
INSERT INTO
  `products` (
    `product_id`,
    `product_name`,
    `description`,
    `regular_price`,
    `sale_price`,
    `price`,
    `quantity`,
    `category_id`,
    `brand_id`,
    `SKU`,
    `barcode`,
    `product_image`,
    `product_status`,
    `weight`,
    `length`,
    `width`,
    `height`,
    `optional_notes`,
    `owner_id`,
    `type`,
    `average_rating`,
    `is_enquiry`,
    `created_at`,
    `updated_at`,
    `total_quantity_sold`
  )
VALUES
  (
    252,
    'Phone',
    'This is a sample product.',
    NULL,
    NULL,
    19.99,
    100,
    20,
    4,
    'SP12345',
    NULL,
    NULL,
    'Active',
    1.2,
    10,
    5,
    2,
    'Some optional notes about the product.',
    1,
    'vendor',
    NULL,
    0,
    '2024-06-14 16:46:31',
    NULL,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: request_payments
# ------------------------------------------------------------

INSERT INTO
  `request_payments` (
    `id`,
    `vendor_id`,
    `amount`,
    `status`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    100,
    'Pending',
    'Payment for services rendered',
    '2024-06-06 14:05:06',
    '2024-06-06 14:05:06'
  );
INSERT INTO
  `request_payments` (
    `id`,
    `vendor_id`,
    `amount`,
    `status`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    3,
    100,
    'Pending',
    'Payment for services rendered',
    '2024-06-07 17:19:18',
    '2024-06-07 17:19:18'
  );
INSERT INTO
  `request_payments` (
    `id`,
    `vendor_id`,
    `amount`,
    `status`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    4,
    100,
    'Pending',
    'Payment for services rendered',
    '2024-06-07 17:45:48',
    '2024-06-07 17:45:48'
  );
INSERT INTO
  `request_payments` (
    `id`,
    `vendor_id`,
    `amount`,
    `status`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    1,
    100,
    'Pending',
    'Payment for services rendered',
    '2024-06-12 15:50:22',
    '2024-06-12 15:50:22'
  );
INSERT INTO
  `request_payments` (
    `id`,
    `vendor_id`,
    `amount`,
    `status`,
    `message`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    1,
    100,
    'Pending',
    'Payment for services rendered',
    '2024-06-12 15:51:22',
    '2024-06-12 15:51:22'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: reviews
# ------------------------------------------------------------

INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    163,
    1,
    5,
    'Great',
    '2024-05-27 14:50:40',
    '2024-05-27 14:50:40'
  );
INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    163,
    1,
    5,
    'Great',
    '2024-05-27 14:55:37',
    '2024-05-27 14:55:37'
  );
INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    17,
    163,
    1,
    5,
    'Great',
    '2024-05-27 15:09:37',
    '2024-05-27 15:09:37'
  );
INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    163,
    1,
    5,
    'Great',
    '2024-05-27 17:44:23',
    '2024-05-27 17:44:23'
  );
INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    163,
    4,
    5,
    'Great',
    '2024-05-27 17:52:49',
    '2024-05-27 17:52:49'
  );
INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    235,
    4,
    5,
    'Great',
    '2024-05-28 09:53:13',
    '2024-06-01 11:48:35'
  );
INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    163,
    54,
    4.5,
    'dfgdfgdfgdg',
    '2024-06-03 12:15:49',
    '2024-06-03 12:15:49'
  );
INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    22,
    163,
    1,
    5,
    'Great',
    '2024-06-03 14:50:17',
    '2024-06-03 14:50:17'
  );
INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    23,
    163,
    54,
    3.5,
    'sdfsdfsdfsf',
    '2024-06-03 15:20:59',
    '2024-06-03 15:20:59'
  );
INSERT INTO
  `reviews` (
    `review_id`,
    `product_id`,
    `user_id`,
    `rating`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    24,
    163,
    54,
    5,
    'Best Product',
    '2024-06-04 12:20:51',
    '2024-06-04 12:20:51'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: role
# ------------------------------------------------------------

INSERT INTO
  `role` (
    `role_id`,
    `name`,
    `permission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'Main Admin',
    '1',
    '2024-02-13 11:58:10',
    '2024-05-10 10:05:52'
  );
INSERT INTO
  `role` (
    `role_id`,
    `name`,
    `permission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    'Student',
    '7,10,13,5',
    '2024-03-21 17:44:32',
    '2024-05-10 16:52:01'
  );
INSERT INTO
  `role` (
    `role_id`,
    `name`,
    `permission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    40,
    'Account Admin',
    '30,61,62',
    '2024-04-16 18:09:47',
    '2024-05-10 10:06:40'
  );
INSERT INTO
  `role` (
    `role_id`,
    `name`,
    `permission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    47,
    'sub Admin',
    '1,2,3,94,32,33,36,35,62,64,66,37,38,39,5,6,9,10,11,13,42,44,45,47,48,50,78,79,80,81,82,84,83,55,56,57,58,59,22,23,24,25,26,27,28,29,30,31',
    '2024-05-10 15:11:58',
    '2024-05-10 15:12:54'
  );
INSERT INTO
  `role` (
    `role_id`,
    `name`,
    `permission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    48,
    'Account Admin',
    '6,9,12,15',
    '2024-05-13 17:52:24',
    NULL
  );
INSERT INTO
  `role` (
    `role_id`,
    `name`,
    `permission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    49,
    'Account Admin',
    '47,95',
    '2024-05-13 17:54:56',
    '2024-06-13 11:08:12'
  );
INSERT INTO
  `role` (
    `role_id`,
    `name`,
    `permission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    51,
    'Account Admin',
    '',
    '2024-06-13 12:36:21',
    '2024-06-13 12:36:21'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: settings
# ------------------------------------------------------------

INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    11,
    'SMTP_PASSWORD',
    '2c35c95fee7edb',
    'SMTP_PASSWORD',
    'wall wallpaper',
    1,
    1,
    '2024-05-10 17:30:20',
    '2024-06-08 17:07:16',
    'input',
    NULL
  );
INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    12,
    'SMTP_USERNAME',
    'cbba93d09a9bac',
    'SMTP_USERNAME',
    'dsfdsf',
    1,
    0,
    '2024-05-10 17:30:59',
    '2024-06-08 17:07:22',
    'input',
    NULL
  );
INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    13,
    'SMTP_HOST',
    'sandbox.smtp.mailtrap.io',
    'SMTP_HOST',
    'dsfdsf',
    1,
    1,
    '2024-05-10 17:31:18',
    '2024-06-08 17:07:28',
    'input',
    NULL
  );
INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    17,
    'PAYPAL_CLIENT_ID',
    'updated_value_1',
    'PAYPAL_CLIENT_ID',
    'dfgdfg',
    1,
    1,
    '2024-05-10 18:29:31',
    '2024-06-08 17:07:33',
    'input',
    NULL
  );
INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    18,
    'PAYPAL_SECRET',
    'updated_value_1',
    'PAYPAL_SECRET',
    'dfgdfg',
    1,
    1,
    '2024-05-10 18:29:54',
    '2024-06-08 17:07:45',
    'input',
    NULL
  );
INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    20,
    'PAYUMONEY_MERCHANT_SALT',
    'updated_value_1',
    'PAYUMONEY_MERCHANT_SALT',
    'dfgdfg',
    1,
    0,
    '2024-05-10 18:30:15',
    '2024-06-08 17:07:39',
    'input',
    NULL
  );
INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    21,
    'STRIPE_API_KEY',
    'updated_value_1',
    'STRIPE_API_KEY',
    'wall wallpaper',
    1,
    1,
    '2024-05-10 18:30:15',
    '2024-06-08 17:07:50',
    'select',
    'true,false'
  );
INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    32,
    'commission_percentage',
    '10',
    'commission_percentage',
    'dsfdsf',
    0,
    0,
    '2024-05-14 16:20:20',
    '2024-06-08 17:08:00',
    'select',
    'true,false'
  );
INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    39,
    'default_currency',
    'INR',
    'Default Currency',
    'The default currency used in the system',
    0,
    1,
    '2024-06-10 12:36:41',
    '2024-06-13 11:18:41',
    'select',
    'usd,gbp'
  );
INSERT INTO
  `settings` (
    `setting_id`,
    `key`,
    `value`,
    `label`,
    `description`,
    `is_editable`,
    `is_active`,
    `created_at`,
    `updated_at`,
    `field_type`,
    `field_options`
  )
VALUES
  (
    41,
    'dsfsf',
    'updated_value_1',
    'updated_label_1',
    'dfgdfg',
    1,
    1,
    '2024-06-13 11:19:11',
    '2024-06-13 11:19:11',
    'input',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ticket_chats
# ------------------------------------------------------------

INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    4,
    2,
    3,
    'This is a sample message.',
    'https://example.com/image.png',
    'read',
    '2024-05-17 15:08:46',
    '2024-05-17 15:08:46'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    5,
    2,
    3,
    'This is a second message.',
    'https://example.com/image.png',
    'unread',
    '2024-05-17 17:10:22',
    '2024-05-17 17:10:22'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    8,
    2,
    3,
    'hhhhhh',
    'https://example.com/image.png',
    'unread',
    '2024-05-17 17:10:48',
    '2024-05-17 17:10:48'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    7,
    2,
    3,
    'john',
    NULL,
    'unread',
    '2024-05-18 10:21:59',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    7,
    2,
    3,
    'dfgdfg',
    NULL,
    'unread',
    '2024-05-18 10:31:25',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    13,
    7,
    2,
    3,
    'dffsdfsf',
    NULL,
    'unread',
    '2024-05-18 10:37:00',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    14,
    7,
    2,
    3,
    'dfsgfsgdfg',
    NULL,
    'unread',
    '2024-05-18 11:11:44',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    7,
    2,
    3,
    '',
    NULL,
    'unread',
    '2024-05-18 11:11:44',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    7,
    2,
    3,
    'sdsfsfdsfsfsf',
    NULL,
    'unread',
    '2024-05-18 11:11:49',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    17,
    7,
    2,
    3,
    'tttttttt',
    NULL,
    'unread',
    '2024-05-18 11:11:56',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    7,
    2,
    3,
    'dfgdfgdgdg',
    NULL,
    'unread',
    '2024-05-18 11:24:49',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    7,
    2,
    3,
    'dfgdfgdgdg gdfgdfgdgdgdg',
    NULL,
    'unread',
    '2024-05-18 11:24:57',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    7,
    2,
    3,
    'dsfsfsfdsfs',
    NULL,
    'unread',
    '2024-05-18 11:32:24',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    7,
    2,
    3,
    'dsfsdfsdf',
    NULL,
    'unread',
    '2024-05-18 11:37:22',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    24,
    7,
    2,
    3,
    'dfgdgdfgdfgdg',
    NULL,
    'unread',
    '2024-05-18 11:43:42',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    25,
    7,
    2,
    3,
    'dsfsdfsdf tirth',
    NULL,
    'unread',
    '2024-05-18 12:02:18',
    '2024-05-18 12:05:43'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    26,
    7,
    2,
    3,
    'fdgdgdgdg. tdgdgdg',
    NULL,
    'unread',
    '2024-05-18 12:28:09',
    '2024-05-18 12:28:17'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    27,
    7,
    0,
    3,
    'fdgdfgdfgdfg',
    NULL,
    'unread',
    '2024-05-18 12:37:56',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    28,
    7,
    0,
    3,
    'fghfghfghf',
    NULL,
    'unread',
    '2024-05-18 12:38:10',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    29,
    7,
    2,
    3,
    'dfgdfgdgg',
    NULL,
    'unread',
    '2024-05-18 12:39:31',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    30,
    7,
    2,
    3,
    'fdgdfgdg',
    NULL,
    'unread',
    '2024-05-18 12:43:23',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    31,
    7,
    2,
    3,
    'dfgdfgdfg',
    NULL,
    'unread',
    '2024-05-18 12:46:24',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    32,
    7,
    1,
    2,
    'dfrgdfgdf',
    NULL,
    'unread',
    '2024-05-18 12:47:28',
    '2024-05-18 12:57:45'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    33,
    7,
    2,
    1,
    'dfrgdfgdf',
    NULL,
    'unread',
    '2024-05-18 12:47:28',
    '2024-05-18 12:57:45'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    34,
    7,
    0,
    3,
    'dfgdfgg',
    NULL,
    'unread',
    '2024-05-18 13:01:21',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    35,
    7,
    1,
    3,
    'ttttttttt. tttttttttttttttt',
    NULL,
    'unread',
    '2024-05-18 13:02:10',
    '2024-05-18 14:48:53'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    36,
    7,
    1,
    3,
    'dfgdfgdfgdfgdfggdfg gdfgdfgdgdgdg',
    NULL,
    'unread',
    '2024-05-18 13:04:08',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    37,
    7,
    1,
    3,
    'dfgdfgdfgdfdfg',
    NULL,
    'unread',
    '2024-05-18 13:04:13',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    38,
    7,
    1,
    3,
    'dfgdgdgddg',
    NULL,
    'unread',
    '2024-05-18 13:05:03',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    39,
    7,
    1,
    3,
    'ttttttttttttttt',
    NULL,
    'unread',
    '2024-05-18 13:05:29',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    40,
    7,
    1,
    3,
    'hhhhh gdfgdfgdg',
    NULL,
    'unread',
    '2024-05-18 13:05:29',
    '2024-05-18 14:48:36'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    41,
    7,
    1,
    3,
    'fgdgdgdgdfgd gdfgdgg',
    NULL,
    'unread',
    '2024-05-18 13:07:24',
    '2024-05-18 14:30:05'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    42,
    7,
    1,
    3,
    'fgdgdgdg djsi',
    NULL,
    'unread',
    '2024-05-18 13:07:24',
    '2024-05-18 14:48:13'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    43,
    7,
    1,
    3,
    'dsfdsfsdffdf ggdgdfgdfg',
    NULL,
    'unread',
    '2024-05-18 14:38:18',
    '2024-05-18 14:48:31'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    44,
    8,
    1,
    3,
    'Hey',
    NULL,
    'unread',
    '2024-05-20 17:37:35',
    NULL
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    45,
    1,
    36,
    3,
    'hhhhhh',
    'https://example.com/image.png',
    'unread',
    '2024-05-28 10:37:14',
    '2024-05-28 10:37:14'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    46,
    1,
    2,
    3,
    'This is a sample message.',
    'https://example.com/image.jpg',
    'unread',
    '2024-05-28 11:10:50',
    '2024-06-13 15:27:38'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    48,
    12,
    54,
    36,
    'hhhhhh',
    'https://example.com/image.png',
    'unread',
    '2024-05-28 14:38:38',
    '2024-05-28 14:39:35'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    49,
    12,
    36,
    54,
    'hhhhhh',
    'https://example.com/image.png',
    'unread',
    '2024-05-28 14:40:27',
    '2024-05-28 14:40:27'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    50,
    12,
    1,
    3,
    'test message ',
    'https://example.com/image.png',
    'unread',
    '2024-05-28 14:41:15',
    '2024-06-04 11:10:33'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    51,
    12,
    54,
    3,
    'test',
    NULL,
    'unread',
    '2024-06-04 11:02:39',
    '2024-06-04 11:10:42'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    52,
    12,
    54,
    3,
    'Hello my friend',
    NULL,
    'unread',
    '2024-06-04 11:08:04',
    '2024-06-04 11:09:44'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    53,
    12,
    54,
    3,
    'test message demo message',
    NULL,
    'unread',
    '2024-06-04 11:08:10',
    '2024-06-04 11:09:54'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    54,
    13,
    54,
    3,
    'dsfdsfdsf',
    NULL,
    'unread',
    '2024-06-04 11:18:35',
    '2024-06-04 11:18:35'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    55,
    13,
    54,
    3,
    'ewrewrewr',
    NULL,
    'unread',
    '2024-06-04 11:18:41',
    '2024-06-04 11:18:41'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    56,
    13,
    54,
    3,
    'ewrewrewr',
    NULL,
    'unread',
    '2024-06-04 11:18:42',
    '2024-06-04 11:18:42'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    57,
    13,
    54,
    3,
    'ewrewrewrewrewrewrewrewrewr',
    NULL,
    'unread',
    '2024-06-04 11:18:45',
    '2024-06-04 11:18:45'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    58,
    3,
    1,
    3,
    'hey',
    NULL,
    'unread',
    '2024-06-08 12:54:49',
    '2024-06-12 16:08:00'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    59,
    3,
    1,
    3,
    'Hellooooo',
    NULL,
    'unread',
    '2024-06-08 12:54:54',
    '2024-06-08 12:55:00'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    60,
    3,
    1,
    3,
    'Hello',
    NULL,
    'unread',
    '2024-06-12 16:07:48',
    '2024-06-12 16:07:48'
  );
INSERT INTO
  `ticket_chats` (
    `id`,
    `ticket_id`,
    `sender_id`,
    `receiver_id`,
    `message`,
    `image`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    61,
    5,
    1,
    3,
    'Yes',
    NULL,
    'unread',
    '2024-06-12 16:08:23',
    '2024-06-12 16:08:28'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tickets
# ------------------------------------------------------------

INSERT INTO
  `tickets` (
    `id`,
    `user_id`,
    `requested_by`,
    `email`,
    `type`,
    `subject`,
    `description`,
    `status`,
    `attachment`,
    `priority`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    1,
    'John Doe',
    'john.doe@example.com',
    'Issue',
    'Login Problem miner solved',
    'Issue resolved. User confirmed',
    'open',
    'screenshot.png',
    'high',
    NULL,
    '2024-05-17 11:08:05',
    '2024-05-28 12:38:34'
  );
INSERT INTO
  `tickets` (
    `id`,
    `user_id`,
    `requested_by`,
    `email`,
    `type`,
    `subject`,
    `description`,
    `status`,
    `attachment`,
    `priority`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    1,
    'John Doe',
    'john.doe@example.com',
    'products',
    'Login Problem',
    'Unable to login with correct credentials.',
    'open',
    'screenshot.png',
    'high',
    NULL,
    '2024-05-17 11:40:11',
    '2024-05-28 12:38:30'
  );
INSERT INTO
  `tickets` (
    `id`,
    `user_id`,
    `requested_by`,
    `email`,
    `type`,
    `subject`,
    `description`,
    `status`,
    `attachment`,
    `priority`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    1,
    'John Doe',
    'john.doe@example.com',
    'Issue',
    'Login Problem',
    'Unable to login with correct credentials.',
    'open',
    'screenshot.png',
    'high',
    NULL,
    '2024-05-17 14:07:58',
    '2024-05-28 12:38:24'
  );
INSERT INTO
  `tickets` (
    `id`,
    `user_id`,
    `requested_by`,
    `email`,
    `type`,
    `subject`,
    `description`,
    `status`,
    `attachment`,
    `priority`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    4,
    'John Doe',
    'john.doe@example.com',
    'Issuee',
    'Login Problem',
    'Unable to login with correct credentials.',
    'open',
    'screenshot.png',
    'high',
    NULL,
    '2024-05-17 14:08:10',
    '2024-05-28 12:38:17'
  );
INSERT INTO
  `tickets` (
    `id`,
    `user_id`,
    `requested_by`,
    `email`,
    `type`,
    `subject`,
    `description`,
    `status`,
    `attachment`,
    `priority`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    54,
    'John Doe',
    'john.doe@example.com',
    'Issue',
    'Login Problem miner solved',
    'Issue resolved. User confirmed',
    'open',
    'screenshot.png',
    'low',
    '{\"userId\":54,\"comment\":\"This is a new comment on the ticket.\",\"createdAt\":\"2024-05-28T06:59:15.891Z\"}',
    '2024-05-28 10:16:40',
    '2024-05-28 12:38:03'
  );
INSERT INTO
  `tickets` (
    `id`,
    `user_id`,
    `requested_by`,
    `email`,
    `type`,
    `subject`,
    `description`,
    `status`,
    `attachment`,
    `priority`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    13,
    54,
    'John Doeeee',
    'deo@gmail.com',
    'eterter',
    'erter',
    'dfhhgfh',
    'open',
    '',
    'high',
    NULL,
    '2024-06-03 17:41:03',
    '2024-06-03 17:41:03'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: transactions
# ------------------------------------------------------------

INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    1,
    1,
    1,
    100.5,
    '{\"description\":\"Product purchase\"}',
    'Success',
    '2024-04-19 11:57:57',
    '2024-04-19 11:57:57',
    '2024-04-19 11:57:57'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    2,
    1,
    1,
    1000,
    '{\"razorpayOrderId\":\"order_O0QlfhpAZMOGG3\"}',
    'Pending',
    '2024-04-19 14:55:54',
    '2024-04-19 14:55:54',
    '2024-04-19 14:55:54'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    3,
    1,
    1,
    1000,
    '{\"razorpayOrderId\":\"order_O0Qs4AX3Rb9iak\"}',
    'Pending',
    '2024-04-19 15:01:57',
    '2024-04-19 15:01:57',
    '2024-04-19 15:01:57'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    4,
    1,
    1,
    1000,
    '{\"razorpayOrderId\":\"order_O0QuQDYchUSzKa\"}',
    'Success',
    '2024-04-19 15:04:11',
    '2024-04-19 15:04:11',
    '2024-04-19 15:04:11'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    1,
    1,
    1,
    1000,
    '{\"razorpayOrderId\":\"order_O0QwO5NxGvPydW\"}',
    'Pending',
    '2024-04-19 15:06:02',
    '2024-04-19 15:06:02',
    '2024-04-19 15:06:02'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    1,
    1,
    1,
    100,
    NULL,
    'Pending',
    '2024-04-20 11:45:42',
    '2024-04-20 11:45:42',
    '2024-04-20 11:45:42'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    1,
    1,
    1,
    100,
    NULL,
    'Pending',
    '2024-04-20 11:49:06',
    '2024-04-20 11:49:06',
    '2024-04-20 11:49:06'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    1,
    1,
    1,
    100,
    '{\"razorpayOrderId\":\"order_O0pUrU5r84j5Sm\"}',
    'Pending',
    '2024-04-20 15:07:20',
    '2024-04-20 15:07:20',
    '2024-04-20 15:07:20'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    1,
    1,
    2,
    100,
    '{\"razorpayOrderId\":\"1\"}',
    'Pending',
    '2024-04-20 15:19:55',
    '2024-04-20 15:19:55',
    '2024-04-20 15:19:55'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    1,
    1,
    2,
    100,
    '{\"razorpayOrderId\":\"1\"}',
    'Pending',
    '2024-04-20 15:21:36',
    '2024-04-20 15:21:36',
    '2024-04-20 15:21:36'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    13,
    1,
    1,
    2,
    100,
    '{\"razorpayOrderId\":\"1\"}',
    'Pending',
    '2024-04-20 15:23:33',
    '2024-04-20 15:23:33',
    '2024-04-20 15:23:33'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    14,
    1,
    1,
    2,
    100,
    '{\"razorpayOrderId\":\"1\"}',
    'Pending',
    '2024-04-20 15:25:12',
    '2024-04-20 15:25:12',
    '2024-04-20 15:25:12'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    1,
    1,
    2,
    100,
    '{\"razorpayOrderId\":\"1\"}',
    'Pending',
    '2024-04-20 15:27:25',
    '2024-04-20 15:27:25',
    '2024-04-20 15:27:25'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    1,
    1,
    2,
    100,
    '{\"razorpayOrderId\":\"1\"}',
    'Pending',
    '2024-04-20 15:29:22',
    '2024-04-20 15:29:22',
    '2024-04-20 15:29:22'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    17,
    1,
    1,
    2,
    100,
    '{\"razorpayOrderId\":\"1\"}',
    'Pending',
    '2024-04-20 15:30:40',
    '2024-04-20 15:30:40',
    '2024-04-20 15:30:40'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    2,
    1,
    2,
    100,
    NULL,
    'Success',
    '2024-04-20 16:33:30',
    '2024-04-20 16:33:30',
    '2024-04-20 16:33:30'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    11,
    4,
    2,
    100,
    NULL,
    'Success',
    '2024-04-20 16:37:02',
    '2024-04-20 16:37:02',
    '2024-04-20 16:37:02'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    11,
    4,
    2,
    100,
    NULL,
    'Success',
    '2024-04-20 16:47:55',
    '2024-04-20 16:47:55',
    '2024-04-20 16:47:55'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    1,
    54,
    2,
    1000,
    '{\"paymentId\":\"payment_1234567890\"}',
    'Success',
    '2024-04-24 12:14:01',
    '2024-04-24 12:14:01',
    '2024-06-01 10:52:48'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    22,
    1,
    1,
    2,
    1000,
    '{\"paymentId\":\"payment_1234567890\"}',
    'Success',
    '2024-04-24 12:16:01',
    '2024-04-24 12:16:01',
    '2024-04-24 12:16:01'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    23,
    1,
    1,
    2,
    1000,
    '{\"paymentId\":\"payment_1234567890\"}',
    'Success',
    '2024-04-24 12:18:38',
    '2024-04-24 12:18:38',
    '2024-04-24 12:18:38'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    24,
    1,
    1,
    2,
    1000,
    '{\"paymentId\":\"payment_1234567890\"}',
    'Success',
    '2024-04-24 12:27:36',
    '2024-04-24 12:27:36',
    '2024-04-24 12:27:36'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    25,
    2,
    1,
    2,
    1000,
    '{\"paymentId\":\"payment_1234567890\"}',
    'Success',
    '2024-04-24 12:31:20',
    '2024-04-24 12:31:20',
    '2024-04-24 12:31:20'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    26,
    2,
    1,
    2,
    1000,
    '{\"paymentId\":\"payment_1234567890\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-24T07:03:48.234Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"address\":\"123 Main St, Anytown, USA\",\"order\":\"Product details here\"}}',
    'Success',
    '2024-04-24 12:33:48',
    '2024-04-24 12:33:48',
    '2024-04-24 12:33:48'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    27,
    2,
    1,
    2,
    1000,
    '{\"paymentId\":\"payment_1234567890\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-24T07:11:10.503Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"address\":\"123 Main St, Anytown, USA\",\"order\":\"Product details here\"}}',
    'Failed',
    '2024-04-24 12:41:10',
    '2024-04-24 12:41:10',
    '2024-04-24 12:41:10'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    28,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-24T07:42:03.395Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-24 13:12:03',
    '2024-04-24 13:12:03',
    '2024-04-24 13:12:03'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    29,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-24T08:46:01.400Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-24 14:16:01',
    '2024-04-24 14:16:01',
    '2024-04-24 14:16:01'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    30,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-24T08:48:06.077Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-24 14:18:06',
    '2024-04-24 14:18:06',
    '2024-04-24 14:18:06'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    31,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-24T08:50:00.188Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-24 14:20:00',
    '2024-04-24 14:20:00',
    '2024-04-24 14:20:00'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    32,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-24T08:54:06.965Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-24 14:24:06',
    '2024-04-24 14:24:06',
    '2024-04-24 14:24:06'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    33,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-24T08:59:00.813Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-24 14:29:00',
    '2024-04-24 14:29:00',
    '2024-04-24 14:29:00'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    34,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-24T09:00:49.976Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-24 14:30:49',
    '2024-04-24 14:30:49',
    '2024-04-24 14:30:49'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    35,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:26:53.260Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 10:56:53',
    '2024-04-25 10:56:53',
    '2024-04-25 10:56:53'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    36,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:29:11.361Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 10:59:11',
    '2024-04-25 10:59:11',
    '2024-04-25 10:59:11'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    37,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:31:31.151Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:01:31',
    '2024-04-25 11:01:31',
    '2024-04-25 11:01:31'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    38,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:36:17.389Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:06:17',
    '2024-04-25 11:06:17',
    '2024-04-25 11:06:17'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    39,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:41:12.571Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:11:12',
    '2024-04-25 11:11:12',
    '2024-04-25 11:11:12'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    40,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:43:58.191Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:13:58',
    '2024-04-25 11:13:58',
    '2024-04-25 11:13:58'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    41,
    1,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:45:15.963Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:15:15',
    '2024-04-25 11:15:15',
    '2024-04-25 11:15:15'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    42,
    3,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:46:20.958Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:16:20',
    '2024-04-25 11:16:20',
    '2024-04-25 11:16:20'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    43,
    3,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:49:26.164Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:19:26',
    '2024-04-25 11:19:26',
    '2024-04-25 11:19:26'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    44,
    3,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:50:02.079Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:20:02',
    '2024-04-25 11:20:02',
    '2024-04-25 11:20:02'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    45,
    3,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:50:24.225Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:20:24',
    '2024-04-25 11:20:24',
    '2024-04-25 11:20:24'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    46,
    3,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-04-25T05:55:23.938Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-04-25 11:25:23',
    '2024-04-25 11:25:23',
    '2024-04-25 11:25:23'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    47,
    3,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-05-04T11:33:46.701Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-05-04 17:03:46',
    '2024-05-04 17:03:46',
    '2024-05-04 17:03:46'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    48,
    3,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-05-04T11:38:03.514Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-05-04 17:08:03',
    '2024-05-04 17:08:03',
    '2024-05-04 17:08:03'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    49,
    3,
    1,
    2,
    100,
    '{\"paymentId\":\"123456789\",\"paymentMethod\":\"Credit Card\",\"timestamp\":\"2024-05-04T11:40:49.138Z\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-05-04 17:10:49',
    '2024-05-04 17:10:49',
    '2024-05-04 17:10:49'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    50,
    3,
    1,
    2,
    100,
    '{\"paymentMethod\":\"Paytm\",\"timestamp\":\"2024-05-04T12:17:38.209Z\",\"transactionId\":\"TXN123456789\",\"bankTransactionId\":\"BANKTXN123456789\",\"bankName\":\"Bank of Paytm\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-05-04 17:47:38',
    '2024-05-04 17:47:38',
    '2024-05-04 17:47:38'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    51,
    3,
    1,
    2,
    100,
    '{\"paymentMethod\":\"Paytm\",\"timestamp\":\"2024-05-04T12:23:37.345Z\",\"transactionId\":\"TXN123456789\",\"bankTransactionId\":\"BANKTXN123456789\",\"bankName\":\"Bank of Paytm\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-05-04 17:53:37',
    '2024-05-04 17:53:37',
    '2024-05-04 17:53:37'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    52,
    3,
    1,
    2,
    100,
    '{\"paymentMethod\":\"Paytm\",\"timestamp\":\"2024-05-04T12:32:45.984Z\",\"transactionId\":\"TXN123456789\",\"bankTransactionId\":\"BANKTXN123456789\",\"bankName\":\"Bank of Paytm\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Failed',
    '2024-05-04 18:02:45',
    '2024-05-04 18:02:45',
    '2024-05-04 18:02:45'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    53,
    3,
    1,
    2,
    100,
    '{\"paymentMethod\":\"Paytm\",\"timestamp\":\"2024-05-04T12:35:41.105Z\",\"transactionId\":\"TXN123456789\",\"bankTransactionId\":\"BANKTXN123456789\",\"bankName\":\"Bank of Paytm\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-05-04 18:05:41',
    '2024-05-04 18:05:41',
    '2024-05-04 18:05:41'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    55,
    3,
    1,
    3,
    100,
    '{\"paymentMethod\":\"PayUMoney\",\"timestamp\":\"2024-05-06T09:21:43.870Z\",\"transactionId\":\"TXN123456789\",\"bankTransactionId\":\"BANKTXN123456789\",\"bankName\":\"Bank of Paytm\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-05-06 14:51:43',
    '2024-05-06 14:51:43',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    56,
    3,
    1,
    3,
    100,
    '{\"paymentMethod\":\"PayUMoney\",\"timestamp\":\"2024-05-06T09:23:33.859Z\",\"transactionId\":\"TXN123456789\",\"bankTransactionId\":\"BANKTXN123456789\",\"bankName\":\"Bank of Paytm\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-05-06 14:53:33',
    '2024-05-06 14:53:33',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    57,
    3,
    1,
    4,
    100,
    '{\"paymentMethod\":\"Paytm\",\"timestamp\":\"2024-05-06T09:26:26.435Z\",\"transactionId\":\"TXN123456789\",\"bankTransactionId\":\"BANKTXN123456789\",\"bankName\":\"Bank of Paytm\",\"customer\":{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\",\"address\":\"123 Main St\",\"order\":\"...\"}}',
    'Success',
    '2024-05-06 14:56:26',
    '2024-05-06 14:56:26',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    58,
    3,
    1,
    5,
    100,
    '{\"paymentMethod\":\"PayPal\",\"timestamp\":\"2024-05-06T10:47:45.187Z\",\"paymentId\":\"PAY-123456789\",\"paymentAmount\":\"100.00\",\"paymentStatus\":\"COMPLETED\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-04-11 11:11:14\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-06 16:17:45',
    '2024-05-06 16:17:45',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    59,
    3,
    1,
    5,
    100,
    '{\"paymentMethod\":\"PayPal\",\"timestamp\":\"2024-05-06T10:50:07.175Z\",\"paymentId\":\"PAY-123456789\",\"paymentAmount\":\"100.00\",\"paymentStatus\":\"COMPLETED\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-04-11 11:11:14\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-06 16:20:07',
    '2024-05-06 16:20:07',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    60,
    3,
    1,
    5,
    100,
    '{\"paymentMethod\":\"PayPal\",\"timestamp\":\"2024-05-06T11:05:47.281Z\",\"paymentId\":\"PAY-123456789\",\"paymentAmount\":\"100.00\",\"paymentStatus\":\"DENIED\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-04-11 11:11:14\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Failed',
    '2024-05-06 16:35:47',
    '2024-05-06 16:35:47',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    61,
    3,
    1,
    5,
    100,
    '{\"paymentMethod\":\"PayPal\",\"timestamp\":\"2024-05-06T11:06:46.037Z\",\"paymentId\":\"PAY-123456789\",\"paymentAmount\":\"100.00\",\"paymentStatus\":\"DENIED\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 16:35:48\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Cancelled\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Failed',
    '2024-05-06 16:36:46',
    '2024-05-06 16:36:46',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    63,
    3,
    1,
    1,
    100,
    '{\"paymentMethod\":\"Stripe\",\"timestamp\":\"2024-05-06T11:15:34.541Z\",\"paymentId\":\"pi_123456789\",\"paymentAmount\":100,\"paymentStatus\":\"succeeded\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 16:35:48\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Cancelled\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-06 16:45:34',
    '2024-05-06 16:45:34',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    65,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-06T11:30:25.834Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 16:45:35\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-06 17:00:25',
    '2024-05-06 17:00:25',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    66,
    3,
    1,
    2,
    1000,
    '{\"paymentMethod\":\"PayUmoney\",\"timestamp\":\"2024-05-06T11:37:34.439Z\",\"paymentId\":\"transaction_id_123\",\"paymentAmount\":1000,\"paymentStatus\":\"failed\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 16:45:35\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Failed',
    '2024-05-06 17:07:34',
    '2024-05-06 17:07:34',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    67,
    3,
    1,
    3,
    1000,
    '{\"paymentMethod\":\"Paytm\",\"timestamp\":\"2024-05-06T12:08:48.658Z\",\"transactionId\":\"transaction_id_123\",\"bankTransactionId\":\"bank_transaction_id_123\",\"bankName\":\"Bank Name\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:07:36\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Cancelled\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-06 17:38:48',
    '2024-05-06 17:38:48',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    68,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-06T12:57:48.764Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:38:50\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-06 18:27:48',
    '2024-05-06 18:27:48',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    69,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-07T06:36:18.007Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:38:50\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-07 12:06:18',
    '2024-05-07 12:06:18',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    70,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-07T06:36:41.726Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:38:50\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-07 12:06:41',
    '2024-05-07 12:06:41',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    71,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-07T06:38:02.551Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:38:50\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-07 12:08:02',
    '2024-05-07 12:08:02',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    72,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-07T06:44:13.747Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:38:50\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-07 12:14:13',
    '2024-05-07 12:14:13',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    73,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-07T06:46:38.404Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:38:50\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-07 12:16:38',
    '2024-05-07 12:16:38',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    74,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-07T06:48:14.218Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:38:50\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-07 12:18:14',
    '2024-05-07 12:18:14',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    75,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-07T07:06:50.022Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:38:50\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-07 12:36:50',
    '2024-05-07 12:36:50',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    76,
    3,
    1,
    1,
    500,
    '{\"paymentMethod\":\"Razorpay\",\"timestamp\":\"2024-05-07T07:10:23.237Z\",\"paymentId\":\"payment_id_123\",\"paymentAmount\":500,\"paymentStatus\":\"captured\",\"orderId\":\"3\",\"customerId\":\"1\",\"customer\":{\"createdAt\":\"2024-02-21 15:54:01\",\"updatedAt\":\"2024-04-25 10:39:57\",\"userId\":1,\"firstName\":\"Mical\",\"lastName\":\"Welly\",\"mobile\":\"9977311550\",\"email\":\"ban@influent.com\",\"password\":\"$2a$10$dF9pE7dLh1fVfHNde49EjedfO9v0BxEcbXh52rwuE1d8F9YloaoTi\",\"emailVerified\":0,\"mpin\":null,\"registerAtIp\":\"192.0.0.1\",\"emailVerificationCode\":453378,\"emailExpiryAt\":\"2024-03-21T13:09:45.000Z\",\"socialLogins\":null,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJCeTlFdm04QjRsYkoiLCJpYXQiOjE3MTE1MzQwNTQsImV4cCI6MTcxMTU1MjA1NH0.bZVu5UXNZij1PeSSxLmhoU07rVfZTpFwS2PRJJKYsjg\",\"tokenGeneratedAt\":\"2024-03-27T10:07:34.000Z\",\"tokenExpireAt\":\"2024-03-27T12:14:16.000Z\",\"xApiKey\":\"By9Evm8B4lbJ\",\"lastLoginAt\":\"2024-03-27T10:07:34.000Z\",\"emailUpdatedAt\":\"\",\"passwordUpdatedAt\":\"\",\"userStatus\":\"Active\",\"bannedReason\":\"\"},\"order\":{\"orderDate\":\"2024-04-11 11:11:14\",\"createdAt\":\"2024-04-11 11:11:14\",\"updatedAt\":\"2024-05-06 17:38:50\",\"orderId\":3,\"customerId\":1,\"orderAmount\":100,\"orderStatus\":\"Processing\",\"billingName\":null,\"billingAddress\":\"\",\"billingEmail\":\"\",\"billingMobileNumber\":\"\",\"shippingName\":null,\"shippingAddress\":\"\",\"shippingEmail\":\"\",\"shippingMobileNumber\":\"\",\"couponCode\":null,\"OrderItems\":[]}}',
    'Success',
    '2024-05-07 12:40:23',
    '2024-05-07 12:40:23',
    NULL
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    77,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T07:12:09.493Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"captured\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-04-11\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Pending\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Success',
    '2024-05-29 12:42:09',
    '2024-05-29 12:42:09',
    '2024-05-29 12:42:09'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    78,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T07:33:27.160Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"captured\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Success',
    '2024-05-29 13:03:27',
    '2024-05-29 13:03:27',
    '2024-05-29 13:03:27'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    79,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T07:36:33.625Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Failed',
    '2024-05-29 13:06:33',
    '2024-05-29 13:06:33',
    '2024-05-29 13:06:33'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    80,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T07:39:21.262Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Failed',
    '2024-05-29 13:09:21',
    '2024-05-29 13:09:21',
    '2024-05-29 13:09:21'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    81,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T09:37:15.633Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Cancelled\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Failed',
    '2024-05-29 15:07:15',
    '2024-05-29 15:07:15',
    '2024-05-29 15:07:15'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    82,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T11:10:08.784Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Cancelled\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Failed',
    '2024-05-29 16:40:08',
    '2024-05-29 16:40:08',
    '2024-05-29 16:40:08'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    83,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T11:52:46.232Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Cancelled\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Failed',
    '2024-05-29 17:22:46',
    '2024-05-29 17:22:46',
    '2024-05-29 17:22:46'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    84,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T11:59:24.176Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Cancelled\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Failed',
    '2024-05-29 17:29:24',
    '2024-05-29 17:29:24',
    '2024-05-29 17:29:24'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    85,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T12:11:08.134Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Cancelled\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Failed',
    '2024-05-29 17:41:08',
    '2024-05-29 17:41:08',
    '2024-05-29 17:41:08'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    86,
    4,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T12:50:59.984Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"4\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-04-11\\\",\\\"createdAt\\\":\\\"2024-04-11\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":4,\\\"customerId\\\":4,\\\"orderAmount\\\":294,\\\"orderStatus\\\":\\\"Cancelled\\\",\\\"billingName\\\":\\\"Updated Billing Name\\\",\\\"billingAddress\\\":\\\"456 Updated Main St\\\",\\\"billingEmail\\\":\\\"updated_email@example.com\\\",\\\"billingMobileNumber\\\":\\\"123-456-7890\\\",\\\"shippingName\\\":\\\"Updated Shipping Name\\\",\\\"shippingAddress\\\":\\\"456 Updated Main St\\\",\\\"shippingEmail\\\":\\\"updated_shipping@example.com\\\",\\\"shippingMobileNumber\\\":\\\"123-456-7890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[]}}\"',
    'Failed',
    '2024-05-29 18:20:59',
    '2024-05-29 18:21:00',
    '2024-05-29 18:21:00'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    87,
    118,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T12:53:53.186Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"118\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-05-29\\\",\\\"createdAt\\\":\\\"2024-05-29\\\",\\\"updatedAt\\\":\\\"Invalid date\\\",\\\"orderId\\\":118,\\\"customerId\\\":1,\\\"orderAmount\\\":1000,\\\"orderStatus\\\":\\\"Pending\\\",\\\"billingName\\\":\\\"hello \\\",\\\"billingAddress\\\":\\\"900 florida\\\",\\\"billingEmail\\\":\\\"deo@gmail.com\\\",\\\"billingMobileNumber\\\":\\\"2489916514\\\",\\\"shippingName\\\":\\\"hello \\\",\\\"shippingAddress\\\":\\\"900 florida\\\",\\\"shippingEmail\\\":\\\"deo@gmail.com\\\",\\\"shippingMobileNumber\\\":\\\"2489916514\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-05-29\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":270,\\\"orderId\\\":118,\\\"productId\\\":225,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Failed',
    '2024-05-29 18:23:53',
    '2024-05-29 18:23:53',
    '2024-05-29 18:23:53'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    88,
    118,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-05-29T12:56:51.839Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"118\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-05-24 12:42:25\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiIzZlR1VWZ0a256elUiLCJ1c2VyUm9sZSI6MiwiaWF0IjoxNzE2MzgxODgwLCJleHAiOjE3MTYzOTk4ODB9.DnQA1E3jMyOjSYcCNZnss-JsjN7gKOenfkm515jFZQQ\\\",\\\"tokenGeneratedAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-05-22T17:44:40.000Z\\\",\\\"xApiKey\\\":\\\"3fTuUftknzzU\\\",\\\"lastLoginAt\\\":\\\"2024-05-22T12:44:40.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":2,\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-05-29\\\",\\\"createdAt\\\":\\\"2024-05-29\\\",\\\"updatedAt\\\":\\\"2024-05-29\\\",\\\"orderId\\\":118,\\\"customerId\\\":1,\\\"orderAmount\\\":1000,\\\"orderStatus\\\":\\\"Cancelled\\\",\\\"billingName\\\":\\\"hello \\\",\\\"billingAddress\\\":\\\"900 florida\\\",\\\"billingEmail\\\":\\\"deo@gmail.com\\\",\\\"billingMobileNumber\\\":\\\"2489916514\\\",\\\"shippingName\\\":\\\"hello \\\",\\\"shippingAddress\\\":\\\"900 florida\\\",\\\"shippingEmail\\\":\\\"deo@gmail.com\\\",\\\"shippingMobileNumber\\\":\\\"2489916514\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-05-29\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":270,\\\"orderId\\\":118,\\\"productId\\\":225,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Failed',
    '2024-05-29 18:26:51',
    '2024-05-29 18:26:51',
    '2024-05-29 18:26:51'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    89,
    146,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-06-07T10:23:02.494Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"failed\\\",\\\"orderId\\\":\\\"146\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-06-06 17:04:05\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiI3dVZJbFhSYUR0MG8iLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE3NjczNjQ1LCJleHAiOjE3MTc2OTE2NDV9.aYJWlEN7xxrr4nPPLRBqw1GVIX1RNlwBYrvBmbVme4g\\\",\\\"tokenGeneratedAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-06-06T16:34:05.000Z\\\",\\\"xApiKey\\\":\\\"7uVIlXRaDt0o\\\",\\\"lastLoginAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":1,\\\"walletBalance\\\":\\\"0.00\\\",\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-06-07\\\",\\\"deliveryDate\\\":\\\"2024-06-07 15:48:11\\\",\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":\\\"2024-06-07\\\",\\\"orderId\\\":146,\\\"customerId\\\":4,\\\"orderAmount\\\":1100,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"John Doe\\\",\\\"billingAddress\\\":\\\"123 Main St\\\",\\\"billingEmail\\\":\\\"john.doe@example.com\\\",\\\"billingMobileNumber\\\":\\\"1234567890\\\",\\\"shippingName\\\":\\\"John Doe\\\",\\\"shippingAddress\\\":\\\"123 Main St\\\",\\\"shippingEmail\\\":\\\"john.doe@example.com\\\",\\\"shippingMobileNumber\\\":\\\"1234567890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":331,\\\"orderId\\\":146,\\\"productId\\\":185,\\\"quantity\\\":2,\\\"unitPrice\\\":50,\\\"subtotal\\\":100},{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":332,\\\"orderId\\\":146,\\\"productId\\\":235,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Failed',
    '2024-06-07 15:53:02',
    '2024-06-07 15:53:02',
    '2024-06-07 15:53:02'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    90,
    146,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-06-07T10:25:02.566Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"captured\\\",\\\"orderId\\\":\\\"146\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-06-06 17:04:05\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiI3dVZJbFhSYUR0MG8iLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE3NjczNjQ1LCJleHAiOjE3MTc2OTE2NDV9.aYJWlEN7xxrr4nPPLRBqw1GVIX1RNlwBYrvBmbVme4g\\\",\\\"tokenGeneratedAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-06-06T16:34:05.000Z\\\",\\\"xApiKey\\\":\\\"7uVIlXRaDt0o\\\",\\\"lastLoginAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":1,\\\"walletBalance\\\":\\\"0.00\\\",\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-06-07\\\",\\\"deliveryDate\\\":\\\"2024-06-07 15:53:03\\\",\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":\\\"2024-06-07\\\",\\\"orderId\\\":146,\\\"customerId\\\":4,\\\"orderAmount\\\":1100,\\\"orderStatus\\\":\\\"Cancelled\\\",\\\"billingName\\\":\\\"John Doe\\\",\\\"billingAddress\\\":\\\"123 Main St\\\",\\\"billingEmail\\\":\\\"john.doe@example.com\\\",\\\"billingMobileNumber\\\":\\\"1234567890\\\",\\\"shippingName\\\":\\\"John Doe\\\",\\\"shippingAddress\\\":\\\"123 Main St\\\",\\\"shippingEmail\\\":\\\"john.doe@example.com\\\",\\\"shippingMobileNumber\\\":\\\"1234567890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":331,\\\"orderId\\\":146,\\\"productId\\\":185,\\\"quantity\\\":2,\\\"unitPrice\\\":50,\\\"subtotal\\\":100},{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":332,\\\"orderId\\\":146,\\\"productId\\\":235,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Success',
    '2024-06-07 15:55:02',
    '2024-06-07 15:55:02',
    '2024-06-07 15:55:02'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    91,
    146,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-06-07T10:32:58.159Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"captured\\\",\\\"orderId\\\":\\\"146\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-06-06 17:04:05\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiI3dVZJbFhSYUR0MG8iLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE3NjczNjQ1LCJleHAiOjE3MTc2OTE2NDV9.aYJWlEN7xxrr4nPPLRBqw1GVIX1RNlwBYrvBmbVme4g\\\",\\\"tokenGeneratedAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-06-06T16:34:05.000Z\\\",\\\"xApiKey\\\":\\\"7uVIlXRaDt0o\\\",\\\"lastLoginAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":1,\\\"walletBalance\\\":\\\"0.00\\\",\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-06-07\\\",\\\"deliveryDate\\\":\\\"2024-06-07 15:55:03\\\",\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":\\\"2024-06-07\\\",\\\"orderId\\\":146,\\\"customerId\\\":4,\\\"orderAmount\\\":1100,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"John Doe\\\",\\\"billingAddress\\\":\\\"123 Main St\\\",\\\"billingEmail\\\":\\\"john.doe@example.com\\\",\\\"billingMobileNumber\\\":\\\"1234567890\\\",\\\"shippingName\\\":\\\"John Doe\\\",\\\"shippingAddress\\\":\\\"123 Main St\\\",\\\"shippingEmail\\\":\\\"john.doe@example.com\\\",\\\"shippingMobileNumber\\\":\\\"1234567890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":331,\\\"orderId\\\":146,\\\"productId\\\":185,\\\"quantity\\\":2,\\\"unitPrice\\\":50,\\\"subtotal\\\":100},{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":332,\\\"orderId\\\":146,\\\"productId\\\":235,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Success',
    '2024-06-07 16:02:58',
    '2024-06-07 16:02:58',
    '2024-06-07 16:02:58'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    92,
    146,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-06-07T10:35:23.544Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"captured\\\",\\\"orderId\\\":\\\"146\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-06-06 17:04:05\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiI3dVZJbFhSYUR0MG8iLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE3NjczNjQ1LCJleHAiOjE3MTc2OTE2NDV9.aYJWlEN7xxrr4nPPLRBqw1GVIX1RNlwBYrvBmbVme4g\\\",\\\"tokenGeneratedAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-06-06T16:34:05.000Z\\\",\\\"xApiKey\\\":\\\"7uVIlXRaDt0o\\\",\\\"lastLoginAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":1,\\\"walletBalance\\\":\\\"0.00\\\",\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-06-07\\\",\\\"deliveryDate\\\":\\\"2024-06-07 15:55:03\\\",\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":\\\"2024-06-07\\\",\\\"orderId\\\":146,\\\"customerId\\\":4,\\\"orderAmount\\\":1100,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"John Doe\\\",\\\"billingAddress\\\":\\\"123 Main St\\\",\\\"billingEmail\\\":\\\"john.doe@example.com\\\",\\\"billingMobileNumber\\\":\\\"1234567890\\\",\\\"shippingName\\\":\\\"John Doe\\\",\\\"shippingAddress\\\":\\\"123 Main St\\\",\\\"shippingEmail\\\":\\\"john.doe@example.com\\\",\\\"shippingMobileNumber\\\":\\\"1234567890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":331,\\\"orderId\\\":146,\\\"productId\\\":185,\\\"quantity\\\":2,\\\"unitPrice\\\":50,\\\"subtotal\\\":100},{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":332,\\\"orderId\\\":146,\\\"productId\\\":235,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Success',
    '2024-06-07 16:05:23',
    '2024-06-07 16:05:23',
    '2024-06-07 16:05:23'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    93,
    146,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-06-07T10:47:27.717Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"captured\\\",\\\"orderId\\\":\\\"146\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-06-06 17:04:05\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiI3dVZJbFhSYUR0MG8iLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE3NjczNjQ1LCJleHAiOjE3MTc2OTE2NDV9.aYJWlEN7xxrr4nPPLRBqw1GVIX1RNlwBYrvBmbVme4g\\\",\\\"tokenGeneratedAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-06-06T16:34:05.000Z\\\",\\\"xApiKey\\\":\\\"7uVIlXRaDt0o\\\",\\\"lastLoginAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":1,\\\"walletBalance\\\":\\\"0.00\\\",\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-06-07\\\",\\\"deliveryDate\\\":\\\"2024-06-07 15:55:03\\\",\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":\\\"2024-06-07\\\",\\\"orderId\\\":146,\\\"customerId\\\":4,\\\"orderAmount\\\":1100,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"John Doe\\\",\\\"billingAddress\\\":\\\"123 Main St\\\",\\\"billingEmail\\\":\\\"john.doe@example.com\\\",\\\"billingMobileNumber\\\":\\\"1234567890\\\",\\\"shippingName\\\":\\\"John Doe\\\",\\\"shippingAddress\\\":\\\"123 Main St\\\",\\\"shippingEmail\\\":\\\"john.doe@example.com\\\",\\\"shippingMobileNumber\\\":\\\"1234567890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":331,\\\"orderId\\\":146,\\\"productId\\\":185,\\\"quantity\\\":2,\\\"unitPrice\\\":50,\\\"subtotal\\\":100},{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":332,\\\"orderId\\\":146,\\\"productId\\\":235,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Success',
    '2024-06-07 16:17:27',
    '2024-06-07 16:17:27',
    '2024-06-07 16:17:27'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    94,
    146,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-06-07T10:48:03.507Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"captured\\\",\\\"orderId\\\":\\\"146\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-06-06 17:04:05\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"mochel\\\",\\\"lastName\\\":\\\"Welly1\\\",\\\"mobile\\\":\\\"9054885197\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiI3dVZJbFhSYUR0MG8iLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE3NjczNjQ1LCJleHAiOjE3MTc2OTE2NDV9.aYJWlEN7xxrr4nPPLRBqw1GVIX1RNlwBYrvBmbVme4g\\\",\\\"tokenGeneratedAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-06-06T16:34:05.000Z\\\",\\\"xApiKey\\\":\\\"7uVIlXRaDt0o\\\",\\\"lastLoginAt\\\":\\\"2024-06-06T11:34:05.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":1,\\\"walletBalance\\\":\\\"0.00\\\",\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-06-07\\\",\\\"deliveryDate\\\":\\\"2024-06-07 15:55:03\\\",\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":\\\"2024-06-07\\\",\\\"orderId\\\":146,\\\"customerId\\\":4,\\\"orderAmount\\\":1100,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"John Doe\\\",\\\"billingAddress\\\":\\\"123 Main St\\\",\\\"billingEmail\\\":\\\"john.doe@example.com\\\",\\\"billingMobileNumber\\\":\\\"1234567890\\\",\\\"shippingName\\\":\\\"John Doe\\\",\\\"shippingAddress\\\":\\\"123 Main St\\\",\\\"shippingEmail\\\":\\\"john.doe@example.com\\\",\\\"shippingMobileNumber\\\":\\\"1234567890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":331,\\\"orderId\\\":146,\\\"productId\\\":185,\\\"quantity\\\":2,\\\"unitPrice\\\":50,\\\"subtotal\\\":100},{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":332,\\\"orderId\\\":146,\\\"productId\\\":235,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Success',
    '2024-06-07 16:18:03',
    '2024-06-07 16:18:03',
    '2024-06-07 16:18:03'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    95,
    146,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-06-13T06:46:04.307Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"captured\\\",\\\"orderId\\\":\\\"146\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-06-11 15:15:51\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"John\\\",\\\"lastName\\\":\\\"Doe\\\",\\\"mobile\\\":\\\"1234567890\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiJab2MxUUFGVE5GeWYiLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE4MDk5MTUxLCJleHAiOjE3MTgxMTcxNTF9.0K5y73kGuOjhSHSMlrU_i2atLgCdm3hSeQLdA9pQgCs\\\",\\\"tokenGeneratedAt\\\":\\\"2024-06-11T09:45:51.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-06-11T14:45:51.000Z\\\",\\\"xApiKey\\\":\\\"Zoc1QAFTNFyf\\\",\\\"lastLoginAt\\\":\\\"2024-06-11T09:45:51.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":1,\\\"walletBalance\\\":\\\"0.00\\\",\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-06-07\\\",\\\"deliveryDate\\\":\\\"2024-06-07 15:55:03\\\",\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":\\\"2024-06-07\\\",\\\"orderId\\\":146,\\\"customerId\\\":4,\\\"orderAmount\\\":1100,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"John Doe\\\",\\\"billingAddress\\\":\\\"123 Main St\\\",\\\"billingEmail\\\":\\\"john.doe@example.com\\\",\\\"billingMobileNumber\\\":\\\"1234567890\\\",\\\"shippingName\\\":\\\"John Doe\\\",\\\"shippingAddress\\\":\\\"123 Main St\\\",\\\"shippingEmail\\\":\\\"john.doe@example.com\\\",\\\"shippingMobileNumber\\\":\\\"1234567890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":331,\\\"orderId\\\":146,\\\"productId\\\":185,\\\"quantity\\\":2,\\\"unitPrice\\\":50,\\\"subtotal\\\":100},{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":332,\\\"orderId\\\":146,\\\"productId\\\":235,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Success',
    '2024-06-13 12:16:04',
    '2024-06-13 12:16:04',
    '2024-06-13 12:16:04'
  );
INSERT INTO
  `transactions` (
    `transaction_id`,
    `order_id`,
    `customer_id`,
    `payment_gateway_id`,
    `transaction_amount`,
    `transaction_details`,
    `transaction_status`,
    `transaction_date`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    96,
    146,
    4,
    1,
    500,
    '\"{\\\"paymentMethod\\\":\\\"Razorpay\\\",\\\"timestamp\\\":\\\"2024-06-13T06:47:58.779Z\\\",\\\"paymentId\\\":\\\"payment_id_123\\\",\\\"paymentAmount\\\":500,\\\"paymentStatus\\\":\\\"captured\\\",\\\"orderId\\\":\\\"146\\\",\\\"customerId\\\":\\\"4\\\",\\\"customer\\\":{\\\"userStatus\\\":\\\"Active\\\",\\\"createdAt\\\":\\\"2024-03-21 15:17:36\\\",\\\"updatedAt\\\":\\\"2024-06-11 15:15:51\\\",\\\"userId\\\":4,\\\"firstName\\\":\\\"John\\\",\\\"lastName\\\":\\\"Doe\\\",\\\"mobile\\\":\\\"1234567890\\\",\\\"email\\\":\\\"user2@gmail.com\\\",\\\"password\\\":\\\"$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u\\\",\\\"emailVerified\\\":0,\\\"mpin\\\":null,\\\"registerAtIp\\\":\\\"192.0.0.1\\\",\\\"emailVerificationCode\\\":249784,\\\"emailExpiryAt\\\":\\\"2024-03-21T09:57:36.000Z\\\",\\\"socialLogins\\\":null,\\\"token\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiJab2MxUUFGVE5GeWYiLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE4MDk5MTUxLCJleHAiOjE3MTgxMTcxNTF9.0K5y73kGuOjhSHSMlrU_i2atLgCdm3hSeQLdA9pQgCs\\\",\\\"tokenGeneratedAt\\\":\\\"2024-06-11T09:45:51.000Z\\\",\\\"tokenExpireAt\\\":\\\"2024-06-11T14:45:51.000Z\\\",\\\"xApiKey\\\":\\\"Zoc1QAFTNFyf\\\",\\\"lastLoginAt\\\":\\\"2024-06-11T09:45:51.000Z\\\",\\\"emailUpdatedAt\\\":\\\"\\\",\\\"passwordUpdatedAt\\\":\\\"\\\",\\\"roleId\\\":1,\\\"walletBalance\\\":\\\"0.00\\\",\\\"bannedReason\\\":\\\"\\\"},\\\"order\\\":{\\\"orderDate\\\":\\\"2024-06-07\\\",\\\"deliveryDate\\\":\\\"2024-06-07 15:55:03\\\",\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":\\\"2024-06-07\\\",\\\"orderId\\\":146,\\\"customerId\\\":4,\\\"orderAmount\\\":1100,\\\"orderStatus\\\":\\\"Processing\\\",\\\"billingName\\\":\\\"John Doe\\\",\\\"billingAddress\\\":\\\"123 Main St\\\",\\\"billingEmail\\\":\\\"john.doe@example.com\\\",\\\"billingMobileNumber\\\":\\\"1234567890\\\",\\\"shippingName\\\":\\\"John Doe\\\",\\\"shippingAddress\\\":\\\"123 Main St\\\",\\\"shippingEmail\\\":\\\"john.doe@example.com\\\",\\\"shippingMobileNumber\\\":\\\"1234567890\\\",\\\"couponCode\\\":null,\\\"OrderItems\\\":[{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":331,\\\"orderId\\\":146,\\\"productId\\\":185,\\\"quantity\\\":2,\\\"unitPrice\\\":50,\\\"subtotal\\\":100},{\\\"createdAt\\\":\\\"2024-06-07\\\",\\\"updatedAt\\\":null,\\\"orderItemID\\\":332,\\\"orderId\\\":146,\\\"productId\\\":235,\\\"quantity\\\":1,\\\"unitPrice\\\":1000,\\\"subtotal\\\":1000}]}}\"',
    'Success',
    '2024-06-13 12:17:58',
    '2024-06-13 12:17:58',
    '2024-06-13 12:17:58'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user_devices
# ------------------------------------------------------------

INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    'aslawks2930eedskldkskdlsasas',
    '132',
    0,
    1,
    'asasas',
    '2024-02-21 15:43:16',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    1,
    'aslawks2930eedskldkskdlsasas',
    '132',
    0,
    1,
    'asasas',
    '2024-02-21 15:50:21',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    1,
    'aslawks2930eedskldkskdlsasas',
    '132',
    0,
    1,
    'asasas',
    '2024-02-21 15:54:01',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    2,
    'aslawks2930eedskldkskdlsasas',
    '132',
    0,
    1,
    'asasas',
    '2024-03-02 12:24:43',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    3,
    'aslawks2930eedskldkskdlsasas',
    '132',
    0,
    1,
    'asasas',
    '2024-03-02 13:15:43',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    4,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-21 15:17:36',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    5,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-21 18:23:18',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    6,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-22 16:04:03',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    11,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-23 15:38:36',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    12,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-26 10:16:41',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    13,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-27 10:47:06',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    14,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-27 11:48:45',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    13,
    15,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-27 11:53:32',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    14,
    16,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-27 12:43:03',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    17,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-27 14:53:27',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    18,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-27 15:37:28',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    17,
    19,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-27 16:26:29',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    20,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-28 09:53:01',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    21,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-28 18:07:24',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    22,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-03-28 18:07:40',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    23,
    'DT438AHJIJN323',
    '132',
    0,
    1,
    'asasas',
    '2024-04-01 10:03:18',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    22,
    24,
    'DT438AHJIJN323',
    '132',
    0,
    1,
    NULL,
    '2024-04-01 10:03:44',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    23,
    25,
    'DT438AHJIJN323',
    '132',
    0,
    1,
    NULL,
    '2024-04-01 10:03:57',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    24,
    26,
    'DT438AHJIJN323',
    '132',
    0,
    1,
    NULL,
    '2024-04-01 10:04:07',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    25,
    27,
    'DT438AHJIJN323',
    NULL,
    0,
    1,
    NULL,
    '2024-04-01 10:04:18',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    26,
    28,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-04-01 10:04:32',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    27,
    29,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-04-01 10:31:13',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    28,
    30,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-04-01 10:34:21',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    29,
    31,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-04-01 10:39:15',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    30,
    32,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-04-02 12:52:00',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    31,
    33,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-04-08 12:04:02',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    32,
    34,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-04-11 09:17:56',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    33,
    35,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-04-11 09:54:42',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    34,
    36,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-04-11 09:57:10',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    35,
    37,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-04-12 11:05:51',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    36,
    38,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-04-13 10:09:01',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    37,
    39,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-04-18 14:45:55',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    38,
    40,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-04-18 15:56:13',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    39,
    41,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-04-25 10:02:06',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    40,
    42,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-04-30 17:09:56',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    41,
    43,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-05-03 14:33:07',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    42,
    44,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-05-06 14:20:43',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    43,
    45,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-05-11 16:14:51',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    44,
    46,
    '{{deviceId}}',
    '132',
    0,
    1,
    'asasas',
    '2024-05-17 10:14:17',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    45,
    47,
    'ABC123',
    'iPhone',
    0,
    1,
    'firebaseToken123',
    '2024-05-20 18:15:57',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    46,
    48,
    'ABC123',
    'iPhone',
    0,
    1,
    'firebaseToken123',
    '2024-05-20 18:25:09',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    47,
    49,
    'ABC123',
    'iPhone',
    0,
    1,
    'firebaseToken123',
    '2024-05-21 10:26:55',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    48,
    50,
    'ABC123',
    'iPhone',
    0,
    1,
    'firebaseToken123',
    '2024-05-21 10:31:11',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    49,
    51,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-05-22 12:28:07',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    50,
    52,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-05-22 12:29:50',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    51,
    53,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-05-22 12:39:11',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    52,
    54,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-05-22 12:45:04',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    53,
    55,
    'ABC123',
    'iPhone',
    0,
    1,
    'firebaseToken123',
    '2024-05-22 18:16:25',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    54,
    56,
    'ABC123',
    'iPhone',
    0,
    1,
    'firebaseToken123',
    '2024-05-24 12:27:12',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    55,
    58,
    'ABC123',
    'iPhone',
    0,
    1,
    'firebaseToken123',
    '2024-06-08 12:52:33',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    56,
    59,
    'ABC123',
    'iPhone',
    0,
    1,
    'firebaseToken123',
    '2024-06-08 12:55:02',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    57,
    60,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-06-08 15:40:42',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    58,
    61,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-06-08 16:07:35',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    59,
    62,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-06-12 16:45:08',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    60,
    63,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-06-12 16:47:06',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    61,
    64,
    NULL,
    NULL,
    0,
    1,
    NULL,
    '2024-06-13 09:57:42',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    62,
    65,
    'device_id_123',
    'iPhone',
    0,
    1,
    'firebase_token_123',
    '2024-06-14 12:29:35',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    63,
    66,
    'device_id_123',
    'iPhone',
    0,
    1,
    'firebase_token_123',
    '2024-06-14 12:32:47',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    64,
    67,
    'device_id_123',
    'iPhone',
    0,
    1,
    'firebase_token_123',
    '2024-06-14 12:39:29',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    65,
    68,
    'device_id_123',
    'iPhone',
    0,
    1,
    'firebase_token_123',
    '2024-06-14 12:44:26',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    66,
    70,
    'device_id_123',
    'iPhone',
    0,
    1,
    'firebase_token_123',
    '2024-06-14 14:11:31',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    67,
    71,
    'device_id_123',
    'iPhone',
    0,
    1,
    'firebase_token_123',
    '2024-06-14 14:36:56',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    68,
    72,
    'device_id_123',
    'iPhone',
    0,
    1,
    'firebase_token_123',
    '2024-06-14 15:47:59',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    69,
    73,
    'device_id_123',
    'iPhone',
    0,
    1,
    'firebase_token_123',
    '2024-06-14 16:28:16',
    NULL
  );
INSERT INTO
  `user_devices` (
    `user_device_id`,
    `user_id`,
    `device_id`,
    `device_name`,
    `device_type`,
    `is_active`,
    `firebase_token`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    70,
    74,
    'device_id_123',
    'iPhone',
    0,
    1,
    'firebase_token_123',
    '2024-06-14 16:36:20',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user_notifications
# ------------------------------------------------------------

INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    'This is a test notification',
    'image-url.jpg',
    'order',
    1,
    'read',
    '2024-05-16 11:24:41',
    '2024-05-16 11:24:41'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    1,
    'This is a second test notification',
    'image-url.jpg',
    'order',
    1,
    'read',
    '2024-05-16 11:37:43',
    '2024-05-16 11:37:43'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    2,
    'Updated notification message',
    'jpg',
    'products',
    163,
    'read',
    '2024-05-16 11:48:54',
    '2024-05-16 11:48:54'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    1,
    'This is a second test notification',
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAswMBIgACEQEDEQH/',
    'order',
    1,
    'read',
    '2024-05-16 12:38:47',
    '2024-05-16 12:38:47'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    1,
    'This is a second test notification',
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAswMBIgACEQEDEQH/',
    'order',
    1,
    'read',
    '2024-05-16 12:38:49',
    '2024-05-16 12:38:49'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    1,
    'This is a second test notification',
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAswMBIgACEQEDEQH/',
    'order',
    1,
    'read',
    '2024-05-16 12:38:50',
    '2024-05-16 12:38:50'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    1,
    'This is a second test notification',
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAswMBIgACEQEDEQH/',
    'order',
    1,
    'read',
    '2024-05-16 12:38:51',
    '2024-05-16 12:38:51'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    1,
    'This is a second test notification',
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAswMBIgACEQEDEQH/',
    'order',
    1,
    'read',
    '2024-05-16 12:44:19',
    '2024-05-16 12:44:19'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    1,
    'product not available',
    NULL,
    'order',
    1,
    'read',
    '2024-05-16 17:44:19',
    '2024-05-16 17:44:19'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    13,
    1,
    'your order created sucessfully',
    NULL,
    'order',
    1,
    'read',
    '2024-05-16 17:47:02',
    '2024-05-16 17:47:02'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (14, 1, 'hh', NULL, 'product', 163, 'read', NULL, NULL);
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    1,
    'your order created sucessfully',
    NULL,
    'order',
    1,
    'read',
    '2024-05-16 18:03:16',
    '2024-05-16 18:03:16'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    1,
    'product not available',
    NULL,
    'product',
    1,
    'read',
    '2024-05-16 18:03:40',
    '2024-05-16 18:03:40'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    17,
    1,
    'product not available',
    NULL,
    'product',
    1,
    'read',
    '2024-05-16 18:11:43',
    '2024-05-16 18:11:43'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-16 18:24:48',
    '2024-05-16 18:24:48'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    1,
    'read',
    '2024-05-16 18:45:08',
    '2024-05-16 18:45:08'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    46,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    46,
    'read',
    '2024-05-17 10:14:18',
    '2024-05-17 10:14:18'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    45,
    'Your account has been deleted.',
    NULL,
    'users',
    45,
    'read',
    '2024-05-17 10:15:29',
    '2024-05-17 10:15:29'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    22,
    46,
    'Your account has been deleted.',
    NULL,
    'users',
    46,
    'read',
    '2024-05-17 10:17:07',
    '2024-05-17 10:17:07'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    23,
    1,
    'A new ticket has been created.',
    NULL,
    'ticket',
    6,
    'read',
    '2024-05-17 12:31:41',
    '2024-05-17 12:31:41'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    24,
    1,
    'A new ticket has been created.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-17 14:07:59',
    '2024-05-17 14:07:59'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    25,
    1,
    'A new ticket has been created.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 14:08:10',
    '2024-05-17 14:08:10'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    26,
    1,
    'A new ticket has been created.',
    NULL,
    'ticket',
    9,
    'read',
    '2024-05-17 14:08:24',
    '2024-05-17 14:08:24'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    27,
    1,
    'A new ticket has been created.',
    NULL,
    'ticket',
    10,
    'read',
    '2024-05-17 14:08:34',
    '2024-05-17 14:08:34'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    28,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-17 14:18:28',
    '2024-05-17 14:18:28'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    29,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-17 14:19:15',
    '2024-05-17 14:19:15'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    30,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    3,
    'read',
    '2024-05-17 14:19:34',
    '2024-05-17 14:19:34'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    31,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 14:20:15',
    '2024-05-17 14:20:15'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    32,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-17 14:20:19',
    '2024-05-17 14:20:19'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    33,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-17 14:20:21',
    '2024-05-17 14:20:21'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    34,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    1,
    'read',
    '2024-05-17 15:33:51',
    '2024-05-17 15:33:51'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    35,
    4,
    'A new ticket has been created.',
    NULL,
    'ticket',
    11,
    'read',
    '2024-05-17 15:33:53',
    '2024-05-17 15:33:53'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    36,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    1,
    'read',
    '2024-05-17 15:44:32',
    '2024-05-17 15:44:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    37,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    1,
    'read',
    '2024-05-17 16:09:17',
    '2024-05-17 16:09:17'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    38,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 16:11:22',
    '2024-05-17 16:11:22'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    39,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-17 16:11:25',
    '2024-05-17 16:11:25'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    40,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 16:11:28',
    '2024-05-17 16:11:28'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    41,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 16:11:29',
    '2024-05-17 16:11:29'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    42,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-17 16:11:30',
    '2024-05-17 16:11:30'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    43,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 16:11:39',
    '2024-05-17 16:11:39'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    44,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-17 16:11:47',
    '2024-05-17 16:11:47'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    45,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-17 16:12:21',
    '2024-05-17 16:12:21'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    46,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    1,
    'read',
    '2024-05-17 16:17:19',
    '2024-05-17 16:17:19'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    47,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    1,
    'read',
    '2024-05-17 16:22:13',
    '2024-05-17 16:22:13'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    48,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    1,
    'read',
    '2024-05-17 16:30:36',
    '2024-05-17 16:30:36'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    49,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    1,
    'read',
    '2024-05-17 16:41:00',
    '2024-05-17 16:41:00'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    50,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 16:41:17',
    '2024-05-17 16:41:17'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    51,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-17 16:41:20',
    '2024-05-17 16:41:20'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    52,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 16:41:23',
    '2024-05-17 16:41:23'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    53,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 16:41:36',
    '2024-05-17 16:41:36'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    54,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-17 16:41:53',
    '2024-05-17 16:41:53'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    55,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-17 16:41:57',
    '2024-05-17 16:41:57'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    56,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 16:44:01',
    '2024-05-17 16:44:01'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    57,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-17 16:46:06',
    '2024-05-17 16:46:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    58,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 16:52:08',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    59,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 16:57:54',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    60,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 17:15:09',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    61,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 17:18:18',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    62,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 17:55:40',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    63,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 18:14:23',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    64,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 18:18:08',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    65,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 18:28:56',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    66,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 18:32:57',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    67,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 18:34:55',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    68,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-17 18:42:30',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    69,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-18 09:52:28',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    70,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-18 10:00:30',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    71,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-18 10:08:07',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    72,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-18 10:12:51',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    73,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    107,
    'read',
    '2024-05-18 10:20:28',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    74,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    106,
    'read',
    '2024-05-18 10:35:55',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    75,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    106,
    'read',
    '2024-05-18 10:46:15',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    76,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    106,
    'read',
    '2024-05-18 10:55:19',
    '2024-05-18 14:43:55'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    77,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:45:09',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    78,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-20 17:45:11',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    79,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-20 17:45:17',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    80,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:46:04',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    81,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-20 17:47:10',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    82,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:51:11',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    83,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:51:15',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    84,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    4,
    'read',
    '2024-05-20 17:51:28',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    85,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:52:59',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    86,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-20 17:53:07',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    87,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:53:13',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    88,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:53:47',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    89,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-20 17:53:59',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    90,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-20 17:54:01',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    91,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:58:17',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    92,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-20 17:58:18',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    93,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:58:21',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    94,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-20 17:58:22',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    95,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:58:25',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    96,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-20 17:58:25',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    97,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    3,
    'read',
    '2024-05-20 17:58:27',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    98,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:58:29',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    99,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-20 17:58:30',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    100,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-20 17:58:31',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    101,
    4,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    8,
    'read',
    '2024-05-20 17:59:16',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    102,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    7,
    'read',
    '2024-05-20 17:59:17',
    '2024-05-20 17:59:52'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    103,
    47,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    47,
    'read',
    '2024-05-20 18:15:57',
    '2024-05-20 18:31:25'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    104,
    48,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    48,
    'read',
    '2024-05-20 18:25:09',
    '2024-05-20 18:31:21'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    105,
    1,
    'Your ticket status has been updated.',
    NULL,
    'ticket',
    5,
    'read',
    '2024-05-20 18:31:34',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    106,
    49,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    49,
    'read',
    '2024-05-21 10:27:00',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    107,
    50,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    50,
    'read',
    '2024-05-21 10:31:11',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    108,
    51,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    51,
    'read',
    '2024-05-22 12:28:09',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    109,
    52,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    52,
    'read',
    '2024-05-22 12:29:50',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    110,
    53,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    53,
    'read',
    '2024-05-22 12:39:12',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    111,
    54,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    54,
    'read',
    '2024-05-22 12:45:05',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    112,
    55,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    55,
    'read',
    '2024-05-22 18:16:28',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    113,
    48,
    'Your account has been deleted.',
    NULL,
    'users',
    48,
    'read',
    '2024-05-23 12:25:51',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    114,
    47,
    'Your account has been deleted.',
    NULL,
    'users',
    47,
    'read',
    '2024-05-23 12:25:53',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    115,
    49,
    'Your account has been deleted.',
    NULL,
    'users',
    49,
    'read',
    '2024-05-23 12:26:11',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    116,
    50,
    'Your account has been deleted.',
    NULL,
    'users',
    50,
    'read',
    '2024-05-23 12:26:19',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    117,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    108,
    'read',
    '2024-05-23 18:11:04',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    118,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    109,
    'read',
    '2024-05-23 18:13:07',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    119,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    110,
    'read',
    '2024-05-23 18:14:54',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    120,
    56,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    56,
    'read',
    '2024-05-24 12:27:15',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    121,
    55,
    'Your account has been deleted.',
    NULL,
    'users',
    55,
    'read',
    '2024-05-24 12:30:02',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    122,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    111,
    'read',
    '2024-05-24 18:01:30',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    123,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    112,
    'read',
    '2024-05-24 18:04:02',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    124,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    113,
    'read',
    '2024-05-25 09:55:15',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    125,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-25 10:13:19',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    126,
    54,
    'A new ticket has been created.',
    NULL,
    'ticket',
    12,
    'read',
    '2024-05-28 10:16:40',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    127,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    106,
    'read',
    '2024-05-28 18:39:22',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    128,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    106,
    'read',
    '2024-05-29 10:03:24',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    129,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    106,
    'read',
    '2024-05-29 10:10:14',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    130,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    106,
    'read',
    '2024-05-29 10:31:36',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    131,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    106,
    'read',
    '2024-05-29 10:46:34',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    132,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    106,
    'read',
    '2024-05-29 12:23:18',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    133,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-29 12:27:46',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    134,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    4,
    'read',
    '2024-05-29 13:04:34',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    135,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    4,
    'read',
    '2024-05-29 13:09:27',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    136,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-29 15:05:28',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    137,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    4,
    'read',
    '2024-05-29 15:07:21',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    138,
    1,
    'Your order has been successfully placed.',
    NULL,
    'order',
    115,
    'read',
    '2024-05-29 16:38:50',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    139,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    4,
    'read',
    '2024-05-29 16:40:16',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    140,
    1,
    'Your order has been successfully placed.',
    NULL,
    'order',
    116,
    'read',
    '2024-05-29 17:02:06',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    141,
    1,
    'Your order has been successfully placed.',
    NULL,
    'order',
    117,
    'read',
    '2024-05-29 17:03:23',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    142,
    1,
    'Your order has been successfully placed.',
    NULL,
    'order',
    118,
    'read',
    '2024-05-29 17:18:43',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    143,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    4,
    'read',
    '2024-05-29 17:23:04',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    144,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    4,
    'read',
    '2024-05-29 17:29:30',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    145,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    4,
    'read',
    '2024-05-29 17:41:19',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    146,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    4,
    'read',
    '2024-05-29 18:21:06',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    147,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    118,
    'read',
    '2024-05-29 18:23:59',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    148,
    1,
    'Your order status has been updated.',
    NULL,
    'order',
    118,
    'read',
    '2024-05-29 18:26:57',
    '2024-05-30 10:55:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    149,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 10:52:03',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    150,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 10:54:31',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    151,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 10:57:45',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    152,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 10:59:54',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    153,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:01:41',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    154,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:06:47',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    155,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:09:19',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    156,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:13:18',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    157,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:15:07',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    158,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:18:22',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    159,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:20:01',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    160,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:26:15',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    161,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:30:22',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    162,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-05-31 11:39:47',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    163,
    54,
    'A new ticket has been created.',
    NULL,
    'ticket',
    13,
    'read',
    '2024-06-03 17:41:03',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    164,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    119,
    'read',
    '2024-06-06 15:06:12',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    165,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    120,
    'read',
    '2024-06-06 15:08:08',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    166,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    121,
    'read',
    '2024-06-06 15:12:20',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    167,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    122,
    'read',
    '2024-06-06 15:20:41',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    168,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    123,
    'read',
    '2024-06-06 15:22:16',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    169,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    124,
    'read',
    '2024-06-06 15:28:55',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    170,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    125,
    'read',
    '2024-06-06 15:30:26',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    171,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    126,
    'read',
    '2024-06-06 15:40:56',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    172,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    127,
    'read',
    '2024-06-06 15:47:03',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    173,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    128,
    'read',
    '2024-06-06 15:48:23',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    174,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    129,
    'read',
    '2024-06-06 15:56:35',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    175,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    130,
    'read',
    '2024-06-06 17:25:26',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    176,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    131,
    'read',
    '2024-06-06 17:28:31',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    177,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    133,
    'read',
    '2024-06-06 17:42:46',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    178,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    134,
    'read',
    '2024-06-06 17:44:59',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    179,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    135,
    'read',
    '2024-06-06 17:48:20',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    180,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    136,
    'read',
    '2024-06-06 18:00:32',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    181,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    137,
    'read',
    '2024-06-06 18:02:00',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    182,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    138,
    'read',
    '2024-06-06 18:14:30',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    183,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    139,
    'read',
    '2024-06-06 18:17:15',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    184,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    140,
    'read',
    '2024-06-07 11:05:29',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    185,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    141,
    'read',
    '2024-06-07 11:06:29',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    186,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    142,
    'read',
    '2024-06-07 11:11:32',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    187,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    143,
    'read',
    '2024-06-07 11:11:52',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    188,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    144,
    'read',
    '2024-06-07 15:01:40',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    189,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    145,
    'read',
    '2024-06-07 15:05:00',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    190,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-07 15:06:01',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    191,
    54,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-06-07 15:20:16',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    192,
    54,
    'Your order status has been updated.',
    NULL,
    'order',
    114,
    'read',
    '2024-06-07 15:32:48',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    193,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-07 15:48:19',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    194,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-07 15:49:11',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    195,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-07 15:53:08',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    196,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-07 15:55:11',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    197,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    147,
    'read',
    '2024-06-07 16:12:39',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    198,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    148,
    'read',
    '2024-06-07 16:15:46',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    199,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-07 16:17:34',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    200,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-07 16:18:06',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    201,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 09:43:56',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    202,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 11:25:35',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    203,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 11:29:02',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    204,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 11:35:07',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    205,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 11:41:31',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    206,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 11:50:59',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    207,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 12:02:35',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    208,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 12:11:54',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    209,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 12:31:17',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    210,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    146,
    'read',
    '2024-06-08 12:39:29',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    211,
    58,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    58,
    'read',
    '2024-06-08 12:52:34',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    212,
    59,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    59,
    'read',
    '2024-06-08 12:55:02',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    213,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    123,
    'read',
    '2024-06-08 15:28:16',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    214,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    123,
    'read',
    '2024-06-08 15:38:32',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    215,
    60,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    60,
    'read',
    '2024-06-08 15:40:42',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    216,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    123,
    'read',
    '2024-06-08 15:48:01',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    217,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    123,
    'read',
    '2024-06-08 15:48:36',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    218,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    119,
    'read',
    '2024-06-08 15:54:28',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    219,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    120,
    'read',
    '2024-06-08 15:56:04',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    220,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    112,
    'read',
    '2024-06-08 16:07:32',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    221,
    61,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    61,
    'read',
    '2024-06-08 16:07:35',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    222,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    112,
    'read',
    '2024-06-08 16:13:23',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    223,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    112,
    'read',
    '2024-06-08 16:19:34',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    224,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    112,
    'read',
    '2024-06-08 17:12:53',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    225,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    112,
    'read',
    '2024-06-08 17:44:54',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    226,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    148,
    'read',
    '2024-06-08 17:48:27',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    227,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    148,
    'read',
    '2024-06-08 17:54:12',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    228,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    148,
    'read',
    '2024-06-08 17:56:18',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    229,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    148,
    'read',
    '2024-06-08 17:56:45',
    '2024-06-10 15:10:06'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    230,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    148,
    'read',
    '2024-06-08 17:57:16',
    '2024-06-10 15:05:33'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    231,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    148,
    'read',
    '2024-06-10 10:45:02',
    '2024-06-10 15:05:30'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    232,
    4,
    'Your order status has been updated.',
    NULL,
    'order',
    148,
    'read',
    '2024-06-10 10:45:52',
    '2024-06-10 15:05:28'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    233,
    62,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    62,
    'unread',
    '2024-06-12 16:45:10',
    '2024-06-12 16:45:10'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    234,
    63,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    63,
    'unread',
    '2024-06-12 16:47:07',
    '2024-06-12 16:47:07'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    235,
    59,
    'Your account has been deleted.',
    NULL,
    'users',
    59,
    'unread',
    '2024-06-13 09:57:25',
    '2024-06-13 09:57:25'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    236,
    64,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    64,
    'unread',
    '2024-06-13 09:57:42',
    '2024-06-13 09:57:42'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    237,
    64,
    'Your account has been deleted.',
    NULL,
    'users',
    64,
    'unread',
    '2024-06-13 09:57:46',
    '2024-06-13 09:57:46'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    238,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    149,
    'unread',
    '2024-06-13 12:10:12',
    '2024-06-13 12:10:12'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    239,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    150,
    'unread',
    '2024-06-14 10:17:57',
    '2024-06-14 10:17:57'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    240,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    151,
    'unread',
    '2024-06-14 10:18:08',
    '2024-06-14 10:18:08'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    241,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    152,
    'unread',
    '2024-06-14 10:18:34',
    '2024-06-14 10:18:34'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    242,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    153,
    'unread',
    '2024-06-14 10:38:20',
    '2024-06-14 10:38:20'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    243,
    4,
    'Your order has been successfully placed.',
    NULL,
    'order',
    154,
    'unread',
    '2024-06-14 10:51:24',
    '2024-06-14 10:51:24'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    244,
    65,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    65,
    'unread',
    '2024-06-14 12:29:36',
    '2024-06-14 12:29:36'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    245,
    66,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    66,
    'unread',
    '2024-06-14 12:32:49',
    '2024-06-14 12:32:49'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    246,
    67,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    67,
    'unread',
    '2024-06-14 12:39:30',
    '2024-06-14 12:39:30'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    247,
    68,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    68,
    'unread',
    '2024-06-14 12:44:28',
    '2024-06-14 12:44:28'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    248,
    54,
    'Your order has been successfully placed.',
    NULL,
    'order',
    155,
    'unread',
    '2024-06-14 13:01:00',
    '2024-06-14 13:01:00'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    249,
    54,
    'Your order has been successfully placed.',
    NULL,
    'order',
    156,
    'unread',
    '2024-06-14 13:06:47',
    '2024-06-14 13:06:47'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    250,
    54,
    'Your order has been successfully placed.',
    NULL,
    'order',
    157,
    'unread',
    '2024-06-14 13:08:17',
    '2024-06-14 13:08:17'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    251,
    70,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    70,
    'unread',
    '2024-06-14 14:11:32',
    '2024-06-14 14:11:32'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    252,
    71,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    71,
    'unread',
    '2024-06-14 14:36:57',
    '2024-06-14 14:36:57'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    253,
    72,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    72,
    'unread',
    '2024-06-14 15:48:00',
    '2024-06-14 15:48:00'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    254,
    73,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    73,
    'unread',
    '2024-06-14 16:28:17',
    '2024-06-14 16:28:17'
  );
INSERT INTO
  `user_notifications` (
    `id`,
    `user_id`,
    `message`,
    `image`,
    `redirect_type`,
    `reference_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    255,
    74,
    'Welcome! Your registration was successful.',
    NULL,
    'users',
    74,
    'unread',
    '2024-06-14 16:36:21',
    '2024-06-14 16:36:21'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user_roles
# ------------------------------------------------------------

INSERT INTO
  `user_roles` (`role_id`, `name`, `created_at`, `updated_at`)
VALUES
  (
    1,
    'vendor',
    '2024-05-20 17:52:15',
    '2024-05-20 17:52:33'
  );
INSERT INTO
  `user_roles` (`role_id`, `name`, `created_at`, `updated_at`)
VALUES
  (2, 'customer', '2024-05-20 18:02:47', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    1,
    'Harry',
    'wor',
    '7890678905',
    'email@gmail.com',
    '$2a$10$3utX/tlZwb3MS9d/F6qmpOfeKyu2qS.yKVXy.5yYI6.ZcOf3Dzb0u',
    0,
    NULL,
    '192.0.0.1',
    453378,
    '2024-03-21 18:39:45',
    NULL,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInhBcGlLZXkiOiJqNXk2TVlGSmJxbW8iLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE4MzYzNjg3LCJleHAiOjE3MTgzODE2ODd9.gpbnC5VnuNSrG4m_bK6qqB_uPrFS1Ph0gPVM_LceLxE',
    '2024-06-14 16:44:47',
    '2024-06-14 21:44:47',
    'j5y6MYFJbqmo',
    '2024-06-14 16:44:47',
    '',
    '',
    'Active',
    '',
    '2024-02-21 15:54:01',
    '2024-06-14 16:44:48',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    4,
    'John',
    'Doe',
    '1234567890',
    'user2@gmail.com',
    '$2a$10$zES.PXw8ISKi8hk1kMw/QerU7fKW18zOrdp4OnislgkdO51H5j00u',
    0,
    NULL,
    '192.0.0.1',
    249784,
    '2024-03-21 15:27:36',
    NULL,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInhBcGlLZXkiOiJYRjNveTgzSDJoSGgiLCJ1c2VyUm9sZSI6MSwiaWF0IjoxNzE4Mjc3NzMxLCJleHAiOjE3MTgyOTU3MzF9.xtsi6n1wt-zV25w6htRWYIu8Fm8oODPzUdfUZFp7N1I',
    '2024-06-13 16:52:11',
    '2024-06-13 21:52:11',
    'XF3oy83H2hHh',
    '2024-06-13 16:52:11',
    '',
    '',
    'Active',
    '',
    '2024-03-21 15:17:36',
    '2024-06-13 16:52:11',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    51,
    'john',
    'Michael',
    '2489916556',
    'michael@gmail.com',
    '$2a$10$1LmbbXXwd1crD4kSDGiOmeIwt.87mrqQapaDEtDgrS0UOOcZI.DDe',
    0,
    NULL,
    NULL,
    848178,
    '2024-05-22 12:38:07',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Active',
    '',
    '2024-05-22 12:28:07',
    '2024-05-22 12:28:07',
    2,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    52,
    'john',
    'sad',
    '1234567891',
    'sad@gmail.com',
    '$2a$10$e2ixkb/8tzVJyILTUO.OjecfIjZGNg1TYOyq9lSOpUVnYCfRMDo9i',
    0,
    NULL,
    NULL,
    553283,
    '2024-05-22 12:39:50',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Active',
    '',
    '2024-05-22 12:29:50',
    '2024-05-22 12:29:50',
    2,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    53,
    'dsff',
    'sdfdsf',
    '2489916898',
    'chat-admin@matakahero.com',
    '$2a$10$oh8aLfRAf0z0d9Pts.j74uZefy1otAto79.hNEY4Ax1CxdbXcgQ0S',
    0,
    NULL,
    NULL,
    359877,
    '2024-05-22 12:49:11',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Active',
    '',
    '2024-05-22 12:39:11',
    '2024-05-22 12:39:11',
    2,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    54,
    'sc',
    'Rajani',
    '2489915222',
    'admin@themesbrand.com',
    '$2a$10$4Iui2wYRiA7F1LvwnvpjZ.K3XR.sEXQ/vzSjwFsTZRTkI53t7.YR.',
    0,
    NULL,
    NULL,
    229375,
    '2024-05-22 12:55:04',
    NULL,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU0LCJ4QXBpS2V5IjoiWDVWOXJLWktocXhEIiwidXNlclJvbGUiOjIsImlhdCI6MTcxODM2NDc4MywiZXhwIjoxNzE4MzgyNzgzfQ.xPmNPLCwuz6yPF1Nulp5Qx6188XMp2Jq-ynKRyGQlPg',
    '2024-06-14 17:03:03',
    '2024-06-14 22:03:03',
    'X5V9rKZKhqxD',
    '2024-06-14 17:03:03',
    '',
    '',
    'Active',
    '',
    '2024-05-22 12:45:04',
    '2024-06-14 17:03:03',
    2,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    56,
    'John',
    'Doe',
    '1234567890',
    'ne.doe@example.com',
    '$2a$10$4ha7QkIWGLxHfeN5lqfMUeoHAKy5x/j8BTFye8tn1IaqmgRIsQUXW',
    0,
    NULL,
    '192.168.1.100',
    104966,
    '2024-05-24 12:37:12',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Unverified',
    '',
    '2024-05-24 12:27:12',
    '2024-05-24 12:27:13',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    58,
    'John',
    'Does',
    '1234567890',
    'gore@gmail.com',
    '$2a$10$UVX/36J6UuTCda/Pq3gVX.8TTOD9Fz57BxmDh3dWToYl90T6LAfey',
    0,
    NULL,
    '192.168.1.100',
    896496,
    '2024-06-08 13:02:33',
    NULL,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU4LCJ4QXBpS2V5IjoidWlMckFJbTJSWlhtIiwidXNlclJvbGUiOjEsImlhdCI6MTcxODI3NTg2OSwiZXhwIjoxNzE4MjkzODY5fQ.3AKeF-5j3Gy2E_vldcy-KXzFMjlUB1PiSh5AR6ukmyA',
    '2024-06-13 16:21:09',
    '2024-06-13 21:21:09',
    'uiLrAIm2RZXm',
    '2024-06-13 16:21:09',
    '',
    '',
    'Active',
    '',
    '2024-06-08 12:52:33',
    '2024-06-13 16:21:09',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    60,
    'john',
    'Rajani',
    '2489916514',
    'rajani@gmail.com',
    '$2a$10$nfw9v3MzSzLILgKRTRKzQ.L619.uZw3xk2Pa3c.QIfCvMVeYbH/Cq',
    0,
    NULL,
    NULL,
    527231,
    '2024-06-08 15:50:42',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Active',
    '',
    '2024-06-08 15:40:41',
    '2024-06-08 15:40:42',
    2,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    61,
    'john',
    'Rajann',
    '2489916753',
    'rajann@g.com',
    '$2a$10$4bennZqsNCZ8X3njvAJl9eVCkcRj3xgemrHnqxvoNxuPTgfdaldLS',
    0,
    NULL,
    NULL,
    970435,
    '2024-06-08 16:17:35',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Unverified',
    '',
    '2024-06-08 16:07:35',
    '2024-06-08 16:07:35',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    62,
    'Michael',
    'Jordan',
    '8956231256',
    'michael@jordan.com',
    '$2a$10$gMRFhHm2zvwywakDtd/E9u97FHqqA//eSTWv.mja7PGwQgERqqIfO',
    0,
    NULL,
    NULL,
    735846,
    '2024-06-12 16:55:08',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Unverified',
    '',
    '2024-06-12 16:45:08',
    '2024-06-12 16:45:09',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    63,
    'john',
    'Jordan',
    '2489916514',
    'deojordan@gmail.com',
    '$2a$10$h6XcXToocXggdETlsXJPNexTurb5pq6P7P.0Efd9v8FrDFEIEXewG',
    0,
    NULL,
    NULL,
    859066,
    '2024-06-12 16:57:06',
    NULL,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYzLCJ4QXBpS2V5IjoiOHZrZmlRTlVkSjdBIiwidXNlclJvbGUiOjEsImlhdCI6MTcxODM1ODg2NSwiZXhwIjoxNzE4Mzc2ODY1fQ.5d0JyJRClxq_LJvMKUJMN5v6W_kKuM5Na6v9nECpMlY',
    '2024-06-14 15:24:25',
    '2024-06-14 20:24:25',
    '8vkfiQNUdJ7A',
    '2024-06-14 15:24:25',
    '',
    '',
    'Active',
    '',
    '2024-06-12 16:47:06',
    '2024-06-14 15:24:25',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    67,
    'John',
    'Doe',
    '1234567890',
    'john.doe@example.com',
    '$2a$10$5Eaa2zHxyHHAsmifpsUlKuBxI5EcQiUhqAa5kiMdjjvxLcEBGRH2O',
    0,
    NULL,
    '192.168.1.1',
    333837,
    '2024-06-14 12:49:29',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Unverified',
    '',
    '2024-06-14 12:39:29',
    '2024-06-14 12:39:29',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    68,
    'John',
    'Doe',
    '1234567890',
    'joh.doe@example.com',
    '$2a$10$NgMmkU9sZG3qq6Ep1Azf8Ow6LLOaOtAjIpa4s2cc/0i2pE/ulubRi',
    0,
    NULL,
    '192.168.1.1',
    164713,
    '2024-06-14 12:54:26',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Active',
    '',
    '2024-06-14 12:44:26',
    '2024-06-14 12:44:26',
    2,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    69,
    'John',
    'Doe',
    '1234567890',
    'jo.doe@example.com',
    '$2a$10$JQigH6NWOzbE7ucwlfemeO8K65wVl14Z5lA39w9hc1RgX.jNn7ydm',
    0,
    NULL,
    '192.168.1.1',
    0,
    NULL,
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Unverified',
    '',
    '2024-06-14 13:11:43',
    '2024-06-14 13:11:43',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    70,
    'John',
    'Doe',
    '1234567890',
    'j.doe@example.com',
    '$2a$10$uuF7GmzRTzIYRCbOoPe7Q.nnrQL42xMC6vfqyLjguTKFt8/Os6D3m',
    0,
    NULL,
    '192.168.1.1',
    176129,
    '2024-06-14 14:21:31',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Unverified',
    '',
    '2024-06-14 14:11:31',
    '2024-06-14 14:11:31',
    1,
    0.00
  );
INSERT INTO
  `users` (
    `user_id`,
    `first_name`,
    `last_name`,
    `mobile`,
    `email`,
    `password`,
    `email_verified`,
    `mpin`,
    `register_at_ip`,
    `email_verification_code`,
    `email_expiry_at`,
    `social_logins`,
    `token`,
    `token_generated_at`,
    `token_expire_at`,
    `x_api_key`,
    `last_login_at`,
    `email_updated_at`,
    `password_updated_at`,
    `user_status`,
    `banned_reason`,
    `created_at`,
    `updated_at`,
    `role_id`,
    `wallet_balance`
  )
VALUES
  (
    74,
    'John',
    'Doe',
    '1234567890',
    'cc.doe@example.com',
    '$2a$10$1pnvtGrzFRk.s8Mv5P41QeNby0L6E56LsAEinIKrKh5F81Gmz.aI2',
    0,
    NULL,
    '192.168.1.1',
    870682,
    '2024-06-14 16:46:20',
    NULL,
    '',
    NULL,
    NULL,
    '',
    NULL,
    '',
    '',
    'Active',
    '',
    '2024-06-14 16:36:20',
    '2024-06-14 16:37:19',
    1,
    0.00
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: vendor_company_details
# ------------------------------------------------------------

INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    58,
    'Example Company',
    '123 Example St',
    'infos@example.com',
    '123-456-7890',
    'http://example.com/logo.jpg',
    2,
    '2024-06-06 12:52:33',
    NULL
  );
INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    1,
    'Example Company',
    '123 Example St',
    'infos@example.com',
    '123-456-7890',
    'http://example.com/logo.jpg',
    0,
    '2024-06-08 12:52:33',
    NULL
  );
INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    4,
    'Example Company',
    '123 Example St',
    'infos@example.com',
    '123-456-7890',
    'http://example.com/logo.jpg',
    0,
    '2024-06-08 12:52:33',
    NULL
  );
INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    56,
    'Example Company',
    '123 Example St',
    'infos@example.com',
    '123-456-7890',
    'http://example.com/logo.jpg',
    0,
    '2024-06-08 12:52:33',
    NULL
  );
INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    61,
    'Example Company',
    '123 Example St',
    'infos@example.com',
    '123-456-7890',
    'http://example.com/logo.jpg',
    0,
    '2024-06-08 12:52:33',
    NULL
  );
INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    62,
    'XYZ',
    '900 florida',
    'xyz@gmail.com',
    '9865322129',
    NULL,
    0,
    '2024-06-12 16:45:08',
    NULL
  );
INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    63,
    'EURO LANGUAGE SERVICES',
    '900 florida',
    'deo123@gmail.com',
    '2489916552',
    NULL,
    0,
    '2024-06-12 16:47:06',
    NULL
  );
INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    67,
    'Example Company',
    '123 Example St, City, Country',
    'info@example.com',
    '+123456789',
    'https://example.com/logo.png',
    0,
    '2024-06-14 12:39:29',
    NULL
  );
INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    70,
    'Example Company',
    '123 Example St, City, Country',
    'info@example.com',
    '+123456789',
    'https://example.com/logo.png',
    0,
    '2024-06-14 14:11:31',
    NULL
  );
INSERT INTO
  `vendor_company_details` (
    `company_id`,
    `user_id`,
    `company_name`,
    `company_address`,
    `company_email`,
    `company_phone_number`,
    `company_logo`,
    `vendor_commission`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    74,
    'Example Company',
    '123 Example St, City, Country',
    'info@example.com',
    '+123456789',
    'https://example.com/logo.png',
    0,
    '2024-06-14 16:36:20',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: wallet_history
# ------------------------------------------------------------

INSERT INTO
  `wallet_history` (
    `id`,
    `vendor_id`,
    `amount`,
    `order_id`,
    `type`,
    `previous_amount`,
    `current_amount`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    1,
    13500,
    120,
    'Credit',
    13950,
    27450,
    'Completed',
    '2024-06-06 17:45:00',
    '2024-06-06 17:45:00'
  );
INSERT INTO
  `wallet_history` (
    `id`,
    `vendor_id`,
    `amount`,
    `order_id`,
    `type`,
    `previous_amount`,
    `current_amount`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    53,
    61,
    900,
    148,
    'Credit',
    0,
    900,
    'Completed',
    '2024-06-10 17:04:04',
    '2024-06-10 17:04:04'
  );
INSERT INTO
  `wallet_history` (
    `id`,
    `vendor_id`,
    `amount`,
    `order_id`,
    `type`,
    `previous_amount`,
    `current_amount`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    54,
    58,
    98,
    148,
    'Credit',
    0,
    98,
    'Completed',
    '2024-06-10 17:04:04',
    '2024-06-10 17:04:04'
  );
INSERT INTO
  `wallet_history` (
    `id`,
    `vendor_id`,
    `amount`,
    `order_id`,
    `type`,
    `previous_amount`,
    `current_amount`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    55,
    58,
    98,
    148,
    'Debit',
    98,
    196,
    'Completed',
    '2024-06-10 17:04:57',
    '2024-06-10 17:04:57'
  );
INSERT INTO
  `wallet_history` (
    `id`,
    `vendor_id`,
    `amount`,
    `order_id`,
    `type`,
    `previous_amount`,
    `current_amount`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    56,
    61,
    900,
    148,
    'Debit',
    900,
    1800,
    'Completed',
    '2024-06-07 17:04:57',
    '2024-06-10 17:04:57'
  );
INSERT INTO
  `wallet_history` (
    `id`,
    `vendor_id`,
    `amount`,
    `order_id`,
    `type`,
    `previous_amount`,
    `current_amount`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    64,
    58,
    19.5902,
    148,
    'Credit',
    196,
    215.59,
    'Completed',
    '2024-06-13 12:13:44',
    NULL
  );
INSERT INTO
  `wallet_history` (
    `id`,
    `vendor_id`,
    `amount`,
    `order_id`,
    `type`,
    `previous_amount`,
    `current_amount`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    66,
    63,
    900,
    146,
    'Credit',
    0,
    900,
    'Completed',
    '2024-06-13 12:18:00',
    '2024-06-13 17:03:07'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: wish_lists
# ------------------------------------------------------------

INSERT INTO
  `wish_lists` (
    `wishlist_id`,
    `user_id`,
    `product_id`,
    `added_date`,
    `notes`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    277,
    54,
    163,
    '2024-06-14 12:53:22',
    NULL,
    '2024-06-14 12:53:22',
    NULL
  );
INSERT INTO
  `wish_lists` (
    `wishlist_id`,
    `user_id`,
    `product_id`,
    `added_date`,
    `notes`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    279,
    54,
    221,
    '2024-06-14 12:59:26',
    'This is a note for the wishlist item.',
    '2024-06-14 12:59:27',
    NULL
  );
INSERT INTO
  `wish_lists` (
    `wishlist_id`,
    `user_id`,
    `product_id`,
    `added_date`,
    `notes`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    282,
    54,
    251,
    '2024-06-14 14:55:35',
    'This is a note for the wishlist item.',
    '2024-06-14 14:55:35',
    NULL
  );
INSERT INTO
  `wish_lists` (
    `wishlist_id`,
    `user_id`,
    `product_id`,
    `added_date`,
    `notes`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    283,
    54,
    222,
    '2024-06-14 14:59:06',
    NULL,
    '2024-06-14 14:59:06',
    NULL
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
