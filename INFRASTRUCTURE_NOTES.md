# 🧱 Infrastructure Restoration Guide for `library.master`

This document provides a step-by-step plan to fully redeploy the `library.master` project using the necessary cloud infrastructure and supporting tools.

---

## 💻 VPS: Virtual Machine

### Provider: Spaceship Starlight
- Plan: Standard 1 (1 vCPU, 2 GB RAM, 25 GB SSD)
- OS: Ubuntu 24.04
- Recommended name: `ci-librarymaster`
- SSH port: `22022`
- Public IP: Assigned dynamically on creation

> Save the public IP after deployment, as it is used to access the API and frontend.

### Required packages:
```bash
sudo apt update && sudo apt install -y docker.io && \
sudo systemctl enable docker && \
sudo systemctl start docker
```

---

## 🚀 Jenkins Setup (CI/CD)

### Run Jenkins in Docker:
```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

### Access:
- UI: `http://<PUBLIC_IP>:8080`
- Initial password:
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

---

## 🔄 Jenkins Pipeline for `library.master`

### 1. Configure Jenkins pipelines:
- Multibranch pipeline for `Builds`
- Multibranch pipeline for `E2E`
- Parameterized pipeline for `Deploys`

### 2. Image tagging:
- Format: `library.master-app:<branch>_<buildNumber>`

### 3. Application deployment:
- Runs as container named `library.master-running`
- Exposed at: `http://<PUBLIC_IP>:3100`

---

## 🌐 Amazon Web Services (AWS) Components

### 1. Amazon S3 (Artifacts)
- Bucket name: `playwright-artifacts-e2e-librarymaster`
- Region: `eu-north-1`
- Purpose: storing Playwright screenshots, HTML reports, JSON logs
- Public access: disabled

#### Recommended lifecycle policy:
- Automatically delete objects older than 7 days

#### Recreate:
```bash
aws s3 mb s3://playwright-artifacts-e2e-librarymaster --region eu-north-1
```

---

### 2. Amazon RDS (PostgreSQL)
- Engine: PostgreSQL (or Aurora PostgreSQL)
- DB name: `library-db`
- Port: `5432`
- Publicly accessible: Yes

#### SQL for table creation:
```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    year INT,
    isAvailable BOOLEAN DEFAULT true,
    type VARCHAR(50)
);
```

#### Secrets for connection (Vault):
```json
{
  "username": "your_user",
  "password": "your_pass",
  "host": "your-db-host.amazonaws.com"
}
```

---

### 3. CloudWatch Logs
- Log group: `/library/master`
- Retention: recommend setting to 3 or 7 days

#### Re-enable retention via CLI:
```bash
aws logs put-retention-policy \
  --log-group-name /library/master \
  --retention-in-days 7
```

---

## 🌎 Environment Configuration

### Required `.env` variables:
```dotenv
S3_BUCKET=playwright-artifacts-e2e-librarymaster
DB_HOST=your-db-host.amazonaws.com
DB_USER=your_user
DB_PASS=your_pass
HCP_CLIENT_ID=client-id
HCP_CLIENT_SECRET=client-secret
HCP_AUTH_URL=https://auth.url
HCP_API_BASE_URL=https://api.url
HCP_AUDIENCE=audience
```

---

## 🔢 Optional CLI for Fast Restoration

```bash
# S3
aws s3 mb s3://playwright-artifacts-e2e-librarymaster --region eu-north-1

# CloudWatch retention policy
aws logs put-retention-policy \
  --log-group-name /library/master \
  --retention-in-days 7
```

---

## 🏛 Final Notes
- Jenkins volume `jenkins_home` stores all configurations
- Docker containers:
    - App: `library.master-running`
    - CI: `jenkins`
- App accessible at: `http://<PUBLIC_IP>:3100`
- API (Swagger): `http://<PUBLIC_IP>:3100/library-master-api/`
