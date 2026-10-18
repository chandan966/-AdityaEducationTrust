BEGIN;
CREATE TABLE IF NOT EXISTS users (
 id BIGSERIAL PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(254) NOT NULL UNIQUE,
 password_hash TEXT NOT NULL, role VARCHAR(20) NOT NULL DEFAULT 'student' CHECK(role IN ('admin','staff','student')),
 is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS colleges (
 id BIGSERIAL PRIMARY KEY, slug VARCHAR(100) NOT NULL UNIQUE, name VARCHAR(180) NOT NULL, category VARCHAR(100) NOT NULL,
 short_description VARCHAR(500) NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '', image_url TEXT NOT NULL DEFAULT '',
 courses JSONB NOT NULL DEFAULT '[]'::jsonb, facilities JSONB NOT NULL DEFAULT '[]'::jsonb, departments JSONB NOT NULL DEFAULT '[]'::jsonb,
 is_published BOOLEAN NOT NULL DEFAULT TRUE, sort_order INTEGER NOT NULL DEFAULT 0, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS notices (
 id BIGSERIAL PRIMARY KEY, title VARCHAR(220) NOT NULL, category VARCHAR(80) NOT NULL, summary TEXT NOT NULL,
 attachment_url TEXT, published_at DATE NOT NULL DEFAULT CURRENT_DATE, expires_at DATE, is_published BOOLEAN NOT NULL DEFAULT TRUE,
 created_by BIGINT REFERENCES users(id) ON DELETE SET NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS events (
 id BIGSERIAL PRIMARY KEY, title VARCHAR(220) NOT NULL, category VARCHAR(80) NOT NULL, description TEXT NOT NULL,
 event_date DATE NOT NULL, image_url TEXT, is_published BOOLEAN NOT NULL DEFAULT TRUE, created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS enquiries (
 id BIGSERIAL PRIMARY KEY, name VARCHAR(120) NOT NULL, phone VARCHAR(24) NOT NULL, email VARCHAR(254) NOT NULL,
 college_id BIGINT NOT NULL REFERENCES colleges(id), course VARCHAR(160) NOT NULL DEFAULT '', qualification VARCHAR(100) NOT NULL DEFAULT '',
 academic_year VARCHAR(40) NOT NULL DEFAULT '', message VARCHAR(1500) NOT NULL DEFAULT '', status VARCHAR(20) NOT NULL DEFAULT 'New' CHECK(status IN ('New','Contacted','Resolved','Closed')),
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS applications (
 id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, college_id BIGINT NOT NULL REFERENCES colleges(id),
 course VARCHAR(160) NOT NULL, qualification VARCHAR(100) NOT NULL, academic_year VARCHAR(40) NOT NULL,
 status VARCHAR(30) NOT NULL DEFAULT 'Submitted' CHECK(status IN ('Draft','Submitted','Under Review','Documents Required','Approved','Rejected')),
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS audit_logs (
 id BIGSERIAL PRIMARY KEY, actor_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL, action VARCHAR(120) NOT NULL,
 entity_type VARCHAR(80) NOT NULL, entity_id VARCHAR(80), metadata JSONB NOT NULL DEFAULT '{}'::jsonb, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_colleges_published_order ON colleges(is_published,sort_order);
CREATE INDEX IF NOT EXISTS idx_notices_published_date ON notices(is_published,published_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(is_published,event_date);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_user ON applications(user_id,created_at DESC);
COMMIT;
