export const config = {

    theme: {
        primaryColor: '#1a5f7a',    
        secondaryColor: '#57c5b6',  
        backgroundDark: '#002b36',  
        backgroundLight: '#159895', 
        textLight: '#ffffff',
        textDark: '#333333',
        accentColor: '#e8aa42'      
    },

    transitions: {
        duration: 0.5,
        type: 'fade' 
    },

    info: {
        title: 'PULSE AI - Senior Health Platform',
        subtitle: 'A unified AI-powered platform for senior citizens with multiple disease detection capabilities',
        organization: 'PULSE AI',
        presenters: [
            'Your Name',
            'Team Member 2',
            'Team Member 3'
        ]
    },

    diseaseModels: {
        alzheimers: {
            name: 'Alzheimer\'s Detection',
            accuracy: '97.71%',
            modelType: 'Swin Transformer'
        },
        diabeticRetinopathy: {
            name: 'Diabetic Retinopathy Screening',
            accuracy: '97.40%',
            modelType: 'CNN with ResNet-50'
        },
        pneumonia: {
            name: 'Pneumonia Detection',
            accuracy: '95.67%',
            modelType: 'DenseNet-121'
        },
        heartDisease: {
            name: 'Heart Disease Prediction',
            accuracy: '90%',
            modelType: 'Ensemble Model'
        }
    }
};

export default config;
