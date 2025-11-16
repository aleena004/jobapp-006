
pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'aleena004'
        DOCKER_HUB_PASS = credentials('dockerhub-credentials')
    }

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/aleena004/jobapp-006.git'
            }
        }

        stage('Build Containers') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.cicd.yml build'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.cicd.yml up -d'
                }
            }
        }
    }
}
