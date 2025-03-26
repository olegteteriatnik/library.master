pipeline {
  agent {
    docker {
      image 'node:20'
      args '-u root'
    }
  }

  environment {
    NODE_ENV = 'production'
  }

  stages {
    stage('Install') {
      steps {
        echo 'Installing dependencies...'
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        echo 'Running unit tests...'
        sh 'npm run test:unit'
      }
    }

    stage('Build') {
      steps {
        echo 'Building project...'
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      when {
        expression {
          return params.DO_DEPLOY == true
        }
      }
      steps {
        echo 'Deploying application... (placeholder)'
      }
    }
  }

  parameters {
    booleanParam(name: 'DO_DEPLOY', defaultValue: false, description: 'Deploy after build?')
  }
}
