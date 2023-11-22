pipeline {
    agent any
    stages {
        stage('Install dependencies') {
            steps {
               sh "npm ci"
            }
        }
        stage('Test run') {
            steps {
            catchError(buildResult: "SUCCESS", stageResult:"SUCCESS"){
            sh "allure:clear"
            sh "cy:run:allure"
            }

            }
        }
        stage('Allure report') {
            steps {
                sh "allure:generate"
                allure(
                results[[path: "allure-results"]]
                )
            }
        }
    }
}
GROOVY