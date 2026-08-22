CREATE TABLE IF NOT EXISTS intex_leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  service VARCHAR(120) NOT NULL,
  emergency VARCHAR(80) NOT NULL,
  property_type VARCHAR(80) NOT NULL,
  zip VARCHAR(10) NOT NULL,
  name VARCHAR(160) NOT NULL,
  phone VARCHAR(60) NOT NULL,
  email VARCHAR(190) NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  preferred_contact VARCHAR(40) NOT NULL,
  consent TINYINT(1) NOT NULL DEFAULT 0,
  source_page VARCHAR(255) NOT NULL DEFAULT '/estimate/',
  status ENUM('new','contacted','qualified','scheduled','closed','spam') NOT NULL DEFAULT 'new',
  notes TEXT NULL,
  PRIMARY KEY (id),
  KEY idx_intex_leads_created_at (created_at),
  KEY idx_intex_leads_status_created (status, created_at),
  KEY idx_intex_leads_phone (phone),
  KEY idx_intex_leads_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS intex_projects (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(190) NOT NULL,
  title VARCHAR(255) NOT NULL,
  service VARCHAR(120) NOT NULL,
  property_type VARCHAR(80) NOT NULL,
  location VARCHAR(190) NOT NULL,
  summary TEXT NOT NULL,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  outcome TEXT NOT NULL,
  before_image VARCHAR(1024) NOT NULL DEFAULT '',
  after_image VARCHAR(1024) NOT NULL DEFAULT '',
  completed_at DATE NULL,
  published TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_intex_projects_slug (slug),
  KEY idx_intex_projects_published (published, updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS intex_reviews (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  reviewer_name VARCHAR(160) NOT NULL,
  quote_text TEXT NOT NULL,
  rating DECIMAL(2,1) NULL,
  source_name VARCHAR(120) NOT NULL,
  source_url VARCHAR(1024) NOT NULL DEFAULT '',
  reviewed_at DATE NULL,
  verified TINYINT(1) NOT NULL DEFAULT 0,
  published TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_intex_reviews_publish (published, verified, updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS intex_content (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  collection_name VARCHAR(80) NOT NULL,
  slug VARCHAR(190) NOT NULL,
  title VARCHAR(255) NOT NULL,
  payload JSON NOT NULL,
  status ENUM('draft','review','published','archived') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_intex_content_collection_slug (collection_name, slug),
  KEY idx_intex_content_status (collection_name, status, updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
